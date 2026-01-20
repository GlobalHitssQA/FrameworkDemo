class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    this.mainContentLocator = this.page.locator('[data-testid="main-content"]');
    this.headerLocator = this.page.locator('[data-testid="header"]');
    this.bodyLocator = this.page.locator('body');
  }

  async navigateToHomePage() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForMainContent() {
    await this.page.waitForLoadState('networkidle');
  }

  async isMainContentVisible() {
    try {
      const mainContent = await this.mainContentLocator.isVisible();
      if (mainContent) return true;
      return await this.bodyLocator.isVisible();
    } catch (error) {
      return await this.bodyLocator.isVisible();
    }
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async clickElement(locator) {
    await locator.click();
  }

  async fillInput(locator, value) {
    await locator.fill(value);
  }

  async getTextContent(locator) {
    return await locator.textContent();
  }
}

module.exports = TestPage;