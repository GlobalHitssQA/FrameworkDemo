class ActicenterContractPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.bancoPersonaMoralContractItem = '[data-testid="contract-item-banco-persona-moral"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.efectivoUsdItem = '[data-testid="breakdown-item-efectivo-usd"]';
    this.efectivoUsdValue = '[data-testid="efectivo-usd-value"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.mexdolarAccountIndicator = '[data-testid="mexdolar-account-indicator"]';
    this.loadingSpinner = '[data-testid="loading-spinner"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectBancoPersonaMoralContractWithMexdolar() {
    const contractSelector = `${this.bancoPersonaMoralContractItem}[data-has-mexdolar="true"]`;
    await this.page.waitForSelector(contractSelector, { state: 'visible', timeout: 10000 });
    await this.page.click(contractSelector);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractValueComponentDisplayed() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async waitForMexdolarValidation() {
    await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden', timeout: 10000 });
    await this.page.waitForSelector(this.mexdolarAccountIndicator, { state: 'visible', timeout: 5000 });
  }

  async isEfectivoUsdItemVisible() {
    await this.page.waitForSelector(this.efectivoUsdItem, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.efectivoUsdItem);
  }

  async getEfectivoUsdValue() {
    await this.page.waitForSelector(this.efectivoUsdValue, { state: 'visible', timeout: 5000 });
    return await this.page.textContent(this.efectivoUsdValue);
  }

  isValidUsdCurrencyFormat(value) {
    const usdPattern = /^\$[\d,]+(\.\d{2})?\s*(USD|usd)?$/;
    const alternativePattern = /^USD\s*\$?[\d,]+(\.\d{2})?$/;
    return usdPattern.test(value.trim()) || alternativePattern.test(value.trim());
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }
}

module.exports = ActicenterContractPage;