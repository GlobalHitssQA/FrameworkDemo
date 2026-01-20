class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://example.com';
    this.actionButton = '[data-testid="action-button"]';
    this.resultContainer = '[data-testid="result-container"]';
    this.submitButton = '#submit-btn';
    this.inputField = '[data-testid="input-field"]';
  }

  async navigateToHomePage() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async performAction() {
    await this.page.click(this.actionButton);
  }

  async fillInput(text) {
    await this.page.fill(this.inputField, text);
  }

  async clickSubmit() {
    await this.page.click(this.submitButton);
  }

  async isResultVisible() {
    return await this.page.isVisible(this.resultContainer);
  }

  async getResultText() {
    return await this.page.textContent(this.resultContainer);
  }
};

module.exports = TestPage;