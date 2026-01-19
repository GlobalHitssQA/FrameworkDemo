const { expect } = require('@playwright/test');

class ProspectSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://acticenter.actinver.com';
    
    // Locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.dashboard = '[data-testid="main-dashboard"]';
    this.prospectSearchField = '[data-testid="prospect-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.searchResultsList = '[data-testid="search-results-list"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    this.prospectName = '[data-testid="prospect-name"]';
    this.prospectEmail = '[data-testid="prospect-email"]';
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
  }

  async loginAsAdvisor() {
    await this.page.fill(this.usernameInput, process.env.ADVISOR_USERNAME || 'test_advisor');
    await this.page.fill(this.passwordInput, process.env.ADVISOR_PASSWORD || 'test_password');
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.dashboard, { state: 'visible', timeout: 30000 });
  }

  async isDashboardVisible() {
    return await this.page.isVisible(this.dashboard);
  }

  async isSearchFieldVisible() {
    await this.page.waitForSelector(this.prospectSearchField, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.prospectSearchField);
  }

  async enterSearchText(text) {
    await this.page.fill(this.prospectSearchField, text);
  }

  async clickSearchButton() {
    const searchButtonVisible = await this.page.isVisible(this.searchButton);
    if (searchButtonVisible) {
      await this.page.click(this.searchButton);
    } else {
      await this.page.press(this.prospectSearchField, 'Enter');
    }
    await this.page.waitForSelector(this.searchResultsList, { state: 'visible', timeout: 15000 });
  }

  async areSearchResultsVisible() {
    return await this.page.isVisible(this.searchResultsList);
  }

  async verifyResultsContainNameAndEmail() {
    const resultItems = await this.page.$$(this.searchResultItem);
    if (resultItems.length === 0) {
      return false;
    }
    for (const item of resultItems) {
      const nameElement = await item.$(this.prospectName);
      const emailElement = await item.$(this.prospectEmail);
      if (!nameElement || !emailElement) {
        return false;
      }
      const nameText = await nameElement.textContent();
      const emailText = await emailElement.textContent();
      if (!nameText || nameText.trim() === '' || !emailText || emailText.trim() === '') {
        return false;
      }
    }
    return true;
  }

  async getSearchResultsCount() {
    const resultItems = await this.page.$$(this.searchResultItem);
    return resultItems.length;
  }
}

module.exports = ProspectSearchPage;