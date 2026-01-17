class BillingPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    // Navigation locators
    this.parametricTableMenu = page.locator('[data-testid="menu-parametric-table"]');
    this.packageActivationMenu = page.locator('[data-testid="menu-package-activation"]');
    this.preBillingMenu = page.locator('[data-testid="menu-pre-billing"]');
    this.invoicesMenu = page.locator('[data-testid="menu-invoices"]');
    
    // Search locators
    this.packageSearchInput = page.locator('[data-testid="package-search-input"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    
    // Package table locators
    this.packageCostField = page.locator('[data-testid="package-cost-without-igv"]');
    this.packageValidityField = page.locator('[data-testid="package-validity-days"]');
    this.packageExistsIndicator = page.locator('[data-testid="package-row"]');
    
    // Activation locators
    this.planSelector = page.locator('[data-testid="plan-selector"]');
    this.packageSelector = page.locator('[data-testid="package-selector"]');
    this.simulateActivationButton = page.locator('[data-testid="simulate-activation-button"]');
    this.activationCostField = page.locator('[data-testid="activation-cost-without-igv"]');
    
    // Pre-billing locators
    this.preBillingSearchInput = page.locator('[data-testid="prebilling-search-input"]');
    this.preBillingChargeField = page.locator('[data-testid="prebilling-charge-without-igv"]');
    
    // Invoice locators
    this.monthlyInvoiceLink = page.locator('[data-testid="monthly-invoice-link"]');
    this.invoiceConceptSearch = page.locator('[data-testid="invoice-concept-search"]');
    this.invoicePackageChargeField = page.locator('[data-testid="invoice-package-charge-without-igv"]');
  }

  async navigateToBillingSystem() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.billing.local');
  }

  async login() {
    await this.usernameInput.fill(process.env.BSCS7_USERNAME || 'test_user');
    await this.passwordInput.fill(process.env.BSCS7_PASSWORD || 'test_password');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPackageExists(packageName) {
    await this.openParametricTable();
    await this.searchPackage(packageName);
    return await this.packageExistsIndicator.isVisible();
  }

  async openParametricTable() {
    await this.parametricTableMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchPackage(packageName) {
    await this.packageSearchInput.fill(packageName);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getPackageCostWithoutIGV() {
    const costText = await this.packageCostField.textContent();
    return costText.trim();
  }

  async getPackageValidity() {
    const validityText = await this.packageValidityField.textContent();
    return validityText.trim();
  }

  async navigateToPackageActivation() {
    await this.packageActivationMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectPlan(planName) {
    await this.planSelector.selectOption({ label: planName });
  }

  async selectPackage(packageName) {
    await this.packageSelector.selectOption({ label: packageName });
  }

  async simulateActivation() {
    await this.simulateActivationButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getActivationRecordCost() {
    const costText = await this.activationCostField.textContent();
    return costText.trim();
  }

  async navigateToPreBilling() {
    await this.preBillingMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchPreBillingRecord(packageName) {
    await this.preBillingSearchInput.fill(packageName);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getPreBillingCharge() {
    const chargeText = await this.preBillingChargeField.textContent();
    return chargeText.trim();
  }

  async navigateToInvoices() {
    await this.invoicesMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openMonthlyInvoice() {
    await this.monthlyInvoiceLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchInvoiceConcept(conceptName) {
    await this.invoiceConceptSearch.fill(conceptName);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getInvoicePackageCharge() {
    const chargeText = await this.invoicePackageChargeField.textContent();
    return chargeText.trim();
  }
}

module.exports = BillingPage;