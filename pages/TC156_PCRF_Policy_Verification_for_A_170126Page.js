const { expect } = require('@playwright/test');

class PCRFPolicyPage {
  constructor(page) {
    this.page = page;
    
    this.instantLinkUrl = '/instant-link';
    this.pcrfConsoleUrl = '/pcrf-console';
    
    this.lineProvisioningSection = '[data-testid="line-provisioning-section"]';
    this.soldRateplanIndicator = '[data-testid="rateplan-sold-indicator"]';
    this.testingRateplanIndicator = '[data-testid="rateplan-testing-indicator"]';
    
    this.apnPoliciesTable = '[data-testid="apn-policies-table"]';
    this.apnPolicyRow = (apn) => `[data-testid="policy-row-${apn.toLowerCase()}"]`;
    this.apnModalityCell = (apn) => `[data-testid="modality-${apn.toLowerCase()}"]`;
    this.apnStatusCell = (apn) => `[data-testid="status-${apn.toLowerCase()}"]`;
    
    this.provisioningButton = '[data-testid="btn-execute-provisioning"]';
    this.inPoolConfigCheckbox = '[data-testid="checkbox-in-pool-config"]';
    this.apnSelectionDropdown = '[data-testid="dropdown-apn-selection"]';
    this.apnOption = (apn) => `[data-testid="option-${apn.toLowerCase()}"]`;
    
    this.policyVerificationTab = '[data-testid="tab-policy-verification"]';
    this.activePoliciesContainer = '[data-testid="active-policies-container"]';
    this.telemetryPoliciesSection = '[data-testid="section-telemetry-policies"]';
    this.navigationPoliciesSection = '[data-testid="section-navigation-policies"]';
    this.inPoolRateLabel = '[data-testid="label-in-pool-rate"]';
    this.bulkRateLabel = '[data-testid="label-bulk-rate"]';
    
    this.trafficSimulatorTab = '[data-testid="tab-traffic-simulator"]';
    this.apnTrafficInput = '[data-testid="input-apn-traffic"]';
    this.trafficTypeDropdown = '[data-testid="dropdown-traffic-type"]';
    this.generateTrafficButton = '[data-testid="btn-generate-traffic"]';
    
    this.trafficRecordsTable = '[data-testid="traffic-records-table"]';
    this.trafficRecordRow = (apn) => `[data-testid="traffic-record-${apn.toLowerCase()}"]`;
    this.trafficPolicyCell = '[data-testid="cell-traffic-policy"]';
    this.trafficRateCell = '[data-testid="cell-traffic-rate"]';
    this.poolDeductionIndicator = '[data-testid="indicator-pool-deduction"]';
    
    this.inPoolQuotaStatus = '[data-testid="quota-status-in-pool"]';
    this.exhaustQuotaButton = '[data-testid="btn-exhaust-quota"]';
    this.excessTrafficSection = '[data-testid="section-excess-traffic"]';
    this.excessRateDisplay = '[data-testid="display-excess-rate"]';
    
    this.rateplanSwitcher = '[data-testid="switcher-rateplan"]';
    this.testingRateplanOption = '[data-testid="option-testing-rateplan"]';
    this.blockedTrafficIndicator = (apn) => `[data-testid="blocked-${apn.toLowerCase()}"]`;
  }

  async navigateToInstantLink() {
    await this.page.goto(this.instantLinkUrl);
    await this.page.waitForSelector(this.lineProvisioningSection);
  }

  async verifyLineProvisionedWithSOLDRateplan() {
    await this.page.waitForSelector(this.soldRateplanIndicator);
    const isVisible = await this.page.isVisible(this.soldRateplanIndicator);
    return isVisible;
  }

  async navigateToPCRFConsole() {
    await this.page.goto(this.pcrfConsoleUrl);
    await this.page.waitForSelector(this.apnPoliciesTable);
  }

  async verifyAPNPoliciesConfigured() {
    await this.page.waitForSelector(this.apnPoliciesTable);
    const tableVisible = await this.page.isVisible(this.apnPoliciesTable);
    return tableVisible;
  }

  async executeProvisioningWithInPoolConfig(apn1, apn2) {
    await this.page.click(this.inPoolConfigCheckbox);
    await this.page.click(this.apnSelectionDropdown);
    await this.page.click(this.apnOption(apn1));
    await this.page.click(this.apnOption(apn2));
    await this.page.click(this.provisioningButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getPolicyModalityForAPN(apn) {
    await this.page.waitForSelector(this.apnModalityCell(apn));
    const modality = await this.page.textContent(this.apnModalityCell(apn));
    return modality.trim();
  }

  async navigateToPolicyVerificationSection() {
    await this.page.click(this.policyVerificationTab);
    await this.page.waitForSelector(this.activePoliciesContainer);
  }

  async loadActivePolicies() {
    await this.page.waitForSelector(this.activePoliciesContainer);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTelemetryPoliciesWithInPoolRate() {
    const sectionVisible = await this.page.isVisible(this.telemetryPoliciesSection);
    const inPoolLabelVisible = await this.page.isVisible(this.inPoolRateLabel);
    return sectionVisible && inPoolLabelVisible;
  }

  async verifyNavigationPoliciesWithBulkRate() {
    const sectionVisible = await this.page.isVisible(this.navigationPoliciesSection);
    const bulkLabelVisible = await this.page.isVisible(this.bulkRateLabel);
    return sectionVisible && bulkLabelVisible;
  }

  async navigateToTrafficSimulator() {
    await this.page.click(this.trafficSimulatorTab);
    await this.page.waitForSelector(this.apnTrafficInput);
  }

  async generateTrafficForAPN(apn, trafficType) {
    await this.page.fill(this.apnTrafficInput, apn);
    await this.page.click(this.trafficTypeDropdown);
    await this.page.click(`[data-testid="option-${trafficType}"]`);
    await this.page.click(this.generateTrafficButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getTrafficRecordForAPN(apn) {
    await this.page.waitForSelector(this.trafficRecordRow(apn));
    const row = this.page.locator(this.trafficRecordRow(apn));
    const policy = await row.locator(this.trafficPolicyCell).textContent();
    const rateText = await row.locator(this.trafficRateCell).textContent();
    const poolDeduction = await row.locator(this.poolDeductionIndicator).isVisible();
    return {
      policy: policy.trim(),
      ratePerMB: parseFloat(rateText),
      poolDeduction: poolDeduction
    };
  }

  async exhaustInPoolQuota() {
    await this.page.click(this.exhaustQuotaButton);
    await this.page.waitForSelector(`${this.inPoolQuotaStatus}:has-text("exhausted")`);
  }

  async getInPoolQuotaStatus() {
    const statusText = await this.page.textContent(this.inPoolQuotaStatus);
    return statusText.trim().toLowerCase();
  }

  async getExcessTrafficRecord(apn) {
    await this.page.waitForSelector(this.excessTrafficSection);
    const rateText = await this.page.textContent(this.excessRateDisplay);
    return {
      ratePerMB: parseFloat(rateText)
    };
  }

  async switchToTestingRateplan() {
    await this.page.click(this.rateplanSwitcher);
    await this.page.click(this.testingRateplanOption);
    await this.page.waitForSelector(this.testingRateplanIndicator);
  }

  async isAPNPolicyActive(apn) {
    const statusText = await this.page.textContent(this.apnStatusCell(apn));
    return statusText.trim().toLowerCase() === 'active';
  }

  async isAPNTrafficBlocked(apn) {
    const blockedIndicator = await this.page.isVisible(this.blockedTrafficIndicator(apn));
    return blockedIndicator;
  }
}

module.exports = PCRFPolicyPage;