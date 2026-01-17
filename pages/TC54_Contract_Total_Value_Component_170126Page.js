class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Authentication
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Locators - Contract Value Component
    this.totalValueComponent = '[data-testid="contract-total-value"]';
    this.totalValueAmount = '[data-testid="total-value-amount"]';
    
    // Locators - Search
    this.searchButton = '[data-testid="search-client-contract"]';
    this.searchInput = '[data-testid="search-input"]';
    this.searchResults = '[data-testid="search-results"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    
    // Locators - Contract List
    this.contractList = '[data-testid="contract-list"]';
    this.contractItem = '[data-testid="contract-item"]';
    this.contractItemFirst = '[data-testid="contract-item"]:first-child';
    this.contractItemSecond = '[data-testid="contract-item"]:nth-child(2)';
    
    // Locators - Loading States
    this.loadingSpinner = '[data-testid="loading-spinner"]';
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectFirstAvailableContract() {
    await this.page.waitForSelector(this.contractList);
    await this.page.click(this.contractItemFirst);
    await this.waitForContractToLoad();
  }

  async isTotalValueComponentVisible() {
    await this.page.waitForSelector(this.totalValueComponent, { timeout: 10000 });
    return await this.page.isVisible(this.totalValueComponent);
  }

  async getTotalValueText() {
    await this.page.waitForSelector(this.totalValueAmount);
    const valueText = await this.page.textContent(this.totalValueAmount);
    return valueText.trim();
  }

  async clickSearchButton() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchInput);
  }

  async enterSecondContractSearch() {
    const secondContractId = process.env.SECOND_CONTRACT_ID || 'contract_002';
    await this.page.fill(this.searchInput, secondContractId);
    await this.page.waitForSelector(this.searchResults);
  }

  async selectSecondContractFromResults() {
    await this.page.waitForSelector(this.searchResultItem);
    const results = await this.page.locator(this.searchResultItem).all();
    if (results.length > 0) {
      await results[0].click();
    }
  }

  async waitForContractToLoad() {
    await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden', timeout: 15000 }).catch(() => {});
    await this.page.waitForSelector(this.contractInfoContainer, { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = ContractValuePage;