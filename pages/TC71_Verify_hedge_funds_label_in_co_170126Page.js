const { expect } = require('@playwright/test');

class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this._mainScreen = '[data-testid="acticenter-main-screen"]';
    this._contractSelector = '[data-testid="contract-selector"]';
    this._contractWithHedgeFunds = '[data-testid="contract-hedge-funds"]';
    this._totalContractValueComponent = '[data-testid="total-contract-value"]';
    this._breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this._breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this._hedgeFundsLabel = '[data-testid="breakdown-item-fondos-cobertura"]';
    this._hedgeFundsLabelAlternative = '[data-testid="hedge-funds-label"]';
    this._closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    this._searchClientInput = '[data-testid="search-client-input"]';
    this._searchIcon = '[data-testid="search-icon"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this._mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithHedgeFunds() {
    await this.page.click(this._contractSelector);
    await this.page.waitForSelector(this._contractWithHedgeFunds, { state: 'visible' });
    await this.page.click(this._contractWithHedgeFunds);
  }

  async verifyTotalContractValueComponentIsVisible() {
    await this.page.waitForSelector(this._totalContractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this._totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this._breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this._breakdownPopup);
  }

  async getHedgeFundsLabelText() {
    const hedgeFundsElement = await this.page.locator(this._hedgeFundsLabel).or(this.page.locator(this._hedgeFundsLabelAlternative));
    await hedgeFundsElement.waitFor({ state: 'visible', timeout: 5000 });
    return await hedgeFundsElement.textContent();
  }

  async closeBreakdownPopup() {
    await this.page.click(this._closeBreakdownButton);
    await this.page.waitForSelector(this._breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ActicenterPage;