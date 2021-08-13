import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokenAsyncThunk } from '../store/auth-slice';
import { REQUEST_STATUS, STATE_SLICE } from '../store/state-configuration';

export default function useAuthentication() {
    const { isSignedIn, requestStatus } = useSelector((state) => state[STATE_SLICE.AUTH.name]);
    const [isTokenRefreshing, setisTokenRefreshing] = useState(requestStatus === REQUEST_STATUS.PENDING);
    const activeSession = window.localStorage.getItem('cp.session.id');
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
