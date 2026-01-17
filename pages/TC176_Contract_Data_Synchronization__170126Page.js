const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://ota-acticenter.example.com';
    
    // Login locators
    this.emailInput = '[data-testid="login-email-input"]';
    this.passwordInput = '[data-testid="login-password-input"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    
    // Contract value component locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    this.contractBreakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.contractBreakdownTrigger = '[data-testid="contract-breakdown-trigger"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    
    // Search locators
    this.searchClientContractInput = '[data-testid="search-client-contract-input"]';
    this.searchMagnifierButton = '[data-testid="search-magnifier-button"]';
    
    // Breakdown items locators
    this.breakdownPoderCompraMXN = '[data-testid="breakdown-poder-compra-mxn"]';
    this.breakdownEfectivoMXN = '[data-testid="breakdown-efectivo-mxn"]';
    this.breakdownEfectivoUSD = '[data-testid="breakdown-efectivo-usd"]';
    this.breakdownPendientesLiquidar = '[data-testid="breakdown-pendientes-liquidar"]';
    this.breakdownFondos = '[data-testid="breakdown-fondos"]';
    this.breakdownCedesPagares = '[data-testid="breakdown-cedes-pagares"]';
    this.breakdownMercadoDinero = '[data-testid="breakdown-mercado-dinero"]';
    this.breakdownMercadoCapitales = '[data-testid="breakdown-mercado-capitales"]';
    
    // Distribution tooltip
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    // Refresh button
    this.refreshButton = '[data-testid="refresh-contract-button"]';
  }

  async navigateToLogin() {
    await this.page.goto(`${this.baseUrl}/login`);
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsUser(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToContractValue() {
    await this.page.goto(`${this.baseUrl}/contract/value`);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForContractValueComponentToLoad() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async getContractTotalValue() {
    await this.page.waitForSelector(this.contractTotalValue, { state: 'visible' });
    return await this.page.textContent(this.contractTotalValue);
  }

  async openContractBreakdown() {
    await this.page.click(this.contractBreakdownTrigger);
    await this.page.waitForSelector(this.contractBreakdownPopup, { state: 'visible' });
  }

  async closeContractBreakdown() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.contractBreakdownPopup, { state: 'hidden' });
  }

  async getContractBreakdownValues() {
    await this.openContractBreakdown();
    const breakdownValues = {
      poderCompraMXN: await this.page.textContent(this.breakdownPoderCompraMXN),
      efectivoMXN: await this.page.textContent(this.breakdownEfectivoMXN),
      efectivoUSD: await this.page.textContent(this.breakdownEfectivoUSD),
      pendientesLiquidar: await this.page.textContent(this.breakdownPendientesLiquidar),
      fondos: await this.page.textContent(this.breakdownFondos),
      cedesPagares: await this.page.textContent(this.breakdownCedesPagares),
      mercadoDinero: await this.page.textContent(this.breakdownMercadoDinero),
      mercadoCapitales: await this.page.textContent(this.breakdownMercadoCapitales)
    };
    await this.closeContractBreakdown();
    return breakdownValues;
  }

  async searchContract(contractNumber) {
    await this.page.fill(this.searchClientContractInput, contractNumber);
    await this.page.click(this.searchMagnifierButton);
    await this.page.waitForLoadState('networkidle');
  }

  async refreshContractValueComponent() {
    await this.page.click(this.refreshButton);
    await this.page.waitForLoadState('networkidle');
    await this.waitForContractValueComponentToLoad();
  }

  async simulateBackendValueUpdate() {
    await this.page.evaluate(() => {
      return fetch('/api/contract/simulate-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_values' })
      });
    });
  }

  async waitForBackendProcessing() {
    await this.page.waitForTimeout(2000);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.contractBreakdownPopup);
  }

  async getDistributionTooltipText() {
    await this.page.hover(this.contractTotalValue);
    await this.page.waitForSelector(this.distributionTooltip, { state: 'visible' });
    return await this.page.textContent(this.distributionTooltip);
  }
}

module.exports = ContractValuePage;