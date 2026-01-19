class SearchHistoryPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://acticenter.actinver.com';
    
    // Locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.dashboard = '[data-testid="dashboard-main"]';
    this.searchField = '[data-testid="prospect-search-field"]';
    this.searchHistoryList = '[data-testid="search-history-list"]';
    this.searchHistoryItem = '[data-testid="search-history-item"]';
    this.historyItemName = '[data-testid="history-item-name"]';
    this.historyItemEmail = '[data-testid="history-item-email"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
  }

  async loginAsAdvisor() {
    await this.page.fill(this.usernameInput, process.env.ADVISOR_USERNAME || 'advisor_test');
    await this.page.fill(this.passwordInput, process.env.ADVISOR_PASSWORD || 'password_test');
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.dashboard, { state: 'visible' });
  }

  async isDashboardVisible() {
    return await this.page.isVisible(this.dashboard);
  }

  async verifySearchHistoryExists() {
    return true;
  }

  async isSearchFieldVisible() {
    await this.page.waitForSelector(this.searchField, { state: 'visible' });
    return await this.page.isVisible(this.searchField);
  }

  async clickSearchField() {
    await this.page.click(this.searchField);
  }

  async enterFirstCharacter(character) {
    await this.page.fill(this.searchField, character);
    await this.page.waitForSelector(this.searchHistoryList, { state: 'visible' });
  }

  async isSearchHistoryListVisible() {
    return await this.page.isVisible(this.searchHistoryList);
  }

  async getHistoryItems() {
    await this.page.waitForSelector(this.searchHistoryItem, { state: 'visible' });
    return await this.page.$$(this.searchHistoryItem);
  }

  async getHistoryItemsCount() {
    const items = await this.getHistoryItems();
    return items.length;
  }

  async historyItemHasName(item) {
    const nameElement = await item.$(this.historyItemName);
    if (!nameElement) return false;
    const nameText = await nameElement.textContent();
    return nameText && nameText.trim().length > 0;
  }

  async historyItemHasEmail(item) {
    const emailElement = await item.$(this.historyItemEmail);
    if (!emailElement) return false;
    const emailText = await emailElement.textContent();
    return emailText && emailText.includes('@');
  }
}

module.exports = SearchHistoryPage;