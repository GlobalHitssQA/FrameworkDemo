const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators - Authentication
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    // Locators - Contract Search
    this.contractSearchButton = page.locator('[data-testid="contract-search-button"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.searchIcon = page.locator('[data-testid="search-icon"]');
    
    // Locators - Contract List
    this.bankContractWithoutMexdolar = page.locator('[data-testid="bank-contract-no-mexdolar"]');
    this.brokerageContractWithoutDollar = page.locator('[data-testid="brokerage-contract-no-dollar"]');
    this.contractLoadedIndicator = page.locator('[data-testid="contract-loaded-indicator"]');
    
    // Locators - Total Contract Value Component
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value"]');
    
    // Locators - Breakdown Popup
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownCloseButton = page.locator('[data-testid="breakdown-close-button"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
    
    // Locators - Cash Items
    this.usdCashItem = page.locator('[data-testid="cash-item-usd"]');
    this.usdCashValue = page.locator('[data-testid="cash-value-usd"]');
    this.mxnCashItem = page.locator('[data-testid="cash-item-mxn"]');
    
    // Locators - Other Breakdown Items
    this.purchasePowerMxn = page.locator('[data-testid="purchase-power-mxn"]');
    this.debtFunds = page.locator('[data-testid="debt-funds"]');
    this.hedgeFunds = page.locator('[data-testid="hedge-funds"]');
    this.equityFunds = page.locator('[data-testid="equity-funds"]');
    this.moneyMarket = page.locator('[data-testid="money-market"]');
    this.capitalMarket = page.locator('[data-testid="capital-market"]');
    this.pendingSettlement = page.locator('[data-testid="pending-settlement"]');
    
    // Locators - Contract Query Access
    this.contractQuerySection = page.locator('[data-testid="contract-query-section"]');
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://ota-acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async performLogin() {
    await this.usernameInput.fill(process.env.TEST_USERNAME || 'testuser');
    await this.passwordInput.fill(process.env.TEST_PASSWORD || 'testpassword');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractQueryAccess() {
    await this.contractQuerySection.waitFor({ state: 'visible', timeout: 10000 });
  }

  async openContractSearch() {
    await this.contractSearchButton.click();
    await this.contractSearchInput.waitFor({ state: 'visible' });
  }

  async selectBankContractWithoutMexdolar() {
    await this.bankContractWithoutMexdolar.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectBrokerageContractWithoutDollarBalance() {
    await this.brokerageContractWithoutDollar.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractLoaded() {
    return await this.contractLoadedIndicator.isVisible();
  }

  async clickTotalContractValue() {
    await this.totalContractValueComponent.click();
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async searchForUsdCashItem() {
    await this.breakdownItemsList.waitFor({ state: 'visible' });
  }

  async isUsdCashItemVisible() {
    return await this.usdCashItem.isVisible();
  }

  async getUsdCashValue() {
    const valueText = await this.usdCashValue.textContent();
    return valueText.trim();
  }

  async closeBreakdownPopup() {
    await this.breakdownCloseButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }

  async clickOutsidePopupToClose() {
    await this.page.click('body', { position: { x: 10, y: 10 } });
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }
}

module.exports = ContractBreakdownPage;