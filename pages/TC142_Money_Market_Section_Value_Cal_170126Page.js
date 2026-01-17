class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = '[data-testid="login-username-input"]';
    this.passwordInput = '[data-testid="login-password-input"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.mainScreen = '[data-testid="main-screen-container"]';
    this.searchIcon = '[data-testid="contract-search-icon"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.searchResultsList = '[data-testid="contract-search-results"]';
    this.firstSearchResult = '[data-testid="contract-search-result-item"]:first-child';
    this.totalValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-value-breakdown-popup"]';
    this.moneyMarketSection = '[data-testid="breakdown-money-market-section"]';
    this.moneyMarketValue = '[data-testid="breakdown-money-market-value"]';
    this.closeBreakdownButton = '[data-testid="breakdown-close-button"]';
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenVisible() {
    return await this.page.isVisible(this.mainScreen);
  }

  async openContractSearch() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async searchContract(contractId) {
    await this.page.fill(this.searchInput, contractId);
    await this.page.waitForSelector(this.searchResultsList, { state: 'visible' });
  }

  async selectFirstContractResult() {
    await this.page.click(this.firstSearchResult);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isMoneyMarketSectionVisible() {
    return await this.page.isVisible(this.moneyMarketSection);
  }

  async getMoneyMarketAccumulatedValue() {
    return await this.page.textContent(this.moneyMarketValue);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = ContractValuePage;