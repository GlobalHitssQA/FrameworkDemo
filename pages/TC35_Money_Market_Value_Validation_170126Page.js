class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.searchIcon = '[data-testid="search-icon"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.contractOption = '[data-testid="contract-option"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="value-breakdown-popup"]';
    this.moneyMarketRow = '[data-testid="money-market-row"]';
    this.moneyMarketValue = '[data-testid="money-market-value"]';
    this.contractLoadedIndicator = '[data-testid="contract-loaded"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpass';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchAndSelectContract() {
    const contractId = process.env.TEST_CONTRACT_ID || 'CONTRACT001';
    
    await this.page.click(this.searchIcon);
    await this.page.fill(this.searchInput, contractId);
    await this.page.waitForSelector(this.contractOption);
    await this.page.click(this.contractOption);
  }

  async waitForContractToLoad() {
    await this.page.waitForSelector(this.contractLoadedIndicator, { state: 'visible', timeout: 10000 });
  }

  async getSourceSystemMoneyMarketValue() {
    return process.env.REFERENCE_MONEY_MARKET_VALUE || '0.00';
  }

  async clickTotalContractValue() {
    await this.page.click(this.totalContractValue);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getMoneyMarketValue() {
    await this.page.waitForSelector(this.moneyMarketValue);
    return await this.page.textContent(this.moneyMarketValue);
  }

  normalizeMonetaryValue(value) {
    if (!value) return '0';
    return value.replace(/[$,\s]/g, '').replace(/MXN|USD/gi, '').trim();
  }

  validateCurrencyFormat(value) {
    const currencyPattern = /^\$?[\d,]+(\.\d{2})?\s*(MXN|USD)?$/i;
    return currencyPattern.test(value.trim());
  }

  async isMoneyMarketValueRightAligned() {
    const element = await this.page.locator(this.moneyMarketValue);
    const textAlign = await element.evaluate(el => window.getComputedStyle(el).textAlign);
    return textAlign === 'right' || textAlign === 'end';
  }
};

module.exports = ContractValuePage;