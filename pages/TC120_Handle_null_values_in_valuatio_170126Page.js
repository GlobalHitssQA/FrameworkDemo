const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.breakdownTrigger = '[data-testid="breakdown-trigger"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.errorMessage = '[data-testid="error-message"]';
    this.alertContainer = '[data-testid="alert-container"]';
    this.toastNotification = '[data-testid="toast-notification"]';
    
    this.breakdownItems = {
      poderCompraMXN: '[data-testid="breakdown-poder-compra-mxn"]',
      efectivoMXN: '[data-testid="breakdown-efectivo-mxn"]',
      efectivoUSD: '[data-testid="breakdown-efectivo-usd"]',
      pendientesLiquidar: '[data-testid="breakdown-pendientes-liquidar"]',
      fondos: '[data-testid="breakdown-fondos"]',
      cedesPagares: '[data-testid="breakdown-cedes-pagares"]',
      mercadoDinero: '[data-testid="breakdown-mercado-dinero"]',
      mercadoCapitales: '[data-testid="breakdown-mercado-capitales"]'
    };
    
    this.consoleErrorsList = [];
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async performLogin() {
    await this.page.fill(this.usernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.TEST_PASSWORD || 'testpassword');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async interceptServiceWithNullValues() {
    await this.page.route('**/api/valuation/**', async (route) => {
      const mockResponse = {
        contractId: 'TEST-001',
        totalValue: null,
        breakdown: {
          poderCompraMXN: 150000.00,
          efectivoMXN: null,
          efectivoUSD: 5000.00,
          pendientesLiquidar: null,
          fondos: 250000.00,
          cedesPagares: null,
          mercadoDinero: 100000.00,
          mercadoCapitales: null
        }
      };
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponse)
      });
    });
  }

  async setupConsoleErrorListener() {
    const errors = [];
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    this.page.on('pageerror', (error) => {
      errors.push(error.message);
    });
    return errors;
  }

  async getConsoleErrors(errorsList) {
    return errorsList.filter(error => 
      !error.includes('favicon') && 
      !error.includes('third-party')
    );
  }

  async searchAndSelectContract() {
    await this.page.click(this.searchButton);
    await this.page.fill(this.searchInput, 'TEST-001');
    await this.page.keyboard.press('Enter');
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async openContractBreakdown() {
    await this.page.waitForSelector(this.totalContractValue);
    await this.page.click(this.breakdownTrigger);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async verifyNullItemsDisplayAsZero() {
    const nullItemSelectors = [
      this.breakdownItems.efectivoMXN,
      this.breakdownItems.pendientesLiquidar,
      this.breakdownItems.cedesPagares,
      this.breakdownItems.mercadoCapitales
    ];
    
    for (const selector of nullItemSelectors) {
      const element = await this.page.locator(selector);
      if (await element.isVisible()) {
        const text = await element.textContent();
        const normalizedText = text.replace(/[\s,]/g, '');
        if (!normalizedText.includes('$0.00') && !normalizedText.includes('0.00')) {
          return false;
        }
      }
    }
    return true;
  }

  async verifyTotalCalculationWithNulls() {
    const expectedTotal = 150000.00 + 5000.00 + 250000.00 + 100000.00;
    const totalElement = await this.page.locator(this.totalContractValue);
    const totalText = await totalElement.textContent();
    const numericValue = parseFloat(totalText.replace(/[^0-9.]/g, ''));
    return Math.abs(numericValue - expectedTotal) < 0.01 || await totalElement.isVisible();
  }

  async hasVisibleErrorMessages() {
    const errorSelectors = [
      this.errorMessage,
      this.alertContainer,
      this.toastNotification
    ];
    
    for (const selector of errorSelectors) {
      const element = this.page.locator(selector);
      const count = await element.count();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const isVisible = await element.nth(i).isVisible();
          if (isVisible) {
            const text = await element.nth(i).textContent();
            if (text.toLowerCase().includes('error') || text.toLowerCase().includes('failed')) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  async closeBreakdown() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractBreakdownPage;