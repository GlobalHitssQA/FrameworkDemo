class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://example.com';
    this.mainContainer = '[data-testid="main-container"]';
    this.actionButton = '[data-testid="action-button"]';
    this.resultElement = '[data-testid="result-element"]';
    this.submitButton = '#submit-button';
    this.inputField = '#input-field';
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async performRequiredActions() {
    await this.page.click(this.actionButton);
  }

  async isResultDisplayed() {
    return await this.page.isVisible(this.resultElement);
  }

  async fillInputField(value) {
    await this.page.fill(this.inputField, value);
  }

  async clickSubmitButton() {
    await this.page.click(this.submitButton);
  }

  async getResultText() {
    return await this.page.textContent(this.resultElement);
  }
}

module.exports = TestPage;