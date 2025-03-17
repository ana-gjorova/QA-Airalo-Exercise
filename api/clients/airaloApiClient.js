import axios from 'axios';
import tokenService from '../services/tokenService';
import 'dotenv/config';

const airaloApiClient = axios.create({
    baseURL: process.env.AIRALO_API_BASE_URL,
    timeout: 10000,
    headers: { Accept: 'application/json' },
});

airaloApiClient.interceptors.request.use(async (config) => {
    const token = await tokenService.getAccessToken();
    config.headers.Authorization = `Bearer ${token}`;

    console.log(`[REQUEST] ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
});

airaloApiClient.interceptors.response.use(
    (response) => {
        console.log(`[RESPONSE] ${response.status} ${response.config.method.toUpperCase()} ${response.config.url}`);
        return response;
    },
    (error) => {
        const status = error.response?.status || 'NO STATUS';
        const url = error.config?.url || 'UNKNOWN URL';
        console.error(`[ERROR] ${status} ${url}`, error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default airaloApiClient;
