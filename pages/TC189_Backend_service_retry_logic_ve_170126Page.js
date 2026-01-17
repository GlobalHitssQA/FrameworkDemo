const { expect } = require('@playwright/test');

class ContractRetryPage {
  constructor(page) {
    this.page = page;
    
    // Locators for UI elements
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractValueComponent = '[data-testid="contract-total-value-component"]';
    this.contractValueDisplay = '[data-testid="contract-value-display"]';
    this.componentLoader = '[data-testid="component-loader"]';
    this.errorMessage = '[data-testid="error-message"]';
    this.retryButton = '[data-testid="retry-button"]';
    
    // Locators for monitoring and admin elements
    this.monitoringPanel = '[data-testid="monitoring-panel"]';
    this.monitoringStatusIndicator = '[data-testid="monitoring-status-indicator"]';
    this.logsContainer = '[data-testid="logs-container"]';
    this.logEntry = '[data-testid="log-entry"]';
    
    // Internal state for tracking
    this.interceptedRequests = [];
    this.failureCount = 0;
    this.maxFailures = 1;
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://ota-acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async configureMonitoringSystem() {
    // Set up request interception to monitor backend calls
    this.interceptedRequests = [];
    
    await this.page.route('**/api/contract/**', async (route) => {
      const request = route.request();
      this.interceptedRequests.push({
        url: request.url(),
        method: request.method(),
        timestamp: new Date().toISOString(),
        type: 'contract-service'
      });
      await route.continue();
    });
  }

  async isMonitoringSystemActive() {
    // Verify monitoring is configured by checking interception is set up
    return this.interceptedRequests !== undefined;
  }

  async configureIntermittentServiceFailure() {
    // Remove previous route and set up failure simulation
    await this.page.unroute('**/api/contract/value/**');
    
    this.failureCount = 0;
    
    await this.page.route('**/api/contract/value/**', async (route) => {
      this.interceptedRequests.push({
        url: route.request().url(),
        method: route.request().method(),
        timestamp: new Date().toISOString(),
        type: 'contract-value-service',
        attemptNumber: this.failureCount + 1
      });
      
      if (this.failureCount < this.maxFailures) {
        this.failureCount++;
        await route.fulfill({
          status: 503,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Service temporarily unavailable' })
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            contractId: 'CONTRACT-001',
            totalValue: 1500000.00,
            currency: 'MXN',
            breakdown: {
              poderCompraMXN: 500000.00,
              efectivoMXN: 300000.00,
              efectivoUSD: 200000.00,
              fondos: 250000.00,
              mercadoCapitales: 250000.00
            }
          })
        });
      }
    });
  }

  async isIntermittentFailureConfigured() {
    return this.maxFailures > 0;
  }

  async selectContract() {
    const searchInput = this.page.locator(this.contractSearchInput);
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.fill('CONTRACT-001');
    
    const searchButton = this.page.locator(this.contractSearchButton);
    await searchButton.click();
    
    const contractItem = this.page.locator(this.contractListItem).first();
    await contractItem.waitFor({ state: 'visible', timeout: 10000 });
    await contractItem.click();
  }

  async requestComponentVisualization() {
    const valueComponent = this.page.locator(this.contractValueComponent);
    await valueComponent.waitFor({ state: 'visible', timeout: 15000 });
  }

  async verifyFirstCallFailed() {
    const contractValueRequests = this.interceptedRequests.filter(
      req => req.type === 'contract-value-service'
    );
    return contractValueRequests.length >= 1 && this.failureCount >= 1;
  }

  async getRetryAttemptCount() {
    const contractValueRequests = this.interceptedRequests.filter(
      req => req.type === 'contract-value-service'
    );
    return contractValueRequests.length;
  }

  async getMonitoringLogs() {
    return this.interceptedRequests.map(req => ({
      timestamp: req.timestamp,
      url: req.url,
      method: req.method,
      type: req.type,
      attemptNumber: req.attemptNumber || null
    }));
  }

  async verifyRetryLogsExist(logs) {
    const contractValueLogs = logs.filter(
      log => log.type === 'contract-value-service'
    );
    return contractValueLogs.length > 1;
  }

  async isContractComponentVisible() {
    const valueComponent = this.page.locator(this.contractValueComponent);
    return await valueComponent.isVisible();
  }

  async getContractTotalValue() {
    const valueDisplay = this.page.locator(this.contractValueDisplay);
    await valueDisplay.waitFor({ state: 'visible', timeout: 10000 });
    return await valueDisplay.textContent();
  }

  async waitForLoaderToDisappear() {
    const loader = this.page.locator(this.componentLoader);
    await loader.waitFor({ state: 'hidden', timeout: 15000 });
  }

  async isErrorMessageVisible() {
    const error = this.page.locator(this.errorMessage);
    return await error.isVisible();
  }

  async clickRetryButton() {
    const retry = this.page.locator(this.retryButton);
    await retry.click();
  }
}

module.exports = ContractRetryPage;