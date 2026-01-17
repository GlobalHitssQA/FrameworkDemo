class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Contract selection locators
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractWithVariableFundsOption = '[data-testid="contract-item-variable-funds"]';
    
    // Contract value component locators
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    
    // Variable income funds specific locators
    this.variableIncomeFundsItem = '[data-testid="breakdown-item-fondos-renta-variable"]';
    this.variableIncomeFundsLabel = '[data-testid="breakdown-item-fondos-renta-variable"] .item-label';
    this.variableIncomeFundsValue = '[data-testid="breakdown-item-fondos-renta-variable"] .item-value';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async performAuthentication() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectContractWithVariableIncomeFunds() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractWithVariableFundsOption, { state: 'visible' });
    await this.page.click(this.contractWithVariableFundsOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickTotalContractValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async scrollToVariableIncomeFundsItem() {
    const element = this.page.locator(this.variableIncomeFundsItem);
    await element.scrollIntoViewIfNeeded();
  }

  async isVariableIncomeFundsItemVisible() {
    return await this.page.isVisible(this.variableIncomeFundsItem);
  }

  async getVariableIncomeFundsAccumulatedValue() {
    await this.page.waitForSelector(this.variableIncomeFundsValue, { state: 'visible' });
    const valueText = await this.page.textContent(this.variableIncomeFundsValue);
    return valueText ? valueText.trim() : null;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;