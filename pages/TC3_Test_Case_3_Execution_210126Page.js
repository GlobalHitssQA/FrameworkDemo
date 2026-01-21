class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://example.com';
    this.actionButton = '[data-testid="action-button"]';
    this.resultContainer = '[data-testid="result-container"]';
    this.submitButton = '#submit-btn';
    this.mainContent = '[data-testid="main-content"]';
  }

  async navigateToHomePage() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async performAction() {
    await this.page.click(this.actionButton);
  }

  async isResultVisible() {
    return await this.page.isVisible(this.resultContainer);
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