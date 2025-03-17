import { test, expect } from '@playwright/test';
import OrderService from '../../api/services/orderService';

test('Validate the order is successfully created', async () => {
    const orderDetails = {
        quantity: 6,
        package_id: 'merhaba-7days-1gb',
        type: 'sim',
        description: 'Test order (unbranded)',
        brand_settings_name: null,
    };

    const response = await OrderService.createOrder(orderDetails);

    expect(response.status).toBe(200);
    const orderResponse = response.data;

    expect(orderResponse).toBeDefined();
    expect(orderResponse.meta.message).toBe('success');
    expect(orderResponse.data.package_id).toBe(orderDetails.package_id);
    expect(orderResponse.data.quantity).toBe(orderDetails.quantity);

    console.log('Order successfully created:', orderResponse.data);
});
