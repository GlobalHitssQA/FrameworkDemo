class ContractValuationPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Dashboard and navigation locators
    this.dashboardContainer = '[data-testid="dashboard-container"]';
    this.systemDateDisplay = '[data-testid="system-date-display"]';
    
    // Contract search locators
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractListItems = '[data-testid="contract-list-item"]';
    
    // Total value component locators
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.valuationDateLabel = '[data-testid="valuation-date"]';
    this.contractValueDisplay = '[data-testid="contract-value-display"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpassword';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async waitForDashboard() {
    await this.page.waitForSelector(this.dashboardContainer, { state: 'visible', timeout: 30000 });
  }

  async getSystemDate() {
    await this.page.waitForSelector(this.systemDateDisplay, { state: 'visible' });
    const dateText = await this.page.textContent(this.systemDateDisplay);
    return dateText.trim();
  }

  async openContractSearch() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async selectFirstAvailableContract() {
    await this.page.waitForSelector(this.contractListItems, { state: 'visible' });
    const contracts = await this.page.$$(this.contractListItems);
    if (contracts.length > 0) {
      await contracts[0].click();
    }
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
  }

  async selectSecondAvailableContract() {
    await this.page.waitForSelector(this.contractListItems, { state: 'visible' });
    const contracts = await this.page.$$(this.contractListItems);
    if (contracts.length > 1) {
      await contracts[1].click();
    } else if (contracts.length > 0) {
      await contracts[0].click();
    }
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async getValuationDate() {
    await this.page.waitForSelector(this.valuationDateLabel, { state: 'visible' });
    const dateText = await this.page.textContent(this.valuationDateLabel);
    return dateText.trim();
  }

  async clickTotalValueForBreakdown() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuationPage;