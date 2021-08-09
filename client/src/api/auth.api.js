import request, { getAuthHeaders } from './request-config';

export async function signup(requestBody) {
    console.log(getAuthHeaders());
    const response = await request.post('/auth/signup', {
        body: JSON.stringify(requestBody),
        ...getAuthHeaders(),
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.description || 'Unable to login at this time.');
    }

    return data;
}

export async function refreshToken() {
    const response = await request.get('/auth/refresh-token');
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.description || 'Unable to login at this time.');
    }

    return data;
}

export async function login(requestBody) {
    const response = await request.post('/auth/login', {
        body: JSON.stringify(requestBody),
        ...getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.description || 'Unable to login at this time. Please try again later.');
    }

    return data;
}

export async function logout() {
    const response = await request.get('/auth/logout', { ...getAuthHeaders() });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.description || 'There was an error processing request. Please try again later.');
    }

    return data;
}
