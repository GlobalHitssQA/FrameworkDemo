class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.applicationContainer = '[data-testid="acticenter-app-container"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="breakdown-close-button"]';
    
    this.breakdownItems = {
      poderDeCompra: '[data-testid="breakdown-item-poder-compra-mxn"]',
      efectivoMxn: '[data-testid="breakdown-item-efectivo-mxn"]',
      efectivoUsd: '[data-testid="breakdown-item-efectivo-usd"]',
      pendientesPorLiquidar: '[data-testid="breakdown-item-pendientes-liquidar"]',
      fondos: '[data-testid="breakdown-item-fondos"]',
      cedesPagares: '[data-testid="breakdown-item-cedes-pagares"]',
      mercadoDinero: '[data-testid="breakdown-item-mercado-dinero"]',
      mercadoCapitales: '[data-testid="breakdown-item-mercado-capitales"]'
    };
    
    this.monetaryValueFields = '[data-testid="monetary-value"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
  }

  async verifyApplicationLoaded() {
    await this.page.waitForSelector(this.applicationContainer, { state: 'visible', timeout: 30000 });
  }

  async selectContract() {
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(this.contractListItem);
  }

  async isContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractValueComponent);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async verifyAllBreakdownItemsDisplayed() {
    const items = Object.values(this.breakdownItems);
    for (const item of items) {
      const isVisible = await this.page.isVisible(item);
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async verifyElementsAlignment() {
    const listElement = await this.page.locator(this.breakdownItemsList);
    const isListVisible = await listElement.isVisible();
    
    if (!isListVisible) {
      return false;
    }
    
    const boundingBox = await listElement.boundingBox();
    return boundingBox !== null && boundingBox.width > 0 && boundingBox.height > 0;
  }

  async verifyMonetaryValuesFormat() {
    const monetaryFields = await this.page.locator(this.monetaryValueFields).all();
    
    for (const field of monetaryFields) {
      const textAlign = await field.evaluate(el => window.getComputedStyle(el).textAlign);
      if (textAlign !== 'right') {
        return false;
      }
    }
    return true;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;