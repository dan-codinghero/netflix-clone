import request from './request-config';

export async function addAccount(requestBody) {
    const response = await request.post('/account', { body: JSON.stringify(requestBody) });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.description || 'Unable to register at this time. Please try again later.');
    }

    return data;
}
