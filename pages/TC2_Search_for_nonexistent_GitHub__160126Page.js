const { expect } = require('@playwright/test');

class SearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';
    
    // Locators
    this.searchInput = '[data-testid="search-input"], input[type="search"], input[placeholder*="search" i], input[placeholder*="usuario" i], input[placeholder*="username" i], #search-input';
    this.searchButton = '[data-testid="search-button"], button[type="submit"], button[aria-label*="search" i], button svg[class*="search"], .search-button, button:has(svg)';
    this.errorMessage = '[data-testid="error-message"], .error-message, .error, [class*="error"], [class*="not-found"], [role="alert"]';
    this.profileSection = '[data-testid="profile-section"], .profile, .user-profile, [class*="profile"]';
    this.metricsDashboard = '[data-testid="metrics-dashboard"], .metrics, .stats, [class*="metrics"], [class*="stats"]';
    this.reposCounter = '[data-testid="repos-count"], .repos-count, [class*="repo"] [class*="count"]';
    this.followersCounter = '[data-testid="followers-count"], .followers-count, [class*="follower"] [class*="count"]';
    this.followingCounter = '[data-testid="following-count"], .following-count, [class*="following"] [class*="count"]';
    this.gistsCounter = '[data-testid="gists-count"], .gists-count, [class*="gist"] [class*="count"]';
    this.userAvatar = '[data-testid="user-avatar"], .avatar, img[class*="avatar"], img[alt*="avatar"]';
    this.userName = '[data-testid="user-name"], .user-name, .username, [class*="name"]';
    this.userBio = '[data-testid="user-bio"], .bio, [class*="bio"]';
    this.searchComponent = '[data-testid="search-component"], .search-container, .search, form:has(input)';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isSearchComponentVisible() {
    try {
      await this.page.waitForSelector(this.searchComponent, { timeout: 5000 });
      return await this.page.isVisible(this.searchComponent);
    } catch {
      return false;
    }
  }

  async enterUsername(username) {
    await this.page.waitForSelector(this.searchInput, { timeout: 5000 });
    await this.page.fill(this.searchInput, username);
  }

  async getSearchInputValue() {
    return await this.page.inputValue(this.searchInput);
  }

  async clickSearchButton() {
    await this.page.waitForSelector(this.searchButton, { timeout: 5000 });
    await this.page.click(this.searchButton);
  }

  async waitForApiResponse() {
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await this.page.waitForTimeout(1000);
  }

  async isErrorMessageVisible() {
    try {
      await this.page.waitForSelector(this.errorMessage, { timeout: 5000 });
      return await this.page.isVisible(this.errorMessage);
    } catch {
      return false;
    }
  }

  async getErrorMessageText() {
    try {
      await this.page.waitForSelector(this.errorMessage, { timeout: 5000 });
      return await this.page.textContent(this.errorMessage);
    } catch {
      return '';
    }
  }

  async isProfileSectionVisible() {
    try {
      const isVisible = await this.page.isVisible(this.profileSection);
      const hasAvatar = await this.page.isVisible(this.userAvatar);
      const hasName = await this.page.isVisible(this.userName);
      return isVisible || hasAvatar || hasName;
    } catch {
      return false;
    }
  }

  async isMetricsDashboardVisible() {
    try {
      const hasMetrics = await this.page.isVisible(this.metricsDashboard);
      const hasRepos = await this.page.isVisible(this.reposCounter);
      const hasFollowers = await this.page.isVisible(this.followersCounter);
      return hasMetrics || hasRepos || hasFollowers;
    } catch {
      return false;
    }
  }
}

module.exports = SearchPage;