class SiacPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.SIAC_URL || 'https://siac-unico.example.com';
    this.gmPlatformUrl = process.env.GM_PLATFORM_URL || 'https://gm-platform.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="siac-username-input"]';
    this.passwordInput = '[data-testid="siac-password-input"]';
    this.loginButton = '[data-testid="siac-login-button"]';
    this.mainScreen = '[data-testid="siac-main-screen"]';
    
    // Navigation locators
    this.packagesMenuOption = '[data-testid="menu-packages"]';
    this.typificationMenuOption = '[data-testid="menu-typification"]';
    this.gmPlatformLink = '[data-testid="gm-platform-link"]';
    
    // Search locators
    this.lineSearchInput = '[data-testid="line-search-input"]';
    this.planFilterDropdown = '[data-testid="plan-filter-dropdown"]';
    this.soldPlanOption = '[data-testid="plan-option-sold"]';
    this.searchButton = '[data-testid="search-button"]';
    
    // Package locators
    this.b2b2cPackageRow = '[data-testid="package-row-b2b2c"]';
    this.packageStatusBadge = '[data-testid="package-status-badge"]';
    this.cancelPackageButton = '[data-testid="cancel-package-button"]';
    this.confirmCancellationButton = '[data-testid="confirm-cancellation-button"]';
    this.cancellationSuccessMessage = '[data-testid="cancellation-success-message"]';
    
    // Typification locators
    this.typificationSearchInput = '[data-testid="typification-search-input"]';
    this.typificationSearchButton = '[data-testid="typification-search-button"]';
    this.cancellationRecordRow = '[data-testid="cancellation-record-row"]';
    this.typificationDateField = '[data-testid="typification-date"]';
    this.typificationTimeField = '[data-testid="typification-time"]';
    this.typificationUserField = '[data-testid="typification-user"]';
    this.typificationPackageCodeField = '[data-testid="typification-package-code"]';
    this.typificationCapacityField = '[data-testid="typification-capacity"]';
    this.typificationValidityField = '[data-testid="typification-validity"]';
    this.typificationLineField = '[data-testid="typification-associated-line"]';
  }

  async navigateToSiac() {
    await this.page.goto(this.baseUrl);
  }

  async login() {
    const username = process.env.SIAC_USERNAME || 'test_user';
    const password = process.env.SIAC_PASSWORD || 'test_password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.mainScreen);
  }

  async isMainScreenVisible() {
    return await this.page.isVisible(this.mainScreen);
  }

  async navigateToPackageSection() {
    await this.page.click(this.packagesMenuOption);
    await this.page.waitForSelector(this.lineSearchInput);
  }

  async searchSoldPlanLine() {
    await this.page.click(this.planFilterDropdown);
    await this.page.click(this.soldPlanOption);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.b2b2cPackageRow);
  }

  async verifyActiveB2B2CPackage() {
    const packageRow = await this.page.locator(this.b2b2cPackageRow).first();
    const statusBadge = await packageRow.locator(this.packageStatusBadge);
    const statusText = await statusBadge.textContent();
    return statusText.toLowerCase().includes('activo') || statusText.toLowerCase().includes('active');
  }

  async navigateToGMPlatform() {
    await this.page.goto(this.gmPlatformUrl);
  }

  async selectB2B2CPackageForCancellation() {
    await this.page.click(this.b2b2cPackageRow);
    await this.page.click(this.cancelPackageButton);
  }

  async confirmPackageCancellation() {
    await this.page.click(this.confirmCancellationButton);
    await this.page.waitForSelector(this.cancellationSuccessMessage);
  }

  async verifyCancellationSuccess() {
    return await this.page.isVisible(this.cancellationSuccessMessage);
  }

  async navigateToTypificationSection() {
    await this.page.goto(this.baseUrl);
    await this.page.click(this.typificationMenuOption);
    await this.page.waitForSelector(this.typificationSearchInput);
  }

  async searchCancellationRecord() {
    await this.page.fill(this.typificationSearchInput, 'B2B2C');
    await this.page.click(this.typificationSearchButton);
    await this.page.waitForSelector(this.cancellationRecordRow);
  }

  async isCancellationRecordVisible() {
    return await this.page.isVisible(this.cancellationRecordRow);
  }

  async getTypificationDetails() {
    return {
      date: await this.page.textContent(this.typificationDateField),
      time: await this.page.textContent(this.typificationTimeField),
      user: await this.page.textContent(this.typificationUserField),
      packageCode: await this.page.textContent(this.typificationPackageCodeField),
      capacity: await this.page.textContent(this.typificationCapacityField),
      validity: await this.page.textContent(this.typificationValidityField),
      associatedLine: await this.page.textContent(this.typificationLineField)
    };
  }
};

module.exports = SiacPage;