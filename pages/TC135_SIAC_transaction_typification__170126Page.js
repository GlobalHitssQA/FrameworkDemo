class SiacTypificationPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="siac-username-input"]';
    this.passwordInput = '[data-testid="siac-password-input"]';
    this.loginButton = '[data-testid="siac-login-button"]';
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    
    // Navigation locators
    this.gmPlatformLink = '[data-testid="gm-platform-link"]';
    this.typificationMenuLink = '[data-testid="typification-menu-link"]';
    
    // Package purchase locators
    this.packageSelector = '[data-testid="package-selector"]';
    this.packageOptionTrial6GB = '[data-testid="package-option-trial-6gb"]';
    this.confirmPurchaseButton = '[data-testid="confirm-purchase-button"]';
    this.purchaseSuccessMessage = '[data-testid="purchase-success-message"]';
    
    // Typification query locators
    this.searchTransactionInput = '[data-testid="search-transaction-input"]';
    this.searchButton = '[data-testid="search-transaction-button"]';
    this.transactionRecordRow = '[data-testid="transaction-record-row"]';
    this.typificationDateCell = '[data-testid="typification-date-cell"]';
    this.typificationTimeCell = '[data-testid="typification-time-cell"]';
    this.typificationUserCell = '[data-testid="typification-user-cell"]';
  }

  async loginToSiac(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.userProfileIndicator);
    return username;
  }

  async isUserAuthenticated() {
    return await this.page.isVisible(this.userProfileIndicator);
  }

  async navigateToGMPlatform() {
    await this.page.click(this.gmPlatformLink);
    await this.page.waitForLoadState('networkidle');
  }

  async selectPackage(packageName) {
    await this.page.click(this.packageSelector);
    if (packageName === 'TRIAL 6GB') {
      await this.page.click(this.packageOptionTrial6GB);
    }
  }

  async confirmPackagePurchase() {
    await this.page.click(this.confirmPurchaseButton);
    await this.page.waitForSelector(this.purchaseSuccessMessage);
  }

  async isPurchaseSuccessful() {
    return await this.page.isVisible(this.purchaseSuccessMessage);
  }

  async navigateToTypificationSection() {
    await this.page.click(this.typificationMenuLink);
    await this.page.waitForLoadState('networkidle');
  }

  async searchRecentTransaction() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.transactionRecordRow);
  }

  async isTransactionRecordVisible() {
    return await this.page.isVisible(this.transactionRecordRow);
  }

  async getTypificationDate() {
    return await this.page.textContent(this.typificationDateCell);
  }

  async getTypificationTime() {
    return await this.page.textContent(this.typificationTimeCell);
  }

  async getTypificationUser() {
    return await this.page.textContent(this.typificationUserCell);
  }

  calculateTimeDifferenceInMinutes(startTime, endTimeString) {
    const [hours, minutes] = endTimeString.split(':').map(Number);
    const endTime = new Date(startTime);
    endTime.setHours(hours, minutes, 0, 0);
    const diffMs = Math.abs(endTime - startTime);
    return Math.floor(diffMs / 60000);
  }
};

module.exports = SiacTypificationPage;