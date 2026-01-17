class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Contract Value Component
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    
    // Locators - Breakdown Items
    this.itemPoderCompraMXN = '[data-testid="item-poder-compra-mxn"]';
    this.itemEfectivoMXN = '[data-testid="item-efectivo-mxn"]';
    this.itemEfectivoUSD = '[data-testid="item-efectivo-usd"]';
    this.itemPendientesLiquidar = '[data-testid="item-pendientes-liquidar"]';
    this.itemFondos = '[data-testid="item-fondos"]';
    this.itemCedesPagares = '[data-testid="item-cedes-pagares"]';
    this.itemMercadoDinero = '[data-testid="item-mercado-dinero"]';
    this.itemMercadoCapitales = '[data-testid="item-mercado-capitales"]';
    
    // Locators - Contract Selection
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Viewport sizes for tablet
    this.tabletPortrait = { width: 768, height: 1024 };
    this.tabletLandscape = { width: 1024, height: 768 };
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
  }

  async verifyApplicationLoaded() {
    await this.page.waitForLoadState('networkidle');
  }

  async setViewportToPortrait() {
    await this.page.setViewportSize(this.tabletPortrait);
  }

  async setViewportToLandscape() {
    await this.page.setViewportSize(this.tabletLandscape);
  }

  async selectRegisteredContract() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(this.contractListItem + ':first-child');
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async verifyPortraitLayout() {
    const component = await this.page.locator(this.contractValueComponent);
    const boundingBox = await component.boundingBox();
    return boundingBox !== null && boundingBox.width <= this.tabletPortrait.width;
  }

  async verifyLandscapeLayout() {
    const component = await this.page.locator(this.contractValueComponent);
    const boundingBox = await component.boundingBox();
    return boundingBox !== null && boundingBox.width <= this.tabletLandscape.width;
  }

  async tapContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async verifyBreakdownItems() {
    const items = [
      this.itemPoderCompraMXN,
      this.itemEfectivoMXN,
      this.itemEfectivoUSD,
      this.itemPendientesLiquidar,
      this.itemFondos,
      this.itemCedesPagares,
      this.itemMercadoDinero,
      this.itemMercadoCapitales
    ];
    
    for (const item of items) {
      const isVisible = await this.page.isVisible(item);
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }

  async verifyLandscapePopupVerticalAlignment() {
    const popup = await this.page.locator(this.breakdownPopup);
    const itemsList = await this.page.locator(this.breakdownItemsList);
    
    const popupBox = await popup.boundingBox();
    const itemsBox = await itemsList.boundingBox();
    
    if (!popupBox || !itemsBox) {
      return false;
    }
    
    const isCenteredHorizontally = Math.abs((popupBox.x + popupBox.width / 2) - (itemsBox.x + itemsBox.width / 2)) < 10;
    return isCenteredHorizontally;
  }
}

module.exports = ContractValuePage;