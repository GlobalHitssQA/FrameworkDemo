const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.authenticatedIndicator = '[data-testid="user-authenticated-indicator"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.debtFundContractItem = '[data-testid="contract-item-debt-fund"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.debtFundsItem = '[data-testid="breakdown-item-fondos-deuda"]';
    this.debtFundsText = '[data-testid="breakdown-item-fondos-deuda"] .item-label';
    this.closeBreakdownButton = '[data-testid="breakdown-popup-close-button"]';
    this.contractList = '[data-testid="contract-list"]';
    
    this.capturedColor = null;
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.authenticatedIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyDebtFundContractAvailable() {
    await this.page.waitForSelector(this.contractList, { state: 'visible', timeout: 10000 });
  }

  async selectDebtFundContract() {
    await this.page.waitForSelector(this.debtFundContractItem, { state: 'visible' });
    await this.page.click(this.debtFundContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueComponentVisible() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickTotalContractValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isDebtFundsItemVisible() {
    await this.page.waitForSelector(this.debtFundsItem, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.debtFundsItem);
  }

  async captureDebtFundsTextColor() {
    await this.page.waitForSelector(this.debtFundsText, { state: 'visible' });
    this.capturedColor = await this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        return computedStyle.color;
      }
      return null;
    }, this.debtFundsText);
    return this.capturedColor;
  }

  async verifyDebtFundsTextColor(expectedHexColor) {
    if (!this.capturedColor) {
      await this.captureDebtFundsTextColor();
    }
    const expectedRgb = this.hexToRgb(expectedHexColor);
    const actualRgb = this.parseRgbString(this.capturedColor);
    return this.colorsMatch(expectedRgb, actualRgb);
  }

  async verifyColorComplianceWithDesignSpecs() {
    const designSpecColor = process.env.DEBT_FUNDS_TEXT_COLOR || '#1A1A1A';
    return await this.verifyDebtFundsTextColor(designSpecColor);
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  parseRgbString(rgbString) {
    if (!rgbString) return null;
    const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    return match ? {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10)
    } : null;
  }

  colorsMatch(color1, color2) {
    if (!color1 || !color2) return false;
    return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractBreakdownPage;