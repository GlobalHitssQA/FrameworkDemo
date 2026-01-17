const { expect } = require('@playwright/test');

class ModuloAsesorPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.MODULO_ASESOR_URL || 'https://moduloasesor.example.com';
    
    // Locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.casaDeBolsaContractItem = '[data-testid="casa-bolsa-contract-item"]';
    this.currentCashValueElement = '[data-testid="currentcash-value"]';
    this.contractListContainer = '[data-testid="contract-list-container"]';
    this.updateCashButton = '[data-testid="update-cash-button"]';
  }

  async navigateToModuloAsesor() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.MODULO_ASESOR_USER || 'testuser';
    const password = process.env.MODULO_ASESOR_PASSWORD || 'testpassword';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyCasaDeBolsaContractAccess() {
    await this.page.waitForSelector(this.contractListContainer);
    const contractVisible = await this.page.isVisible(this.casaDeBolsaContractItem);
    expect(contractVisible).toBeTruthy();
  }

  async getCurrentCashValue() {
    await this.page.click(this.casaDeBolsaContractItem);
    await this.page.waitForSelector(this.currentCashValueElement);
    const valueText = await this.page.textContent(this.currentCashValueElement);
    return this.parseMoneyValue(valueText);
  }

  async simulateCurrentCashUpdate() {
    await this.page.click(this.updateCashButton);
    await this.page.waitForLoadState('networkidle');
    const updatedValueText = await this.page.textContent(this.currentCashValueElement);
    return this.parseMoneyValue(updatedValueText);
  }

  parseMoneyValue(valueText) {
    return valueText.replace(/[^0-9.-]/g, '');
  }
}

class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.searchIcon = '[data-testid="search-icon-lupa"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.casaDeBolsaContractOption = '[data-testid="casa-bolsa-contract-option"]';
    this.totalValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.poderDeCompraMXNElement = '[data-testid="poder-compra-mxn-value"]';
    this.effectivoMXNElement = '[data-testid="efectivo-mxn-value"]';
    this.effectivoUSDElement = '[data-testid="efectivo-usd-value"]';
    this.refreshButton = '[data-testid="refresh-contract-button"]';
    this.closePopupArea = '[data-testid="popup-overlay"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async searchContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.contractSearchInput);
  }

  async selectCasaDeBolsaContract() {
    const contractId = process.env.TEST_CONTRACT_ID || 'CB-12345';
    await this.page.fill(this.contractSearchInput, contractId);
    await this.page.waitForSelector(this.casaDeBolsaContractOption);
    await this.page.click(this.casaDeBolsaContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async clickTotalValueComponent() {
    await this.page.waitForSelector(this.totalValueComponent);
    await this.page.click(this.totalValueComponent);
  }

  async waitForBreakdownPopup() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async getPoderDeCompraMXNValue() {
    await this.page.waitForSelector(this.poderDeCompraMXNElement);
    const valueText = await this.page.textContent(this.poderDeCompraMXNElement);
    return this.parseMoneyValue(valueText);
  }

  async refreshContractView() {
    await this.page.click(this.refreshButton);
    await this.page.waitForLoadState('networkidle');
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closePopupArea);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  parseMoneyValue(valueText) {
    return valueText.replace(/[^0-9.-]/g, '');
  }
}

module.exports = { ModuloAsesorPage, ActicenterPage };