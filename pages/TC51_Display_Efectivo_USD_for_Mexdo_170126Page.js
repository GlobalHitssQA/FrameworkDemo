const { expect } = require('@playwright/test');

class ActicenterContractPage {
  constructor(page) {
    this.page = page;
    
    this.mainScreenContainer = '[data-testid="acticenter-main-screen"]';
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.searchIcon = '[data-testid="search-client-contract-icon"]';
    this.searchInput = '[data-testid="search-input-field"]';
    this.searchResultsList = '[data-testid="search-results-list"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
    this.totalValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.efectivoUsdSection = '[data-testid="efectivo-usd-section"]';
    this.efectivoUsdValue = '[data-testid="efectivo-usd-value"]';
    this.efectivoUsdCurrency = '[data-testid="efectivo-usd-currency-indicator"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.mexdolarAccountIndicator = '[data-testid="mexdolar-account-indicator"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithBancoPersonaMoralAccess() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user_banco_pm';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenDisplayed() {
    return await this.page.isVisible(this.mainScreenContainer);
  }

  async openSearchDialog() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async searchForMexdolarContract() {
    const searchTerm = process.env.MEXDOLAR_CONTRACT_ID || 'MEXDOLAR_CONTRACT';
    await this.page.fill(this.searchInput, searchTerm);
    await this.page.press(this.searchInput, 'Enter');
    await this.page.waitForSelector(this.searchResultsList, { state: 'visible' });
  }

  async selectFirstContractResult() {
    await this.page.click(`${this.searchResultItem}:first-child`);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractInfoDisplayed() {
    return await this.page.isVisible(this.contractInfoContainer);
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupDisplayed() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isEfectivoUsdSectionVisible() {
    return await this.page.isVisible(this.efectivoUsdSection);
  }

  async getEfectivoUsdValue() {
    const valueElement = await this.page.locator(this.efectivoUsdValue);
    const value = await valueElement.textContent();
    const currencyIndicator = await this.page.locator(this.efectivoUsdCurrency).textContent();
    return `${value.trim()} ${currencyIndicator.trim()}`;
  }

  async verifyNoExchangeRateApplied() {
    const currencyIndicator = await this.page.locator(this.efectivoUsdCurrency);
    const currencyText = await currencyIndicator.textContent();
    const isUsdDisplayed = currencyText.includes('USD');
    const hasMexdolarIndicator = await this.page.isVisible(this.mexdolarAccountIndicator);
    return isUsdDisplayed && hasMexdolarIndicator;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ActicenterContractPage;