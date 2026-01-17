const { expect } = require('@playwright/test');

class TrialPackagePage {
  constructor(page) {
    this.page = page;
    
    this.lineManagementMenu = '[data-testid="line-management-menu"]';
    this.activeLineIndicator = '[data-testid="active-line-indicator"]';
    this.soldPlanBadge = '[data-testid="sold-plan-badge"]';
    this.bscs7ConfigSection = '[data-testid="bscs7-configuration-section"]';
    this.trialPackageConfig = '[data-testid="trial-package-config"]';
    this.notificationSettingsMenu = '[data-testid="notification-settings-menu"]';
    this.threshold80Checkbox = '[data-testid="threshold-80-checkbox"]';
    this.threshold100Checkbox = '[data-testid="threshold-100-checkbox"]';
    this.testLineSelector = '[data-testid="test-line-selector"]';
    this.activatePackageButton = '[data-testid="activate-package-button"]';
    this.trialPackageOption = '[data-testid="trial-6gb-package-option"]';
    this.confirmActivationButton = '[data-testid="confirm-activation-button"]';
    this.packageDetailsSection = '[data-testid="package-details-section"]';
    this.packageNameLabel = '[data-testid="package-name-label"]';
    this.packageCapacityLabel = '[data-testid="package-capacity-label"]';
    this.packageValidityLabel = '[data-testid="package-validity-label"]';
    this.consumptionSimulatorMenu = '[data-testid="consumption-simulator-menu"]';
    this.consumptionPercentageInput = '[data-testid="consumption-percentage-input"]';
    this.executeSimulationButton = '[data-testid="execute-simulation-button"]';
    this.consumptionStatusSection = '[data-testid="consumption-status-section"]';
    this.consumedDataLabel = '[data-testid="consumed-data-label"]';
    this.consumptionPercentageLabel = '[data-testid="consumption-percentage-label"]';
    this.thresholdReachedIndicator = '[data-testid="threshold-reached-indicator"]';
    this.notificationsPanelMenu = '[data-testid="notifications-panel-menu"]';
    this.notificationsList = '[data-testid="notifications-list"]';
    this.notificationItem = '[data-testid="notification-item"]';
    this.notificationPackageName = '[data-testid="notification-package-name"]';
    this.notificationCapacity = '[data-testid="notification-capacity"]';
    this.notificationPercentage = '[data-testid="notification-percentage"]';
    this.notificationGenerationDate = '[data-testid="notification-generation-date"]';
    this.notificationGenerationTime = '[data-testid="notification-generation-time"]';
    this.auditRegistrationStatus = '[data-testid="audit-registration-status"]';
  }

  async navigateToLineManagement() {
    await this.page.click(this.lineManagementMenu);
    await this.page.waitForSelector(this.activeLineIndicator);
  }

  async verifyActiveLineWithSOLDPlan() {
    await expect(this.page.locator(this.activeLineIndicator)).toBeVisible();
    await expect(this.page.locator(this.soldPlanBadge)).toBeVisible();
  }

  async navigateToBSCS7Configuration() {
    await this.page.click(this.bscs7ConfigSection);
    await this.page.waitForSelector(this.trialPackageConfig);
  }

  async verifyTrialPackageConfigured() {
    await expect(this.page.locator(this.trialPackageConfig)).toBeVisible();
  }

  async navigateToNotificationSettings() {
    await this.page.click(this.notificationSettingsMenu);
    await this.page.waitForSelector(this.threshold80Checkbox);
  }

  async verifyNotificationThresholdsConfigured() {
    await expect(this.page.locator(this.threshold80Checkbox)).toBeChecked();
    await expect(this.page.locator(this.threshold100Checkbox)).toBeChecked();
  }

  async selectTestLine() {
    await this.page.click(this.testLineSelector);
  }

  async activateTrialPackage() {
    await this.page.click(this.activatePackageButton);
    await this.page.click(this.trialPackageOption);
    await this.page.click(this.confirmActivationButton);
    await this.page.waitForSelector(this.packageDetailsSection);
  }

  async getActivatedPackageDetails() {
    const name = await this.page.textContent(this.packageNameLabel);
    const capacity = await this.page.textContent(this.packageCapacityLabel);
    const validity = await this.page.textContent(this.packageValidityLabel);
    return { name, capacity, validity };
  }

  async navigateToConsumptionSimulator() {
    await this.page.click(this.consumptionSimulatorMenu);
    await this.page.waitForSelector(this.consumptionPercentageInput);
  }

  async setConsumptionPercentage(percentage) {
    await this.page.fill(this.consumptionPercentageInput, percentage.toString());
  }

  async executeConsumptionSimulation() {
    await this.page.click(this.executeSimulationButton);
    await this.page.waitForSelector(this.consumptionStatusSection);
  }

  async getConsumptionStatus() {
    const consumed = await this.page.textContent(this.consumedDataLabel);
    const percentage = await this.page.textContent(this.consumptionPercentageLabel);
    const thresholdReached = await this.page.isVisible(this.thresholdReachedIndicator);
    return { consumed, percentage, thresholdReached };
  }

  async navigateToNotificationsPanel() {
    await this.page.click(this.notificationsPanelMenu);
    await this.page.waitForSelector(this.notificationsList);
  }

  async verifyNotificationGenerated(thresholdPercentage) {
    const notifications = this.page.locator(this.notificationItem);
    const count = await notifications.count();
    for (let i = 0; i < count; i++) {
      const text = await notifications.nth(i).textContent();
      if (text.includes(thresholdPercentage)) {
        return true;
      }
    }
    return false;
  }

  async getLatestNotificationDetails() {
    const latestNotification = this.page.locator(this.notificationItem).first();
    const packageName = await latestNotification.locator(this.notificationPackageName).textContent();
    const capacity = await latestNotification.locator(this.notificationCapacity).textContent();
    const consumptionPercentage = await latestNotification.locator(this.notificationPercentage).textContent();
    return { packageName, capacity, consumptionPercentage };
  }

  async getNotificationAuditInfo() {
    const latestNotification = this.page.locator(this.notificationItem).first();
    const generationDate = await latestNotification.locator(this.notificationGenerationDate).textContent();
    const generationTime = await latestNotification.locator(this.notificationGenerationTime).textContent();
    const registeredInSystem = await latestNotification.locator(this.auditRegistrationStatus).isVisible();
    return { generationDate, generationTime, registeredInSystem };
  }
}

module.exports = TrialPackagePage;