class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators - inferidos siguiendo mejores prácticas
    this.acticenterModule = '[data-testid="acticenter-module"]';
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    
    // Breakdown items locators
    this.poderCompraMxn = '[data-testid="breakdown-poder-compra-mxn"]';
    this.efectivoMxn = '[data-testid="breakdown-efectivo-mxn"]';
    this.efectivoUsd = '[data-testid="breakdown-efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="breakdown-pendientes-liquidar"]';
    this.fondos = '[data-testid="breakdown-fondos"]';
    this.cedesPagares = '[data-testid="breakdown-cedes-pagares"]';
    this.mercadoDinero = '[data-testid="breakdown-mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="breakdown-mercado-capitales"]';
  }

  async navigateToActicenter() {
    await this.page.click(this.acticenterModule);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible' });
  }

  async verifyActiveContractExists() {
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
  }

  async selectContract() {
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.totalContractValue, { state: 'visible' });
    return await this.page.textContent(this.totalContractValue);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async calculateBreakdownItemsSum() {
    const breakdownSelectors = [
      this.poderCompraMxn,
      this.efectivoMxn,
      this.efectivoUsd,
      this.pendientesLiquidar,
      this.fondos,
      this.cedesPagares,
      this.mercadoDinero,
      this.mercadoCapitales
    ];

    let totalSum = 0;

    for (const selector of breakdownSelectors) {
      const isVisible = await this.page.isVisible(selector);
      if (isVisible) {
        const valueText = await this.page.textContent(selector);
        const numericValue = this.parseCurrencyValue(valueText);
        totalSum += numericValue;
      }
    }

    return totalSum;
  }

  parseCurrencyValue(valueString) {
    if (!valueString) return 0;
    const cleanedValue = valueString
      .replace(/[^0-9.,-]/g, '')
      .replace(/,/g, '');
    return parseFloat(cleanedValue) || 0;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async searchContract(contractNumber) {
    await this.page.fill(this.contractSearchInput, contractNumber);
    await this.page.click(this.contractSearchButton);
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = ContractValuePage;