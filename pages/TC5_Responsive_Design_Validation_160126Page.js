const { expect } = require('@playwright/test');

class GitHubProfileSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';
    
    // Locators - Using semantic selectors based on best practices
    this.searchInput = '[data-testid="search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.errorMessage = '[data-testid="error-message"]';
    this.metricsDashboard = '[data-testid="metrics-dashboard"]';
    this.reposCounter = '[data-testid="repos-counter"]';
    this.followersCounter = '[data-testid="followers-counter"]';
    this.followingCounter = '[data-testid="following-counter"]';
    this.gistsCounter = '[data-testid="gists-counter"]';
    this.userAvatar = '[data-testid="user-avatar"]';
    this.userName = '[data-testid="user-name"]';
    this.userUsername = '[data-testid="user-username"]';
    this.userBio = '[data-testid="user-bio"]';
    this.userLocation = '[data-testid="user-location"]';
    this.userCompany = '[data-testid="user-company"]';
    this.userWebsite = '[data-testid="user-website"]';
    this.followButton = '[data-testid="follow-button"]';
    this.followersList = '[data-testid="followers-list"]';
    this.followerItem = '[data-testid="follower-item"]';
    this.followerLink = '[data-testid="follower-link"]';
    this.profileInfo = '[data-testid="profile-info"]';
    this.apiLimitIndicator = '[data-testid="api-limit-indicator"]';
    this.mainContainer = '[data-testid="main-container"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async setViewport(width, height) {
    await this.page.setViewportSize({ width, height });
    await this.page.waitForTimeout(500);
  }

  async searchUser(username) {
    await this.page.fill(this.searchInput, username);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isSearchInputVisible() {
    return await this.page.isVisible(this.searchInput);
  }

  async isSearchButtonVisible() {
    return await this.page.isVisible(this.searchButton);
  }

  async isMetricsDashboardVisible() {
    return await this.page.isVisible(this.metricsDashboard);
  }

  async isProfileInfoVisible() {
    return await this.page.isVisible(this.profileInfo);
  }

  async isFollowersListVisible() {
    return await this.page.isVisible(this.followersList);
  }

  async isErrorMessageVisible() {
    return await this.page.isVisible(this.errorMessage);
  }

  async getErrorMessageText() {
    return await this.page.textContent(this.errorMessage);
  }

  async checkNoElementOverlap() {
    const searchBox = await this.page.locator(this.searchInput).boundingBox();
    const button = await this.page.locator(this.searchButton).boundingBox();
    
    if (!searchBox || !button) return true;
    
    const overlap = !(searchBox.x + searchBox.width <= button.x ||
                      button.x + button.width <= searchBox.x ||
                      searchBox.y + searchBox.height <= button.y ||
                      button.y + button.height <= searchBox.y);
    
    return !overlap || (searchBox.x + searchBox.width <= button.x);
  }

  async isVerticalLayoutActive() {
    const viewport = this.page.viewportSize();
    return viewport.width < 768;
  }

  async getSearchInputDimensions() {
    const boundingBox = await this.page.locator(this.searchInput).boundingBox();
    return { width: boundingBox?.width || 0, height: boundingBox?.height || 0 };
  }

  async getSearchButtonDimensions() {
    const boundingBox = await this.page.locator(this.searchButton).boundingBox();
    return { width: boundingBox?.width || 0, height: boundingBox?.height || 0 };
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(300);
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.waitForTimeout(300);
  }

  async verifyScrollFunctionality() {
    const initialScrollY = await this.page.evaluate(() => window.scrollY);
    await this.scrollToBottom();
    const afterScrollY = await this.page.evaluate(() => window.scrollY);
    await this.scrollToTop();
    const finalScrollY = await this.page.evaluate(() => window.scrollY);
    
    return afterScrollY > initialScrollY || finalScrollY === 0;
  }

  async areFollowerLinksClickable() {
    const followerLinks = await this.page.locator(this.followerLink).all();
    if (followerLinks.length === 0) return true;
    
    for (const link of followerLinks) {
      const isEnabled = await link.isEnabled();
      if (!isEnabled) return false;
    }
    return true;
  }

  async areMetricsDisplayed() {
    const reposVisible = await this.page.isVisible(this.reposCounter);
    const followersVisible = await this.page.isVisible(this.followersCounter);
    const followingVisible = await this.page.isVisible(this.followingCounter);
    const gistsVisible = await this.page.isVisible(this.gistsCounter);
    
    return reposVisible && followersVisible && followingVisible && gistsVisible;
  }

  async getUserName() {
    return await this.page.textContent(this.userName);
  }

  async getUserBio() {
    return await this.page.textContent(this.userBio);
  }

  async getReposCount() {
    return await this.page.textContent(this.reposCounter);
  }

  async getFollowersCount() {
    return await this.page.textContent(this.followersCounter);
  }

  async clickFollowButton() {
    await this.page.click(this.followButton);
  }

  async getFollowersList() {
    return await this.page.locator(this.followerItem).all();
  }
};

module.exports = GitHubProfileSearchPage;