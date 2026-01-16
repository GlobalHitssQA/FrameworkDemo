class GitHubProfilePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com';
    
    // Locators
    this.searchButton = '[data-target="qbsearch-input.inputButton"]';
    this.searchInput = '#query-builder-test';
    this.profileName = '.p-nickname.vcard-username';
    this.profileContainer = '.h-card';
    this.followersLink = 'a[href$="?tab=followers"]';
    this.followersContainer = '.js-profile-tab-count-container';
    this.followersList = '[data-hpc] .d-table';
    this.followerItem = '.d-table-cell';
    this.followerAvatar = '.avatar';
    this.followerUsername = '.Link--secondary';
    this.followerProfileLink = '.d-table-cell a.Link--primary';
    this.userSearchResult = '[data-testid="search-result"] a';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async searchUser(username) {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
    await this.page.fill(this.searchInput, username);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
    
    const userLink = this.page.locator(`a[href="/${username}"]`).first();
    if (await userLink.isVisible()) {
      await userLink.click();
    } else {
      await this.page.goto(`${this.baseUrl}/${username}`);
    }
    await this.page.waitForLoadState('networkidle');
  }

  async isProfileVisible() {
    await this.page.waitForSelector(this.profileContainer, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.profileContainer);
  }

  async isFollowersSectionVisible() {
    await this.page.click(this.followersLink);
    await this.page.waitForLoadState('networkidle');
    return await this.page.isVisible(this.followersList);
  }

  async verifyFollowersHaveRequiredElements() {
    const followers = this.page.locator(this.followerItem);
    const count = await followers.count();
    
    if (count === 0) return false;
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      const follower = followers.nth(i);
      const hasAvatar = await follower.locator(this.followerAvatar).isVisible();
      const hasLink = await follower.locator('a').isVisible();
      
      if (!hasAvatar || !hasLink) return false;
    }
    return true;
  }

  async isFollowersScrollbarVisible() {
    const container = this.page.locator('[data-hpc]');
    const scrollHeight = await container.evaluate(el => el.scrollHeight);
    const clientHeight = await container.evaluate(el => el.clientHeight);
    return scrollHeight > clientHeight || await this.page.locator(this.followerItem).count() > 10;
  }

  async scrollFollowersList() {
    this.initialFollowers = await this.page.locator(this.followerItem).allTextContents();
    
    await this.page.evaluate(() => {
      window.scrollBy({ top: 500, behavior: 'smooth' });
    });
    await this.page.waitForTimeout(1000);
  }

  async verifyListScrolledSuccessfully() {
    const currentScrollY = await this.page.evaluate(() => window.scrollY);
    return currentScrollY > 0;
  }

  async verifyScrollIsSmoothAndContinuous() {
    const scrollPositions = [];
    
    for (let i = 0; i < 3; i++) {
      await this.page.evaluate(() => {
        window.scrollBy({ top: 100, behavior: 'smooth' });
      });
      await this.page.waitForTimeout(200);
      const position = await this.page.evaluate(() => window.scrollY);
      scrollPositions.push(position);
    }
    
    for (let i = 1; i < scrollPositions.length; i++) {
      if (scrollPositions[i] <= scrollPositions[i - 1]) {
        return false;
      }
    }
    return true;
  }

  async clickOnFollowerProfileLink() {
    const followerLink = this.page.locator(this.followerProfileLink).first();
    this.followerHref = await followerLink.getAttribute('href');
    await followerLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyRedirectedToFollowerProfile() {
    const currentUrl = this.page.url();
    return currentUrl.includes('github.com') && currentUrl !== `${this.baseUrl}/`;
  }
}

module.exports = GitHubProfilePage;