import { test, expect } from '@playwright/test';
import { homepage } from '../../pageObject/homepage';
import { PackageDetailsPage } from '../../pageObject/packageDetailsPage';
import { UtilsPage } from '../../utils/utils'
import fs from 'fs';

test.describe('Verify Package Details page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Buy eSIMs for international travel - Airalo/);
  });

  test('Verify the selected eSIM package details are correct', async ({ page }) => {
    const home = new homepage(page);
    const packageDetailsPage = new PackageDetailsPage(page);
    const utils = new UtilsPage(page);
    const country = "Japan";
    const simCardIndex = 0;

    await home.selectCountryFromTheDropdown(country);
    //select eSIM package by index (by default set to 0, to select the first one)
    const simItemLocator = page.locator('.sim-item', {
      has: page.locator('[data-testid="esim-button"]', { hasText: 'BUY NOW' })
    }).nth(simCardIndex);

    const packageDetails = await packageDetailsPage.getSimCardDetails(simItemLocator);

    console.log('Package Details from list:', packageDetails);

    await utils.saveDataToJsonFile('fixtures/packageDetails.json', packageDetails);
    await simItemLocator.click();
    await packageDetailsPage.packageDetailCard.waitFor();

    const simPageDetails = {
      title: (await packageDetailsPage.simDetailTitle.textContent()).trim(),
      coverage: (await packageDetailsPage.simDetailCoverage.textContent()).trim(),
      data: (await packageDetailsPage.simDetailData.textContent()).trim(),
      validity: (await packageDetailsPage.simDetailValidity.textContent()).trim(),
      price: (await packageDetailsPage.simDetailPrice.textContent()).trim(),
    };
    console.log('Sim Page Details:', simPageDetails);
    const savedDetails = JSON.parse(fs.readFileSync('fixtures/packageDetails.json', 'utf8'));

    //Assert the package details are correct:
    expect(simPageDetails.title).toBe(savedDetails.title);
    expect(simPageDetails.coverage).toBe(savedDetails.coverage);
    expect(simPageDetails.data).toBe(savedDetails.data);
    expect(simPageDetails.validity).toBe(savedDetails.validity);
    expect(simPageDetails.price).toBe(savedDetails.price);
  });
});
