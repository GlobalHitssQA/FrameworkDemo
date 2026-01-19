class SearchProspectPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://actinver.atlassian.net';
    
    // Locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.dashboard = '[data-testid="main-dashboard"]';
    this.prospectSearchField = '[data-testid="prospect-search-field"]';
    this.searchButton = '[data-testid="search-button"]';
    this.noResultsMessage = '[data-testid="no-results-message"]';
    this.searchResultsList = '[data-testid="search-results-list"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsAdvisor() {
    await this.page.fill(this.usernameInput, process.env.ADVISOR_USERNAME || 'test_advisor');
    await this.page.fill(this.passwordInput, process.env.ADVISOR_PASSWORD || 'test_password');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isDashboardVisible() {
    await this.page.waitForSelector(this.dashboard, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.dashboard);
  }

  async isSearchFieldVisible() {
    await this.page.waitForSelector(this.prospectSearchField, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.prospectSearchField);
  }

  async enterSearchText(text) {
    await this.page.waitForSelector(this.prospectSearchField, { state: 'visible' });
    await this.page.fill(this.prospectSearchField, text);
  }

  async clickSearchButton() {
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async pressEnterOnSearchField() {
    await this.page.press(this.prospectSearchField, 'Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async isNoResultsMessageVisible() {
    await this.page.waitForSelector(this.noResultsMessage, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.noResultsMessage);
  }

  async getNoResultsMessageText() {
    await this.page.waitForSelector(this.noResultsMessage, { state: 'visible' });
    return await this.page.textContent(this.noResultsMessage);
  }

  async isSearchResultsListVisible() {
    return await this.page.isVisible(this.searchResultsList);
  }
}

module.exports = SearchProspectPage;