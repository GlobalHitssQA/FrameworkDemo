const { expect } = require('@playwright/test');

class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    // Locators - inferidos basados en buenas prácticas y contexto del proyecto
    this._mainScreen = '[data-testid="acticenter-main-screen"]';
    this._contractSelector = '[data-testid="contract-selector"]';
    this._contractWithVariableFunds = '[data-testid="contract-variable-income-funds"]';
    this._totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this._breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this._fondosRentaVariableItem = '[data-testid="breakdown-item-fondos-renta-variable"]';
    this._fondosRentaVariableText = '[data-testid="breakdown-item-fondos-renta-variable"] .item-text';
    this._closeBreakdownButton = '[data-testid="breakdown-popup-close-button"]';
    this._searchClientInput = '[data-testid="search-client-contract-input"]';
    this._searchButton = '[data-testid="search-button"]';
    
    // Look and Feel specifications - colores esperados según diseño
    this._expectedTextColors = {
      primary: 'rgb(51, 51, 51)',
      secondary: 'rgb(102, 102, 102)',
      accent: 'rgb(0, 102, 204)',
      fondosRentaVariable: 'rgb(51, 51, 51)'
    };
  }

  async navigateToActicenter() {
    await this.page.goto('/acticenter');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this._mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithVariableIncomeFunds() {
    await this.page.waitForSelector(this._contractSelector, { state: 'visible' });
    await this.page.click(this._contractSelector);
    await this.page.waitForSelector(this._contractWithVariableFunds, { state: 'visible' });
    await this.page.click(this._contractWithVariableFunds);
  }

  async verifyTotalContractValueComponentIsDisplayed() {
    await this.page.waitForSelector(this._totalContractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this._totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this._breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this._breakdownPopup);
  }

  async getFondosRentaVariableTextColor() {
    await this.page.waitForSelector(this._fondosRentaVariableItem, { state: 'visible' });
    const textColor = await this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        return computedStyle.color;
      }
      return null;
    }, this._fondosRentaVariableText);
    return textColor;
  }

  async validateTextColorMeetsSpecifications(actualColor) {
    if (!actualColor) {
      return false;
    }
    const expectedColor = this._expectedTextColors.fondosRentaVariable;
    return actualColor === expectedColor;
  }

  async closeBreakdownPopup() {
    await this.page.click(this._closeBreakdownButton);
    await this.page.waitForSelector(this._breakdownPopup, { state: 'hidden' });
  }

  async searchClientOrContract(searchTerm) {
    await this.page.fill(this._searchClientInput, searchTerm);
    await this.page.click(this._searchButton);
  }
}

module.exports = ActicenterPage;