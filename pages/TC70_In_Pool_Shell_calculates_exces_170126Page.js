class InPoolCalculationPage {
  constructor(page) {
    this.page = page;
    
    this.inPoolConfigSection = '[data-testid="in-pool-configuration"]';
    this.inPoolBagInput = '[data-testid="in-pool-bag-size-input"]';
    this.totalConsumptionInput = '[data-testid="total-consumption-input"]';
    this.saveConfigButton = '[data-testid="save-scenario-config-btn"]';
    this.executeShellButton = '[data-testid="execute-shell-btn"]';
    this.shellExecutionLoader = '[data-testid="shell-execution-loader"]';
    this.shellCalculatedExcessField = '[data-testid="shell-calculated-excess"]';
    this.shellLogPanel = '[data-testid="shell-log-panel"]';
    this.shellLogExcessValue = '[data-testid="shell-log-excess-value"]';
    this.documentAllSection = '[data-testid="document-all-section"]';
    this.documentAllSearchInput = '[data-testid="document-all-search-input"]';
    this.occInPoolBulkServiceRow = '[data-testid="occ-in-pool-bulk-service-row"]';
    this.occAmountField = '[data-testid="occ-amount-field"]';
    this.inPoolBagSizeDisplay = '[data-testid="in-pool-bag-size-display"]';
    this.totalConsumptionDisplay = '[data-testid="total-consumption-display"]';
    
    this.bagSize = 0;
    this.totalConsumption = 0;
  }

  async navigateToInPoolConfiguration() {
    await this.page.waitForSelector(this.inPoolConfigSection, { state: 'visible' });
  }

  async configureInPoolBag(size) {
    this.bagSize = size;
    await this.page.fill(this.inPoolBagInput, size.toString());
  }

  async setTotalConsumption(consumption) {
    this.totalConsumption = consumption;
    await this.page.fill(this.totalConsumptionInput, consumption.toString());
  }

  async saveScenarioConfiguration() {
    await this.page.click(this.saveConfigButton);
    await this.page.waitForSelector(this.saveConfigButton, { state: 'visible' });
  }

  async getInPoolBagSize() {
    const bagText = await this.page.textContent(this.inPoolBagSizeDisplay);
    return parseInt(bagText, 10) || this.bagSize;
  }

  async getTotalConsumption() {
    const consumptionText = await this.page.textContent(this.totalConsumptionDisplay);
    return parseInt(consumptionText, 10) || this.totalConsumption;
  }

  async clickExecuteShellButton() {
    await this.page.click(this.executeShellButton);
  }

  async waitForShellExecution() {
    await this.page.waitForSelector(this.shellExecutionLoader, { state: 'hidden', timeout: 60000 });
  }

  async getShellCalculatedExcess() {
    const excessText = await this.page.textContent(this.shellCalculatedExcessField);
    return parseFloat(excessText);
  }

  async getShellLogExcessValue() {
    await this.page.waitForSelector(this.shellLogPanel, { state: 'visible' });
    const logExcessText = await this.page.textContent(this.shellLogExcessValue);
    return parseFloat(logExcessText);
  }

  async navigateToDocumentAll() {
    await this.page.click(this.documentAllSection);
    await this.page.waitForSelector(this.documentAllSearchInput, { state: 'visible' });
  }

  async searchOccInPoolBulkService() {
    await this.page.fill(this.documentAllSearchInput, 'Servicio In Pool Granel');
    await this.page.press(this.documentAllSearchInput, 'Enter');
    await this.page.waitForSelector(this.occInPoolBulkServiceRow, { state: 'visible' });
  }

  async getOccInPoolBulkServiceAmount() {
    const amountText = await this.page.textContent(this.occAmountField);
    return parseFloat(amountText.replace('S/.', '').trim());
  }
}

module.exports = InPoolCalculationPage;