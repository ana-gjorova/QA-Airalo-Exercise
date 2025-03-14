export class homepage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    //Locators: 
    this.countrySearchInput = page.getByTestId('search-input');
    this.countriesDropdownList = page.locator('.countries-list');
}

  //Methods

  /**
   * Method that selects an option from the country dropdown by matching the provided text
   * @param {string} country The country to be selected from the dropdown list
   * Example usage: selectCountryFromTheDropdown('Japan') - Selects Japan from the dropdown
   */
  async selectCountryFromTheDropdown(country) {
    await this.countrySearchInput.waitFor();
    await this.countrySearchInput.click();
    await this.countrySearchInput.fill(country);
    await this.countriesDropdownList.waitFor();
    await this.page.getByRole('listitem').filter({ hasText: country }).click();
  }
}
