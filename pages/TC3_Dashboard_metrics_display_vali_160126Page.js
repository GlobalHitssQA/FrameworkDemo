class DashboardPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';
    
    // Search elements
    this.searchInput = '[data-testid="search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    
    // Profile elements
    this.userAvatar = '[data-testid="user-avatar"]';
    this.userProfile = '[data-testid="user-profile"]';
    
    // Metrics section
    this.metricsSection = '[data-testid="metrics-section"]';
    
    // Repos metric
    this.reposLabel = '[data-testid="repos-label"]';
    this.reposValue = '[data-testid="repos-value"]';
    
    // Followers metric
    this.followersLabel = '[data-testid="followers-label"]';
    this.followersValue = '[data-testid="followers-value"]';
    
    // Following metric
    this.followingLabel = '[data-testid="following-label"]';
    this.followingValue = '[data-testid="following-value"]';
    
    // Gists metric
    this.gistsLabel = '[data-testid="gists-label"]';
    this.gistsValue = '[data-testid="gists-value"]';
    
    // API requests indicator
    this.apiRequestsIndicator = '[data-testid="api-requests-indicator"]';
    
    // Error message
    this.errorMessage = '[data-testid="error-message"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async searchUser(username) {
    await this.page.fill(this.searchInput, username);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isProfileDisplayed() {
    await this.page.waitForSelector(this.userProfile, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.userProfile);
  }

  async isMetricsSectionVisible() {
    await this.page.waitForSelector(this.metricsSection, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.metricsSection);
  }

  async getReposLabel() {
    return await this.page.textContent(this.reposLabel);
  }

  async getReposValue() {
    return await this.page.textContent(this.reposValue);
  }

  async getFollowersLabel() {
    return await this.page.textContent(this.followersLabel);
  }

  async getFollowersValue() {
    return await this.page.textContent(this.followersValue);
  }

  async getFollowingLabel() {
    return await this.page.textContent(this.followingLabel);
  }

  async getFollowingValue() {
    return await this.page.textContent(this.followingValue);
  }

  async getGistsLabel() {
    return await this.page.textContent(this.gistsLabel);
  }

  async getGistsValue() {
    return await this.page.textContent(this.gistsValue);
  }

  async fetchGitHubApiData(username) {
    const response = await this.page.request.get(`https://api.github.com/users/${username}`);
    return await response.json();
  }

  async isErrorMessageDisplayed() {
    return await this.page.isVisible(this.errorMessage);
  }

  async getErrorMessageText() {
    return await this.page.textContent(this.errorMessage);
  }
};

module.exports = DashboardPage;