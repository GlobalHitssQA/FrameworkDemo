class NotificationPage {
  constructor(page) {
    this.page = page;
    
    this.lineManagementMenu = '[data-testid="line-management-menu"]';
    this.gmLineStatusIndicator = '[data-testid="gm-line-status"]';
    this.soldPlanIndicator = '[data-testid="sold-plan-indicator"]';
    this.packageConfigSection = '[data-testid="package-config-section"]';
    this.trial6GBPackageOption = '[data-testid="trial-6gb-package"]';
    this.notificationSystemStatus = '[data-testid="notification-system-status"]';
    this.threshold80ConfigStatus = '[data-testid="threshold-80-config-status"]';
    this.activatePackageButton = '[data-testid="activate-package-btn"]';
    this.availableDataDisplay = '[data-testid="available-data-gb"]';
    this.packageActivationStatus = '[data-testid="package-activation-status"]';
    this.consumptionSimulatorInput = '[data-testid="consumption-simulator-input"]';
    this.simulateConsumptionButton = '[data-testid="simulate-consumption-btn"]';
    this.consumedDataDisplay = '[data-testid="consumed-data-gb"]';
    this.thresholdNotificationAlert = '[data-testid="threshold-notification-alert"]';
    this.thresholdReachedIndicator = '[data-testid="threshold-80-reached"]';
    this.automaticNotificationStatus = '[data-testid="automatic-notification-sent"]';
    this.notificationContentDisplay = '[data-testid="notification-content"]';
    this.auditLogMenu = '[data-testid="audit-log-menu"]';
    this.latestAuditRecordRow = '[data-testid="audit-record-row"]:first-child';
    this.auditDateColumn = '[data-testid="audit-date"]';
    this.auditTimeColumn = '[data-testid="audit-time"]';
    this.auditDetailsColumn = '[data-testid="audit-details"]';
  }

  async navigateToLineManagement() {
    await this.page.click(this.lineManagementMenu);
    await this.page.waitForSelector(this.gmLineStatusIndicator);
  }

  async verifyActiveGMLineWithSOLDPlan() {
    const lineStatus = await this.page.textContent(this.gmLineStatusIndicator);
    const planType = await this.page.textContent(this.soldPlanIndicator);
    return lineStatus.includes('activa') && planType.includes('SOLD');
  }

  async verifyTrial6GBPackageConfigured() {
    await this.page.click(this.packageConfigSection);
    const isVisible = await this.page.isVisible(this.trial6GBPackageOption);
    return isVisible;
  }

  async verifyNotificationSystemAt80Percent() {
    const systemStatus = await this.page.textContent(this.notificationSystemStatus);
    const thresholdConfig = await this.page.textContent(this.threshold80ConfigStatus);
    return systemStatus.includes('operativo') && thresholdConfig.includes('80%');
  }

  async activateTrial6GBPackage() {
    await this.page.click(this.trial6GBPackageOption);
    await this.page.click(this.activatePackageButton);
    await this.page.waitForSelector(this.packageActivationStatus);
  }

  async getAvailableDataGB() {
    return await this.page.textContent(this.availableDataDisplay);
  }

  async getPackageActivationStatus() {
    return await this.page.textContent(this.packageActivationStatus);
  }

  async simulateDataConsumption(amountGB) {
    await this.page.fill(this.consumptionSimulatorInput, amountGB);
    await this.page.click(this.simulateConsumptionButton);
    await this.page.waitForTimeout(1000);
  }

  async getConsumedDataGB() {
    return await this.page.textContent(this.consumedDataDisplay);
  }

  async isThresholdNotificationTriggered() {
    return await this.page.isVisible(this.thresholdNotificationAlert);
  }

  async isThreshold80PercentReached() {
    const indicator = await this.page.textContent(this.thresholdReachedIndicator);
    return indicator.includes('true') || indicator.includes('alcanzado');
  }

  async isAutomaticNotificationSent() {
    const status = await this.page.textContent(this.automaticNotificationStatus);
    return status.includes('enviada') || status.includes('sent');
  }

  async getNotificationContent() {
    return await this.page.textContent(this.notificationContentDisplay);
  }

  async navigateToAuditLog() {
    await this.page.click(this.auditLogMenu);
    await this.page.waitForSelector(this.latestAuditRecordRow);
  }

  async getLatestAuditRecord() {
    const date = await this.page.textContent(`${this.latestAuditRecordRow} ${this.auditDateColumn}`);
    const time = await this.page.textContent(`${this.latestAuditRecordRow} ${this.auditTimeColumn}`);
    const details = await this.page.textContent(`${this.latestAuditRecordRow} ${this.auditDetailsColumn}`);
    return { date, time, details };
  }
}

module.exports = NotificationPage;