class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = '/';
    this.mainContainer = '[data-testid="main-container"]';
    this.actionButton = '[data-testid="action-button"]';
    this.resultElement = '[data-testid="result-element"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async performActions() {
    await this.page.click(this.actionButton);
  }

  async verifyResults() {
    return await this.page.isVisible(this.resultElement);
  }
}

module.exports = TestPage;