class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://example.com';
    this.actionButton = '[data-testid="action-button"]';
    this.resultContainer = '[data-testid="result-container"]';
    this.submitButton = '#submit-btn';
    this.mainContent = '[data-testid="main-content"]';
  }

  async navigateToApplication() {
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

  async getMainContentText() {
    return await this.page.textContent(this.mainContent);
  }

  async fillInput(selector, value) {
    await this.page.fill(selector, value);
  }
}

module.exports = TestPage;