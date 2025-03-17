import airaloApiClient from '../clients/airaloApiClient';

class SimService {
    async getSims({ include = 'order' } = {}) {
        try {
            const response = await airaloApiClient.get(process.env.AIRALO_ORDERS_SIMS, {
                params: { include },
                validateStatus: () => true,
            });

            console.log(`SIMs fetched with status: ${response.status}`);
            return response;
        } catch (error) {
            console.error('Error fetching SIMs:', error.response?.data || error.message);
            throw error;
        }
    }
}

export default new SimService();
