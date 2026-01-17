class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.casaDeBolsaPersonaMoralOption = '[data-testid="contract-option-casa-bolsa-persona-moral"]';
    this.totalValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.poderDeCompraMXNItem = '[data-testid="breakdown-item-poder-compra-mxn"]';
    this.poderDeCompraMXNValue = '[data-testid="breakdown-value-poder-compra-mxn"]';
    this.closeBreakdownButton = '[data-testid="breakdown-popup-close-button"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticate() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectCasaDeBolsaPersonaMoralContract() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.casaDeBolsaPersonaMoralOption, { state: 'visible' });
    await this.page.click(this.casaDeBolsaPersonaMoralOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isPoderDeCompraMXNVisible() {
    return await this.page.isVisible(this.poderDeCompraMXNItem);
  }

  async isPoderDeCompraMXNValueAlignedRight() {
    const element = await this.page.locator(this.poderDeCompraMXNValue);
    const textAlign = await element.evaluate(el => {
      return window.getComputedStyle(el).textAlign;
    });
    return textAlign === 'right' || textAlign === 'end';
  }

  async getPoderDeCompraMXNValue() {
    const element = await this.page.locator(this.poderDeCompraMXNValue);
    const text = await element.textContent();
    return text.trim();
  }

  async getExpectedCurrentCashValue() {
    // This method should retrieve the expected currentcash value from the API or test data
    // Implementation depends on how test data is managed in the project
    const testData = this.page.context().testData || {};
    return testData.expectedCurrentCash || '$0.00';
  }

  async contractHasPoderDeCompraBalance() {
    const value = await this.getPoderDeCompraMXNValue();
    return value !== '$0.00' && value !== '0.00' && value !== '$0';
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractBreakdownPage;