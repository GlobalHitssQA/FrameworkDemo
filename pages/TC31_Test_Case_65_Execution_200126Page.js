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

  async performRequiredAction() {
    await this.page.click(this.actionButton);
  }

  async isExpectedResultVisible() {
    return await this.page.isVisible(this.resultContainer);
  }

  async clickSubmitButton() {
    await this.page.click(this.submitButton);
  }

  async getMainContentText() {
    return await this.page.textContent(this.mainContent);
  }

  async fillInputField(selector, value) {
    await this.page.fill(selector, value);
  }
}

module.exports = TestPage;