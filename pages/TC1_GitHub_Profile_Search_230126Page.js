class GitHubProfileSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    
    // Search components
    this.searchInput = '[data-testid="search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    
    // Profile section
    this.profileSection = '[data-testid="profile-section"]';
    this.userAvatar = '[data-testid="user-avatar"]';
    this.userFullName = '[data-testid="user-fullname"]';
    this.userName = '[data-testid="user-username"]';
    this.userBio = '[data-testid="user-bio"]';
    this.userLocation = '[data-testid="user-location"]';
    this.userCompany = '[data-testid="user-company"]';
    this.userWebsite = '[data-testid="user-website"]';
    this.followButton = '[data-testid="follow-button"]';
    
    // Metrics dashboard
    this.metricsRepos = '[data-testid="metrics-repos"]';
    this.metricsFollowers = '[data-testid="metrics-followers"]';
    this.metricsFollowing = '[data-testid="metrics-following"]';
    this.metricsGists = '[data-testid="metrics-gists"]';
    
    // Followers list
    this.followersList = '[data-testid="followers-list"]';
    
    // API indicator
    this.apiLimitIndicator = '[data-testid="api-limit-indicator"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async isSearchInputEnabled() {
    return await this.page.isEnabled(this.searchInput);
  }

  async isSearchButtonEnabled() {
    return await this.page.isEnabled(this.searchButton);
  }

  async enterUsername(username) {
    await this.page.fill(this.searchInput, username);
  }

  async getSearchInputValue() {
    return await this.page.inputValue(this.searchInput);
  }

  async clickSearchButton() {
    await this.page.click(this.searchButton);
  }

  async waitForProfileToLoad() {
    await this.page.waitForSelector(this.profileSection, { state: 'visible', timeout: 10000 });
  }

  async isProfileSectionVisible() {
    return await this.page.isVisible(this.profileSection);
  }

  async isAvatarVisible() {
    return await this.page.isVisible(this.userAvatar);
  }

  async isFullNameVisible() {
    return await this.page.isVisible(this.userFullName);
  }

  async isUsernameVisible() {
    return await this.page.isVisible(this.userName);
  }

  async isBioVisible() {
    return await this.page.isVisible(this.userBio);
  }

  async isLocationVisible() {
    return await this.page.isVisible(this.userLocation);
  }

  async isCompanyVisible() {
    return await this.page.isVisible(this.userCompany);
  }

  async isWebsiteLinkVisible() {
    return await this.page.isVisible(this.userWebsite);
  }

  async isFollowButtonVisible() {
    return await this.page.isVisible(this.followButton);
  }

  async getFullName() {
    return await this.page.textContent(this.userFullName);
  }

  async getUsername() {
    return await this.page.textContent(this.userName);
  }

  async getBio() {
    return await this.page.textContent(this.userBio);
  }

  async getLocation() {
    return await this.page.textContent(this.userLocation);
  }

  async getCompany() {
    return await this.page.textContent(this.userCompany);
  }

  async clickFollowButton() {
    await this.page.click(this.followButton);
  }
}

module.exports = GitHubProfileSearchPage;