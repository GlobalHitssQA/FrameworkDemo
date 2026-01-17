const { expect } = require('@playwright/test');

class NotificationAlertPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.lineManagementMenu = '[data-testid="line-management-menu"]';
    this.bscs7ConfigurationMenu = '[data-testid="bscs7-configuration-menu"]';
    this.notificationSystemMenu = '[data-testid="notification-system-menu"]';
    this.packageActivationMenu = '[data-testid="package-activation-menu"]';
    this.consumptionSimulatorMenu = '[data-testid="consumption-simulator-menu"]';
    
    // Line management locators
    this.lineStatusIndicator = '[data-testid="line-status-indicator"]';
    this.linePlanLabel = '[data-testid="line-plan-label"]';
    
    // Package configuration locators
    this.packageNameField = '[data-testid="package-name-field"]';
    this.packageCostField = '[data-testid="package-cost-field"]';
    this.packageCapacityField = '[data-testid="package-capacity-field"]';
    this.packageValidityField = '[data-testid="package-validity-field"]';
    
    // Package activation locators
    this.packageSelector = '[data-testid="package-selector"]';
    this.packageOption = '[data-testid="package-option"]';
    this.validityInput = '[data-testid="validity-months-input"]';
    this.activatePackageButton = '[data-testid="activate-package-button"]';
    this.activationConfirmation = '[data-testid="activation-confirmation"]';
    
    // Package details locators
    this.activatedPackageName = '[data-testid="activated-package-name"]';
    this.activatedPackageCapacity = '[data-testid="activated-package-capacity"]';
    this.activatedPackageCost = '[data-testid="activated-package-cost"]';
    this.activatedPackageValidity = '[data-testid="activated-package-validity-days"]';
    
    // Consumption simulator locators
    this.consumptionInput = '[data-testid="consumption-gb-input"]';
    this.executeSimulationButton = '[data-testid="execute-simulation-button"]';
    this.accumulatedConsumptionDisplay = '[data-testid="accumulated-consumption-display"]';
    this.thresholdDetectedDisplay = '[data-testid="threshold-detected-display"]';
    
    // Notification system locators
    this.notificationSystemStatus = '[data-testid="notification-system-status"]';
    this.thresholdMechanismStatus = '[data-testid="threshold-mechanism-status"]';
    this.alertNotificationCard = '[data-testid="alert-notification-card"]';
    this.notificationPackageName = '[data-testid="notification-package-name"]';
    this.notificationTotalCapacity = '[data-testid="notification-total-capacity"]';
    this.notificationCurrentConsumption = '[data-testid="notification-current-consumption"]';
    this.notificationPercentage = '[data-testid="notification-percentage"]';
    this.notificationRemainingValidity = '[data-testid="notification-remaining-validity"]';
    this.notificationTimestamp = '[data-testid="notification-timestamp"]';
    this.notificationsList = '[data-testid="notifications-list"]';
    this.triggerDuplicateButton = '[data-testid="trigger-duplicate-notification-button"]';
  }

  async navigateToLineManagement() {
    await this.page.click(this.lineManagementMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineIsActiveOnSOLDPlan() {
    const status = await this.page.textContent(this.lineStatusIndicator);
    const plan = await this.page.textContent(this.linePlanLabel);
    expect(status.toLowerCase()).toContain('activ');
    expect(plan).toContain('SOLD');
  }

  async navigateToBSCS7Configuration() {
    await this.page.click(this.bscs7ConfigurationMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPackageConfiguration(packageName, cost) {
    const nameField = await this.page.textContent(this.packageNameField);
    const costField = await this.page.textContent(this.packageCostField);
    expect(nameField).toContain(packageName);
    expect(costField).toContain(cost);
  }

  async navigateToNotificationSystem() {
    await this.page.click(this.notificationSystemMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyNotificationSystemStatus() {
    const status = await this.page.textContent(this.notificationSystemStatus);
    expect(status.toLowerCase()).toContain('operativ');
  }

  async verifyThresholdDetectionMechanism() {
    const status = await this.page.textContent(this.thresholdMechanismStatus);
    expect(status.toLowerCase()).toMatch(/activ|funcionando|working/);
  }

  async navigateToPackageActivation() {
    await this.page.click(this.packageActivationMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async selectPackage(packageName) {
    await this.page.click(this.packageSelector);
    await this.page.click(`${this.packageOption}[data-value="${packageName}"]`);
  }

  async setPackageValidity(months) {
    await this.page.fill(this.validityInput, months);
  }

  async confirmPackageActivation() {
    await this.page.click(this.activatePackageButton);
    await this.page.waitForSelector(this.activationConfirmation);
  }

  async getActivatedPackageDetails() {
    return {
      name: await this.page.textContent(this.activatedPackageName),
      capacity: await this.page.textContent(this.activatedPackageCapacity),
      cost: await this.page.textContent(this.activatedPackageCost),
      validityDays: await this.page.textContent(this.activatedPackageValidity)
    };
  }

  async navigateToConsumptionSimulator() {
    await this.page.click(this.consumptionSimulatorMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async setSimulatedConsumption(gbAmount) {
    await this.page.fill(this.consumptionInput, gbAmount);
  }

  async executeConsumptionSimulation() {
    await this.page.click(this.executeSimulationButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getConsumptionData() {
    return {
      accumulatedGB: await this.page.textContent(this.accumulatedConsumptionDisplay),
      thresholdDetected: await this.page.textContent(this.thresholdDetectedDisplay)
    };
  }

  async waitForNotificationGeneration() {
    await this.page.waitForSelector(this.alertNotificationCard, { timeout: 30000 });
  }

  async verifyAlertNotificationGenerated(threshold) {
    const isVisible = await this.page.isVisible(this.alertNotificationCard);
    const percentage = await this.page.textContent(this.notificationPercentage);
    return isVisible && percentage.includes(threshold);
  }

  async getNotificationContent() {
    return {
      packageName: await this.page.textContent(this.notificationPackageName),
      totalCapacity: await this.page.textContent(this.notificationTotalCapacity),
      currentConsumption: await this.page.textContent(this.notificationCurrentConsumption),
      percentage: await this.page.textContent(this.notificationPercentage),
      remainingValidity: await this.page.textContent(this.notificationRemainingValidity)
    };
  }

  async getNotificationTimestamp() {
    return await this.page.textContent(this.notificationTimestamp);
  }

  async verifyTimestampFormat(timestamp) {
    const timestampRegex = /^\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}/;
    return timestampRegex.test(timestamp);
  }

  async triggerDuplicateNotificationAttempt() {
    await this.page.click(this.triggerDuplicateButton);
    await this.page.waitForTimeout(2000);
  }

  async countNotificationsForThreshold(threshold) {
    const notifications = await this.page.$$(`${this.alertNotificationCard}:has-text("${threshold}")`);
    return notifications.length;
  }
}

module.exports = NotificationAlertPage;