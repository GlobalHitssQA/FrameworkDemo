class ManufacturePlanPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.provisioningSectionLink = page.locator('[data-testid="provisioning-section-link"]');
    this.bscs7ConsoleLink = page.locator('[data-testid="bscs7-console-link"]');
    this.dataConsumptionSectionLink = page.locator('[data-testid="data-consumption-section-link"]');
    this.invoiceSectionLink = page.locator('[data-testid="invoice-section-link"]');
    
    // Provisioning locators
    this.manufacturePlanOption = page.locator('[data-testid="plan-option-manufacture"]');
    this.includedDataInput = page.locator('[data-testid="included-data-mb-input"]');
    this.provisionButton = page.locator('[data-testid="provision-line-button"]');
    this.provisionedStatusIndicator = page.locator('[data-testid="provisioned-status-indicator"]');
    
    // BSCS7 locators
    this.bscs7IncludedDataDisplay = page.locator('[data-testid="bscs7-included-data-display"]');
    
    // Data consumption locators
    this.apnSelector = page.locator('[data-testid="apn-selector"]');
    this.apn2Option = page.locator('[data-testid="apn-option-apn2"]');
    this.dataConsumptionInput = page.locator('[data-testid="data-consumption-mb-input"]');
    this.registerConsumptionButton = page.locator('[data-testid="register-consumption-button"]');
    this.remainingIncludedDataDisplay = page.locator('[data-testid="remaining-included-data-display"]');
    this.additionalChargesDisplay = page.locator('[data-testid="additional-charges-display"]');
    this.excessDataMBDisplay = page.locator('[data-testid="excess-data-mb-display"]');
    this.bulkRateDisplay = page.locator('[data-testid="bulk-rate-per-mb-display"]');
    
    // Invoice locators
    this.currentCycleInvoiceLink = page.locator('[data-testid="current-cycle-invoice-link"]');
    this.invoiceExcessDataChargeDisplay = page.locator('[data-testid="invoice-excess-data-charge"]');
    this.invoiceIncludedDataChargeDisplay = page.locator('[data-testid="invoice-included-data-charge"]');
    this.invoiceDetailTrafficSection = page.locator('[data-testid="invoice-detail-traffic-section"]');
    this.invoiceInPoolSection = page.locator('[data-testid="invoice-in-pool-section"]');
    this.invoiceInPoolBulkSection = page.locator('[data-testid="invoice-in-pool-bulk-section"]');
  }

  async navigateToProvisioningSection() {
    await this.provisioningSectionLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLineWithManufacturePlan() {
    await this.manufacturePlanOption.click();
  }

  async setIncludedDataMB(mb) {
    await this.includedDataInput.fill(mb.toString());
    await this.provisionButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineProvisioned() {
    return await this.provisionedStatusIndicator.isVisible();
  }

  async navigateToBSCS7Console() {
    await this.bscs7ConsoleLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getIncludedDataFromBSCS7() {
    return await this.bscs7IncludedDataDisplay.textContent();
  }

  async navigateToDataConsumptionSection() {
    await this.dataConsumptionSectionLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectAPN(apnName) {
    await this.apnSelector.click();
    if (apnName === 'APN2') {
      await this.apn2Option.click();
    }
  }

  async registerDataConsumption(mb) {
    await this.dataConsumptionInput.fill(mb.toString());
    await this.registerConsumptionButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getRemainingIncludedData() {
    return await this.remainingIncludedDataDisplay.textContent();
  }

  async getAdditionalCharges() {
    return await this.additionalChargesDisplay.textContent();
  }

  async getExcessDataMB() {
    return await this.excessDataMBDisplay.textContent();
  }

  async getBulkRatePerMB() {
    return await this.bulkRateDisplay.textContent();
  }

  async navigateToInvoiceSection() {
    await this.invoiceSectionLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openCurrentCycleInvoice() {
    await this.currentCycleInvoiceLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getInvoiceExcessDataCharge() {
    return await this.invoiceExcessDataChargeDisplay.textContent();
  }

  async getInvoiceIncludedDataCharge() {
    return await this.invoiceIncludedDataChargeDisplay.textContent();
  }
}

module.exports = ManufacturePlanPage;