class BillingPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Navigation locators
    this.parametricTableMenu = '[data-testid="menu-parametric-table"]';
    this.packageActivationMenu = '[data-testid="menu-package-activation"]';
    this.preBillingMenu = '[data-testid="menu-pre-billing"]';
    this.invoiceQueryMenu = '[data-testid="menu-invoice-query"]';
    
    // Package table locators
    this.packageSearchInput = '[data-testid="package-search-input"]';
    this.packageSearchButton = '[data-testid="package-search-button"]';
    this.packageCostField = '[data-testid="package-cost-without-igv"]';
    this.packageValidityField = '[data-testid="package-validity-days"]';
    this.packageStatusField = '[data-testid="package-status"]';
    
    // Activation locators
    this.packageSelector = '[data-testid="package-selector"]';
    this.planTypeSelector = '[data-testid="plan-type-selector"]';
    this.simulateActivationButton = '[data-testid="simulate-activation-button"]';
    this.activationRecordCost = '[data-testid="activation-record-cost"]';
    
    // Pre-billing locators
    this.preBillingSearchInput = '[data-testid="prebilling-search-input"]';
    this.preBillingSearchButton = '[data-testid="prebilling-search-button"]';
    this.preBillingChargeField = '[data-testid="prebilling-charge-amount"]';
    
    // Invoice locators
    this.invoiceConceptSearchInput = '[data-testid="invoice-concept-search"]';
    this.invoiceSearchButton = '[data-testid="invoice-search-button"]';
    this.invoicePackageChargeField = '[data-testid="invoice-package-charge"]';
    
    // SOLD plan locators
    this.soldPlanStatusIndicator = '[data-testid="sold-plan-status"]';
  }

  async navigateToBillingSystem() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.billing.local');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.BILLING_USER || 'admin');
    await this.page.fill(this.passwordInput, process.env.BILLING_PASSWORD || 'admin123');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPackageExists(packageName) {
    await this.navigateToParametricTable();
    await this.searchPackage(packageName);
    return await this.page.isVisible(this.packageCostField);
  }

  async verifySoldPlanIsActive() {
    const statusText = await this.page.textContent(this.soldPlanStatusIndicator);
    return statusText && statusText.toLowerCase().includes('activo');
  }

  async navigateToParametricTable() {
    await this.page.click(this.parametricTableMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchPackage(packageName) {
    await this.page.fill(this.packageSearchInput, packageName);
    await this.page.click(this.packageSearchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getPackageCostWithoutIGV() {
    const costText = await this.page.textContent(this.packageCostField);
    return costText ? costText.replace(/[^0-9.]/g, '') : null;
  }

  async getPackageValidityDays() {
    const validityText = await this.page.textContent(this.packageValidityField);
    return validityText ? validityText.replace(/[^0-9]/g, '') : null;
  }

  async navigateToPackageActivation() {
    await this.page.click(this.packageActivationMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async selectPackageForActivation(packageName) {
    await this.page.selectOption(this.packageSelector, { label: packageName });
  }

  async selectPlanType(planType) {
    await this.page.selectOption(this.planTypeSelector, { label: planType });
  }

  async simulateActivation() {
    await this.page.click(this.simulateActivationButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getActivationRecordCost() {
    const costText = await this.page.textContent(this.activationRecordCost);
    return costText ? costText.replace(/[^0-9.]/g, '') : null;
  }

  async navigateToPreBilling() {
    await this.page.click(this.preBillingMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchActivationInPreBilling(packageName) {
    await this.page.fill(this.preBillingSearchInput, packageName);
    await this.page.click(this.preBillingSearchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getPreBillingCharge() {
    const chargeText = await this.page.textContent(this.preBillingChargeField);
    return chargeText ? chargeText.replace(/[^0-9.]/g, '') : null;
  }

  async navigateToInvoiceQuery() {
    await this.page.click(this.invoiceQueryMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchInvoiceConcept(conceptName) {
    await this.page.fill(this.invoiceConceptSearchInput, conceptName);
    await this.page.click(this.invoiceSearchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getInvoicePackageCharge() {
    const chargeText = await this.page.textContent(this.invoicePackageChargeField);
    return chargeText ? chargeText.replace(/[^0-9.]/g, '') : null;
  }
}

module.exports = BillingPage;