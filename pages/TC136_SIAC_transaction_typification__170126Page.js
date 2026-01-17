class SiacUnicoPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.SIAC_BASE_URL || 'https://siac-unico.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainScreenContainer = '[data-testid="main-screen-container"]';
    
    // Navigation locators
    this.lineSearchMenu = '[data-testid="menu-line-search"]';
    this.packageConfigMenu = '[data-testid="menu-package-configuration"]';
    this.gmPlatformMenu = '[data-testid="menu-gm-platform"]';
    this.typificationQueryMenu = '[data-testid="menu-typification-query"]';
    
    // Line search locators
    this.lineSearchInput = '[data-testid="line-search-input"]';
    this.lineSearchButton = '[data-testid="line-search-button"]';
    this.soldPlanLineResult = '[data-testid="line-result-sold-plan"]';
    this.lineNumberCell = '[data-testid="line-number-cell"]';
    
    // Package configuration locators
    this.packageListContainer = '[data-testid="package-list-container"]';
    this.b2b2c12gbPackageRow = '[data-testid="package-row-b2b2c-12gb"]';
    this.packageCodeCell = '[data-testid="package-code-cell"]';
    
    // GM Platform purchase locators
    this.lineSelectionInput = '[data-testid="gm-line-selection-input"]';
    this.packageSelectionDropdown = '[data-testid="gm-package-selection"]';
    this.confirmPurchaseButton = '[data-testid="gm-confirm-purchase-button"]';
    this.transactionSuccessMessage = '[data-testid="transaction-success-message"]';
    
    // Typification query locators
    this.typificationSearchInput = '[data-testid="typification-search-input"]';
    this.typificationSearchButton = '[data-testid="typification-search-button"]';
    this.typificationResultRow = '[data-testid="typification-result-row"]';
    this.registeredPackageCodeCell = '[data-testid="registered-package-code"]';
    this.registeredLineNumberCell = '[data-testid="registered-line-number"]';
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.mainScreenContainer);
  }

  async isMainScreenVisible() {
    return await this.page.isVisible(this.mainScreenContainer);
  }

  async navigateToLineSearch() {
    await this.page.click(this.lineSearchMenu);
    await this.page.waitForSelector(this.lineSearchInput);
  }

  async identifyLineWithSoldPlan() {
    await this.page.click(this.soldPlanLineResult);
    return await this.page.textContent(this.lineNumberCell);
  }

  async navigateToPackageConfiguration() {
    await this.page.click(this.packageConfigMenu);
    await this.page.waitForSelector(this.packageListContainer);
  }

  async getB2B2C12GBPackageCode() {
    await this.page.click(this.b2b2c12gbPackageRow);
    return await this.page.textContent(this.packageCodeCell);
  }

  async navigateToGMPlatform() {
    await this.page.click(this.gmPlatformMenu);
    await this.page.waitForSelector(this.lineSelectionInput);
  }

  async selectLineForPurchase(lineNumber) {
    await this.page.fill(this.lineSelectionInput, lineNumber);
  }

  async selectPackage(packageCode) {
    await this.page.click(this.packageSelectionDropdown);
    await this.page.click(`[data-testid="package-option-${packageCode}"]`);
  }

  async confirmPurchase() {
    await this.page.click(this.confirmPurchaseButton);
    await this.page.waitForSelector(this.transactionSuccessMessage);
  }

  async isTransactionSuccessMessageVisible() {
    return await this.page.isVisible(this.transactionSuccessMessage);
  }

  async navigateToTypificationQuery() {
    await this.page.click(this.typificationQueryMenu);
    await this.page.waitForSelector(this.typificationSearchInput);
  }

  async searchTransactionByLine(lineNumber) {
    await this.page.fill(this.typificationSearchInput, lineNumber);
    await this.page.click(this.typificationSearchButton);
    await this.page.waitForSelector(this.typificationResultRow);
  }

  async getRegisteredPackageCode() {
    return await this.page.textContent(this.registeredPackageCodeCell);
  }

  async getRegisteredLineNumber() {
    return await this.page.textContent(this.registeredLineNumberCell);
  }
}

module.exports = SiacUnicoPage;