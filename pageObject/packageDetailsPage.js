export class PackageDetailsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    //Locators: 
    this.packageDetailCard = page.getByTestId('package-detail');
    this.simDetailTitle = page.getByTestId('sim-detail-operator-title');
    this.simDetailCoverage = page.locator('[data-testid="sim-detail-info-list"] [data-testid="COVERAGE-value"]');
    this.simDetailData = page.locator('[data-testid="sim-detail-info-list"] [data-testid="DATA-value"]');
    this.simDetailValidity = page.locator('[data-testid="sim-detail-info-list"] [data-testid="VALIDITY-value"]');
    this.simDetailPrice = page.locator('[data-testid="sim-detail-info-list"] [data-testid="PRICE-value"]');
  }

  //Methods

  /**
   * Helper function to extract the details (title, coverage, value, price) from eSIM item
   * @param {*} simItemLocator the locator from the list of eSIM cards which has "BUY NOW" text button and it is selected by index defined in the test e.g. const simCardIndex = 0; 
   * @returns the sim card details in json format
   */  
  async getSimCardDetails(simItemLocator) {
    return {
      title: (await simItemLocator.getByTestId('operator-title').textContent()).trim(),
      coverage: (await simItemLocator.getByTestId('COVERAGE-value').textContent()).trim(),
      data: (await simItemLocator.getByTestId('DATA-value').textContent()).trim(),
      validity: (await simItemLocator.getByTestId('VALIDITY-value').textContent()).trim(),
      price: (await simItemLocator.getByTestId('PRICE-value').textContent()).trim(),
    };
  }
}
