class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.authSuccessIndicator = '[data-testid="user-dashboard"]';
    
    // Contract search locators
    this.contractSearchIcon = '[data-testid="contract-search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.bankContractOption = '[data-testid="bank-contract-option"]';
    this.contractTypeFilter = '[data-testid="contract-type-filter"]';
    this.bankTypeOption = '[data-testid="filter-option-banco"]';
    
    // Total value component locators
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Breakdown items locators
    this.poderDeCompraMXNItem = '[data-testid="breakdown-item-poder-compra-mxn"]';
    this.efectivoMXNItem = '[data-testid="breakdown-item-efectivo-mxn"]';
    this.efectivoUSDItem = '[data-testid="breakdown-item-efectivo-usd"]';
    this.pendientesPorLiquidarItem = '[data-testid="breakdown-item-pendientes-liquidar"]';
    this.fondosItem = '[data-testid="breakdown-item-fondos"]';
    this.cedesYPagaresItem = '[data-testid="breakdown-item-cedes-pagares"]';
    this.mercadoDineroItem = '[data-testid="breakdown-item-mercado-dinero"]';
    this.mercadoCapitalesItem = '[data-testid="breakdown-item-mercado-capitales"]';
    
    // Generic breakdown item selector
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifySuccessfulAuthentication() {
    await this.page.waitForSelector(this.authSuccessIndicator, { state: 'visible', timeout: 10000 });
  }

  async selectBankContract() {
    await this.page.click(this.contractSearchIcon);
    await this.page.waitForSelector(this.contractTypeFilter, { state: 'visible' });
    await this.page.click(this.contractTypeFilter);
    await this.page.click(this.bankTypeOption);
    await this.page.waitForSelector(this.bankContractOption, { state: 'visible' });
    await this.page.click(this.bankContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTotalValueComponentIsVisible() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
  }

  async verifyBreakdownPopupIsVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isPoderDeCompraMXNVisible() {
    try {
      await this.page.waitForSelector(this.poderDeCompraMXNItem, { state: 'visible', timeout: 2000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async isEfectivoMXNVisible() {
    try {
      await this.page.waitForSelector(this.efectivoMXNItem, { state: 'visible', timeout: 2000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async isEfectivoUSDVisible() {
    try {
      await this.page.waitForSelector(this.efectivoUSDItem, { state: 'visible', timeout: 2000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async getBreakdownItemsText() {
    const items = await this.page.locator(this.breakdownItemsList).allTextContents();
    return items;
  }
};

module.exports = ContractBreakdownPage;