class TestPage {
  constructor(page) {
    this.page = page;
    this.mainContent = page.locator('[data-testid="main-content"]');
    this.header = page.locator('[data-testid="header"]');
    this.container = page.locator('#app-container');
  }

  async navigateToHomePage() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForMainContent() {
    await this.mainContent.waitFor({ state: 'visible', timeout: 10000 });
  }

  async isMainContentVisible() {
    return await this.mainContent.isVisible();
  }

  async getHeaderText() {
    return await this.header.textContent();
  }

  async clickElement(locator) {
    await locator.click();
  }

  async fillInput(locator, value) {
    await locator.fill(value);
  }
}

module.exports = TestPage;