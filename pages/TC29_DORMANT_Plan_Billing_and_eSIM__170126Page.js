class DormantPlanPage {
  constructor(page) {
    this.page = page;
    
    this.provisioningSection = '[data-testid="provisioning-section"]';
    this.planSelector = '[data-testid="plan-selector"]';
    this.dormantPlanOption = '[data-testid="plan-option-dormant"]';
    this.provisionButton = '[data-testid="btn-provision-line"]';
    this.noIncludesCheckbox = '[data-testid="checkbox-no-includes"]';
    this.planStatusLabel = '[data-testid="label-plan-status"]';
    this.apnListContainer = '[data-testid="apn-list-container"]';
    this.apnItem = '[data-testid^="apn-item-"]';
    
    this.consumptionSimulatorSection = '[data-testid="consumption-simulator"]';
    this.smsQuantityInput = '[data-testid="input-sms-quantity"]';
    this.voiceMinutesInput = '[data-testid="input-voice-minutes"]';
    this.dataMBInput = '[data-testid="input-data-mb"]';
    this.confirmConsumptionButton = '[data-testid="btn-confirm-consumption"]';
    
    this.consumptionDetailsSection = '[data-testid="consumption-details"]';
    this.consumptionTypeLabel = '[data-testid="label-consumption-type"]';
    this.includedAllowancesIndicator = '[data-testid="indicator-included-allowances"]';
    
    this.esimManagementSection = '[data-testid="esim-management"]';
    this.downloadESIMButton = '[data-testid="btn-download-esim"]';
    this.esimDownloadStatus = '[data-testid="label-esim-download-status"]';
    this.restrictionMessageLabel = '[data-testid="label-restriction-message"]';
    
    this.invoiceSection = '[data-testid="invoice-section"]';
    this.billingCycleSelector = '[data-testid="selector-billing-cycle"]';
    this.currentCycleOption = '[data-testid="option-current-cycle"]';
    this.smsChargesRow = '[data-testid="row-sms-charges"]';
    this.voiceChargesRow = '[data-testid="row-voice-charges"]';
    this.dataChargesRow = '[data-testid="row-data-charges"]';
    this.chargeQuantity = '[data-testid="cell-quantity"]';
    this.chargeUnitPrice = '[data-testid="cell-unit-price"]';
    this.chargeTotal = '[data-testid="cell-total"]';
    this.totalInvoiceAmount = '[data-testid="label-total-invoice"]';
    this.billingTypeLabel = '[data-testid="label-billing-type"]';
    
    this.inPoolServicesSection = '[data-testid="section-in-pool-services"]';
    this.inPoolGranelSection = '[data-testid="section-in-pool-granel"]';
    this.trafficDetailSection = '[data-testid="section-traffic-detail-sold"]';
    this.planFieldInTrafficDetail = '[data-testid="field-plan-traffic-detail"]';
  }

  async navigateToProvisioning() {
    await this.page.click(this.provisioningSection);
    await this.page.waitForSelector(this.planSelector);
  }

  async selectDormantPlan() {
    await this.page.click(this.planSelector);
    await this.page.click(this.dormantPlanOption);
  }

  async provisionLineWithoutIncludes() {
    await this.page.check(this.noIncludesCheckbox);
    await this.page.click(this.provisionButton);
    await this.page.waitForSelector(this.planStatusLabel);
  }

  async getPlanStatus() {
    return await this.page.textContent(this.planStatusLabel);
  }

  async getEnabledAPNs() {
    await this.page.waitForSelector(this.apnListContainer);
    const apnElements = await this.page.$$(this.apnItem);
    const apnList = [];
    for (const element of apnElements) {
      const text = await element.textContent();
      apnList.push(text.trim());
    }
    return apnList;
  }

  async navigateToConsumptionSimulator() {
    await this.page.click(this.consumptionSimulatorSection);
    await this.page.waitForSelector(this.smsQuantityInput);
  }

  async registerSMSConsumption(quantity) {
    await this.page.fill(this.smsQuantityInput, quantity.toString());
  }

  async registerVoiceConsumption(minutes) {
    await this.page.fill(this.voiceMinutesInput, minutes.toString());
  }

  async registerDataConsumption(megabytes) {
    await this.page.fill(this.dataMBInput, megabytes.toString());
  }

  async confirmConsumptionRegistration() {
    await this.page.click(this.confirmConsumptionButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToConsumptionDetails() {
    await this.page.click(this.consumptionDetailsSection);
    await this.page.waitForSelector(this.consumptionTypeLabel);
  }

  async getConsumptionType() {
    return await this.page.textContent(this.consumptionTypeLabel);
  }

  async hasIncludedAllowancesApplied() {
    const indicator = await this.page.$(this.includedAllowancesIndicator);
    if (!indicator) return false;
    const value = await indicator.getAttribute('data-applied');
    return value === 'true';
  }

  async navigateToESIMManagement() {
    await this.page.click(this.esimManagementSection);
    await this.page.waitForSelector(this.downloadESIMButton);
  }

  async initiateESIMDownload() {
    await this.page.click(this.downloadESIMButton);
    await this.page.waitForSelector(this.esimDownloadStatus);
  }

  async getESIMDownloadStatus() {
    return await this.page.textContent(this.esimDownloadStatus);
  }

  async getRestrictionMessage() {
    const element = await this.page.$(this.restrictionMessageLabel);
    if (!element) return null;
    const isVisible = await element.isVisible();
    if (!isVisible) return null;
    return await element.textContent();
  }

  async navigateToInvoice() {
    await this.page.click(this.invoiceSection);
    await this.page.waitForSelector(this.billingCycleSelector);
  }

  async selectCurrentBillingCycle() {
    await this.page.click(this.billingCycleSelector);
    await this.page.click(this.currentCycleOption);
    await this.page.waitForSelector(this.smsChargesRow);
  }

  async getSMSCharges() {
    const row = await this.page.$(this.smsChargesRow);
    const quantity = await row.$eval(this.chargeQuantity, el => parseFloat(el.textContent));
    const unitPrice = await row.$eval(this.chargeUnitPrice, el => parseFloat(el.textContent));
    const total = await row.$eval(this.chargeTotal, el => parseFloat(el.textContent));
    return { quantity, unitPrice, total };
  }

  async getVoiceCharges() {
    const row = await this.page.$(this.voiceChargesRow);
    const quantity = await row.$eval(this.chargeQuantity, el => parseFloat(el.textContent));
    const unitPrice = await row.$eval(this.chargeUnitPrice, el => parseFloat(el.textContent));
    const total = await row.$eval(this.chargeTotal, el => parseFloat(el.textContent));
    return { quantity, unitPrice, total };
  }

  async getDataCharges() {
    const row = await this.page.$(this.dataChargesRow);
    const quantity = await row.$eval(this.chargeQuantity, el => parseFloat(el.textContent));
    const total = await row.$eval(this.chargeTotal, el => parseFloat(el.textContent));
    return { quantity, total };
  }

  async getTotalInvoiceAmount() {
    const text = await this.page.textContent(this.totalInvoiceAmount);
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getBillingType() {
    return await this.page.textContent(this.billingTypeLabel);
  }
}

module.exports = DormantPlanPage;