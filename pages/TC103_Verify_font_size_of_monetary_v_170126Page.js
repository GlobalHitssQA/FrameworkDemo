const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.searchInput = '[data-testid="search-client-contract"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.totalValueAmount = '[data-testid="total-value-amount"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownValueItems = '[data-testid="breakdown-value-item"]';
    this.breakdownMonetaryValue = '[data-testid="breakdown-monetary-value"]';
    this.categoryPoderCompraMXN = '[data-testid="category-poder-compra-mxn"]';
    this.categoryEfectivoMXN = '[data-testid="category-efectivo-mxn"]';
    this.categoryEfectivoUSD = '[data-testid="category-efectivo-usd"]';
    this.categoryPendientesLiquidar = '[data-testid="category-pendientes-liquidar"]';
    this.categoryFondos = '[data-testid="category-fondos"]';
    this.categoryCedesPagares = '[data-testid="category-cedes-pagares"]';
    this.categoryMercadoDinero = '[data-testid="category-mercado-dinero"]';
    this.categoryMercadoCapitales = '[data-testid="category-mercado-capitales"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    this.expectedTotalValueFontSize = '24px';
    this.expectedBreakdownFontSize = '14px';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    const usernameInput = '[data-testid="username-input"]';
    const passwordInput = '[data-testid="password-input"]';
    const loginButton = '[data-testid="login-button"]';
    
    await this.page.fill(usernameInput, username);
    await this.page.fill(passwordInput, password);
    await this.page.click(loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchAndSelectContract() {
    const testContractId = process.env.TEST_CONTRACT_ID || '123456';
    await this.page.fill(this.searchInput, testContractId);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueComponentVisible() {
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async getTotalValueFontSize() {
    const element = this.page.locator(this.totalValueAmount);
    const fontSize = await element.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });
    return fontSize;
  }

  getExpectedTotalValueFontSize() {
    return this.expectedTotalValueFontSize;
  }

  getExpectedBreakdownFontSize() {
    return this.expectedBreakdownFontSize;
  }

  async clickOnTotalValueComponent() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async areBreakdownValuesVisible() {
    const values = this.page.locator(this.breakdownMonetaryValue);
    const count = await values.count();
    return count > 0;
  }

  async getAllBreakdownValuesFontSizes() {
    const values = this.page.locator(this.breakdownMonetaryValue);
    const count = await values.count();
    const fontSizes = [];
    for (let i = 0; i < count; i++) {
      const fontSize = await values.nth(i).evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });
      fontSizes.push(fontSize);
    }
    return fontSizes;
  }

  async getZeroValuesFontSizes() {
    const values = this.page.locator(this.breakdownMonetaryValue);
    const count = await values.count();
    const fontSizes = [];
    for (let i = 0; i < count; i++) {
      const text = await values.nth(i).textContent();
      if (text && (text.includes('$0.00') || text.includes('$0,00'))) {
        const fontSize = await values.nth(i).evaluate((el) => {
          return window.getComputedStyle(el).fontSize;
        });
        fontSizes.push(fontSize);
      }
    }
    return fontSizes;
  }

  async getPositiveValuesFontSizes() {
    const values = this.page.locator(this.breakdownMonetaryValue);
    const count = await values.count();
    const fontSizes = [];
    for (let i = 0; i < count; i++) {
      const text = await values.nth(i).textContent();
      if (text && !text.includes('$0.00') && !text.includes('$0,00')) {
        const fontSize = await values.nth(i).evaluate((el) => {
          return window.getComputedStyle(el).fontSize;
        });
        fontSizes.push(fontSize);
      }
    }
    return fontSizes;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;