class ContractComponentPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.monetaryValueField = '[data-testid="monetary-value"]';
    this.searchClientInput = '[data-testid="search-client-contract"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.activeContractOption = '[data-testid="active-contract-option"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    // Breakdown items locators
    this.poderCompraMXN = '[data-testid="poder-compra-mxn"]';
    this.efectivoMXN = '[data-testid="efectivo-mxn"]';
    this.efectivoUSD = '[data-testid="efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="pendientes-liquidar"]';
    this.fondos = '[data-testid="fondos"]';
    this.cedesPagares = '[data-testid="cedes-pagares"]';
    this.mercadoDinero = '[data-testid="mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="mercado-capitales"]';
    
    // Viewport sizes
    this.landscapeViewport = { width: 896, height: 414 };
    this.portraitViewport = { width: 414, height: 896 };
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async setViewportLandscape() {
    await this.page.setViewportSize(this.landscapeViewport);
  }

  async setViewportPortrait() {
    await this.page.setViewportSize(this.portraitViewport);
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async selectActiveContract() {
    const contractSelector = this.page.locator(this.contractSelector);
    if (await contractSelector.isVisible()) {
      await contractSelector.click();
      await this.page.locator(this.activeContractOption).first().click();
    }
  }

  async waitForContractComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async isComponentAdaptedToLandscape() {
    const component = this.page.locator(this.contractValueComponent);
    const boundingBox = await component.boundingBox();
    return boundingBox && boundingBox.width > boundingBox.height;
  }

  async clickContractComponent() {
    await this.page.locator(this.contractValueComponent).click();
  }

  async isBreakdownPopupVisible() {
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async areAllBreakdownItemsVisible() {
    const items = this.page.locator(this.breakdownItem);
    const count = await items.count();
    if (count === 0) return false;
    for (let i = 0; i < count; i++) {
      if (!(await items.nth(i).isVisible())) return false;
    }
    return true;
  }

  async isComponentAdaptedToPortrait() {
    const component = this.page.locator(this.contractValueComponent);
    await this.page.waitForTimeout(500);
    const isVisible = await component.isVisible();
    return isVisible;
  }

  async isBreakdownPopupReorganizedForPortrait() {
    const popup = this.page.locator(this.breakdownPopup);
    const isVisible = await popup.isVisible();
    if (!isVisible) return false;
    const boundingBox = await popup.boundingBox();
    const viewport = this.page.viewportSize();
    return boundingBox && boundingBox.width <= viewport.width;
  }

  async areAllElementsAccessibleInPortrait() {
    const monetaryValues = this.page.locator(this.monetaryValueField);
    const count = await monetaryValues.count();
    for (let i = 0; i < count; i++) {
      const element = monetaryValues.nth(i);
      const isVisible = await element.isVisible();
      if (!isVisible) return false;
    }
    return true;
  }

  async isTextReadableInPortrait() {
    const breakdownItems = this.page.locator(this.breakdownItem);
    const count = await breakdownItems.count();
    for (let i = 0; i < count; i++) {
      const text = await breakdownItems.nth(i).textContent();
      if (!text || text.trim().length === 0) return false;
    }
    return true;
  }

  async areMonetaryValuesDisplayedCorrectly() {
    const monetaryValues = this.page.locator(this.monetaryValueField);
    const count = await monetaryValues.count();
    if (count === 0) return false;
    for (let i = 0; i < count; i++) {
      const text = await monetaryValues.nth(i).textContent();
      const hasMonetaryFormat = /[$\d,.]+/.test(text);
      if (!hasMonetaryFormat) return false;
    }
    return true;
  }

  async isSpacingAppropriateForPortrait() {
    const items = this.page.locator(this.breakdownItem);
    const count = await items.count();
    if (count < 2) return true;
    const firstBox = await items.nth(0).boundingBox();
    const secondBox = await items.nth(1).boundingBox();
    if (!firstBox || !secondBox) return false;
    const spacing = secondBox.y - (firstBox.y + firstBox.height);
    return spacing >= 0;
  }

  async closeBreakdownPopup() {
    const closeButton = this.page.locator(this.breakdownCloseButton);
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  }
}

module.exports = ContractComponentPage;