class TestPage {
  constructor(page) {
    this.page = page;
    this.mainContainer = '[data-testid="main-container"]';
    this.actionButton = '[data-testid="action-button"]';
    this.resultElement = '[data-testid="result-element"]';
    this.inputField = '[data-testid="input-field"]';
    this.submitButton = '[data-testid="submit-button"]';
  }

  async navigateToPage() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async performMainInteraction() {
    await this.page.click(this.actionButton);
  }

  async fillInputField(value) {
    await this.page.fill(this.inputField, value);
  }

  async clickSubmitButton() {
    await this.page.click(this.submitButton);
  }

  async isResultDisplayed() {
    return await this.page.isVisible(this.resultElement);
  }

  async getResultText() {
    return await this.page.textContent(this.resultElement);
  }
}

module.exports = TestPage;