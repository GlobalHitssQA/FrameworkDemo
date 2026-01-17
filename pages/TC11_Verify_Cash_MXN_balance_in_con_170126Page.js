const { expect } = require('@playwright/test');

class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.bankContractOption = '[data-testid="bank-contract-option"]';
    this.contractTypeSelector = '[data-testid="contract-type-selector"]';
    this.bankContractType = '[data-testid="contract-type-banco"]';
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-value-breakdown-popup"]';
    this.cashMxnItem = '[data-testid="efectivo-mxn-item"]';
    this.cashMxnAmount = '[data-testid="efectivo-mxn-amount"]';
    this.contractList = '[data-testid="contract-list"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
  }

  async navigateToActicenter() {
    await this.page.goto('/acticenter');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible' });
  }

  async selectBankContract() {
    await this.page.click(this.contractTypeSelector);
    await this.page.click(this.bankContractType);
    await this.page.waitForSelector(this.contractList, { state: 'visible' });
    await this.page.click(this.bankContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isCashMxnItemVisible() {
    await this.page.waitForSelector(this.cashMxnItem, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.cashMxnItem);
  }

  async getCashMxnAmount() {
    const amountText = await this.page.textContent(this.cashMxnAmount);
    return this.parseAmount(amountText);
  }

  async getExpectedAccountBalance() {
    // This method would typically fetch the expected balance from test data or API
    // For now, it returns the value from a data attribute or stored test context
    const balanceElement = await this.page.getAttribute(this.cashMxnItem, 'data-expected-balance');
    return this.parseAmount(balanceElement);
  }

  parseAmount(amountString) {
    if (!amountString) return 0;
    // Remove currency symbols, commas, and whitespace
    const cleanAmount = amountString.replace(/[^0-9.-]/g, '');
    return parseFloat(cleanAmount);
  }

  async closeBreakdownPopup() {
    // Click outside the popup to close it
    await this.page.click(this.mainScreen, { position: { x: 10, y: 10 } });
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ActicenterPage;