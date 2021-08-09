import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as accountService from '../api/account.api';
import * as profilesService from '../api/profiles.api';
import * as subscriptionService from '../api/subscription.api';
import { STATE_SLICE } from './state-configuration';

export const registerAccount = createAsyncThunk(`${STATE_SLICE.ACCOUNT.name}/registerAccount`, async (account, { rejectWithValue, getState }) => {
    try {
        const data = await accountService.addAccount(account);
        return data;
    } catch (err) {
        if (err.message === 'Failed to fetch') rejectWithValue(getState().account.requestError);
        // if (err.message === 'Failed to fetch') throw new Error(getState().account.requestError);
        // throw new Error(err.message);
    }
});

export const addSubscriptionPlan = createAsyncThunk(
    `${STATE_SLICE.ACCOUNT.name}/addSubscriptionPlan`,
    async (planData, { rejectWithValue, getState, dispatch }) => {
        try {
            const data = await subscriptionService.addPlan(planData);

            return data;
        } catch (err) {
            if (err.message === 'Failed to fetch') throw new Error(getState().account.requestError);
            throw new Error(err.message);
        }
    }
);

export const addBulkProfiles = createAsyncThunk(
    `${STATE_SLICE.ACCOUNT.name}/addBulkProfiles`,
    async (profiles, { rejectWithValue, getState, dispatch }) => {
        try {
            const data = await profilesService.addBulk(profiles);

            return data;
        } catch (err) {
            if (err.message === 'Failed to fetch') throw new Error(getState().account.requestError);
            throw new Error(err.message);
        }
    }
);

export const getProfiles = createAsyncThunk(`${STATE_SLICE.ACCOUNT.name}/getProfiles`, async (_, { rejectWithValue, getState, dispatch }) => {
    try {
        const data = await profilesService.getProfiles();

        return data;
    } catch (err) {
        if (err.message === 'Failed to fetch') throw new Error(getState().account.requestError);
        throw new Error(err.message);
    }
});

const accountSlice = createSlice({
    name: STATE_SLICE.ACCOUNT.name,
    initialState: STATE_SLICE.ACCOUNT.initialState,
    reducers: {
        userContext(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        setActiveProfile(state, action) {
            return {
                ...state,
                activeProfile: action.payload.profileGuid,
            };
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder

            .addCase(registerAccount.fulfilled, (state, action) => {
                state.workflow = action.payload.workflow;
            })

            .addCase(addSubscriptionPlan.fulfilled, (state, action) => {
                state.workflow = action.payload.workflow;
                state.isInFreeTrial = action.payload.isInFreeTrial;
            })

            .addCase(addBulkProfiles.fulfilled, (state, action) => {
                state.workflow = action.payload.workflow;
                state.profiles = action.payload.profiles;
            })

            .addCase(getProfiles.fulfilled, (state, action) => {
                state.profiles = action.payload.profiles;
            });
    },
});
export const accountActions = accountSlice.actions;

export default accountSlice;
//       profiles: [
//             {
//                 avatarName: 'icon25',
//                 experience: 'standard',
//                 guid: '',
//                 isAccountOwner: false,
//                 isActive: false,
//                 isDefaultKidsProfile: true,
//                 isKids: true,
//                 isPinLocked: false,
//                 language: 'en-US',
//                 maturityLevel: 'ADULTS',
//                 maturityStrings: {
//                     isHighest: true,
//                     isLowest: false,
//                     labels: Array(1),
//                 },
//                 nextEpisodeAutoplay: true,
//                 profileName: 'D G',
//                 showOnRamp: false,
//                 videoMerchEnabled: false,
//             },
//         ],
