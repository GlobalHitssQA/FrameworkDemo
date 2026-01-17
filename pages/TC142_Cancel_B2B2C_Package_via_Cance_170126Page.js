const { expect } = require('@playwright/test');

class CancelProductPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.lineSearchInput = '[data-testid="line-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.lineStatusLabel = '[data-testid="line-status-label"]';
    this.planTypeLabel = '[data-testid="plan-type-label"]';
    this.packageStatusLabel = '[data-testid="package-status-label"]';
    this.b2b2cPackageRow = '[data-testid="b2b2c-package-row"]';
    this.cancelProductButton = '[data-testid="cancel-product-button"]';
    this.confirmCancelButton = '[data-testid="confirm-cancel-button"]';
    this.apiStatusIndicator = '[data-testid="api-status-indicator"]';
    this.bscs7NavigationLink = '[data-testid="bscs7-navigation-link"]';
    this.bscs7PackageStatus = '[data-testid="bscs7-package-status"]';
    this.siacUnicoNavigationLink = '[data-testid="siac-unico-navigation-link"]';
    this.transactionDateField = '[data-testid="transaction-date-field"]';
    this.transactionTimeField = '[data-testid="transaction-time-field"]';
    this.transactionUserField = '[data-testid="transaction-user-field"]';
    this.billingNavigationLink = '[data-testid="billing-navigation-link"]';
    this.billingCycleSection = '[data-testid="billing-cycle-section"]';
    this.invoicePackageList = '[data-testid="invoice-package-list"]';
    this.activePackageIndicator = '[data-testid="active-package-indicator"]';
  }

  async navigateToSystem() {
    await this.page.goto(process.env.BASE_URL || 'https://lifecycle-gm.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    await this.page.fill(this.usernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.TEST_PASSWORD || 'testpass');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveLineWithSOLDPlan() {
    await this.page.fill(this.lineSearchInput, process.env.TEST_LINE_NUMBER || '123456789');
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.lineStatusLabel);
    const status = await this.page.textContent(this.lineStatusLabel);
    const planType = await this.page.textContent(this.planTypeLabel);
    return status === 'Active' && planType === 'SOLD';
  }

  async verifyB2B2CPackageAssigned() {
    const packageRow = await this.page.isVisible(this.b2b2cPackageRow);
    if (packageRow) {
      const packageStatus = await this.page.textContent(this.packageStatusLabel);
      return packageStatus === 'Active';
    }
    return false;
  }

  async checkCancelProductAPIAvailability() {
    const indicator = await this.page.isVisible(this.apiStatusIndicator);
    if (indicator) {
      const statusText = await this.page.textContent(this.apiStatusIndicator);
      return statusText.includes('Available') || statusText.includes('Online');
    }
    return true;
  }

  async invokeCancelProductAPI() {
    const response = await this.page.request.post('/api/v1/cancel-product', {
      data: {
        packageType: 'B2B2C',
        lineNumber: process.env.TEST_LINE_NUMBER || '123456789',
        reason: 'Customer requested deactivation'
      }
    });
    return response;
  }

  async verifyAPIResponseSuccess(response) {
    const status = response.status();
    return status >= 200 && status < 300;
  }

  async navigateToBSCS7() {
    await this.page.click(this.bscs7NavigationLink);
    await this.page.waitForLoadState('networkidle');
  }

  async getPackageStatusInBSCS7() {
    await this.page.waitForSelector(this.bscs7PackageStatus);
    const status = await this.page.textContent(this.bscs7PackageStatus);
    return status.toLowerCase();
  }

  async isPackageActiveForLine() {
    const isVisible = await this.page.isVisible(this.activePackageIndicator);
    if (isVisible) {
      const text = await this.page.textContent(this.activePackageIndicator);
      return text.includes('Active');
    }
    return false;
  }

  async navigateToSIACUnico() {
    await this.page.click(this.siacUnicoNavigationLink);
    await this.page.waitForLoadState('networkidle');
  }

  async getCancellationTransactionRecord() {
    await this.page.waitForSelector(this.transactionDateField);
    const date = await this.page.textContent(this.transactionDateField);
    const time = await this.page.textContent(this.transactionTimeField);
    const user = await this.page.textContent(this.transactionUserField);
    return { date, time, user };
  }

  async navigateToBillingSection() {
    await this.page.click(this.billingNavigationLink);
    await this.page.waitForLoadState('networkidle');
  }

  async isPackageInNextBillingCycle() {
    await this.page.waitForSelector(this.billingCycleSection);
    const packageListText = await this.page.textContent(this.invoicePackageList);
    return packageListText.includes('B2B2C');
  }
}

module.exports = CancelProductPage;