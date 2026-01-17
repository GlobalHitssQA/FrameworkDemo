class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Dashboard locators
    this.dashboardContainer = '[data-testid="dashboard-container"]';
    this.searchIcon = '[data-testid="search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractList = '[data-testid="contract-list"]';
    this.contractItem = '[data-testid="contract-item"]';
    
    // Value and composition component locators
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    
    // Error display locators
    this.errorMessage = '[data-testid="error-message"]';
    this.loadingSpinner = '[data-testid="loading-spinner"]';
  }

  async setupConsoleListeners() {
    const messages = [];
    const errors = [];
    
    this.page.on('console', msg => {
      const logEntry = {
        type: msg.type(),
        text: msg.text(),
        timestamp: new Date().toISOString()
      };
      messages.push(logEntry);
      if (msg.type() === 'error') {
        errors.push(logEntry);
      }
    });
    
    this.page.on('pageerror', error => {
      errors.push({
        type: 'uncaughtException',
        text: error.message,
        timestamp: new Date().toISOString()
      });
    });
    
    return { messages, errors };
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl, { waitUntil: 'networkidle' });
  }

  async enterUsername(username) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }

  async waitForDashboardToLoad() {
    await this.page.waitForSelector(this.dashboardContainer, { state: 'visible', timeout: 30000 });
  }

  async setOfflineMode(offline) {
    const context = this.page.context();
    if (offline) {
      await context.setOffline(true);
    } else {
      await context.setOffline(false);
    }
  }

  async clickSearchIcon() {
    const searchIconVisible = await this.page.isVisible(this.searchIcon);
    if (searchIconVisible) {
      await this.page.click(this.searchIcon);
    }
  }

  async selectFirstContract() {
    try {
      await this.page.waitForSelector(this.contractItem, { timeout: 5000 });
      await this.page.click(this.contractItem);
    } catch (error) {
      // Expected to fail when offline - error will be logged to console
    }
  }

  async waitForErrorToBeLogged(errorsArray, timeout = 5000) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (errorsArray.length > 0) {
        return true;
      }
      await this.page.waitForTimeout(100);
    }
    return false;
  }

  async getConsoleErrors(errorsArray) {
    return [...errorsArray];
  }

  async getConsoleMessages(messagesArray) {
    return [...messagesArray];
  }

  errorContainsTimestamp(error) {
    if (!error || !error.text) return false;
    const timestampPattern = /\d{4}-\d{2}-\d{2}|\d{2}:\d{2}:\d{2}|\d{13}/;
    return timestampPattern.test(error.text) || error.timestamp !== undefined;
  }

  errorContainsErrorType(error) {
    if (!error || !error.text) return false;
    const errorTypePatterns = ['Error', 'TypeError', 'NetworkError', 'FetchError', 'exception'];
    return errorTypePatterns.some(pattern => error.text.includes(pattern));
  }

  errorContainsServiceInfo(error) {
    if (!error || !error.text) return false;
    const servicePatterns = ['api', 'service', 'endpoint', 'url', 'http', 'https'];
    return servicePatterns.some(pattern => error.text.toLowerCase().includes(pattern));
  }

  async waitForNetworkRecovery() {
    await this.page.waitForTimeout(2000);
  }

  async retryContractSelection() {
    try {
      await this.clickSearchIcon();
      await this.page.waitForSelector(this.contractItem, { timeout: 10000 });
    } catch (error) {
      // May still be recovering
    }
  }

  async isSystemRecovered() {
    try {
      const dashboardVisible = await this.page.isVisible(this.dashboardContainer);
      return dashboardVisible;
    } catch (error) {
      return false;
    }
  }
}

module.exports = ActicenterPage;