class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.roleSelector = '[data-testid="role-selector"]';
    this.wealthManagementRoleOption = '[data-testid="role-wealth-management-banker"]';
    
    // Main screen locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.headerLogo = '[data-testid="acticenter-header-logo"]';
    
    // Contract selector locators
    this.contractSelectorButton = '[data-testid="contract-selector-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchIcon = '[data-testid="contract-search-icon"]';
    this.physicalPersonContractOption = '[data-testid="contract-type-physical-person"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Operation flow locators
    this.operationFlowContainer = '[data-testid="operation-flow-container"]';
    this.operationFlowLoaded = '[data-testid="operation-flow-loaded"]';
    
    // Total contract value component locators
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.totalContractValueAmount = '[data-testid="total-contract-value-amount"]';
    this.totalContractValueCurrency = '[data-testid="total-contract-value-currency"]';
    this.contractValueLabel = '[data-testid="contract-value-label"]';
    this.valueUpdateDate = '[data-testid="value-update-date"]';
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
    
    const roleSelectorVisible = await this.page.isVisible(this.roleSelector);
    if (roleSelectorVisible) {
      await this.page.click(this.roleSelector);
      await this.page.click(this.wealthManagementRoleOption);
    }
  }

  async isMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.mainScreen);
  }

  async openContractSelector() {
    await this.page.click(this.contractSelectorButton);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async selectPhysicalPersonContract() {
    await this.page.click(this.physicalPersonContractOption);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isOperationFlowDisplayed() {
    await this.page.waitForSelector(this.operationFlowContainer, { state: 'visible', timeout: 15000 });
    return await this.page.isVisible(this.operationFlowContainer);
  }

  async isTotalContractValueComponentVisible() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async getTotalContractValueText() {
    await this.page.waitForSelector(this.totalContractValueAmount, { state: 'visible' });
    return await this.page.textContent(this.totalContractValueAmount);
  }

  valueContainsMXNCurrency(valueText) {
    const mxnPatterns = [/MXN/i, /\$/, /pesos/i, /M\.N\./i];
    return mxnPatterns.some(pattern => pattern.test(valueText));
  }

  async hasTotalContractValueDisplayed() {
    const valueText = await this.getTotalContractValueText();
    const numericPattern = /[\d,]+\.?\d*/;
    return numericPattern.test(valueText) && valueText.trim().length > 0;
  }
}

module.exports = ContractValuePage;