const { expect } = require('@playwright/test');

class SearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://actinver.atlassian.net';
    
    // Locators
    this.dashboardContainer = '[data-testid="advisor-dashboard"]';
    this.searchInput = '[data-testid="prospect-search-input"]';
    this.searchButton = '[data-testid="prospect-search-button"]';
    this.searchResultsContainer = '[data-testid="search-results-container"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    this.prospectName = '[data-testid="prospect-name"]';
    this.prospectEmail = '[data-testid="prospect-email"]';
    this.loginUsernameInput = '#username';
    this.loginPasswordInput = '#password';
    this.loginSubmitButton = '[data-testid="login-submit"]';
    this.dashboardActions = '[data-testid="dashboard-actions"]';
    this.mainContent = '[data-testid="main-content"]';
  }

  async navigateToDashboard() {
    await this.page.goto(this.baseUrl);
  }

  async login() {
    await this.page.fill(this.loginUsernameInput, process.env.TEST_USERNAME || 'advisor_user');
    await this.page.fill(this.loginPasswordInput, process.env.TEST_PASSWORD || 'test_password');
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForSelector(this.dashboardContainer, { state: 'visible' });
  }

  async isDashboardVisible() {
    return await this.page.isVisible(this.dashboardContainer);
  }

  async enterSearchText(text) {
    await this.page.fill(this.searchInput, text);
    await this.page.waitForSelector(this.searchResultsContainer, { state: 'visible' });
  }

  async areSearchResultsVisible() {
    return await this.page.isVisible(this.searchResultsContainer);
  }

  async resultsContainProspectInfo() {
    const hasName = await this.page.isVisible(this.prospectName);
    const hasEmail = await this.page.isVisible(this.prospectEmail);
    return hasName && hasEmail;
  }

  async waitForResultsToBeStable() {
    await this.page.waitForTimeout(1000);
  }

  async dismissSearchResults() {
    await this.page.keyboard.press('Escape');
    await this.page.waitForSelector(this.searchResultsContainer, { state: 'hidden' });
  }

  async areSearchResultsHidden() {
    return await this.page.isHidden(this.searchResultsContainer);
  }

  async isDashboardInteractive() {
    const dashboardVisible = await this.page.isVisible(this.dashboardContainer);
    const actionsEnabled = await this.page.isEnabled(this.dashboardActions);
    return dashboardVisible && actionsEnabled;
  }
}

module.exports = SearchPage;