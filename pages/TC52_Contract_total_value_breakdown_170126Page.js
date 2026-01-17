const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.searchButton = page.locator('[data-testid="search-client-contract-button"]');
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.searchResultItem = page.locator('[data-testid="contract-search-result-item"]').first();
    this.contractValueComponent = page.locator('[data-testid="contract-total-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.monetaryValueItems = page.locator('[data-testid="breakdown-monetary-item"]');
    this.purchasingPowerMXN = page.locator('[data-testid="purchasing-power-mxn"]');
    this.cashMXN = page.locator('[data-testid="cash-mxn-value"]');
    this.cashUSD = page.locator('[data-testid="cash-usd-value"]');
    this.debtFunds = page.locator('[data-testid="debt-funds-section"]');
    this.hedgeFunds = page.locator('[data-testid="hedge-funds-section"]');
    this.equityFunds = page.locator('[data-testid="equity-funds-section"]');
    this.moneyMarket = page.locator('[data-testid="money-market-section"]');
    this.capitalMarket = page.locator('[data-testid="capital-market-section"]');
    this.pendingSettlement = page.locator('[data-testid="pending-settlement-section"]');
    
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    this.testUsername = process.env.TEST_USERNAME || 'testuser';
    this.testPassword = process.env.TEST_PASSWORD || 'testpassword';
    this.testContract = process.env.TEST_CONTRACT || '123456';
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async performLogin() {
    await this.usernameInput.fill(this.testUsername);
    await this.passwordInput.fill(this.testPassword);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async setResponsivePortraitViewport() {
    await this.page.setViewportSize({ width: 414, height: 896 });
  }

  async clickSearchButton() {
    await this.searchButton.waitFor({ state: 'visible' });
    await this.searchButton.click();
  }

  async enterContractSearch() {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.fill(this.testContract);
    await this.page.keyboard.press('Enter');
  }

  async selectFirstContractResult() {
    await this.searchResultItem.waitFor({ state: 'visible' });
    await this.searchResultItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    await this.contractValueComponent.waitFor({ state: 'visible', timeout: 10000 });
    return await this.contractValueComponent.isVisible();
  }

  async clickContractValueComponent() {
    await this.contractValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
    return await this.breakdownPopup.isVisible();
  }

  async hasMonetaryValuesInBreakdown() {
    const itemCount = await this.monetaryValueItems.count();
    return itemCount > 0;
  }

  async isPopupAlignedVertically() {
    const componentBox = await this.contractValueComponent.boundingBox();
    const popupBox = await this.breakdownPopup.boundingBox();
    
    if (!componentBox || !popupBox) {
      return false;
    }
    
    const isOnRightSide = popupBox.x >= componentBox.x;
    const isVerticallyAligned = 
      popupBox.y >= componentBox.y - 50 && 
      popupBox.y <= componentBox.y + componentBox.height + 50;
    
    return isOnRightSide && isVerticallyAligned;
  }

  async getContractTotalValue() {
    return await this.contractValueComponent.textContent();
  }

  async getPurchasingPowerMXN() {
    return await this.purchasingPowerMXN.textContent();
  }

  async getCashMXN() {
    return await this.cashMXN.textContent();
  }

  async getCashUSD() {
    return await this.cashUSD.textContent();
  }

  async closeBreakdownPopup() {
    await this.page.locator('body').click({ position: { x: 10, y: 10 } });
    await this.breakdownPopup.waitFor({ state: 'hidden', timeout: 3000 });
  }
}

module.exports = ContractValuePage;