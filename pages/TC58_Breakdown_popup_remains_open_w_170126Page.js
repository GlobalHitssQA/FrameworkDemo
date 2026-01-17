const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Contract selection locators
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Total value component locators
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.totalValueAmount = '[data-testid="total-value-amount"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownOverlay = '[data-testid="breakdown-overlay"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItemName = '[data-testid="breakdown-item-name"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    
    // Specific breakdown items
    this.poderCompraMxn = '[data-testid="item-poder-compra-mxn"]';
    this.efectivoMxn = '[data-testid="item-efectivo-mxn"]';
    this.efectivoUsd = '[data-testid="item-efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="item-pendientes-liquidar"]';
    this.fondos = '[data-testid="item-fondos"]';
    this.cedesPagares = '[data-testid="item-cedes-pagares"]';
    this.mercadoDinero = '[data-testid="item-mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="item-mercado-capitales"]';
    
    // Page container for clicking outside
    this.pageContainer = '[data-testid="page-container"]';
    this.mainContent = '[data-testid="main-content"]';
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.TEST_PASSWORD || 'testpassword');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectContract() {
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
    await this.page.click(this.totalValueComponent);
  }

  async isBreakdownPopupVisible() {
    try {
      await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
      return await this.page.isVisible(this.breakdownPopup);
    } catch (error) {
      return false;
    }
  }

  async hasBreakdownItems() {
    const items = await this.page.$$(this.breakdownItemName);
    return items.length > 0;
  }

  async clickOnItemName() {
    await this.page.waitForSelector(this.breakdownItemName, { state: 'visible' });
    const items = await this.page.$$(this.breakdownItemName);
    if (items.length > 0) {
      await items[0].click();
    }
  }

  async clickOnMonetaryValue() {
    await this.page.waitForSelector(this.breakdownItemValue, { state: 'visible' });
    const values = await this.page.$$(this.breakdownItemValue);
    if (values.length > 0) {
      await values[0].click();
    }
  }

  async clickOutsidePopup() {
    const popup = await this.page.$(this.breakdownPopup);
    if (popup) {
      const boundingBox = await popup.boundingBox();
      if (boundingBox) {
        const clickX = boundingBox.x - 50;
        const clickY = boundingBox.y + boundingBox.height / 2;
        await this.page.mouse.click(Math.max(10, clickX), clickY);
      } else {
        await this.page.click(this.mainContent, { position: { x: 10, y: 10 } });
      }
    }
  }

  async closeBreakdownPopup() {
    const isVisible = await this.isBreakdownPopupVisible();
    if (isVisible) {
      await this.page.click(this.breakdownCloseButton);
    }
  }

  async getBreakdownItemsCount() {
    const items = await this.page.$$(this.breakdownItemName);
    return items.length;
  }

  async getTotalValueText() {
    await this.page.waitForSelector(this.totalValueAmount, { state: 'visible' });
    return await this.page.textContent(this.totalValueAmount);
  }
}

module.exports = ContractBreakdownPage;