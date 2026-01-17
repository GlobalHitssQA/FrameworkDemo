class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    
    // Search locators
    this.searchButton = '[data-testid="search-client-button"]';
    this.searchInput = '[data-testid="search-client-input"]';
    this.searchResultsList = '[data-testid="search-results-list"]';
    
    // Contract list locators
    this.contractList = '[data-testid="contract-list"]';
    this.contractItem = '[data-testid="contract-item"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    
    // Total value component locators
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.totalValueAmount = '[data-testid="total-value-amount"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownOverlay = '[data-testid="breakdown-overlay"]';
    this.closePopupButton = '[data-testid="close-popup-button"]';
    
    // Breakdown items locators
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    
    // Contract identification
    this.currentContractId = '[data-testid="current-contract-id"]';
    this.displayedContractId = '[data-testid="displayed-contract-id"]';
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async clickSearchButton() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async searchClientWithMultipleContracts() {
    const clientId = process.env.TEST_CLIENT_ID || 'CLIENT_MULTIPLE_CONTRACTS';
    await this.page.fill(this.searchInput, clientId);
    await this.page.press(this.searchInput, 'Enter');
    await this.page.waitForSelector(this.searchResultsList, { state: 'visible' });
    await this.page.click(`${this.searchResultsList} >> nth=0`);
  }

  async isContractListVisible() {
    return await this.page.isVisible(this.contractList);
  }

  async selectContractByIndex(index) {
    const contracts = this.page.locator(this.contractItem);
    await contracts.nth(index).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isBreakdownPopupHidden() {
    return await this.page.isHidden(this.breakdownPopup);
  }

  async hasBreakdownItems() {
    const hasItems = await this.page.isVisible(this.purchasingPowerMXN) ||
                     await this.page.isVisible(this.cashMXN) ||
                     await this.page.isVisible(this.debtFunds);
    return hasItems;
  }

  async closePopup() {
    const closeButtonVisible = await this.page.isVisible(this.closePopupButton);
    if (closeButtonVisible) {
      await this.page.click(this.closePopupButton);
    } else {
      await this.page.click(this.breakdownOverlay, { position: { x: 10, y: 10 } });
    }
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async captureContractValues() {
    const values = {};
    values.totalValue = await this.getTextContentSafe(this.totalValueAmount);
    values.purchasingPowerMXN = await this.getTextContentSafe(this.purchasingPowerMXN);
    values.cashMXN = await this.getTextContentSafe(this.cashMXN);
    values.cashUSD = await this.getTextContentSafe(this.cashUSD);
    values.debtFunds = await this.getTextContentSafe(this.debtFunds);
    values.hedgeFunds = await this.getTextContentSafe(this.hedgeFunds);
    values.equityFunds = await this.getTextContentSafe(this.equityFunds);
    values.moneyMarket = await this.getTextContentSafe(this.moneyMarket);
    values.capitalMarket = await this.getTextContentSafe(this.capitalMarket);
    values.pendingSettlement = await this.getTextContentSafe(this.pendingSettlement);
    return values;
  }

  async getTextContentSafe(selector) {
    try {
      const isVisible = await this.page.isVisible(selector);
      if (isVisible) {
        return await this.page.textContent(selector);
      }
      return null;
    } catch {
      return null;
    }
  }

  async isContractLoaded() {
    await this.page.waitForLoadState('networkidle');
    return await this.page.isVisible(this.totalValueComponent);
  }

  compareContractValues(firstValues, secondValues) {
    const keys = Object.keys(firstValues);
    for (const key of keys) {
      if (firstValues[key] !== secondValues[key] && 
          firstValues[key] !== null && 
          secondValues[key] !== null) {
        return true;
      }
    }
    return false;
  }

  async getCurrentContractId() {
    return await this.page.textContent(this.currentContractId);
  }

  async getDisplayedContractId() {
    return await this.page.textContent(this.displayedContractId);
  }

  async verifyValuesConsistency() {
    const totalValueText = await this.page.textContent(this.totalValueAmount);
    const isPopupVisible = await this.page.isVisible(this.breakdownPopup);
    return totalValueText !== null && totalValueText.length > 0 && isPopupVisible;
  }
}

module.exports = ContractValuePage;