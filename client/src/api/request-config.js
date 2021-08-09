import request from './lib/http-request';
import { store } from '../store';

const url = `${process.env.REACT_APP_CINEPLEX_API}`;

export const getToken = () => {
    const state = store?.getState();
    const token = state?.auth?.token;
    return token;
};

export const getAuthHeaders = () => {
    const headers = {
        Authorization: `Bearer ${getToken()}`,
    };

    return { headers };
};

request.defaults.baseUrl = url;
request.defaults.credentials = 'include';

export default request;
