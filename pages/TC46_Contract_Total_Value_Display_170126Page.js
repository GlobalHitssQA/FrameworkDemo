class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.searchIcon = '[data-testid="search-icon"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.reviewDateLabel = '[data-testid="review-date-label"]';
    this.reviewDateValue = '[data-testid="review-date-value"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpassword';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchAndSelectContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
    
    const contractId = process.env.TEST_CONTRACT_ID || 'CONTRACT001';
    await this.page.fill(this.searchInput, contractId);
    await this.page.keyboard.press('Enter');
    
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isValueCompositionComponentVisible() {
    await this.page.waitForSelector(this.valueCompositionComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async isReviewDateVisible() {
    return await this.page.isVisible(this.reviewDateValue);
  }

  async getReviewDate() {
    await this.page.waitForSelector(this.reviewDateValue, { state: 'visible' });
    return await this.page.textContent(this.reviewDateValue);
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.totalContractValue, { state: 'visible' });
    return await this.page.textContent(this.totalContractValue);
  }

  async isValidReviewDate(dateString) {
    const reviewDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return reviewDate >= thirtyDaysAgo && reviewDate <= today;
  }

  async isValueConsistentWithDate(totalValue, reviewDate) {
    const hasValue = totalValue && totalValue.trim().length > 0;
    const hasDate = reviewDate && reviewDate.trim().length > 0;
    
    if (!hasValue || !hasDate) {
      return false;
    }
    
    const numericValue = parseFloat(totalValue.replace(/[^0-9.-]/g, ''));
    return !isNaN(numericValue) && numericValue >= 0;
  }
}

module.exports = ContractValuePage;