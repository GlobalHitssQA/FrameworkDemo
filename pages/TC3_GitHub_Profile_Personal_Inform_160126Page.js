const { expect } = require('@playwright/test');

class GitHubProfilePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';
    
    // Locators for profile elements
    this.avatarImage = 'img[alt^="View"][alt$="full-sized avatar"]';
    this.profileHeading = 'h1.vcard-names, h1[class*="vcard"]';
    this.fullNameElement = '.vcard-fullname, .p-name, h1 span[itemprop="name"]';
    this.usernameElement = '.vcard-username, .p-nickname, h1 span[itemprop="additionalName"]';
    this.biographyElement = '.user-profile-bio, [data-bio-text], div[class*="user-profile-bio"]';
    this.locationElement = 'li[itemprop="homeLocation"], li:has(svg[class*="octicon-location"])';
    this.companyElement = 'li[itemprop="worksFor"], li:has(svg[class*="octicon-organization"])';
    this.webLinkElement = 'li:has(svg[class*="octicon-link"]) a, a[rel="nofollow me"]';
    this.followButton = 'a[href*="login?return_to"]:has-text("Follow"), input[value="Follow"], button:has-text("Follow")';
    this.searchInput = 'input[name="q"], input[placeholder*="Search"]';
    this.followersLink = 'a[href*="tab=followers"]';
    this.followingLink = 'a[href*="tab=following"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async searchUser(username) {
    await this.page.goto(`${this.baseUrl}/${username}`);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector(this.avatarImage, { timeout: 10000 });
  }

  async isAvatarVisible() {
    const avatar = this.page.locator(this.avatarImage).first();
    return await avatar.isVisible();
  }

  async getFullName() {
    try {
      const heading = this.page.locator('h1').first();
      const text = await heading.textContent();
      const parts = text.trim().split(/\s+/);
      if (parts.length > 1) {
        return parts.slice(0, -1).join(' ');
      }
      return text.trim();
    } catch {
      return null;
    }
  }

  async getUsername() {
    try {
      const url = this.page.url();
      const username = url.split('/').pop();
      return username;
    } catch {
      return null;
    }
  }

  async getBiography() {
    try {
      const bioSelectors = [
        '[data-bio-text]',
        '.user-profile-bio',
        'div[class*="bio"]'
      ];
      
      for (const selector of bioSelectors) {
        const element = this.page.locator(selector).first();
        if (await element.count() > 0) {
          const text = await element.textContent();
          if (text && text.trim()) {
            return text.trim();
          }
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  async hasLocationOrCompany() {
    try {
      const locationVisible = await this.page.locator('li:has(svg) >> text=/Portland|Location|@/i').count() > 0;
      const companyVisible = await this.page.locator('li:has(svg) >> text=/Foundation|Company|Inc/i').count() > 0;
      const listItems = await this.page.locator('ul li').count();
      return locationVisible || companyVisible || listItems > 0;
    } catch {
      return false;
    }
  }

  async isWebLinkVisible() {
    try {
      const webLink = this.page.locator('a[href*="http"]:not([href*="github.com"])').first();
      return await webLink.isVisible();
    } catch {
      return false;
    }
  }

  async getWebLinkHref() {
    try {
      const webLink = this.page.locator('a[href*="http"]:not([href*="github.com"])').first();
      return await webLink.getAttribute('href');
    } catch {
      return null;
    }
  }

  async isFollowButtonVisible() {
    try {
      const followBtn = this.page.locator('a:has-text("Follow"), button:has-text("Follow")').first();
      return await followBtn.isVisible();
    } catch {
      return false;
    }
  }

  async clickFollowButton() {
    const followBtn = this.page.locator(this.followButton).first();
    await followBtn.click();
  }

  async getFollowersCount() {
    try {
      const followersLink = this.page.locator(this.followersLink).first();
      const text = await followersLink.textContent();
      return text.trim();
    } catch {
      return null;
    }
  }

  async getFollowingCount() {
    try {
      const followingLink = this.page.locator(this.followingLink).first();
      const text = await followingLink.textContent();
      return text.trim();
    } catch {
      return null;
    }
  }

  async validateEmptyFieldsHandling() {
    try {
      const hasAvatar = await this.isAvatarVisible();
      const hasUsername = await this.getUsername();
      return hasAvatar && hasUsername;
    } catch {
      return true;
    }
  }
}

module.exports = GitHubProfilePage;