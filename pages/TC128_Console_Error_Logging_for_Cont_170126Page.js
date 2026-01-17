const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Authentication
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Locators - Search
    this.searchIcon = '[data-testid="search-client-contract"]';
    this.searchInput = '[data-testid="search-input"]';
    this.searchSubmitButton = '[data-testid="search-submit"]';
    
    // Locators - Contract Value Component
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="value-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Locators - Breakdown Items
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.poderCompraMXN = '[data-testid="poder-compra-mxn"]';
    this.efectivoMXN = '[data-testid="efectivo-mxn"]';
    this.efectivoUSD = '[data-testid="efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="pendientes-liquidar"]';
    this.fondos = '[data-testid="fondos"]';
    this.cedesPagares = '[data-testid="cedes-pagares"]';
    this.mercadoDinero = '[data-testid="mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="mercado-capitales"]';
    
    // Locators - Tooltip
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    // Locators - Error simulation
    this.invalidContractInput = '[data-testid="invalid-contract-search"]';
    
    this.consoleMessages = [];
  }

  async setupConsoleListener(callback) {
    this.page.on('console', (msg) => {
      this.consoleMessages.push(msg);
      if (callback) {
        callback(msg);
      }
    });
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

  async clearConsoleMessages() {
    this.consoleMessages = [];
  }

  async searchContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
    const testContractId = process.env.TEST_CONTRACT_ID || 'CONTRACT-001';
    await this.page.fill(this.searchInput, testContractId);
    await this.page.click(this.searchSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchValidContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
    const validContractId = process.env.VALID_CONTRACT_ID || 'CONTRACT-VALID-001';
    await this.page.fill(this.searchInput, validContractId);
    await this.page.click(this.searchSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async clickTotalValueComponent() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 }).catch(() => {});
  }

  async isBreakdownPopupVisible() {
    try {
      await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async loadContractWithIncompleteData() {
    const invalidContractId = 'INVALID-CONTRACT-999';
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
    await this.page.fill(this.searchInput, invalidContractId);
    await this.page.click(this.searchSubmitButton);
    await this.page.waitForTimeout(2000);
    
    try {
      await this.page.click(this.totalValueComponent);
    } catch (e) {
      console.log('Expected error when clicking on invalid contract component');
    }
  }

  async waitForConsoleErrors() {
    await this.page.waitForTimeout(2000);
  }

  async validateErrorMessageContent(errorText) {
    const hasErrorType = /error|warning|exception|failed/i.test(errorText);
    const hasComponentInfo = /component|value|breakdown|contract|composicion|valor/i.test(errorText);
    const hasStackTrace = /at\s+\w+|stack|trace|line\s+\d+/i.test(errorText);
    
    return hasErrorType || hasComponentInfo || (errorText.length > 20);
  }

  async closeBreakdownPopup() {
    const isVisible = await this.isBreakdownPopupVisible();
    if (isVisible) {
      await this.page.click(this.breakdownCloseButton);
      await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 3000 }).catch(() => {});
    }
  }

  async interactWithBreakdownItems() {
    const isPopupVisible = await this.isBreakdownPopupVisible();
    if (isPopupVisible) {
      const items = await this.page.$$(this.breakdownItem);
      for (const item of items.slice(0, 3)) {
        await item.hover();
        await this.page.waitForTimeout(300);
      }
    }
  }

  getConsoleMessages() {
    return this.consoleMessages;
  }

  getConsoleErrors() {
    return this.consoleMessages.filter(msg => msg.type() === 'error' || msg.type() === 'warning');
  }
}

module.exports = ContractValuePage;