const { expect } = require('@playwright/test');

class ContractComponentPage {
  constructor(page) {
    this.page = page;
    
    // Locators - Authentication
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Locators - Contract Search and Selection
    this.searchContractIcon = '[data-testid="search-contract-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.activeContractIndicator = '[data-testid="active-contract-indicator"]';
    
    // Locators - Total Value Component
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.totalValueAmount = '[data-testid="total-value-amount"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopupTrigger = '[data-testid="breakdown-popup-trigger"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownPopupClose = '[data-testid="breakdown-popup-close"]';
    this.breakdownCategory = '[data-testid="breakdown-category"]';
    
    // Locators - Value Categories
    this.buyingPowerMXN = '[data-testid="buying-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.fundsSection = '[data-testid="funds-section"]';
    this.fundsTotal = '[data-testid="funds-total"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    
    // Locators - Fund Purchase
    this.fundPurchaseMenu = '[data-testid="fund-purchase-menu"]';
    this.fundSelector = '[data-testid="fund-selector"]';
    this.fundOption = '[data-testid="fund-option"]';
    this.purchaseAmountInput = '[data-testid="purchase-amount-input"]';
    this.confirmPurchaseButton = '[data-testid="confirm-purchase-button"]';
    this.operationConfirmation = '[data-testid="operation-confirmation"]';
    
    // Locators - Navigation
    this.backToContractButton = '[data-testid="back-to-contract"]';
    this.contractViewContainer = '[data-testid="contract-view-container"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithOperationPermissions() {
    await this.page.fill(this.usernameInput, process.env.TEST_USERNAME || 'test_operator');
    await this.page.fill(this.passwordInput, process.env.TEST_PASSWORD || 'test_password');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveContractExists() {
    await this.page.waitForSelector(this.activeContractIndicator, { timeout: 10000 });
    return await this.page.isVisible(this.activeContractIndicator);
  }

  async selectContract() {
    await this.page.click(this.searchContractIcon);
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async openBreakdownPopup() {
    await this.page.click(this.breakdownPopupTrigger);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async closeBreakdownPopup() {
    const isVisible = await this.page.isVisible(this.breakdownPopup);
    if (isVisible) {
      await this.page.click(this.breakdownPopupClose);
      await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
    }
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getBreakdownCategories() {
    return await this.page.locator(this.breakdownCategory).all();
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.totalValueAmount);
    const text = await this.page.textContent(this.totalValueAmount);
    return this.parseMonetaryValue(text);
  }

  async getBuyingPowerValue() {
    await this.page.waitForSelector(this.buyingPowerMXN);
    const text = await this.page.textContent(this.buyingPowerMXN);
    return this.parseMonetaryValue(text);
  }

  async getFundsValue() {
    await this.page.waitForSelector(this.fundsTotal);
    const text = await this.page.textContent(this.fundsTotal);
    return this.parseMonetaryValue(text);
  }

  async getPendingSettlementValue() {
    await this.page.waitForSelector(this.pendingSettlement);
    const text = await this.page.textContent(this.pendingSettlement);
    return this.parseMonetaryValue(text);
  }

  async navigateToFundPurchase() {
    await this.page.click(this.fundPurchaseMenu);
    await this.page.waitForSelector(this.fundSelector, { state: 'visible' });
  }

  async selectFundToPurchase() {
    await this.page.click(this.fundSelector);
    await this.page.waitForSelector(this.fundOption);
    await this.page.click(this.fundOption);
  }

  async enterPurchaseAmount() {
    const testAmount = process.env.TEST_PURCHASE_AMOUNT || '1000';
    await this.page.fill(this.purchaseAmountInput, testAmount);
  }

  async confirmPurchaseOperation() {
    await this.page.click(this.confirmPurchaseButton);
    await this.page.waitForSelector(this.operationConfirmation, { state: 'visible', timeout: 30000 });
  }

  async isOperationConfirmationVisible() {
    return await this.page.isVisible(this.operationConfirmation);
  }

  async navigateBackToContractView() {
    await this.page.click(this.backToContractButton);
    await this.page.waitForSelector(this.contractViewContainer, { state: 'visible' });
  }

  async waitForValueUpdate() {
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector(this.totalValueAmount, { state: 'visible' });
    await this.page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        return element && element.textContent && element.textContent.trim().length > 0;
      },
      this.totalValueAmount,
      { timeout: 10000 }
    );
  }

  parseMonetaryValue(text) {
    if (!text) return 0;
    const cleaned = text.replace(/[^0-9.-]/g, '');
    return parseFloat(cleaned) || 0;
  }
}

module.exports = ContractComponentPage;