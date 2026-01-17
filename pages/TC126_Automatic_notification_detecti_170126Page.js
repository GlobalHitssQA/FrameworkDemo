const { expect } = require('@playwright/test');

class NotificationThresholdsPage {
  constructor(page) {
    this.page = page;
    
    this.thresholdConfigSection = '[data-testid="threshold-configuration-section"]';
    this.thresholdInput80 = '[data-testid="threshold-input-80"]';
    this.thresholdInput100 = '[data-testid="threshold-input-100"]';
    this.packageSelector = '[data-testid="package-type-selector"]';
    this.saveThresholdBtn = '[data-testid="save-threshold-config-btn"]';
    this.thresholdStatusIndicator = '[data-testid="threshold-status-indicator"]';
    
    this.notificationSystemPanel = '[data-testid="notification-system-panel"]';
    this.systemStatusIndicator = '[data-testid="notification-system-status"]';
    this.communicationChannelsList = '[data-testid="communication-channels-list"]';
    this.channelStatusBadge = '[data-testid="channel-status-badge"]';
    
    this.packageActivationSection = '[data-testid="package-activation-section"]';
    this.packageTypeDropdown = '[data-testid="package-type-dropdown"]';
    this.testLineInput = '[data-testid="test-line-input"]';
    this.activatePackageBtn = '[data-testid="activate-package-btn"]';
    this.activatedPackagesList = '[data-testid="activated-packages-list"]';
    this.packageStatusBadge = '[data-testid="package-status-badge"]';
    this.notificationRulesIndicator = '[data-testid="notification-rules-indicator"]';
    
    this.consumptionSimulatorPanel = '[data-testid="consumption-simulator-panel"]';
    this.lineSelector = '[data-testid="line-selector"]';
    this.consumptionPercentageInput = '[data-testid="consumption-percentage-input"]';
    this.simulateConsumptionBtn = '[data-testid="simulate-consumption-btn"]';
    this.currentConsumptionDisplay = '[data-testid="current-consumption-display"]';
    
    this.automaticDetectionIndicator = '[data-testid="automatic-detection-indicator"]';
    this.notificationLogTable = '[data-testid="notification-log-table"]';
    this.notificationLogRow = '[data-testid="notification-log-row"]';
    this.manualInterventionFlag = '[data-testid="manual-intervention-flag"]';
    
    this.channelDeliveryStatus = '[data-testid="channel-delivery-status"]';
    this.deliveryTimestamp = '[data-testid="delivery-timestamp"]';
    this.processingTimeDisplay = '[data-testid="processing-time-display"]';
  }

  async navigateToThresholdConfiguration() {
    await this.page.click('[data-testid="nav-threshold-config"]');
    await this.page.waitForSelector(this.thresholdConfigSection, { state: 'visible' });
  }

  async configureThreshold(packageType, thresholdPercentage) {
    await this.page.click(this.packageSelector);
    await this.page.click(`[data-testid="package-option-${packageType}"]`);
    
    const thresholdInput = thresholdPercentage === 80 ? this.thresholdInput80 : this.thresholdInput100;
    await this.page.fill(thresholdInput, thresholdPercentage.toString());
    await this.page.check(`[data-testid="enable-threshold-${thresholdPercentage}"]`);
  }

  async saveThresholdConfiguration() {
    await this.page.click(this.saveThresholdBtn);
    await this.page.waitForSelector('[data-testid="config-saved-toast"]', { state: 'visible' });
  }

  async verifyThresholdsConfigured() {
    const statusText = await this.page.textContent(this.thresholdStatusIndicator);
    return statusText.includes('Configured') || statusText.includes('Active');
  }

  async navigateToNotificationSystem() {
    await this.page.click('[data-testid="nav-notification-system"]');
    await this.page.waitForSelector(this.notificationSystemPanel, { state: 'visible' });
  }

  async verifyNotificationSystemOperational() {
    const statusText = await this.page.textContent(this.systemStatusIndicator);
    return statusText.includes('Operational') || statusText.includes('Active');
  }

