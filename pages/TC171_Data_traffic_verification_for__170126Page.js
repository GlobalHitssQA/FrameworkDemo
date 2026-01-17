class UnsoldShowroomPage {
  constructor(page) {
    this.page = page;
    this.provisioningSectionLink = page.locator('[data-testid="provisioning-section-link"]');
    this.planSelector = page.locator('[data-testid="plan-selector"]');
    this.planOption = (planName) => page.locator(`[data-testid="plan-option-${planName.replace(/\s+/g, '-').toLowerCase()}"]`);
    this.apnCheckbox = (apnName) => page.locator(`[data-testid="apn-checkbox-${apnName.toLowerCase()}"]`);
    this.confirmProvisioningButton = page.locator('[data-testid="confirm-provisioning-btn"]');
    this.provisioningStatusLabel = page.locator('[data-testid="provisioning-status"]');
    this.trafficSimulationLink = page.locator('[data-testid="traffic-simulation-link"]');
    this.dataConsumptionInput = page.locator('[data-testid="data-consumption-input"]');
    this.apnSourceSelector = page.locator('[data-testid="apn-source-selector"]');
    this.generateTrafficButton = page.locator('[data-testid="generate-traffic-btn"]');
    this.udrTableLink = page.locator('[data-testid="udr-table-link"]');
    this.recordedConsumptionValue = page.locator('[data-testid="recorded-consumption-value"]');
    this.includedMBUsedValue = page.locator('[data-testid="included-mb-used"]');
    this.excessMBValue = page.locator('[data-testid="excess-mb-value"]');
    this.appliedBulkRateValue = page.locator('[data-testid="applied-bulk-rate"]');
    this.totalExcessChargeValue = page.locator('[data-testid="total-excess-charge"]');
  }

  async navigateToProvisioningSection() {
    await this.provisioningSectionLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectPlan(planName) {
    await this.planSelector.click();
    await this.planOption(planName).click();
  }

  async configureProductiveAPNs(apnList) {
    for (const apn of apnList) {
      await this.apnCheckbox(apn).check();
    }
  }

  async confirmProvisioning() {
    await this.confirmProvisioningButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getProvisioningStatus() {
    return await this.provisioningStatusLabel.textContent();
  }

  async navigateToTrafficSimulation() {
    await this.trafficSimulationLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async enterDataConsumption(mbAmount) {
    await this.dataConsumptionInput.fill(mbAmount);
  }

  async selectAPNSource(sourceType) {
    await this.apnSourceSelector.selectOption(sourceType);
  }

  async generateTraffic() {
    await this.generateTrafficButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToUDRTable() {
    await this.udrTableLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getRecordedConsumption() {
    return await this.recordedConsumptionValue.textContent();
  }

  async getIncludedMBUsed() {
    return await this.includedMBUsedValue.textContent();
  }

  async getExcessMB() {
    return await this.excessMBValue.textContent();
  }

  async getAppliedBulkRate() {
    return await this.appliedBulkRateValue.textContent();
  }

  async getTotalExcessCharge() {
    return await this.totalExcessChargeValue.textContent();
  }
}

module.exports = UnsoldShowroomPage;