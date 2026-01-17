const { expect } = require('@playwright/test');

class ConsumptionAlertPage {
  constructor(page) {
    this.page = page;
    
    this.userManagementMenu = '[data-testid="user-management-menu"]';
    this.activeUsersList = '[data-testid="active-users-list"]';
    this.soldPlanFilter = '[data-testid="sold-plan-filter"]';
    this.userLineStatus = '[data-testid="user-line-status"]';
    
    this.packageConfigMenu = '[data-testid="package-configuration-menu"]';
    this.b2b2cPackageRow = '[data-testid="package-row-b2b2c-6gb"]';
    this.packageCostField = '[data-testid="package-cost-field"]';
    this.packageCapacityField = '[data-testid="package-capacity-field"]';
    
    this.notificationSettingsMenu = '[data-testid="notification-settings-menu"]';
    this.thresholdConfigSection = '[data-testid="threshold-config-section"]';
    this.threshold80Checkbox = '[data-testid="threshold-80-checkbox"]';
    this.threshold100Checkbox = '[data-testid="threshold-100-checkbox"]';
    this.notificationSystemStatus = '[data-testid="notification-system-status"]';
    
    this.packageActivationMenu = '[data-testid="package-activation-menu"]';
    this.packageSelector = '[data-testid="package-selector"]';
    this.b2b2c6gbOption = '[data-testid="package-option-b2b2c-6gb"]';
    this.validityInput = '[data-testid="package-validity-input"]';
    this.activatePackageButton = '[data-testid="activate-package-button"]';
    this.activationConfirmation = '[data-testid="activation-confirmation"]';
    
    this.packageDetailsSection = '[data-testid="package-details-section"]';
    this.packageNameDisplay = '[data-testid="package-name-display"]';
    this.packageCapacityDisplay = '[data-testid="package-capacity-display"]';
    this.packageValidityDisplay = '[data-testid="package-validity-display"]';
    this.packageCostDisplay = '[data-testid="package-cost-display"]';
    
    this.consumptionSimulatorMenu = '[data-testid="consumption-simulator-menu"]';
    this.consumptionAmountInput = '[data-testid="consumption-amount-input"]';
    this.executeSimulationButton = '[data-testid="execute-simulation-button"]';
    this.simulationProgressBar = '[data-testid="simulation-progress-bar"]';
    
    this.consumptionStatusSection = '[data-testid="consumption-status-section"]';
    this.consumedAmountDisplay = '[data-testid="consumed-amount-display"]';
    this.consumptionPercentageDisplay = '[data-testid="consumption-percentage-display"]';
    this.thresholdReachedIndicator = '[data-testid="threshold-reached-indicator"]';
    
    this.notificationsPanel = '[data-testid="notifications-panel"]';
    this.alertNotificationItem = '[data-testid="alert-notification-item"]';
    this.notificationPackageName = '[data-testid="notification-package-name"]';
    this.notificationCapacity = '[data-testid="notification-capacity"]';
    this.notificationCurrentConsumption = '[data-testid="notification-current-consumption"]';
    this.notificationPercentage = '[data-testid="notification-percentage"]';
    this.notificationTimestamp = '[data-testid="notification-timestamp"]';
    this.notificationDate = '[data-testid="notification-date"]';
    this.notificationTime = '[data-testid="notification-time"]';
    this.notificationsList = '[data-testid="notifications-list"]';
  }

  async navigateToUserManagement() {
    await this.page.click(this.userManagementMenu);
    await this.page.waitForSelector(this.activeUsersList);
  }

  async verifyUserWithSOLDPlanExists() {
    await this.page.click(this.soldPlanFilter);
    await this.page.waitForSelector(this.userLineStatus);
    const status = await this.page.textContent(this.userLineStatus);
    return status.includes('Activo') || status.includes('Active');
  }

  async navigateToPackageConfiguration() {
    await this.page.click(this.packageConfigMenu);
    await this.page.waitForSelector(this.b2b2cPackageRow);
  }

  async verifyB2B2CPackageConfiguration(capacity, cost) {
    await this.page.click(this.b2b2cPackageRow);
    const capacityValue = await this.page.textContent(this.packageCapacityField);
    const costValue = await this.page.textContent(this.packageCostField);
    return capacityValue.includes(capacity) && costValue.includes(cost);
  }

