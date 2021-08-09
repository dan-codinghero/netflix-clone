import { WORKFLOW } from '../constants/workflow';

export const REQUEST_STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILED: 'failed',
};

export const STATE_SLICE = {
    ACCOUNT: {
        name: 'account',
        initialState: {
            email: '',
            workflow: WORKFLOW.GUEST,
            isInFreeTrial: null,
            activeProfile: null,
            profiles: [],
            requestStatus: REQUEST_STATUS.IDLE,
            requestError: 'Sorry, something went wrong. Please try again later.',
        },
    },
    AUTH: {
        name: 'auth',
        initialState: {
            token: null,
            tokenExpiry: null,
            isSignedIn: false,
            requestStatus: REQUEST_STATUS.IDLE,
            requestError: 'Sorry, something went wrong. Please try again later.',
        },
    },
    PROFILE: {
        name: 'profile',
        initialState: {
            profiles: [],
            activeProfile: null,
            requestStatus: REQUEST_STATUS.IDLE,
            requestError: 'Sorry, something went wrong. Please try again later.',
        },
    },
    SUBSCRIPTION: {
        name: 'subscription',
        initialState: {
            isActive: null,
            isInFreeTrial: null,
            startDate: null,
            endDate: null,
            requestStatus: REQUEST_STATUS.IDLE,
            requestError: 'Sorry, something went wrong. Please try again later.',
        },
    },
};
