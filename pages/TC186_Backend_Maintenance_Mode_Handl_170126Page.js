class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://ota-acticenter.example.com';
    
    // Locators - Authentication
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Locators - Contract Selection
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Locators - Funds Operation Screen
    this.fundsOperationTab = '[data-testid="funds-operation-tab"]';
    this.fundsOperationScreen = '[data-testid="funds-operation-screen"]';
    
    // Locators - Contract Value Component
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractValueTotal = '[data-testid="contract-value-total"]';
    this.compositionBreakdownButton = '[data-testid="composition-breakdown-button"]';
    this.compositionPopup = '[data-testid="composition-popup"]';
    
    // Locators - Maintenance and Error Messages
    this.maintenanceMessage = '[data-testid="maintenance-message"]';
    this.maintenanceMessageAlt = '.maintenance-notification';
    this.technicalErrorMessage = '[data-testid="technical-error"]';
    this.errorStackTrace = '[data-testid="error-stack-trace"]';
    this.systemErrorModal = '[data-testid="system-error-modal"]';
    
    // Locators - General Application State
    this.appContainer = '[data-testid="app-container"]';
    this.loadingSpinner = '[data-testid="loading-spinner"]';
    this.criticalErrorOverlay = '[data-testid="critical-error-overlay"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async simulateBackendMaintenance() {
    await this.page.route('**/api/contract/value/**', (route) => {
      route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'SERVICE_UNAVAILABLE',
          message: 'El servicio está temporalmente en mantenimiento. Por favor, intente más tarde.',
          code: 'MAINTENANCE_MODE'
        })
      });
    });

    await this.page.route('**/api/contract/composition/**', (route) => {
      route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'SERVICE_UNAVAILABLE',
          message: 'El servicio está temporalmente en mantenimiento. Por favor, intente más tarde.',
          code: 'MAINTENANCE_MODE'
        })
      });
    });

    return true;
  }

  async authenticate() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpassword';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectContract() {
    const contractNumber = process.env.TEST_CONTRACT || '123456';
    
    await this.page.fill(this.contractSearchInput, contractNumber);
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(this.contractListItem);
  }

  async navigateToFundsOperationScreen() {
    await this.page.click(this.fundsOperationTab);
    await this.page.waitForSelector(this.fundsOperationScreen);
  }

  async attemptToViewContractValueComponent() {
    try {
      await this.page.waitForSelector(this.contractValueComponent, { timeout: 5000 });
      await this.page.click(this.compositionBreakdownButton);
    } catch (error) {
      // Component may not load due to maintenance - this is expected
    }
    await this.page.waitForTimeout(2000);
  }

  async isMaintenanceMessageVisible() {
    const primaryMessage = await this.page.isVisible(this.maintenanceMessage);
    const altMessage = await this.page.isVisible(this.maintenanceMessageAlt);
    return primaryMessage || altMessage;
  }

  async getMaintenanceMessageText() {
    let messageText = '';
    
    if (await this.page.isVisible(this.maintenanceMessage)) {
      messageText = await this.page.textContent(this.maintenanceMessage);
    } else if (await this.page.isVisible(this.maintenanceMessageAlt)) {
      messageText = await this.page.textContent(this.maintenanceMessageAlt);
    }
    
    return messageText || '';
  }

  async hasTechnicalErrorsDisplayed() {
    const hasTechnicalError = await this.page.isVisible(this.technicalErrorMessage);
    const hasStackTrace = await this.page.isVisible(this.errorStackTrace);
    const hasSystemError = await this.page.isVisible(this.systemErrorModal);
    
    return hasTechnicalError || hasStackTrace || hasSystemError;
  }

  async isApplicationStable() {
    const hasCriticalError = await this.page.isVisible(this.criticalErrorOverlay);
    const isAppContainerPresent = await this.page.isVisible(this.appContainer);
    const consoleErrors = [];
    
    this.page.on('pageerror', (error) => {
      consoleErrors.push(error.message);
    });
    
    await this.page.waitForTimeout(1000);
    
    const criticalJsErrors = consoleErrors.filter((error) => 
      error.includes('Uncaught') || error.includes('TypeError') || error.includes('ReferenceError')
    );
    
    return !hasCriticalError && isAppContainerPresent && criticalJsErrors.length === 0;
  }
}

module.exports = ContractValuePage;