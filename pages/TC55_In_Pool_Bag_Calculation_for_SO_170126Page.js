class InPoolCalculationPage {
  constructor(page) {
    this.page = page;
    this.testEnvironmentUrl = '/bscs7/test-environment';
    this.soldLinesConfigInput = '[data-testid="sold-lines-config-input"]';
    this.saveConfigButton = '[data-testid="save-config-button"]';
    this.registeredLinesDisplay = '[data-testid="registered-lines-count"]';
    this.executeShellButton = '[data-testid="execute-shell-button"]';
    this.shellStatusIndicator = '[data-testid="shell-execution-status"]';
    this.calculatedBagDisplay = '[data-testid="in-pool-bag-calculated"]';
    this.logsResultsTable = '[data-testid="logs-results-table"]';
    this.zeroConsumptionCheckbox = '[data-testid="zero-consumption-included"]';
    this.withConsumptionCheckbox = '[data-testid="with-consumption-included"]';
    this.billingCycleSelector = '[data-testid="billing-cycle-selector"]';
    this.ratePlanFilter = '[data-testid="rate-plan-filter"]';
  }

  async navigateToTestEnvironment() {
    await this.page.goto(this.testEnvironmentUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async configureSOLDLines(lineCount) {
    await this.page.click(this.ratePlanFilter);
    await this.page.selectOption(this.ratePlanFilter, 'SOLD');
    await this.page.fill(this.soldLinesConfigInput, lineCount.toString());
    await this.page.click(this.saveConfigButton);
    await this.page.waitForSelector(this.registeredLinesDisplay);
  }

  async getRegisteredLinesCount() {
    const text = await this.page.textContent(this.registeredLinesDisplay);
    return parseInt(text, 10);
  }

  async executeCalculationShell() {
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.shellStatusIndicator);
  }

  async getShellExecutionStatus() {
    return await this.page.textContent(this.shellStatusIndicator);
  }

  async getCalculatedInPoolBag() {
    await this.page.waitForSelector(this.calculatedBagDisplay);
    const text = await this.page.textContent(this.calculatedBagDisplay);
    return parseInt(text.replace(/[^0-9]/g, ''), 10);
  }

  async verifyZeroConsumptionLinesIncluded() {
    const isChecked = await this.page.isChecked(this.zeroConsumptionCheckbox);
    return isChecked;
  }

  async verifyConsumptionLinesIncluded() {
    const isChecked = await this.page.isChecked(this.withConsumptionCheckbox);
    return isChecked;
  }
}

module.exports = InPoolCalculationPage;