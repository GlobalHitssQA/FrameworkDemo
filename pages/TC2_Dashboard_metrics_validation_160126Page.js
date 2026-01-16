const { expect } = require('@playwright/test');

class GitHubProfilePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';
    
    // Locators for search functionality
    this.searchInput = '[data-testid="search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    
    // Locators for user profile section
    this.userProfile = '[data-testid="user-profile"]';
    this.userAvatar = '[data-testid="user-avatar"]';
    this.userName = '[data-testid="user-name"]';
    this.userUsername = '[data-testid="user-username"]';
    this.userBio = '[data-testid="user-bio"]';
    this.userLocation = '[data-testid="user-location"]';
    this.userCompany = '[data-testid="user-company"]';
    this.userWebsite = '[data-testid="user-website"]';
    
    // Locators for metrics dashboard
    this.reposMetric = '[data-testid="repos-count"]';
    this.followersMetric = '[data-testid="followers-count"]';
    this.followingMetric = '[data-testid="following-count"]';
    this.gistsMetric = '[data-testid="gists-count"]';
    
    // Locators for follow button and followers list
    this.followButton = '[data-testid="follow-button"]';
    this.followersList = '[data-testid="followers-list"]';
    this.followerItem = '[data-testid="follower-item"]';
    
    // Locators for API status indicator
    this.apiRequestsIndicator = '[data-testid="api-requests-indicator"]';
    this.errorMessage = '[data-testid="error-message"]';
  }

  async navigateToApp() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async searchUser(username) {
    await this.page.fill(this.searchInput, username);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.userProfile, { state: 'visible', timeout: 10000 });
  }

  async isProfileDisplayed() {
    return await this.page.isVisible(this.userProfile);
  }

  async getReposCount() {
    const element = await this.page.locator(this.reposMetric);
    const text = await element.textContent();
    return text.replace(/[^\d]/g, '');
  }

  async getFollowersCount() {
    const element = await this.page.locator(this.followersMetric);
    const text = await element.textContent();
    return text.replace(/[^\d]/g, '');
  }

  async getFollowingCount() {
    const element = await this.page.locator(this.followingMetric);
    const text = await element.textContent();
    return text.replace(/[^\d]/g, '');
  }

  async getGistsCount() {
    const element = await this.page.locator(this.gistsMetric);
    const text = await element.textContent();
    return text.replace(/[^\d]/g, '');
  }

  async getUserName() {
    return await this.page.textContent(this.userName);
  }

  async getUserUsername() {
    return await this.page.textContent(this.userUsername);
  }

  async getUserBio() {
    return await this.page.textContent(this.userBio);
  }

  async isAvatarVisible() {
    return await this.page.isVisible(this.userAvatar);
  }

  async clickFollowButton() {
    await this.page.click(this.followButton);
  }

  async isFollowersListVisible() {
    return await this.page.isVisible(this.followersList);
  }

  async getApiRequestsRemaining() {
    return await this.page.textContent(this.apiRequestsIndicator);
  }

  async isErrorMessageDisplayed() {
    return await this.page.isVisible(this.errorMessage);
  }

  async getErrorMessageText() {
    return await this.page.textContent(this.errorMessage);
  }

  async fetchUserDataFromAPI(username) {
    const response = await this.page.request.get(`https://api.github.com/users/${username}`);
    return await response.json();
  }
}

module.exports = GitHubProfilePage;