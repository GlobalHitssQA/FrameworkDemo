const { expect } = require('@playwright/test');

class NotificationControlPage {
  constructor(page) {
    this.page = page;
    
    this.packageManagementSection = '[data-testid="package-management-section"]';
    this.testLineSelector = '[data-testid="test-line-selector"]';
    this.soldPlanIndicator = '[data-testid="sold-plan-indicator"]';
    this.notificationControlPanel = '[data-testid="notification-control-panel"]';
    this.clearRecordsButton = '[data-testid="clear-notification-records-btn"]';
    this.trial6GBPackageOption = '[data-testid="package-option-trial-6gb"]';
    this.activatePackageButton = '[data-testid="activate-package-btn"]';
    this.packageStatusIndicator = '[data-testid="package-status-indicator"]';
    this.notificationRecordsTable = '[data-testid="notification-records-table"]';
    this.consumptionSimulator = '[data-testid="consumption-simulator"]';
    this.consumptionPercentageInput = '[data-testid="consumption-percentage-input"]';
    this.simulateConsumptionButton = '[data-testid="simulate-consumption-btn"]';
    this.thresholdDetectionAlert = '[data-testid="threshold-detection-alert"]';
    this.notificationGeneratedMessage = '[data-testid="notification-generated-message"]';
    this.controlTableRecords = '[data-testid="control-table-records"]';
    this.forceConditionButton = '[data-testid="force-condition-btn"]';
    this.duplicatePreventionMessage = '[data-testid="duplicate-prevention-message"]';
    this.auditLogsSection = '[data-testid="audit-logs-section"]';
    this.auditLogEntries = '[data-testid="audit-log-entry"]';
    this.b2b2cPackageSection = '[data-testid="b2b2c-package-section"]';
    this.packageTypeSelector = '[data-testid="package-type-selector"]';
    this.validationResultsPanel = '[data-testid="validation-results-panel"]';
    this.notificationCountDisplay = '[data-testid="notification-count-display"]';
  }

  async navigateToPackageManagement() {
    await this.page.locator(this.packageManagementSection).waitFor({ state: 'visible' });
  }

  async verifyTestLineWithSOLDPlanAvailable() {
    await this.page.locator(this.testLineSelector).click();
    const soldPlan = await this.page.locator(this.soldPlanIndicator).isVisible();
    expect(soldPlan).toBe(true);
  }

  async verifyNotificationControlSystemInitialized() {
    await this.page.locator(this.notificationControlPanel).waitFor({ state: 'visible' });
  }

  async clearPreviousNotificationRecords() {
    const clearButton = this.page.locator(this.clearRecordsButton);
    if (await clearButton.isVisible()) {
      await clearButton.click();
      await this.page.waitForResponse(response => response.url().includes('/notifications/clear'));
    }
  }

  async activateTrial6GBPackage() {
    await this.page.locator(this.trial6GBPackageOption).click();
    await this.page.locator(this.activatePackageButton).click();
    await this.page.waitForResponse(response => response.url().includes('/packages/activate'));
    const packageId = await this.page.locator('[data-testid="activated-package-id"]').textContent();
    return packageId;
  }

  async verifyPackageActivationStatus(packageId) {
    const statusElement = this.page.locator(`${this.packageStatusIndicator}[data-package-id="${packageId}"]`);
    const status = await statusElement.textContent();
    return status === 'ACTIVE' || status === 'ACTIVO';
  }

  async verifyNoExistingNotificationRecords(packageId) {
    const records = await this.page.locator(`${this.notificationRecordsTable} tr[data-package-id="${packageId}"]`).count();
    return records === 0;
  }

  async simulateDataConsumption(packageId, percentage) {
    await this.page.locator(this.consumptionSimulator).click();
    await this.page.locator(this.consumptionPercentageInput).fill(String(percentage));
    await this.page.locator(`[data-testid="package-selector"] option[value="${packageId}"]`).click();
    await this.page.locator(this.simulateConsumptionButton).click();
    await this.page.waitForResponse(response => response.url().includes('/consumption/simulate'));
  }

