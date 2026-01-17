class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    
    // Search locators
    this.searchIcon = '[data-testid="search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.legalEntityContractOption = '[data-testid="legal-entity-contract-option"]';
    
    // Contract value component locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItems = '[data-testid="breakdown-item"]';
    
    // Currency and investment locators
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.fundsList = '[data-testid="funds-list"]';
    this.pendingSettlements = '[data-testid="pending-settlements"]';
    
    // Service response storage
    this.agas21470Response = null;
    this.serviceInvoked = false;
  }

  async navigateToLogin() {
    await this.page.goto(`${this.baseUrl}/login`);
    await this.page.waitForLoadState('networkidle');
  }

  async enterUsername(username) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isUserLoggedIn() {
    return await this.page.isVisible(this.userProfileIndicator);
  }

  async clickSearchIcon() {
    await this.page.click(this.searchIcon);
  }

  async enterContractSearch(contractId) {
    await this.page.fill(this.contractSearchInput, contractId);
    await this.page.waitForTimeout(500);
  }

  async interceptAGAS21470ServiceCall() {
    const responsePromise = this.page.waitForResponse(
      response => response.url().includes('AGAS21470') || response.url().includes('/api/contracts/legal-entity')
    );
    
    return responsePromise.then(async (response) => {
      this.serviceInvoked = true;
      this.agas21470Response = {
        status: response.status(),
        data: await response.json().catch(() => null)
      };
      return this.agas21470Response;
    });
  }

  async selectLegalEntityContract() {
    await this.page.click(this.legalEntityContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async wasAGAS21470ServiceInvoked() {
    return this.serviceInvoked;
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async getContractTotalValue() {
    return await this.page.textContent(this.contractTotalValue);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getBreakdownItems() {
    return await this.page.$$eval(this.breakdownItems, items => 
      items.map(item => ({
        label: item.querySelector('[data-testid="item-label"]')?.textContent || '',
        value: item.querySelector('[data-testid="item-value"]')?.textContent || ''
      }))
    );
  }

  async clickOutsideComponent() {
    await this.page.click('body', { position: { x: 10, y: 10 } });
  }

  async getServiceLogEntries(serviceName) {
    const logs = await this.page.evaluate((service) => {
      return window.__serviceLogs?.filter(log => log.service === service) || [];
    }, serviceName);
    
    return logs;
  }

  async getPurchasingPowerMXN() {
    return await this.page.textContent(this.purchasingPowerMXN);
  }

  async getCashMXN() {
    return await this.page.textContent(this.cashMXN);
  }

  async getCashUSD() {
    return await this.page.textContent(this.cashUSD);
  }

  async getPendingSettlements() {
    return await this.page.textContent(this.pendingSettlements);
  }
}

module.exports = ActicenterPage;