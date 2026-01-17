const { expect } = require('@playwright/test');

class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.mainScreenContainer = '[data-testid="acticenter-main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.casaDeBolsaContractOption = '[data-testid="contract-option-casa-bolsa"]';
    this.contractInfoSection = '[data-testid="contract-info-section"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.usdCashItem = '[data-testid="cash-usd-item"]';
    this.usdCashAmount = '[data-testid="cash-usd-amount"]';
    this.currencyIndicator = '[data-testid="currency-indicator-usd"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || '/acticenter');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreenContainer, { state: 'visible', timeout: 10000 });
  }

  async selectCasaDeBolsaContractWithUSDBalance() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.casaDeBolsaContractOption, { state: 'visible' });
    await this.page.click(this.casaDeBolsaContractOption);
  }

  async verifyContractInformationIsLoaded() {
    await this.page.waitForSelector(this.contractInfoSection, { state: 'visible', timeout: 10000 });
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getUSDCashItemText() {
    await this.page.waitForSelector(this.usdCashItem, { state: 'visible' });
    return await this.page.textContent(this.usdCashItem);
  }

  async verifyUSDCashIsInDollars() {
    const amountText = await this.page.textContent(this.usdCashAmount);
    const hasUSDIndicator = await this.page.isVisible(this.currencyIndicator);
    const containsUSDSymbol = amountText.includes('USD') || amountText.includes('$');
    const doesNotContainMXN = !amountText.includes('MXN') && !amountText.includes('pesos');
    return (hasUSDIndicator || containsUSDSymbol) && doesNotContainMXN;
  }
}

module.exports = ActicenterPage;