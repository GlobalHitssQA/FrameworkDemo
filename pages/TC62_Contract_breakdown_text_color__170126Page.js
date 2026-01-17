const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators - using semantic data-testid attributes
    this.authenticatedUserIndicator = '[data-testid="user-authenticated-indicator"]';
    this.casaDeBolsaContractOption = '[data-testid="contract-casa-bolsa"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.purchasingPowerMXNItem = '[data-testid="breakdown-item-poder-compra-mxn"]';
    this.purchasingPowerMXNText = '[data-testid="breakdown-item-poder-compra-mxn"] .item-label';
    this.closeBreakdownButton = '[data-testid="breakdown-popup-close-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    
    // Expected color from Figma Look & Feel specifications
    this.expectedFigmaColor = 'rgb(51, 51, 51)';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.authenticatedUserIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyCasaDeBolsaContractAccess() {
    const contractElement = this.page.locator(this.casaDeBolsaContractOption);
    await expect(contractElement).toBeVisible({ timeout: 10000 });
  }

  async selectCasaDeBolsaContract() {
    await this.page.click(this.casaDeBolsaContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueComponentVisible() {
    const component = this.page.locator(this.totalContractValueComponent);
    return await component.isVisible();
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    const popup = this.page.locator(this.breakdownPopup);
    return await popup.isVisible();
  }

  async isPurchasingPowerMXNItemVisible() {
    const item = this.page.locator(this.purchasingPowerMXNItem);
    return await item.isVisible();
  }

  async inspectPurchasingPowerTextColor() {
    await this.page.waitForSelector(this.purchasingPowerMXNText, { state: 'visible' });
  }

  async getPurchasingPowerTextColor() {
    const element = this.page.locator(this.purchasingPowerMXNText);
    const color = await element.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    return color;
  }

  async getExpectedFigmaTextColor() {
    return this.expectedFigmaColor;
  }

  async verifyTextColorCompliance() {
    const actualColor = await this.getPurchasingPowerTextColor();
    const expectedColor = await this.getExpectedFigmaTextColor();
    return actualColor === expectedColor;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractBreakdownPage;