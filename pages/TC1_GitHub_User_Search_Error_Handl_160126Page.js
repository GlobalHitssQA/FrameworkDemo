class GitHubSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://github.com/search';
    
    // Locators
    this.searchInput = this.page.getByRole('textbox', { name: 'Search GitHub' });
    this.usersFilterLink = this.page.getByTestId('nav-item-users');
    this.noUsersFoundHeading = this.page.getByRole('heading', { name: 'Your search did not match any users' });
    this.resultsCountHeading = this.page.getByRole('heading', { name: /\d+ results?/ });
    this.profileAvatar = this.page.locator('[data-testid="user-avatar"]');
    this.profileName = this.page.locator('[data-testid="profile-name"]');
    this.profileBio = this.page.locator('[data-testid="profile-bio"]');
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.searchInput.waitFor({ state: 'visible' });
  }

  async enterSearchQuery(query) {
    await this.searchInput.fill(query);
  }

  async submitSearch() {
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async clickUsersFilter() {
    await this.usersFilterLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isNoUsersFoundMessageVisible() {
    try {
      await this.noUsersFoundHeading.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getResultsCountText() {
    const heading = this.page.getByRole('heading', { level: 2 }).filter({ hasText: 'results' });
    return await heading.textContent();
  }

  async isProfileDataVisible() {
    const avatarVisible = await this.profileAvatar.isVisible().catch(() => false);
    const nameVisible = await this.profileName.isVisible().catch(() => false);
    const bioVisible = await this.profileBio.isVisible().catch(() => false);
    return avatarVisible || nameVisible || bioVisible;
  }
}

module.exports = GitHubSearchPage;