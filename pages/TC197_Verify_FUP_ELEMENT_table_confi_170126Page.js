const { expect } = require('@playwright/test');

class FupElementPage {
  constructor(page) {
    this.page = page;
    
    this.databaseConsoleUrl = '/bscs7/database-console';
    
    this.connectionStatusIndicator = '[data-testid="db-connection-status"]';
    this.queryInputField = '[data-testid="sql-query-input"]';
    this.executeQueryButton = '[data-testid="execute-query-btn"]';
    this.resultsTable = '[data-testid="query-results-table"]';
    this.tableHeaderRow = '[data-testid="results-header-row"]';
    this.tableDataRows = '[data-testid="results-data-row"]';
    
    this.columnFuPackId = '[data-testid="column-fu-pack-id"]';
    this.columnFupVersion = '[data-testid="column-fup-version"]';
    this.columnFupElement = '[data-testid="column-fup-element"]';
    this.columnCheckOrder = '[data-testid="column-check-order"]';
    this.columnRecVersion = '[data-testid="column-rec-version"]';
    
    this.manufacturePackageRows = '[data-testid="package-row-manufacture"]';
    this.unsoldShowroomPackageRows = '[data-testid="package-row-unsold-showroom"]';
    this.serviceTypeCell = '[data-testid="cell-service-type"]';
    this.checkOrderCell = '[data-testid="cell-check-order"]';
    this.fupVersionCell = '[data-testid="cell-fup-version"]';
    
    this.gmPackagesQuery = `SELECT FU_PACK_ID, FUP_VERSION, FUP_ELEMENT, CHECK_ORDER, REC_VERSION FROM SYSADM.FUP_ELEMENT WHERE FU_PACK_ID IN (SELECT FU_PACK_ID FROM SYSADM.FU_PACK WHERE PACK_NAME LIKE '%GM%')`;
    this.versionValidationQuery = `SELECT FUP_VERSION FROM SYSADM.FUP_VERSION WHERE STATUS = 'ACTIVE'`;
  }

  async navigateToDatabaseConsole() {
    await this.page.goto(this.databaseConsoleUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDatabaseConnection() {
    const connectionStatus = this.page.locator(this.connectionStatusIndicator);
    await expect(connectionStatus).toBeVisible();
    const statusText = await connectionStatus.textContent();
    return statusText.includes('Connected');
  }

  async executeGMPackagesQuery() {
    await this.page.locator(this.queryInputField).fill(this.gmPackagesQuery);
    await this.page.locator(this.executeQueryButton).click();
    await this.page.waitForSelector(this.resultsTable);
  }

  async verifyRequiredColumnsDisplayed() {
    const requiredColumns = [
      this.columnFuPackId,
      this.columnFupVersion,
      this.columnFupElement,
      this.columnCheckOrder,
      this.columnRecVersion
    ];
    
    for (const column of requiredColumns) {
      const isVisible = await this.page.locator(column).isVisible();
      if (!isVisible) return false;
    }
    return true;
  }

  async getManufacturePackageElements() {
    const rows = this.page.locator(this.manufacturePackageRows);
    const count = await rows.count();
    const services = [];
    
    for (let i = 0; i < count; i++) {
      const serviceType = await rows.nth(i).locator(this.serviceTypeCell).textContent();
      services.push(serviceType.trim());
    }
    
    return { count, services };
  }

  async getUnsoldShowroomPackageElements() {
    const rows = this.page.locator(this.unsoldShowroomPackageRows);
    const count = await rows.count();
    const services = [];
    
    for (let i = 0; i < count; i++) {
      const serviceType = await rows.nth(i).locator(this.serviceTypeCell).textContent();
      services.push(serviceType.trim());
    }
    
    return { count, services };
  }

  async validateCheckOrderSequence() {
    const checkOrderCells = this.page.locator(this.checkOrderCell);
    const count = await checkOrderCells.count();
    
    for (let i = 0; i < count; i++) {
      const value = await checkOrderCells.nth(i).textContent();
      const numericValue = parseInt(value.trim(), 10);
      if (isNaN(numericValue) || numericValue < 0) {
        return false;
      }
    }
    return true;
  }

  async validateFupVersionConsistency() {
    await this.page.locator(this.queryInputField).fill(this.versionValidationQuery);
    await this.page.locator(this.executeQueryButton).click();
    await this.page.waitForSelector(this.resultsTable);
    
    const activeVersions = [];
    const versionRows = this.page.locator(this.tableDataRows);
    const versionCount = await versionRows.count();
    
    for (let i = 0; i < versionCount; i++) {
      const version = await versionRows.nth(i).locator(this.fupVersionCell).textContent();
      activeVersions.push(version.trim());
    }
    
    await this.executeGMPackagesQuery();
    
    const elementVersionCells = this.page.locator(this.fupVersionCell);
    const elementCount = await elementVersionCells.count();
    
    for (let i = 0; i < elementCount; i++) {
      const elementVersion = await elementVersionCells.nth(i).textContent();
      if (!activeVersions.includes(elementVersion.trim())) {
        return false;
      }
    }
    return true;
  }
}

module.exports = FupElementPage;