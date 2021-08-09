import { WORKFLOW } from './workflow';
import { ROUTES } from './routes';

const WORKFLOW_ROUTES = {
    [WORKFLOW.GUEST]: {
        authenticatedRedirect: ROUTES.HOME,
        allowed: [ROUTES.HOME, ROUTES.LOGIN, ROUTES.SIGNUP_PASSWORD, ROUTES.PLANFORM, ROUTES.SIGNUP],
        allowedUnauthenticated: [ROUTES.HOME, ROUTES.LOGIN, ROUTES.SIGNUP_PASSWORD, ROUTES.PLANFORM, ROUTES.SIGNUP],
        unauthenticatedRedirect: ROUTES.LOGIN,
    },
    [WORKFLOW.SIGNUP_PASSWORD]: {
        authenticatedRedirect: ROUTES.SIGNUP,
        allowed: [ROUTES.HOME, ROUTES.SIGNUP_PASSWORD, ROUTES.PLANFORM, ROUTES.SIGNUP, ROUTES.PAYMENT_OPTION],
        allowedUnauthenticated: [ROUTES.SIGNUP_PASSWORD, ROUTES.HOME],

        unauthenticatedRedirect: ROUTES.SIGNUP_PASSWORD,
    },
    [WORKFLOW.CREATE_PROFILES]: {
        authenticatedRedirect: ROUTES.CREATE_PROFILES,
        allowed: [ROUTES.SIGNUP_PASSWORD, ROUTES.CREATE_PROFILES],
        allowedUnauthenticated: [ROUTES.SIGNUP_PASSWORD, ROUTES.HOME],

        unauthenticatedRedirect: ROUTES.SIGNUP_PASSWORD,
    },
    [WORKFLOW.BROWSWE]: {
        authenticatedRedirect: ROUTES.BROWSE,
        allowed: [ROUTES.BROWSE, ROUTES.LOGIN, ROUTES.CREATE_PROFILES],
        allowedUnauthenticated: [ROUTES.LOGIN, ROUTES.HOME],
        unauthenticatedRedirect: ROUTES.LOGIN,
    },
};
export default WORKFLOW_ROUTES;
