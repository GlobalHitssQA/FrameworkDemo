class SiacPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = '[data-testid="siac-username-input"]';
    this.passwordInput = '[data-testid="siac-password-input"]';
    this.loginButton = '[data-testid="siac-login-button"]';
    this.mainScreen = '[data-testid="siac-main-screen"]';
    this.searchLineInput = '[data-testid="siac-search-line-input"]';
    this.searchButton = '[data-testid="siac-search-button"]';
    this.activePackageIndicator = '[data-testid="package-trial-6gb-active"]';
    this.gmPlatformLink = '[data-testid="gm-platform-link"]';
    this.trial6GBPackageRow = '[data-testid="package-trial-6gb-row"]';
    this.cancelPackageButton = '[data-testid="cancel-package-button"]';
    this.confirmCancelButton = '[data-testid="confirm-cancel-button"]';
    this.cancellationSuccessMessage = '[data-testid="cancellation-success-message"]';
    this.typificationSection = '[data-testid="typification-section"]';
    this.typificationSearchInput = '[data-testid="typification-search-input"]';
    this.typificationSearchButton = '[data-testid="typification-search-button"]';
    this.cancellationRecord = '[data-testid="cancellation-record"]';
    this.typificationDate = '[data-testid="typification-date"]';
    this.typificationTime = '[data-testid="typification-time"]';
    this.typificationUser = '[data-testid="typification-user"]';
    this.typificationPackageCode = '[data-testid="typification-package-code"]';
    this.typificationLine = '[data-testid="typification-line"]';
  }

  async navigateToSiac() {
    await this.page.goto(process.env.SIAC_URL || 'https://siac-unico.example.com');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.SIAC_USERNAME || 'test_user');
    await this.page.fill(this.passwordInput, process.env.SIAC_PASSWORD || 'test_password');
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.mainScreen);
  }

  async isMainScreenVisible() {
    return await this.page.isVisible(this.mainScreen);
  }

  async searchActiveLine() {
    await this.page.fill(this.searchLineInput, process.env.TEST_LINE_NUMBER || '123456789');
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.activePackageIndicator);
  }

  async verifyTrial6GBPackageActive() {
    return await this.page.isVisible(this.activePackageIndicator);
  }

  async navigateToGMPlatform() {
    await this.page.click(this.gmPlatformLink);
    await this.page.waitForLoadState('networkidle');
  }

  async selectTrial6GBPackage() {
    await this.page.click(this.trial6GBPackageRow);
  }

  async cancelPackage() {
    await this.page.click(this.cancelPackageButton);
    await this.page.click(this.confirmCancelButton);
    await this.page.waitForSelector(this.cancellationSuccessMessage);
  }

  async verifyCancellationSuccess() {
    return await this.page.isVisible(this.cancellationSuccessMessage);
  }

  async navigateToTypificationSection() {
    await this.page.click(this.typificationSection);
    await this.page.waitForLoadState('networkidle');
  }

  async searchCancellationRecord() {
    await this.page.fill(this.typificationSearchInput, 'TRIAL 6GB');
    await this.page.click(this.typificationSearchButton);
    await this.page.waitForSelector(this.cancellationRecord);
  }

  async isCancellationRecordVisible() {
    return await this.page.isVisible(this.cancellationRecord);
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

  async isTypificationPackageCodeVisible() {
    return await this.page.isVisible(this.typificationPackageCode);
  }

  async isTypificationLineVisible() {
    return await this.page.isVisible(this.typificationLine);
  }
}

module.exports = SiacPage;