class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainScreen = '[data-testid="main-screen"]';
    
    // Search locators
    this.searchIcon = '[data-testid="search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.individualPersonContractOption = '[data-testid="individual-person-contract"]';
    
    // Value and Composition component locators
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.debtFundsList = '[data-testid="debt-funds-list"]';
    this.hedgeFundsList = '[data-testid="hedge-funds-list"]';
    this.equityFundsList = '[data-testid="equity-funds-list"]';
    this.moneyMarketSection = '[data-testid="money-market-section"]';
    this.capitalMarketSection = '[data-testid="capital-market-section"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    
    // Service interception
    this.interceptedResponse = null;
    this.serviceInvoked = false;
  }

  async navigateToLogin() {
    await this.page.goto(`${this.baseUrl}/login`);
  }

  async enterUsername(username) {
    await this.page.locator(this.usernameInput).fill(username);
  }

  async enterPassword(password) {
    await this.page.locator(this.passwordInput).fill(password);
  }

  async clickLoginButton() {
    await this.page.locator(this.loginButton).click();
  }

  async isMainScreenDisplayed() {
    return await this.page.locator(this.mainScreen).isVisible();
  }

  async clickSearchIcon() {
    await this.page.locator(this.searchIcon).click();
  }

  async enterContractSearch(contractId) {
    await this.page.locator(this.contractSearchInput).fill(contractId);
  }

  async interceptAGAS21435Service() {
    const responsePromise = this.page.waitForResponse(
      response => response.url().includes('AGAS21435') && response.status() === 200
    );
    return responsePromise;
  }

  async selectIndividualPersonContract() {
    await this.page.locator(this.individualPersonContractOption).click();
    try {
      this.interceptedResponse = await this.page.waitForResponse(
        response => response.url().includes('AGAS21435'),
        { timeout: 10000 }
      );
      this.serviceInvoked = true;
    } catch (error) {
      this.serviceInvoked = false;
    }
  }

  async verifyServiceWasInvoked(serviceName) {
    return this.serviceInvoked && this.interceptedResponse !== null;
  }

  async getServiceResponseStatusCode() {
    if (this.interceptedResponse) {
      return this.interceptedResponse.status();
    }
    return null;
  }

  async isValueCompositionComponentVisible() {
    return await this.page.locator(this.valueCompositionComponent).isVisible();
  }

  async getContractTotalValue() {
    const element = this.page.locator(this.contractTotalValue);
    if (await element.isVisible()) {
      return await element.textContent();
    }
    return null;
  }

  async areIndividualPersonItemsDisplayed() {
    const components = [
      this.purchasingPowerMXN,
      this.cashMXN,
      this.debtFundsList,
      this.moneyMarketSection
    ];
    
    for (const locator of components) {
      const isVisible = await this.page.locator(locator).isVisible();
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async verifySystemLogsForService(serviceName) {
    const logs = await this.page.evaluate(async (service) => {
      const response = await fetch(`/api/logs?service=${service}`);
      return response.json();
    }, serviceName);
    
    return {
      requestLogged: logs && logs.request !== undefined,
      responseLogged: logs && logs.response !== undefined,
      noErrors: logs && !logs.errors,
      responseTimeAcceptable: logs && logs.responseTime < 3000
    };
  }

  async closeComponentByClickingOutside() {
    await this.page.locator('body').click({ position: { x: 10, y: 10 } });
  }
}

module.exports = ActicenterPage;