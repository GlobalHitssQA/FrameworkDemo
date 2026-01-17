const { expect } = require('@playwright/test');

class APN3ConnectivityPage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.userProfileIndicator = page.locator('[data-testid="user-profile-indicator"]');
    this.authenticatedUserBadge = page.locator('[data-testid="authenticated-user-badge"]');
    
    // Network components status locators
    this.networkStatusPanel = page.locator('[data-testid="network-status-panel"]');
    this.hlrStatusIndicator = page.locator('[data-testid="hlr-status-indicator"]');
    this.hssStatusIndicator = page.locator('[data-testid="hss-status-indicator"]');
    this.imsStatusIndicator = page.locator('[data-testid="ims-status-indicator"]');
    this.pcrfStatusIndicator = page.locator('[data-testid="pcrf-status-indicator"]');
    
    // Instant Link locators
    this.instantLinkStatus = page.locator('[data-testid="instant-link-status"]');
    
    // BSCS7 locators
    this.bscs7StatusIndicator = page.locator('[data-testid="bscs7-status-indicator"]');
    this.bscs7NavigationLink = page.locator('[data-testid="bscs7-navigation-link"]');
    this.bscs7SearchInput = page.locator('[data-testid="bscs7-search-input"]');
    this.bscs7SearchButton = page.locator('[data-testid="bscs7-search-button"]');
    this.bscs7Apn3ValueField = page.locator('[data-testid="bscs7-apn3-value"]');
    
    // eSIM device locators
    this.esimDeviceStatus = page.locator('[data-testid="esim-device-status"]');
    this.esimCapabilityIndicator = page.locator('[data-testid="esim-capability-indicator"]');
    
    // Line provisioning locators
    this.provisioningSection = page.locator('[data-testid="provisioning-section"]');
    this.planSelector = page.locator('[data-testid="plan-selector"]');
    this.testingPlanOption = page.locator('[data-testid="testing-plan-option"]');
    this.apn3ConfigInput = page.locator('[data-testid="apn3-config-input"]');
    this.confirmProvisioningButton = page.locator('[data-testid="confirm-provisioning-button"]');
    this.provisioningSuccessMessage = page.locator('[data-testid="provisioning-success-message"]');
    this.configuredApnDisplay = page.locator('[data-testid="configured-apn-display"]');
    
    // Data session locators
    this.dataSessionPanel = page.locator('[data-testid="data-session-panel"]');
    this.initiateSessionButton = page.locator('[data-testid="initiate-session-button"]');
    this.sessionStatusIndicator = page.locator('[data-testid="session-status-indicator"]');
    this.sessionActiveLabel = page.locator('[data-testid="session-active-label"]');
    
    // eSIM profile download locators
    this.esimDownloadSection = page.locator('[data-testid="esim-download-section"]');
    this.initiateDownloadButton = page.locator('[data-testid="initiate-esim-download-button"]');
    this.downloadProgressIndicator = page.locator('[data-testid="download-progress-indicator"]');
    this.downloadCompleteMessage = page.locator('[data-testid="download-complete-message"]');
    this.downloadCostDisplay = page.locator('[data-testid="download-cost-display"]');
    
    // Billing section locators
    this.billingNavigationLink = page.locator('[data-testid="billing-navigation-link"]');
    this.billingSearchInput = page.locator('[data-testid="billing-search-input"]');
    this.billingSearchButton = page.locator('[data-testid="billing-search-button"]');
    this.esimTrafficRecordsTable = page.locator('[data-testid="esim-traffic-records-table"]');
    this.trafficCostColumn = page.locator('[data-testid="traffic-cost-column"]');
    this.trafficRegistrationStatus = page.locator('[data-testid="traffic-registration-status"]');
  }

  async navigateToSystem() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserAuthenticated() {
    await expect(this.userProfileIndicator).toBeVisible();
    await expect(this.authenticatedUserBadge).toBeVisible();
  }

  async verifyNetworkComponentsConfigured() {
    await expect(this.networkStatusPanel).toBeVisible();
    await expect(this.hlrStatusIndicator).toHaveAttribute('data-status', 'active');
    await expect(this.hssStatusIndicator).toHaveAttribute('data-status', 'active');
    await expect(this.imsStatusIndicator).toHaveAttribute('data-status', 'active');
    await expect(this.pcrfStatusIndicator).toHaveAttribute('data-status', 'active');
  }

  async verifyInstantLinkOperational() {
    await expect(this.instantLinkStatus).toHaveAttribute('data-status', 'operational');
  }

  async verifyBSCS7Available() {
    await expect(this.bscs7StatusIndicator).toHaveAttribute('data-status', 'available');
  }

  async verifyESIMDeviceReady() {
    await expect(this.esimDeviceStatus).toBeVisible();
    await expect(this.esimCapabilityIndicator).toHaveAttribute('data-capable', 'true');
  }

  async provisionLineWithTestingPlan() {
    await this.provisioningSection.click();
    await this.planSelector.click();
    await this.testingPlanOption.click();
  }

  async configurePreproductiveAPN3(apnValue) {
    await this.apn3ConfigInput.fill(apnValue);
  }

  async confirmProvisioning() {
    await this.confirmProvisioningButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isLineProvisionedSuccessfully() {
    return await this.provisioningSuccessMessage.isVisible();
  }

  async getConfiguredAPN() {
    return await this.configuredApnDisplay.textContent();
  }

  async navigateToBSCS7() {
    await this.bscs7NavigationLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchLineInBSCS7() {
    await this.bscs7SearchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getAPN3ValueFromBSCS7() {
    return await this.bscs7Apn3ValueField.textContent();
  }

  async initiateDataSessionAPN3() {
    await this.dataSessionPanel.click();
    await this.initiateSessionButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isDataSessionEstablished() {
    return await this.sessionStatusIndicator.isVisible();
  }

  async getDataSessionStatus() {
    const statusText = await this.sessionActiveLabel.textContent();
    return statusText.toLowerCase().trim();
  }

  async initiateESIMProfileDownload() {
    await this.esimDownloadSection.click();
    await this.initiateDownloadButton.click();
  }

  async waitForDownloadCompletion() {
    await expect(this.downloadCompleteMessage).toBeVisible({ timeout: 60000 });
  }

  async isESIMProfileDownloaded() {
    return await this.downloadCompleteMessage.isVisible();
  }

  async getDownloadCostForGM() {
    const costText = await this.downloadCostDisplay.textContent();
    return parseFloat(costText.replace(/[^0-9.-]/g, ''));
  }

  async navigateToBillingSection() {
    await this.billingNavigationLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchESIMTrafficRecords() {
    await this.billingSearchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getESIMTrafficCost() {
    const costText = await this.trafficCostColumn.first().textContent();
    return parseFloat(costText.replace(/[^0-9.-]/g, ''));
  }

  async isTrafficRegisteredCorrectly() {
    const status = await this.trafficRegistrationStatus.textContent();
    return status.toLowerCase().includes('registered') || status.toLowerCase().includes('success');
  }
}

module.exports = APN3ConnectivityPage;