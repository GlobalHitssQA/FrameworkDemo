const { expect } = require('@playwright/test');

class InPoolTrafficPage {
  constructor(page) {
    this.page = page;
    
    this.systemStatusIndicator = '[data-testid="system-status-indicator"]';
    this.lineConfigurationSection = '[data-testid="line-configuration-section"]';
    this.soldPlanSelector = '[data-testid="sold-plan-selector"]';
    this.udrTrafficTable = '[data-testid="udr-lt-01-traffic-table"]';
    this.apnTrafficInput = '[data-testid="apn-traffic-input"]';
    this.apnNameField = '[data-testid="apn-name-field"]';
    this.apnMbField = '[data-testid="apn-mb-field"]';
    this.saveTrafficButton = '[data-testid="save-traffic-btn"]';
    this.executeShellButton = '[data-testid="execute-shell-btn"]';
    this.shellExecutionStatus = '[data-testid="shell-execution-status"]';
    this.inPoolCalculationResult = '[data-testid="in-pool-calculation-result"]';
    this.identifiedAPNsList = '[data-testid="identified-apns-list"]';
    this.totalInPoolTrafficDisplay = '[data-testid="total-in-pool-traffic"]';
    this.excludedTrafficDisplay = '[data-testid="excluded-traffic-total"]';
    this.occInPoolSection = '[data-testid="occ-in-pool-section"]';
    this.occBulkSection = '[data-testid="occ-bulk-section"]';
    this.occInPoolAPNs = '[data-testid="occ-in-pool-apns"]';
    this.occBulkAPNs = '[data-testid="occ-bulk-apns"]';
    this.trafficRegistrationConfirmation = '[data-testid="traffic-registration-confirmation"]';
  }

  async navigateToSystem() {
    await this.page.goto('/bscs7/lifecycle-gm');
    await this.page.waitForLoadState('networkidle');
  }

  async verifySystemOperational() {
    await this.page.waitForSelector(this.systemStatusIndicator);
    const statusText = await this.page.textContent(this.systemStatusIndicator);
    return statusText.toLowerCase().includes('operational') || statusText.toLowerCase().includes('active');
  }

  async navigateToLineConfiguration() {
    await this.page.click(this.lineConfigurationSection);
    await this.page.waitForSelector(this.soldPlanSelector);
  }

  async verifyLinesInSoldPlan() {
    const soldPlanElement = await this.page.locator(this.soldPlanSelector);
    return await soldPlanElement.isVisible();
  }

  async configureTrafficForAPNs(trafficData) {
    for (const traffic of trafficData) {
      await this.page.click(this.apnTrafficInput);
      await this.page.fill(`${this.apnNameField}[data-apn="${traffic.apn}"]`, traffic.apnName);
      await this.page.fill(`${this.apnMbField}[data-apn="${traffic.apn}"]`, traffic.mb.toString());
    }
    await this.page.click(this.saveTrafficButton);
    await this.page.waitForSelector(this.trafficRegistrationConfirmation);
  }

  async verifyTrafficRegisteredInUDR() {
    const confirmationElement = await this.page.locator(this.trafficRegistrationConfirmation);
    return await confirmationElement.isVisible();
  }

  async executeInPoolCalculationShell() {
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.shellExecutionStatus);
  }

  async verifyShellExecutionComplete() {
    const statusText = await this.page.textContent(this.shellExecutionStatus);
    return statusText.toLowerCase().includes('complete') || statusText.toLowerCase().includes('success');
  }

  async getIdentifiedInPoolAPNs() {
    await this.page.waitForSelector(this.identifiedAPNsList);
    const apnsText = await this.page.textContent(this.identifiedAPNsList);
    return apnsText.split(',').map(apn => apn.trim());
  }

  async getTotalInPoolTraffic() {
    const trafficText = await this.page.textContent(this.totalInPoolTrafficDisplay);
    return parseInt(trafficText.replace(/[^0-9]/g, ''), 10);
  }

  async getExcludedTrafficTotal() {
    const excludedText = await this.page.textContent(this.excludedTrafficDisplay);
    return parseInt(excludedText.replace(/[^0-9]/g, ''), 10);
  }

  async verifyExcludedAPNsNotInPool() {
    const inPoolAPNs = await this.getIdentifiedInPoolAPNs();
    const excludedAPNs = ['APN2', 'APN5', 'APN6'];
    return excludedAPNs.some(apn => inPoolAPNs.includes(apn));
  }

  async getInPoolOCC() {
    const occElement = await this.page.locator(this.occInPoolSection);
    return await occElement.isVisible();
  }

  async getBulkTrafficOCC() {
    const occElement = await this.page.locator(this.occBulkSection);
    return await occElement.isVisible();
  }

  async getOCCInPoolAPNs() {
    const apnsText = await this.page.textContent(this.occInPoolAPNs);
    return apnsText.split(',').map(apn => apn.trim());
  }

  async getOCCBulkAPNs() {
    const apnsText = await this.page.textContent(this.occBulkAPNs);
    return apnsText.split(',').map(apn => apn.trim());
  }
}

module.exports = InPoolTrafficPage;