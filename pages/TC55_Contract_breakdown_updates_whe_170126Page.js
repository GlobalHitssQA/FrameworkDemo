class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Contract selection locators
    this.contractList = '[data-testid="contract-list"]';
    this.firstContractItem = '[data-testid="contract-item"]:first-child';
    this.secondContractItem = '[data-testid="contract-item"]:nth-child(2)';
    
    // Total value component locators
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.totalValueAmount = '[data-testid="total-value-amount"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Breakdown items locators
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.poderCompraMxn = '[data-testid="breakdown-poder-compra-mxn"]';
    this.efectivoMxn = '[data-testid="breakdown-efectivo-mxn"]';
    this.efectivoUsd = '[data-testid="breakdown-efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="breakdown-pendientes-liquidar"]';
    this.fondos = '[data-testid="breakdown-fondos"]';
    this.cedesPagares = '[data-testid="breakdown-cedes-pagares"]';
    this.mercadoDinero = '[data-testid="breakdown-mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="breakdown-mercado-capitales"]';
    
    // Search locators
    this.searchIcon = '[data-testid="search-icon"]';
    this.searchInput = '[data-testid="search-input"]';
    this.searchResults = '[data-testid="search-results"]';
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectFirstContract() {
    await this.page.waitForSelector(this.contractList);
    await this.page.click(this.firstContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async selectSecondContract() {
    await this.page.waitForSelector(this.searchResults);
    await this.page.click(this.secondContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    await this.page.waitForSelector(this.totalValueComponent, { timeout: 10000 });
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async clickSearchIcon() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async getBreakdownValues() {
    const values = {};
    
    const selectors = {
      poderCompraMxn: this.poderCompraMxn,
      efectivoMxn: this.efectivoMxn,
      efectivoUsd: this.efectivoUsd,
      pendientesLiquidar: this.pendientesLiquidar,
      fondos: this.fondos,
      cedesPagares: this.cedesPagares,
      mercadoDinero: this.mercadoDinero,
      mercadoCapitales: this.mercadoCapitales
    };

    for (const [key, selector] of Object.entries(selectors)) {
      const isVisible = await this.page.isVisible(selector);
      if (isVisible) {
        values[key] = await this.page.textContent(selector);
      }
    }

    return values;
  }

  compareBreakdownValues(firstValues, secondValues) {
    const keys = Object.keys(firstValues);
    for (const key of keys) {
      if (firstValues[key] !== secondValues[key]) {
        return true;
      }
    }
    return false;
  }
}

module.exports = ContractBreakdownPage;