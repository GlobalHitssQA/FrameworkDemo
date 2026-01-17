class TrialPackagePage {
  constructor(page) {
    this.page = page;
    
    this.packageManagementUrl = '/package-management';
    
    this.userLineStatusSelector = '[data-testid="user-line-status"]';
    this.gmLineBadgeSelector = '[data-testid="gm-line-badge"]';
    this.soldPlanIndicatorSelector = '[data-testid="sold-plan-indicator"]';
    
    this.notificationConfigSelector = '[data-testid="notification-config"]';
    this.notification80ConfigSelector = '[data-testid="notification-80-percent"]';
    this.notification100ConfigSelector = '[data-testid="notification-100-percent"]';
    
    this.trialPackageCardSelector = '[data-testid="trial-6gb-package-card"]';
    this.activatePackageButtonSelector = '[data-testid="activate-package-btn"]';
    this.packageStatusSelector = '[data-testid="package-status"]';
    this.availableDataSelector = '[data-testid="available-data-gb"]';
    this.consumedDataSelector = '[data-testid="consumed-data-gb"]';
    
    this.consumptionSimulatorSelector = '[data-testid="consumption-simulator"]';
    this.consumptionInputSelector = '[data-testid="consumption-input-gb"]';
    this.applyConsumptionButtonSelector = '[data-testid="apply-consumption-btn"]';
    
    this.notificationListSelector = '[data-testid="notification-list"]';
    this.notification80PercentSelector = '[data-testid="notification-80-percent-alert"]';
    this.notification100PercentSelector = '[data-testid="notification-100-percent-alert"]';
    
    this.packageExhaustedBadgeSelector = '[data-testid="package-exhausted-badge"]';
    this.packageExpiredBadgeSelector = '[data-testid="package-expired-badge"]';
  }

  async navigateToPackageManagement() {
    await this.page.goto(this.packageManagementUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserHasActiveGMLine() {
    await this.page.waitForSelector(this.userLineStatusSelector);
    const gmBadge = await this.page.isVisible(this.gmLineBadgeSelector);
    const soldPlan = await this.page.isVisible(this.soldPlanIndicatorSelector);
    return gmBadge && soldPlan;
  }

  async verifyNotificationsConfigured() {
    await this.page.waitForSelector(this.notificationConfigSelector);
    const notification80 = await this.page.isVisible(this.notification80ConfigSelector);
    const notification100 = await this.page.isVisible(this.notification100ConfigSelector);
    return notification80 && notification100;
  }

  async activateTrialPackage() {
    await this.page.click(this.trialPackageCardSelector);
    await this.page.click(this.activatePackageButtonSelector);
    await this.page.waitForSelector(this.packageStatusSelector);
  }

  async getPackageStatus() {
    const statusElement = await this.page.waitForSelector(this.packageStatusSelector);
    const statusText = await statusElement.textContent();
    return statusText.toLowerCase().trim();
  }

  async getAvailableDataGB() {
    const dataElement = await this.page.waitForSelector(this.availableDataSelector);
    const dataText = await dataElement.textContent();
    return parseFloat(dataText);
  }

  async getConsumedDataGB() {
    const dataElement = await this.page.waitForSelector(this.consumedDataSelector);
    const dataText = await dataElement.textContent();
    return parseFloat(dataText);
  }

  async simulateDataConsumption(gbAmount) {
    await this.page.click(this.consumptionSimulatorSelector);
    await this.page.fill(this.consumptionInputSelector, gbAmount.toString());
    await this.page.click(this.applyConsumptionButtonSelector);
    await this.page.waitForTimeout(1000);
  }

  async getNotificationAt80Percent() {
    await this.page.waitForSelector(this.notificationListSelector);
    return await this.page.isVisible(this.notification80PercentSelector);
  }

  async getNotificationAt100Percent() {
    await this.page.waitForSelector(this.notificationListSelector);
    return await this.page.isVisible(this.notification100PercentSelector);
  }

  async isPackageExhausted() {
    return await this.page.isVisible(this.packageExhaustedBadgeSelector);
  }

  async isPackageExpired() {
    return await this.page.isVisible(this.packageExpiredBadgeSelector);
  }
};

module.exports = TrialPackagePage;