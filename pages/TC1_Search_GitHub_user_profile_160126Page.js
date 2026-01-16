const { expect } = require('@playwright/test');

class GitHubProfileSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';

    // Locators - Using data-testid as primary strategy
    this.searchInput = '[data-testid="search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.profileContainer = '[data-testid="profile-container"]';
    this.userAvatar = '[data-testid="user-avatar"]';
    this.fullName = '[data-testid="user-fullname"]';
    this.username = '[data-testid="user-username"]';
    this.repositoriesCount = '[data-testid="repos-count"]';
    this.followersCount = '[data-testid="followers-count"]';
    this.followingCount = '[data-testid="following-count"]';
    this.gistsCount = '[data-testid="gists-count"]';
    this.userBio = '[data-testid="user-bio"]';
    this.userLocation = '[data-testid="user-location"]';
    this.userCompany = '[data-testid="user-company"]';
    this.userWebsite = '[data-testid="user-website"]';
    this.followButton = '[data-testid="follow-button"]';
    this.followersList = '[data-testid="followers-list"]';
    this.apiRequestsIndicator = '[data-testid="api-requests-indicator"]';
    this.errorMessage = '[data-testid="error-message"]';

    // Fallback CSS selectors
    this.searchInputFallback = 'input[type="text"][placeholder*="search"], input[type="search"], #search-input, .search-input';
    this.searchButtonFallback = 'button[type="submit"], button.search-button, button[aria-label*="search"], .search-btn';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async verifyPageLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
    const searchInputVisible = await this.page.locator(this.searchInput).or(this.page.locator(this.searchInputFallback)).first().isVisible({ timeout: 10000 }).catch(() => false);
    if (!searchInputVisible) {
      throw new Error('Search input is not visible - page may not have loaded correctly');
    }
  }

  async enterUsername(username) {
    const searchField = this.page.locator(this.searchInput).or(this.page.locator(this.searchInputFallback)).first();
    await searchField.waitFor({ state: 'visible', timeout: 10000 });
    await searchField.clear();
    await searchField.fill(username);
  }

  async clickSearchButton() {
    const button = this.page.locator(this.searchButton).or(this.page.locator(this.searchButtonFallback)).first();
    await button.waitFor({ state: 'visible', timeout: 10000 });
    await button.click();
  }

  async waitForProfileToLoad() {
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    const profileVisible = await this.page.locator(this.profileContainer).isVisible({ timeout: 10000 }).catch(() => false);
    if (!profileVisible) {
      await this.page.waitForTimeout(2000);
    }
  }

  async isProfileContainerVisible() {
    return await this.page.locator(this.profileContainer).isVisible().catch(() => false);
  }

  async isAvatarVisible() {
    return await this.page.locator(this.userAvatar).isVisible().catch(() => false);
  }

  async getFullName() {
    const element = this.page.locator(this.fullName);
    await element.waitFor({ state: 'visible', timeout: 10000 });
    return await element.textContent();
  }

  async getUsername() {
    const element = this.page.locator(this.username);
    await element.waitFor({ state: 'visible', timeout: 10000 });
    return await element.textContent();
  }

  async getRepositoriesCount() {
    const element = this.page.locator(this.repositoriesCount);
    return await element.textContent();
  }

  async getFollowersCount() {
    const element = this.page.locator(this.followersCount);
    return await element.textContent();
  }

  async getFollowingCount() {
    const element = this.page.locator(this.followingCount);
    return await element.textContent();
  }

  async getGistsCount() {
    const element = this.page.locator(this.gistsCount);
    return await element.textContent();
  }

  async getBio() {
    const element = this.page.locator(this.userBio);
    return await element.textContent();
  }

  async getLocation() {
    const element = this.page.locator(this.userLocation);
    return await element.textContent();
  }

  async getCompany() {
    const element = this.page.locator(this.userCompany);
    return await element.textContent();
  }

  async getWebsiteLink() {
    const element = this.page.locator(this.userWebsite);
    return await element.getAttribute('href');
  }

  async isErrorMessageVisible() {
    return await this.page.locator(this.errorMessage).isVisible().catch(() => false);
  }

  async getErrorMessageText() {
    const element = this.page.locator(this.errorMessage);
    return await element.textContent();
  }
};

module.exports = GitHubProfileSearchPage;