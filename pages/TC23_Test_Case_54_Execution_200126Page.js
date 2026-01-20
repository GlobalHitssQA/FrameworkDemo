class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://example.com';
    
    // Locators
    this.mainActionButton = '[data-testid="main-action-button"]';
    this.resultContainer = '[data-testid="result-container"]';
    this.submitButton = '#submit-btn';
    this.inputField = '[data-testid="input-field"]';
  }

  async navigateToHomePage() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async performMainAction() {
    await this.page.click(this.mainActionButton);
  }

  async isResultDisplayed() {
    return await this.page.isVisible(this.resultContainer);
  }

  async fillInputField(value) {
    await this.page.fill(this.inputField, value);
  }

  async clickSubmitButton() {
    await this.page.click(this.submitButton);
  }

  async getResultText() {
    return await this.page.textContent(this.resultContainer);
  }
}

module.exports = TestPage;