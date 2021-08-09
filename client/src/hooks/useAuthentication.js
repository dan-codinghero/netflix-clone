import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokenAsyncThunk } from '../store/auth-slice';
import { REQUEST_STATUS, STATE_SLICE } from '../store/state-configuration';

export default function useAuthentication() {
    const { isSignedIn, requestStatus } = useSelector((state) => state[STATE_SLICE.AUTH.name]);
    const [isTokenRefreshing, setisTokenRefreshing] = useState(requestStatus === REQUEST_STATUS.PENDING);
    const activeSession = window.localStorage.getItem('cp.session.id');
    // let isTokenRefreshing = requestStatus === REQUEST_STATUS.PENDING;
    console.log(`User sign in status ${isSignedIn} and refresh status ${isTokenRefreshing} and active session status ${activeSession}`);
    const dispatch = useDispatch();
    const reAuthenticate = async () => {
        try {
            setisTokenRefreshing(true);
            await dispatch(refreshTokenAsyncThunk()).unwrap();
            setisTokenRefreshing(false);
        } catch (err) {}
    };
    if (!isSignedIn && activeSession && !isTokenRefreshing) {
        reAuthenticate();
    }

    return { isSignedIn, loading: isTokenRefreshing };
}

/* import { useDispatch, useSelector } from 'react-redux';
import { refreshTokenAsyncThunk } from '../store/auth-slice';
import { REQUEST_STATUS, STATE_SLICE } from '../store/state-configuration';

export default function useAuthentication() {
    const { isSignedIn, requestStatus } = useSelector((state) => state[STATE_SLICE.AUTH.name]);
    const activeSession = window.localStorage.getItem('cp.session.id');
    let isTokenRefreshing = requestStatus === REQUEST_STATUS.PENDING;
    console.log(`User sign in status${isSignedIn} and refresh status ${isTokenRefreshing} and active session status ${activeSession}`);
    const dispatch = useDispatch();
    const reAuthenticate = async () => {
        try {
            console.log('re-authenticating');
            const results = await dispatch(refreshTokenAsyncThunk()).unwrap();
            console.log(results);
            console.log('re-authenticating completed');
        } catch (err) {
            isTokenRefreshing = false;
        }
    };
    if (!isSignedIn && activeSession && !isTokenRefreshing) {
        isTokenRefreshing = true;
        console.log('useAuth about to re-authenticate');
        reAuthenticate();
        console.log('useAuth completed re-authentication');

        // isTokenRefreshing = true;
    }

    return { isSignedIn, loading: isTokenRefreshing };
}
 */
