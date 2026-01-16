const { expect } = require('@playwright/test');

class GitHubSearchPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.searchInput = 'role=textbox[name="Search GitHub"]';
    this.usersFilterLink = '[data-testid="nav-item-users"]';
    this.noResultsHeading = 'role=heading[name=/Your search did not match any users/i]';
    this.resultsCountText = 'role=heading[name=/results/i][level=2]';
    this.userProfileCard = '[data-hovercard-type="user"]';
    this.searchResultsList = '[data-testid="results-list"]';
  }

  async navigateToSearchPage() {
    await this.page.goto('https://github.com/search');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isSearchInputVisible() {
    const searchInput = this.page.locator(this.searchInput);
    return await searchInput.isVisible();
  }

  async enterSearchQuery(query) {
    const searchInput = this.page.locator(this.searchInput);
    await searchInput.fill(query);
  }

  async submitSearch() {
    const searchInput = this.page.locator(this.searchInput);
    await searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async clickUsersFilter() {
    const usersFilter = this.page.locator(this.usersFilterLink);
    await usersFilter.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getNoResultsMessage() {
    const noResultsHeading = this.page.locator(this.noResultsHeading);
    await noResultsHeading.waitFor({ state: 'visible', timeout: 10000 });
    return await noResultsHeading.textContent();
  }

  async getResultsCount() {
    const resultsCount = this.page.locator(this.resultsCountText);
    await resultsCount.waitFor({ state: 'visible', timeout: 10000 });
    return await resultsCount.textContent();
  }

  async hasUserProfileData() {
    const userCards = this.page.locator(this.userProfileCard);
    const count = await userCards.count();
    return count > 0;
  }
}

module.exports = GitHubSearchPage;