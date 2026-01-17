class BillingPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.billingSystemLink = page.locator('[data-testid="billing-system-link"]');
    this.billingExecutionTab = page.locator('[data-testid="billing-execution-tab"]');
    
    // User and line locators
    this.gmLineStatus = page.locator('[data-testid="gm-line-status"]');
    this.soldPlanIndicator = page.locator('[data-testid="sold-plan-indicator"]');
    
    // Package activation locators
    this.packageTypeDropdown = page.locator('#package-type-selector');
    this.packageOptionTrial6GB = page.locator('[data-testid="package-option-trial-6gb"]');
    this.packageOptionB2B2C12GB = page.locator('[data-testid="package-option-b2b2c-12gb"]');
    this.activationDateInput = page.locator('#activation-date-input');
    this.packageValidityInput = page.locator('#package-validity-months');
    this.activatePackageButton = page.locator('[data-testid="activate-package-btn"]');
    this.packageActivationStatus = page.locator('[data-testid="package-activation-status"]');
    this.packageActivationDate = page.locator('[data-testid="package-activation-date"]');
    
    // Billing configuration locators
    this.billingCutoffConfig = page.locator('[data-testid="billing-cutoff-config"]');
    this.cutoffDateInput = page.locator('#cutoff-date-input');
    this.executeBillingButton = page.locator('[data-testid="execute-billing-btn"]');
    
    // Invoice locators
    this.invoiceContainer = page.locator('[data-testid="invoice-container"]');
    this.invoiceTypeLabel = page.locator('[data-testid="invoice-type-label"]');
    this.invoiceCutoffDate = page.locator('[data-testid="invoice-cutoff-date"]');
    this.inPoolServicesSection = page.locator('[data-testid="in-pool-services-section"]');
    this.trafficDetailSection = page.locator('[data-testid="traffic-detail-sold-section"]');
    this.packageChargeRow = (packageName) => page.locator(`[data-testid="package-charge-row-${packageName.toLowerCase().replace(/\s+/g, '-')}"]`);
    this.packageChargeAmount = (packageName) => page.locator(`[data-testid="package-charge-amount-${packageName.toLowerCase().replace(/\s+/g, '-')}"]`);
  }

  async navigateToBillingSystem() {
    await this.billingSystemLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserHasActiveGMLine() {
    await this.gmLineStatus.waitFor({ state: 'visible' });
    const status = await this.gmLineStatus.textContent();
    return status.includes('Activo') || status.includes('Active');
  }

  async verifyBillingCutoffConfiguration(day) {
    const configText = await this.billingCutoffConfig.textContent();
    return configText.includes(day.toString());
  }

  async selectPackageType(packageType) {
    await this.packageTypeDropdown.click();
    if (packageType === 'TRIAL 6GB') {
      await this.packageOptionTrial6GB.click();
    } else if (packageType === 'B2B2C 12GB') {
      await this.packageOptionB2B2C12GB.click();
    }
  }

  async setActivationDate(day) {
    await this.activationDateInput.clear();
    await this.activationDateInput.fill(day.toString());
  }

  async setPackageValidity(months) {
    await this.packageValidityInput.clear();
    await this.packageValidityInput.fill(months.toString());
  }

  async activatePackage() {
    await this.activatePackageButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getPackageActivationStatus() {
    return await this.packageActivationStatus.textContent();
  }

  async getPackageActivationDate() {
    return await this.packageActivationDate.textContent();
  }

  async navigateToBillingExecution() {
    await this.billingExecutionTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async setCutoffDate(day) {
    await this.cutoffDateInput.clear();
    await this.cutoffDateInput.fill(day.toString());
  }

  async executeBillingProcess() {
    await this.executeBillingButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.invoiceContainer.waitFor({ state: 'visible', timeout: 30000 });
  }

  async isInvoiceGenerated() {
    return await this.invoiceContainer.isVisible();
  }

  async getInvoiceType() {
    return await this.invoiceTypeLabel.textContent();
  }

  async getPackageChargeAmount(packageName) {
    const amountElement = this.packageChargeAmount(packageName);
    const amountText = await amountElement.textContent();
    return amountText.replace(/[^\d.]/g, '');
  }

  async getInvoiceCutoffDate() {
    return await this.invoiceCutoffDate.textContent();
  }
}

module.exports = BillingPage;