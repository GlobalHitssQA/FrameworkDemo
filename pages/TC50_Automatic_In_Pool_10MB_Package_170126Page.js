const { expect } = require('@playwright/test');

class BSCS7PlanManagementPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.planManagementMenu = page.locator('[data-testid="plan-management-menu"]');
    this.lineSearchInput = page.locator('[data-testid="line-search-input"]');
    this.planFilterDropdown = page.locator('[data-testid="plan-filter-dropdown"]');
    this.searchButton = page.locator('[data-testid="search-line-button"]');
    
    // Line details locators
    this.linePlanStatusLabel = page.locator('[data-testid="line-plan-status"]');
    this.lineDetailsSection = page.locator('[data-testid="line-details-section"]');
    this.refreshButton = page.locator('[data-testid="refresh-line-details"]');
    
    // Package assignment locators
    this.inPoolPackageSection = page.locator('[data-testid="in-pool-package-section"]');
    this.assignedPackageName = page.locator('[data-testid="assigned-package-name"]');
    this.packageDetailsButton = page.locator('[data-testid="package-details-button"]');
    this.packageCapacityValue = page.locator('[data-testid="package-capacity-value"]');
    this.packageCostUDRValue = page.locator('[data-testid="package-cost-udr-value"]');
    this.packageAPNsList = page.locator('[data-testid="package-apns-list"]');
    
    // Plan change locators
    this.planChangeButton = page.locator('[data-testid="plan-change-button"]');
    this.planChangeDialog = page.locator('[data-testid="plan-change-dialog"]');
    this.targetPlanDropdown = page.locator('[data-testid="target-plan-dropdown"]');
    this.confirmPlanChangeButton = page.locator('[data-testid="confirm-plan-change"]');
    this.planChangeStatusLabel = page.locator('[data-testid="plan-change-status"]');
    
    // Traffic simulation locators
    this.trafficSimulationMenu = page.locator('[data-testid="traffic-simulation-menu"]');
    this.apnSelector = page.locator('[data-testid="apn-selector"]');
    this.simulateTrafficButton = page.locator('[data-testid="simulate-traffic-button"]');
    this.sharedBucketTrafficIndicator = page.locator('[data-testid="shared-bucket-traffic-indicator"]');
  }

  async navigateToPlanManagement() {
    await this.planManagementMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchLineByPlan(planName) {
    await this.planFilterDropdown.click();
    await this.page.locator(`[data-testid="plan-option-${planName}"]`).click();
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getLinePlanStatus() {
    await this.linePlanStatusLabel.waitFor({ state: 'visible' });
    return await this.linePlanStatusLabel.textContent();
  }

  async checkInPoolPackageAssignment() {
    const isVisible = await this.assignedPackageName.isVisible();
    if (!isVisible) return false;
    const packageText = await this.assignedPackageName.textContent();
    return packageText && packageText.trim() !== '' && packageText !== 'No package assigned';
  }

  async openPlanChangeDialog() {
    await this.planChangeButton.click();
    await this.planChangeDialog.waitFor({ state: 'visible' });
  }

  async selectTargetPlan(planName) {
    await this.targetPlanDropdown.click();
    await this.page.locator(`[data-testid="target-plan-option-${planName}"]`).click();
  }

  async confirmPlanChange() {
    await this.confirmPlanChangeButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getPlanChangeStatus() {
    await this.planChangeStatusLabel.waitFor({ state: 'visible' });
    return await this.planChangeStatusLabel.textContent();
  }

  async refreshLineDetails() {
    await this.refreshButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getAssignedInPoolPackageName() {
    await this.assignedPackageName.waitFor({ state: 'visible' });
    return await this.assignedPackageName.textContent();
  }

  async openPackageDetails() {
    await this.packageDetailsButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getPackageCapacity() {
    await this.packageCapacityValue.waitFor({ state: 'visible' });
    return await this.packageCapacityValue.textContent();
  }

  async getPackageCostUDR() {
    await this.packageCostUDRValue.waitFor({ state: 'visible' });
    return await this.packageCostUDRValue.textContent();
  }

  async getPackageConfiguredAPNs() {
    await this.packageAPNsList.waitFor({ state: 'visible' });
    const apnsText = await this.packageAPNsList.textContent();
    return apnsText.split(',').map(apn => apn.trim());
  }

  async navigateToTrafficSimulation() {
    await this.trafficSimulationMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async simulateTelemetryTraffic(apnName) {
    await this.apnSelector.click();
    await this.page.locator(`[data-testid="apn-option-${apnName}"]`).click();
    await this.simulateTrafficButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTrafficInSharedBucket() {
    await this.sharedBucketTrafficIndicator.waitFor({ state: 'visible' });
    const indicatorText = await this.sharedBucketTrafficIndicator.textContent();
    return indicatorText.includes('Registered') || indicatorText.includes('Success');
  }
}

module.exports = BSCS7PlanManagementPage;