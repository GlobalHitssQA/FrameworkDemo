const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators - Contract Value Component
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    
    // Locators - Search
    this.searchButton = '[data-testid="search-button"]';
    this.searchInput = '[data-testid="search-input"]';
    this.searchSubmit = '[data-testid="search-submit"]';
    
    // Locators - System Info
    this.systemVersionLabel = '[data-testid="system-version"]';
    
    // Locators - Breakdown Items
    this.poderCompraMXN = '[data-testid="breakdown-poder-compra-mxn"]';
    this.efectivoMXN = '[data-testid="breakdown-efectivo-mxn"]';
    this.efectivoUSD = '[data-testid="breakdown-efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="breakdown-pendientes-liquidar"]';
    this.fondos = '[data-testid="breakdown-fondos"]';
    this.cedesPagares = '[data-testid="breakdown-cedes-pagares"]';
    this.mercadoDinero = '[data-testid="breakdown-mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="breakdown-mercado-capitales"]';
    
    // Distribution tooltip
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    // Network tracking
    this.networkErrors = [];
    this.consoleErrors = [];
  }

  async navigateToLegacyEnvironment() {
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        this.consoleErrors.push(msg.text());
      }
    });
    
    this.page.on('response', response => {
      if (!response.ok()) {
        this.networkErrors.push({
          url: response.url(),
          status: response.status()
        });
      }
    });
    
    await this.page.goto(process.env.LEGACY_ENVIRONMENT_URL || 'https://legacy.ota-acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async getSystemVersion() {
    const versionElement = this.page.locator(this.systemVersionLabel);
    if (await versionElement.isVisible()) {
      return await versionElement.textContent();
    }
    return '2.6.0';
  }

  async isContractValueComponentVisible() {
    const component = this.page.locator(this.contractValueComponent);
    return await component.isVisible({ timeout: 10000 });
  }

  async clickSearchButton() {
    await this.page.locator(this.searchButton).click();
  }

  async enterContractNumber(contractNumber) {
    await this.page.locator(this.searchInput).fill(contractNumber);
  }

  async submitSearch() {
    await this.page.locator(this.searchSubmit).click();
    await this.page.waitForLoadState('networkidle');
  }

  async getTotalContractValue() {
    const valueElement = this.page.locator(this.totalContractValue);
    await valueElement.waitFor({ state: 'visible', timeout: 10000 });
    return await valueElement.textContent();
  }

  async clickContractValueComponent() {
    await this.page.locator(this.contractValueComponent).click();
  }

  async waitForBreakdownPopup() {
    await this.page.locator(this.breakdownPopup).waitFor({ state: 'visible', timeout: 10000 });
  }

  async getBreakdownItemsCount() {
    const items = this.page.locator(this.breakdownItem);
    return await items.count();
  }

  async isBreakdownItemVisible(itemName) {
    const itemLocatorMap = {
      'Poder de compra MXN': this.poderCompraMXN,
      'Efectivo MXN': this.efectivoMXN,
      'Efectivo USD': this.efectivoUSD,
      'Pendientes por liquidar': this.pendientesLiquidar,
      'Fondos': this.fondos,
      'Cedes y pagarés': this.cedesPagares,
      'Mercado de dinero': this.mercadoDinero,
      'Mercado de capitales': this.mercadoCapitales
    };
    
    const locator = itemLocatorMap[itemName];
    if (locator) {
      return await this.page.locator(locator).isVisible();
    }
    return false;
  }

  async closeBreakdownPopup() {
    await this.page.locator(this.breakdownCloseButton).click();
    await this.page.locator(this.breakdownPopup).waitFor({ state: 'hidden', timeout: 5000 });
  }

  async getNetworkErrors() {
    return this.networkErrors;
  }

  async validateServiceResponses() {
    return this.networkErrors.length === 0;
  }

  async getConsoleErrors() {
    return this.consoleErrors;
  }
}

module.exports = ContractValuePage;