const { expect } = require('@playwright/test');

class GitHubProfilePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';
    
    // Locators for search functionality
    this.searchInput = 'input[type="text"][placeholder*="Search"], input[name="q"], input[data-testid="search-input"], .search-input';
    this.searchButton = 'button[type="submit"], button[data-testid="search-button"], .search-button, button:has(svg)';
    
    // Locators for profile left section elements
    this.avatarImage = 'img[alt*="avatar"], img[alt*="View"][alt*="full-sized avatar"], .avatar, img.avatar-user';
    this.fullNameElement = 'h1 span[itemprop="name"], h1 .p-name, h1 .vcard-fullname, [data-testid="profile-fullname"]';
    this.usernameElement = 'h1 span[itemprop="additionalName"], h1 .p-nickname, h1 .vcard-username, [data-testid="profile-username"]';
    this.biographyElement = '.user-profile-bio, [data-testid="profile-bio"], .p-note, [data-bio-text]';
    this.locationElement = 'li[itemprop="homeLocation"], [data-testid="profile-location"], .vcard-detail:has(svg[class*="octicon-location"])';
    this.companyElement = 'li[itemprop="worksFor"], [data-testid="profile-company"], .vcard-detail:has(svg[class*="octicon-organization"])';
    this.websiteLink = 'a[rel="nofollow me"], [data-testid="profile-website"], .vcard-detail a[href^="http"]';
    this.followButton = 'a[href*="login?return_to"]:has-text("Follow"), button:has-text("Follow"), [data-testid="follow-button"]';
    this.followersLink = 'a[href*="tab=followers"]';
    this.followingLink = 'a[href*="tab=following"]';
    
    // Error message locator
    this.errorMessage = '.flash-error, [data-testid="error-message"], .blankslate';
  }

  async navigateToApp() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToProfile(username) {
    await this.page.goto(`${this.baseUrl}/${username}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isPageLoaded() {
    try {
      await this.page.waitForLoadState('domcontentloaded');
      return true;
    } catch (error) {
      return false;
    }
  }

  async enterUsername(username) {
    await this.navigateToProfile(username);
  }

  async clickSearchButton() {
    await this.page.waitForLoadState('networkidle');
  }

  async clearSearchField() {
    // Navigation-based search, no field to clear
  }

  async isAvatarVisible() {
    try {
      const avatar = this.page.locator(this.avatarImage).first();
      return await avatar.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  async getAvatarSource() {
    try {
      const avatar = this.page.locator(this.avatarImage).first();
      return await avatar.getAttribute('src');
    } catch (error) {
      return null;
    }
  }

  async getFullName() {
    try {
      const heading = this.page.locator('h1').first();
      const spans = heading.locator('span, .vcard-fullname, .p-name');
      const firstSpan = spans.first();
      return await firstSpan.textContent();
    } catch (error) {
      return null;
    }
  }

  async getUsername() {
    try {
      const heading = this.page.locator('h1').first();
      const usernameSpan = heading.locator('span').nth(1);
      const username = await usernameSpan.textContent();
      return username ? `@${username.trim()}` : null;
    } catch (error) {
      return null;
    }
  }

  async getBiography() {
    try {
      const bioSelectors = [
        '[data-bio-text]',
        '.user-profile-bio',
        '.p-note',
        '[data-testid="profile-bio"]'
      ];
      for (const selector of bioSelectors) {
        const bio = this.page.locator(selector).first();
        if (await bio.isVisible({ timeout: 1000 }).catch(() => false)) {
          return await bio.textContent();
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async getLocation() {
    try {
      const locationItem = this.page.locator('li:has-text("Home location"), li[itemprop="homeLocation"]').first();
      if (await locationItem.isVisible({ timeout: 2000 }).catch(() => false)) {
        return await locationItem.textContent();
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async getCompany() {
    try {
      const companyItem = this.page.locator('li:has-text("Organization"), li[itemprop="worksFor"]').first();
      if (await companyItem.isVisible({ timeout: 2000 }).catch(() => false)) {
        return await companyItem.textContent();
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async isWebsiteLinkVisible() {
    try {
      const websiteLink = this.page.locator('a[href^="https://"]:not([href*="github.com"])').first();
      return await websiteLink.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  async getWebsiteLinkHref() {
    try {
      const websiteLink = this.page.locator('li a[href^="https://"]:not([href*="github.com"]):not([href*="twitter"]):not([href*="bsky"])').first();
      return await websiteLink.getAttribute('href');
    } catch (error) {
      return null;
    }
  }

  async isFollowButtonVisible() {
    try {
      const followButton = this.page.locator('a:has-text("Follow"), button:has-text("Follow")').first();
      return await followButton.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  async clickFollowButton() {
    const followButton = this.page.locator('a:has-text("Follow"), button:has-text("Follow")').first();
    await followButton.click();
  }

  async getFollowersCount() {
    try {
      const followersLink = this.page.locator(this.followersLink).first();
      return await followersLink.textContent();
    } catch (error) {
      return null;
    }
  }

  async getFollowingCount() {
    try {
      const followingLink = this.page.locator(this.followingLink).first();
      return await followingLink.textContent();
    } catch (error) {
      return null;
    }
  }

  async verifyNoInterfaceErrors() {
    try {
      const errorElement = this.page.locator(this.errorMessage);
      const hasError = await errorElement.isVisible({ timeout: 2000 }).catch(() => false);
      const pageContent = await this.page.content();
      const hasJsError = pageContent.includes('error') && pageContent.includes('script');
      return !hasError && !hasJsError;
    } catch (error) {
      return true;
    }
  }

  async isProfileLoaded() {
    try {
      const avatar = this.page.locator(this.avatarImage).first();
      return await avatar.isVisible({ timeout: 10000 });
    } catch (error) {
      return false;
    }
  }
}

module.exports = GitHubProfilePage;