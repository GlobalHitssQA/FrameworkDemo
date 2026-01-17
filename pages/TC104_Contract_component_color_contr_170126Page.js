const { expect } = require('@playwright/test');

class ContractAccessibilityPage {
  constructor(page) {
    this.page = page;
    
    this.loginUsernameInput = page.locator('[data-testid="login-username"]');
    this.loginPasswordInput = page.locator('[data-testid="login-password"]');
    this.loginSubmitButton = page.locator('[data-testid="login-submit"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.contractSearchButton = page.locator('[data-testid="contract-search-button"]');
    this.activeContractItem = page.locator('[data-testid="contract-item-active"]').first();
    this.contractValueComponent = page.locator('[data-testid="contract-value-component"]');
    this.contractTotalValue = page.locator('[data-testid="contract-total-value"]');
    this.breakdownTrigger = page.locator('[data-testid="breakdown-trigger"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownCloseButton = page.locator('[data-testid="breakdown-close-button"]');
    this.sectionTitles = page.locator('[data-testid="breakdown-section-title"]');
    this.monetaryValues = page.locator('[data-testid="monetary-value"]');
    this.sectionItems = page.locator('[data-testid="breakdown-section-item"]');
    this.poderCompraMxn = page.locator('[data-testid="section-poder-compra-mxn"]');
    this.efectivoMxn = page.locator('[data-testid="section-efectivo-mxn"]');
    this.efectivoUsd = page.locator('[data-testid="section-efectivo-usd"]');
    this.pendientesLiquidar = page.locator('[data-testid="section-pendientes-liquidar"]');
    this.fondos = page.locator('[data-testid="section-fondos"]');
    this.cedesPagares = page.locator('[data-testid="section-cedes-pagares"]');
    this.mercadoDinero = page.locator('[data-testid="section-mercado-dinero"]');
    this.mercadoCapitales = page.locator('[data-testid="section-mercado-capitales"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
  }

  async authenticateUser() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpassword';
    await this.loginUsernameInput.fill(username);
    await this.loginPasswordInput.fill(password);
    await this.loginSubmitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.contractSearchButton.click();
    await this.activeContractItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async waitForContractComponentVisible() {
    await expect(this.contractValueComponent).toBeVisible();
  }

  async getMainComponentTextContrastRatio() {
    return await this._calculateContrastRatio(this.contractTotalValue);
  }

  async openBreakdownPopup() {
    await this.breakdownTrigger.click();
    await expect(this.breakdownPopup).toBeVisible();
  }

  async getSectionTitlesContrastRatios() {
    const titles = await this.sectionTitles.all();
    const ratios = [];
    for (const title of titles) {
      const ratio = await this._calculateContrastRatio(title);
      ratios.push(ratio);
    }
    return ratios;
  }

  async getMonetaryValuesContrastRatios() {
    const values = await this.monetaryValues.all();
    const ratios = [];
    for (const value of values) {
      const ratio = await this._calculateContrastRatio(value);
      ratios.push(ratio);
    }
    return ratios;
  }

  async hoverOverFirstSectionItem() {
    const firstItem = this.sectionItems.first();
    await firstItem.hover();
    await this.page.waitForTimeout(300);
  }

  async getHoveredItemContrastRatio() {
    const firstItem = this.sectionItems.first();
    return await this._calculateContrastRatio(firstItem);
  }

  async selectFirstSectionItem() {
    const firstItem = this.sectionItems.first();
    await firstItem.click();
    await this.page.waitForTimeout(300);
  }

  async getSelectedItemContrastRatio() {
    const selectedItem = this.page.locator('[data-testid="breakdown-section-item"][aria-selected="true"]').first();
    const isVisible = await selectedItem.isVisible().catch(() => false);
    if (isVisible) {
      return await this._calculateContrastRatio(selectedItem);
    }
    return await this._calculateContrastRatio(this.sectionItems.first());
  }

  async _calculateContrastRatio(element) {
    const colors = await element.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el);
      const textColor = computedStyle.color;
      const bgColor = computedStyle.backgroundColor;
      
      const parseRgb = (color) => {
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          return {
            r: parseInt(match[1], 10),
            g: parseInt(match[2], 10),
            b: parseInt(match[3], 10)
          };
        }
        return { r: 0, g: 0, b: 0 };
      };
      
      const getLuminance = (rgb) => {
        const sRGB = [rgb.r, rgb.g, rgb.b].map((val) => {
          val = val / 255;
          return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
      };
      
      const textRgb = parseRgb(textColor);
      const bgRgb = parseRgb(bgColor);
      
      const textLuminance = getLuminance(textRgb);
      const bgLuminance = getLuminance(bgRgb);
      
      const lighter = Math.max(textLuminance, bgLuminance);
      const darker = Math.min(textLuminance, bgLuminance);
      
      return (lighter + 0.05) / (darker + 0.05);
    });
    
    return colors;
  }

  async closeBreakdownPopup() {
    await this.breakdownCloseButton.click();
    await expect(this.breakdownPopup).not.toBeVisible();
  }
};

module.exports = ContractAccessibilityPage;