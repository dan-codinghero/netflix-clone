import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authService from '../api/auth.api';
import { REQUEST_STATUS, STATE_SLICE } from './state-configuration';
import { accountActions } from './account-slice';

const setAuthenticationCycle = (tokenExpiry, dispatch) => {
    if (!tokenExpiry) throw new Error('Please add expiration date');
    const expiration = new Date(tokenExpiry);

    const timer = expiration.setTime(expiration.getTime() - Date.now());

    const timerId = window.setTimeout(() => dispatch(refreshTokenAsyncThunk()), timer);
    window.localStorage.setItem('csrfTId', timerId);
    window.localStorage.setItem('cp.session.id', Date.now());
};

const clearAuthenticationCycle = () => {
    const timerId = window.localStorage.getItem('csrfTId');
    clearTimeout(timerId);
    window.localStorage.removeItem('csrfTId');
    window.localStorage.removeItem('cp.session.id');
};

export const logout = () => {
    return async (dispatch) => {
        try {
            await authService.logout();
            clearAuthenticationCycle();
            dispatch({ type: 'USER_LOGGED_OUT' });
        } catch (err) {
            clearAuthenticationCycle();
            dispatch({ type: 'USER_LOGGED_OUT' });
            throw err;
        }
    };
};

export const signupAsyncThunk = createAsyncThunk(`${STATE_SLICE.AUTH.name}/signupAccount`, async (account, { getState, dispatch }) => {
    try {
        const data = await authService.signup(account);
        if (!data.token || !data.tokenExpiry) throw new Error('Token failed');
        dispatch(accountActions.userContext({ workflow: data.workflow }));
        setAuthenticationCycle(data.tokenExpiry, dispatch);
        return data;
    } catch (err) {
        if (err.message === 'Failed to fetch') throw new Error(getState().account.requestError);
        throw new Error(err.message);
    }
});

export const loginAsyncThunk = createAsyncThunk(`${STATE_SLICE.AUTH.name}/loginAccount`, async (account, { getState, dispatch }) => {
    try {
        const data = await authService.login(account);
        if (!data.token || !data.tokenExpiry) throw new Error('Token failed');
        dispatch(accountActions.userContext({ workflow: data.workflow, isInFreeTrial: data.isInFreeTrial, profiles: data.profiles }));
        setAuthenticationCycle(data.tokenExpiry, dispatch);
        return data;
    } catch (err) {
        if (err.message === 'Failed to fetch') throw new Error(getState().account.requestError);
        throw new Error(err.message);
    }
});

export const refreshTokenAsyncThunk = createAsyncThunk(`${STATE_SLICE.AUTH.name}/refreshToken`, async (_, { dispatch }) => {
    try {
        console.log('refreshing token');
        const data = await authService.refreshToken();
        if (!data.token || !data.tokenExpiry) throw new Error('Token failed');
        console.log('dispatching refresh token results');
        dispatch(accountActions.userContext({ workflow: data.workflow, profiles: data.profiles, isInFreeTrial: data.isInFreeTrial }));
        setAuthenticationCycle(data.tokenExpiry, dispatch);
        return data;
    } catch (err) {
        // dispatch(logout());
        // Warn user and use setTimeout to logout
        await authService.logout();
        clearAuthenticationCycle();
        dispatch({ type: 'USER_LOGGED_OUT' });
        // throw err;
    }
});

const authSlice = createSlice({
    name: STATE_SLICE.AUTH.name,
    initialState: STATE_SLICE.AUTH.initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder

            .addCase(signupAsyncThunk.fulfilled, (state, action) => {
                state.isSignedIn = true;
                state.token = action.payload.token;
                state.tokenExpiry = action.payload.tokenExpiry;
            })
            .addCase(loginAsyncThunk.fulfilled, (state, action) => {
                state.isSignedIn = true;
                state.token = action.payload.token;
                state.tokenExpiry = action.payload.tokenExpiry;
            })

            .addCase(refreshTokenAsyncThunk.pending, (state, action) => {
                state.requestStatus = REQUEST_STATUS.PENDING;
            })
            .addCase(refreshTokenAsyncThunk.fulfilled, (state, action) => {
                //find a better approach. Research how to cancel operation when logout triggered
                state.requestStatus = REQUEST_STATUS.SUCCESS;
                state.isSignedIn = action.payload?.token ? true : false;
                state.token = action.payload?.token;
                state.tokenExpiry = action.payload?.tokenExpiry;
            });
    },
});
export const authActions = authSlice.actions;

export default authSlice;