  async verifyCommunicationChannelsAvailable() {
    const channels = await this.page.$$(this.channelStatusBadge);
    for (const channel of channels) {
      const status = await channel.textContent();
      if (!status.includes('Available') && !status.includes('Active')) {
        return false;
      }
    }
    return channels.length > 0;
  }

  async navigateToPackageActivation() {
    await this.page.click('[data-testid="nav-package-activation"]');
    await this.page.waitForSelector(this.packageActivationSection, { state: 'visible' });
  }

  async activatePackage(packageType, testLine) {
    await this.page.click(this.packageTypeDropdown);
    await this.page.click(`[data-testid="package-option-${packageType}"]`);
    await this.page.fill(this.testLineInput, testLine);
    await this.page.click(this.activatePackageBtn);
    await this.page.waitForSelector(`[data-testid="package-activated-${testLine}"]`, { state: 'visible' });
  }

  async verifyPackagesActivated() {
    const packages = await this.page.$$(this.packageStatusBadge);
    for (const pkg of packages) {
      const status = await pkg.textContent();
      if (!status.includes('Active') && !status.includes('Activated')) {
        return false;
      }
    }
    return packages.length >= 4;
  }

  async verifyNotificationRulesAssociated() {
    const indicators = await this.page.$$(this.notificationRulesIndicator);
    for (const indicator of indicators) {
      const status = await indicator.textContent();
      if (!status.includes('Associated') && !status.includes('Linked')) {
        return false;
      }
    }
    return indicators.length >= 4;
  }

  async navigateToConsumptionSimulator() {
    await this.page.click('[data-testid="nav-consumption-simulator"]');
    await this.page.waitForSelector(this.consumptionSimulatorPanel, { state: 'visible' });
  }

  async simulateConsumption(testLine, percentage) {
    await this.page.click(this.lineSelector);
    await this.page.click(`[data-testid="line-option-${testLine}"]`);
    await this.page.fill(this.consumptionPercentageInput, percentage.toString());
    await this.page.click(this.simulateConsumptionBtn);
    await this.page.waitForSelector(`[data-testid="consumption-reached-${percentage}"]`, { state: 'visible', timeout: 10000 });
  }

  async verifyAutomaticDetection(thresholdPercentage) {
    const detectionIndicator = await this.page.textContent(this.automaticDetectionIndicator);
    return detectionIndicator.includes('Automatic') && detectionIndicator.includes(thresholdPercentage.toString());
  }

  async verifyNotificationsGenerated(thresholdPercentage) {
    const rows = await this.page.$$(`${this.notificationLogRow}[data-threshold="${thresholdPercentage}"]`);
    return rows.length;
  }

  async verifyNoManualInterventionRequired() {
    const manualFlags = await this.page.$$(this.manualInterventionFlag);
    for (const flag of manualFlags) {
      const value = await flag.textContent();
      if (value.includes('Manual') || value.includes('Required')) {
        return false;
      }
    }
    return true;
  }

  async verifyNotificationsSentThroughChannels() {
    const deliveryStatuses = await this.page.$$(this.channelDeliveryStatus);
    for (const status of deliveryStatuses) {
      const text = await status.textContent();
      if (!text.includes('Sent') && !text.includes('Delivered')) {
        return false;
      }
    }
    return deliveryStatuses.length > 0;
  }

  async getUsedCommunicationChannels() {
    const channels = await this.page.$$('[data-testid="used-channel-name"]');
    const channelNames = [];
    for (const channel of channels) {
      channelNames.push(await channel.textContent());
    }
    return channelNames;
  }

  async verifyRealTimeProcessing() {
    const processingTime = await this.page.textContent(this.processingTimeDisplay);
    return processingTime.includes('Real-time') || processingTime.includes('Immediate');
  }

  async getNotificationProcessingDelay() {
    const timestamps = await this.page.$$(this.deliveryTimestamp);
    if (timestamps.length < 2) return 0;
    
    const detectionTime = await timestamps[0].getAttribute('data-timestamp');
    const deliveryTime = await timestamps[1].getAttribute('data-timestamp');
    
    return parseInt(deliveryTime) - parseInt(detectionTime);
  }
}

module.exports = NotificationThresholdsPage;