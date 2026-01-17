class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.searchButton = '[data-testid="contract-search-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.casaDeBolsaIndividualOption = '[data-testid="contract-option-casa-bolsa-fisica"]';
    this.operationScreen = '[data-testid="operation-screen"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.purchasingPowerMXNLabel = '[data-testid="breakdown-item-poder-compra-mxn"]';
    this.purchasingPowerMXNValue = '[data-testid="breakdown-value-poder-compra-mxn"]';
    this.advisorModuleCurrentCash = '[data-testid="advisor-module-currentcash"]';
    this.authenticatedIndicator = '[data-testid="user-authenticated"]';
    this.contractAccessIndicator = '[data-testid="contract-access-granted"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.authenticatedIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyContractAccess() {
    return await this.page.isVisible(this.contractAccessIndicator);
  }

  async openContractSearch() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async selectCasaDeBolsaIndividualContract() {
    await this.page.click(this.casaDeBolsaIndividualOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isOperationScreenDisplayed() {
    return await this.page.isVisible(this.operationScreen);
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isPurchasingPowerMXNVisible() {
    return await this.page.isVisible(this.purchasingPowerMXNLabel);
  }

  async hasPurchasingPowerMXNValue() {
    const valueText = await this.page.textContent(this.purchasingPowerMXNValue);
    return valueText && valueText.trim().length > 0;
  }

  async getPurchasingPowerMXNValue() {
    const valueText = await this.page.textContent(this.purchasingPowerMXNValue);
    return this.normalizeMonetaryValue(valueText);
  }

  async getCurrentCashFromAdvisorModule() {
    const valueText = await this.page.textContent(this.advisorModuleCurrentCash);
    return this.normalizeMonetaryValue(valueText);
  }

  normalizeMonetaryValue(value) {
    if (!value) return null;
    return value.replace(/[^0-9.-]/g, '');
  }
};

module.exports = ContractBreakdownPage;