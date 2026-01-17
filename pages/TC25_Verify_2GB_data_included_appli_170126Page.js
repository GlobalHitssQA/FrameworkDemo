class UnsoldShowroomPage {
  constructor(page) {
    this.page = page;
    
    // Provisioning section locators
    this.provisioningSection = '[data-testid="provisioning-section"]';
    this.planSelector = '[data-testid="plan-selector"]';
    this.unsoldShowroomOption = '[data-testid="plan-option-unsold-showroom"]';
    this.provisionButton = '[data-testid="provision-line-button"]';
    this.planStatusLabel = '[data-testid="plan-status-label"]';
    this.dataIncludedValue = '[data-testid="data-included-value"]';
    this.voiceMinutesValue = '[data-testid="voice-minutes-included"]';
    this.smsIncludedValue = '[data-testid="sms-included-value"]';
    
    // Consumption section locators
    this.consumptionSection = '[data-testid="consumption-section"]';
    this.dataConsumptionInput = '[data-testid="data-consumption-input"]';
    this.simulateConsumptionButton = '[data-testid="simulate-consumption-button"]';
    this.consumedDataValue = '[data-testid="consumed-data-value"]';
    this.consumptionStatusLabel = '[data-testid="consumption-status-label"]';
    this.remainingBalanceValue = '[data-testid="remaining-data-balance"]';
    
    // Invoice section locators
    this.invoiceSection = '[data-testid="invoice-section"]';
    this.currentBillingInvoice = '[data-testid="current-billing-invoice"]';
    this.additionalDataChargesValue = '[data-testid="additional-data-charges"]';
    this.extraDataChargesIndicator = '[data-testid="extra-data-charges-indicator"]';
    this.dataConsumptionLabelInvoice = '[data-testid="data-consumption-label"]';
    this.detailTrafficSection = '[data-testid="detail-traffic-sold-section"]';
    this.planFieldInTrafficDetail = '[data-testid="plan-field-traffic-detail"]';
    
    // SIAC Unico locators
    this.siacPackageTypification = '[data-testid="siac-package-typification"]';
    
    // In Pool sections
    this.servicesInPoolSection = '[data-testid="services-in-pool-section"]';
    this.servicesInPoolGranelSection = '[data-testid="services-in-pool-granel-section"]';
  }

  async navigateToProvisioningSection() {
    await this.page.click(this.provisioningSection);
    await this.page.waitForSelector(this.planSelector);
  }

  async selectUnsoldShowroomPlan() {
    await this.page.click(this.planSelector);
    await this.page.click(this.unsoldShowroomOption);
  }

  async provisionLine() {
    await this.page.click(this.provisionButton);
    await this.page.waitForSelector(this.planStatusLabel);
  }

  async getPlanStatus() {
    return await this.page.textContent(this.planStatusLabel);
  }

  async getDataIncluded() {
    return await this.page.textContent(this.dataIncludedValue);
  }

  async getVoiceMinutesIncluded() {
    return await this.page.textContent(this.voiceMinutesValue);
  }

  async getSmsIncluded() {
    return await this.page.textContent(this.smsIncludedValue);
  }

  async navigateToConsumptionSection() {
    await this.page.click(this.consumptionSection);
    await this.page.waitForSelector(this.dataConsumptionInput);
  }

  async simulateDataConsumption(gbAmount) {
    await this.page.fill(this.dataConsumptionInput, gbAmount);
    await this.page.click(this.simulateConsumptionButton);
  }

  async waitForConsumptionRegistration() {
    await this.page.waitForSelector(this.consumedDataValue);
  }

  async getConsumedData() {
    return await this.page.textContent(this.consumedDataValue);
  }

  async getConsumptionStatus() {
    return await this.page.textContent(this.consumptionStatusLabel);
  }

  async getRemainingDataBalance() {
    return await this.page.textContent(this.remainingBalanceValue);
  }

  async navigateToInvoiceSection() {
    await this.page.click(this.invoiceSection);
    await this.page.waitForSelector(this.currentBillingInvoice);
  }

  async openCurrentBillingPeriodInvoice() {
    await this.page.click(this.currentBillingInvoice);
    await this.page.waitForSelector(this.detailTrafficSection);
  }

  async getAdditionalDataCharges() {
    return await this.page.textContent(this.additionalDataChargesValue);
  }

  async hasExtraDataCharges() {
    const indicator = await this.page.locator(this.extraDataChargesIndicator);
    return await indicator.isVisible();
  }

  async getDataConsumptionLabel() {
    return await this.page.textContent(this.dataConsumptionLabelInvoice);
  }

  async getInvoiceDetailTrafficSection() {
    return await this.page.textContent(this.detailTrafficSection);
  }
};

module.exports = UnsoldShowroomPage;