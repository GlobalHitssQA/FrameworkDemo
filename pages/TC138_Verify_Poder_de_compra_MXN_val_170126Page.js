class ModuloAsesorPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.MODULO_ASESOR_URL || 'https://moduloasesor.example.com';
    
    // Locators
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.casaDeBolsaContractItem = '[data-testid="casa-bolsa-contract-item"]';
    this.currentCashField = '[data-testid="current-cash-value"]';
    this.contractNumberField = '[data-testid="contract-number"]';
    this.pageLoadIndicator = '[data-testid="modulo-asesor-loaded"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async waitForPageLoad() {
    await this.page.waitForSelector(this.pageLoadIndicator, { state: 'visible', timeout: 30000 });
  }

  async selectCasaDeBolsaContract() {
    await this.page.click(this.casaDeBolsaContractItem);
    const contractNumber = await this.page.textContent(this.contractNumberField);
    return contractNumber.trim();
  }

  async getCurrentCashValue() {
    await this.page.waitForSelector(this.currentCashField, { state: 'visible' });
    const value = await this.page.textContent(this.currentCashField);
    return value.trim();
  }

  normalizeMonetaryValue(value) {
    if (!value) return null;
    return value.replace(/[$,\s]/g, '').replace(/MXN/gi, '').trim();
  }
}

class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.searchIcon = '[data-testid="search-client-contract-icon"]';
    this.searchInput = '[data-testid="search-contract-input"]';
    this.searchSubmitButton = '[data-testid="search-submit-button"]';
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.poderDeCompraMXNRow = '[data-testid="poder-compra-mxn-row"]';
    this.poderDeCompraMXNValue = '[data-testid="poder-compra-mxn-value"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.pageLoadIndicator = '[data-testid="acticenter-loaded"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async waitForPageLoad() {
    await this.page.waitForSelector(this.pageLoadIndicator, { state: 'visible', timeout: 30000 });
  }

  async searchContract(contractNumber) {
    await this.page.click(this.searchIcon);
    await this.page.fill(this.searchInput, contractNumber);
    await this.page.click(this.searchSubmitButton);
  }

  async selectContract(contractNumber) {
    const contractSelector = `${this.contractListItem}:has-text("${contractNumber}")`;
    await this.page.waitForSelector(contractSelector, { state: 'visible' });
    await this.page.click(contractSelector);
  }

  async clickContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
    await this.page.click(this.contractValueComponent);
  }

  async waitForBreakdownPopup() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 10000 });
  }

  async getPoderDeCompraMXNValue() {
    await this.page.waitForSelector(this.poderDeCompraMXNValue, { state: 'visible' });
    const value = await this.page.textContent(this.poderDeCompraMXNValue);
    return value.trim();
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  normalizeMonetaryValue(value) {
    if (!value) return null;
    return value.replace(/[$,\s]/g, '').replace(/MXN/gi, '').trim();
  }
}

module.exports = { ModuloAsesorPage, ActicenterPage };