class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Main Screen
    this.mainScreenContainer = '[data-testid="acticenter-main-screen"]';
    this.searchClientContractInput = '[data-testid="search-client-contract"]';
    this.searchLupaButton = '[data-testid="search-lupa-button"]';
    
    // Locators - Contract Selection
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.bancoPersonaMoralContract = '[data-testid="contract-banco-persona-moral"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    
    // Locators - Total Contract Value Component
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.totalContractValueAmount = '[data-testid="total-contract-value-amount"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    
    // Locators - Breakdown Items
    this.efectivoUsdItem = '[data-testid="breakdown-item-efectivo-usd"]';
    this.efectivoUsdValue = '[data-testid="efectivo-usd-value"]';
    this.efectivoMxnItem = '[data-testid="breakdown-item-efectivo-mxn"]';
    this.poderCompraMxnItem = '[data-testid="breakdown-item-poder-compra-mxn"]';
    this.pendientesLiquidarItem = '[data-testid="breakdown-item-pendientes-liquidar"]';
    this.fondosItem = '[data-testid="breakdown-item-fondos"]';
    this.cedesPagaresItem = '[data-testid="breakdown-item-cedes-pagares"]';
    this.mercadoDineroItem = '[data-testid="breakdown-item-mercado-dinero"]';
    this.mercadoCapitalesItem = '[data-testid="breakdown-item-mercado-capitales"]';
    
    // Locators - Distribution Tooltip
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreenContainer, { state: 'visible' });
  }

  async selectBancoPersonaMoralContract() {
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.bancoPersonaMoralContract, { state: 'visible' });
    await this.page.click(this.bancoPersonaMoralContract);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTotalContractValueComponentDisplayed() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getMexdolarBalanceFromSAP() {
    const sapResponse = await this.page.waitForResponse(
      response => response.url().includes('/api/sap/mexdolar-balance') && response.status() === 200
    );
    const responseData = await sapResponse.json();
    return responseData.balance;
  }

  async getEfectivoUsdValue() {
    await this.page.waitForSelector(this.efectivoUsdValue, { state: 'visible' });
    return await this.page.textContent(this.efectivoUsdValue);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  normalizeMonetaryValue(value) {
    if (!value) return null;
    const cleanedValue = value.replace(/[^0-9.,]/g, '');
    const normalizedValue = cleanedValue.replace(/,/g, '');
    return parseFloat(normalizedValue).toFixed(2);
  }

  async searchClientOrContract(searchTerm) {
    await this.page.fill(this.searchClientContractInput, searchTerm);
    await this.page.click(this.searchLupaButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getBreakdownItemValue(itemLocator) {
    await this.page.waitForSelector(itemLocator, { state: 'visible' });
    return await this.page.textContent(itemLocator);
  }
};

module.exports = ActicenterPage;