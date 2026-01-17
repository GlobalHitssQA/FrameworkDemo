const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.loginUsernameInput = '[data-testid="login-username"]';
    this.loginPasswordInput = '[data-testid="login-password"]';
    this.loginSubmitButton = '[data-testid="login-submit"]';
    
    this.searchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="contract-search-button"]';
    this.searchResultItem = '[data-testid="contract-search-result-item"]';
    
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.cedesPagaresRow = '[data-testid="cedes-pagares-row"]';
    this.cedesPagaresValue = '[data-testid="cedes-pagares-value"]';
    
    this.currencyValuePattern = /^\$[\d,]+\.\d{2}$|^-?\$[\d,]+\.\d{2}$/;
  }

  async navigateToLogin() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.loginUsernameInput, username);
    await this.page.fill(this.loginPasswordInput, password);
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchContract(contractId) {
    await this.page.fill(this.searchInput, contractId);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchResultItem, { state: 'visible' });
  }

  async selectContractFromResults() {
    await this.page.click(this.searchResultItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractInformationVisible() {
    return await this.page.isVisible(this.contractInfoContainer);
  }

  async clickTotalContractValue() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getCedesPagaresValue() {
    await this.page.waitForSelector(this.cedesPagaresValue, { state: 'visible' });
    return await this.page.textContent(this.cedesPagaresValue);
  }

  normalizeMonetaryValue(value) {
    if (!value) return '0.00';
    const cleaned = value.replace(/[^\d.-]/g, '');
    const number = parseFloat(cleaned);
    return isNaN(number) ? '0.00' : number.toFixed(2);
  }

  async hasCurrencyFormat() {
    const value = await this.getCedesPagaresValue();
    return this.currencyValuePattern.test(value.trim());
  }

  async isCedesPagaresValueRightAligned() {
    const element = await this.page.$(this.cedesPagaresValue);
    if (!element) return false;
    const textAlign = await element.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.textAlign;
    });
    return textAlign === 'right' || textAlign === 'end';
  }
}

module.exports = ContractBreakdownPage;