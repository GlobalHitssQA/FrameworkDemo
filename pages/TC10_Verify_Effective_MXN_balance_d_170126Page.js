class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    // Locators - Authentication
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    this.authenticatedUserContainer = '[data-testid="authenticated-user-container"]';
    
    // Locators - Contract Search
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchIcon = '[data-testid="search-icon-lupa"]';
    this.bancoPersonaMoralOption = '[data-testid="contract-option-banco-persona-moral"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Locators - Operation Screen
    this.operationScreenContainer = '[data-testid="operation-screen-container"]';
    this.selectedContractTypeLabel = '[data-testid="selected-contract-type-label"]';
    this.contractHeader = '[data-testid="contract-header"]';
    
    // Locators - Total Contract Value Component
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.contractValueAmount = '[data-testid="contract-value-amount"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.effectiveMXNItem = '[data-testid="breakdown-item-efectivo-mxn"]';
    this.effectiveMXNLabel = '[data-testid="efectivo-mxn-label"]';
    this.effectiveMXNValue = '[data-testid="efectivo-mxn-value"]';
    this.breakdownCloseButton = '[data-testid="breakdown-popup-close"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.authenticatedUserContainer, { state: 'visible', timeout: 10000 });
  }

  async getExpectedCheckingAccountBalanceFromBackend() {
    // This method should be implemented to fetch expected balance from backend/API
    // For test purposes, this could be mocked or fetched from test data
    const testDataBalance = process.env.EXPECTED_CHECKING_ACCOUNT_BALANCE || '0.00';
    return parseFloat(testDataBalance);
  }

  async openContractSearch() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async selectBancoPersonaMoralContract() {
    const contractIdentifier = process.env.BANCO_PERSONA_MORAL_CONTRACT_ID || 'BANCO-PM-001';
    await this.page.fill(this.contractSearchInput, contractIdentifier);
    await this.page.click(this.contractSearchIcon);
    await this.page.waitForSelector(this.bancoPersonaMoralOption, { state: 'visible' });
    await this.page.click(this.bancoPersonaMoralOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isOperationScreenDisplayed() {
    return await this.page.isVisible(this.operationScreenContainer);
  }

  async getSelectedContractType() {
    await this.page.waitForSelector(this.selectedContractTypeLabel, { state: 'visible' });
    return await this.page.textContent(this.selectedContractTypeLabel);
  }

  async clickTotalContractValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isEffectiveMXNItemVisible() {
    return await this.page.isVisible(this.effectiveMXNItem);
  }

  async getEffectiveMXNValue() {
    await this.page.waitForSelector(this.effectiveMXNValue, { state: 'visible' });
    const rawValue = await this.page.textContent(this.effectiveMXNValue);
    return rawValue.trim();
  }

  formatCurrencyValue(numericValue) {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericValue);
  }

  async closeBreakdownPopup() {
    if (await this.page.isVisible(this.breakdownCloseButton)) {
      await this.page.click(this.breakdownCloseButton);
    }
  }
}

module.exports = ContractBreakdownPage;