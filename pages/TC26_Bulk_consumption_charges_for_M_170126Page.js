class ManufacturePlanPage {
  constructor(page) {
    this.page = page;
    
    // Provisioning section locators
    this.provisioningMenuBtn = page.locator('[data-testid="menu-provisioning"]');
    this.newLineBtn = page.locator('[data-testid="btn-new-line"]');
    this.planSelector = page.locator('[data-testid="select-plan"]');
    this.manufacturePlanOption = page.locator('[data-testid="option-manufacture-plan"]');
    this.voiceIncludedInput = page.locator('[data-testid="input-voice-included"]');
    this.smsIncludedInput = page.locator('[data-testid="input-sms-included"]');
    this.dataIncludedInput = page.locator('[data-testid="input-data-included"]');
    this.provisionBtn = page.locator('[data-testid="btn-provision-line"]');
    this.lineStatusIndicator = page.locator('[data-testid="line-status-indicator"]');
    this.includedLimitsSection = page.locator('[data-testid="section-included-limits"]');
    
    // Consumption section locators
    this.consumptionMenuBtn = page.locator('[data-testid="menu-consumption"]');
    this.smsConsumptionInput = page.locator('[data-testid="input-sms-consumption"]');
    this.dataConsumptionInput = page.locator('[data-testid="input-data-consumption"]');
    this.registerConsumptionBtn = page.locator('[data-testid="btn-register-consumption"]');
    this.includedSMSDisplay = page.locator('[data-testid="display-included-sms"]');
    this.excessSMSDisplay = page.locator('[data-testid="display-excess-sms"]');
    this.includedDataDisplay = page.locator('[data-testid="display-included-data"]');
    this.excessDataDisplay = page.locator('[data-testid="display-excess-data"]');
    
    // Billing invoice locators
    this.billingMenuBtn = page.locator('[data-testid="menu-billing"]');
    this.viewInvoiceBtn = page.locator('[data-testid="btn-view-invoice"]');
    this.bulkServicesSection = page.locator('[data-testid="section-servicios-in-pool-granel"]');
    this.bulkSMSCountCell = page.locator('[data-testid="cell-bulk-sms-count"]');
    this.bulkSMSRateCell = page.locator('[data-testid="cell-bulk-sms-rate"]');
    this.bulkSMSTotalCell = page.locator('[data-testid="cell-bulk-sms-total"]');
    this.bulkDataMBCell = page.locator('[data-testid="cell-bulk-data-mb"]');
    this.bulkDataRateCell = page.locator('[data-testid="cell-bulk-data-rate"]');
    this.bulkDataTotalCell = page.locator('[data-testid="cell-bulk-data-total"]');
    this.trafficDetailSection = page.locator('[data-testid="section-detalle-trafico-sold"]');
    this.planFieldInTrafficDetail = page.locator('[data-testid="field-plan-detalle-trafico"]');
  }

  async navigateToProvisioningSection() {
    await this.provisioningMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLineWithManufacturePlan(voiceMinutes, smsCount, dataMB) {
    await this.newLineBtn.click();
    await this.planSelector.click();
    await this.manufacturePlanOption.click();
    await this.voiceIncludedInput.fill(voiceMinutes.toString());
    await this.smsIncludedInput.fill(smsCount.toString());
    await this.dataIncludedInput.fill(dataMB.toString());
    await this.provisionBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineIsActive() {
    const statusText = await this.lineStatusIndicator.textContent();
    return statusText.toLowerCase().includes('activ');
  }

  async verifyIncludedLimitsAssigned() {
    return await this.includedLimitsSection.isVisible();
  }

  async navigateToConsumptionSection() {
    await this.consumptionMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async registerSMSConsumption(smsCount) {
    await this.smsConsumptionInput.fill(smsCount.toString());
    await this.registerConsumptionBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async registerDataConsumption(dataMB) {
    await this.dataConsumptionInput.fill(dataMB.toString());
    await this.registerConsumptionBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getIncludedSMSCount() {
    const text = await this.includedSMSDisplay.textContent();
    return parseInt(text, 10);
  }

  async getExcessSMSCount() {
    const text = await this.excessSMSDisplay.textContent();
    return parseInt(text, 10);
  }

  async getIncludedDataMB() {
    const text = await this.includedDataDisplay.textContent();
    return parseInt(text, 10);
  }

  async getExcessDataMB() {
    const text = await this.excessDataDisplay.textContent();
    return parseInt(text, 10);
  }

  async navigateToBillingInvoice() {
    await this.billingMenuBtn.click();
    await this.viewInvoiceBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getInvoiceBulkSMSCount() {
    const text = await this.bulkSMSCountCell.textContent();
    return parseInt(text, 10);
  }

  async getInvoiceBulkSMSRate() {
    const text = await this.bulkSMSRateCell.textContent();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getInvoiceBulkSMSTotal() {
    const text = await this.bulkSMSTotalCell.textContent();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getInvoiceBulkDataMB() {
    const text = await this.bulkDataMBCell.textContent();
    return parseInt(text, 10);
  }

  async getInvoiceBulkDataRate() {
    const text = await this.bulkDataRateCell.textContent();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getInvoiceBulkDataTotal() {
    const text = await this.bulkDataTotalCell.textContent();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }
}

module.exports = ManufacturePlanPage;