  async navigateToNotificationSettings() {
    await this.page.click(this.notificationSettingsMenu);
    await this.page.waitForSelector(this.thresholdConfigSection);
  }

  async verifyNotificationThresholdsConfigured(thresholds) {
    const systemStatus = await this.page.textContent(this.notificationSystemStatus);
    const is80Checked = await this.page.isChecked(this.threshold80Checkbox);
    const is100Checked = await this.page.isChecked(this.threshold100Checkbox);
    return systemStatus.includes('Operativo') && is80Checked && is100Checked;
  }

  async navigateToPackageActivation() {
    await this.page.click(this.packageActivationMenu);
    await this.page.waitForSelector(this.packageSelector);
  }

  async selectPackage(packageName) {
    await this.page.click(this.packageSelector);
    await this.page.click(this.b2b2c6gbOption);
  }

  async setPackageValidity(days) {
    await this.page.fill(this.validityInput, days);
  }

  async confirmPackageActivation() {
    await this.page.click(this.activatePackageButton);
    await this.page.waitForSelector(this.activationConfirmation);
  }

  async getActivatedPackageDetails() {
    await this.page.waitForSelector(this.packageDetailsSection);
    return {
      name: await this.page.textContent(this.packageNameDisplay),
      capacity: await this.page.textContent(this.packageCapacityDisplay),
      validity: await this.page.textContent(this.packageValidityDisplay),
      cost: await this.page.textContent(this.packageCostDisplay)
    };
  }

  async navigateToConsumptionSimulator() {
    await this.page.click(this.consumptionSimulatorMenu);
    await this.page.waitForSelector(this.consumptionAmountInput);
  }

  async inputConsumptionAmount(amount) {
    await this.page.fill(this.consumptionAmountInput, amount);
  }

  async executeConsumptionSimulation() {
    await this.page.click(this.executeSimulationButton);
    await this.page.waitForSelector(this.simulationProgressBar, { state: 'hidden', timeout: 60000 });
  }

  async getConsumptionStatus() {
    await this.page.waitForSelector(this.consumptionStatusSection);
    const thresholdIndicator = await this.page.isVisible(this.thresholdReachedIndicator);
    return {
      consumed: await this.page.textContent(this.consumedAmountDisplay),
      percentage: await this.page.textContent(this.consumptionPercentageDisplay),
      thresholdReached: thresholdIndicator
    };
  }

  async waitForNotificationGeneration() {
    await this.page.waitForSelector(this.alertNotificationItem, { timeout: 30000 });
  }

  async verifyAlertNotificationExists(threshold) {
    const notifications = await this.page.$$(this.alertNotificationItem);
    for (const notification of notifications) {
      const percentage = await notification.textContent();
      if (percentage.includes(threshold)) {
        return true;
      }
    }
    return false;
  }

  async getNotificationContent() {
    const latestNotification = await this.page.$(this.alertNotificationItem);
    return {
      packageName: await this.page.textContent(this.notificationPackageName),
      capacity: await this.page.textContent(this.notificationCapacity),
      currentConsumption: await this.page.textContent(this.notificationCurrentConsumption),
      percentage: await this.page.textContent(this.notificationPercentage)
    };
  }

  async getNotificationTimestamp() {
    const dateText = await this.page.textContent(this.notificationDate);
    const timeText = await this.page.textContent(this.notificationTime);
    const isValidDate = dateText && dateText.match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}/);
    const isValidTime = timeText && timeText.match(/\d{2}:\d{2}/);
    return {
      date: dateText,
      time: timeText,
      isValid: !!(isValidDate && isValidTime)
    };
  }

  async checkForDuplicateNotifications(threshold) {
    const notifications = await this.page.$$(this.alertNotificationItem);
    let count = 0;
    for (const notification of notifications) {
      const content = await notification.textContent();
      if (content.includes(threshold) && content.includes('B2B2C 6GB')) {
        count++;
      }
    }
    return {
      count: count,
      hasDuplicates: count > 1
    };
  }
}

module.exports = ConsumptionAlertPage;