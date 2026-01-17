class FupVersionPage {
  constructor(page) {
    this.page = page;
    this.databaseSelector = '[data-testid="database-selector"]';
    this.queryInput = '[data-testid="query-input"]';
    this.executeButton = '[data-testid="execute-query-btn"]';
    this.resultsTable = '[data-testid="results-table"]';
    this.tableHeader = '[data-testid="table-header"]';
    this.tableRows = '[data-testid="table-row"]';
    this.columnHeaders = '[data-testid="column-header"]';
    this.cellFuPackId = '[data-testid="cell-fu-pack-id"]';
    this.cellFupVersion = '[data-testid="cell-fup-version"]';
    this.cellValidFrom = '[data-testid="cell-valid-from"]';
    this.cellWorkState = '[data-testid="cell-work-state"]';
    this.cellRecVersion = '[data-testid="cell-rec-version"]';
    this.connectionStatus = '[data-testid="connection-status"]';
    this.queryResults = [];
  }

  async navigateToDatabaseConsole() {
    await this.page.goto('/database-console');
    await this.page.waitForSelector(this.databaseSelector);
  }

  async connectToDatabase(databaseName) {
    await this.page.click(this.databaseSelector);
    await this.page.click(`[data-testid="db-option-${databaseName.toLowerCase()}"]`);
    await this.page.waitForSelector(`${this.connectionStatus}:has-text("Connected")`);
  }

  async executeQuery(query) {
    await this.page.fill(this.queryInput, query);
    await this.page.click(this.executeButton);
    await this.page.waitForSelector(this.resultsTable);
  }

  async getTableColumns() {
    const headers = await this.page.$$eval(this.columnHeaders, elements => 
      elements.map(el => el.textContent.trim())
    );
    return headers;
  }

  async verifyPackageHasActiveVersion(packageName) {
    const rows = await this.page.$$eval(this.tableRows, (elements, pkg) => {
      return elements.filter(row => {
        const packId = row.querySelector('[data-testid="cell-fu-pack-id"]');
        const workState = row.querySelector('[data-testid="cell-work-state"]');
        return packId && packId.textContent.includes(pkg) && workState;
      }).length > 0;
    }, packageName);
    return rows;
  }

  async getValidFromDates() {
    const dates = await this.page.$$eval(this.cellValidFrom, elements =>
      elements.map(el => el.textContent.trim())
    );
    return dates;
  }

  async getVersionsByPackageId() {
    const data = await this.page.$$eval(this.tableRows, elements => {
      const result = {};
      elements.forEach(row => {
        const packId = row.querySelector('[data-testid="cell-fu-pack-id"]')?.textContent.trim();
        const version = parseInt(row.querySelector('[data-testid="cell-fup-version"]')?.textContent.trim(), 10);
        if (packId && !isNaN(version)) {
          if (!result[packId]) result[packId] = [];
          result[packId].push(version);
        }
      });
      return result;
    });
    return data;
  }

  async getProductivePackagesWorkState() {
    const workStates = await this.page.$$eval(this.tableRows, elements => {
      return elements.map(row => {
        return row.querySelector('[data-testid="cell-work-state"]')?.textContent.trim();
      }).filter(Boolean);
    });
    return workStates;
  }

  async isWorkStateActiveProduction(workState) {
    const activeStates = ['ACTIVE', 'PRODUCTION', 'PROD', '1', 'A'];
    return activeStates.includes(workState.toUpperCase());
  }
}

module.exports = FupVersionPage;