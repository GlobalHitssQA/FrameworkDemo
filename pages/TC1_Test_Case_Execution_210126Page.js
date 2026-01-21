class TestPage {
  constructor(page) {
    this.page = page;
    this.actionButton = '[data-testid="action-button"]';
    this.resultContainer = '[data-testid="result-container"]';
  }

  async navigateToApplication() {
    await this.page.goto('/');
  }

  async performAction() {
    await this.page.click(this.actionButton);
  }

  async isResultVisible() {
    return await this.page.isVisible(this.resultContainer);
  }
}

module.exports = TestPage;