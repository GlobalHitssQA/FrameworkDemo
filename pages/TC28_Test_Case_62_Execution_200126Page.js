class TestPage {
  constructor(page) {
    this.page = page;
    this.mainContainer = '[data-testid="main-container"]';
    this.actionButton = '[data-testid="action-button"]';
    this.resultElement = '[data-testid="result-element"]';
    this.submitButton = '#submit-btn';
    this.inputField = '#input-field';
  }

  async navigateToApplication() {
    await this.page.goto('/');
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