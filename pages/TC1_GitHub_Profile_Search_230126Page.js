class GitHubProfilePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';
    
    // Search page locators
    this.searchInput = 'input[name="q"], input[placeholder="Search GitHub"], .header-search-input';
    this.searchButton = 'button[type="submit"]';
    this.searchResultsHeading = 'h2[data-testid="results-list-header"], h2:has-text("results")';
    this.userSearchLink = 'a[href*="type=users"]';
    this.firstUserResult = 'a[href^="/"][data-testid="user-login"], .search-title a, h3 a[href^="/"]';
    
    // Profile page locators
    this.userAvatar = 'img[alt*="@"], a[href*="avatars.githubusercontent.com"] img';
    this.userFullName = 'h1 span[itemprop="name"], h1 .p-name, h1 .vcard-fullname, h1 > span:first-child';
    this.username = 'h1 span[itemprop="additionalName"], h1 .p-nickname, h1 .vcard-username, h1 > span:last-child';
    this.userBio = '.user-profile-bio, [data-bio-text], div[data-testid="profile-bio"]';
    this.userLocation = 'li[itemprop="homeLocation"], li:has(svg[class*="octicon-location"]), [aria-label*="Home location"]';
    this.userOrganization = 'li[itemprop="worksFor"], li:has(svg[class*="octicon-organization"]), [aria-label*="Organization"]';
    this.userWebsite = 'li[itemprop="url"] a, li:has(svg[class*="octicon-link"]) a, a[rel="nofollow me"]';
    this.followButton = 'a:has-text("Follow"), button:has-text("Follow"), input[value="Follow"]';
    this.followersLink = 'a[href*="tab=followers"]';
    this.followingLink = 'a[href*="tab=following"]';
    this.repositoriesTab = 'a[href*="tab=repositories"], nav a:has-text("Repositories")';
  }

  async navigateToSearchPage() {
    await this.page.goto(`${this.baseUrl}/search?type=users`);
    await this.page.waitForLoadState('networkidle');
  }

  async enterUsername(username) {
    await this.page.fill(this.searchInput, username);
  }

  async clickSearchButton() {
    await this.page.press(this.searchInput, 'Enter');
  }

  async waitForSearchResults() {
    await this.page.waitForSelector(this.searchResultsHeading, { state: 'visible', timeout: 10000 });
  }

  async clickOnUserProfile() {
    await this.page.click(this.firstUserResult);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForProfileToLoad() {
    await this.page.waitForSelector(this.userAvatar, { state: 'visible', timeout: 10000 });
  }

  async isProfileVisible() {
    return await this.page.isVisible(this.userAvatar);
  }

  async isAvatarVisible() {
    return await this.page.isVisible(this.userAvatar);
  }

  async isFullNameVisible() {
    return await this.page.isVisible(this.userFullName);
  }

  async isUsernameVisible() {
    return await this.page.isVisible(this.username);
  }

  async isLocationVisible() {
    return await this.page.isVisible(this.userLocation);
  }

  async isOrganizationVisible() {
    return await this.page.isVisible(this.userOrganization);
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
    return await this.page.textContent(this.username);
  }

  async getLocation() {
    return await this.page.textContent(this.userLocation);
  }

  async getFollowersCount() {
    const text = await this.page.textContent(this.followersLink);
    return text;
  }

  async getFollowingCount() {
    const text = await this.page.textContent(this.followingLink);
    return text;
  }

  async clickFollowButton() {
    await this.page.click(this.followButton);
  }

  async navigateToUserProfile(username) {
    await this.page.goto(`${this.baseUrl}/${username}`);
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = GitHubProfilePage;