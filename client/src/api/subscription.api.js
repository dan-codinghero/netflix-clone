import request, { getAuthHeaders } from './request-config';

export async function addPlan(requestBody) {
    const response = await request.post('/subscription', { body: JSON.stringify(requestBody), ...getAuthHeaders() });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.description || 'Unable to add plan to account. Please try again later.');
    }

    return data;
}
