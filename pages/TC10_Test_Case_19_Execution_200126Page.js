class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://example.com';
    this.mainContentLocator = '[data-testid="main-content"]';
    this.headerLocator = '[data-testid="header"]';
    this.bodyLocator = 'body';
  }

  async navigateToHomePage() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForMainContent() {
    await this.page.waitForSelector(this.bodyLocator, { state: 'visible' });
  }

  async isMainContentVisible() {
    const body = this.page.locator(this.bodyLocator);
    return await body.isVisible();
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async clickElement(locator) {
    await this.page.locator(locator).click();
  }

  async fillInput(locator, value) {
    await this.page.locator(locator).fill(value);
  }

  async getTextContent(locator) {
    return await this.page.locator(locator).textContent();
  }

  async isElementVisible(locator) {
    return await this.page.locator(locator).isVisible();
  }
}

module.exports = TestPage;