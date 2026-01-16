const { expect } = require('@playwright/test');

class GitHubProfilePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';

    // Locators
    this.searchInput = '[data-testid="search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.profileCard = '[data-testid="profile-card"]';
    this.userAvatar = '[data-testid="user-avatar"]';
    this.userName = '[data-testid="user-name"]';
    this.userUsername = '[data-testid="user-username"]';
    this.reposCounter = '[data-testid="repos-counter"]';
    this.followersCounter = '[data-testid="followers-counter"]';
    this.followingCounter = '[data-testid="following-counter"]';
    this.gistsCounter = '[data-testid="gists-counter"]';
    this.userBio = '[data-testid="user-bio"]';
    this.userLocation = '[data-testid="user-location"]';
    this.userCompany = '[data-testid="user-company"]';
    this.userWebsite = '[data-testid="user-website"]';
    this.followButton = '[data-testid="follow-button"]';
    this.followersList = '[data-testid="followers-list"]';
    this.apiRequestsIndicator = '[data-testid="api-requests-indicator"]';
    this.errorMessage = '[data-testid="error-message"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isPageLoaded() {
    await this.page.waitForSelector(this.searchInput, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.searchInput);
  }

  async enterUsername(username) {
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
    await this.page.fill(this.searchInput, username);
  }

  async clickSearchButton() {
    await this.page.waitForSelector(this.searchButton, { state: 'visible' });
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isProfileCardVisible() {
    await this.page.waitForSelector(this.profileCard, { state: 'visible', timeout: 15000 });
    return await this.page.isVisible(this.profileCard);
  }

  async getReposCount() {
    await this.page.waitForSelector(this.reposCounter, { state: 'visible' });
    const text = await this.page.textContent(this.reposCounter);
    return this.extractNumber(text);
  }

  async getFollowersCount() {
    await this.page.waitForSelector(this.followersCounter, { state: 'visible' });
    const text = await this.page.textContent(this.followersCounter);
    return this.extractNumber(text);
  }

  async getFollowingCount() {
    await this.page.waitForSelector(this.followingCounter, { state: 'visible' });
    const text = await this.page.textContent(this.followingCounter);
    return this.extractNumber(text);
  }

  async getGistsCount() {
    await this.page.waitForSelector(this.gistsCounter, { state: 'visible' });
    const text = await this.page.textContent(this.gistsCounter);
    return this.extractNumber(text);
  }

  async getUserName() {
    await this.page.waitForSelector(this.userName, { state: 'visible' });
    return await this.page.textContent(this.userName);
  }

  async getUserUsername() {
    await this.page.waitForSelector(this.userUsername, { state: 'visible' });
    return await this.page.textContent(this.userUsername);
  }

  async isAvatarVisible() {
    return await this.page.isVisible(this.userAvatar);
  }

  async getBio() {
    if (await this.page.isVisible(this.userBio)) {
      return await this.page.textContent(this.userBio);
    }
    return null;
  }

  async getLocation() {
    if (await this.page.isVisible(this.userLocation)) {
      return await this.page.textContent(this.userLocation);
    }
    return null;
  }

  async getCompany() {
    if (await this.page.isVisible(this.userCompany)) {
      return await this.page.textContent(this.userCompany);
    }
    return null;
  }

  async getApiRequestsRemaining() {
    if (await this.page.isVisible(this.apiRequestsIndicator)) {
      return await this.page.textContent(this.apiRequestsIndicator);
    }
    return null;
  }

  async isErrorMessageVisible() {
    return await this.page.isVisible(this.errorMessage);
  }

  async getErrorMessage() {
    if (await this.page.isVisible(this.errorMessage)) {
      return await this.page.textContent(this.errorMessage);
    }
    return null;
  }

  extractNumber(text) {
    if (!text) return null;
    const match = text.replace(/,/g, '').match(/\d+/);
    return match ? match[0] : null;
  }
}

module.exports = GitHubProfilePage;