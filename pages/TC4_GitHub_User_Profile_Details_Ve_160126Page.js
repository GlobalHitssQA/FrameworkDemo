class GitHubProfilePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';
    
    // Locators
    this.searchInput = '[data-testid="qbsearch-input"], input[name="q"], .header-search-input';
    this.profileSection = '[itemtype="http://schema.org/Person"], .h-card, [data-hpc]';
    this.avatarImage = 'img.avatar-user, [data-testid="user-avatar"], .avatar';
    this.fullNameElement = '[itemprop="name"], .p-name, .vcard-fullname';
    this.usernameElement = '[itemprop="additionalName"], .p-nickname, .vcard-username';
    this.biographyElement = '[data-bio-text], .p-note, .user-profile-bio';
    this.locationElement = '[itemprop="homeLocation"], .p-label, [data-testid="user-profile-location"]';
    this.companyElement = '[itemprop="worksFor"], .p-org, [data-testid="user-profile-company"]';
    this.webLinkElement = '[itemprop="url"], .u-url, [data-testid="user-profile-link"] a';
    this.followButton = '[data-testid="follow-button"], input[value="Follow"], .js-follow-btn, form[action*="/follow"] button';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async searchUser(username) {
    await this.page.goto(`${this.baseUrl}/${username}`);
    await this.page.waitForLoadState('networkidle');
  }

  async isProfileSectionVisible() {
    const section = this.page.locator(this.profileSection).first();
    return await section.isVisible();
  }

  async isAvatarVisible() {
    const avatar = this.page.locator(this.avatarImage).first();
    return await avatar.isVisible();
  }

  async getFullName() {
    const element = this.page.locator(this.fullNameElement).first();
    if (await element.isVisible()) {
      return await element.textContent();
    }
    return null;
  }

  async getUsername() {
    const element = this.page.locator(this.usernameElement).first();
    if (await element.isVisible()) {
      const text = await element.textContent();
      return text.includes('@') ? text : `@${text}`;
    }
    return null;
  }

  async getBiography() {
    const element = this.page.locator(this.biographyElement).first();
    if (await element.isVisible()) {
      return await element.textContent();
    }
    return null;
  }

  async getLocation() {
    const element = this.page.locator(this.locationElement).first();
    if (await element.isVisible()) {
      return await element.textContent();
    }
    return null;
  }

  async getCompany() {
    const element = this.page.locator(this.companyElement).first();
    if (await element.isVisible()) {
      return await element.textContent();
    }
    return null;
  }

  async getWebLink() {
    const element = this.page.locator(this.webLinkElement).first();
    if (await element.isVisible()) {
      return await element.getAttribute('href') || await element.textContent();
    }
    return null;
  }

  async isFollowButtonVisible() {
    const button = this.page.locator(this.followButton).first();
    return await button.isVisible();
  }

  async hasEmptyOrNotAvailableFields() {
    const biography = await this.getBiography();
    const location = await this.getLocation();
    const company = await this.getCompany();
    const webLink = await this.getWebLink();
    
    const fields = [biography, location, company, webLink];
    return fields.some(field => !field || field.trim() === '' || field.toLowerCase().includes('not available') || field.toLowerCase().includes('no disponible'));
  }
}

module.exports = GitHubProfilePage;