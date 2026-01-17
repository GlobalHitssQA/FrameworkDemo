const { expect } = require('@playwright/test');

class APN7ConnectivityPage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.userAuthenticatedIndicator = page.locator('[data-testid="user-authenticated-indicator"]');
    this.systemDashboard = page.locator('[data-testid="system-dashboard"]');
    
    // Environment configuration locators
    this.environmentStatusLabel = page.locator('[data-testid="environment-status-label"]');
    this.preproductiveEnvironmentBadge = page.locator('[data-testid="preproductive-environment-badge"]');
    
    // Service status locators
    this.instantLinkStatusIndicator = page.locator('[data-testid="instant-link-status"]');
    this.bscs7StatusIndicator = page.locator('[data-testid="bscs7-status-indicator"]');
    this.esimDeviceStatusIndicator = page.locator('[data-testid="esim-device-status"]');
    this.testingPlanStatusBadge = page.locator('[data-testid="testing-plan-status"]');
    
    // Line provisioning locators
    this.provisioningSection = page.locator('[data-testid="line-provisioning-section"]');
    this.planSelector = page.locator('[data-testid="plan-selector"]');
    this.testingPlanOption = page.locator('[data-testid="plan-option-testing"]');
    this.apnConfigurationInput = page.locator('[data-testid="apn-configuration-input"]');
    this.apn7PreproductiveOption = page.locator('[data-testid="apn7-preproductive-option"]');
    this.provisionLineButton = page.locator('[data-testid="provision-line-button"]');
    this.provisioningSuccessMessage = page.locator('[data-testid="provisioning-success-message"]');
    this.lineProvisionedWithAPN7Indicator = page.locator('[data-testid="line-apn7-configured-indicator"]');
    
    // BSCS7 locators
    this.bscs7NavigationLink = page.locator('[data-testid="bscs7-navigation-link"]');
    this.bscs7SearchInput = page.locator('[data-testid="bscs7-line-search-input"]');
    this.bscs7SearchButton = page.locator('[data-testid="bscs7-search-button"]');
    this.apn7StatusDisplay = page.locator('[data-testid="apn7-status-display"]');
    this.apn7PreproductiveStatusLabel = page.locator('[data-testid="apn7-preproductive-status-label"]');
    
    // Data session locators
    this.dataSessionSection = page.locator('[data-testid="data-session-section"]');
    this.initiateSessionButton = page.locator('[data-testid="initiate-apn7-session-button"]');
    this.sessionEstablishedIndicator = page.locator('[data-testid="session-established-indicator"]');
    this.sessionStatusDisplay = page.locator('[data-testid="session-status-display"]');
    
    // eSIM profile download locators
    this.esimDownloadSection = page.locator('[data-testid="esim-download-section"]');
    this.downloadProfileButton = page.locator('[data-testid="download-esim-profile-button"]');
    this.downloadProgressIndicator = page.locator('[data-testid="download-progress-indicator"]');
    this.downloadSuccessMessage = page.locator('[data-testid="esim-download-success-message"]');
    this.profileDownloadedIndicator = page.locator('[data-testid="profile-downloaded-indicator"]');
    
    // Traffic cost locators
    this.trafficCostSection = page.locator('[data-testid="traffic-cost-section"]');
    this.trafficCostNavigationLink = page.locator('[data-testid="traffic-cost-navigation"]');
    this.apn7TrafficCostDisplay = page.locator('[data-testid="apn7-traffic-cost-display"]');
    this.zeroCostIndicator = page.locator('[data-testid="zero-cost-indicator"]');
    this.trafficCostValue = page.locator('[data-testid="traffic-cost-value"]');
  }

  async navigateToSystem() {
    await this.page.goto('/');
    await this.systemDashboard.waitFor({ state: 'visible', timeout: 30000 });
  }

  async verifyUserAuthenticated() {
    await expect(this.userAuthenticatedIndicator).toBeVisible();
  }

  async verifyPreproductiveEnvironmentConfigured() {
    await expect(this.preproductiveEnvironmentBadge).toBeVisible();
    const environmentText = await this.environmentStatusLabel.textContent();
    expect(environmentText).toContain('preproductivo');
  }

  async verifyInstantLinkOperational() {
    await expect(this.instantLinkStatusIndicator).toBeVisible();
    const statusText = await this.instantLinkStatusIndicator.textContent();
    expect(statusText).toContain('operativo');
  }

  async verifyBSCS7Available() {
    await expect(this.bscs7StatusIndicator).toBeVisible();
    const statusText = await this.bscs7StatusIndicator.textContent();
    expect(statusText).toContain('disponible');
  }

  async verifyESIMDeviceReady() {
    await expect(this.esimDeviceStatusIndicator).toBeVisible();
  }

  async verifyTestingPlanActive() {
    await expect(this.testingPlanStatusBadge).toBeVisible();
    const statusText = await this.testingPlanStatusBadge.textContent();
    expect(statusText).toContain('activo');
  }

  async provisionLineWithTestingPlan() {
    await this.provisioningSection.click();
    await this.planSelector.click();
    await this.testingPlanOption.click();
  }

  async configureAPN7Preproductive(apnName) {
    await this.apnConfigurationInput.fill(apnName);
    await this.apn7PreproductiveOption.click();
    await this.provisionLineButton.click();
    await this.provisioningSuccessMessage.waitFor({ state: 'visible', timeout: 30000 });
  }

  async verifyLineProvisionedWithAPN7() {
    await expect(this.lineProvisionedWithAPN7Indicator).toBeVisible();
    return await this.lineProvisionedWithAPN7Indicator.isVisible();
  }

  async navigateToBSCS7() {
    await this.bscs7NavigationLink.click();
    await this.bscs7SearchInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  async searchLineInBSCS7() {
    await this.bscs7SearchButton.click();
    await this.apn7StatusDisplay.waitFor({ state: 'visible', timeout: 15000 });
  }

  async getAPN7StatusInBSCS7() {
    await expect(this.apn7PreproductiveStatusLabel).toBeVisible();
    return await this.apn7PreproductiveStatusLabel.textContent();
  }

  async initiateDataSessionAPN7() {
    await this.dataSessionSection.click();
    await this.initiateSessionButton.click();
    await this.sessionStatusDisplay.waitFor({ state: 'visible', timeout: 30000 });
  }

  async verifyDataSessionEstablished() {
    await expect(this.sessionEstablishedIndicator).toBeVisible();
    return await this.sessionEstablishedIndicator.isVisible();
  }

  async downloadESIMProfile() {
    await this.esimDownloadSection.click();
    await this.downloadProfileButton.click();
    await this.downloadProgressIndicator.waitFor({ state: 'visible', timeout: 10000 });
    await this.downloadSuccessMessage.waitFor({ state: 'visible', timeout: 60000 });
  }

  async verifyESIMProfileDownloaded() {
    await expect(this.profileDownloadedIndicator).toBeVisible();
    return await this.profileDownloadedIndicator.isVisible();
  }

  async navigateToTrafficCostSection() {
    await this.trafficCostNavigationLink.click();
    await this.trafficCostSection.waitFor({ state: 'visible', timeout: 15000 });
  }

  async getTrafficCostForAPN7() {
    await expect(this.apn7TrafficCostDisplay).toBeVisible();
    const costText = await this.trafficCostValue.textContent();
    return costText.replace(/[^0-9]/g, '');
  }
}

module.exports = APN7ConnectivityPage;