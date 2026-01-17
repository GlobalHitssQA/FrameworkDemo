const { expect } = require('@playwright/test');

class B2B2CPackagePage {
  constructor(page) {
    this.page = page;
    
    // Locators - Navigation
    this.packageManagementMenu = page.locator('[data-testid="package-management-menu"]');
    this.b2b2cPackagesSection = page.locator('[data-testid="b2b2c-packages-section"]');
    
    // Locators - User and Line Status
    this.userLineStatus = page.locator('[data-testid="user-line-status"]');
    this.gmLineIndicator = page.locator('[data-testid="gm-line-indicator"]');
    this.soldPlanBadge = page.locator('[data-testid="sold-plan-badge"]');
    
    // Locators - Package Configuration
    this.packageTypeDropdown = page.locator('[data-testid="package-type-dropdown"]');
    this.packageCapacityDropdown = page.locator('[data-testid="package-capacity-dropdown"]');
    this.validityPeriodDropdown = page.locator('[data-testid="validity-period-dropdown"]');
    this.activatePackageButton = page.locator('[data-testid="activate-package-btn"]');
    
    // Locators - Package Status
    this.packageStatusLabel = page.locator('[data-testid="package-status-label"]');
    this.packageValidityDays = page.locator('[data-testid="package-validity-days"]');
    this.expirationReasonLabel = page.locator('[data-testid="expiration-reason-label"]');
    this.remainingDataLabel = page.locator('[data-testid="remaining-data-label"]');
    this.expirationDayLabel = page.locator('[data-testid="expiration-day-label"]');
    
    // Locators - Validity Control System
    this.validityControlStatus = page.locator('[data-testid="validity-control-status"]');
    this.validityConfigTable = page.locator('[data-testid="validity-config-table"]');
    
    // Locators - Time Simulation (Test Environment)
    this.timeSimulationPanel = page.locator('[data-testid="time-simulation-panel"]');
    this.daysToSimulateInput = page.locator('[data-testid="days-to-simulate-input"]');
    this.simulateTimeButton = page.locator('[data-testid="simulate-time-btn"]');
    this.consumedDataInput = page.locator('[data-testid="consumed-data-input"]');
    this.applyConsumptionButton = page.locator('[data-testid="apply-consumption-btn"]');
  }

  async navigateToPackageManagement() {
    await this.packageManagementMenu.click();
    await this.b2b2cPackagesSection.waitFor({ state: 'visible' });
  }

  async verifyUserHasActiveGMLine() {
    await expect(this.userLineStatus).toBeVisible();
    await expect(this.gmLineIndicator).toBeVisible();
    await expect(this.soldPlanBadge).toBeVisible();
    const planText = await this.soldPlanBadge.textContent();
    expect(planText).toContain('SOLD');
  }

  async verifyPackageValidityConfigurations() {
    await expect(this.validityConfigTable).toBeVisible();
    const configText = await this.validityConfigTable.textContent();
    expect(configText).toContain('1 month');
    expect(configText).toContain('12 months');
    expect(configText).toContain('24 months');
    expect(configText).toContain('36 months');
  }

  async verifyValidityControlSystemStatus() {
    await expect(this.validityControlStatus).toBeVisible();
    const statusText = await this.validityControlStatus.textContent();
    expect(statusText.toLowerCase()).toContain('operational');
  }

  async selectPackageType(packageType) {
    await this.packageTypeDropdown.click();
    await this.page.locator(`[data-testid="package-type-option-${packageType.toLowerCase()}"]`).click();
  }

  async selectPackageCapacity(capacity) {
    await this.packageCapacityDropdown.click();
    await this.page.locator(`[data-testid="package-capacity-option-${capacity.toLowerCase()}"]`).click();
  }

  async selectValidityPeriod(period) {
    await this.validityPeriodDropdown.click();
    const periodValue = period.replace(' ', '-').toLowerCase();
    await this.page.locator(`[data-testid="validity-period-option-${periodValue}"]`).click();
  }

  async clickActivatePackage() {
    await this.activatePackageButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getPackageStatus() {
    const statusText = await this.packageStatusLabel.textContent();
    return statusText.toLowerCase().trim();
  }

  async getPackageValidityDays() {
    const validityText = await this.packageValidityDays.textContent();
    return parseInt(validityText.replace(/\D/g, ''), 10);
  }

  async simulateTimePassing(days) {
    await this.timeSimulationPanel.waitFor({ state: 'visible' });
    await this.daysToSimulateInput.fill(days.toString());
    await this.simulateTimeButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async setConsumedData(dataAmount) {
    await this.consumedDataInput.fill(dataAmount);
    await this.applyConsumptionButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getExpirationReason() {
    const reasonText = await this.expirationReasonLabel.textContent();
    return reasonText.toLowerCase().trim();
  }

  async getRemainingData() {
    const remainingText = await this.remainingDataLabel.textContent();
    return remainingText.trim();
  }

  async getExpirationDay() {
    const dayText = await this.expirationDayLabel.textContent();
    return parseInt(dayText.replace(/\D/g, ''), 10);
  }
}

module.exports = B2B2CPackagePage;