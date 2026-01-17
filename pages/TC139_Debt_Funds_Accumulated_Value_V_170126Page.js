class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.debtFundsSection = '[data-testid="debt-funds-section"]';
    this.debtFundsValue = '[data-testid="debt-funds-value"]';
    this.debtFundInvestmentItems = '[data-testid="debt-fund-investment-item"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.userAuthIndicator = '[data-testid="user-authenticated-indicator"]';
    this.backendStatusIndicator = '[data-testid="backend-status-indicator"]';
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userAuthIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyActiveContractExists() {
    await this.page.waitForSelector(this.contractListItem, { state: 'visible', timeout: 10000 });
  }

  async verifyBackendServicesAvailable() {
    const statusIndicator = await this.page.locator(this.backendStatusIndicator);
    await statusIndicator.waitFor({ state: 'visible', timeout: 10000 });
  }

  async selectContractWithDebtFunds() {
    await this.page.click(this.contractSearchButton);
    const contractItems = await this.page.locator(this.contractListItem).all();
    if (contractItems.length > 0) {
      await contractItems[0].click();
    }
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async isContractValueComponentVisible() {
    return await this.page.locator(this.contractValueComponent).isVisible();
  }

  async getIndividualDebtFundValues() {
    const investmentItems = await this.page.locator(this.debtFundInvestmentItems).all();
    const values = [];
    for (const item of investmentItems) {
      const valueText = await item.textContent();
      const numericValue = this.parseMonetaryValue(valueText);
      values.push(numericValue);
    }
    return values;
  }

  async calculateTotalDebtFunds(individualValues) {
    return individualValues.reduce((sum, value) => sum + value, 0);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async isDebtFundsSectionVisible() {
    return await this.page.locator(this.debtFundsSection).isVisible();
  }

  async getDebtFundsDisplayedValue() {
    const valueText = await this.page.locator(this.debtFundsValue).textContent();
    return this.parseMonetaryValue(valueText);
  }

  async compareDebtFundsValues(displayedValue, expectedValue) {
    const tolerance = 0.01;
    return Math.abs(displayedValue - expectedValue) <= tolerance;
  }

  parseMonetaryValue(text) {
    if (!text) return 0;
    const cleanedText = text.replace(/[^0-9.-]/g, '');
    return parseFloat(cleanedText) || 0;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = ContractValuePage;