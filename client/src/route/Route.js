import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import WORKFLOW_ROUTES from '../constants/workflow-routes';
import { STATE_SLICE } from '../store/state-configuration';

export function ProtectedRoute({ Component, redirectPath, isSignedIn, path, ...rest }) {
    const { workflow } = useSelector((state) => state[STATE_SLICE.ACCOUNT.name]);
    const userCanBrowse = WORKFLOW_ROUTES[workflow].allowed.includes(path);
    return (
        <Route
            {...rest}
            path={path}
            render={({ location }) => {
                if (isSignedIn && userCanBrowse) {
                    return Component && <Component />;
                }
                if (isSignedIn && !userCanBrowse) {
                    return (
                        <Redirect
                            to={{
                                pathname: WORKFLOW_ROUTES[workflow].authenticatedRedirect,
                                state: { from: location },
                            }}
                        />
                    );
                }

                if (!isSignedIn) {
                    return (
                        <Redirect
                            to={{
                                pathname: redirectPath,
                                state: { from: location },
                            }}
                        />
                    );
                }

                return null;
            }}
        />
    );
}

export function IsUserRedirect({ Component, redirectPath, isSignedIn, path, ...rest }) {
    const { workflow } = useSelector((state) => state[STATE_SLICE.ACCOUNT.name]);

    const userCanBrowse = isSignedIn
        ? WORKFLOW_ROUTES[workflow].allowed.includes(path)
        : WORKFLOW_ROUTES[workflow].allowedUnauthenticated.includes(path);
    return (
        <Route
            {...rest}
            path={path}
            render={({ location }) => {
                if (userCanBrowse) {
                    return Component && <Component />;
                }
                if (!userCanBrowse && !isSignedIn) {
                    return (
                        <Redirect
                            to={{
                                pathname: WORKFLOW_ROUTES[workflow].unauthenticatedRedirect,
                                state: { from: location },
                            }}
                        />
                    );
                }
                if (!userCanBrowse && isSignedIn) {
                    return (
                        <Redirect
                            to={{
                                pathname: WORKFLOW_ROUTES[workflow].authenticatedRedirect,
                                state: { from: location },
                            }}
                        />
                    );
                }

                return null;
            }}
        />
    );
}
