class ContractValuationPage {
  constructor(page) {
    this.page = page;
    
    // Locators - Authentication and Navigation
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    this.mainDashboard = '[data-testid="main-dashboard"]';
    
    // Locators - Contract Search and Selection
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.casaDeBolsaContractOption = '[data-testid="casa-de-bolsa-contract-option"]';
    this.contractTypeFilter = '[data-testid="contract-type-filter"]';
    this.casaDeBolsaFilterOption = '[data-testid="filter-casa-de-bolsa"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Locators - Contract Value Component
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.contractBreakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Locators - Breakdown Items (Casa de Bolsa specific)
    this.poderDeCompraMXN = '[data-testid="breakdown-poder-compra-mxn"]';
    this.efectivoMXN = '[data-testid="breakdown-efectivo-mxn"]';
    this.efectivoUSD = '[data-testid="breakdown-efectivo-usd"]';
    this.pendientesPorLiquidar = '[data-testid="breakdown-pendientes-liquidar"]';
    this.fondos = '[data-testid="breakdown-fondos"]';
    this.cedesPagares = '[data-testid="breakdown-cedes-pagares"]';
    this.mercadoDinero = '[data-testid="breakdown-mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="breakdown-mercado-capitales"]';
    
    // Locators - Service Status
    this.loadingIndicator = '[data-testid="loading-indicator"]';
    this.serviceStatusIndicator = '[data-testid="service-status-indicator"]';
    this.contractLoadedIndicator = '[data-testid="contract-loaded-indicator"]';
    
    // Network request tracking
    this.valuationServiceCalled = false;
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyCasaDeBolsaContractExists() {
    await this.page.click(this.contractTypeFilter);
    await this.page.click(this.casaDeBolsaFilterOption);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible', timeout: 10000 });
  }

  async verifyValuationServiceIsAvailable() {
    const serviceStatus = await this.page.locator(this.serviceStatusIndicator).getAttribute('data-status');
    return serviceStatus === 'available' || serviceStatus === null;
  }

  async selectCasaDeBolsaContract() {
    await this.page.waitForSelector(this.casaDeBolsaContractOption, { state: 'visible' });
    await this.page.click(this.casaDeBolsaContractOption);
    await this.page.waitForSelector(this.loadingIndicator, { state: 'hidden', timeout: 15000 });
  }

  async isContractLoaded() {
    await this.page.waitForSelector(this.contractLoadedIndicator, { state: 'visible', timeout: 10000 });
    return await this.page.locator(this.contractLoadedIndicator).isVisible();
  }

  async accessContractValueComponent() {
    this.page.on('request', (request) => {
      if (request.url().includes('/api/valuation') || request.url().includes('/valuacion')) {
        this.valuationServiceCalled = true;
      }
    });
    
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.contractBreakdownPopup, { state: 'visible', timeout: 10000 });
  }

  async isValuationServiceInvoked() {
    await this.page.waitForTimeout(2000);
    return this.valuationServiceCalled;
  }

  async isTotalContractValueDisplayed() {
    await this.page.waitForSelector(this.totalContractValue, { state: 'visible' });
    const valueText = await this.page.locator(this.totalContractValue).textContent();
    return valueText !== null && valueText.trim().length > 0;
  }

  async isPoderDeCompraMXNDisplayed() {
    await this.page.waitForSelector(this.poderDeCompraMXN, { state: 'visible', timeout: 5000 });
    return await this.page.locator(this.poderDeCompraMXN).isVisible();
  }

  async isEfectivoUSDDisplayed() {
    await this.page.waitForSelector(this.efectivoUSD, { state: 'visible', timeout: 5000 });
    return await this.page.locator(this.efectivoUSD).isVisible();
  }

  async areCasaDeBolsaSpecificItemsDisplayed() {
    const items = [
      this.fondos,
      this.cedesPagares,
      this.mercadoDinero,
      this.mercadoCapitales,
      this.pendientesPorLiquidar
    ];
    
    let visibleCount = 0;
    for (const item of items) {
      try {
        const isVisible = await this.page.locator(item).isVisible({ timeout: 3000 });
        if (isVisible) visibleCount++;
      } catch (e) {
        continue;
      }
    }
    
    return visibleCount >= 2;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.contractBreakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuationPage;