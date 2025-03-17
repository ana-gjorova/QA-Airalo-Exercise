import { test, expect } from '@playwright/test';
import tokenService from '../../api/services/tokenService';

test('Retrieve Airalo OAuth2 access token', async () => {
    const token = await tokenService.getAccessToken();

    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);

    console.log('Token:', token);
});
