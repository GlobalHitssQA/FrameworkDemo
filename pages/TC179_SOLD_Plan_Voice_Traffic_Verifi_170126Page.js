class SoldPlanPage {
  constructor(page) {
    this.page = page;
    
    // Provisioning section locators
    this.provisioningSectionBtn = '[data-testid="provisioning-section-btn"]';
    this.soldPlanSelector = '[data-testid="sold-plan-selector"]';
    this.lineNumberInput = '[data-testid="line-number-input"]';
    this.volteServiceToggle = '[data-testid="volte-service-toggle"]';
    this.provisionBtn = '[data-testid="provision-line-btn"]';
    this.provisionedStatusLabel = '[data-testid="provisioned-status-label"]';
    this.includedMinutesDisplay = '[data-testid="included-voice-minutes-display"]';
    
    // Traffic generation locators
    this.trafficGenerationSection = '[data-testid="traffic-generation-section"]';
    this.localVoiceMinutesInput = '[data-testid="local-voice-minutes-input"]';
    this.roamingVoiceMinutesInput = '[data-testid="roaming-voice-minutes-input"]';
    this.generateTrafficBtn = '[data-testid="generate-traffic-btn"]';
    
    // Traffic table locators
    this.trafficTableSection = '[data-testid="traffic-table-section"]';
    this.registeredLocalMinutesCell = '[data-testid="registered-local-minutes"]';
    this.registeredRoamingMinutesCell = '[data-testid="registered-roaming-minutes"]';
    this.bulkRateChargedMinutesCell = '[data-testid="bulk-rate-charged-minutes"]';
    this.deductedIncludedMinutesCell = '[data-testid="deducted-included-minutes"]';
    
    // Billing section locators
    this.billingDetailsSection = '[data-testid="billing-details-section"]';
    this.localVoiceChargeCell = '[data-testid="local-voice-charge"]';
    this.roamingVoiceChargeCell = '[data-testid="roaming-voice-charge"]';
    this.planDetailSection = '[data-testid="plan-detail-sold-section"]';
  }

  async navigateToProvisioningSection() {
    await this.page.click(this.provisioningSectionBtn);
    await this.page.waitForSelector(this.soldPlanSelector);
  }

  async provisionLineWithSoldPlan() {
    await this.page.click(this.soldPlanSelector);
    await this.page.selectOption(this.soldPlanSelector, { label: 'SOLD' });
    await this.page.click(this.provisionBtn);
    await this.page.waitForSelector(this.provisionedStatusLabel);
  }

  async enableVoLTEService() {
    const isChecked = await this.page.isChecked(this.volteServiceToggle);
    if (!isChecked) {
      await this.page.click(this.volteServiceToggle);
    }
  }

  async verifyLineProvisioned() {
    const statusText = await this.page.textContent(this.provisionedStatusLabel);
    return statusText.includes('Provisioned') || statusText.includes('Active');
  }

  async getIncludedVoiceMinutes() {
    const minutesText = await this.page.textContent(this.includedMinutesDisplay);
    return parseInt(minutesText, 10) || 0;
  }

  async navigateToTrafficGeneration() {
    await this.page.click(this.trafficGenerationSection);
    await this.page.waitForSelector(this.localVoiceMinutesInput);
  }

  async generateLocalVoiceTraffic(minutes) {
    await this.page.fill(this.localVoiceMinutesInput, minutes.toString());
    await this.page.click(this.generateTrafficBtn);
    await this.page.waitForLoadState('networkidle');
  }

  async generateRoamingVoiceTraffic(minutes) {
    await this.page.fill(this.roamingVoiceMinutesInput, minutes.toString());
    await this.page.click(this.generateTrafficBtn);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToTrafficTable() {
    await this.page.click(this.trafficTableSection);
    await this.page.waitForSelector(this.registeredLocalMinutesCell);
  }

  async getRegisteredLocalMinutes() {
    const minutesText = await this.page.textContent(this.registeredLocalMinutesCell);
    return parseInt(minutesText, 10);
  }

  async getRegisteredRoamingMinutes() {
    const minutesText = await this.page.textContent(this.registeredRoamingMinutesCell);
    return parseInt(minutesText, 10);
  }

  async getBulkRateChargedMinutes() {
    const minutesText = await this.page.textContent(this.bulkRateChargedMinutesCell);
    return parseInt(minutesText, 10);
  }

  async getDeductedIncludedMinutes() {
    const minutesText = await this.page.textContent(this.deductedIncludedMinutesCell);
    return parseInt(minutesText, 10) || 0;
  }

  async getLocalVoiceCharge() {
    await this.page.click(this.billingDetailsSection);
    const chargeText = await this.page.textContent(this.localVoiceChargeCell);
    const numericValue = chargeText.replace(/[^0-9.]/g, '');
    return parseFloat(numericValue);
  }

  async getRoamingVoiceCharge() {
    const chargeText = await this.page.textContent(this.roamingVoiceChargeCell);
    const numericValue = chargeText.replace(/[^0-9.]/g, '');
    return parseFloat(numericValue);
  }
}

module.exports = SoldPlanPage;