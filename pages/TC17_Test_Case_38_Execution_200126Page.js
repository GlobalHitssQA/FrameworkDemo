class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://example.com';
    
    // Locators
    this.mainActionButton = '[data-testid="main-action-btn"]';
    this.resultContainer = '[data-testid="result-container"]';
    this.submitButton = '#submit-button';
    this.inputField = '[data-testid="input-field"]';
  }

  async navigateToHomePage() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async performMainAction() {
    await this.page.click(this.mainActionButton);
  }

  async fillInputField(value) {
    await this.page.fill(this.inputField, value);
  }

  async clickSubmit() {
    await this.page.click(this.submitButton);
  }

  async isResultDisplayed() {
    return await this.page.isVisible(this.resultContainer);
  }

  async getResultText() {
    return await this.page.textContent(this.resultContainer);
  }
};

module.exports = TestPage;