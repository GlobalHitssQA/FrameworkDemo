class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators - inferidos siguiendo mejores prácticas
    this._searchInput = '[data-testid="contract-search-input"]';
    this._searchButton = '[data-testid="contract-search-button"]';
    this._contractValueComponent = '[data-testid="contract-total-value"]';
    this._breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this._hedgeFundsSection = '[data-testid="hedge-funds-section"]';
    this._hedgeFundsValue = '[data-testid="hedge-funds-value"]';
    this._userProfileIndicator = '[data-testid="user-profile"]';
    this._contractListItem = '[data-testid="contract-list-item"]';
    this._breakdownCloseButton = '[data-testid="breakdown-close-button"]';
  }

  async navigateToActicenter() {
    // URL base debe ser configurada en el ambiente
    const baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    await this.page.goto(baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this._userProfileIndicator, { state: 'visible', timeout: 10000 });
  }

  async searchAndSelectContractWithHedgeFunds() {
    const contractNumber = process.env.TEST_CONTRACT_WITH_HEDGE_FUNDS || 'CONTRACT_ID';
    await this.page.fill(this._searchInput, contractNumber);
    await this.page.click(this._searchButton);
    await this.page.waitForSelector(this._contractListItem, { state: 'visible' });
    await this.page.click(this._contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this._contractValueComponent);
  }

  async getExpectedHedgeFundsValueFromBackend() {
    // Llamada al servicio backend para obtener valor esperado
    const apiBaseUrl = process.env.ACTICENTER_API_URL || 'https://api.acticenter.example.com';
    const contractId = process.env.TEST_CONTRACT_WITH_HEDGE_FUNDS || 'CONTRACT_ID';
    
    const response = await this.page.request.get(
      `${apiBaseUrl}/contracts/${contractId}/investments/hedge-funds`
    );
    
    const data = await response.json();
    return data.totalValueMXN;
  }

  async clickContractValueComponent() {
    await this.page.click(this._contractValueComponent);
    await this.page.waitForSelector(this._breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this._breakdownPopup);
  }

  async scrollToHedgeFundsSection() {
    const hedgeFundsElement = this.page.locator(this._hedgeFundsSection);
    await hedgeFundsElement.scrollIntoViewIfNeeded();
  }

  async isHedgeFundsSectionVisible() {
    return await this.page.isVisible(this._hedgeFundsSection);
  }

  async getHedgeFundsDisplayedValue() {
    const valueElement = this.page.locator(this._hedgeFundsValue);
    const text = await valueElement.textContent();
    return text.trim();
  }

  formatCurrencyMXN(value) {
    // Formato mexicano: $1,234,567.89
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  async closeBreakdownPopup() {
    await this.page.click(this._breakdownCloseButton);
    await this.page.waitForSelector(this._breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;