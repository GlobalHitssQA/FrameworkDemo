class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.roleSelector = '[data-testid="role-selector"]';
    this.patrimonialBankingRole = '[data-testid="role-patrimonial-banking"]';
    
    // Main screen locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.headerLogo = '[data-testid="acticenter-header-logo"]';
    
    // Contract selector locators
    this.contractSelectorButton = '[data-testid="contract-selector-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.legalEntityContractOption = '[data-testid="contract-option-persona-moral"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Operation flow locators
    this.operationFlowContainer = '[data-testid="operation-flow-container"]';
    this.operationFlowLoaded = '[data-testid="operation-flow-loaded"]';
    
    // Total contract value component locators
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.totalContractValueAmount = '[data-testid="total-contract-value-amount"]';
    this.totalContractValueCurrency = '[data-testid="total-contract-value-currency"]';
    this.contractValueDate = '[data-testid="contract-value-date"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsPatrimonialBankingAdvisor() {
    const username = process.env.ADVISOR_USERNAME || 'test_advisor';
    const password = process.env.ADVISOR_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
    
    const roleSelectorVisible = await this.page.isVisible(this.roleSelector);
    if (roleSelectorVisible) {
      await this.page.click(this.roleSelector);
      await this.page.click(this.patrimonialBankingRole);
    }
  }

  async isMainScreenVisible() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.mainScreen);
  }

  async openContractSelector() {
    await this.page.click(this.contractSelectorButton);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async selectLegalEntityContract() {
    await this.page.click(this.legalEntityContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isOperationFlowVisible() {
    await this.page.waitForSelector(this.operationFlowContainer, { state: 'visible', timeout: 15000 });
    return await this.page.isVisible(this.operationFlowLoaded);
  }

  async isTotalContractValueComponentVisible() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async getTotalContractValueCurrency() {
    await this.page.waitForSelector(this.totalContractValueCurrency, { state: 'visible' });
    return await this.page.textContent(this.totalContractValueCurrency);
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.totalContractValueAmount, { state: 'visible' });
    return await this.page.textContent(this.totalContractValueAmount);
  }

  async isValidMonetaryAmount(value) {
    if (!value) return false;
    const cleanedValue = value.replace(/[,$\s]/g, '');
    const numericValue = parseFloat(cleanedValue);
    return !isNaN(numericValue) && numericValue >= 0;
  }
}

module.exports = ContractValuePage;