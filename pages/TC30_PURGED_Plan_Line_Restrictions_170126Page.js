const { expect } = require('@playwright/test');

class PurgedPlanPage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.userAuthenticatedIndicator = page.locator('[data-testid="user-authenticated-indicator"]');
    
    // Plan configuration locators
    this.planConfigurationSection = page.locator('[data-testid="plan-configuration-section"]');
    this.purgedPlanStatus = page.locator('[data-testid="purged-plan-status"]');
    this.bscs7ConfigPanel = page.locator('[data-testid="bscs7-config-panel"]');
    
    // Line provisioning locators
    this.lineProvisioningPanel = page.locator('[data-testid="line-provisioning-panel"]');
    this.provisionButton = page.locator('[data-testid="btn-provision-line"]');
    this.lineStateIndicator = page.locator('[data-testid="line-state-indicator"]');
    this.servicesStatusPanel = page.locator('[data-testid="services-status-panel"]');
    
    // APN and VoLTE locators
    this.apnConfigSection = page.locator('[data-testid="apn-config-section"]');
    this.productiveApnsList = page.locator('[data-testid="productive-apns-list"]');
    this.volteStatusIndicator = page.locator('[data-testid="volte-status-indicator"]');
    
    // Voice call locators
    this.voiceCallPanel = page.locator('[data-testid="voice-call-panel"]');
    this.initiateCallButton = page.locator('[data-testid="btn-initiate-call"]');
    this.callBlockedMessage = page.locator('[data-testid="call-blocked-message"]');
    this.voiceCallStatusIndicator = page.locator('[data-testid="voice-call-status"]');
    
    // SMS locators
    this.smsPanel = page.locator('[data-testid="sms-panel"]');
    this.sendSmsButton = page.locator('[data-testid="btn-send-sms"]');
    this.smsBlockedMessage = page.locator('[data-testid="sms-blocked-message"]');
    this.consumptionIndicator = page.locator('[data-testid="consumption-indicator"]');
    
    // Data and eSIM locators
    this.dataConsumptionPanel = page.locator('[data-testid="data-consumption-panel"]');
    this.consumeDataButton = page.locator('[data-testid="btn-consume-data"]');
    this.esimDownloadButton = page.locator('[data-testid="btn-download-esim"]');
    this.dataBlockedMessage = page.locator('[data-testid="data-blocked-message"]');
    this.navigationStatusIndicator = page.locator('[data-testid="navigation-status"]');
    this.esimDownloadStatusIndicator = page.locator('[data-testid="esim-download-status"]');
    
    // SIM status locators
    this.simStatusPanel = page.locator('[data-testid="sim-status-panel"]');
    this.simStatusIndicator = page.locator('[data-testid="sim-status-indicator"]');
    this.availableServicesList = page.locator('[data-testid="available-services-list"]');
    this.serviceItem = page.locator('[data-testid="service-item"]');
  }

  async navigateToSystem() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserAuthenticated() {
    await expect(this.userAuthenticatedIndicator).toBeVisible();
  }

  async verifyPurgedPlanConfigured() {
    await this.planConfigurationSection.click();
    await expect(this.bscs7ConfigPanel).toBeVisible();
    const planStatus = await this.purgedPlanStatus.textContent();
    return planStatus.includes('PURGED');
  }

  async verifyLineAvailableForProvisioning() {
    await expect(this.lineProvisioningPanel).toBeVisible();
    await expect(this.provisionButton).toBeEnabled();
  }

  async provisionLineInPurgedPlan() {
    await this.provisionButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getLineState() {
    const stateText = await this.lineStateIndicator.textContent();
    return stateText.trim();
  }

  async areServicesEnabled() {
    const servicesStatus = await this.servicesStatusPanel.getAttribute('data-services-enabled');
    return servicesStatus === 'true';
  }

  async hasProductiveApns() {
    const apnCount = await this.productiveApnsList.locator('[data-testid="apn-item"]').count();
    return apnCount > 0;
  }

  async hasVolteEnabled() {
    const volteStatus = await this.volteStatusIndicator.getAttribute('data-enabled');
    return volteStatus === 'true';
  }

  async attemptVoiceCall() {
    await this.voiceCallPanel.click();
    await this.initiateCallButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isCallBlocked() {
    return await this.callBlockedMessage.isVisible();
  }

  async areVoiceCallsAllowed() {
    const status = await this.voiceCallStatusIndicator.getAttribute('data-allowed');
    return status === 'true';
  }

  async attemptSendSms() {
    await this.smsPanel.click();
    await this.sendSmsButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isSmsBlocked() {
    return await this.smsBlockedMessage.isVisible();
  }

  async isConsumptionRegistered() {
    const consumptionValue = await this.consumptionIndicator.getAttribute('data-has-consumption');
    return consumptionValue === 'true';
  }

  async attemptDataConsumption() {
    await this.dataConsumptionPanel.click();
    await this.consumeDataButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async attemptEsimProfileDownload() {
    await this.esimDownloadButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isDataAccessBlocked() {
    return await this.dataBlockedMessage.isVisible();
  }

  async isNavigationAllowed() {
    const status = await this.navigationStatusIndicator.getAttribute('data-allowed');
    return status === 'true';
  }

  async isEsimDownloadAllowed() {
    const status = await this.esimDownloadStatusIndicator.getAttribute('data-allowed');
    return status === 'true';
  }

  async navigateToSimStatus() {
    await this.simStatusPanel.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getSimStatus() {
    const statusText = await this.simStatusIndicator.textContent();
    return statusText.trim().toLowerCase();
  }

  async getAvailableServices() {
    const services = await this.serviceItem.all();
    return services;
  }
}

module.exports = PurgedPlanPage;