class ContractRecoveryPage {
  constructor(page) {
    this.page = page;
    
    this.searchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="contract-search-button"]';
    this.contractValueComponent = '[data-testid="contract-total-value"]';
    this.contractBreakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.serviceErrorMessage = '[data-testid="service-error-message"]';
    this.serviceUnavailableAlert = '[data-testid="service-unavailable-alert"]';
    this.refreshButton = '[data-testid="refresh-component-button"]';
    this.contractList = '[data-testid="contract-list"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.loadingIndicator = '[data-testid="loading-indicator"]';
    this.userSessionIndicator = '[data-testid="user-session-indicator"]';
    this.connectionStatusIndicator = '[data-testid="connection-status"]';
    this.loginUsernameInput = '[data-testid="login-username"]';
    this.loginPasswordInput = '[data-testid="login-password"]';
    this.loginSubmitButton = '[data-testid="login-submit"]';
    this.monetaryValueFields = '[data-testid="monetary-value"]';
    
    this.mockServiceEndpoint = '/api/contract/value';
    this.isServiceMocked = false;
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://ota-acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    const usernameInput = this.page.locator(this.loginUsernameInput);
    if (await usernameInput.isVisible()) {
      await usernameInput.fill(process.env.TEST_USERNAME || 'testuser');
      await this.page.locator(this.loginPasswordInput).fill(process.env.TEST_PASSWORD || 'testpass');
      await this.page.locator(this.loginSubmitButton).click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async simulateBackendServiceFailure() {
    await this.page.route('**/api/contract/**', (route) => {
      route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Service Temporarily Unavailable',
          message: 'Backend services are currently unavailable'
        })
      });
    });
    this.isServiceMocked = true;
  }

  async restoreBackendServices() {
    await this.page.unroute('**/api/contract/**');
    this.isServiceMocked = false;
  }

  async searchAndSelectContract() {
    const searchInput = this.page.locator(this.searchInput);
    await searchInput.fill('TEST-CONTRACT-001');
    await this.page.locator(this.searchButton).click();
    await this.page.waitForTimeout(2000);
    
    const contractItem = this.page.locator(this.contractListItem).first();
    if (await contractItem.isVisible()) {
      await contractItem.click();
    }
  }

  async isServiceErrorDisplayed() {
    const errorMessage = this.page.locator(this.serviceErrorMessage);
    const unavailableAlert = this.page.locator(this.serviceUnavailableAlert);
    
    return await errorMessage.isVisible() || await unavailableAlert.isVisible();
  }

  async getErrorMessageText() {
    const errorMessage = this.page.locator(this.serviceErrorMessage);
    if (await errorMessage.isVisible()) {
      return await errorMessage.textContent();
    }
    
    const unavailableAlert = this.page.locator(this.serviceUnavailableAlert);
    if (await unavailableAlert.isVisible()) {
      return await unavailableAlert.textContent();
    }
    
    return null;
  }

  async refreshContractComponent() {
    const refreshButton = this.page.locator(this.refreshButton);
    if (await refreshButton.isVisible()) {
      await refreshButton.click();
    } else {
      await this.page.reload();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async isBackendConnectionRestored() {
    const connectionStatus = this.page.locator(this.connectionStatusIndicator);
    if (await connectionStatus.isVisible()) {
      const status = await connectionStatus.getAttribute('data-status');
      return status === 'connected';
    }
    
    const errorMessage = this.page.locator(this.serviceErrorMessage);
    return !(await errorMessage.isVisible());
  }

  async isContractValueComponentVisible() {
    const component = this.page.locator(this.contractValueComponent);
    return await component.isVisible();
  }

  async hasValidContractData() {
    const component = this.page.locator(this.contractValueComponent);
    if (!(await component.isVisible())) {
      return false;
    }
    
    const valueText = await component.textContent();
    const hasMonetaryValue = /\$|MXN|USD|[0-9,]+\.[0-9]{2}/.test(valueText);
    
    return hasMonetaryValue;
  }

  async isUserSessionActive() {
    const sessionIndicator = this.page.locator(this.userSessionIndicator);
    if (await sessionIndicator.isVisible()) {
      const status = await sessionIndicator.getAttribute('data-active');
      return status === 'true';
    }
    
    const loginForm = this.page.locator(this.loginUsernameInput);
    return !(await loginForm.isVisible());
  }

  async checkIfRestartRequired() {
    const restartPrompt = this.page.locator('[data-testid="restart-required-prompt"]');
    const sessionExpiredMessage = this.page.locator('[data-testid="session-expired-message"]');
    
    return await restartPrompt.isVisible() || await sessionExpiredMessage.isVisible();
  }

  async waitForComponentToLoad() {
    const loadingIndicator = this.page.locator(this.loadingIndicator);
    if (await loadingIndicator.isVisible()) {
      await loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 });
    }
  }
}

module.exports = ContractRecoveryPage;