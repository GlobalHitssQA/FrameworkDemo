const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.pendingSettlementItem = '[data-testid="breakdown-item-pending-settlement"]';
    this.pendingSettlementText = '[data-testid="breakdown-item-pending-settlement-text"]';
    this.pendingSettlementValue = '[data-testid="breakdown-item-pending-settlement-value"]';
    
    // Expected color from Figma Look & Feel specifications
    this.expectedPendingSettlementColor = 'rgb(255, 152, 0)';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async performAuthentication() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractAvailability() {
    await this.page.waitForSelector(this.contractListItem, { timeout: 10000 });
    return await this.page.isVisible(this.contractListItem);
  }

  async selectContract() {
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueComponentVisible() {
    await this.page.waitForSelector(this.totalContractValueComponent, { timeout: 10000 });
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isPendingSettlementItemVisible() {
    return await this.page.isVisible(this.pendingSettlementItem);
  }

  async getPendingSettlementTextColor() {
    const element = await this.page.locator(this.pendingSettlementText);
    const color = await element.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    return color;
  }

  getExpectedPendingSettlementColor() {
    return this.expectedPendingSettlementColor;
  }

  async validatePendingSettlementColorCompliance(actualColor) {
    const normalizedActual = this.normalizeColor(actualColor);
    const normalizedExpected = this.normalizeColor(this.expectedPendingSettlementColor);
    return normalizedActual === normalizedExpected;
  }

  normalizeColor(color) {
    if (color.startsWith('#')) {
      return this.hexToRgb(color);
    }
    return color.replace(/\s/g, '').toLowerCase();
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `rgb(${r},${g},${b})`;
    }
    return hex;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }
}

module.exports = ContractBreakdownPage;