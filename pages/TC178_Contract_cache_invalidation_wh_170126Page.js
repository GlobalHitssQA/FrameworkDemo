class ContractCachePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://acticenter.example.com';
    
    // Locators - Value and Composition Component
    this.valueComponentContainer = '[data-testid="contract-value-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.compositionBreakdownButton = '[data-testid="composition-breakdown-trigger"]';
    this.compositionPopup = '[data-testid="composition-breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    
    // Locators - Search and Navigation
    this.clientSearchIcon = '[data-testid="client-search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.activeContractItem = '[data-testid="active-contract-item"]';
    
    // Locators - Fund Operations
    this.fundOperationsPanel = '[data-testid="fund-operations-panel"]';
    this.fundOperationsButton = '[data-testid="open-fund-operations"]';
    this.fundPurchaseOption = '[data-testid="fund-purchase-option"]';
    this.fundAmountInput = '[data-testid="fund-amount-input"]';
    this.confirmOperationButton = '[data-testid="confirm-operation-button"]';
    this.operationSuccessMessage = '[data-testid="operation-success-message"]';
    
    // Locators - Breakdown Items
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.fundsValue = '[data-testid="funds-value"]';
    this.cedesAndPromissory = '[data-testid="cedes-promissory"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    
    // Locators - Authentication
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Locators - Refresh Controls
    this.refreshButton = '[data-testid="refresh-component-button"]';
    this.loadingIndicator = '[data-testid="loading-indicator"]';
    
    // API endpoints for monitoring
    this.contractValueEndpoint = '/api/contract/value';
    this.compositionEndpoint = '/api/contract/composition';
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpass';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.click(this.clientSearchIcon);
    await this.page.waitForSelector(this.activeContractItem);
    await this.page.click(this.activeContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForValueComponentToLoad() {
    await this.page.waitForSelector(this.valueComponentContainer, { state: 'visible' });
    await this.page.waitForSelector(this.loadingIndicator, { state: 'hidden', timeout: 10000 }).catch(() => {});
    await this.page.waitForSelector(this.totalContractValue, { state: 'visible' });
  }

  async getContractTotalValue() {
    const valueElement = await this.page.locator(this.totalContractValue);
    const valueText = await valueElement.textContent();
    return valueText ? valueText.trim() : null;
  }

  async startNetworkMonitoring(callback) {
    this.page.on('request', (request) => {
      const url = request.url();
      if (url.includes(this.contractValueEndpoint) || url.includes(this.compositionEndpoint)) {
        callback({
          url: url,
          method: request.method(),
          timestamp: Date.now(),
          type: 'request'
        });
      }
    });

    this.page.on('response', (response) => {
      const url = response.url();
      if (url.includes(this.contractValueEndpoint) || url.includes(this.compositionEndpoint)) {
        callback({
          url: url,
          status: response.status(),
          timestamp: Date.now(),
          type: 'response'
        });
      }
    });
  }

  async openFundOperationsPanel() {
    await this.page.click(this.fundOperationsButton);
    await this.page.waitForSelector(this.fundOperationsPanel, { state: 'visible' });
  }

  async executeFundPurchaseOperation() {
    await this.page.click(this.fundPurchaseOption);
    await this.page.fill(this.fundAmountInput, '1000');
    await this.page.click(this.confirmOperationButton);
  }

  async waitForOperationConfirmation() {
    try {
      await this.page.waitForSelector(this.operationSuccessMessage, { state: 'visible', timeout: 15000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async refreshValueComponent() {
    const refreshExists = await this.page.locator(this.refreshButton).isVisible().catch(() => false);
    
    if (refreshExists) {
      await this.page.click(this.refreshButton);
    } else {
      await this.page.reload();
    }
    
    await this.page.waitForLoadState('networkidle');
  }

  async verifyCacheInvalidation(networkRequests) {
    const valueRequests = networkRequests.filter(
      req => req.type === 'request' && 
      (req.url.includes(this.contractValueEndpoint) || req.url.includes(this.compositionEndpoint))
    );
    return valueRequests.length > 0;
  }

  async verifyValuesChanged(initialValue, updatedValue) {
    if (!initialValue || !updatedValue) {
      return false;
    }
    return initialValue !== updatedValue;
  }

  async verifyBackendServiceCallMade(networkRequests) {
    const successfulResponses = networkRequests.filter(
      req => req.type === 'response' && 
      req.status >= 200 && 
      req.status < 300 &&
      (req.url.includes(this.contractValueEndpoint) || req.url.includes(this.compositionEndpoint))
    );
    return successfulResponses.length > 0;
  }

  async openCompositionBreakdown() {
    await this.page.click(this.compositionBreakdownButton);
    await this.page.waitForSelector(this.compositionPopup, { state: 'visible' });
  }

  async closeCompositionBreakdown() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.compositionPopup, { state: 'hidden' });
  }

  async getBreakdownItemValue(itemLocator) {
    const element = await this.page.locator(itemLocator);
    const text = await element.textContent();
    return text ? text.trim() : null;
  }

  async getAllBreakdownValues() {
    return {
      purchasingPowerMXN: await this.getBreakdownItemValue(this.purchasingPowerMXN),
      cashMXN: await this.getBreakdownItemValue(this.cashMXN),
      cashUSD: await this.getBreakdownItemValue(this.cashUSD),
      pendingSettlement: await this.getBreakdownItemValue(this.pendingSettlement),
      funds: await this.getBreakdownItemValue(this.fundsValue),
      cedesAndPromissory: await this.getBreakdownItemValue(this.cedesAndPromissory),
      moneyMarket: await this.getBreakdownItemValue(this.moneyMarket),
      capitalMarket: await this.getBreakdownItemValue(this.capitalMarket)
    };
  }
}

module.exports = ContractCachePage;