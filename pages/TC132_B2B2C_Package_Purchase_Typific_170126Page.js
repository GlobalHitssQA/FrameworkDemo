class SiacPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.SIAC_BASE_URL || 'https://siac.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainScreen = '[data-testid="main-dashboard"]';
    
    // Navigation locators
    this.gmPlatformLink = '[data-testid="gm-platform-link"]';
    this.typificationSection = '[data-testid="typification-section"]';
    
    // Line and package selection locators
    this.soldPlanLineSelector = '[data-testid="sold-plan-line-selector"]';
    this.packageDropdown = '[data-testid="package-dropdown"]';
    this.b2b2cPackageOption = '[data-testid="package-option-b2b2c-720gb"]';
    this.validityDropdown = '[data-testid="validity-dropdown"]';
    this.confirmPurchaseButton = '[data-testid="confirm-purchase-button"]';
    this.purchaseSuccessMessage = '[data-testid="purchase-success-message"]';
    
    // Typification locators
    this.searchTransactionButton = '[data-testid="search-transaction-button"]';
    this.transactionRecord = '[data-testid="transaction-record"]';
    this.typificationDate = '[data-testid="typification-date"]';
    this.typificationTime = '[data-testid="typification-time"]';
    this.typificationUser = '[data-testid="typification-user"]';
    this.packageCodeField = '[data-testid="package-code"]';
    this.packageValidityField = '[data-testid="package-validity"]';
    this.associatedLineField = '[data-testid="associated-line-number"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.mainScreen);
  }

  async isMainScreenVisible() {
    return await this.page.isVisible(this.mainScreen);
  }

  async navigateToGMPlatform() {
    await this.page.click(this.gmPlatformLink);
    await this.page.waitForLoadState('networkidle');
  }

  async selectSOLDPlanLine() {
    await this.page.click(this.soldPlanLineSelector);
    await this.page.waitForLoadState('networkidle');
  }

  async selectB2B2CPackage(size) {
    await this.page.click(this.packageDropdown);
    await this.page.click(`[data-testid="package-option-b2b2c-${size.toLowerCase()}"]`);
  }

  async selectPackageValidity(months) {
    await this.page.click(this.validityDropdown);
    await this.page.click(`[data-testid="validity-option-${months}"]`);
  }

  async confirmPurchase() {
    await this.page.click(this.confirmPurchaseButton);
    await this.page.waitForSelector(this.purchaseSuccessMessage);
  }

  async isPurchaseSuccessful() {
    return await this.page.isVisible(this.purchaseSuccessMessage);
  }

  async navigateToTypificationSection() {
    await this.page.click(this.typificationSection);
    await this.page.waitForLoadState('networkidle');
  }

  async searchLatestTransaction() {
    await this.page.click(this.searchTransactionButton);
    await this.page.waitForSelector(this.transactionRecord);
  }

  async isPackageRecordVisible(packageName) {
    const record = await this.page.textContent(this.transactionRecord);
    return record.includes(packageName);
  }

  async isTypificationDateVisible() {
    return await this.page.isVisible(this.typificationDate);
  }

  async isTypificationTimeVisible() {
    return await this.page.isVisible(this.typificationTime);
  }

  async isTypificationUserVisible() {
    return await this.page.isVisible(this.typificationUser);
  }

  async getPackageCode() {
    return await this.page.textContent(this.packageCodeField);
  }

  async getPackageValidity() {
    return await this.page.textContent(this.packageValidityField);
  }

  async getAssociatedLineNumber() {
    return await this.page.textContent(this.associatedLineField);
  }
}

module.exports = SiacPage;