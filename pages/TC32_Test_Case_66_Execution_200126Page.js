class TestPage {
  constructor(page) {
    this.page = page;
    this.actionButton = '[data-testid="action-button"]';
    this.resultElement = '[data-testid="result-element"]';
    this.submitButton = '#submit-btn';
    this.inputField = '[data-testid="input-field"]';
  }

  async navigateToApplication() {
    await this.page.goto('/');
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
    return await this.page.isVisible(this.resultElement);
  }

  async getResultText() {
    return await this.page.textContent(this.resultElement);
  }
}

module.exports = TestPage;