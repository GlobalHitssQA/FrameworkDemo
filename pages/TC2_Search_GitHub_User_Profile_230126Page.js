class GitHubProfilePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';
    
    // Locators extracted from real GitHub DOM
    this.avatarImage = 'img[alt="View octocat\'s full-sized avatar"]';
    this.fullNameSelector = 'h1 span:first-child';
    this.usernameSelector = 'h1 span:last-child';
    this.followersLink = 'a[href*="tab=followers"]';
    this.followingLink = 'a[href*="tab=following"]';
    this.locationSelector = 'li[itemprop="homeLocation"] span, li:has(svg) span:has-text("San Francisco")';
    this.organizationLink = 'a[href="https://github.com/github"]';
    this.websiteLink = 'a[href="https://github.blog"]';
    this.followButton = 'a:has-text("Follow")[href*="/login?return_to"]';
    this.repositoriesTab = 'a[href*="tab=repositories"]';
    this.searchButton = 'button:has-text("Search or jump to")';
    this.userProfileNav = 'nav[aria-label="User profile"]';
  }

  async navigateToHomepage() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToProfile(username) {
    await this.page.goto(`${this.baseUrl}/${username}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isAvatarVisible() {
    const avatar = this.page.locator('img[alt*="avatar"], img[alt*="@"]').first();
    return await avatar.isVisible();
  }

  async getFullName() {
    const nameElement = this.page.locator('h1').first();
    return await nameElement.textContent();
  }

  async getUsername() {
    const usernameElement = this.page.locator('h1 span').last();
    return await usernameElement.textContent();
  }

  async isFollowersLinkVisible() {
    const followersLink = this.page.locator(this.followersLink).first();
    return await followersLink.isVisible();
  }

  async isFollowingLinkVisible() {
    const followingLink = this.page.locator(this.followingLink).first();
    return await followingLink.isVisible();
  }

  async getLocation() {
    const locationElement = this.page.locator('li').filter({ hasText: 'San Francisco' }).first();
    return await locationElement.textContent();
  }

  async isOrganizationLinkVisible() {
    const orgLink = this.page.locator(this.organizationLink).first();
    return await orgLink.isVisible();
  }

  async isWebsiteLinkVisible() {
    const websiteLink = this.page.locator(this.websiteLink).first();
    return await websiteLink.isVisible();
  }

  async isFollowButtonVisible() {
    const followBtn = this.page.locator('a').filter({ hasText: 'Follow' }).first();
    return await followBtn.isVisible();
  }

  async isRepositoriesTabVisible() {
    const reposTab = this.page.locator(this.repositoriesTab).first();
    return await reposTab.isVisible();
  }

  async clickFollowersLink() {
    await this.page.locator(this.followersLink).first().click();
  }

  async clickFollowingLink() {
    await this.page.locator(this.followingLink).first().click();
  }

  async clickRepositoriesTab() {
    await this.page.locator(this.repositoriesTab).first().click();
  }
};

module.exports = GitHubProfilePage;