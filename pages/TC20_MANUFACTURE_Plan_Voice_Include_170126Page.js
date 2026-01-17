class ManufacturePlanPage {
  constructor(page) {
    this.page = page;
    
    // Provisioning section locators
    this.provisioningSectionBtn = page.locator('[data-testid="provisioning-section-btn"]');
    this.manufacturePlanOption = page.locator('[data-testid="plan-manufacture-option"]');
    this.includedVoiceInput = page.locator('[data-testid="included-voice-minutes-input"]');
    this.includedSMSInput = page.locator('[data-testid="included-sms-input"]');
    this.includedDataInput = page.locator('[data-testid="included-data-mb-input"]');
    this.confirmProvisioningBtn = page.locator('[data-testid="confirm-provisioning-btn"]');
    this.provisioningSuccessIndicator = page.locator('[data-testid="provisioning-success-indicator"]');
    
    // Consumption section locators
    this.consumptionSectionBtn = page.locator('[data-testid="consumption-section-btn"]');
    this.voiceConsumptionInput = page.locator('[data-testid="voice-consumption-input"]');
    this.registerConsumptionBtn = page.locator('[data-testid="register-consumption-btn"]');
    this.registeredVoiceDisplay = page.locator('[data-testid="registered-voice-consumption"]');
    
    // Billing section locators
    this.billingSectionBtn = page.locator('[data-testid="billing-section-btn"]');
    this.executeBillingBtn = page.locator('[data-testid="execute-billing-btn"]');
    this.billingCompleteIndicator = page.locator('[data-testid="billing-complete-indicator"]');
    
    // Invoice details locators
    this.invoiceDetailsBtn = page.locator('[data-testid="invoice-details-btn"]');
    this.includedMinutesAppliedField = page.locator('[data-testid="included-minutes-applied"]');
    this.includedMinutesChargeField = page.locator('[data-testid="included-minutes-charge"]');
    this.excessMinutesBilledField = page.locator('[data-testid="excess-minutes-billed"]');
    this.excessChargeWithoutIGVField = page.locator('[data-testid="excess-charge-without-igv"]');
    this.excessChargeWithIGVField = page.locator('[data-testid="excess-charge-with-igv"]');
    this.bulkBillingSection = page.locator('[data-testid="bulk-billing-section"]');
  }

  async navigateToProvisioningSection() {
    await this.provisioningSectionBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectManufacturePlan() {
    await this.manufacturePlanOption.click();
  }

  async configureIncludedVoiceMinutes(minutes) {
    await this.includedVoiceInput.clear();
    await this.includedVoiceInput.fill(String(minutes));
  }

  async configureIncludedSMS(count) {
    await this.includedSMSInput.clear();
    await this.includedSMSInput.fill(String(count));
  }

  async configureIncludedData(megabytes) {
    await this.includedDataInput.clear();
    await this.includedDataInput.fill(String(megabytes));
  }

  async confirmProvisioning() {
    await this.confirmProvisioningBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineProvisioned() {
    return await this.provisioningSuccessIndicator.isVisible();
  }

  async navigateToConsumptionSection() {
    await this.consumptionSectionBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async registerVoiceConsumption(minutes) {
    await this.voiceConsumptionInput.clear();
    await this.voiceConsumptionInput.fill(String(minutes));
    await this.registerConsumptionBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getRegisteredVoiceConsumption() {
    const text = await this.registeredVoiceDisplay.textContent();
    return parseInt(text, 10);
  }

  async navigateToBillingSection() {
    await this.billingSectionBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async executeBillingProcess() {
    await this.executeBillingBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyBillingProcessCompleted() {
    return await this.billingCompleteIndicator.isVisible();
  }

  async navigateToInvoiceDetails() {
    await this.invoiceDetailsBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getIncludedMinutesApplied() {
    const text = await this.includedMinutesAppliedField.textContent();
    return parseInt(text, 10);
  }

  async getIncludedMinutesCharge() {
    const text = await this.includedMinutesChargeField.textContent();
    return parseFloat(text.replace('S/.', '').trim());
  }

  async getExcessMinutesBilled() {
    const text = await this.excessMinutesBilledField.textContent();
    return parseInt(text, 10);
  }

  async getExcessChargeWithoutIGV() {
    const text = await this.excessChargeWithoutIGVField.textContent();
    return parseFloat(text.replace('S/.', '').trim());
  }

  async getExcessChargeWithIGV() {
    const text = await this.excessChargeWithIGVField.textContent();
    return parseFloat(text.replace('S/.', '').trim());
  }
}

module.exports = ManufacturePlanPage;