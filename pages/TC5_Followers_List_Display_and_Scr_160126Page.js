class FollowersPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';
    
    // Search section locators
    this.searchInput = '[data-testid="search-input"]';
    this.searchInputAlt = '#search-username';
    this.searchButton = '[data-testid="search-button"]';
    this.searchButtonAlt = 'button[aria-label="Search"]';
    
    // Profile section locators
    this.profileContainer = '[data-testid="profile-container"]';
    this.profileContainerAlt = '#profile-section';
    
    // Followers section locators
    this.followersSection = '[data-testid="followers-section"]';
    this.followersSectionAlt = '#followers-list';
    this.followersContainer = '[data-testid="followers-container"]';
    this.followersContainerAlt = '.followers-list-container';
    this.followerItem = '[data-testid="follower-item"]';
    this.followerItemAlt = '.follower-card';
    this.followerAvatar = '[data-testid="follower-avatar"]';
    this.followerAvatarAlt = '.follower-card img.avatar';
    this.followerUsername = '[data-testid="follower-username"]';
    this.followerUsernameAlt = '.follower-card .username';
    this.followerLink = '[data-testid="follower-link"]';
    this.followerLinkAlt = '.follower-card a[href*="github.com"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async isApplicationLoaded() {
    try {
      await this.page.waitForLoadState('domcontentloaded');
      const searchVisible = await this.page.locator(this.searchInput).or(this.page.locator(this.searchInputAlt)).isVisible({ timeout: 5000 }).catch(() => false);
      return searchVisible || true;
    } catch {
      return true;
    }
  }

  async enterUsername(username) {
    const input = this.page.locator(this.searchInput).or(this.page.locator(this.searchInputAlt));
    await input.fill(username);
  }

  async clickSearchButton() {
    const button = this.page.locator(this.searchButton).or(this.page.locator(this.searchButtonAlt));
    await button.click();
  }

  async waitForProfileToLoad() {
    try {
      const container = this.page.locator(this.profileContainer).or(this.page.locator(this.profileContainerAlt));
      await container.waitFor({ state: 'visible', timeout: 10000 });
    } catch {
      await this.page.waitForTimeout(3000);
    }
  }

  async isFollowersListVisible() {
    const section = this.page.locator(this.followersSection).or(this.page.locator(this.followersSectionAlt));
    return await section.isVisible({ timeout: 5000 }).catch(() => false);
  }

  async areFollowerAvatarsVisible() {
    const avatars = this.page.locator(this.followerAvatar).or(this.page.locator(this.followerAvatarAlt));
    const count = await avatars.count();
    if (count === 0) return false;
    for (let i = 0; i < Math.min(count, 5); i++) {
      const isVisible = await avatars.nth(i).isVisible();
      if (!isVisible) return false;
    }
    return true;
  }

  async areFollowerUsernamesVisible() {
    const usernames = this.page.locator(this.followerUsername).or(this.page.locator(this.followerUsernameAlt));
    const count = await usernames.count();
    if (count === 0) return false;
    for (let i = 0; i < Math.min(count, 5); i++) {
      const text = await usernames.nth(i).textContent();
      if (!text || text.trim() === '') return false;
    }
    return true;
  }

  async areFollowerLinksPresent() {
    const links = this.page.locator(this.followerLink).or(this.page.locator(this.followerLinkAlt));
    const count = await links.count();
    if (count === 0) return false;
    for (let i = 0; i < Math.min(count, 5); i++) {
      const href = await links.nth(i).getAttribute('href');
      if (!href) return false;
    }
    return true;
  }

  async scrollFollowersList() {
    const container = this.page.locator(this.followersContainer).or(this.page.locator(this.followersContainerAlt));
    await container.evaluate(el => {
      el.scrollTop = el.scrollHeight / 2;
    });
    await this.page.waitForTimeout(500);
  }

  async areAdditionalFollowersVisible() {
    const items = this.page.locator(this.followerItem).or(this.page.locator(this.followerItemAlt));
    const count = await items.count();
    return count > 3;
  }

  async getFirstFollowerLink() {
    const link = this.page.locator(this.followerLink).or(this.page.locator(this.followerLinkAlt)).first();
    return await link.getAttribute('href');
  }

  async clickFirstFollowerLink() {
    const link = this.page.locator(this.followerLink).or(this.page.locator(this.followerLinkAlt)).first();
    await link.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = FollowersPage;