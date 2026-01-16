const { expect } = require('@playwright/test');

class ProfilePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';
    
    // Locators for GitHub profile page
    this.searchInput = 'input[name="q"], input[placeholder*="Search"], input[aria-label*="Search"]';
    this.searchButton = 'button[type="submit"], button[aria-label*="Search"]';
    this.userAvatar = 'img[alt*="full-sized avatar"], a[href*="avatars"] img';
    this.fullNameSelector = 'h1 span[itemprop="name"], h1 > span:first-child';
    this.usernameSelector = 'h1 span[itemprop="additionalName"], h1 > span:last-child';
    this.biographySelector = '[data-bio-text], [itemprop="description"], .user-profile-bio';
    this.locationSelector = 'li[itemprop="homeLocation"] span, li:has(svg[class*="octicon-location"]) span';
    this.companySelector = 'li[itemprop="worksFor"] span, li:has(svg[class*="octicon-organization"]) span';
    this.webLinkSelector = 'li[itemprop="url"] a, li:has(svg[class*="octicon-link"]) a';
    this.followButton = 'a[href*="login?return_to"]:has-text("Follow"), button:has-text("Follow"), input[value="Follow"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async enterUsername(username) {
    await this.page.goto(`${this.baseUrl}/${username}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickSearchButton() {
    await this.page.waitForLoadState('networkidle');
  }

  async isAvatarVisible() {
    const avatar = this.page.locator(this.userAvatar).first();
    return await avatar.isVisible();
  }

  async getFullName() {
    const heading = this.page.locator('h1').first();
    const fullNameSpan = heading.locator('span').first();
    return await fullNameSpan.textContent();
  }

  async getUsername() {
    const heading = this.page.locator('h1').first();
    const spans = heading.locator('span');
    const count = await spans.count();
    if (count > 1) {
      return await spans.nth(1).textContent();
    }
    return await spans.first().textContent();
  }

  async getBiography() {
    const bioSelectors = [
      '[data-bio-text]',
      '.user-profile-bio',
      'div[class*="bio"]'
    ];
    for (const selector of bioSelectors) {
      const element = this.page.locator(selector).first();
      if (await element.isVisible().catch(() => false)) {
        return await element.textContent();
      }
    }
    const profileSection = this.page.locator('div').filter({ hasText: /followers/ }).first();
    return await profileSection.textContent() || 'No disponible';
  }

  async getLocation() {
    const locationItem = this.page.locator('li').filter({ hasText: /Home location/ }).first();
    if (await locationItem.isVisible().catch(() => false)) {
      const span = locationItem.locator('span').last();
      return await span.textContent();
    }
    return 'No disponible';
  }

  async getCompany() {
    const companyItem = this.page.locator('li').filter({ hasText: /Organization/ }).first();
    if (await companyItem.isVisible().catch(() => false)) {
      const span = companyItem.locator('span').last();
      return await span.textContent();
    }
    return 'No disponible';
  }

  async getWebLink() {
    const linkItem = this.page.locator('li a[href^="http"]').first();
    if (await linkItem.isVisible().catch(() => false)) {
      return await linkItem.getAttribute('href');
    }
    return null;
  }

  async isWebLinkClickable() {
    const linkItem = this.page.locator('li a[href^="http"]').first();
    return await linkItem.isVisible().catch(() => false);
  }

  async isFollowButtonVisible() {
    const followLink = this.page.locator('a').filter({ hasText: 'Follow' }).first();
    return await followLink.isVisible().catch(() => false);
  }
}

module.exports = ProfilePage;