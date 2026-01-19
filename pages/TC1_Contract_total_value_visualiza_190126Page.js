class FundsOperationPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    // Locators
    this._usernameInput = '[data-testid="login-username"]';
    this._passwordInput = '[data-testid="login-password"]';
    this._loginButton = '[data-testid="login-submit-button"]';
    this._mainScreen = '[data-testid="main-screen-container"]';
    this._contractSelector = '[data-testid="contract-selector"]';
    this._contractSelectorDropdown = '[data-testid="contract-selector-dropdown"]';
    this._individualCustomerContractOption = '[data-testid="contract-option-persona-fisica"]';
    this._totalValueComponent = '[data-testid="total-contract-value"]';
    this._totalValueAmount = '[data-testid="total-contract-value-amount"]';
    this._fundsOperationScreen = '[data-testid="funds-operation-screen"]';
    this._searchButton = '[data-testid="search-button-lupa"]';
    this._loadingIndicator = '[data-testid="loading-indicator"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithPatrimonialBankingRole() {
    const username = process.env.PATRIMONIAL_BANKING_USER || 'test_user_patrimonial';
    const password = process.env.PATRIMONIAL_BANKING_PASSWORD || 'test_password';
    
    await this.page.fill(this._usernameInput, username);
    await this.page.fill(this._passwordInput, password);
    await this.page.click(this._loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenVisible() {
    await this.page.waitForSelector(this._mainScreen, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this._mainScreen);
  }

  async openContractSelector() {
    await this.page.click(this._contractSelector);
    await this.page.waitForSelector(this._contractSelectorDropdown, { state: 'visible' });
  }

  async selectIndividualCustomerContract() {
    await this.page.click(this._individualCustomerContractOption);
  }

  async waitForContractToLoad() {
    await this.page.waitForSelector(this._loadingIndicator, { state: 'hidden', timeout: 15000 }).catch(() => {});
    await this.page.waitForSelector(this._totalValueComponent, { state: 'visible', timeout: 10000 });
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this._totalValueComponent);
  }

  async getTotalContractValueText() {
    await this.page.waitForSelector(this._totalValueAmount, { state: 'visible' });
    const text = await this.page.textContent(this._totalValueAmount);
    return text.trim();
  }

  async isTotalValueComponentInViewport() {
    const element = await this.page.$(this._totalValueComponent);
    if (!element) return false;
    
    const boundingBox = await element.boundingBox();
    if (!boundingBox) return false;
    
    const viewportSize = await this.page.viewportSize();
    return (
      boundingBox.x >= 0 &&
      boundingBox.y >= 0 &&
      boundingBox.x + boundingBox.width <= viewportSize.width &&
      boundingBox.y + boundingBox.height <= viewportSize.height
    );
  }
}

module.exports = FundsOperationPage;