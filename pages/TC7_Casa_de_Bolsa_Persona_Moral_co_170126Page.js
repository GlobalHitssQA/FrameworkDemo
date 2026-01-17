class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    // Locators - Authentication
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Locators - Contract Search and Selection
    this.contractSearchIcon = '[data-testid="contract-search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.casaDeBolsaPersonaMoralOption = '[data-testid="contract-option-casa-bolsa-persona-moral"]';
    this.contractTypeFilter = '[data-testid="contract-type-filter"]';
    this.personaMoralFilterOption = '[data-testid="filter-persona-moral"]';
    
    // Locators - Operation Screen
    this.operationScreen = '[data-testid="operation-screen"]';
    this.selectedContractHeader = '[data-testid="selected-contract-header"]';
    this.contractTypeIndicator = '[data-testid="contract-type-indicator"]';
    
    // Locators - Total Contract Value Component
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    
    // Locators - Poder de Compra MXN
    this.poderDeCompraMXNItem = '[data-testid="breakdown-item-poder-compra-mxn"]';
    this.poderDeCompraMXNLabel = '[data-testid="poder-compra-mxn-label"]';
    this.poderDeCompraMXNValue = '[data-testid="poder-compra-mxn-value"]';
    
    // Locators - Modulo Asesor
    this.moduloAsesorLink = '[data-testid="modulo-asesor-link"]';
    this.currentCashValue = '[data-testid="current-cash-value"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyCasaDeBolsaPersonaMoralContractExists() {
    await this.page.click(this.contractSearchIcon);
    await this.page.click(this.contractTypeFilter);
    await this.page.click(this.personaMoralFilterOption);
    const contractExists = await this.page.isVisible(this.casaDeBolsaPersonaMoralOption);
    return contractExists;
  }

  async selectCasaDeBolsaPersonaMoralContract() {
    await this.page.click(this.contractSearchIcon);
    await this.page.waitForSelector(this.casaDeBolsaPersonaMoralOption);
    await this.page.click(this.casaDeBolsaPersonaMoralOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isOperationScreenDisplayed() {
    await this.page.waitForSelector(this.operationScreen);
    const isVisible = await this.page.isVisible(this.operationScreen);
    const contractType = await this.page.textContent(this.contractTypeIndicator);
    return isVisible && contractType.includes('Casa de Bolsa') && contractType.includes('Persona Moral');
  }

  async clickTotalContractValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent);
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup);
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isPoderDeCompraMXNVisible() {
    await this.page.waitForSelector(this.breakdownItemsList);
    return await this.page.isVisible(this.poderDeCompraMXNItem);
  }

  async hasPoderDeCompraMXNValue() {
    const valueText = await this.page.textContent(this.poderDeCompraMXNValue);
    return valueText !== null && valueText.trim().length > 0;
  }

  async getPoderDeCompraMXNValue() {
    const valueText = await this.page.textContent(this.poderDeCompraMXNValue);
    return this.parseMonetaryValue(valueText);
  }

  async getCurrentCashFromModuloAsesor() {
    const currentUrl = this.page.url();
    await this.page.click(this.moduloAsesorLink);
    await this.page.waitForLoadState('networkidle');
    const valueText = await this.page.textContent(this.currentCashValue);
    await this.page.goto(currentUrl);
    await this.page.waitForLoadState('networkidle');
    return this.parseMonetaryValue(valueText);
  }

  parseMonetaryValue(valueString) {
    if (!valueString) return 0;
    const cleanValue = valueString.replace(/[^0-9.-]/g, '');
    return parseFloat(cleanValue);
  }
}

module.exports = ContractBreakdownPage;