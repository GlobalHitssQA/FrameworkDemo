const { expect } = require('@playwright/test');

class GitHubSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';
    
    // Locators
    this.toggleNavigationButton = 'button[aria-label="Toggle navigation"]';
    this.searchButton = 'button[data-target="qbsearch-input.inputButton"]';
    this.searchCombobox = 'input[name="query-builder-test"][role="combobox"]';
    this.searchDialog = 'dialog[aria-label*="Search"]';
    this.usersNavItem = '[data-testid="nav-item-users"]';
    this.noUsersFoundHeading = 'h3:has-text("Your search did not match any users")';
    this.resultsCountHeading = 'h2[role="status"]';
    this.searchResultsContainer = '[data-testid="results-list"]';
    this.errorMessageContainer = '.search-message';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifySearchComponentIsVisible() {
    await this.page.waitForSelector(this.toggleNavigationButton, { state: 'visible', timeout: 10000 });
  }

  async openSearchDialog() {
    const toggleButton = this.page.locator(this.toggleNavigationButton).first();
    await toggleButton.click();
    await this.page.waitForTimeout(500);
    const searchBtn = this.page.getByRole('button', { name: 'Search or jump to…' });
    await searchBtn.click();
    await this.page.waitForSelector('input[role="combobox"]', { state: 'visible', timeout: 5000 });
  }

  async enterSearchQuery(query) {
    const searchInput = this.page.getByRole('combobox', { name: 'Search' });
    await searchInput.fill(query);
  }

  async submitSearch() {
    const searchInput = this.page.getByRole('combobox', { name: 'Search' });
    await searchInput.press('Enter');
  }

  async waitForSearchResults() {
    await this.page.waitForURL(/\/search\?/, { timeout: 10000 });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToUsersTab() {
    const usersLink = this.page.locator(this.usersNavItem);
    await usersLink.click();
    await this.page.waitForURL(/type=users/, { timeout: 5000 });
  }

  async isNoUsersFoundMessageVisible() {
    const noResultsHeading = this.page.getByRole('heading', { name: 'Your search did not match any users' });
    return await noResultsHeading.isVisible();
  }

  async getResultsCount() {
    const resultsHeading = this.page.getByRole('heading', { name: /results/ }).first();
    return await resultsHeading.textContent();
  }

  async getErrorMessage() {
    const errorHeading = this.page.getByRole('heading', { level: 3 });
    if (await errorHeading.isVisible()) {
      return await errorHeading.textContent();
    }
    return null;
  }
}

module.exports = GitHubSearchPage;