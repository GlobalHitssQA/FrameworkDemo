const { expect } = require('@playwright/test');

class ContractComponentPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    this.expectedFontFamily = 'Roboto';

    this.locators = {
      usernameInput: '[data-testid="login-username"]',
      passwordInput: '[data-testid="login-password"]',
      loginButton: '[data-testid="login-submit-button"]',
      mainScreen: '[data-testid="acticenter-main-screen"]',
      contractSearchInput: '[data-testid="contract-search-input"]',
      contractSearchButton: '[data-testid="contract-search-button"]',
      activeContractItem: '[data-testid="active-contract-item"]',
      contractValueComponent: '[data-testid="contract-value-component"]',
      componentTitle: '[data-testid="contract-value-title"]',
      monetaryValues: '[data-testid="monetary-value"]',
      breakdownPopup: '[data-testid="breakdown-popup"]',
      breakdownCloseButton: '[data-testid="breakdown-close-button"]',
      breakdownItemText: '[data-testid="breakdown-item-text"]',
      breakdownItemValue: '[data-testid="breakdown-item-value"]',
      poderCompraMXN: '[data-testid="breakdown-poder-compra-mxn"]',
      efectivoMXN: '[data-testid="breakdown-efectivo-mxn"]',
      efectivoUSD: '[data-testid="breakdown-efectivo-usd"]',
      pendientesLiquidar: '[data-testid="breakdown-pendientes-liquidar"]',
      fondos: '[data-testid="breakdown-fondos"]',
      cedesPagares: '[data-testid="breakdown-cedes-pagares"]',
      mercadoDinero: '[data-testid="breakdown-mercado-dinero"]',
      mercadoCapitales: '[data-testid="breakdown-mercado-capitales"]'
    };
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsAuthorizedUser() {
    const username = process.env.ACTICENTER_USERNAME || 'test_advisor';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    await this.page.fill(this.locators.usernameInput, username);
    await this.page.fill(this.locators.passwordInput, password);
    await this.page.click(this.locators.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenDisplayed() {
    return await this.page.isVisible(this.locators.mainScreen);
  }

  async selectActiveContract() {
    await this.page.click(this.locators.contractSearchButton);
    await this.page.waitForSelector(this.locators.activeContractItem);
    await this.page.click(this.locators.activeContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    await this.page.waitForSelector(this.locators.contractValueComponent, { timeout: 10000 });
    return await this.page.isVisible(this.locators.contractValueComponent);
  }

  async getComponentTitleFontFamily() {
    const element = await this.page.locator(this.locators.componentTitle);
    return await element.evaluate(el => window.getComputedStyle(el).fontFamily);
  }

  async getMonetaryValuesFontFamily() {
    const element = await this.page.locator(this.locators.monetaryValues).first();
    return await element.evaluate(el => window.getComputedStyle(el).fontFamily);
  }

  getExpectedFontFamily() {
    return this.expectedFontFamily;
  }

  async clickContractValueComponent() {
    await this.page.click(this.locators.contractValueComponent);
    await this.page.waitForSelector(this.locators.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.locators.breakdownPopup);
  }

  async getAllBreakdownItemsFontFamilies() {
    const fontFamilies = [];
    const textElements = await this.page.locator(this.locators.breakdownItemText).all();
    const valueElements = await this.page.locator(this.locators.breakdownItemValue).all();
    
    for (const element of textElements) {
      const fontFamily = await element.evaluate(el => window.getComputedStyle(el).fontFamily);
      fontFamilies.push(fontFamily);
    }
    
    for (const element of valueElements) {
      const fontFamily = await element.evaluate(el => window.getComputedStyle(el).fontFamily);
      fontFamilies.push(fontFamily);
    }
    
    return fontFamilies;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.locators.breakdownCloseButton);
    await this.page.waitForSelector(this.locators.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractComponentPage;