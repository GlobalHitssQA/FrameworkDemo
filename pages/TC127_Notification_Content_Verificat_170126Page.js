const { expect } = require('@playwright/test');

class NotificationPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.packageConfigurationLink = '[data-testid="package-configuration-link"]';
    this.notificationSettingsLink = '[data-testid="notification-settings-link"]';
    this.packageActivationLink = '[data-testid="package-activation-link"]';
    this.consumptionSimulatorLink = '[data-testid="consumption-simulator-link"]';
    this.notificationHistoryLink = '[data-testid="notification-history-link"]';
    
    // Package configuration locators
    this.packageListContainer = '[data-testid="package-list-container"]';
    this.packageItemTrial6GB = '[data-testid="package-item-trial-6gb"]';
    this.packageItemB2B2C = '[data-testid="package-item-b2b2c"]';
    this.packageStatusActive = '[data-testid="package-status-active"]';
    
    // Notification settings locators
    this.notificationSystemStatus = '[data-testid="notification-system-status"]';
    this.communicationChannelsList = '[data-testid="communication-channels-list"]';
    this.channelStatusActive = '[data-testid="channel-status-active"]';
    this.notificationTemplatesList = '[data-testid="notification-templates-list"]';
    
    // Package activation locators
    this.testLineSelector = '[data-testid="test-line-selector"]';
    this.packageTypeSelector = '[data-testid="package-type-selector"]';
    this.activatePackageButton = '[data-testid="activate-package-button"]';
    this.activationConfirmation = '[data-testid="activation-confirmation"]';
    this.packageNameField = '[data-testid="package-name-field"]';
    this.packageCapacityField = '[data-testid="package-capacity-field"]';
    this.packageCostField = '[data-testid="package-cost-field"]';
    this.packageValidityField = '[data-testid="package-validity-field"]';
    this.packageStatusField = '[data-testid="package-status-field"]';
    
    // Consumption simulator locators
    this.packageIdInput = '[data-testid="package-id-input"]';
    this.consumptionPercentageInput = '[data-testid="consumption-percentage-input"]';
    this.simulateConsumptionButton = '[data-testid="simulate-consumption-button"]';
    this.simulationResultMessage = '[data-testid="simulation-result-message"]';
    
    // Notification history locators
    this.notificationHistoryTable = '[data-testid="notification-history-table"]';
    this.notificationRow = '[data-testid="notification-row"]';
    this.notificationThresholdFilter = '[data-testid="notification-threshold-filter"]';
    this.notificationContentPanel = '[data-testid="notification-content-panel"]';
    this.notificationPackageName = '[data-testid="notification-package-name"]';
    this.notificationTotalCapacity = '[data-testid="notification-total-capacity"]';
    this.notificationCurrentConsumption = '[data-testid="notification-current-consumption"]';
    this.notificationPercentage = '[data-testid="notification-percentage"]';
    this.notificationReadabilityScore = '[data-testid="notification-readability-score"]';
  }

  async navigateToPackageConfiguration() {
    await this.page.click(this.packageConfigurationLink);
    await this.page.waitForSelector(this.packageListContainer);
  }

  async verifyPackagesConfigured() {
    const trial6GBVisible = await this.page.isVisible(this.packageItemTrial6GB);
    const b2b2cVisible = await this.page.isVisible(this.packageItemB2B2C);
    return trial6GBVisible && b2b2cVisible;
  }

  async navigateToNotificationSettings() {
    await this.page.click(this.notificationSettingsLink);
    await this.page.waitForSelector(this.notificationSystemStatus);
  }

  async verifyNotificationSystemOperational() {
    const statusText = await this.page.textContent(this.notificationSystemStatus);
    return statusText.toLowerCase().includes('operational') || statusText.toLowerCase().includes('active');
  }

  async verifyActiveCommunicationChannels() {
    const activeChannels = await this.page.locator(this.channelStatusActive).count();
    return activeChannels > 0;
  }

  async navigateToPackageActivation() {
    await this.page.click(this.packageActivationLink);
    await this.page.waitForSelector(this.testLineSelector);
  }

  async activateMultiplePackageTypes() {
    const packages = [
      { type: 'TRIAL_6GB', line: 'test-line-001' },
      { type: 'B2B2C_2GB', line: 'test-line-002' },
      { type: 'B2B2C_5GB', line: 'test-line-003' },
      { type: 'B2B2C_10GB', line: 'test-line-004' }
    ];
    
    const activatedPackages = [];
    
    for (const pkg of packages) {
      await this.page.selectOption(this.testLineSelector, pkg.line);
      await this.page.selectOption(this.packageTypeSelector, pkg.type);
      await this.page.click(this.activatePackageButton);
      await this.page.waitForSelector(this.activationConfirmation);
      
      const packageId = await this.page.getAttribute(this.activationConfirmation, 'data-package-id');
      activatedPackages.push({ id: packageId, type: pkg.type, line: pkg.line });
    }
    
    return activatedPackages;
  }

  async getPackageActivationDetails(packageId) {
    const packageRow = `[data-testid="package-row-${packageId}"]`;
    await this.page.waitForSelector(packageRow);
    
    return {
      name: await this.page.textContent(`${packageRow} ${this.packageNameField}`),
      capacity: await this.page.textContent(`${packageRow} ${this.packageCapacityField}`),
      cost: await this.page.textContent(`${packageRow} ${this.packageCostField}`),
      validity: await this.page.textContent(`${packageRow} ${this.packageValidityField}`),
      status: await this.page.textContent(`${packageRow} ${this.packageStatusField}`)
    };
  }

  async navigateToConsumptionSimulator() {
    await this.page.click(this.consumptionSimulatorLink);
    await this.page.waitForSelector(this.packageIdInput);
  }

  async simulateConsumptionToPercentage(packageId, percentage) {
    await this.page.fill(this.packageIdInput, packageId);
    await this.page.fill(this.consumptionPercentageInput, percentage.toString());
    await this.page.click(this.simulateConsumptionButton);
    await this.page.waitForSelector(this.simulationResultMessage);
  }

  async navigateToNotificationHistory() {
    await this.page.click(this.notificationHistoryLink);
    await this.page.waitForSelector(this.notificationHistoryTable);
  }

  async getNotificationsByThreshold(threshold) {
    await this.page.selectOption(this.notificationThresholdFilter, threshold.toString());
    await this.page.waitForTimeout(500);
    
    const notificationRows = await this.page.locator(this.notificationRow).all();
    const notifications = [];
    
    for (let i = 0; i < notificationRows.length; i++) {
      const id = await notificationRows[i].getAttribute('data-notification-id');
      notifications.push({ id, threshold });
    }
    
    return notifications;
  }

  async getNotificationContent(notificationId) {
    const notificationSelector = `[data-testid="notification-row-${notificationId}"]`;
    await this.page.click(notificationSelector);
    await this.page.waitForSelector(this.notificationContentPanel);
    
    const packageId = await this.page.getAttribute(this.notificationContentPanel, 'data-package-id');
    
    return {
      packageId,
      packageName: await this.page.textContent(this.notificationPackageName),
      totalCapacity: await this.page.textContent(this.notificationTotalCapacity),
      currentConsumptionGB: await this.page.textContent(this.notificationCurrentConsumption),
      totalConsumption: await this.page.textContent(this.notificationCurrentConsumption),
      percentage: parseInt(await this.page.textContent(this.notificationPercentage), 10)
    };
  }

  async getPackageRealData(packageId) {
    await this.navigateToPackageConfiguration();
    const packageRow = `[data-testid="package-row-${packageId}"]`;
    await this.page.waitForSelector(packageRow);
    
    return {
      name: await this.page.textContent(`${packageRow} ${this.packageNameField}`),
      capacity: await this.page.textContent(`${packageRow} ${this.packageCapacityField}`)
    };
  }

  async verifyNotificationReadability(notificationId) {
    const notificationSelector = `[data-testid="notification-row-${notificationId}"]`;
    await this.page.click(notificationSelector);
    await this.page.waitForSelector(this.notificationContentPanel);
    
    const readabilityScore = await this.page.textContent(this.notificationReadabilityScore);
    return parseInt(readabilityScore, 10) >= 70;
  }
}

module.exports = NotificationPage;