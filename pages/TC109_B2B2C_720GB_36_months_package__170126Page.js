const { expect } = require('@playwright/test');

class BillingPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-btn"]';
    
    this.parametricPackagesMenu = '[data-testid="menu-parametric-packages"]';
    this.packageSearchInput = '[data-testid="package-search-input"]';
    this.searchButton = '[data-testid="search-btn"]';
    this.packageCostField = '[data-testid="package-cost-without-vat"]';
    this.packageValidityField = '[data-testid="package-validity-days"]';
    this.packageExistsIndicator = '[data-testid="package-status-configured"]';
    
    this.soldPlanStatus = '[data-testid="sold-plan-status"]';
    
    this.packageActivationMenu = '[data-testid="menu-package-activation"]';
    this.packageSelector = '[data-testid="package-selector"]';
    this.planTypeSelector = '[data-testid="plan-type-selector"]';
    this.simulateActivationButton = '[data-testid="simulate-activation-btn"]';
    this.activationRecordCost = '[data-testid="activation-record-cost"]';
    
    this.preBillingMenu = '[data-testid="menu-pre-billing"]';
    this.preBillingSearchInput = '[data-testid="pre-billing-search-input"]';
    this.preBillingChargeField = '[data-testid="pre-billing-charge-amount"]';
    
    this.monthlyInvoicesMenu = '[data-testid="menu-monthly-invoices"]';
    this.invoiceSearchInput = '[data-testid="invoice-search-input"]';
    this.invoicePackageChargeField = '[data-testid="invoice-package-charge"]';
  }

  async navigateToBillingSystem() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.billing.local');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.BILLING_USER || 'admin');
    await this.page.fill(this.passwordInput, process.env.BILLING_PASSWORD || 'password');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPackageExists(packageName) {
    await this.navigateToParametricPackagesTable();
    await this.searchPackage(packageName);
    return await this.page.isVisible(this.packageExistsIndicator);
  }

  async verifySoldPlanActive() {
    const statusText = await this.page.textContent(this.soldPlanStatus);
    return statusText.toLowerCase().includes('activo') || statusText.toLowerCase().includes('active');
  }

  async navigateToParametricPackagesTable() {
    await this.page.click(this.parametricPackagesMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchPackage(packageName) {
    await this.page.fill(this.packageSearchInput, packageName);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getPackageCostWithoutVAT() {
    const costText = await this.page.textContent(this.packageCostField);
    return costText.replace(/[^0-9.]/g, '');
  }

  async getPackageValidityDays() {
    const validityText = await this.page.textContent(this.packageValidityField);
    return validityText.replace(/[^0-9]/g, '');
  }

  async navigateToPackageActivation() {
    await this.page.click(this.packageActivationMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async selectPackageForActivation(packageName) {
    await this.page.click(this.packageSelector);
    await this.page.click(`[data-testid="package-option-${packageName.replace(/\s+/g, '-').toLowerCase()}"]`);
  }

  async selectPlanType(planType) {
    await this.page.click(this.planTypeSelector);
    await this.page.click(`[data-testid="plan-option-${planType.toLowerCase()}"]`);
  }

  async simulateActivation() {
    await this.page.click(this.simulateActivationButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getActivationRecordCost() {
    const costText = await this.page.textContent(this.activationRecordCost);
    return costText.replace(/[^0-9.]/g, '');
  }

  async navigateToPreBillingProcess() {
    await this.page.click(this.preBillingMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchActivationInPreBilling(packageName) {
    await this.page.fill(this.preBillingSearchInput, packageName);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getPreBillingCharge() {
    const chargeText = await this.page.textContent(this.preBillingChargeField);
    return chargeText.replace(/[^0-9.]/g, '');
  }

  async navigateToMonthlyInvoices() {
    await this.page.click(this.monthlyInvoicesMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchInvoiceByPackage(packageName) {
    await this.page.fill(this.invoiceSearchInput, packageName);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getInvoicePackageCharge() {
    const chargeText = await this.page.textContent(this.invoicePackageChargeField);
    return chargeText.replace(/[^0-9.]/g, '');
  }
}

module.exports = BillingPage;