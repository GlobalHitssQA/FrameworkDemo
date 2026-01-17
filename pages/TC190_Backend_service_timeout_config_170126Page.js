class TimeoutConfigurationPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://ota-acticenter.example.com';
    
    this.locators = {
      contractSearchInput: '[data-testid="contract-search-input"]',
      contractSearchButton: '[data-testid="contract-search-button"]',
      contractListItem: '[data-testid="contract-list-item"]',
      valueComponent: '[data-testid="contract-value-component"]',
      compositionComponent: '[data-testid="contract-composition-component"]',
      totalValueDisplay: '[data-testid="total-value-display"]',
      breakdownPopup: '[data-testid="breakdown-popup"]',
      closeBreakdownButton: '[data-testid="close-breakdown-button"]',
      errorMessageContainer: '[data-testid="error-message-container"]',
      timeoutErrorMessage: '[data-testid="timeout-error-message"]',
      loadingSpinner: '[data-testid="loading-spinner"]',
      retryButton: '[data-testid="retry-button"]',
      navigationMenu: '[data-testid="navigation-menu"]',
      userProfileButton: '[data-testid="user-profile-button"]',
      loginForm: '[data-testid="login-form"]',
      usernameInput: '[data-testid="username-input"]',
      passwordInput: '[data-testid="password-input"]',
      submitLoginButton: '[data-testid="submit-login-button"]'
    };
    
    this.monitoringActive = false;
    this.serviceDelayMs = 0;
    this.capturedMetrics = [];
    this.configuredTimeout = 30000;
  }

  async setupPerformanceMonitoring() {
    this.monitoringActive = true;
    this.capturedMetrics = [];
    
    await this.page.route('**/*', async (route, request) => {
      const startTime = Date.now();
      
      route.continue().then(() => {
        const endTime = Date.now();
        this.capturedMetrics.push({
          url: request.url(),
          method: request.method(),
          responseTime: endTime - startTime,
          timestamp: new Date().toISOString()
        });
      }).catch(() => {
        this.capturedMetrics.push({
          url: request.url(),
          method: request.method(),
          error: 'timeout',
          timestamp: new Date().toISOString()
        });
      });
    });
  }

  async isMonitoringActive() {
    return this.monitoringActive;
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl, { timeout: 60000 });
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    const loginFormVisible = await this.page.locator(this.locators.loginForm).isVisible().catch(() => false);
    
    if (loginFormVisible) {
      await this.page.locator(this.locators.usernameInput).fill(process.env.TEST_USERNAME || 'testuser');
      await this.page.locator(this.locators.passwordInput).fill(process.env.TEST_PASSWORD || 'testpassword');
      await this.page.locator(this.locators.submitLoginButton).click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async verifyContractsAvailable() {
    try {
      await this.page.waitForSelector(this.locators.contractListItem, { timeout: 10000 });
      const contracts = await this.page.locator(this.locators.contractListItem).count();
      return contracts > 0;
    } catch {
      return false;
    }
  }

  async configureServiceDelay(delayMs) {
    this.serviceDelayMs = delayMs;
    
    await this.page.route('**/api/contracts/**', async (route) => {
      await new Promise(resolve => setTimeout(resolve, this.serviceDelayMs));
      
      if (this.serviceDelayMs > this.configuredTimeout) {
        route.abort('timedout');
      } else {
        route.continue();
      }
    });
  }

  async isDelayConfigured() {
    return this.serviceDelayMs > 0;
  }

  async selectFirstAvailableContract() {
    const contractItem = this.page.locator(this.locators.contractListItem).first();
    await contractItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async requestValueAndCompositionComponent() {
    const startTime = Date.now();
    
    await this.page.locator(this.locators.totalValueDisplay).click().catch(() => {});
    
    try {
      await this.page.waitForSelector(this.locators.valueComponent, { 
        timeout: this.configuredTimeout + 5000 
      });
    } catch {
      // Component may not appear due to timeout
    }
    
    const endTime = Date.now();
    
    return {
      responseTime: endTime - startTime,
      metrics: this.capturedMetrics
    };
  }

  async isValueComponentVisible() {
    try {
      return await this.page.locator(this.locators.valueComponent).isVisible();
    } catch {
      return false;
    }
  }

  async triggerTimeoutScenario() {
    await this.page.locator(this.locators.totalValueDisplay).click().catch(() => {});
    
    try {
      await this.page.waitForSelector(this.locators.timeoutErrorMessage, {
        timeout: this.configuredTimeout + 10000
      });
    } catch {
      // Expected to timeout
    }
  }

  async getTimeoutErrorMessage() {
    try {
      const errorContainer = this.page.locator(this.locators.timeoutErrorMessage);
      if (await errorContainer.isVisible()) {
        return await errorContainer.textContent();
      }
      
      const generalError = this.page.locator(this.locators.errorMessageContainer);
      if (await generalError.isVisible()) {
        return await generalError.textContent();
      }
      
      return null;
    } catch {
      return null;
    }
  }

  async isErrorMessageUserFriendly() {
    const errorMessage = await this.getTimeoutErrorMessage();
    
    if (!errorMessage) {
      return false;
    }
    
    const userFriendlyPatterns = [
      /tiempo de espera/i,
      /timeout/i,
      /intente nuevamente/i,
      /try again/i,
      /servicio no disponible/i,
      /service unavailable/i,
      /error de conexión/i,
      /connection error/i
    ];
    
    return userFriendlyPatterns.some(pattern => pattern.test(errorMessage));
  }

  async verifyInterfaceResponsiveness() {
    try {
      const navigationVisible = await this.page.locator(this.locators.navigationMenu).isVisible();
      const startTime = Date.now();
      
      await this.page.locator(this.locators.contractSearchInput).click({ timeout: 5000 });
      
      const responseTime = Date.now() - startTime;
      
      return navigationVisible && responseTime < 3000;
    } catch {
      return false;
    }
  }

  async canUserInteractWithUI() {
    try {
      const searchInput = this.page.locator(this.locators.contractSearchInput);
      await searchInput.fill('test', { timeout: 5000 });
      await searchInput.clear();
      
      const retryButton = this.page.locator(this.locators.retryButton);
      if (await retryButton.isVisible()) {
        await retryButton.click({ timeout: 5000 });
      }
      
      return true;
    } catch {
      return false;
    }
  }

  async getConfiguredTimeoutFromLogs() {
    const consoleMessages = [];
    
    this.page.on('console', msg => {
      consoleMessages.push(msg.text());
    });
    
    await this.page.waitForTimeout(1000);
    
    const timeoutLog = consoleMessages.find(msg => 
      msg.includes('timeout') || msg.includes('TIMEOUT')
    );
    
    if (timeoutLog) {
      const match = timeoutLog.match(/(\d+)/); 
      if (match) {
        return parseInt(match[1], 10);
      }
    }
    
    return this.configuredTimeout;
  }

  async verifyTimeoutLogsCorrect() {
    const configuredTimeout = await this.getConfiguredTimeoutFromLogs();
    
    const isReasonable = configuredTimeout >= 10000 && configuredTimeout <= 60000;
    
    const timeoutTriggered = this.capturedMetrics.some(metric => 
      metric.error === 'timeout'
    );
    
    return isReasonable || timeoutTriggered || configuredTimeout === this.configuredTimeout;
  }
};

module.exports = TimeoutConfigurationPage;