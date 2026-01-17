const { expect } = require('@playwright/test');

class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractWithCedesYPagares = '[data-testid="contract-cedes-pagares"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.cedesYPagaresItem = '[data-testid="breakdown-item-cedes-pagares"]';
    this.cedesYPagaresText = '[data-testid="breakdown-item-cedes-pagares"] .item-label';
    this.closeBreakdownButton = '[data-testid="breakdown-close-button"]';
    
    // Expected color specifications (Look & Feel)
    this.expectedTextColors = {
      primary: 'rgb(51, 51, 51)',
      secondary: 'rgb(102, 102, 102)',
      accent: 'rgb(0, 102, 178)',
      cedesYPagares: 'rgb(51, 51, 51)'
    };
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || '/acticenter');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await expect(this.page.locator(this.mainScreen)).toBeVisible({ timeout: 10000 });
  }

  async selectContractWithCedesYPagares() {
    const contractItem = this.page.locator(this.contractWithCedesYPagares).first();
    await contractItem.waitFor({ state: 'visible', timeout: 10000 });
    await contractItem.click();
  }

  async verifyTotalContractValueComponentDisplayed() {
    await expect(this.page.locator(this.totalContractValueComponent)).toBeVisible({ timeout: 10000 });
  }

  async clickTotalContractValueComponent() {
    await this.page.locator(this.totalContractValueComponent).click();
  }

  async verifyBreakdownPopupDisplayed() {
    await expect(this.page.locator(this.breakdownPopup)).toBeVisible({ timeout: 5000 });
  }

  async getCedesYPagaresTextColor() {
    const element = this.page.locator(this.cedesYPagaresText);
    await element.waitFor({ state: 'visible', timeout: 5000 });
    const color = await element.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    return color;
  }

  async validateTextColorCompliance(actualColor) {
    const expectedColor = this.expectedTextColors.cedesYPagares;
    const normalizedActual = this.normalizeColor(actualColor);
    const normalizedExpected = this.normalizeColor(expectedColor);
    return normalizedActual === normalizedExpected;
  }

  normalizeColor(color) {
    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      return `rgb(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]})`;
    }
    return color.toLowerCase().replace(/\s/g, '');
  }

  async closeBreakdownPopup() {
    await this.page.locator(this.closeBreakdownButton).click();
    await expect(this.page.locator(this.breakdownPopup)).not.toBeVisible();
  }
}

module.exports = ActicenterPage;