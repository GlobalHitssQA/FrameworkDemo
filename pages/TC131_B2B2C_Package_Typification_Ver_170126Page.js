class SiacPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.SIAC_BASE_URL || 'https://siac-unico.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="siac-username-input"]';
    this.passwordInput = '[data-testid="siac-password-input"]';
    this.loginButton = '[data-testid="siac-login-button"]';
    
    // Main screen locators
    this.mainScreenContainer = '[data-testid="siac-main-screen"]';
    this.userWelcomeMessage = '[data-testid="siac-welcome-message"]';
    
    // Typification search locators
    this.typificationMenuOption = '[data-testid="menu-typification"]';
    this.searchLineInput = '[data-testid="search-line-number"]';
    this.searchButton = '[data-testid="search-typification-button"]';
    
    // Results table locators
    this.resultsTable = '[data-testid="typification-results-table"]';
    this.packageRecordRow = '[data-testid="package-record-row"]';
    this.typificationDateCell = '[data-testid="typification-date"]';
    this.typificationTimeCell = '[data-testid="typification-time"]';
    this.typificationUserCell = '[data-testid="typification-user"]';
    this.typificationPackageCodeCell = '[data-testid="typification-package-code"]';
    this.typificationLineNumberCell = '[data-testid="typification-line-number"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenDisplayed() {
    return await this.page.isVisible(this.mainScreenContainer);
  }

  async openTypificationSearch() {
    await this.page.click(this.typificationMenuOption);
    await this.page.waitForSelector(this.searchLineInput);
  }

  async searchTransactionByLine(lineNumber) {
    await this.page.fill(this.searchLineInput, lineNumber);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.resultsTable);
  }

  async isPackageRecordDisplayed(packageName) {
    const rows = await this.page.$$(this.packageRecordRow);
    for (const row of rows) {
      const text = await row.textContent();
      if (text.includes(packageName)) {
        return true;
      }
    }
    return false;
  }

  async getTypificationDetails() {
    const date = await this.page.textContent(this.typificationDateCell);
    const time = await this.page.textContent(this.typificationTimeCell);
    const user = await this.page.textContent(this.typificationUserCell);
    const packageCode = await this.page.textContent(this.typificationPackageCodeCell);
    const lineNumber = await this.page.textContent(this.typificationLineNumberCell);
    
    return {
      date: date?.trim(),
      time: time?.trim(),
      user: user?.trim(),
      packageCode: packageCode?.trim(),
      lineNumber: lineNumber?.trim()
    };
  }
}

class GmPlatformPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.GM_PLATFORM_URL || 'https://gm-platform.example.com';
    
    // Navigation locators
    this.packagesMenuOption = '[data-testid="gm-packages-menu"]';
    
    // Line selection locators
    this.lineSearchInput = '[data-testid="gm-line-search-input"]';
    this.lineSearchButton = '[data-testid="gm-line-search-button"]';
    this.lineResultRow = '[data-testid="gm-line-result-row"]';
    
    // Package selection locators
    this.packageB2B2C6GBOption = '[data-testid="package-b2b2c-6gb"]';
    this.selectPackageButton = '[data-testid="select-package-button"]';
    
    // Purchase confirmation locators
    this.confirmPurchaseButton = '[data-testid="confirm-purchase-button"]';
    this.purchaseSuccessMessage = '[data-testid="purchase-success-message"]';
    this.transactionIdLabel = '[data-testid="transaction-id"]';
    this.transactionDateLabel = '[data-testid="transaction-date"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async selectLineWithSOLDPlan(lineNumber) {
    await this.page.click(this.packagesMenuOption);
    await this.page.fill(this.lineSearchInput, lineNumber);
    await this.page.click(this.lineSearchButton);
    await this.page.waitForSelector(this.lineResultRow);
    await this.page.click(this.lineResultRow);
  }

  async selectB2B2CPackage6GB() {
    await this.page.waitForSelector(this.packageB2B2C6GBOption);
    await this.page.click(this.packageB2B2C6GBOption);
    await this.page.click(this.selectPackageButton);
  }

  async confirmPurchase() {
    await this.page.click(this.confirmPurchaseButton);
    await this.page.waitForSelector(this.purchaseSuccessMessage);
  }

  async isPurchaseConfirmationDisplayed() {
    return await this.page.isVisible(this.purchaseSuccessMessage);
  }

  async getTransactionDetails() {
    const transactionId = await this.page.textContent(this.transactionIdLabel);
    const transactionDate = await this.page.textContent(this.transactionDateLabel);
    
    return {
      transactionId: transactionId?.trim(),
      transactionDate: transactionDate?.trim()
    };
  }
}

module.exports = { SiacPage, GmPlatformPage };