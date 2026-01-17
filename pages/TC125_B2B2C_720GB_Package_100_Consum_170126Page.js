const { expect } = require('@playwright/test');

class PackageNotificationPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.packageManagementMenu = page.locator('[data-testid="package-management-menu"]');
    this.packageManagementSection = page.locator('[data-testid="package-management-section"]');
    
    // Line and plan locators
    this.activeLineIndicator = page.locator('[data-testid="active-line-indicator"]');
    this.soldPlanBadge = page.locator('[data-testid="sold-plan-badge"]');
    this.lineStatusField = page.locator('[data-testid="line-status-field"]');
    
    // Package locators
    this.packageListTable = page.locator('[data-testid="package-list-table"]');
    this.packageNameCell = page.locator('[data-testid="package-name-cell"]');
    this.packageCostField = page.locator('[data-testid="package-cost-field"]');
    this.packageValidityField = page.locator('[data-testid="package-validity-field"]');
    this.packageCapacityField = page.locator('[data-testid="package-capacity-field"]');
    this.activatePackageButton = page.locator('[data-testid="activate-package-btn"]');
    this.packageActivationConfirmation = page.locator('[data-testid="package-activation-confirmation"]');
    
    // Consumption locators
    this.consumptionSimulatorSection = page.locator('[data-testid="consumption-simulator-section"]');
    this.consumptionInputField = page.locator('[data-testid="consumption-input-field"]');
    this.simulateConsumptionButton = page.locator('[data-testid="simulate-consumption-btn"]');
    this.currentConsumptionDisplay = page.locator('[data-testid="current-consumption-display"]');
    this.consumptionPercentageDisplay = page.locator('[data-testid="consumption-percentage-display"]');
    this.thresholdReachedIndicator = page.locator('[data-testid="threshold-reached-indicator"]');
    
    // Notification locators
    this.notificationSettingsSection = page.locator('[data-testid="notification-settings-section"]');
    this.thresholdConfigList = page.locator('[data-testid="threshold-config-list"]');
    this.notificationListSection = page.locator('[data-testid="notification-list-section"]');
    this.notificationRow = page.locator('[data-testid="notification-row"]');
    this.notificationPackageNameField = page.locator('[data-testid="notification-package-name"]');
    this.notificationCapacityField = page.locator('[data-testid="notification-capacity"]');
    this.notificationConsumptionField = page.locator('[data-testid="notification-consumption"]');
    this.notificationPercentageField = page.locator('[data-testid="notification-percentage"]');
    this.notificationDateField = page.locator('[data-testid="notification-date"]');
    this.notificationTimestampField = page.locator('[data-testid="notification-timestamp"]');
    
    // Audit and validation locators
    this.auditLogSection = page.locator('[data-testid="audit-log-section"]');
    this.duplicateWarningMessage = page.locator('[data-testid="duplicate-warning-message"]');
    this.notificationCountDisplay = page.locator('[data-testid="notification-count-display"]');
    
    // Internal state
    this._notificationData = null;
    this._duplicateCheckResult = false;
  }

  async navigateToPackageManagement() {
    await this.packageManagementMenu.click();
    await this.packageManagementSection.waitFor({ state: 'visible' });
  }

  async verifyLineWithSOLDPlanIsActive() {
    await expect(this.activeLineIndicator).toBeVisible();
    await expect(this.soldPlanBadge).toBeVisible();
    const status = await this.lineStatusField.textContent();
    return status.toLowerCase().includes('active');
  }

  async verifyPackageExistsInBSCS7(packageName, cost, months) {
    await this.packageListTable.waitFor({ state: 'visible' });
    const packageRow = this.page.locator(`[data-testid="package-row-${packageName.replace(/\s+/g, '-').toLowerCase()}"]`);
    await expect(packageRow).toBeVisible();
    
    const displayedCost = await packageRow.locator('[data-testid="package-cost-cell"]').textContent();
    const displayedValidity = await packageRow.locator('[data-testid="package-validity-cell"]').textContent();
    
    return displayedCost.includes(cost.toString()) && displayedValidity.includes(months.toString());
  }

  async verifyNotificationThresholdsConfigured(thresholds) {
    await this.notificationSettingsSection.click();
    for (const threshold of thresholds) {
      const thresholdItem = this.page.locator(`[data-testid="threshold-item-${threshold}"]`);
      await expect(thresholdItem).toBeVisible();
    }
  }

  async activatePackage(packageName) {
    const packageRow = this.page.locator(`[data-testid="package-row-${packageName.replace(/\s+/g, '-').toLowerCase()}"]`);
    await packageRow.locator('[data-testid="select-package-checkbox"]').click();
    await this.activatePackageButton.click();
    await this.packageActivationConfirmation.waitFor({ state: 'visible' });
  }

  async verifyPackageActivation(capacityGB, validityDays) {
    const confirmationText = await this.packageActivationConfirmation.textContent();
    const capacityMatch = confirmationText.includes(capacityGB.toString());
    const validityMatch = confirmationText.includes(validityDays.toString());
    return capacityMatch && validityMatch;
  }

  async simulateDataConsumption(consumptionGB) {
    await this.consumptionSimulatorSection.click();
    await this.consumptionInputField.fill(consumptionGB.toString());
    await this.simulateConsumptionButton.click();
    await this.page.waitForTimeout(2000);
  }

  async getRegisteredConsumption() {
    const consumptionText = await this.currentConsumptionDisplay.textContent();
    const match = consumptionText.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async verifyThresholdDetected(threshold) {
    const indicatorText = await this.thresholdReachedIndicator.textContent();
    return indicatorText.includes(threshold.toString());
  }

  async getNotificationForThreshold(percentage) {
    await this.notificationListSection.click();
    const notificationItem = this.page.locator(`[data-testid="notification-item-${percentage}"]`);
    await notificationItem.waitFor({ state: 'visible' });
    
    this._notificationData = {
      packageName: await notificationItem.locator('[data-testid="notif-package-name"]').textContent(),
      capacity: await notificationItem.locator('[data-testid="notif-capacity"]').textContent(),
      consumption: await notificationItem.locator('[data-testid="notif-consumption"]').textContent(),
      percentage: await notificationItem.locator('[data-testid="notif-percentage"]').textContent(),
      date: await notificationItem.locator('[data-testid="notif-date"]').textContent(),
      timestamp: await notificationItem.locator('[data-testid="notif-timestamp"]').textContent()
    };
    
    return this._notificationData;
  }

  async verifyNotificationGenerated(packageName, percentage) {
    const notificationItem = this.page.locator(`[data-testid="notification-item-${percentage}"]`);
    const isVisible = await notificationItem.isVisible();
    if (!isVisible) return false;
    
    const notifPackageName = await notificationItem.locator('[data-testid="notif-package-name"]').textContent();
    return notifPackageName.includes(packageName);
  }

  async getNotificationPackageName() {
    if (this._notificationData) {
      return this._notificationData.packageName.trim();
    }
    return await this.notificationPackageNameField.textContent();
  }

  async getNotificationTotalCapacity() {
    if (this._notificationData) {
      return this._notificationData.capacity.trim();
    }
    return await this.notificationCapacityField.textContent();
  }

  async getNotificationTotalConsumption() {
    if (this._notificationData) {
      return this._notificationData.consumption.trim();
    }
    return await this.notificationConsumptionField.textContent();
  }

  async getNotificationPercentage() {
    if (this._notificationData) {
      const percentText = this._notificationData.percentage.trim();
      const match = percentText.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    }
    const text = await this.notificationPercentageField.textContent();
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async getNotificationDepletionDate() {
    if (this._notificationData) {
      return this._notificationData.date.trim();
    }
    return await this.notificationDateField.textContent();
  }

  async getNotificationTimestampData() {
    await this.auditLogSection.click();
    const timestampText = await this.notificationTimestampField.textContent();
    return { timestamp: timestampText };
  }

  async verifyNotificationHasCompleteTimestamp() {
    const timestampText = await this.notificationTimestampField.textContent();
    const timestampPattern = /\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}/;
    return timestampPattern.test(timestampText);
  }

  async checkForDuplicateNotifications(packageName, percentage) {
    const notificationRows = this.page.locator(`[data-testid="notification-row"][data-package="${packageName}"][data-threshold="${percentage}"]`);
    const count = await notificationRows.count();
    this._duplicateCheckResult = count > 1;
  }

  async hasDuplicateNotifications() {
    return this._duplicateCheckResult;
  }
}

module.exports = PackageNotificationPage;