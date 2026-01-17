class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://ota-acticenter.example.com';
    
    // Locators - Authentication
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Locators - Contract Selection
    this.searchIcon = '[data-testid="search-client-contract"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Locators - Contract Value Component
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.compositionBreakdownPopup = '[data-testid="composition-breakdown-popup"]';
    
    // Locators - Error States
    this.errorMessageContainer = '[data-testid="error-message-container"]';
    this.errorMessageText = '[data-testid="error-message-text"]';
    this.connectionErrorIndicator = '[data-testid="connection-error-indicator"]';
    this.noDataPlaceholder = '[data-testid="no-data-placeholder"]';
    
    // Locators - Financial Data Display
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.fundsList = '[data-testid="funds-list"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    
    // Backend API patterns to intercept
    this.backendApiPatterns = [
      '**/api/contract/value**',
      '**/api/contract/composition**',
      '**/api/investments/**',
      '**/api/cash/**',
      '**/api/pending-settlements/**'
    ];
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async performLogin() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpassword';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async interceptAndBlockBackendRequests() {
    for (const pattern of this.backendApiPatterns) {
      await this.page.route(pattern, (route) => {
        route.abort('connectionfailed');
      });
    }
  }

  async loadContractValueComponent() {
    try {
      await this.page.click(this.contractValueComponent, { timeout: 5000 });
    } catch (error) {
      // Component may already be visible or loading may fail due to blocked backend
    }
    await this.page.waitForTimeout(2000);
  }

  async isConnectionErrorDetected() {
    const errorIndicator = await this.page.locator(this.connectionErrorIndicator).isVisible().catch(() => false);
    const errorContainer = await this.page.locator(this.errorMessageContainer).isVisible().catch(() => false);
    return errorIndicator || errorContainer;
  }

  async getErrorMessageText() {
    try {
      await this.page.waitForSelector(this.errorMessageText, { state: 'visible', timeout: 5000 });
      return await this.page.textContent(this.errorMessageText);
    } catch (error) {
      return null;
    }
  }

  async isErrorMessageAppropriate() {
    const errorText = await this.getErrorMessageText();
    if (!errorText) return false;
    
    const validErrorPatterns = [
      /no.*conexi[oó]n/i,
      /servicio.*no.*disponible/i,
      /error.*conexi[oó]n/i,
      /backend.*inaccesible/i,
      /connection.*error/i,
      /service.*unavailable/i,
      /unable.*connect/i,
      /network.*error/i
    ];
    
    return validErrorPatterns.some(pattern => pattern.test(errorText));
  }

  async isErrorMessageVisible() {
    return await this.page.locator(this.errorMessageContainer).isVisible().catch(() => false) ||
           await this.page.locator(this.errorMessageText).isVisible().catch(() => false);
  }

  async hasPartialOrMisleadingData() {
    const totalValueVisible = await this.page.locator(this.totalContractValue).isVisible().catch(() => false);
    const cashMXNVisible = await this.page.locator(this.cashMXN).isVisible().catch(() => false);
    const cashUSDVisible = await this.page.locator(this.cashUSD).isVisible().catch(() => false);
    const fundsVisible = await this.page.locator(this.fundsList).isVisible().catch(() => false);
    
    if (totalValueVisible) {
      const totalValueText = await this.page.textContent(this.totalContractValue).catch(() => '');
      if (totalValueText && totalValueText.trim() !== '' && !/error|no.*disponible/i.test(totalValueText)) {
        return true;
      }
    }
    
    const errorVisible = await this.isErrorMessageVisible();
    if (!errorVisible && (cashMXNVisible || cashUSDVisible || fundsVisible)) {
      return true;
    }
    
    return false;
  }
}

module.exports = ContractValuePage;