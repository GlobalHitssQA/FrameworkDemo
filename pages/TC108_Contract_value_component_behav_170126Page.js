const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://acticenter.example.com';
    this.sessionTimeoutMs = parseInt(process.env.SESSION_TIMEOUT_MS) || 900000;
    
    // Login page locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.loginPage = '[data-testid="login-page"]';
    
    // Contract search and selection locators
    this.searchIcon = '[data-testid="search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractItemById = (id) => `[data-testid="contract-item-${id}"]`;
    
    // Total value component locators
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.totalValueAmount = '[data-testid="total-value-amount"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Breakdown sections locators
    this.moneyMarketSection = '[data-testid="money-market-section"]';
    this.capitalsSection = '[data-testid="capitals-section"]';
    this.cashSection = '[data-testid="cash-section"]';
    this.cashMxn = '[data-testid="cash-mxn"]';
    this.cashUsd = '[data-testid="cash-usd"]';
    this.buyingPowerMxn = '[data-testid="buying-power-mxn"]';
    this.pendingSettlementSection = '[data-testid="pending-settlement-section"]';
    
    // Funds list locators
    this.debtFundsList = '[data-testid="debt-funds-list"]';
    this.hedgeFundsList = '[data-testid="hedge-funds-list"]';
    this.equityFundsList = '[data-testid="equity-funds-list"]';
    
    // Session expired locators
    this.sessionExpiredMessage = '[data-testid="session-expired-message"]';
    this.sessionExpiredModal = '[data-testid="session-expired-modal"]';
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.waitForSelector(this.usernameInput, { state: 'visible' });
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectFirstAvailableContract() {
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    const firstContract = this.page.locator(this.contractListItem).first();
    const contractId = await firstContract.getAttribute('data-contract-id');
    await firstContract.click();
    await this.page.waitForLoadState('networkidle');
    return contractId;
  }

  async selectContractById(contractId) {
    await this.page.click(this.searchIcon);
    await this.page.fill(this.contractSearchInput, contractId);
    await this.page.waitForSelector(this.contractItemById(contractId), { state: 'visible' });
    await this.page.click(this.contractItemById(contractId));
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    try {
      await this.page.click(this.totalValueComponent, { timeout: 5000 });
    } catch (error) {
      // Component click may trigger session expired redirect
    }
  }

  async waitForSessionTimeout() {
    await this.page.waitForTimeout(this.sessionTimeoutMs + 5000);
  }

  async isSessionExpiredMessageVisible() {
    const messageVisible = await this.page.isVisible(this.sessionExpiredMessage);
    const modalVisible = await this.page.isVisible(this.sessionExpiredModal);
    return messageVisible || modalVisible;
  }

  async isLoginPageDisplayed() {
    return await this.page.isVisible(this.loginPage);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isMoneyMarketSectionVisible() {
    return await this.page.isVisible(this.moneyMarketSection);
  }

  async isCapitalsSectionVisible() {
    return await this.page.isVisible(this.capitalsSection);
  }

  async isCashSectionVisible() {
    return await this.page.isVisible(this.cashSection);
  }

  async isPendingSettlementSectionVisible() {
    return await this.page.isVisible(this.pendingSettlementSection);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
  }

  async clickOutsidePopup() {
    await this.page.click('body', { position: { x: 10, y: 10 } });
  }

  async getTotalValueAmount() {
    return await this.page.textContent(this.totalValueAmount);
  }

  async getCashMxnValue() {
    return await this.page.textContent(this.cashMxn);
  }

  async getCashUsdValue() {
    return await this.page.textContent(this.cashUsd);
  }

  async getBuyingPowerMxnValue() {
    return await this.page.textContent(this.buyingPowerMxn);
  }
};

module.exports = ContractValuePage;