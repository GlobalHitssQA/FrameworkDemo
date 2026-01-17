class InPoolCalculationPage {
  constructor(page) {
    this.page = page;
    this.shellConfigurationSection = '[data-testid="shell-configuration-section"]';
    this.shellStatusIndicator = '[data-testid="shell-status-indicator"]';
    this.soldLinesTable = '[data-testid="sold-lines-table"]';
    this.soldLinesRows = '[data-testid="sold-lines-table"] tbody tr';
    this.documentAllTable = '[data-testid="document-all-table"]';
    this.documentAllTableRows = '[data-testid="document-all-table"] tbody tr';
    this.parametricTable = '[data-testid="parametric-table-bscst"]';
    this.parametricTableRates = '[data-testid="parametric-rates-config"]';
    this.scenarioConfigForm = '[data-testid="scenario-config-form"]';
    this.consumptionTypeSelect = '[data-testid="consumption-type-select"]';
    this.poolLimitInput = '[data-testid="pool-limit-input"]';
    this.lineCountInput = '[data-testid="line-count-input"]';
    this.trafficAmountInput = '[data-testid="traffic-amount-input"]';
    this.executeShellButton = '[data-testid="execute-shell-button"]';
    this.shellExecutionStatus = '[data-testid="shell-execution-status"]';
    this.telemetryProcessedIndicator = '[data-testid="telemetry-processed-indicator"]';
    this.filterConceptSelect = '[data-testid="filter-concept-select"]';
    this.filterPeriodInput = '[data-testid="filter-period-input"]';
    this.applyFilterButton = '[data-testid="apply-filter-button"]';
    this.occConceptCell = '[data-testid="occ-concept-cell"]';
    this.occAmountCell = '[data-testid="occ-amount-cell"]';
    this.excessConsumptionCheckbox = '[data-testid="excess-consumption-checkbox"]';
    this.excessMBInput = '[data-testid="excess-mb-input"]';
    this.bulkRateIndicator = '[data-testid="bulk-rate-indicator"]';
    this.serviceInPoolOption = '[data-testid="service-in-pool-option"]';
    this.serviceInPoolBulkOption = '[data-testid="service-in-pool-bulk-option"]';
    this.IN_POOL_RATE_PER_10MB = 1.30;
    this.BULK_RATE_PER_MB = 0.0372;
    this.MB_PER_LINE = 10;
  }

  async navigateToShellConfiguration() {
    await this.page.click('[data-testid="menu-shell-configuration"]');
    await this.page.waitForSelector(this.shellConfigurationSection);
  }

  async verifyShellIsConfigured() {
    const status = await this.page.locator(this.shellStatusIndicator).textContent();
    return status === 'Configured' || status === 'Active';
  }

  async verifySOLDLinesAvailable() {
    await this.page.waitForSelector(this.soldLinesTable);
    const rowCount = await this.page.locator(this.soldLinesRows).count();
    return rowCount > 0;
  }

  async navigateToDocumentAllTable() {
    await this.page.click('[data-testid="menu-document-all"]');
    await this.page.waitForSelector(this.documentAllTable);
  }

  async verifyDocumentAllTableAccessible() {
    return await this.page.locator(this.documentAllTable).isVisible();
  }

  async navigateToParametricTable() {
    await this.page.click('[data-testid="menu-parametric-tables"]');
    await this.page.waitForSelector(this.parametricTable);
  }

  async verifyParametricTableHasRates() {
    return await this.page.locator(this.parametricTableRates).isVisible();
  }

  async configureSOLDLinesWithinPool() {
    await this.page.click('[data-testid="new-scenario-button"]');
    await this.page.waitForSelector(this.scenarioConfigForm);
    await this.page.selectOption(this.consumptionTypeSelect, 'within-pool');
    await this.page.fill(this.lineCountInput, '10');
    await this.page.fill(this.trafficAmountInput, '100');
    await this.page.click('[data-testid="save-scenario-button"]');
  }

  async executeInPoolShell() {
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.shellExecutionStatus);
  }

  async getShellExecutionStatus() {
    await this.page.waitForSelector(`${this.shellExecutionStatus}[data-status]`);
    return await this.page.locator(this.shellExecutionStatus).getAttribute('data-status');
  }

  async verifyTelemetryTrafficProcessed() {
    return await this.page.locator(this.telemetryProcessedIndicator).isVisible();
  }

  async queryDocumentAllByServiceInPool() {
    await this.navigateToDocumentAllTable();
    await this.page.selectOption(this.filterConceptSelect, 'Servicio In Pool');
    await this.page.click(this.applyFilterButton);
    await this.page.waitForSelector(this.documentAllTableRows);
  }

  async getServiceInPoolOCCRecord() {
    const concept = await this.page.locator(this.occConceptCell).first().textContent();
    const amountText = await this.page.locator(this.occAmountCell).first().textContent();
    const amount = parseFloat(amountText.replace('S/. ', '').replace(',', '.'));
    return { concept, amount };
  }

  async calculateExpectedInPoolAmount() {
    const lineCount = await this.page.locator(this.lineCountInput).inputValue();
    return parseInt(lineCount) * this.IN_POOL_RATE_PER_10MB;
  }

  async configureSOLDLinesExceedingPool() {
    await this.page.click('[data-testid="new-scenario-button"]');
    await this.page.waitForSelector(this.scenarioConfigForm);
    await this.page.selectOption(this.consumptionTypeSelect, 'exceeding-pool');
    await this.page.fill(this.lineCountInput, '10');
    await this.page.fill(this.trafficAmountInput, '150');
    await this.page.check(this.excessConsumptionCheckbox);
    await this.page.fill(this.excessMBInput, '50');
    await this.page.click('[data-testid="save-scenario-button"]');
  }

  async executeInPoolShellWithExcess() {
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.shellExecutionStatus);
    await this.page.waitForSelector(this.bulkRateIndicator);
  }

  async verifyExcessConsumptionProcessed() {
    const statusText = await this.page.locator(this.shellExecutionStatus).textContent();
    return statusText.includes('excess') || statusText.includes('processed');
  }

  async verifyBulkRateCalculation() {
    return await this.page.locator(this.bulkRateIndicator).isVisible();
  }

  async queryDocumentAllByServiceInPoolBulk() {
    await this.navigateToDocumentAllTable();
    await this.page.selectOption(this.filterConceptSelect, 'Servicio In Pool Granel');
    await this.page.click(this.applyFilterButton);
    await this.page.waitForSelector(this.documentAllTableRows);
  }

  async getServiceInPoolBulkOCCRecord() {
    const concept = await this.page.locator(this.occConceptCell).first().textContent();
    const amountText = await this.page.locator(this.occAmountCell).first().textContent();
    const amount = parseFloat(amountText.replace('S/. ', '').replace(',', '.'));
    return { concept, amount };
  }

  async calculateExpectedBulkAmount() {
    const excessMB = await this.page.locator(this.excessMBInput).inputValue();
    return parseFloat((parseInt(excessMB) * this.BULK_RATE_PER_MB).toFixed(4));
  }
}

module.exports = InPoolCalculationPage;