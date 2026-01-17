class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = '[data-testid="login-username-input"]';
    this.passwordInput = '[data-testid="login-password-input"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.mainInterface = '[data-testid="main-interface-container"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="contract-search-button"]';
    this.contractResultItem = '[data-testid="contract-result-item"]';
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    this.breakdownItems = {
      poderCompraMxn: '[data-testid="breakdown-poder-compra-mxn"]',
      efectivoMxn: '[data-testid="breakdown-efectivo-mxn"]',
      efectivoUsd: '[data-testid="breakdown-efectivo-usd"]',
      pendientesLiquidar: '[data-testid="breakdown-pendientes-liquidar"]',
      fondosDeuda: '[data-testid="breakdown-fondos-deuda"]',
      fondosCobertura: '[data-testid="breakdown-fondos-cobertura"]',
      fondosRentaVariable: '[data-testid="breakdown-fondos-renta-variable"]',
      cedesPagares: '[data-testid="breakdown-cedes-pagares"]',
      mercadoDinero: '[data-testid="breakdown-mercado-dinero"]',
      mercadoCapitales: '[data-testid="breakdown-mercado-capitales"]'
    };
    
    this.monetaryFormatRegex = /^[\$]([0-9]{1,3}(,[0-9]{3})*|[0-9]+)(\.[0-9]{2})$/;
    this.currencySymbolRegex = /^[\$]/;
    this.thousandSeparatorRegex = /,/;
    this.twoDecimalsRegex = /\.[0-9]{2}$/;
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async verifyMainInterfaceDisplayed() {
    await this.page.waitForSelector(this.mainInterface, { state: 'visible' });
  }

  async searchContract(contractNumber) {
    await this.page.fill(this.searchInput, contractNumber);
    await this.page.click(this.searchButton);
  }

  async selectContractFromResults() {
    await this.page.waitForSelector(this.contractResultItem, { state: 'visible' });
    await this.page.click(this.contractResultItem);
  }

  async verifyTotalValueComponentVisible() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
  }

  async clickValueCompositionComponent() {
    await this.page.click(this.valueCompositionComponent);
  }

  async verifyBreakdownPopupDisplayed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async getBreakdownItemValue(itemKey) {
    const selector = this.breakdownItems[itemKey];
    if (!selector) return null;
    
    const element = await this.page.$(selector);
    if (!element) return null;
    
    return await element.textContent();
  }

  async getAllBreakdownValues() {
    const values = [];
    
    for (const itemKey of Object.keys(this.breakdownItems)) {
      const value = await this.getBreakdownItemValue(itemKey);
      if (value) {
        values.push(value.trim());
      }
    }
    
    return values;
  }

  async verifyCurrencySymbol(itemKey) {
    const value = await this.getBreakdownItemValue(itemKey);
    if (!value) return false;
    
    return this.currencySymbolRegex.test(value.trim());
  }

  async verifyThousandSeparators(value) {
    const numericPart = value.replace(/[^0-9,.]/g, '');
    const numberValue = parseFloat(numericPart.replace(/,/g, ''));
    
    if (numberValue >= 1000) {
      return this.thousandSeparatorRegex.test(value);
    }
    
    return true;
  }

  async verifyTwoDecimalPlaces(value) {
    return this.twoDecimalsRegex.test(value.trim());
  }

  async verifyMonetaryFormat(value) {
    return this.monetaryFormatRegex.test(value.trim());
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
  }
};

module.exports = ContractBreakdownPage;