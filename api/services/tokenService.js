import axios from 'axios';
import FormData from 'form-data';
import 'dotenv/config';

class TokenService {
    constructor() {
        this.client = axios.create({
            baseURL: process.env.AIRALO_API_BASE_URL,
            timeout: 10000,
            headers: { Accept: 'application/json' },
        });
        this.token = null;
        this.tokenExpires = null;
    }

    async getAccessToken() {
        if (this.token && this.tokenExpires && Date.now() < this.tokenExpires) {
            return this.token;
        }

        const form = new FormData();
        form.append('client_id', process.env.AIRALO_CLIENT_ID);
        form.append('client_secret', process.env.AIRALO_CLIENT_SECRET);
        form.append('grant_type', 'client_credentials');

        try {
            const { data } = await this.client.post(process.env.AIRALO_OAUTH_URL, form, {
                headers: form.getHeaders(),
            });

            this.token = data.data.access_token;
            this.tokenExpires = Date.now() + (data.data.expires_in - 60) * 1000;

            console.log('Token retrieved successfully.');
            return this.token;
        } catch (error) {
            console.error('Token retrieval failed:', error.response?.data || error.message);
            throw error;
        }
    }
}

export default new TokenService();
