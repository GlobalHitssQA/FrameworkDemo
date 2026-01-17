const { expect } = require('@playwright/test');

class VoiceTrafficPage {
  constructor(page) {
    this.page = page;
    
    this.provisioningSection = '[data-testid="provisioning-section"]';
    this.planSelector = '[data-testid="plan-selector"]';
    this.planOptionUnsoldShowroom = '[data-testid="plan-option-unsold-showroom"]';
    this.volteToggle = '[data-testid="volte-service-toggle"]';
    this.provisionButton = '[data-testid="provision-line-button"]';
    this.provisioningStatus = '[data-testid="provisioning-status"]';
    this.trafficSimulatorSection = '[data-testid="traffic-simulator-section"]';
    this.localVoiceMinutesInput = '[data-testid="local-voice-minutes-input"]';
    this.generateTrafficButton = '[data-testid="generate-traffic-button"]';
    this.roamingVoiceMinutesInput = '[data-testid="roaming-voice-minutes-input"]';
    this.trafficTableSection = '[data-testid="traffic-table-section"]';
    this.recordedLocalMinutes = '[data-testid="recorded-local-minutes"]';
    this.deductedIncludedMinutes = '[data-testid="deducted-included-minutes"]';
    this.excessMinutesDisplay = '[data-testid="excess-minutes-display"]';
    this.billingSection = '[data-testid="billing-section"]';
    this.excessChargesValidation = '[data-testid="excess-charges-validation"]';
    this.excessVoiceChargeAmount = '[data-testid="excess-voice-charge-amount"]';
    this.roamingRatePerMinute = '[data-testid="roaming-rate-per-minute"]';
    this.roamingMinutesCharged = '[data-testid="roaming-minutes-charged"]';
    this.roamingVoiceChargeAmount = '[data-testid="roaming-voice-charge-amount"]';
  }

  async navigateToProvisioningSection() {
    await this.page.locator(this.provisioningSection).click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectPlan(planName) {
    await this.page.locator(this.planSelector).click();
    if (planName === 'UNSOLD - SHOWROOM') {
      await this.page.locator(this.planOptionUnsoldShowroom).click();
    }
  }

  async enableVoLTEService() {
    const toggle = this.page.locator(this.volteToggle);
    const isChecked = await toggle.isChecked();
    if (!isChecked) {
      await toggle.click();
    }
  }

  async provisionLine() {
    await this.page.locator(this.provisionButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineProvisioned() {
    const status = await this.page.locator(this.provisioningStatus).textContent();
    return status.includes('UNSOLD - SHOWROOM') && status.includes('VoLTE');
  }

  async navigateToTrafficSimulator() {
    await this.page.locator(this.trafficSimulatorSection).click();
    await this.page.waitForLoadState('networkidle');
  }

  async generateLocalVoiceTraffic(minutes) {
    await this.page.locator(this.localVoiceMinutesInput).fill(String(minutes));
    await this.page.locator(this.generateTrafficButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  async generateRoamingVoiceTraffic(minutes) {
    await this.page.locator(this.roamingVoiceMinutesInput).fill(String(minutes));
    await this.page.locator(this.generateTrafficButton).click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToTrafficTable() {
    await this.page.locator(this.trafficTableSection).click();
    await this.page.waitForLoadState('networkidle');
  }

  async getRecordedLocalMinutes() {
    const text = await this.page.locator(this.recordedLocalMinutes).textContent();
    return parseInt(text, 10);
  }

  async getDeductedIncludedMinutes() {
    const text = await this.page.locator(this.deductedIncludedMinutes).textContent();
    return parseInt(text, 10);
  }

  async getExcessMinutes() {
    const text = await this.page.locator(this.excessMinutesDisplay).textContent();
    return parseInt(text, 10);
  }

  async navigateToBillingSection() {
    await this.page.locator(this.billingSection).click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateExcessCharges(excessMinutes) {
    await this.page.locator(this.excessChargesValidation).waitFor({ state: 'visible' });
  }

  async getExcessVoiceCharge() {
    const text = await this.page.locator(this.excessVoiceChargeAmount).textContent();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getRoamingRatePerMinute() {
    const text = await this.page.locator(this.roamingRatePerMinute).textContent();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getRoamingMinutesCharged() {
    const text = await this.page.locator(this.roamingMinutesCharged).textContent();
    return parseInt(text, 10);
  }

  async getRoamingVoiceCharge() {
    const text = await this.page.locator(this.roamingVoiceChargeAmount).textContent();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }
}

module.exports = VoiceTrafficPage;