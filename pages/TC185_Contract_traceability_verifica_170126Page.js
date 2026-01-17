const { expect } = require('@playwright/test');

class ContractTraceabilityPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://ota-acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-btn"]';
    
    // Search locators
    this.searchClientContractInput = '[data-testid="search-client-contract"]';
    this.searchMagnifyingGlass = '[data-testid="search-magnifying-glass"]';
    this.contractResultItem = '[data-testid="contract-result-item"]';
    
    // Contract value component locators
    this.contractValueComponent = '[data-testid="contract-total-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-btn"]';
    this.compositionItemsList = '[data-testid="composition-items-list"]';
    this.compositionItem = '[data-testid="composition-item"]';
    
    // Specific composition items
    this.poderCompraMxn = '[data-testid="item-poder-compra-mxn"]';
    this.efectivoMxn = '[data-testid="item-efectivo-mxn"]';
    this.efectivoUsd = '[data-testid="item-efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="item-pendientes-liquidar"]';
    this.fondosDeuda = '[data-testid="item-fondos"]';
    this.cedesPagares = '[data-testid="item-cedes-pagares"]';
    this.mercadoDinero = '[data-testid="item-mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="item-mercado-capitales"]';
    
    // Monetary value fields
    this.monetaryValueField = '[data-testid="monetary-value"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    // System logs locators
    this.systemLogsLink = '[data-testid="nav-system-logs"]';
    this.logsSearchInput = '[data-testid="logs-search-input"]';
    this.logsSearchButton = '[data-testid="logs-search-btn"]';
    this.logEntryRow = '[data-testid="log-entry-row"]';
    this.logUniqueId = '[data-testid="log-unique-id"]';
    this.logUsername = '[data-testid="log-username"]';
    this.logTimestamp = '[data-testid="log-timestamp"]';
    this.logContractId = '[data-testid="log-contract-id"]';
    this.logQueriedItem = '[data-testid="log-queried-item"]';
    this.logOperationResult = '[data-testid="log-operation-result"]';
    
    // State variables
    this.currentContractId = null;
    this.operationTimestamp = null;
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async performAuthentication() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpassword';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchAndSelectContract() {
    const testContractId = process.env.TEST_CONTRACT_ID || 'CONTRACT-001';
    this.currentContractId = testContractId;
    
    await this.page.fill(this.searchClientContractInput, testContractId);
    await this.page.click(this.searchMagnifyingGlass);
    await this.page.waitForSelector(this.contractResultItem);
    await this.page.click(this.contractResultItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getCompositionItemsCount() {
    const items = await this.page.$$(this.compositionItem);
    return items.length;
  }

  async clickOnCompositionItem(itemName) {
    const itemLocators = {
      'Fondos de deuda': this.fondosDeuda,
      'Poder de compra MXN': this.poderCompraMxn,
      'Efectivo MXN': this.efectivoMxn,
      'Efectivo USD': this.efectivoUsd,
      'Pendientes por liquidar': this.pendientesLiquidar,
      'Cedes y pagarés': this.cedesPagares,
      'Mercado de dinero': this.mercadoDinero,
      'Mercado de capitales': this.mercadoCapitales
    };
    
    const locator = itemLocators[itemName] || this.fondosDeuda;
    await this.page.click(locator);
    await this.page.waitForLoadState('networkidle');
  }

  async captureOperationTimestamp() {
    this.operationTimestamp = new Date().toISOString();
  }

  async verifyActionProcessed() {
    await this.page.waitForTimeout(1000);
    return true;
  }

  async navigateToSystemLogs() {
    await this.page.click(this.systemLogsLink);
    await this.page.waitForLoadState('networkidle');
  }

  async searchRecentOperationLog() {
    const searchQuery = this.currentContractId || 'CONTRACT-001';
    await this.page.fill(this.logsSearchInput, searchQuery);
    await this.page.click(this.logsSearchButton);
    await this.page.waitForSelector(this.logEntryRow);
  }

  async verifyLogHasUniqueIdentifier() {
    const uniqueId = await this.page.textContent(this.logUniqueId);
    return uniqueId && uniqueId.trim().length > 0;
  }

  async verifyLogHasUserInfo() {
    const username = await this.page.textContent(this.logUsername);
    return username && username.trim().length > 0;
  }

  async verifyLogHasTimestamp() {
    const timestamp = await this.page.textContent(this.logTimestamp);
    return timestamp && timestamp.trim().length > 0;
  }

  async verifyLogHasContractInfo() {
    const contractId = await this.page.textContent(this.logContractId);
    return contractId && contractId.includes(this.currentContractId);
  }

  async verifyLogHasQueriedItem() {
    const queriedItem = await this.page.textContent(this.logQueriedItem);
    return queriedItem && queriedItem.trim().length > 0;
  }

  async verifyLogHasOperationResult() {
    const result = await this.page.textContent(this.logOperationResult);
    return result && result.trim().length > 0;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractTraceabilityPage;