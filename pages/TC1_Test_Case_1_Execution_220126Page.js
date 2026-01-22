class TestPage {
  constructor(page) {
    this.page = page;
    this.mainButton = page.locator('[data-testid="main-action-button"]');
    this.resultContainer = page.locator('[data-testid="result-container"]');
    this.inputField = page.locator('[data-testid="input-field"]');
  }

  async navigateToHomePage() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async performMainAction() {
    await this.mainButton.click();
  }

  async fillInput(text) {
    await this.inputField.fill(text);
  }

  async isResultVisible() {
    return await this.resultContainer.isVisible();
  }

  async getResultText() {
    return await this.resultContainer.textContent();
  }
}

module.exports = TestPage;