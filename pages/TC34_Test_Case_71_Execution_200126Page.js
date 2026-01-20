class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://example.com';
    this.actionButton = '[data-testid="action-button"]';
    this.resultElement = '[data-testid="result-element"]';
    this.mainContainer = '#main-container';
    this.submitButton = '[data-testid="submit-button"]';
  }

  async navigateToPage() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async performAction() {
    await this.page.click(this.actionButton);
  }

  async isResultVisible() {
    return await this.page.isVisible(this.resultElement);
  }

  async clickSubmit() {
    await this.page.click(this.submitButton);
  }

  async fillInput(selector, value) {
    await this.page.fill(selector, value);
  }

  async getTextContent(selector) {
    return await this.page.textContent(selector);
  }
}

module.exports = TestPage;