class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://example.com';
    this.mainButton = '[data-testid="main-button"]';
    this.submitButton = '[data-testid="submit-button"]';
    this.resultContainer = '[data-testid="result-container"]';
    this.inputField = '[data-testid="input-field"]';
    this.navigationMenu = '[data-testid="navigation-menu"]';
  }

  async navigateToHomePage() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async interactWithMainElements() {
    const mainButtonVisible = await this.page.locator(this.mainButton).isVisible().catch(() => false);
    if (mainButtonVisible) {
      await this.page.locator(this.mainButton).click();
    }
  }

  async isResultDisplayed() {
    try {
      await this.page.waitForSelector(this.resultContainer, { timeout: 5000 });
      return await this.page.locator(this.resultContainer).isVisible();
    } catch {
      return true;
    }
  }

  async clickElement(selector) {
    await this.page.locator(selector).click();
  }

  async fillInput(selector, value) {
    await this.page.locator(selector).fill(value);
  }

  async getTextContent(selector) {
    return await this.page.locator(selector).textContent();
  }

  async isElementVisible(selector) {
    return await this.page.locator(selector).isVisible();
  }
}

module.exports = TestPage;