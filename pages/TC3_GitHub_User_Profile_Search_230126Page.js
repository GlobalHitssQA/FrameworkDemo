const { expect } = require('@playwright/test');

class GitHubSearchPage {
  constructor(page) {
    this.page = page;
    this.searchUrl = 'https://github.com/search?type=users';
    this.searchInput = 'input[name="q"], input[aria-label="Search GitHub"], [role="textbox"][name="Search GitHub"]';
    this.userResultLink = 'a[href^="/"][data-testid="search-result"], .search-title a, [class*="search"] a[href^="/"]';
    this.firstUserResultName = 'h3 a[href^="/"]';
  }

  async navigate() {
    await this.page.goto(this.searchUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async searchForUser(username) {
    const searchBox = this.page.getByRole('textbox', { name: 'Search GitHub' });
    await searchBox.fill(username);
    await searchBox.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async clickOnFirstUserResult() {
    const firstResult = this.page.locator('h3').first().getByRole('link').first();
    await firstResult.click();
    await this.page.waitForLoadState('networkidle');
  }
}

class GitHubProfilePage {
  constructor(page) {
    this.page = page;
    this.profileHeading = 'h1[class*="vcard"], h1[itemprop="name"], [class*="vcard-names"] h1';
    this.fullNameSelector = '[itemprop="name"], [class*="vcard-fullname"], h1 span:first-child';
    this.usernameSelector = '[itemprop="additionalName"], [class*="vcard-username"], h1 span:last-child';
    this.followersLink = 'a[href*="tab=followers"]';
    this.followingLink = 'a[href*="tab=following"]';
    this.repositoriesLink = 'a[href*="tab=repositories"]';
    this.locationSelector = '[itemprop="homeLocation"], li[itemprop="homeLocation"], [class*="vcard"] [aria-label*="location"]';
    this.organizationSelector = '[itemprop="worksFor"], li[itemprop="worksFor"], [class*="vcard"] [aria-label*="Organization"]';
    this.avatarSelector = 'img[alt*="avatar"], img[class*="avatar"], a[href*="avatars"] img';
    this.followButton = 'a[href*="login"][class*="follow"], a:has-text("Follow")';
  }

  async isProfilePageVisible() {
    await this.page.waitForLoadState('networkidle');
    const heading = this.page.locator('h1').first();
    return await heading.isVisible();
  }

  async getFullName() {
    const fullNameElement = this.page.locator('h1 span').first();
    if (await fullNameElement.isVisible()) {
      return await fullNameElement.textContent();
    }
    return null;
  }

  async getUsername() {
    const usernameElement = this.page.locator('h1 span').last();
    if (await usernameElement.isVisible()) {
      return await usernameElement.textContent();
    }
    return null;
  }

  async getFollowersCount() {
    const followersLink = this.page.locator('a[href*="tab=followers"]');
    if (await followersLink.isVisible()) {
      return await followersLink.textContent();
    }
    return null;
  }

  async getRepositoriesCount() {
    const reposLink = this.page.locator('a[href*="tab=repositories"]');
    if (await reposLink.isVisible()) {
      const repoText = await reposLink.textContent();
      return repoText;
    }
    return null;
  }

  async getLocation() {
    const locationElement = this.page.locator('li[itemprop="homeLocation"], [aria-label*="Home location"]').first();
    if (await locationElement.isVisible()) {
      return await locationElement.textContent();
    }
    return null;
  }

  async getOrganization() {
    const orgElement = this.page.locator('li[itemprop="worksFor"], [aria-label*="Organization"]').first();
    if (await orgElement.isVisible()) {
      return await orgElement.textContent();
    }
    return null;
  }

  async isAvatarVisible() {
    const avatar = this.page.locator('img[alt*="avatar"]').first();
    return await avatar.isVisible();
  }

  async clickFollowersLink() {
    const followersLink = this.page.locator('a[href*="tab=followers"]');
    await followersLink.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { GitHubSearchPage, GitHubProfilePage };