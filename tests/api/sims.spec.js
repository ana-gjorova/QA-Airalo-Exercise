import { test, expect } from '@playwright/test';
import SimService from '../../api/services/simService';

test('Validate the list of eSIM contains correct number and package slug', async () => {
    const response = await SimService.getSims({
        include: 'order'});

    expect(response.status).toBe(200);
    const simsResponse = response.data;
    expect(simsResponse.meta.message).toBe('success');
    expect(Array.isArray(simsResponse.data)).toBe(true);
    expect(simsResponse.data.length).toBe(25);

    simsResponse.data.forEach((sim, index) => {
        console.log(`SIM #${index + 1} simable object:`);
        console.log(JSON.stringify(sim.simable, null, 2));
        console.dir(sim.simable, { depth: null }); 

        //validate the sim package id and quantity
        expect(sim.simable.package_id).toBe('merhaba-7days-1gb');
        expect(sim.simable.quantity).toBe(6);

    });

    console.log('Successfully validated all 6 eSIMs');
});
