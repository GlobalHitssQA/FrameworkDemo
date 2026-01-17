class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainScreen = '[data-testid="main-screen-container"]';
    
    // Contract selector locators
    this.contractSelectorButton = '[data-testid="contract-selector-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.legalEntityContractOption = '[data-testid="contract-option-legal-entity"]';
    this.contractTypeFilter = '[data-testid="contract-type-filter"]';
    this.legalEntityFilterOption = '[data-testid="filter-option-persona-moral"]';
    
    // Operation flow locators
    this.operationFlowContainer = '[data-testid="operation-flow-container"]';
    
    // Contract value component locators
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.contractValueAmount = '[data-testid="contract-value-amount"]';
    this.contractValueCurrency = '[data-testid="contract-value-currency"]';
    this.contractValueDate = '[data-testid="contract-value-date"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsPrivateBankingBanker() {
    const username = process.env.BANKER_USERNAME || 'banker_user';
    const password = process.env.BANKER_PASSWORD || 'banker_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.mainScreen);
  }

  async openContractSelector() {
    await this.page.click(this.contractSelectorButton);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async selectLegalEntityContract() {
    await this.page.click(this.contractTypeFilter);
    await this.page.click(this.legalEntityFilterOption);
    await this.page.waitForSelector(this.legalEntityContractOption, { state: 'visible' });
    await this.page.click(this.legalEntityContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isOperationFlowDisplayed() {
    await this.page.waitForSelector(this.operationFlowContainer, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.operationFlowContainer);
  }

  async isTotalContractValueComponentVisible() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.contractValueAmount, { state: 'visible' });
    const valueText = await this.page.textContent(this.contractValueAmount);
    return valueText;
  }

  async getContractValueCurrency() {
    const currencyText = await this.page.textContent(this.contractValueCurrency);
    return currencyText;
  }

  async isContractValueFormatValid() {
    const valueText = await this.getTotalContractValue();
    const currencyRegex = /^\$[\d,]+(\.\d{2})?$/;
    return currencyRegex.test(valueText.trim());
  }

  async getContractValueDate() {
    const dateText = await this.page.textContent(this.contractValueDate);
    return dateText;
  }
}

module.exports = ContractValuePage;