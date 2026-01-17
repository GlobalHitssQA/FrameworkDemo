const { expect } = require('@playwright/test');

class NotificationAuditPage {
  constructor(page) {
    this.page = page;
    
    this.packageManagementLink = '[data-testid="package-management-link"]';
    this.auditSystemLink = '[data-testid="audit-system-link"]';
    this.consumptionSimulatorLink = '[data-testid="consumption-simulator-link"]';
    this.auditLogsLink = '[data-testid="audit-logs-link"]';
    
    this.testLineStatus = '[data-testid="test-line-status"]';
    this.testLineSelector = '[data-testid="test-line-selector"]';
    
    this.auditSystemStatus = '[data-testid="audit-system-status"]';
    this.eventLoggingStatus = '[data-testid="event-logging-status"]';
    
    this.packageTypeDropdown = '[data-testid="package-type-dropdown"]';
    this.packageOptionTrial6GB = '[data-testid="package-option-trial-6gb"]';
    this.packageOptionB2B2C = '[data-testid="package-option-b2b2c"]';
    this.activatePackageButton = '[data-testid="activate-package-button"]';
    this.packageActivatedStatus = '[data-testid="package-activated-status"]';
    this.activationTimestampField = '[data-testid="activation-timestamp"]';
    
    this.consumptionPercentageInput = '[data-testid="consumption-percentage-input"]';
    this.executeSimulationButton = '[data-testid="execute-simulation-button"]';
    this.simulationResultStatus = '[data-testid="simulation-result-status"]';
    
    this.notificationGeneratedIndicator = '[data-testid="notification-generated-indicator"]';
    this.notificationPercentageValue = '[data-testid="notification-percentage-value"]';
    this.notificationTimestampField = '[data-testid="notification-timestamp"]';
    
    this.notificationTypeFilter = '[data-testid="notification-type-filter"]';
    this.packageTypeFilter = '[data-testid="package-type-filter"]';
    this.currentPackageFilter = '[data-testid="current-package-filter"]';
    this.searchAuditButton = '[data-testid="search-audit-button"]';
    this.auditRecordsTable = '[data-testid="audit-records-table"]';
    this.auditRecordRow = '[data-testid="audit-record-row"]';
    this.auditRecordTimestamp = '[data-testid="audit-record-timestamp"]';
    this.auditRecordEventType = '[data-testid="audit-record-event-type"]';
    this.auditRecordTimezone = '[data-testid="audit-record-timezone"]';
  }

  async navigateToPackageManagement() {
    await this.page.click(this.packageManagementLink);
    await this.page.waitForSelector(this.packageTypeDropdown);
  }

  async navigateToAuditSystem() {
    await this.page.click(this.auditSystemLink);
    await this.page.waitForSelector(this.auditSystemStatus);
  }

  async navigateToConsumptionSimulator() {
    await this.page.click(this.consumptionSimulatorLink);
    await this.page.waitForSelector(this.consumptionPercentageInput);
  }

  async navigateToAuditLogs() {
    await this.page.click(this.auditLogsLink);
    await this.page.waitForSelector(this.auditRecordsTable);
  }

  async verifyTestLineAvailable() {
    const status = await this.page.textContent(this.testLineStatus);
    return status.toLowerCase().includes('available');
  }

  async verifyAuditSystemOperational() {
    const status = await this.page.textContent(this.auditSystemStatus);
    return status.toLowerCase().includes('operational');
  }

  async verifyEventLoggingEnabled() {
    const status = await this.page.textContent(this.eventLoggingStatus);
    return status.toLowerCase().includes('enabled');
  }

  async selectPackageType(packageType) {
    await this.page.click(this.packageTypeDropdown);
    if (packageType === 'TRIAL 6GB') {
      await this.page.click(this.packageOptionTrial6GB);
    } else if (packageType === 'B2B2C') {
      await this.page.click(this.packageOptionB2B2C);
    }
  }

  async activatePackage() {
    await this.page.click(this.activatePackageButton);
    await this.page.waitForSelector(this.packageActivatedStatus);
  }

  async verifyPackageActivated() {
    const isVisible = await this.page.isVisible(this.packageActivatedStatus);
    return isVisible;
  }

  async getActivationTimestamp() {
    return await this.page.textContent(this.activationTimestampField);
  }

  async setConsumptionPercentage(percentage) {
    await this.page.fill(this.consumptionPercentageInput, percentage.toString());
  }

  async executeConsumptionSimulation() {
    await this.page.click(this.executeSimulationButton);
    await this.page.waitForSelector(this.simulationResultStatus);
  }

  async verifyNotificationGenerated(percentage) {
    const indicator = await this.page.isVisible(this.notificationGeneratedIndicator);
    if (!indicator) return false;
    const value = await this.page.textContent(this.notificationPercentageValue);
    return value.includes(percentage.toString());
  }

  async getNotificationTimestamp(percentage) {
    await this.navigateToAuditLogs();
    await this.filterByNotificationType(`${percentage}%`);
    await this.searchAuditRecords();
    return await this.page.textContent(this.auditRecordTimestamp);
  }

  async filterByNotificationType(notificationType) {
    await this.page.fill(this.notificationTypeFilter, notificationType);
  }

  async filterByPackageType(packageType) {
    await this.page.fill(this.packageTypeFilter, packageType);
  }

  async filterByCurrentPackage() {
    await this.page.click(this.currentPackageFilter);
  }

  async searchAuditRecords() {
    await this.page.click(this.searchAuditButton);
    await this.page.waitForSelector(this.auditRecordRow);
  }

  async getLatestAuditRecord() {
    const rows = await this.page.$$(this.auditRecordRow);
    if (rows.length > 0) {
      const timestamp = await rows[0].$eval(this.auditRecordTimestamp, el => el.textContent);
      const eventType = await rows[0].$eval(this.auditRecordEventType, el => el.textContent);
      const timezone = await rows[0].$eval(this.auditRecordTimezone, el => el.textContent);
      return { timestamp, eventType, timezone };
    }
    return null;
  }

  async getPackageLifecycleRecords() {
    const rows = await this.page.$$(this.auditRecordRow);
    const records = [];
    for (const row of rows) {
      const timestamp = await row.$eval('[data-testid="audit-record-timestamp"]', el => el.textContent);
      const eventType = await row.$eval('[data-testid="audit-record-event-type"]', el => el.textContent);
      const timezone = await row.$eval('[data-testid="audit-record-timezone"]', el => el.textContent);
      records.push({ timestamp, eventType, timezone });
    }
    return records;
  }

  async verifyRecordHasFullDate(record) {
    if (!record || !record.timestamp) return false;
    const datePattern = /\d{4}-\d{2}-\d{2}/;
    return datePattern.test(record.timestamp);
  }

  async verifyRecordHasSeconds(record) {
    if (!record || !record.timestamp) return false;
    const timePattern = /\d{2}:\d{2}:\d{2}/;
    return timePattern.test(record.timestamp);
  }

  async verifyRecordHasTimezone(record) {
    if (!record || !record.timezone) return false;
    return record.timezone.length > 0;
  }

  async verifyRecordExists(records, eventType) {
    return records.some(record => 
      record.eventType.toLowerCase().includes(eventType.toLowerCase())
    );
  }

  async verifyChronologicalOrder(records) {
    if (records.length < 2) return true;
    for (let i = 1; i < records.length; i++) {
      const prevDate = new Date(records[i - 1].timestamp);
      const currDate = new Date(records[i].timestamp);
      if (currDate < prevDate) return false;
    }
    return true;
  }
}

module.exports = NotificationAuditPage;