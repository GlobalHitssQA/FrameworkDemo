const { expect } = require('@playwright/test');

class InPoolCalculationPage {
  constructor(page) {
    this.page = page;
    
    this.databaseConnectionPanel = '[data-testid="database-connection-panel"]';
    this.tableExplorerSection = '[data-testid="table-explorer-section"]';
    this.parametricTableRow = '[data-testid="table-row-bscst-fect-rng-param"]';
    this.queryInputField = '[data-testid="query-input-field"]';
    this.executeQueryButton = '[data-testid="execute-query-button"]';
    this.queryResultsGrid = '[data-testid="query-results-grid"]';
    this.packageCostCell = '[data-testid="cost-value-inpool-10mb"]';
    this.bulkRateCell = '[data-testid="cost-value-bulk-excess"]';
    this.shellExecutionPanel = '[data-testid="shell-execution-panel"]';
    this.traceabilityLogCheckbox = '[data-testid="enable-traceability-log"]';
    this.executeShellButton = '[data-testid="execute-shell-button"]';
    this.shellLogOutput = '[data-testid="shell-log-output"]';
    this.documentAllSection = '[data-testid="document-all-section"]';
    this.occListTable = '[data-testid="occ-list-table"]';
    this.occPackageAmountCell = '[data-testid="occ-package-amount"]';
    this.occBulkRateCell = '[data-testid="occ-bulk-rate"]';
    this.tableStatusIndicator = '[data-testid="table-status-indicator"]';
    this.recordCountDisplay = '[data-testid="record-count-display"]';
  }

  async navigateToDatabase() {
    await this.page.locator(this.databaseConnectionPanel).waitFor({ state: 'visible' });
    await this.page.locator(this.tableExplorerSection).click();
  }

  async verifyParametricTableExists() {
    await this.page.locator(this.queryInputField).fill('SELECT * FROM TIM.BSCST_FECT_RNG_PARAM WHERE ROWNUM = 1');
    await this.page.locator(this.executeQueryButton).click();
    await this.page.locator(this.queryResultsGrid).waitFor({ state: 'visible' });
    const statusIndicator = await this.page.locator(this.tableStatusIndicator).textContent();
    return statusIndicator.includes('Available') || statusIndicator.includes('OK');
  }

  async verifyTableHasInPoolRecords() {
    const recordCount = await this.page.locator(this.recordCountDisplay).textContent();
    return parseInt(recordCount) > 0;
  }

  async queryInPoolPackageCost() {
    const query = "SELECT COST_VALUE FROM TIM.BSCST_FECT_RNG_PARAM WHERE PARAM_TYPE = 'INPOOL_PACKAGE_10MB'";
    await this.page.locator(this.queryInputField).fill(query);
    await this.page.locator(this.executeQueryButton).click();
    await this.page.locator(this.queryResultsGrid).waitFor({ state: 'visible' });
  }

  async getPackageCostValue() {
    const costText = await this.page.locator(this.packageCostCell).textContent();
    return parseFloat(costText.replace('S/.', '').trim());
  }

  async queryBulkExcessRate() {
    const query = "SELECT COST_VALUE FROM TIM.BSCST_FECT_RNG_PARAM WHERE PARAM_TYPE = 'INPOOL_BULK_EXCESS_RATE'";
    await this.page.locator(this.queryInputField).fill(query);
    await this.page.locator(this.executeQueryButton).click();
    await this.page.locator(this.queryResultsGrid).waitFor({ state: 'visible' });
  }

  async getBulkRateValue() {
    const rateText = await this.page.locator(this.bulkRateCell).textContent();
    return parseFloat(rateText.replace('S/.', '').trim());
  }

  async executeCalculationShellWithLog() {
    await this.page.locator(this.shellExecutionPanel).click();
    await this.page.locator(this.traceabilityLogCheckbox).check();
    await this.page.locator(this.executeShellButton).click();
    await this.page.locator(this.shellLogOutput).waitFor({ state: 'visible' });
  }

  async verifyShellLogContainsParameterReading() {
    const logContent = await this.page.locator(this.shellLogOutput).textContent();
    return logContent.includes('TIM.BSCST_FECT_RNG_PARAM') && 
           logContent.includes('Reading parameters') &&
           logContent.includes('SUCCESS');
  }

  async navigateToDocumentAll() {
    await this.page.locator(this.documentAllSection).click();
    await this.page.locator(this.occListTable).waitFor({ state: 'visible' });
  }

  async verifyOCCsUseParametricCosts() {
    const occTable = await this.page.locator(this.occListTable).isVisible();
    const hasPackageOCC = await this.page.locator(this.occPackageAmountCell).isVisible();
    const hasBulkOCC = await this.page.locator(this.occBulkRateCell).isVisible();
    return occTable && hasPackageOCC && hasBulkOCC;
  }

  async getOCCPackageAmount() {
    const amountText = await this.page.locator(this.occPackageAmountCell).textContent();
    return parseFloat(amountText.replace('S/.', '').trim());
  }

  async getOCCBulkRatePerMB() {
    const rateText = await this.page.locator(this.occBulkRateCell).textContent();
    return parseFloat(rateText.replace('S/.', '').trim());
  }
}

module.exports = InPoolCalculationPage;