const { expect } = require('@playwright/test');

class BSCS7RatePlanPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = page.locator('[data-testid="bscs7-username-input"]');
    this.passwordInput = page.locator('[data-testid="bscs7-password-input"]');
    this.loginButton = page.locator('[data-testid="bscs7-login-button"]');
    
    // Navigation locators
    this.ratePlanMenu = page.locator('[data-testid="menu-rate-plans"]');
    this.ratePlanSearchInput = page.locator('[data-testid="rate-plan-search-input"]');
    this.searchButton = page.locator('[data-testid="rate-plan-search-button"]');
    
    // Rate Plan details locators
    this.ratePlanNameLabel = page.locator('[data-testid="rate-plan-name"]');
    this.homologationStatusLabel = page.locator('[data-testid="homologation-status"]');
    this.newPlanIndicator = page.locator('[data-testid="new-plan-indicator"]');
    
    // FU_PACK table locators
    this.fuPackTable = page.locator('[data-testid="fu-pack-table"]');
    this.voiceMinutesCell = page.locator('[data-testid="fu-pack-voice-minutes"]');
    this.smsCountCell = page.locator('[data-testid="fu-pack-sms-count"]');
    this.dataMBCell = page.locator('[data-testid="fu-pack-data-mb"]');
    this.cycleTypeCell = page.locator('[data-testid="fu-pack-cycle-type"]');
    
    // APN matrix locators
    this.apnMatrixSection = page.locator('[data-testid="apn-matrix-section"]');
    this.apnListItems = page.locator('[data-testid="apn-matrix-section"] [data-testid^="apn-item-"]');
    
    // VoLTE service locators
    this.serviceConfigSection = page.locator('[data-testid="service-config-section"]');
    this.voLTEServiceLabel = page.locator('[data-testid="service-volte-status"]');
    this.voLTEActiveIndicator = page.locator('[data-testid="service-volte-active"]');
    
    // Bulk tariffs locators
    this.bulkTariffsSection = page.locator('[data-testid="bulk-tariffs-section"]');
    this.voiceBulkTariff = page.locator('[data-testid="bulk-tariff-voice"]');
    this.smsBulkTariff = page.locator('[data-testid="bulk-tariff-sms"]');
    this.dataBulkTariff = page.locator('[data-testid="bulk-tariff-data"]');
  }

  async navigateToSystem() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.system.local');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.BSCS7_USERNAME || 'test_user';
    const password = process.env.BSCS7_PASSWORD || 'test_password';
    
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchRatePlan(ratePlanName) {
    await this.ratePlanMenu.click();
    await this.ratePlanSearchInput.fill(ratePlanName);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isNewPlanWithoutHomologation() {
    const homologationStatus = await this.homologationStatusLabel.textContent();
    const isNewPlan = await this.newPlanIndicator.isVisible();
    return isNewPlan && homologationStatus.includes('SIN HOMOLOGACION');
  }

  async getIncludedVoiceMinutes() {
    const voiceText = await this.voiceMinutesCell.textContent();
    return parseInt(voiceText.replace(/[^0-9]/g, ''), 10);
  }

  async getIncludedSMS() {
    const smsText = await this.smsCountCell.textContent();
    return parseInt(smsText.replace(/[^0-9]/g, ''), 10);
  }

  async getIncludedDataMB() {
    const dataText = await this.dataMBCell.textContent();
    return parseInt(dataText.replace(/[^0-9]/g, ''), 10);
  }

  async getConfiguredAPNs() {
    const apnElements = await this.apnListItems.all();
    const apnNames = [];
    for (const element of apnElements) {
      const apnName = await element.textContent();
      apnNames.push(apnName.trim());
    }
    return apnNames;
  }

  async isVoLTEServiceActive() {
    const isLabelVisible = await this.voLTEServiceLabel.isVisible();
    if (!isLabelVisible) return false;
    
    const isActiveVisible = await this.voLTEActiveIndicator.isVisible();
    const statusText = await this.voLTEServiceLabel.textContent();
    return isActiveVisible || statusText.toLowerCase().includes('activ');
  }

  async areBulkTariffsConfigured() {
    const voiceTariffVisible = await this.voiceBulkTariff.isVisible();
    const smsTariffVisible = await this.smsBulkTariff.isVisible();
    const dataTariffVisible = await this.dataBulkTariff.isVisible();
    
    if (!voiceTariffVisible || !smsTariffVisible || !dataTariffVisible) {
      return false;
    }
    
    const voiceTariff = await this.voiceBulkTariff.textContent();
    const smsTariff = await this.smsBulkTariff.textContent();
    const dataTariff = await this.dataBulkTariff.textContent();
    
    return voiceTariff.length > 0 && smsTariff.length > 0 && dataTariff.length > 0;
  }
}

module.exports = BSCS7RatePlanPage;