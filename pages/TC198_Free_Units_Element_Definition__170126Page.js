const { expect } = require('@playwright/test');

class FreeUnitsDefinitionPage {
  constructor(page) {
    this.page = page;
    
    this.databaseConsoleUrl = '/database/console';
    this.connectionSelector = '[data-testid="db-connection-selector"]';
    this.queryInput = '[data-testid="sql-query-input"]';
    this.executeButton = '[data-testid="execute-query-btn"]';
    this.resultsTable = '[data-testid="query-results-table"]';
    this.tableHeaders = '[data-testid="query-results-table"] th';
    this.tableRows = '[data-testid="query-results-table"] tbody tr';
    this.connectionStatus = '[data-testid="connection-status"]';
    this.packageNameCell = '[data-testid="cell-fu-pack-id"]';
    this.elementTypeCell = '[data-testid="cell-fup-element"]';
    this.quantityCell = '[data-testid="cell-quantity"]';
    this.unitCell = '[data-testid="cell-free-units-type"]';
    this.intervalLengthCell = '[data-testid="cell-fu-interval-length"]';
  }

  async navigateToDatabaseConsole() {
    await this.page.goto(this.databaseConsoleUrl);
    await this.page.waitForSelector(this.queryInput);
  }

  async connectToDatabase(databaseName) {
    await this.page.click(this.connectionSelector);
    await this.page.click(`[data-testid="db-option-${databaseName}"]`);
    await this.page.waitForSelector(`${this.connectionStatus}:has-text("Connected")`);
  }

  async queryFupElementDefinition() {
    const query = `SELECT FU_PACK_ID, FUP_VERSION, FUP_ELEMENT, VALID_FROM, FREE_UNITS_TYPE, COUNTING_TYPE, CURRENCY, FU_INTERVAL_LENGTH, GRANULARITY_TYPE FROM SYSADM.FUP_ELEMENT_DEFINITION WHERE FU_PACK_ID LIKE '%GM%'`;
    await this.page.fill(this.queryInput, query);
    await this.page.click(this.executeButton);
    await this.page.waitForSelector(this.resultsTable);
  }

  async getTableColumns() {
    const headers = await this.page.$$eval(this.tableHeaders, (ths) => 
      ths.map((th) => th.textContent.trim())
    );
    return headers;
  }

  async getElementByPackageAndType(packageName, elementType) {
    const rows = await this.page.$$(this.tableRows);
    for (const row of rows) {
      const packId = await row.$eval('[data-testid="cell-fu-pack-id"]', (el) => el.textContent.trim());
      const element = await row.$eval('[data-testid="cell-fup-element"]', (el) => el.textContent.trim());
      
      if (packId.includes(packageName) && element === elementType) {
        const quantity = await row.$eval('[data-testid="cell-quantity"]', (el) => parseInt(el.textContent.trim(), 10));
        const unit = await row.$eval('[data-testid="cell-free-units-type"]', (el) => el.textContent.trim());
        return { quantity, unit };
      }
    }
    throw new Error(`Element ${elementType} for package ${packageName} not found`);
  }

  async getAllPackageIntervalLengths() {
    const rows = await this.page.$$(this.tableRows);
    const packages = [];
    for (const row of rows) {
      const packId = await row.$eval('[data-testid="cell-fu-pack-id"]', (el) => el.textContent.trim());
      const intervalLength = await row.$eval('[data-testid="cell-fu-interval-length"]', (el) => el.textContent.trim());
      packages.push({ packId, intervalLength });
    }
    return packages;
  }

  async isMonthlyInterval(intervalValue) {
    const monthlyValues = ['30', '31', 'MONTH', 'MONTHLY', '1M'];
    return monthlyValues.some((val) => intervalValue.toUpperCase().includes(val));
  }
}

module.exports = FreeUnitsDefinitionPage;