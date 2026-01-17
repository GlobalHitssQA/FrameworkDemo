const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.searchContractInput = page.locator('[data-testid="search-contract-input"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    this.casaDeBolsaContractOption = page.locator('[data-testid="contract-option-casa-bolsa"]');
    this.contractValueComponent = page.locator('[data-testid="contract-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.poderDeCompraField = page.locator('[data-testid="poder-compra-mxn"]');
    this.poderDeCompraValue = page.locator('[data-testid="poder-compra-mxn-value"]');
    this.closeBreakdownButton = page.locator('[data-testid="close-breakdown-button"]');
    this.contractLoadedIndicator = page.locator('[data-testid="contract-loaded-indicator"]');
    this.userAuthenticatedIndicator = page.locator('[data-testid="user-authenticated"]');
    this.serviceStatusIndicator = page.locator('[data-testid="currentcash-service-status"]');
    
    this.capturedServiceResponse = null;
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.userAuthenticatedIndicator.waitFor({ state: 'visible', timeout: 10000 });
    return await this.userAuthenticatedIndicator.isVisible();
  }

  async verifyCurrentCashServiceAvailable() {
    const response = await this.page.request.get('/api/health/currentcash');
    return response.ok();
  }

  async selectCasaDeBolsaContract() {
    await this.searchContractInput.waitFor({ state: 'visible' });
    await this.searchContractInput.fill('Casa de Bolsa');
    await this.searchButton.click();
    await this.casaDeBolsaContractOption.waitFor({ state: 'visible' });
    await this.casaDeBolsaContractOption.click();
  }

  async verifyContractIsLoaded() {
    await this.contractLoadedIndicator.waitFor({ state: 'visible', timeout: 15000 });
    return await this.contractLoadedIndicator.isVisible();
  }

  async clickContractValueComponent() {
    await this.contractValueComponent.waitFor({ state: 'visible' });
    
    const responsePromise = this.page.waitForResponse(
      response => response.url().includes('currentcash') && response.status() === 200
    );
    
    await this.contractValueComponent.click();
    
    const response = await responsePromise;
    const responseBody = await response.json();
    this.capturedServiceResponse = responseBody.poderDeCompraMXN || responseBody.currentCash;
  }

  async captureCurrentCashServiceResponse() {
    return this.capturedServiceResponse;
  }

  async verifyBreakdownPopupIsVisible() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 10000 });
    return await this.breakdownPopup.isVisible();
  }

  async verifyPoderDeCompraFieldIsVisible() {
    await this.poderDeCompraField.waitFor({ state: 'visible' });
    return await this.poderDeCompraField.isVisible();
  }

  async getPoderDeCompraMXNValue() {
    await this.poderDeCompraValue.waitFor({ state: 'visible' });
    return await this.poderDeCompraValue.textContent();
  }

  async closeBreakdownPopup() {
    await this.closeBreakdownButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }

  normalizeMonetaryValue(value) {
    if (!value) return null;
    const cleanedValue = value.toString().replace(/[^0-9.-]/g, '');
    return parseFloat(cleanedValue).toFixed(2);
  }
}

module.exports = ContractValuePage;