  async verifyThresholdDetection(threshold) {
    const alert = this.page.locator(this.thresholdDetectionAlert);
    await alert.waitFor({ state: 'visible', timeout: 10000 });
    const alertText = await alert.textContent();
    return alertText.includes(`${threshold}%`);
  }

  async verifyNotificationGenerated(packageId, threshold) {
    const message = this.page.locator(`${this.notificationGeneratedMessage}[data-threshold="${threshold}"]`);
    return await message.isVisible();
  }

  async verifyEventInControlTable(packageId, threshold) {
    const record = this.page.locator(`${this.controlTableRecords} tr[data-package-id="${packageId}"][data-threshold="${threshold}"]`);
    return await record.isVisible();
  }

  async forceConsumptionCondition(packageId, threshold) {
    await this.page.locator(`[data-testid="force-threshold-input"]`).fill(String(threshold));
    await this.page.locator(`[data-testid="force-package-selector"] option[value="${packageId}"]`).click();
    await this.page.locator(this.forceConditionButton).click();
    await this.page.waitForTimeout(2000);
  }

  async verifyExistingNotificationRecord(packageId, threshold) {
    const existingRecord = this.page.locator(`${this.controlTableRecords} tr[data-package-id="${packageId}"][data-threshold="${threshold}"]`);
    return await existingRecord.isVisible();
  }

  async checkForDuplicateNotification(packageId, threshold) {
    const records = await this.page.locator(`${this.controlTableRecords} tr[data-package-id="${packageId}"][data-threshold="${threshold}"]`).count();
    return records > 1;
  }

  async getNotificationRecords(packageId, threshold) {
    const records = await this.page.locator(`${this.controlTableRecords} tr[data-package-id="${packageId}"][data-threshold="${threshold}"]`).all();
    return records;
  }

  async checkAuditLogsForDuplicates(packageId, threshold) {
    await this.page.locator(this.auditLogsSection).click();
    const logEntries = await this.page.locator(`${this.auditLogEntries}[data-package-id="${packageId}"][data-threshold="${threshold}"]`).count();
    return logEntries > 1;
  }

  async verifyDifferentNotificationEvent(packageId, previousThreshold, newThreshold) {
    const previousEvent = await this.page.locator(`${this.controlTableRecords} tr[data-package-id="${packageId}"][data-threshold="${previousThreshold}"]`).getAttribute('data-event-id');
    const newEvent = await this.page.locator(`${this.controlTableRecords} tr[data-package-id="${packageId}"][data-threshold="${newThreshold}"]`).getAttribute('data-event-id');
    return previousEvent !== newEvent;
  }

  async validateDuplicatePreventionForB2B2CPackages() {
    await this.page.locator(this.b2b2cPackageSection).click();
    const packageTypes = await this.page.locator(`${this.packageTypeSelector} option`).all();
    for (const packageType of packageTypes) {
      const value = await packageType.getAttribute('value');
      if (value && (value.includes('TRIAL') || value.includes('B2B2C'))) {
        await this.page.locator(this.packageTypeSelector).selectOption(value);
        await this.page.locator('[data-testid="validate-duplicate-prevention-btn"]').click();
        await this.page.waitForResponse(response => response.url().includes('/validate/duplicate-prevention'));
      }
    }
  }

  async verifyDuplicateControlForAllPackageTypes() {
    const resultsPanel = this.page.locator(this.validationResultsPanel);
    const allPassed = await resultsPanel.locator('[data-testid="validation-status-failed"]').count();
    return allPassed === 0;
  }

  async checkForRepeatedNotificationsAllPackages() {
    const notificationCounts = await this.page.locator(this.notificationCountDisplay).all();
    for (const countElement of notificationCounts) {
      const countText = await countElement.textContent();
      const count = parseInt(countText, 10);
      if (count > 1) {
        return true;
      }
    }
    return false;
  }
}

module.exports = NotificationControlPage;