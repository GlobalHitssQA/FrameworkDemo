const { expect } = require('@playwright/test');

class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="contract-search-button"]';
    this.mexdolarContractItem = '[data-testid="contract-item-mexdolar"]';
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
    this.buySellIcon = '[data-testid="buy-sell-icon"]';
    this.operationsModule = '[data-testid="operations-module"]';
    this.luminaErrorMessage = '[data-testid="lumina-error-message"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async searchContract(contractType) {
    await this.page.fill(this.searchInput, contractType);
    await this.page.click(this.searchButton);
  }

  async selectMexdolarContract() {
    await this.page.waitForSelector(this.mexdolarContractItem, { state: 'visible', timeout: 10000 });
    await this.page.click(this.mexdolarContractItem);
  }

  async verifyContractLoaded() {
    await this.page.waitForSelector(this.contractInfoContainer, { state: 'visible', timeout: 10000 });
  }

  async isBuySellIconDisabled() {
    const icon = this.page.locator(this.buySellIcon);
    const isDisabled = await icon.getAttribute('disabled');
    const hasDisabledClass = await icon.evaluate(el => {
      return el.classList.contains('disabled') || 
             el.classList.contains('is-disabled') || 
             el.getAttribute('aria-disabled') === 'true';
    });
    const isPointerEventsNone = await icon.evaluate(el => {
      return window.getComputedStyle(el).pointerEvents === 'none';
    });
    return isDisabled !== null || hasDisabledClass || isPointerEventsNone;
  }

  async clickBuySellIcon() {
    const icon = this.page.locator(this.buySellIcon);
    await icon.click({ force: true }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async isOperationsModuleVisible() {
    const module = this.page.locator(this.operationsModule);
    return await module.isVisible().catch(() => false);
  }

  async isLuminaErrorVisible() {
    const error = this.page.locator(this.luminaErrorMessage);
    return await error.isVisible().catch(() => false);
  }
}

module.exports = ActicenterPage;