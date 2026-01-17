class BillingPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BSCS7_URL || 'https://bscs7.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Navigation locators
    this.parametricPackagesMenu = '[data-testid="menu-parametric-packages"]';
    this.packageActivationMenu = '[data-testid="menu-package-activation"]';
    this.preBillingMenu = '[data-testid="menu-pre-billing"]';
    this.invoiceQueryMenu = '[data-testid="menu-invoice-query"]';
    
    // Package table locators
    this.packageSearchInput = '[data-testid="package-search-input"]';
    this.packageSearchButton = '[data-testid="package-search-button"]';
    this.packageCostCell = '[data-testid="package-cost-without-igv"]';
    this.packageValidityCell = '[data-testid="package-validity-days"]';
    this.packageNameCell = '[data-testid="package-name"]';
    
    // Activation locators
    this.planTypeSelect = '[data-testid="plan-type-select"]';
    this.packageSelect = '[data-testid="package-select"]';
    this.simulateActivationButton = '[data-testid="simulate-activation-button"]';
    this.activationRecordCost = '[data-testid="activation-record-cost"]';
    
    // Pre-billing locators
    this.preBillingSearchInput = '[data-testid="pre-billing-search-input"]';
    this.preBillingSearchButton = '[data-testid="pre-billing-search-button"]';
    this.preBillingChargeCell = '[data-testid="pre-billing-charge"]';
    
    // Invoice locators
    this.invoicePackageSearchInput = '[data-testid="invoice-package-search-input"]';
    this.invoiceSearchButton = '[data-testid="invoice-search-button"]';
    this.invoicePackageChargeCell = '[data-testid="invoice-package-charge"]';
  }

  async navigateToBillingSystem() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.BSCS7_USERNAME || 'testuser';
    const password = process.env.BSCS7_PASSWORD || 'testpass';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPackageExists(packageName) {
    await this.navigateToParametricPackagesTable();
    await this.searchPackage(packageName);
    return await this.page.isVisible(this.packageNameCell);
  }

  async navigateToParametricPackagesTable() {
    await this.page.click(this.parametricPackagesMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchPackage(packageName) {
    await this.page.fill(this.packageSearchInput, packageName);
    await this.page.click(this.packageSearchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getPackageCostWithoutIGV() {
    return await this.page.textContent(this.packageCostCell);
  }

  async getPackageValidityDays() {
    return await this.page.textContent(this.packageValidityCell);
  }

  async navigateToPackageActivation() {
    await this.page.click(this.packageActivationMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async selectPlanType(planType) {
    await this.page.selectOption(this.planTypeSelect, { label: planType });
  }

  async selectPackage(packageName) {
    await this.page.selectOption(this.packageSelect, { label: packageName });
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

  async searchActivationInPreBilling(packageName) {
    await this.page.fill(this.preBillingSearchInput, packageName);
    await this.page.click(this.preBillingSearchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getPreBillingCharge() {
    return await this.page.textContent(this.preBillingChargeCell);
  }

  async navigateToInvoiceQuery() {
    await this.page.click(this.invoiceQueryMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchInvoiceByPackage(packageName) {
    await this.page.fill(this.invoicePackageSearchInput, packageName);
    await this.page.click(this.invoiceSearchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getInvoicePackageCharge() {
    return await this.page.textContent(this.invoicePackageChargeCell);
  }
}

module.exports = BillingPage;