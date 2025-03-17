import airaloApiClient from '../clients/airaloApiClient';
import FormData from 'form-data';

class OrderService {
    async createOrder({ quantity, package_id, type, description, brand_settings_name = null }) {
        const form = new FormData();
        form.append('quantity', quantity);
        form.append('package_id', package_id);
        form.append('type', type);
        form.append('description', description);

        if (brand_settings_name) {
            form.append('brand_settings_name', brand_settings_name);
        }

        try {
            const response = await airaloApiClient.post(process.env.AIRALO_ORDERS_URL, form, {
                headers: form.getHeaders(),
                validateStatus: () => true,
            });

            console.log(`Order created with status: ${response.status}`);
            return response;
        } catch (error) {
            console.error('Order creation error:', error.response?.data || error.message);
            throw error;
        }
    }
}

export default new OrderService();
