const { expect } = require('@playwright/test');

class GitHubProfilePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com/search';
    
    // Search page locators
    this.searchInput = this.page.getByRole('textbox', { name: 'Search GitHub' });
    this.usersFilterLink = this.page.getByTestId('nav-item-users');
    
    // User search results locators
    this.userResultLink = (username) => this.page.getByRole('link', { name: username }).first();
    
    // Profile page locators
    this.avatarImage = this.page.getByRole('link', { name: /View .* full-sized avatar/ });
    this.fullNameElement = this.page.locator('h1 span').first();
    this.usernameElement = this.page.locator('h1 span').nth(1);
    this.followersLink = this.page.getByRole('link', { name: /followers/ });
    this.followingLink = this.page.getByRole('link', { name: /following/ });
    this.locationElement = this.page.locator('[itemprop="homeLocation"], li:has-text("Home location")');
    this.organizationLink = this.page.locator('li:has-text("Organization") a');
    this.websiteLink = this.page.locator('li a[href^="http"]:not([href*="github.com"])');
    this.followButton = this.page.getByRole('link', { name: 'Follow' }).first();
    this.repositoriesTab = this.page.getByRole('link', { name: /Repositories/ });
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isSearchInputVisible() {
    return await this.searchInput.isVisible();
  }

  async enterUsername(username) {
    await this.searchInput.fill(username);
  }

  async getSearchInputValue() {
    return await this.searchInput.inputValue();
  }

  async submitSearch() {
    await this.searchInput.press('Enter');
  }

  async waitForSearchResults() {
    await this.page.waitForLoadState('networkidle');
  }

  async clickUsersFilter() {
    await this.usersFilterLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickOnUserProfile(username) {
    await this.clickUsersFilter();
    await this.userResultLink(username).click();
  }

  async waitForProfileToLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.avatarImage.waitFor({ state: 'visible', timeout: 10000 });
  }

  async isAvatarVisible() {
    return await this.avatarImage.isVisible();
  }

  async getFullName() {
    return await this.fullNameElement.textContent();
  }

  async getUsername() {
    return await this.usernameElement.textContent();
  }

  async isFollowersCountVisible() {
    return await this.followersLink.isVisible();
  }

  async isFollowingCountVisible() {
    return await this.followingLink.isVisible();
  }

  async getFollowersCount() {
    const text = await this.followersLink.textContent();
    return text;
  }

  async getFollowingCount() {
    const text = await this.followingLink.textContent();
    return text;
  }

  async isLocationVisible() {
    return await this.locationElement.isVisible();
  }

  async getLocation() {
    return await this.locationElement.textContent();
  }

  async isOrganizationVisible() {
    return await this.organizationLink.isVisible();
  }

  async getOrganization() {
    return await this.organizationLink.textContent();
  }

  async isWebsiteLinkVisible() {
    return await this.websiteLink.isVisible();
  }

  async getWebsiteLink() {
    return await this.websiteLink.getAttribute('href');
  }

  async isFollowButtonVisible() {
    return await this.followButton.isVisible();
  }

  async clickFollowButton() {
    await this.followButton.click();
  }

  async getRepositoriesCount() {
    const text = await this.repositoriesTab.textContent();
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }
}

module.exports = GitHubProfilePage;