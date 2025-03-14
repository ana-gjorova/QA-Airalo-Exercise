import fs from 'fs';

export class UtilsPage {
    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page
    }

    //Custom methods 

    /**
     * Custom method for saving data to .json
     * @param {*} fileName the path of the file
     * @param {*} fileDetails the file details we want to write into the json
     * Example usage: utils.saveDataToJsonFile('fixtures/packageDetails.json', packageDetails);
     */
    async saveDataToJsonFile(fileName, fileDetails) {
        fs.writeFileSync(fileName, JSON.stringify(fileDetails, null, 2));
    }
}
