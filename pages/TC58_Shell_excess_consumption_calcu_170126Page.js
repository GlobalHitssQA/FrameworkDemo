class ExcessCalculationPage {
  constructor(page) {
    this.page = page;
    
    this.systemStatusIndicator = '[data-testid="bscs7-system-status"]';
    this.shellStatusIndicator = '[data-testid="shell-deployment-status"]';
    this.udrTableStatus = '[data-testid="udr-lt-01-table-status"]';
    
    this.scenarioConfigSection = '[data-testid="scenario-configuration"]';
    this.lineCountInput = '[data-testid="input-line-count"]';
    this.planTypeSelect = '[data-testid="select-plan-type"]';
    this.poolSizeInput = '[data-testid="input-pool-size-mb"]';
    this.consumptionInput = '[data-testid="input-total-consumption-mb"]';
    this.saveScenarioButton = '[data-testid="btn-save-scenario"]';
    
    this.executeShellButton = '[data-testid="btn-execute-shell"]';
    this.scenarioSelector = '[data-testid="select-scenario"]';
    
    this.resultsSection = '[data-testid="calculation-results"]';
    this.excessStatusIndicator = '[data-testid="excess-status"]';
    this.excessAmountDisplay = '[data-testid="excess-amount-mb"]';
    this.billingTypeDisplay = '[data-testid="billing-type"]';
    
    this.executionLogSection = '[data-testid="execution-log"]';
    this.successMessage = '[data-testid="msg-execution-success"]';
  }

  async navigateToSystem() {
    await this.page.goto('/bscs7/shell-management');
    await this.page.waitForLoadState('networkidle');
  }

  async verifySystemAvailable() {
    await this.page.waitForSelector(this.systemStatusIndicator);
    const status = await this.page.textContent(this.systemStatusIndicator);
    if (!status.includes('Available') && !status.includes('Disponible')) {
      throw new Error('BSCS7 system is not available');
    }
  }

  async verifyShellDeployed() {
    await this.page.waitForSelector(this.shellStatusIndicator);
    const status = await this.page.textContent(this.shellStatusIndicator);
    if (!status.includes('Deployed') && !status.includes('sh_BSCS_calculaFacturaGM')) {
      throw new Error('Shell sh_BSCS_calculaFacturaGM is not deployed');
    }
  }

  async verifyUdrTableConfigured() {
    await this.page.waitForSelector(this.udrTableStatus);
    const status = await this.page.textContent(this.udrTableStatus);
    if (!status.includes('Configured') && !status.includes('UDR_LT_01')) {
      throw new Error('UDR_LT_01 table is not configured');
    }
  }

  async configureScenario(scenarioNum, lineCount, poolSize, consumption) {
    await this.page.click(this.scenarioConfigSection);
    await this.page.fill(this.lineCountInput, lineCount.toString());
    await this.page.selectOption(this.planTypeSelect, 'SOLD');
    await this.page.fill(this.poolSizeInput, poolSize.toString());
    await this.page.fill(this.consumptionInput, consumption.toString());
    await this.page.click(this.saveScenarioButton);
    await this.page.waitForSelector(this.successMessage);
  }

  async executeShellForScenario(scenarioNum) {
    await this.page.selectOption(this.scenarioSelector, scenarioNum.toString());
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.resultsSection);
  }

  async getExcessStatus() {
    await this.page.waitForSelector(this.excessStatusIndicator);
    const status = await this.page.textContent(this.excessStatusIndicator);
    return status.includes('YES') || status.includes('SÍ') || status.includes('true');
  }

  async getExcessAmount() {
    await this.page.waitForSelector(this.excessAmountDisplay);
    const amountText = await this.page.textContent(this.excessAmountDisplay);
    return parseInt(amountText.replace(/[^0-9]/g, ''), 10);
  }

  async getBillingType() {
    await this.page.waitForSelector(this.billingTypeDisplay);
    const billingType = await this.page.textContent(this.billingTypeDisplay);
    return billingType.toLowerCase().includes('granel') ? 'granel' : billingType;
  }
}

module.exports = ExcessCalculationPage;