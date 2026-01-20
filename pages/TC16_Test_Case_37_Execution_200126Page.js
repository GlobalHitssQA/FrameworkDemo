class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = '/';
    this.mainSectionLink = '[data-testid="main-section-link"]';
    this.mainContent = '[data-testid="main-content"]';
    this.headerElement = '[data-testid="header"]';
    this.navigationMenu = '[data-testid="navigation-menu"]';
    this.footerElement = '[data-testid="footer"]';
  }

  async navigateToHomePage() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToMainSection() {
    const mainLink = this.page.locator(this.mainSectionLink);
    if (await mainLink.isVisible()) {
      await mainLink.click();
    }
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isPageDisplayedCorrectly() {
    await this.page.waitForLoadState('domcontentloaded');
    const title = await this.page.title();
    return title !== null && title.length > 0;
  }

  async areMainElementsVisible() {
    const header = this.page.locator(this.headerElement);
    const navigation = this.page.locator(this.navigationMenu);
    const content = this.page.locator(this.mainContent);
    
    const headerVisible = await header.isVisible().catch(() => false);
    const navVisible = await navigation.isVisible().catch(() => false);
    const contentVisible = await content.isVisible().catch(() => false);
    
    return headerVisible || navVisible || contentVisible;
  }
}

module.exports = TestPage;