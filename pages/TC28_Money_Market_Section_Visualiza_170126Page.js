class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchLupa = '[data-testid="search-lupa-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.moneyMarketSection = '[data-testid="breakdown-item-mercado-dinero"]';
    this.moneyMarketLabel = '[data-testid="breakdown-item-mercado-dinero-label"]';
    this.moneyMarketValue = '[data-testid="breakdown-item-mercado-dinero-value"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticate() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectContractWithMoneyMarketInvestments() {
    const contractId = process.env.TEST_CONTRACT_ID || 'CONTRACT_MONEY_MARKET';
    await this.page.fill(this.contractSearchInput, contractId);
    await this.page.click(this.searchLupa);
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickOnTotalContractValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent);
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isMoneyMarketSectionVisible() {
    await this.page.waitForSelector(this.breakdownList);
    return await this.page.isVisible(this.moneyMarketSection);
  }

  async getMoneyMarketAccumulatedValue() {
    await this.page.waitForSelector(this.moneyMarketValue);
    const valueText = await this.page.textContent(this.moneyMarketValue);
    return valueText ? valueText.trim() : null;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;