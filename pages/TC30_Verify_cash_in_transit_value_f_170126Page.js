class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.bankContractOption = '[data-testid="bank-contract-option"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.cashInTransitItem = '[data-testid="cash-in-transit-item"]';
    this.cashInTransitValue = '[data-testid="cash-in-transit-value"]';
    this.contractTypeSelector = '[data-testid="contract-type-selector"]';
    this.bankContractType = '[data-testid="contract-type-bank"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifySAPPrenotesServiceAvailability() {
    const response = await this.page.request.get(`${this.baseUrl}/api/sap/prenotes/health`);
    return response.ok();
  }

  async selectBankContract() {
    await this.page.click(this.contractTypeSelector);
    await this.page.click(this.bankContractType);
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
  }

  async isTotalContractValueComponentVisible() {
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async getCashInTransitFromSAPService() {
    const response = await this.page.request.get(`${this.baseUrl}/api/sap/prenotes/cash-in-transit`);
    const data = await response.json();
    return data.cashInTransit;
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async locateCashInTransitItem() {
    await this.page.waitForSelector(this.cashInTransitItem, { state: 'visible' });
  }

  async isCashInTransitItemVisible() {
    return await this.page.isVisible(this.cashInTransitItem);
  }

  async getCashInTransitDisplayedValue() {
    const valueText = await this.page.textContent(this.cashInTransitValue);
    return valueText.trim();
  }

  async formatCurrencyValue(numericValue) {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericValue);
  }
}

module.exports = ContractValuePage;