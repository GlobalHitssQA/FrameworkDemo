class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    this.searchButton = '[data-testid="contract-search-button"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.contractList = '[data-testid="contract-list"]';
    this.contractItem = '[data-testid="contract-item"]';
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    this.breakdownToggle = '[data-testid="breakdown-toggle"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.poderDeCompraValue = '[data-testid="poder-compra-mxn-value"]';
    this.efectivoMXNValue = '[data-testid="efectivo-mxn-value"]';
    this.efectivoUSDValue = '[data-testid="efectivo-usd-value"]';
    this.fondosDeudaValue = '[data-testid="fondos-deuda-value"]';
    this.fondosCoberturaValue = '[data-testid="fondos-cobertura-value"]';
    this.fondosRentaVariableValue = '[data-testid="fondos-renta-variable-value"]';
    this.mercadoDineroValue = '[data-testid="mercado-dinero-value"]';
    this.capitalesValue = '[data-testid="capitales-value"]';
    this.pendientesLiquidarValue = '[data-testid="pendientes-liquidar-value"]';
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.ACTICENTER_USER || 'testuser');
    await this.page.fill(this.passwordInput, process.env.ACTICENTER_PASSWORD || 'testpass');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async openContractSearch() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchInput);
  }

  async searchContract(contractNumber) {
    await this.page.fill(this.searchInput, contractNumber);
    await this.page.press(this.searchInput, 'Enter');
    await this.page.waitForSelector(this.contractList);
  }

  async selectContract() {
    await this.page.click(this.contractItem);
    await this.page.waitForSelector(this.contractInfoContainer);
  }

  async isContractInfoDisplayed() {
    return await this.page.isVisible(this.contractInfoContainer);
  }

  async expandContractValueBreakdown() {
    await this.page.click(this.breakdownToggle);
    await this.page.waitForSelector(this.breakdownPopup);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getPoderDeCompraValue() {
    return await this.page.textContent(this.poderDeCompraValue);
  }

  async getEfectivoMXNValue() {
    return await this.page.textContent(this.efectivoMXNValue);
  }

  async getEfectivoUSDValue() {
    return await this.page.textContent(this.efectivoUSDValue);
  }

  async getFondosDeudaValue() {
    return await this.page.textContent(this.fondosDeudaValue);
  }

  async getFondosCoberturaValue() {
    return await this.page.textContent(this.fondosCoberturaValue);
  }

  async getFondosRentaVariableValue() {
    return await this.page.textContent(this.fondosRentaVariableValue);
  }

  async getMercadoDineroValue() {
    return await this.page.textContent(this.mercadoDineroValue);
  }

  async getCapitalesValue() {
    return await this.page.textContent(this.capitalesValue);
  }

  async getPendientesLiquidarValue() {
    return await this.page.textContent(this.pendientesLiquidarValue);
  }
}

class ModuloAsesorPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.MODULO_ASESOR_URL || 'https://moduloasesor.example.com';
    this.searchInput = '[data-testid="ma-contract-search-input"]';
    this.searchButton = '[data-testid="ma-contract-search-button"]';
    this.contractList = '[data-testid="ma-contract-list"]';
    this.contractItem = '[data-testid="ma-contract-item"]';
    this.contractInfoContainer = '[data-testid="ma-contract-info-container"]';
    this.currentCashValue = '[data-testid="ma-currentcash-value"]';
    this.efectivoMXNValue = '[data-testid="ma-efectivo-mxn-value"]';
    this.efectivoUSDValue = '[data-testid="ma-efectivo-usd-value"]';
    this.fondosDeudaValue = '[data-testid="ma-fondos-deuda-value"]';
    this.fondosCoberturaValue = '[data-testid="ma-fondos-cobertura-value"]';
    this.fondosRentaVariableValue = '[data-testid="ma-fondos-renta-variable-value"]';
    this.mercadoDineroValue = '[data-testid="ma-mercado-dinero-value"]';
    this.capitalesValue = '[data-testid="ma-capitales-value"]';
    this.pendientesLiquidarValue = '[data-testid="ma-pendientes-liquidar-value"]';
    this.usernameInput = '[data-testid="ma-username-input"]';
    this.passwordInput = '[data-testid="ma-password-input"]';
    this.loginButton = '[data-testid="ma-login-button"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.MODULO_ASESOR_USER || 'testuser');
    await this.page.fill(this.passwordInput, process.env.MODULO_ASESOR_PASSWORD || 'testpass');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchContract(contractNumber) {
    await this.page.fill(this.searchInput, contractNumber);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractList);
  }

  async selectContract() {
    await this.page.click(this.contractItem);
    await this.page.waitForSelector(this.contractInfoContainer);
  }

  async isContractInfoDisplayed() {
    return await this.page.isVisible(this.contractInfoContainer);
  }

  async getCurrentCashValue() {
    return await this.page.textContent(this.currentCashValue);
  }

  async getEfectivoMXNValue() {
    return await this.page.textContent(this.efectivoMXNValue);
  }

  async getEfectivoUSDValue() {
    return await this.page.textContent(this.efectivoUSDValue);
  }

  async getFondosDeudaValue() {
    return await this.page.textContent(this.fondosDeudaValue);
  }

  async getFondosCoberturaValue() {
    return await this.page.textContent(this.fondosCoberturaValue);
  }

  async getFondosRentaVariableValue() {
    return await this.page.textContent(this.fondosRentaVariableValue);
  }

  async getMercadoDineroValue() {
    return await this.page.textContent(this.mercadoDineroValue);
  }

  async getCapitalesValue() {
    return await this.page.textContent(this.capitalesValue);
  }

  async getPendientesLiquidarValue() {
    return await this.page.textContent(this.pendientesLiquidarValue);
  }
}

module.exports = { ActicenterPage, ModuloAsesorPage };