class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this._usernameInput = '[data-testid="username-input"]';
    this._passwordInput = '[data-testid="password-input"]';
    this._loginButton = '[data-testid="login-button"]';
    
    this._contractSearchInput = '[data-testid="contract-search-input"]';
    this._searchButton = '[data-testid="search-button"]';
    this._contractList = '[data-testid="contract-list"]';
    
    this._casaDeBolsaContractItem = '[data-testid="contract-item-casa-bolsa"]';
    this._bancoPersonaFisicaContractItem = '[data-testid="contract-item-banco-pf"]';
    this._bancoPersonaMoralContractItem = '[data-testid="contract-item-banco-pm"]';
    
    this._totalValueComponent = '[data-testid="total-value-component"]';
    this._breakdownPopup = '[data-testid="breakdown-popup"]';
    this._closePopupButton = '[data-testid="close-popup-button"]';
    
    this._poderDeCompraMXN = '[data-testid="poder-compra-mxn"]';
    this._efectivoMXN = '[data-testid="efectivo-mxn"]';
    this._efectivoUSD = '[data-testid="efectivo-usd"]';
    this._efectivoEnTransito = '[data-testid="efectivo-transito"]';
    
    this._efectivoMXNValue = '[data-testid="efectivo-mxn-value"]';
    this._efectivoUSDValue = '[data-testid="efectivo-usd-value"]';
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://ota-acticenter.example.com');
  }

  async performLogin() {
    await this.page.fill(this._usernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(this._passwordInput, process.env.TEST_PASSWORD || 'testpass');
    await this.page.click(this._loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractsAvailable() {
    await this.page.waitForSelector(this._contractList, { state: 'visible' });
  }

  async selectCasaDeBolsaContract() {
    await this.page.click(this._casaDeBolsaContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async selectBancoPersonaFisicaContract() {
    await this.page.click(this._bancoPersonaFisicaContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async selectBancoPersonaMoralContract() {
    await this.page.click(this._bancoPersonaMoralContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async clickTotalValue() {
    await this.page.click(this._totalValueComponent);
    await this.page.waitForSelector(this._breakdownPopup, { state: 'visible' });
  }

  async closeBreakdownPopup() {
    const isPopupVisible = await this.page.isVisible(this._breakdownPopup);
    if (isPopupVisible) {
      await this.page.click(this._closePopupButton);
      await this.page.waitForSelector(this._breakdownPopup, { state: 'hidden' });
    }
  }

  async isPoderDeCompraMXNVisible() {
    return await this.page.isVisible(this._poderDeCompraMXN);
  }

  async isEfectivoMXNVisible() {
    return await this.page.isVisible(this._efectivoMXN);
  }

  async isEfectivoUSDVisible() {
    return await this.page.isVisible(this._efectivoUSD);
  }

  async isEfectivoEnTransitoVisible() {
    return await this.page.isVisible(this._efectivoEnTransito);
  }

  async getEfectivoMXNValue() {
    return await this.page.textContent(this._efectivoMXNValue);
  }

  async getEfectivoUSDValue() {
    return await this.page.textContent(this._efectivoUSDValue);
  }
};

module.exports = ContractBreakdownPage;