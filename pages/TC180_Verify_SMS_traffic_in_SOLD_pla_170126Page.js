const { expect } = require('@playwright/test');

class SoldPlanSmsPage {
  constructor(page) {
    this.page = page;
    
    // Provisioning section locators
    this.provisioningMenuBtn = page.locator('[data-testid="provisioning-menu"]');
    this.soldPlanSelector = page.locator('[data-testid="sold-plan-selector"]');
    this.lineNumberInput = page.locator('[data-testid="line-number-input"]');
    this.provisionBtn = page.locator('[data-testid="provision-line-btn"]');
    this.smsServiceToggle = page.locator('[data-testid="sms-service-toggle"]');
    this.smsServiceStatus = page.locator('[data-testid="sms-service-status"]');
    this.includedSmsCounter = page.locator('[data-testid="included-sms-count"]');
    
    // SMS traffic section locators
    this.smsTrafficMenuBtn = page.locator('[data-testid="sms-traffic-menu"]');
    this.localSmsCountInput = page.locator('[data-testid="local-sms-count-input"]');
    this.sendLocalSmsBtn = page.locator('[data-testid="send-local-sms-btn"]');
    this.registeredLocalSmsLabel = page.locator('[data-testid="registered-local-sms-count"]');
    this.smsChargeTypeLabel = page.locator('[data-testid="sms-charge-type"]');
    this.deductedIncludedSmsLabel = page.locator('[data-testid="deducted-included-sms"]');
    this.localSmsChargeLabel = page.locator('[data-testid="local-sms-charge-without-igv"]');
    this.localSmsRateLabel = page.locator('[data-testid="local-sms-rate-per-message"]');
    
    // Roaming SMS section locators
    this.roamingSmsMenuBtn = page.locator('[data-testid="roaming-sms-menu"]');
    this.roamingSmsCountInput = page.locator('[data-testid="roaming-sms-count-input"]');
    this.sendRoamingSmsBtn = page.locator('[data-testid="send-roaming-sms-btn"]');
    this.registeredRoamingSmsLabel = page.locator('[data-testid="registered-roaming-sms-count"]');
    this.roamingSmsChargeLabel = page.locator('[data-testid="roaming-sms-charge-without-igv"]');
    this.roamingSmsRateLabel = page.locator('[data-testid="roaming-sms-rate-per-message"]');
    
    // Traffic detail section locators
    this.trafficDetailSection = page.locator('[data-testid="traffic-detail-sold-section"]');
    this.planFieldInTrafficDetail = page.locator('[data-testid="plan-field-traffic-detail"]');
  }

  async navigateToProvisioningSection() {
    await this.provisioningMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLineWithSoldPlan() {
    await this.soldPlanSelector.click();
    await this.page.locator('[data-testid="sold-plan-option"]').click();
    await this.provisionBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async enableSmsService() {
    await this.smsServiceToggle.click();
    await this.page.waitForTimeout(500);
  }

  async getSmsServiceStatus() {
    const statusText = await this.smsServiceStatus.textContent();
    return statusText.trim().toLowerCase();
  }

  async getIncludedSmsCount() {
    const countText = await this.includedSmsCounter.textContent();
    return parseInt(countText, 10);
  }

  async navigateToSmsTrafficSection() {
    await this.smsTrafficMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async sendLocalSmsMessages(count) {
    await this.localSmsCountInput.fill(count.toString());
    await this.sendLocalSmsBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getRegisteredLocalSmsCount() {
    const countText = await this.registeredLocalSmsLabel.textContent();
    return parseInt(countText, 10);
  }

  async getSmsChargeType() {
    const chargeType = await this.smsChargeTypeLabel.textContent();
    return chargeType.trim().toLowerCase();
  }

  async getDeductedIncludedSms() {
    const deductedText = await this.deductedIncludedSmsLabel.textContent();
    return parseInt(deductedText, 10);
  }

  async getLocalSmsChargeWithoutIgv() {
    const chargeText = await this.localSmsChargeLabel.textContent();
    return parseFloat(chargeText.replace(/[^0-9.]/g, ''));
  }

  async getLocalSmsRatePerMessage() {
    const rateText = await this.localSmsRateLabel.textContent();
    return parseFloat(rateText.replace(/[^0-9.]/g, ''));
  }

  async navigateToRoamingSmsSection() {
    await this.roamingSmsMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async sendRoamingSmsMessages(count) {
    await this.roamingSmsCountInput.fill(count.toString());
    await this.sendRoamingSmsBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getRegisteredRoamingSmsCount() {
    const countText = await this.registeredRoamingSmsLabel.textContent();
    return parseInt(countText, 10);
  }

  async getRoamingSmsChargeWithoutIgv() {
    const chargeText = await this.roamingSmsChargeLabel.textContent();
    return parseFloat(chargeText.replace(/[^0-9.]/g, ''));
  }

  async getRoamingSmsRatePerMessage() {
    const rateText = await this.roamingSmsRateLabel.textContent();
    return parseFloat(rateText.replace(/[^0-9.]/g, ''));
  }
}

module.exports = SoldPlanSmsPage;