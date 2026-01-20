class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://example.com';
    this.actionButton = '[data-testid="action-button"]';
    this.resultContainer = '[data-testid="result-container"]';
    this.submitButton = '#submit-btn';
    this.mainContent = '[data-testid="main-content"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async performAction() {
    const button = this.page.locator(this.actionButton);
    if (await button.isVisible()) {
      await button.click();
    }
  }

  async isResultVisible() {
    const result = this.page.locator(this.resultContainer);
    return await result.isVisible();
  }

  async clickSubmit() {
    await this.page.locator(this.submitButton).click();
  }

  async getMainContentText() {
    return await this.page.locator(this.mainContent).textContent();
  }
}

module.exports = TestPage;