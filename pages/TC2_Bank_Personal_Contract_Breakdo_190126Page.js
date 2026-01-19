class FundsOperationPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Navigation locators
    this.fundsOperationModule = '[data-testid="funds-operation-module"]';
    this.fundsModuleContainer = '[data-testid="funds-module-container"]';
    
    // Contract search locators
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.bankPersonalContractOption = '[data-testid="bank-personal-contract-mexdolar"]';
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
    
    // Contract value component locators
    this.contractValueComponent = '[data-testid="contract-value-composition"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    
    // Breakdown items locators
    this.breakdownItemPrefix = '[data-testid="breakdown-item-';
    this.efectivoMXN = '[data-testid="breakdown-item-efectivo-mxn"]';
    this.efectivoUSD = '[data-testid="breakdown-item-efectivo-usd"]';
    this.fondosDeuda = '[data-testid="breakdown-item-fondos-deuda"]';
    this.fondosCobertura = '[data-testid="breakdown-item-fondos-cobertura"]';
    this.fondosRentaVariable = '[data-testid="breakdown-item-fondos-renta-variable"]';
    this.pendientesLiquidar = '[data-testid="breakdown-item-pendientes-liquidar"]';
    this.efectivoTransito = '[data-testid="breakdown-item-efectivo-transito"]';
    this.cedesPagares = '[data-testid="breakdown-item-cedes-pagares"]';
    this.mercadoDinero = '[data-testid="breakdown-item-mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="breakdown-item-mercado-capitales"]';
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.TEST_PASSWORD || 'testpass');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToFundsOperationModule() {
    await this.page.click(this.fundsOperationModule);
    await this.page.waitForSelector(this.fundsModuleContainer);
  }

  async isFundsModuleVisible() {
    return await this.page.isVisible(this.fundsModuleContainer);
  }

  async openContractSearch() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractSearchInput);
  }

  async selectBankPersonalContractWithMexdolar() {
    await this.page.click(this.bankPersonalContractOption);
    await this.page.waitForSelector(this.contractInfoContainer);
  }

  async isContractInformationLoaded() {
    return await this.page.isVisible(this.contractInfoContainer);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  getItemSelector(itemName) {
    const itemMap = {
      'Efectivo MXN': this.efectivoMXN,
      'Efectivo USD': this.efectivoUSD,
      'Fondos de deuda': this.fondosDeuda,
      'Fondos de cobertura': this.fondosCobertura,
      'Fondos de renta variable': this.fondosRentaVariable,
      'Pendientes por liquidar': this.pendientesLiquidar,
      'Efectivo en transito': this.efectivoTransito,
      'Cedes y pagares': this.cedesPagares,
      'Mercado de dinero': this.mercadoDinero,
      'Mercado de capitales': this.mercadoCapitales
    };
    return itemMap[itemName] || `${this.breakdownItemPrefix}${itemName.toLowerCase().replace(/\s+/g, '-')}]`;
  }

  async isBreakdownItemVisible(itemName) {
    const selector = this.getItemSelector(itemName);
    return await this.page.isVisible(selector);
  }

  async getBreakdownItemValue(itemName) {
    const selector = this.getItemSelector(itemName);
    const valueSelector = `${selector} [data-testid="item-value"]`;
    return await this.page.textContent(valueSelector);
  }

  async closeBreakdownPopup() {
    await this.page.click('[data-testid="popup-overlay"]');
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = FundsOperationPage;