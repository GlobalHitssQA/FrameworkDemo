class TestPage {
  constructor(page) {
    this.page = page;
    this.actionButton = page.locator('[data-testid="action-button"]');
    this.resultElement = page.locator('[data-testid="result-element"]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async performAction() {
    await this.actionButton.click();
  }

  async isResultVisible() {
    return await this.resultElement.isVisible();
  }
}

module.exports = TestPage;