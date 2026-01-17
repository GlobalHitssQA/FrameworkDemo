class B2B2CPackagePage {
  constructor(page) {
    this.page = page;
    
    // Locators - Navigation
    this.packageManagementLink = '[data-testid="package-management-link"]';
    this.userLineStatusIndicator = '[data-testid="user-line-status"]';
    this.gmLineActiveLabel = '[data-testid="gm-line-active-label"]';
    
    // Locators - Package Configuration
    this.b2b2cPackagesSection = '[data-testid="b2b2c-packages-section"]';
    this.notificationsConfigSection = '[data-testid="notifications-config-section"]';
    this.notification80ConfigCheckbox = '[data-testid="notification-80-config"]';
    this.notification100ConfigCheckbox = '[data-testid="notification-100-config"]';
    
    // Locators - Package Selection and Activation
    this.packageSelector = '[data-testid="package-selector"]';
    this.packageOption10GB = '[data-testid="package-option-10gb"]';
    this.validitySelector = '[data-testid="validity-selector"]';
    this.activatePackageButton = '[data-testid="activate-package-btn"]';
    this.packageStatusLabel = '[data-testid="package-status-label"]';
    
    // Locators - Consumption Display
    this.availableDataDisplay = '[data-testid="available-data-display"]';
    this.consumedDataDisplay = '[data-testid="consumed-data-display"]';
    this.remainingDataDisplay = '[data-testid="remaining-data-display"]';
    this.consumptionProgressBar = '[data-testid="consumption-progress-bar"]';
    
    // Locators - Consumption Simulation
    this.consumptionSimulatorInput = '[data-testid="consumption-simulator-input"]';
    this.simulateConsumptionButton = '[data-testid="simulate-consumption-btn"]';
    
    // Locators - Notifications
    this.notificationsList = '[data-testid="notifications-list"]';
    this.notification80Alert = '[data-testid="notification-80-alert"]';
    this.notification100Alert = '[data-testid="notification-100-alert"]';
    
    // Locators - Package Expiration
    this.expirationReasonLabel = '[data-testid="expiration-reason-label"]';
    this.packageExhaustedIndicator = '[data-testid="package-exhausted-indicator"]';
    
    // Locators - Fallback and Additional Consumption
    this.consumptionBlockedMessage = '[data-testid="consumption-blocked-message"]';
    this.fallbackActivatedIndicator = '[data-testid="fallback-activated-indicator"]';
    this.nextPackageIndicator = '[data-testid="next-package-indicator"]';
    this.bulkRateActivatedLabel = '[data-testid="bulk-rate-activated-label"]';
  }

  async navigateToPackageManagement() {
    await this.page.click(this.packageManagementLink);
    await this.page.waitForSelector(this.b2b2cPackagesSection);
  }

  async verifyUserHasActiveGMLine() {
    await this.page.waitForSelector(this.userLineStatusIndicator);
    const gmLineActive = await this.page.isVisible(this.gmLineActiveLabel);
    return gmLineActive;
  }

  async verifyB2B2CPackagesConfigured() {
    const packagesVisible = await this.page.isVisible(this.b2b2cPackagesSection);
    return packagesVisible;
  }

  async verifyConsumptionNotificationsConfigured() {
    const notification80Configured = await this.page.isChecked(this.notification80ConfigCheckbox);
    const notification100Configured = await this.page.isChecked(this.notification100ConfigCheckbox);
    return notification80Configured && notification100Configured;
  }

  async selectB2B2CPackage(packageSize) {
    await this.page.click(this.packageSelector);
    if (packageSize === '10GB') {
      await this.page.click(this.packageOption10GB);
    }
  }

  async setPackageValidity(validity) {
    await this.page.click(this.validitySelector);
    await this.page.selectOption(this.validitySelector, { label: validity });
  }

  async activatePackage() {
    await this.page.click(this.activatePackageButton);
    await this.page.waitForSelector(this.packageStatusLabel);
  }

  async getPackageStatus() {
    const statusText = await this.page.textContent(this.packageStatusLabel);
    return statusText.toLowerCase().trim();
  }

  async getAvailableData() {
    const availableData = await this.page.textContent(this.availableDataDisplay);
    return availableData.trim();
  }

  async getConsumedData() {
    const consumedData = await this.page.textContent(this.consumedDataDisplay);
    return consumedData.trim();
  }

  async getRemainingData() {
    const remainingData = await this.page.textContent(this.remainingDataDisplay);
    return remainingData.trim();
  }

  async simulateDataConsumption(amount) {
    await this.page.fill(this.consumptionSimulatorInput, amount.replace('GB', ''));
    await this.page.click(this.simulateConsumptionButton);
    await this.page.waitForTimeout(1000);
  }

  async verifyNotificationGenerated(percentage) {
    if (percentage === '80%') {
      return await this.page.isVisible(this.notification80Alert);
    } else if (percentage === '100%') {
      return await this.page.isVisible(this.notification100Alert);
    }
    return false;
  }

  async getExpirationReason() {
    const reason = await this.page.textContent(this.expirationReasonLabel);
    return reason.toLowerCase().trim().replace(/\s+/g, '_');
  }

  async attemptAdditionalConsumption() {
    await this.page.fill(this.consumptionSimulatorInput, '1');
    await this.page.click(this.simulateConsumptionButton);
    await this.page.waitForTimeout(500);
  }

  async isConsumptionBlocked() {
    return await this.page.isVisible(this.consumptionBlockedMessage);
  }

  async verifyFallbackActivated() {
    const nextPackageActive = await this.page.isVisible(this.nextPackageIndicator);
    const bulkRateActive = await this.page.isVisible(this.bulkRateActivatedLabel);
    return nextPackageActive || bulkRateActive;
  }
};

module.exports = B2B2CPackagePage;