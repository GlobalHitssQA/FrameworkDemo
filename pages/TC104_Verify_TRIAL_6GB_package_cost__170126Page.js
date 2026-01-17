class BillingPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BSCS7_URL || 'https://bscs7.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Navigation locators
    this.parametricTableMenu = '[data-testid="menu-parametric-table"]';
    this.packageActivationMenu = '[data-testid="menu-package-activation"]';
    this.preBillingMenu = '[data-testid="menu-pre-billing"]';
    this.invoiceConsultationMenu = '[data-testid="menu-invoice-consultation"]';
    
    // Search and filter locators
    this.packageSearchInput = '[data-testid="package-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.planSelector = '[data-testid="plan-selector"]';
    this.packageSelector = '[data-testid="package-selector"]';
    
    // Result locators
    this.packageCostField = '[data-testid="package-cost-without-igv"]';
    this.activationRecordCost = '[data-testid="activation-record-cost"]';
    this.preBillingChargeField = '[data-testid="pre-billing-charge"]';
    this.invoiceChargeField = '[data-testid="invoice-package-charge"]';
    this.packageExistsIndicator = '[data-testid="package-exists-indicator"]';
    
    // Action buttons
    this.simulateActivationButton = '[data-testid="simulate-activation-button"]';
    this.conceptSearchInput = '[data-testid="concept-search-input"]';
  }

  async navigateToBillingSystem() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.BSCS7_USERNAME || 'test_user';
    const password = process.env.BSCS7_PASSWORD || 'test_password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPackageExists(packageName) {
    await this.navigateToParametricTable();
    await this.searchPackage(packageName);
    return await this.page.isVisible(this.packageExistsIndicator);
  }

  async navigateToParametricTable() {
    await this.page.click(this.parametricTableMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchPackage(packageName) {
    await this.page.fill(this.packageSearchInput, packageName);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getPackageCostWithoutIGV() {
    return await this.page.textContent(this.packageCostField);
  }

  async navigateToPackageActivation() {
    await this.page.click(this.packageActivationMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async selectPlan(planName) {
    await this.page.selectOption(this.planSelector, { label: planName });
  }

  async selectPackage(packageName) {
    await this.page.selectOption(this.packageSelector, { label: packageName });
  }

  async simulateActivation() {
    await this.page.click(this.simulateActivationButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getActivationRecordCost() {
    return await this.page.textContent(this.activationRecordCost);
  }

  async navigateToPreBilling() {
    await this.page.click(this.preBillingMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchPreBillingRecord(packageName) {
    await this.page.fill(this.packageSearchInput, packageName);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getPreBillingCharge() {
    return await this.page.textContent(this.preBillingChargeField);
  }

  async navigateToInvoiceConsultation() {
    await this.page.click(this.invoiceConsultationMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchInvoiceConcept(conceptName) {
    await this.page.fill(this.conceptSearchInput, conceptName);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getInvoicePackageCharge() {
    return await this.page.textContent(this.invoiceChargeField);
  }
}

module.exports = BillingPage;