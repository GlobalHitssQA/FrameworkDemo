class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.searchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="contract-search-button"]';
    this.contractValueComponent = '[data-testid="contract-total-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.equityFundsSection = '[data-testid="equity-funds-section"]';
    this.equityFundsAmount = '[data-testid="equity-funds-amount"]';
    this.userAuthIndicator = '[data-testid="user-authenticated-indicator"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.closePopupButton = '[data-testid="close-breakdown-popup"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userAuthIndicator, { state: 'visible', timeout: 10000 });
  }

  async searchAndSelectContractWithEquityFunds() {
    const contractId = process.env.TEST_CONTRACT_ID || 'CONTRACT_WITH_EQUITY_FUNDS';
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
    await this.page.fill(this.searchInput, contractId);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractValueComponent);
  }

  async getExpectedEquityFundsValueFromBackend() {
    const apiUrl = process.env.BACKEND_API_URL || 'https://api.acticenter.example.com';
    const contractId = process.env.TEST_CONTRACT_ID || 'CONTRACT_WITH_EQUITY_FUNDS';
    const response = await this.page.request.get(`${apiUrl}/contracts/${contractId}/equity-funds`);
    const data = await response.json();
    return data.accumulatedValue;
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isEquityFundsSectionVisible() {
    await this.page.waitForSelector(this.equityFundsSection, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.equityFundsSection);
  }

  async getEquityFundsDisplayedAmount() {
    await this.page.waitForSelector(this.equityFundsAmount, { state: 'visible' });
    const amountText = await this.page.textContent(this.equityFundsAmount);
    return amountText.trim();
  }

  formatCurrencyValue(value) {
    if (typeof value !== 'number') {
      value = parseFloat(value);
    }
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closePopupButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractBreakdownPage;