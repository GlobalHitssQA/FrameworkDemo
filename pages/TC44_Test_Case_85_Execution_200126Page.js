class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://example.com';
    
    // Locators
    this.mainContainer = '[data-testid="main-container"]';
    this.actionButton = '[data-testid="action-button"]';
    this.resultElement = '[data-testid="result-element"]';
    this.submitButton = '#submit-btn';
    this.inputField = '#input-field';
  }

  async navigateToHomePage() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async performMainAction() {
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

  async isMainContainerVisible() {
    return await this.page.isVisible(this.mainContainer);
  }
}

module.exports = TestPage;