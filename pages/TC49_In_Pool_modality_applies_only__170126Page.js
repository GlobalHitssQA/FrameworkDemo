const { expect } = require('@playwright/test');

class BillingPage {
  constructor(page) {
    this.page = page;
    this.planSelector = '[data-testid="plan-selector"]';
    this.soldPlanOption = '[data-testid="plan-option-sold"]';
    this.apn1LocalInput = '[data-testid="apn1-local-consumption-input"]';
    this.apn1RoamingInput = '[data-testid="apn1-roaming-consumption-input"]';
    this.apn4LocalInput = '[data-testid="apn4-local-consumption-input"]';
    this.apn4RoamingInput = '[data-testid="apn4-roaming-consumption-input"]';
    this.executeShellButton = '[data-testid="execute-billing-shell-button"]';
    this.udrTableContainer = '[data-testid="udr-lt-01-table"]';
    this.trafficLocalColumn = '[data-testid="traffic-local-column"]';
    this.trafficRoamingColumn = '[data-testid="traffic-roaming-column"]';
    this.inPoolSummarizationValue = '[data-testid="in-pool-summarization-value"]';
    this.roamingTotalValue = '[data-testid="roaming-total-value"]';
    this.roamingRateValue = '[data-testid="roaming-billing-rate"]';
    this.inPoolOCCSection = '[data-testid="occ-in-pool-section"]';
    this.roamingOCCSection = '[data-testid="occ-roaming-section"]';
    this.saveConfigButton = '[data-testid="save-configuration-button"]';
    this.shellExecutionStatus = '[data-testid="shell-execution-status"]';
  }

  async navigateToBillingSystem() {
    await this.page.goto('/billing/bscs7');
    await this.page.waitForLoadState('networkidle');
  }

  async selectSOLDPlan() {
    await this.page.click(this.planSelector);
    await this.page.click(this.soldPlanOption);
  }

  async configureAPN1Traffic(localMB, roamingMB) {
    await this.page.fill(this.apn1LocalInput, String(localMB));
    await this.page.fill(this.apn1RoamingInput, String(roamingMB));
  }

  async configureAPN4Traffic(localMB, roamingMB) {
    await this.page.fill(this.apn4LocalInput, String(localMB));
    await this.page.fill(this.apn4RoamingInput, String(roamingMB));
    await this.page.click(this.saveConfigButton);
  }

  async executeBillingCalculationShell() {
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.shellExecutionStatus);
    await this.page.waitForFunction(
      (selector) => document.querySelector(selector)?.textContent?.includes('Completed'),
      this.shellExecutionStatus,
      { timeout: 60000 }
    );
  }

  async verifyTrafficRegisteredInUDR() {
    const tableVisible = await this.page.isVisible(this.udrTableContainer);
    const localColumnVisible = await this.page.isVisible(this.trafficLocalColumn);
    const roamingColumnVisible = await this.page.isVisible(this.trafficRoamingColumn);
    return tableVisible && localColumnVisible && roamingColumnVisible;
  }

  async verifyTrafficSeparation() {
    const localTraffic = await this.page.textContent(this.trafficLocalColumn);
    const roamingTraffic = await this.page.textContent(this.trafficRoamingColumn);
    return localTraffic !== null && roamingTraffic !== null && localTraffic !== roamingTraffic;
  }

  async getInPoolSummarization() {
    const value = await this.page.textContent(this.inPoolSummarizationValue);
    return parseInt(value.replace(/[^0-9]/g, ''), 10);
  }

  async verifyRoamingExcludedFromInPool() {
    const inPoolSection = await this.page.textContent(this.inPoolOCCSection);
    return !inPoolSection.toLowerCase().includes('roaming');
  }

  async getRoamingTrafficTotal() {
    const value = await this.page.textContent(this.roamingTotalValue);
    return parseInt(value.replace(/[^0-9]/g, ''), 10);
  }

  async getRoamingBillingRate() {
    const value = await this.page.textContent(this.roamingRateValue);
    return parseFloat(value.replace(/[^0-9.]/g, ''));
  }

  async verifyInPoolOCCGenerated() {
    return await this.page.isVisible(this.inPoolOCCSection);
  }

  async verifyRoamingOCCGenerated() {
    return await this.page.isVisible(this.roamingOCCSection);
  }
}

module.exports = BillingPage;