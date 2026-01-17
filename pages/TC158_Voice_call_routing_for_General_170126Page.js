class VoiceRoutingPage {
  constructor(page) {
    this.page = page;
    
    this.provisioningSystemUrl = '/bscs7/provisioning';
    this.callSimulatorUrl = '/red/call-simulator';
    this.consumptionRecordsUrl = '/bscs7/consumption-records';
    this.invoiceSectionUrl = '/bscs7/invoice';
    
    this.ratePlanSelector = '[data-testid="rateplan-selector"]';
    this.includedMinutesInput = '[data-testid="included-voice-minutes-input"]';
    this.provisionLineButton = '[data-testid="provision-line-button"]';
    this.includedMinutesDisplay = '[data-testid="included-voice-minutes-display"]';
    
    this.callDurationInput = '[data-testid="call-duration-input"]';
    this.callTypeSelector = '[data-testid="call-type-selector"]';
    this.makeCallButton = '[data-testid="make-call-button"]';
    this.callStatusDisplay = '[data-testid="call-status-display"]';
    this.routingSystemDisplay = '[data-testid="routing-system-display"]';
    
    this.additionalChargeDisplay = '[data-testid="additional-charge-amount"]';
    this.includedBalanceIndicator = '[data-testid="deducted-from-included-indicator"]';
    this.appliedBulkRateDisplay = '[data-testid="applied-bulk-rate"]';
    this.includedMinutesUsedDisplay = '[data-testid="included-minutes-used"]';
    
    this.additionalLocalVoiceTrafficSection = '[data-testid="additional-local-voice-traffic-section"]';
    this.includedMinutesConsumedDisplay = '[data-testid="included-minutes-consumed"]';
    this.excessMinutesBilledDisplay = '[data-testid="excess-minutes-billed"]';
    this.bulkRateAppliedDisplay = '[data-testid="bulk-rate-applied"]';
    
    this.planFieldInTrafficDetail = '[data-testid="plan-field-traffic-detail"]';
    this.inPoolServicesSection = '[data-testid="in-pool-services-section"]';
    this.inPoolBulkServicesSection = '[data-testid="in-pool-bulk-services-section"]';
    this.trafficDetailSoldSection = '[data-testid="traffic-detail-sold-section"]';
  }

  async navigateToProvisioningSystem() {
    await this.page.goto(this.provisioningSystemUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToCallSimulator() {
    await this.page.goto(this.callSimulatorUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToConsumptionRecords() {
    await this.page.goto(this.consumptionRecordsUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToInvoiceSection() {
    await this.page.goto(this.invoiceSectionUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLineWithRatePlan(ratePlan, includedMinutes) {
    await this.page.click(this.ratePlanSelector);
    await this.page.selectOption(this.ratePlanSelector, ratePlan);
    await this.page.fill(this.includedMinutesInput, includedMinutes.toString());
    await this.page.click(this.provisionLineButton);
    await this.page.waitForSelector(this.includedMinutesDisplay);
  }

  async getIncludedVoiceMinutes() {
    const text = await this.page.textContent(this.includedMinutesDisplay);
    return parseInt(text, 10);
  }

  async makeLocalVoiceCall(durationMinutes) {
    await this.page.selectOption(this.callTypeSelector, 'LOCAL');
    await this.page.fill(this.callDurationInput, durationMinutes.toString());
    await this.page.click(this.makeCallButton);
    await this.page.waitForSelector(this.callStatusDisplay);
  }

  async consumeAllIncludedMinutes(totalMinutes) {
    await this.page.selectOption(this.callTypeSelector, 'LOCAL');
    await this.page.fill(this.callDurationInput, totalMinutes.toString());
    await this.page.click(this.makeCallButton);
    await this.page.waitForSelector(this.callStatusDisplay);
  }

  async getCallStatus() {
    return await this.page.textContent(this.callStatusDisplay);
  }

  async getRoutingSystemUsed() {
    return await this.page.textContent(this.routingSystemDisplay);
  }

  async getAdditionalChargeAmount() {
    const text = await this.page.textContent(this.additionalChargeDisplay);
    return parseFloat(text);
  }

  async isDeductedFromIncludedBalance() {
    const indicator = await this.page.textContent(this.includedBalanceIndicator);
    return indicator === 'true' || indicator === 'YES';
  }

  async getAppliedBulkRate() {
    const text = await this.page.textContent(this.appliedBulkRateDisplay);
    return parseFloat(text);
  }

  async getIncludedMinutesUsed() {
    const text = await this.page.textContent(this.includedMinutesUsedDisplay);
    return parseInt(text, 10);
  }

  async isAdditionalLocalVoiceTrafficSectionVisible() {
    return await this.page.isVisible(this.additionalLocalVoiceTrafficSection);
  }

  async getLocalCallsInvoiceDetails() {
    const includedMinutesConsumed = await this.page.textContent(this.includedMinutesConsumedDisplay);
    const excessMinutesBilled = await this.page.textContent(this.excessMinutesBilledDisplay);
    const bulkRateApplied = await this.page.textContent(this.bulkRateAppliedDisplay);
    
    return {
      includedMinutesConsumed: parseInt(includedMinutesConsumed, 10),
      excessMinutesBilled: parseInt(excessMinutesBilled, 10),
      bulkRateApplied: parseFloat(bulkRateApplied)
    };
  }
}

module.exports = VoiceRoutingPage;