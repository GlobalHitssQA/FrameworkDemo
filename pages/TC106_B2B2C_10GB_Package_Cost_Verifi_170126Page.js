const { expect } = require('@playwright/test');

class BSCS7BillingPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = page.locator('[data-testid="login-username"]');
    this.passwordInput = page.locator('[data-testid="login-password"]');
    this.loginButton = page.locator('[data-testid="login-submit-btn"]');
    
    // Navigation locators
    this.parametricTableMenu = page.locator('[data-testid="menu-parametric-tables"]');
    this.packageTableOption = page.locator('[data-testid="submenu-package-table"]');
    this.activationMenu = page.locator('[data-testid="menu-package-activation"]');
    this.preBillingMenu = page.locator('[data-testid="menu-pre-billing"]');
    this.invoiceQueryMenu = page.locator('[data-testid="menu-invoice-query"]');
    
    // Search locators
    this.packageSearchInput = page.locator('[data-testid="package-search-input"]');
    this.searchButton = page.locator('[data-testid="search-btn"]');
    
    // Package table locators
    this.packageCostField = page.locator('[data-testid="package-cost-without-igv"]');
    this.packageValidityField = page.locator('[data-testid="package-validity-days"]');
    this.packageExistsIndicator = page.locator('[data-testid="package-status-active"]');
    
    // Activation locators
    this.planTypeDropdown = page.locator('[data-testid="plan-type-select"]');
    this.packageDropdown = page.locator('[data-testid="package-select"]');
    this.simulateActivationBtn = page.locator('[data-testid="simulate-activation-btn"]');
    this.activationRecordCost = page.locator('[data-testid="activation-record-cost"]');
    
    // Pre-billing locators
    this.preBillingSearchInput = page.locator('[data-testid="prebilling-search-input"]');
    this.preBillingChargeField = page.locator('[data-testid="prebilling-charge-amount"]');
    
    // Invoice locators
    this.invoiceSearchInput = page.locator('[data-testid="invoice-package-search"]');
    this.invoicePackageChargeField = page.locator('[data-testid="invoice-package-charge"]');
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BSCS7_BASE_URL || 'https://bscs7.billing.example.com');
  }

  async login() {
    await this.usernameInput.fill(process.env.BSCS7_USERNAME || 'test_user');
    await this.passwordInput.fill(process.env.BSCS7_PASSWORD || 'test_password');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPackageExists(packageCode) {
    await this.navigateToParametricPackageTable();
    await this.searchPackage(packageCode);
    return await this.packageExistsIndicator.isVisible();
  }

  async navigateToParametricPackageTable() {
    await this.parametricTableMenu.click();
    await this.packageTableOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchPackage(packageCode) {
    await this.packageSearchInput.fill(packageCode);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getPackageCostWithoutIGV() {
    const costText = await this.packageCostField.textContent();
    return costText.replace(/[^0-9.]/g, '');
  }

  async getPackageValidityDays() {
    const validityText = await this.packageValidityField.textContent();
    return validityText.replace(/[^0-9]/g, '');
  }

  async navigateToPackageActivation() {
    await this.activationMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectPlanType(planType) {
    await this.planTypeDropdown.click();
    await this.page.locator(`[data-testid="plan-option-${planType}"]`).click();
  }

  async selectPackage(packageCode) {
    await this.packageDropdown.click();
    await this.page.locator(`[data-testid="package-option-${packageCode}"]`).click();
  }

  async simulateActivation() {
    await this.simulateActivationBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getActivationRecordCost() {
    const costText = await this.activationRecordCost.textContent();
    return costText.replace(/[^0-9.]/g, '');
  }

  async navigateToPreBilling() {
    await this.preBillingMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchPreBillingRecord(packageCode) {
    await this.preBillingSearchInput.fill(packageCode);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getPreBillingCharge() {
    const chargeText = await this.preBillingChargeField.textContent();
    return chargeText.replace(/[^0-9.]/g, '');
  }

  async navigateToInvoiceQuery() {
    await this.invoiceQueryMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchInvoiceByPackage(packageCode) {
    await this.invoiceSearchInput.fill(packageCode);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getInvoicePackageCharge() {
    const chargeText = await this.invoicePackageChargeField.textContent();
    return chargeText.replace(/[^0-9.]/g, '');
  }
}

module.exports = BSCS7BillingPage;