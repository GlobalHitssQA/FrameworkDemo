const { expect } = require('@playwright/test');

class ConsumptionNotificationPage {
  constructor(page) {
    this.page = page;
    
    // Line Management Locators
    this.lineManagementMenu = '[data-testid="menu-line-management"]';
    this.soldPlanLineSelector = '[data-testid="line-sold-plan"]';
    this.lineStatusIndicator = '[data-testid="line-status-active"]';
    
    // BSCS7 Package Locators
    this.bscs7ConfigSection = '[data-testid="bscs7-configuration"]';
    this.b2b2cPackageRow = '[data-testid="package-b2b2c-6gb"]';
    this.packageStatusBadge = '[data-testid="package-status-badge"]';
    
    // Notification System Locators
    this.notificationSettingsMenu = '[data-testid="menu-notification-settings"]';
    this.notificationSystemStatus = '[data-testid="notification-system-status"]';
    this.notificationLogSection = '[data-testid="notification-log"]';
    this.notificationFilterDropdown = '[data-testid="notification-filter-percentage"]';
    this.notificationListItem = '[data-testid="notification-list-item"]';
    this.notificationContent = '[data-testid="notification-content"]';
    this.notificationTimestamp = '[data-testid="notification-timestamp"]';
    this.notificationDetailsModal = '[data-testid="notification-details-modal"]';
    
    // Package Activation Locators
    this.packageActivationMenu = '[data-testid="menu-package-activation"]';
    this.packageSearchInput = '[data-testid="package-search-input"]';
    this.b2b2c6gbOption = '[data-testid="option-b2b2c-6gb"]';
    this.activatePackageButton = '[data-testid="btn-activate-package"]';
    this.confirmActivationButton = '[data-testid="btn-confirm-activation"]';
    this.packageCapacityDisplay = '[data-testid="package-capacity"]';
    this.packageCostDisplay = '[data-testid="package-cost"]';
    this.packageValidityDisplay = '[data-testid="package-validity"]';
    
    // Consumption Simulator Locators
    this.consumptionSimulatorMenu = '[data-testid="menu-consumption-simulator"]';
    this.consumptionAmountInput = '[data-testid="input-consumption-amount"]';
    this.executeSimulationButton = '[data-testid="btn-execute-simulation"]';
    this.totalConsumptionDisplay = '[data-testid="total-consumption-display"]';
    this.thresholdIndicator = '[data-testid="threshold-indicator"]';
    
    // Duplicate Validation Locators
    this.duplicateSearchButton = '[data-testid="btn-search-duplicates"]';
    this.duplicateCountDisplay = '[data-testid="duplicate-count"]';
    this.previousRecordIndicator = '[data-testid="previous-record-indicator"]';
  }

  async navigateToLineManagement() {
    await this.page.click(this.lineManagementMenu);
    await this.page.waitForSelector(this.soldPlanLineSelector);
  }

  async verifySOLDPlanLineAvailable() {
    const lineElement = await this.page.locator(this.soldPlanLineSelector);
    const statusElement = await this.page.locator(this.lineStatusIndicator);
    return await lineElement.isVisible() && await statusElement.isVisible();
  }

  async verifyB2B2CPackageInBSCS7() {
    await this.page.click(this.bscs7ConfigSection);
    const packageRow = await this.page.locator(this.b2b2cPackageRow);
    return await packageRow.isVisible();
  }

  async navigateToNotificationSettings() {
    await this.page.click(this.notificationSettingsMenu);
    await this.page.waitForSelector(this.notificationSystemStatus);
  }

  async verifyNotificationSystemStatus() {
    const statusElement = await this.page.locator(this.notificationSystemStatus);
    const statusText = await statusElement.textContent();
    return statusText.toLowerCase().includes('activo') || statusText.toLowerCase().includes('active');
  }

  async navigateToPackageActivation() {
    await this.page.click(this.packageActivationMenu);
    await this.page.waitForSelector(this.packageSearchInput);
  }

  async selectB2B2C6GBPackage() {
    await this.page.fill(this.packageSearchInput, 'B2B2C 6GB');
    await this.page.click(this.b2b2c6gbOption);
  }

  async confirmPackageActivation() {
    await this.page.click(this.activatePackageButton);
    await this.page.click(this.confirmActivationButton);
    await this.page.waitForSelector(this.packageCapacityDisplay);
  }

  async getActivatedPackageDetails() {
    const capacity = await this.page.locator(this.packageCapacityDisplay).textContent();
    const cost = await this.page.locator(this.packageCostDisplay).textContent();
    return {
      capacity: capacity.trim(),
      cost: cost.replace(/[^0-9.]/g, '')
    };
  }

  async getPackageValidity() {
    const validity = await this.page.locator(this.packageValidityDisplay).textContent();
    return validity.trim();
  }

  async navigateToConsumptionSimulator() {
    await this.page.click(this.consumptionSimulatorMenu);
    await this.page.waitForSelector(this.consumptionAmountInput);
  }

  async setConsumptionAmount(amountInMB) {
    await this.page.fill(this.consumptionAmountInput, amountInMB);
  }

  async executeConsumptionSimulation() {
    await this.page.click(this.executeSimulationButton);
    await this.page.waitForSelector(this.totalConsumptionDisplay);
  }

  async getTotalConsumption() {
    const consumption = await this.page.locator(this.totalConsumptionDisplay).textContent();
    return consumption.trim();
  }

  async verifyThresholdDetection(percentage) {
    const indicator = await this.page.locator(this.thresholdIndicator);
    const indicatorText = await indicator.textContent();
    return indicatorText.includes(percentage);
  }

  async navigateToNotificationLog() {
    await this.page.click(this.notificationLogSection);
    await this.page.waitForSelector(this.notificationListItem);
  }

  async filterNotificationsByPercentage(percentage) {
    await this.page.click(this.notificationFilterDropdown);
    await this.page.click(`[data-testid="filter-option-${percentage}"]`);
  }

  async getLatestNotification() {
    const notification = await this.page.locator(this.notificationListItem).first();
    const exists = await notification.isVisible();
    const message = exists ? await notification.textContent() : '';
    return { exists, message };
  }

  async getNotificationContent() {
    const content = await this.page.locator(this.notificationContent).textContent();
    return content;
  }

  async openNotificationDetails() {
    await this.page.locator(this.notificationListItem).first().click();
    await this.page.waitForSelector(this.notificationDetailsModal);
  }

  async getNotificationTimestamp() {
    const timestampElement = await this.page.locator(this.notificationTimestamp);
    const timestampText = await timestampElement.textContent();
    const parts = timestampText.split(' ');
    return {
      date: parts[0] || null,
      time: parts[1] || null
    };
  }

  async searchDuplicateNotifications() {
    await this.page.click(this.duplicateSearchButton);
    await this.page.waitForSelector(this.duplicateCountDisplay);
  }

  async getDuplicateNotificationCount() {
    const countText = await this.page.locator(this.duplicateCountDisplay).textContent();
    return parseInt(countText, 10) || 0;
  }

  async checkPreviousNotificationRecord() {
    const indicator = await this.page.locator(this.previousRecordIndicator);
    const indicatorText = await indicator.textContent();
    return indicatorText.toLowerCase().includes('exists') || indicatorText.toLowerCase().includes('existe');
  }
}

module.exports = ConsumptionNotificationPage;