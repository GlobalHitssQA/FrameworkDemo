const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.networkRequests = [];
    this.metrics = {};
    
    this.locators = {
      usernameInput: '[data-testid="username-input"]',
      passwordInput: '[data-testid="password-input"]',
      loginButton: '[data-testid="login-button"]',
      contractSelector: '[data-testid="contract-selector"]',
      activeContractOption: '[data-testid="active-contract-option"]',
      contractValueComponent: '[data-testid="contract-value-component"]',
      contractTotalValue: '[data-testid="contract-total-value"]',
      compositionBreakdown: '[data-testid="composition-breakdown"]',
      closeComponentButton: '[data-testid="close-breakdown-button"]',
      loadingIndicator: '[data-testid="loading-indicator"]',
      searchLupa: '[data-testid="search-client-contract"]',
      breakdownPopup: '[data-testid="breakdown-popup"]',
      monetaryValueFields: '[data-testid^="monetary-value-"]',
      distributionTooltip: '[data-testid="distribution-tooltip"]'
    };
    
    this.backendEndpoints = [
      '/api/contract/value',
      '/api/contract/composition',
      '/api/contract/breakdown',
      '/api/contract/distribution'
    ];
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.TEST_USERNAME || 'test_user';
    const password = process.env.TEST_PASSWORD || 'test_password';
    
    await this.page.fill(this.locators.usernameInput, username);
    await this.page.fill(this.locators.passwordInput, password);
    await this.page.click(this.locators.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.click(this.locators.contractSelector);
    await this.page.click(this.locators.activeContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async enableNetworkMonitoring() {
    this.networkRequests = [];
    this.page.on('request', (request) => {
      const url = request.url();
      if (this.backendEndpoints.some(endpoint => url.includes(endpoint))) {
        this.networkRequests.push({
          url: url,
          method: request.method(),
          timestamp: Date.now(),
          resourceType: request.resourceType()
        });
      }
    });
  }

  async clearNetworkLogs() {
    this.networkRequests = [];
  }

  async openContractValueComponent() {
    await this.page.click(this.locators.contractValueComponent);
  }

  async waitForComponentToLoad() {
    await this.page.waitForSelector(this.locators.loadingIndicator, { state: 'hidden', timeout: 30000 }).catch(() => {});
    await this.page.waitForSelector(this.locators.contractTotalValue, { state: 'visible', timeout: 30000 });
    await this.page.waitForLoadState('networkidle');
  }

  async captureBackendRequests() {
    return [...this.networkRequests];
  }

  async verifyBackendCallsWereMade(requests) {
    return requests.length > 0;
  }

  async recordLoadTimeMetric(label, time) {
    this.metrics[label] = time;
    console.log(`Load time [${label}]: ${time}ms`);
  }

  async recordPerformanceImprovement(percentage) {
    this.metrics.improvement = percentage;
    console.log(`Performance improvement: ${percentage.toFixed(2)}%`);
  }

  async closeContractValueComponent() {
    const closeButton = this.page.locator(this.locators.closeComponentButton);
    if (await closeButton.isVisible()) {
      await closeButton.click();
    } else {
      await this.page.keyboard.press('Escape');
    }
  }

  async waitForComponentToBeClosed() {
    await this.page.waitForSelector(this.locators.breakdownPopup, { state: 'hidden', timeout: 10000 }).catch(() => {});
  }

  async verifyCacheWasUsed(secondRequests) {
    const cacheRelatedRequests = secondRequests.filter(req => 
      this.backendEndpoints.some(endpoint => req.url.includes(endpoint))
    );
    return cacheRelatedRequests.length === 0;
  }

  async detectRedundantBackendCalls(initialRequests, secondRequests) {
    const initialEndpoints = initialRequests.map(req => {
      const url = new URL(req.url);
      return url.pathname;
    });
    
    const redundantCalls = secondRequests.filter(req => {
      const url = new URL(req.url);
      return initialEndpoints.includes(url.pathname);
    });
    
    return redundantCalls;
  }

  async getContractTotalValue() {
    return await this.page.textContent(this.locators.contractTotalValue);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.locators.breakdownPopup);
  }

  async getMonetaryValues() {
    const elements = await this.page.locator(this.locators.monetaryValueFields).all();
    const values = [];
    for (const element of elements) {
      values.push(await element.textContent());
    }
    return values;
  }
}

module.exports = ContractValuePage;