import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(async response => {
    return response;
}, (error: AxiosError) => {
    const { status, headers } = error.response!;
    switch (status) {
        case 400:
            toast.error('Bad request');
            break;
        case 401:
            if (status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
                toast.error('Session expired - please login again');
            }
            break;
        case 404:
            toast.error('Not found');
            break;
        case 500:
            toast.error('Internal server error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const RandomApi = {
    // list: () => axios.get<Random[]>('api/activities')
    //     .then(responseBody),
    // details: (id: string) => requests.get<Random>(`api/activities/${id}`),
    // create: (random: RandomPayload) => requests.post<void>('api/activities', random),
    // update: (random: RandomPayload) => requests.put<void>(`api/activities/${random.id}`, random),
    // delete: (id: string) => requests.del<void>(`api/activities/${id}`),
}

const agent = {
    RandomApi,
}

export default agent;