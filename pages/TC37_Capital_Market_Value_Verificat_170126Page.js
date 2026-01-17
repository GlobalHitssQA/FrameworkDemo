const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    
    this.searchIcon = '[data-testid="search-client-contract"]';
    this.searchInput = '[data-testid="search-input"]';
    this.contractOption = '[data-testid="contract-option"]';
    
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.capitalMarketSection = '[data-testid="capital-market-section"]';
    this.capitalMarketValue = '[data-testid="capital-market-value"]';
    
    this.contractLoadedIndicator = '[data-testid="contract-loaded"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpassword';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchAndSelectContract() {
    const contractId = process.env.TEST_CONTRACT_ID || 'CONTRACT-001';
    
    await this.page.click(this.searchIcon);
    await this.page.fill(this.searchInput, contractId);
    await this.page.waitForSelector(this.contractOption);
    await this.page.click(this.contractOption);
  }

  async waitForContractToLoad() {
    await this.page.waitForSelector(this.contractLoadedIndicator, { state: 'visible', timeout: 10000 });
  }

  async getReferenceValueFromSource() {
    return process.env.CAPITAL_MARKET_REFERENCE_VALUE || '1,234,567.89';
  }

  async clickTotalContractValue() {
    await this.page.click(this.totalContractValue);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isCapitalMarketSectionVisible() {
    return await this.page.isVisible(this.capitalMarketSection);
  }

  async getCapitalMarketValue() {
    await this.page.waitForSelector(this.capitalMarketValue, { state: 'visible' });
    return await this.page.textContent(this.capitalMarketValue);
  }

  normalizeMonetaryValue(value) {
    if (!value) return '';
    return value.replace(/[^0-9.]/g, '');
  }

  async hasCapitalMarketCurrencyFormat() {
    const value = await this.getCapitalMarketValue();
    const currencyPattern = /^\$?[\d,]+(\.\d{2})?$|^[\d,]+(\.\d{2})?\s*(MXN|USD)?$/;
    return currencyPattern.test(value.trim());
  }

  async isCapitalMarketValueRightAligned() {
    const element = await this.page.$(this.capitalMarketValue);
    if (!element) return false;
    
    const textAlign = await element.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.textAlign;
    });
    
    return textAlign === 'right' || textAlign === 'end';
  }
}

module.exports = ContractValuePage;