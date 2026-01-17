class BillingPage {
  constructor(page) {
    this.page = page;
    
    // Plan Configuration Locators
    this.planConfigurationSection = page.locator('[data-testid="plan-configuration-section"]');
    this.bulkVoicePlanDropdown = page.locator('[data-testid="bulk-voice-plan-dropdown"]');
    this.testingPlanOption = page.locator('[data-testid="plan-option-testing"]');
    this.manufacturePlanOption = page.locator('[data-testid="plan-option-manufacture"]');
    this.unsoldNotShowroomOption = page.locator('[data-testid="plan-option-unsold-not-showroom"]');
    this.unsoldShowroomOption = page.locator('[data-testid="plan-option-unsold-showroom"]');
    this.dormantPlanOption = page.locator('[data-testid="plan-option-dormant"]');
    this.lineNumberInput = page.locator('[data-testid="line-number-input"]');
    this.configureLineButton = page.locator('[data-testid="configure-line-button"]');
    this.lineConfiguredStatus = page.locator('[data-testid="line-configured-status"]');
    
    // Consumption Registry Locators
    this.consumptionRegistrySection = page.locator('[data-testid="consumption-registry-section"]');
    this.localVoiceMinutesInput = page.locator('[data-testid="local-voice-minutes-input"]');
    this.registerConsumptionButton = page.locator('[data-testid="register-consumption-button"]');
    this.registeredConsumptionDisplay = page.locator('[data-testid="registered-consumption-display"]');
    
    // Billing Process Locators
    this.billingProcessSection = page.locator('[data-testid="billing-process-section"]');
    this.billingCycleDropdown = page.locator('[data-testid="billing-cycle-dropdown"]');
    this.executeBillingButton = page.locator('[data-testid="execute-billing-button"]');
    this.billingProcessedStatus = page.locator('[data-testid="billing-processed-status"]');
    
    // Invoice Details Locators
    this.invoiceDetailsSection = page.locator('[data-testid="invoice-details-section"]');
    this.bulkServicesSection = page.locator('[data-testid="servicios-in-pool-granel-section"]');
    this.localVoiceChargeWithoutIGV = page.locator('[data-testid="local-voice-charge-without-igv"]');
    this.localVoiceChargeWithIGV = page.locator('[data-testid="local-voice-charge-with-igv"]');
    this.trafficDetailSection = page.locator('[data-testid="detalle-trafico-section"]');
    this.planFieldInTrafficDetail = page.locator('[data-testid="plan-field-traffic-detail"]');
  }

  async navigateToPlanConfiguration() {
    await this.planConfigurationSection.waitFor({ state: 'visible' });
    await this.planConfigurationSection.click();
  }

  async selectBulkVoicePlan() {
    await this.bulkVoicePlanDropdown.click();
    await this.testingPlanOption.click();
  }

  async configureLine() {
    await this.configureLineButton.click();
    await this.lineConfiguredStatus.waitFor({ state: 'visible' });
  }

  async isLineConfigured() {
    return await this.lineConfiguredStatus.isVisible();
  }

  async navigateToConsumptionRegistry() {
    await this.consumptionRegistrySection.waitFor({ state: 'visible' });
    await this.consumptionRegistrySection.click();
  }

  async registerLocalVoiceConsumption(minutes) {
    await this.localVoiceMinutesInput.fill(String(minutes));
    await this.registerConsumptionButton.click();
  }

  async getRegisteredConsumption() {
    const text = await this.registeredConsumptionDisplay.textContent();
    return parseInt(text, 10);
  }

  async navigateToBillingProcess() {
    await this.billingProcessSection.waitFor({ state: 'visible' });
    await this.billingProcessSection.click();
  }

  async executeBillingCycle() {
    await this.executeBillingButton.click();
    await this.billingProcessedStatus.waitFor({ state: 'visible' });
  }

  async isBillingProcessed() {
    return await this.billingProcessedStatus.isVisible();
  }

  async navigateToInvoiceDetails() {
    await this.invoiceDetailsSection.waitFor({ state: 'visible' });
    await this.invoiceDetailsSection.click();
    await this.bulkServicesSection.waitFor({ state: 'visible' });
  }

  async getLocalVoiceChargeWithoutIGV() {
    const text = await this.localVoiceChargeWithoutIGV.textContent();
    return parseFloat(text.replace('S/. ', '').replace(',', '.'));
  }

  async getLocalVoiceChargeWithIGV() {
    const text = await this.localVoiceChargeWithIGV.textContent();
    return parseFloat(text.replace('S/. ', '').replace(',', '.'));
  }
}

module.exports = BillingPage;