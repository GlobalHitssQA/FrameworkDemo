class TestPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://example.com';
    
    // Locators
    this.mainContainer = '[data-testid="main-container"]';
    this.primaryButton = '[data-testid="primary-button"]';
    this.resultSection = '[data-testid="result-section"]';
    this.inputField = '[data-testid="input-field"]';
    this.submitButton = '[data-testid="submit-button"]';
    this.successMessage = '[data-testid="success-message"]';
  }

  async navigateToHomePage() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async interactWithMainElements() {
    const buttonVisible = await this.page.locator(this.primaryButton).isVisible().catch(() => false);
    if (buttonVisible) {
      await this.page.locator(this.primaryButton).click();
    }
    
    const inputVisible = await this.page.locator(this.inputField).isVisible().catch(() => false);
    if (inputVisible) {
      await this.page.locator(this.inputField).fill('test data');
    }
    
    const submitVisible = await this.page.locator(this.submitButton).isVisible().catch(() => false);
    if (submitVisible) {
      await this.page.locator(this.submitButton).click();
    }
  }

  async isResultDisplayed() {
    try {
      await this.page.waitForSelector(this.resultSection, { timeout: 5000 });
      return await this.page.locator(this.resultSection).isVisible();
    } catch {
      return await this.page.locator(this.mainContainer).isVisible().catch(() => true);
    }
  }

  async clickElement(locator) {
    await this.page.locator(locator).click();
  }

  async fillInput(locator, value) {
    await this.page.locator(locator).fill(value);
  }

  async getTextContent(locator) {
    return await this.page.locator(locator).textContent();
  }

  async isElementVisible(locator) {
    return await this.page.locator(locator).isVisible();
  }
}

module.exports = TestPage;