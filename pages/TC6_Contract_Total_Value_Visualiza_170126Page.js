class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.roleSelector = '[data-testid="role-selector"]';
    this.wealthManagementRole = '[data-testid="role-wealth-management"]';
    
    // Main screen locators
    this.mainScreen = '[data-testid="main-screen"]';
    this.headerLogo = '[data-testid="acticenter-logo"]';
    
    // Contract selector locators
    this.contractSelectorButton = '[data-testid="contract-selector-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchIcon = '[data-testid="search-icon"]';
    this.legalEntityContractOption = '[data-testid="contract-option-persona-moral"]';
    this.contractList = '[data-testid="contract-list"]';
    
    // Operation flow locators
    this.operationFlowContainer = '[data-testid="operation-flow-container"]';
    this.operationFlowHeader = '[data-testid="operation-flow-header"]';
    
    // Total contract value component locators
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.totalContractValueAmount = '[data-testid="total-contract-value-amount"]';
    this.totalContractValueCurrency = '[data-testid="total-contract-value-currency"]';
    this.contractValueLabel = '[data-testid="contract-value-label"]';
    this.valueBreakdownButton = '[data-testid="value-breakdown-button"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsWealthManagementBanker() {
    const username = process.env.ACTICENTER_USERNAME || 'test_banker';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
    
    const roleSelector = this.page.locator(this.roleSelector);
    if (await roleSelector.isVisible()) {
      await this.page.click(this.wealthManagementRole);
    }
  }

  async isMainScreenVisible() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.mainScreen);
  }

  async openContractSelector() {
    await this.page.click(this.contractSelectorButton);
    await this.page.waitForSelector(this.contractList, { state: 'visible' });
  }

  async selectLegalEntityContract() {
    await this.page.click(this.legalEntityContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isOperationFlowVisible() {
    await this.page.waitForSelector(this.operationFlowContainer, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.operationFlowContainer);
  }

  async isTotalContractValueComponentVisible() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async getContractValueCurrency() {
    const currencyElement = this.page.locator(this.totalContractValueCurrency);
    if (await currencyElement.isVisible()) {
      return await currencyElement.textContent();
    }
    const amountText = await this.page.locator(this.totalContractValueAmount).textContent();
    return amountText;
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.totalContractValueAmount, { state: 'visible' });
    const valueText = await this.page.locator(this.totalContractValueAmount).textContent();
    return valueText;
  }

  async isValidMonetaryAmount(value) {
    if (!value) return false;
    const cleanedValue = value.replace(/[\s,$MXN]/g, '');
    const numericPattern = /^[\d,]+(\.\d{2})?$/;
    return numericPattern.test(cleanedValue) || !isNaN(parseFloat(cleanedValue.replace(/,/g, '')));
  }
}

module.exports = ContractValuePage;