const { expect } = require('@playwright/test');

class BillingPage {
  constructor(page) {
    this.page = page;
    
    this.systemStatusIndicator = page.locator('[data-testid="system-status-indicator"]');
    this.soldPlanConfigSection = page.locator('[data-testid="sold-plan-config"]');
    this.bulkRateConfigField = page.locator('[data-testid="bulk-rate-config"]');
    this.activeLinesTable = page.locator('[data-testid="active-lines-table"]');
    this.apnConfigurationForm = page.locator('[data-testid="apn-configuration-form"]');
    this.apnSelector = page.locator('[data-testid="apn-selector"]');
    this.apnNameInput = page.locator('[data-testid="apn-name-input"]');
    this.consumptionMbInput = page.locator('[data-testid="consumption-mb-input"]');
    this.saveApnConfigButton = page.locator('[data-testid="save-apn-config-btn"]');
    this.udrTableSection = page.locator('[data-testid="udr-lt-01-table"]');
    this.totalTrafficValue = page.locator('[data-testid="total-traffic-value"]');
    this.billingProcessButton = page.locator('[data-testid="execute-billing-process-btn"]');
    this.billingProcessStatus = page.locator('[data-testid="billing-process-status"]');
    this.rateVerificationSection = page.locator('[data-testid="rate-verification-section"]');
    this.appliedBulkRateValue = page.locator('[data-testid="applied-bulk-rate"]');
    this.consumedMegabytesValue = page.locator('[data-testid="consumed-megabytes"]');
    this.bulkTrafficTotalField = page.locator('[data-testid="bulk-traffic-total"]');
    this.calculateTotalButton = page.locator('[data-testid="calculate-total-btn"]');
    this.additionalServicesSection = page.locator('[data-testid="additional-services-section"]');
    this.bulkTrafficConceptRow = page.locator('[data-testid="bulk-traffic-concept-row"]');
    this.bulkTrafficMbValue = page.locator('[data-testid="bulk-traffic-mb"]');
    this.bulkTrafficAmountValue = page.locator('[data-testid="bulk-traffic-amount"]');
    this.soldTrafficDetailSection = page.locator('[data-testid="sold-traffic-detail-section"]');
    this.inPoolConceptsSection = page.locator('[data-testid="in-pool-concepts-section"]');
    this.standardTrafficDetailSection = page.locator('[data-testid="standard-traffic-detail-section"]');
    this.apn2TrafficRow = page.locator('[data-testid="apn2-traffic-row"]');
    this.apn5TrafficRow = page.locator('[data-testid="apn5-traffic-row"]');
    this.apn6TrafficRow = page.locator('[data-testid="apn6-traffic-row"]');
  }

  async navigateToSystem() {
    await this.page.goto('/bscs7/billing');
    await this.page.waitForLoadState('networkidle');
  }

  async verifySystemOperational() {
    await expect(this.systemStatusIndicator).toBeVisible();
    const status = await this.systemStatusIndicator.textContent();
    expect(status).toContain('Operational');
  }

  async verifySoldPlanConfigured() {
    await expect(this.soldPlanConfigSection).toBeVisible();
  }

  async verifyBulkRateConfiguration(expectedRate) {
    await expect(this.bulkRateConfigField).toBeVisible();
    const rateText = await this.bulkRateConfigField.textContent();
    expect(parseFloat(rateText)).toBe(expectedRate);
  }

  async verifyActiveLinesInSoldPlan() {
    await expect(this.activeLinesTable).toBeVisible();
    const rowCount = await this.activeLinesTable.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThan(0);
  }

  async configureApnConsumption(apnNumber, apnName, megabytes) {
    await this.apnConfigurationForm.waitFor({ state: 'visible' });
    await this.apnSelector.selectOption(apnNumber);
    await this.apnNameInput.fill(apnName);
    await this.consumptionMbInput.fill(megabytes.toString());
    await this.saveApnConfigButton.click();
    await this.page.waitForResponse(response => response.url().includes('/api/apn-config') && response.status() === 200);
  }

  async getRegisteredTrafficFromUdrTable() {
    await expect(this.udrTableSection).toBeVisible();
    const totalText = await this.totalTrafficValue.textContent();
    return parseInt(totalText.replace(/[^0-9]/g, ''), 10);
  }

  async executeBillingProcess() {
    await this.billingProcessButton.click();
    await this.billingProcessStatus.waitFor({ state: 'visible' });
    await expect(this.billingProcessStatus).toContainText('Completed');
  }

  async verifyTrafficProcessedWithBulkRate() {
    const statusText = await this.billingProcessStatus.textContent();
    expect(statusText).toContain('Bulk Rate Applied');
  }

  async openRateVerificationSection() {
    await this.rateVerificationSection.click();
    await this.rateVerificationSection.waitFor({ state: 'visible' });
  }

  async getAppliedBulkRate() {
    const rateText = await this.appliedBulkRateValue.textContent();
    return parseFloat(rateText);
  }

  async getConsumedMegabytes() {
    const mbText = await this.consumedMegabytesValue.textContent();
    return parseInt(mbText.replace(/[^0-9]/g, ''), 10);
  }

  async calculateBulkTrafficTotal() {
    await this.calculateTotalButton.click();
    await this.bulkTrafficTotalField.waitFor({ state: 'visible' });
  }

  async getBulkTrafficTotalAmount() {
    const totalText = await this.bulkTrafficTotalField.textContent();
    return parseFloat(totalText.replace(/[^0-9.]/g, ''));
  }

  async navigateToAdditionalServicesSection() {
    await this.additionalServicesSection.scrollIntoViewIfNeeded();
    await expect(this.additionalServicesSection).toBeVisible();
  }

  async verifyBulkTrafficInAdditionalServices(expectedMb, expectedAmount) {
    await expect(this.bulkTrafficConceptRow).toBeVisible();
    const mbText = await this.bulkTrafficMbValue.textContent();
    const amountText = await this.bulkTrafficAmountValue.textContent();
    const actualMb = parseInt(mbText.replace(/[^0-9]/g, ''), 10);
    const actualAmount = parseFloat(amountText.replace(/[^0-9.]/g, ''));
    return actualMb === expectedMb && Math.abs(actualAmount - expectedAmount) < 0.01;
  }

  async navigateToSoldTrafficDetailSection() {
    await this.soldTrafficDetailSection.scrollIntoViewIfNeeded();
  }

  async verifyTrafficExcludedFromSoldDetail() {
    const apn2InSold = await this.soldTrafficDetailSection.locator('[data-testid="apn2-traffic-row"]').count();
    const apn5InSold = await this.soldTrafficDetailSection.locator('[data-testid="apn5-traffic-row"]').count();
    const apn6InSold = await this.soldTrafficDetailSection.locator('[data-testid="apn6-traffic-row"]').count();
    const inPoolCount = await this.inPoolConceptsSection.locator('[data-testid*="apn"]').count();
    return apn2InSold === 0 && apn5InSold === 0 && apn6InSold === 0 && inPoolCount === 0;
  }

  async verifyTrafficInStandardDetailWithBulkRate() {
    await this.standardTrafficDetailSection.scrollIntoViewIfNeeded();
    const apn2Visible = await this.standardTrafficDetailSection.locator('[data-testid="apn2-traffic-row"]').isVisible();
    const apn5Visible = await this.standardTrafficDetailSection.locator('[data-testid="apn5-traffic-row"]').isVisible();
    const apn6Visible = await this.standardTrafficDetailSection.locator('[data-testid="apn6-traffic-row"]').isVisible();
    return apn2Visible && apn5Visible && apn6Visible;
  }
}

module.exports = BillingPage;