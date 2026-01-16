const { expect } = require('@playwright/test');

class GitHubSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    
    // Search component locators
    this.searchInput = '[data-testid="search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    
    // User profile locators
    this.userAvatar = '[data-testid="user-avatar"]';
    this.userFullName = '[data-testid="user-fullname"]';
    this.userUsername = '[data-testid="user-username"]';
    this.userBio = '[data-testid="user-bio"]';
    this.userLocation = '[data-testid="user-location"]';
    this.userCompany = '[data-testid="user-company"]';
    this.userWebLink = '[data-testid="user-weblink"]';
    this.followButton = '[data-testid="follow-button"]';
    
    // Metrics locators
    this.reposCount = '[data-testid="repos-count"]';
    this.followersCount = '[data-testid="followers-count"]';
    this.followingCount = '[data-testid="following-count"]';
    this.gistsCount = '[data-testid="gists-count"]';
    
    // API requests indicator locator
    this.requestsIndicator = '[data-testid="requests-indicator"]';
    
    // Loading state locator
    this.loadingIndicator = '[data-testid="loading-indicator"]';
    this.profileContainer = '[data-testid="profile-container"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async isSearchInputVisible() {
    return await this.page.locator(this.searchInput).isVisible();
  }

  async isSearchButtonVisible() {
    return await this.page.locator(this.searchButton).isVisible();
  }

  async enterUsername(username) {
    await this.page.locator(this.searchInput).fill(username);
  }

  async getSearchInputValue() {
    return await this.page.locator(this.searchInput).inputValue();
  }

  async clickSearchButton() {
    await this.page.locator(this.searchButton).click();
  }

  async waitForProfileToLoad() {
    await this.page.locator(this.profileContainer).waitFor({ state: 'visible', timeout: 10000 });
  }

  async isAvatarVisible() {
    return await this.page.locator(this.userAvatar).isVisible();
  }

  async isFullNameVisible() {
    return await this.page.locator(this.userFullName).isVisible();
  }

  async isUsernameDisplayVisible() {
    return await this.page.locator(this.userUsername).isVisible();
  }

  async isBioVisible() {
    return await this.page.locator(this.userBio).isVisible();
  }

  async isLocationVisible() {
    return await this.page.locator(this.userLocation).isVisible();
  }

  async isCompanyVisible() {
    return await this.page.locator(this.userCompany).isVisible();
  }

  async isWebLinkVisible() {
    return await this.page.locator(this.userWebLink).isVisible();
  }

  async isFollowButtonVisible() {
    return await this.page.locator(this.followButton).isVisible();
  }

  async isReposCountVisible() {
    return await this.page.locator(this.reposCount).isVisible();
  }

  async isFollowersCountVisible() {
    return await this.page.locator(this.followersCount).isVisible();
  }

  async isFollowingCountVisible() {
    return await this.page.locator(this.followingCount).isVisible();
  }

  async isGistsCountVisible() {
    return await this.page.locator(this.gistsCount).isVisible();
  }

  async isRequestsIndicatorVisible() {
    return await this.page.locator(this.requestsIndicator).isVisible();
  }

  async getRequestsIndicatorText() {
    return await this.page.locator(this.requestsIndicator).textContent();
  }
}

module.exports = GitHubSearchPage;