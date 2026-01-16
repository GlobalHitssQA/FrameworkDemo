const { expect } = require('@playwright/test');

class GitHubProfileSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.APP_URL || 'http://localhost:3000';
    
    // Locators - Search Component
    this._searchInput = '[data-testid="search-input"]';
    this._searchButton = '[data-testid="search-button"]';
    this._loadingIndicator = '[data-testid="loading-indicator"]';
    
    // Locators - Profile Card
    this._profileCard = '[data-testid="profile-card"]';
    this._userAvatar = '[data-testid="user-avatar"]';
    this._userName = '[data-testid="user-name"]';
    this._userBio = '[data-testid="user-bio"]';
    this._userLocation = '[data-testid="user-location"]';
    this._userCompany = '[data-testid="user-company"]';
    
    // Locators - Metrics Dashboard
    this._reposCount = '[data-testid="repos-count"]';
    this._followersCount = '[data-testid="followers-count"]';
    this._followingCount = '[data-testid="following-count"]';
    this._gistsCount = '[data-testid="gists-count"]';
    
    // Locators - API Limit Indicator
    this._requestLimitIndicator = '[data-testid="request-limit-indicator"]';
    
    // Locators - Error Messages
    this._errorMessage = '[data-testid="error-message"]';
    
    // Locators - Followers List
    this._followersList = '[data-testid="followers-list"]';
    this._followerItem = '[data-testid="follower-item"]';
    
    // Locators - Follow Button
    this._followButton = '[data-testid="follow-button"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async isSearchInputVisible() {
    return await this.page.locator(this._searchInput).isVisible();
  }

  async isSearchButtonVisible() {
    return await this.page.locator(this._searchButton).isVisible();
  }

  async enterUsername(username) {
    await this.page.locator(this._searchInput).fill(username);
  }

  async getSearchInputValue() {
    return await this.page.locator(this._searchInput).inputValue();
  }

  async clickSearchButton() {
    await this.page.locator(this._searchButton).click();
  }

  async waitForProfileLoad() {
    await this.page.locator(this._loadingIndicator).waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    await this.page.locator(this._profileCard).waitFor({ state: 'visible', timeout: 15000 });
  }

  async isProfileCardVisible() {
    return await this.page.locator(this._profileCard).isVisible();
  }

  async getReposCount() {
    const text = await this.page.locator(this._reposCount).textContent();
    return parseInt(text, 10);
  }

  async getFollowersCount() {
    const text = await this.page.locator(this._followersCount).textContent();
    return parseInt(text, 10);
  }

  async getFollowingCount() {
    const text = await this.page.locator(this._followingCount).textContent();
    return parseInt(text, 10);
  }

  async getGistsCount() {
    const text = await this.page.locator(this._gistsCount).textContent();
    return parseInt(text, 10);
  }

  async getRequestLimitText() {
    return await this.page.locator(this._requestLimitIndicator).textContent();
  }

  async isErrorMessageVisible() {
    return await this.page.locator(this._errorMessage).isVisible();
  }

  async getErrorMessageText() {
    return await this.page.locator(this._errorMessage).textContent();
  }

  async getUserName() {
    return await this.page.locator(this._userName).textContent();
  }

  async getUserBio() {
    return await this.page.locator(this._userBio).textContent();
  }

  async isFollowersListVisible() {
    return await this.page.locator(this._followersList).isVisible();
  }

  async getFollowerItemsCount() {
    return await this.page.locator(this._followerItem).count();
  }

  async clickFollowButton() {
    await this.page.locator(this._followButton).click();
  }
}

module.exports = GitHubProfileSearchPage;