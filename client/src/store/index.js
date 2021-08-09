import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// import { accountsApi } from '../api/account.api';

import authSlice from './auth-slice';
import accountSlice from './account-slice';
import { plansApi } from '../api/plans.api';
import { videosApi } from '../api/video.api';

const combinedReducer = combineReducers({
    /* your app’s top-level reducers */
    account: accountSlice.reducer,
    auth: authSlice.reducer,
    [plansApi.reducerPath]: plansApi.reducer,
    [videosApi.reducerPath]: videosApi.reducer,
});

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === 'USER_LOGGED_OUT') {
        state = undefined;
    }

    return combinedReducer(state, action);
};
export const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(plansApi.middleware).concat(videosApi.middleware), //for rtk query
});

setupListeners(store.dispatch);

// export default store;
