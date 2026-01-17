const { expect } = require('@playwright/test');

class ActicenterContractPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Contract selection locators
    this.contractList = '[data-testid="contract-list"]';
    this.bancaPatrimonialContract = '[data-testid="banca-patrimonial-contract"]';
    this.contractItem = '[data-testid="contract-item"]';
    
    // Value and composition component locators
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownOverlay = '[data-testid="breakdown-overlay"]';
    
    // Breakdown items locators
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.monetaryValue = '[data-testid="monetary-value"]';
    this.poderCompraMxn = '[data-testid="poder-compra-mxn"]';
    this.efectivoMxn = '[data-testid="efectivo-mxn"]';
    this.efectivoUsd = '[data-testid="efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="pendientes-liquidar"]';
    this.fondos = '[data-testid="fondos"]';
    this.cedesPagares = '[data-testid="cedes-pagares"]';
    this.mercadoDinero = '[data-testid="mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="mercado-capitales"]';
    
    // Search locators
    this.searchMagnifyingGlass = '[data-testid="search-magnifying-glass"]';
    this.searchScreen = '[data-testid="search-screen"]';
    this.searchInput = '[data-testid="search-input"]';
    this.searchResults = '[data-testid="search-results"]';
    
    // Main view locators
    this.mainContractView = '[data-testid="main-contract-view"]';
    this.landscapeContainer = '[data-testid="landscape-container"]';
  }

  async setLandscapeViewport() {
    await this.page.setViewportSize({ width: 1024, height: 768 });
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateWithBancaPatrimonial() {
    const username = process.env.BANCA_PATRIMONIAL_USER || 'test_user';
    const password = process.env.BANCA_PATRIMONIAL_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isLandscapeInterfaceLoaded() {
    await this.page.waitForSelector(this.landscapeContainer, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.landscapeContainer);
  }

  async selectBancaPatrimonialContract() {
    await this.page.waitForSelector(this.contractList, { state: 'visible' });
    await this.page.click(this.bancaPatrimonialContract);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalValueComponent);
  }

  async isComponentAdaptedToLandscape() {
    const viewport = this.page.viewportSize();
    const component = await this.page.locator(this.totalValueComponent);
    const boundingBox = await component.boundingBox();
    return viewport.width > viewport.height && boundingBox !== null;
  }

  async clickValueCompositionComponent() {
    await this.page.click(this.valueCompositionComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isPopupOptimizedForLandscape() {
    const popup = await this.page.locator(this.breakdownPopup);
    const boundingBox = await popup.boundingBox();
    const viewport = this.page.viewportSize();
    return boundingBox !== null && boundingBox.width <= viewport.width;
  }

  async verifyMonetaryFormatInBreakdown() {
    const monetaryValues = await this.page.locator(this.monetaryValue).all();
    const monetaryRegex = /^\$[\d,]+(\.\d{2})?\s*(MXN|USD)?$/;
    
    for (const value of monetaryValues) {
      const text = await value.textContent();
      if (!monetaryRegex.test(text.trim())) {
        return false;
      }
    }
    return monetaryValues.length > 0;
  }

  async verifyValuesRightAlignment() {
    const monetaryValues = await this.page.locator(this.monetaryValue).all();
    
    for (const value of monetaryValues) {
      const textAlign = await value.evaluate(el => window.getComputedStyle(el).textAlign);
      if (textAlign !== 'right' && textAlign !== 'end') {
        return false;
      }
    }
    return monetaryValues.length > 0;
  }

  async verifyAllBancaPatrimonialItemsDisplayed() {
    const expectedItems = [
      this.poderCompraMxn,
      this.efectivoMxn,
      this.efectivoUsd,
      this.fondos,
      this.cedesPagares,
      this.mercadoDinero,
      this.mercadoCapitales
    ];
    
    for (const item of expectedItems) {
      const isVisible = await this.page.isVisible(item);
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async clickOutsideBreakdownPopup() {
    await this.page.click(this.breakdownOverlay, { position: { x: 10, y: 10 } });
  }

  async isBreakdownPopupClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }

  async isMainContractViewVisible() {
    return await this.page.isVisible(this.mainContractView);
  }

  async clickSearchMagnifyingGlass() {
    await this.page.click(this.searchMagnifyingGlass);
    await this.page.waitForSelector(this.searchScreen, { state: 'visible' });
  }

  async isSearchScreenVisible() {
    return await this.page.isVisible(this.searchScreen);
  }

  async verifyContractSelectionAvailable() {
    const isInputVisible = await this.page.isVisible(this.searchInput);
    const isResultsContainerPresent = await this.page.isVisible(this.searchResults);
    return isInputVisible || isResultsContainerPresent;
  }
}

module.exports = ActicenterContractPage;