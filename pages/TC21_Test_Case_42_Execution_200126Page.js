class TestPage {
  constructor(page) {
    this.page = page;
    this.actionButton = page.locator('[data-testid="action-button"]');
    this.resultContainer = page.locator('[data-testid="result-container"]');
    this.submitButton = page.locator('[data-testid="submit-button"]');
    this.inputField = page.locator('[data-testid="input-field"]');
  }

  async navigateToApplication() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async performAction() {
    await this.actionButton.click();
  }

  async fillInput(value) {
    await this.inputField.fill(value);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async isResultVisible() {
    return await this.resultContainer.isVisible();
  }

  async getResultText() {
    return await this.resultContainer.textContent();
  }
}

module.exports = TestPage;