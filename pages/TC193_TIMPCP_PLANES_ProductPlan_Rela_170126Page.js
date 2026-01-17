class DatabaseQueryPage {
  constructor(page) {
    this.page = page;
    this.databaseConsoleUrl = '/database/console';
    this.connectionStatusIndicator = '[data-testid="connection-status"]';
    this.databaseSelector = '[data-testid="database-selector"]';
    this.queryInputArea = '[data-testid="query-input"]';
    this.executeQueryButton = '[data-testid="execute-query-btn"]';
    this.resultsTable = '[data-testid="results-table"]';
    this.tableHeaderCells = '[data-testid="results-table"] th';
    this.tableRows = '[data-testid="results-table"] tbody tr';
    this.filterInput = '[data-testid="filter-input"]';
    this.applyFilterButton = '[data-testid="apply-filter-btn"]';
    this.productColumnCells = '[data-testid="results-table"] td[data-column="CCO_PRCO"]';
    this.tmcodeColumnCells = '[data-testid="results-table"] td[data-column="TMCODE"]';
    this.versionColumnCells = '[data-testid="results-table"] td[data-column="VERSION"]';
    this.categoryColumnCells = '[data-testid="results-table"] td[data-column="CAT_PRCO"]';
    this.startDateColumnCells = '[data-testid="results-table"] td[data-column="FECHA_IN_VIG"]';
    this.endDateColumnCells = '[data-testid="results-table"] td[data-column="FECHA_FIN_VIG"]';
    this.permissionsIndicator = '[data-testid="user-permissions"]';
  }

  async navigateToDatabaseConsole() {
    await this.page.goto(this.databaseConsoleUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserHasQueryPermissions() {
    const permissionsElement = this.page.locator(this.permissionsIndicator);
    const permissions = await permissionsElement.textContent();
    return permissions.includes('QUERY') || permissions.includes('READ');
  }

  async connectToDatabase(databaseName) {
    await this.page.locator(this.databaseSelector).click();
    await this.page.locator(`[data-testid="db-option-${databaseName}"]`).click();
    await this.page.waitForSelector(this.connectionStatusIndicator);
  }

  async isDatabaseConnected() {
    const statusElement = this.page.locator(this.connectionStatusIndicator);
    const statusText = await statusElement.textContent();
    return statusText.toLowerCase().includes('connected');
  }

  async executeQuery(query) {
    await this.page.locator(this.queryInputArea).fill(query);
    await this.page.locator(this.executeQueryButton).click();
    await this.page.waitForSelector(this.resultsTable);
  }

  async getDisplayedColumns() {
    const headers = await this.page.locator(this.tableHeaderCells).allTextContents();
    return headers.map(header => header.trim());
  }

  async applyFilterByProduct(productCode) {
    await this.page.locator(this.filterInput).fill(`CCO_PRCO = '${productCode}'`);
    await this.page.locator(this.applyFilterButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  async getFilteredRecords() {
    const rows = await this.page.locator(this.tableRows).count();
    const records = [];
    for (let i = 0; i < rows; i++) {
      const row = this.page.locator(this.tableRows).nth(i);
      const cells = await row.locator('td').allTextContents();
      records.push(cells);
    }
    return records;
  }

  async verifyAllRecordsBelongToProduct(productCode) {
    const productCells = await this.page.locator(this.productColumnCells).allTextContents();
    return productCells.every(cell => cell.includes(productCode));
  }

  async getDistinctPlans() {
    const tmcodeCells = await this.page.locator(this.tmcodeColumnCells).allTextContents();
    return [...new Set(tmcodeCells.map(cell => cell.trim()))];
  }

  async getPlanTmcodeRelations() {
    const rows = await this.page.locator(this.tableRows).count();
    const relations = [];
    for (let i = 0; i < rows; i++) {
      const tmcode = await this.page.locator(this.tmcodeColumnCells).nth(i).textContent();
      const product = await this.page.locator(this.productColumnCells).nth(i).textContent();
      relations.push({ tmcode: tmcode.trim(), product: product.trim() });
    }
    return relations;
  }

  async getVersionDataForPlans() {
    const rows = await this.page.locator(this.tableRows).count();
    const versionData = [];
    for (let i = 0; i < rows; i++) {
      const version = await this.page.locator(this.versionColumnCells).nth(i).textContent();
      const tmcode = await this.page.locator(this.tmcodeColumnCells).nth(i).textContent();
      versionData.push({ version: version.trim(), tmcode: tmcode.trim() });
    }
    return versionData;
  }

  async getCategoryDataForPlans() {
    const rows = await this.page.locator(this.tableRows).count();
    const categoryData = [];
    for (let i = 0; i < rows; i++) {
      const catPrco = await this.page.locator(this.categoryColumnCells).nth(i).textContent();
      const tmcode = await this.page.locator(this.tmcodeColumnCells).nth(i).textContent();
      categoryData.push({ catPrco: catPrco.trim(), tmcode: tmcode.trim() });
    }
    return categoryData;
  }

  async getStartDatesForPlans() {
    const rows = await this.page.locator(this.tableRows).count();
    const startDates = [];
    for (let i = 0; i < rows; i++) {
      const fechaInVig = await this.page.locator(this.startDateColumnCells).nth(i).textContent();
      const tmcode = await this.page.locator(this.tmcodeColumnCells).nth(i).textContent();
      startDates.push({ fechaInVig: fechaInVig.trim() || null, tmcode: tmcode.trim() });
    }
    return startDates;
  }

  async getEndDatesForPlans() {
    const rows = await this.page.locator(this.tableRows).count();
    const endDates = [];
    for (let i = 0; i < rows; i++) {
      const fechaFinVigText = await this.page.locator(this.endDateColumnCells).nth(i).textContent();
      const tmcode = await this.page.locator(this.tmcodeColumnCells).nth(i).textContent();
      const fechaFinVig = fechaFinVigText.trim() === '' || fechaFinVigText.trim().toLowerCase() === 'null' ? null : fechaFinVigText.trim();
      endDates.push({ fechaFinVig: fechaFinVig, tmcode: tmcode.trim() });
    }
    return endDates;
  }
}

module.exports = DatabaseQueryPage;