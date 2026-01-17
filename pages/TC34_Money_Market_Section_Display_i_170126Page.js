class ContractValuationPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="valuation-breakdown-popup"]';
    this.moneyMarketSection = '[data-testid="breakdown-money-market"]';
    this.moneyMarketLabel = '[data-testid="money-market-label"]';
    this.moneyMarketValue = '[data-testid="money-market-value"]';
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpass';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchAndSelectContractWithMoneyMarket() {
    const contractId = process.env.MONEY_MARKET_CONTRACT_ID || 'CONTRACT-MM-001';
    
    await this.page.click(this.searchButton);
    await this.page.fill(this.searchInput, contractId);
    await this.page.press(this.searchInput, 'Enter');
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async clickTotalContractValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent);
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isMoneyMarketSectionVisible() {
    return await this.page.isVisible(this.moneyMarketSection);
  }

  async isMoneyMarketLabelLeftAligned() {
    const label = await this.page.locator(this.moneyMarketLabel);
    const textAlign = await label.evaluate(el => {
      return window.getComputedStyle(el).textAlign;
    });
    return textAlign === 'left' || textAlign === 'start';
  }

  async isMoneyMarketValueRightAligned() {
    const value = await this.page.locator(this.moneyMarketValue);
    const textAlign = await value.evaluate(el => {
      return window.getComputedStyle(el).textAlign;
    });
    return textAlign === 'right' || textAlign === 'end';
  }
}

module.exports = ContractValuationPage;