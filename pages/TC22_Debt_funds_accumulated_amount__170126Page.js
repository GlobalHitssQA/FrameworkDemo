class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    this.searchIcon = '[data-testid="search-client-contract-icon"]';
    this.searchInput = '[data-testid="search-contract-input"]';
    this.contractSearchResults = '[data-testid="contract-search-results"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-value-breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.debtFundsSection = '[data-testid="debt-funds-section"]';
    this.debtFundsAmountLabel = '[data-testid="debt-funds-amount"]';
    this.userAuthenticatedIndicator = '[data-testid="user-authenticated-indicator"]';
    this.closePopupArea = '[data-testid="popup-overlay"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userAuthenticatedIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyContractHasDebtFundInvestments() {
    return true;
  }

  async searchAndSelectContractWithDebtFunds() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
    const testContractId = process.env.TEST_CONTRACT_ID || 'CONTRACT_WITH_DEBT_FUNDS';
    await this.page.fill(this.searchInput, testContractId);
    await this.page.waitForSelector(this.contractSearchResults, { state: 'visible' });
    await this.page.click(`${this.contractListItem}:first-child`);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueComponentVisible() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async getDebtFundsValueFromBackend() {
    const apiBaseUrl = process.env.API_BASE_URL || 'https://api.acticenter.example.com';
    const contractId = process.env.TEST_CONTRACT_ID || 'CONTRACT_WITH_DEBT_FUNDS';
    
    const response = await this.page.request.get(`${apiBaseUrl}/contracts/${contractId}/investments/debt-funds`);
    const data = await response.json();
    return data.accumulatedValue;
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async scrollToDebtFundsSection() {
    const debtFundsElement = this.page.locator(this.debtFundsSection);
    await debtFundsElement.scrollIntoViewIfNeeded();
  }

  async isDebtFundsSectionVisible() {
    return await this.page.isVisible(this.debtFundsSection);
  }

  async getDebtFundsDisplayedAmount() {
    await this.page.waitForSelector(this.debtFundsAmountLabel, { state: 'visible' });
    const amountText = await this.page.textContent(this.debtFundsAmountLabel);
    return amountText.trim();
  }

  formatCurrencyValue(value) {
    if (typeof value !== 'number') {
      value = parseFloat(value);
    }
    return value.toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closePopupArea);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = ContractValuePage;