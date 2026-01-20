class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://example.com';
    this.mainContainer = '[data-testid="main-container"]';
    this.actionButton = '[data-testid="action-button"]';
    this.resultElement = '[data-testid="result-element"]';
    this.submitButton = '#submit-btn';
    this.inputField = '#input-field';
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async performRequiredActions() {
    const actionBtn = this.page.locator(this.actionButton);
    if (await actionBtn.isVisible()) {
      await actionBtn.click();
    }
  }

  async isResultDisplayed() {
    const result = this.page.locator(this.resultElement);
    return await result.isVisible();
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