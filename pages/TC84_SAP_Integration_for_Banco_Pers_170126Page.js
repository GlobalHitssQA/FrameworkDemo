class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Authentication
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    this.authenticatedUserBadge = '[data-testid="authenticated-user-badge"]';
    
    // Locators - Search
    this.searchButton = '[data-testid="search-client-contract-button"]';
    this.searchInput = '[data-testid="search-input"]';
    this.searchResultsList = '[data-testid="search-results-list"]';
    this.contractSearchOption = '[data-testid="contract-search-option"]';
    
    // Locators - Contract Selection
    this.bancoPersonaMoralFilter = '[data-testid="filter-banco-persona-moral"]';
    this.mexdolarContractItem = '[data-testid="contract-item-mexdolar"]';
    this.contractLoadedIndicator = '[data-testid="contract-loaded-indicator"]';
    this.contractHeader = '[data-testid="contract-header"]';
    
    // Locators - Contract Value Component
    this.contractValueComponent = '[data-testid="contract-total-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Locators - Breakdown Fields
    this.usdCashField = '[data-testid="breakdown-efectivo-usd"]';
    this.usdCashValue = '[data-testid="efectivo-usd-value"]';
    this.usdCashCurrencyLabel = '[data-testid="efectivo-usd-currency"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    
    // Locators - SAP Integration
    this.sapLoadingIndicator = '[data-testid="sap-loading-indicator"]';
    this.sapDataContainer = '[data-testid="sap-data-container"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible', timeout: 10000 });
    const isAuthenticated = await this.page.isVisible(this.authenticatedUserBadge);
    if (!isAuthenticated) {
      throw new Error('User is not authenticated in Acticenter');
    }
  }

  async verifyMexdolarContractExists() {
    await this.openSearchPanel();
    await this.page.fill(this.searchInput, 'Mexdolar');
    await this.page.waitForSelector(this.searchResultsList, { state: 'visible' });
    const hasResults = await this.page.isVisible(this.mexdolarContractItem);
    await this.page.keyboard.press('Escape');
    return hasResults;
  }

  async openSearchPanel() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async searchForBancoPersonaMoralContract() {
    await this.page.fill(this.searchInput, 'Banco Persona Moral Mexdolar');
    await this.page.waitForSelector(this.searchResultsList, { state: 'visible' });
    const filterVisible = await this.page.isVisible(this.bancoPersonaMoralFilter);
    if (filterVisible) {
      await this.page.click(this.bancoPersonaMoralFilter);
    }
  }

  async selectMexdolarContract() {
    await this.page.waitForSelector(this.mexdolarContractItem, { state: 'visible' });
    await this.page.click(this.mexdolarContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractLoaded() {
    await this.page.waitForSelector(this.contractLoadedIndicator, { state: 'visible', timeout: 15000 });
    const headerVisible = await this.page.isVisible(this.contractHeader);
    const valueComponentVisible = await this.page.isVisible(this.contractValueComponent);
    return headerVisible && valueComponentVisible;
  }

  async clickContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
    await this.page.click(this.contractValueComponent);
  }

  async waitForBreakdownPopup() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 10000 });
    const sapLoading = await this.page.isVisible(this.sapLoadingIndicator);
    if (sapLoading) {
      await this.page.waitForSelector(this.sapLoadingIndicator, { state: 'hidden', timeout: 30000 });
    }
  }

  async verifySAPServiceCall() {
    const sapDataVisible = await this.page.isVisible(this.sapDataContainer);
    const usdFieldVisible = await this.page.isVisible(this.usdCashField);
    return sapDataVisible || usdFieldVisible;
  }

  async getUSDCashFieldValue() {
    await this.page.waitForSelector(this.usdCashValue, { state: 'visible' });
    const value = await this.page.textContent(this.usdCashValue);
    return value ? value.trim() : null;
  }

  async getUSDCashCurrencyLabel() {
    const labelVisible = await this.page.isVisible(this.usdCashCurrencyLabel);
    if (labelVisible) {
      return await this.page.textContent(this.usdCashCurrencyLabel);
    }
    const fieldText = await this.page.textContent(this.usdCashField);
    return fieldText ? fieldText.trim() : '';
  }

  async closeBreakdownPopup() {
    const closeButtonVisible = await this.page.isVisible(this.breakdownCloseButton);
    if (closeButtonVisible) {
      await this.page.click(this.breakdownCloseButton);
      await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
    }
  }
};

module.exports = ContractBreakdownPage;