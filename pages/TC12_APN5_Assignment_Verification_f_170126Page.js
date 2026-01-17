const { expect } = require('@playwright/test');

class LifeCycleProvisioningPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = page.locator('[data-testid="login-username"]');
    this.passwordInput = page.locator('[data-testid="login-password"]');
    this.loginButton = page.locator('[data-testid="login-submit-btn"]');
    this.userProfileIndicator = page.locator('[data-testid="user-profile-indicator"]');
    
    this.lineSearchInput = page.locator('[data-testid="line-search-input"]');
    this.lineAvailableStatus = page.locator('[data-testid="line-available-status"]');
    this.provisioningSection = page.locator('[data-testid="provisioning-section"]');
    
    this.planDropdown = page.locator('[data-testid="plan-dropdown"]');
    this.productivePlanOptions = page.locator('[data-testid="plan-option"]:not([data-plan="TESTING"]):not([data-plan="PURGED"])');
    this.provisionButton = page.locator('[data-testid="provision-line-btn"]');
    this.provisioningSuccessMessage = page.locator('[data-testid="provisioning-success-msg"]');
    this.registeredPlanLabel = page.locator('[data-testid="registered-plan-label"]');
    
    this.apnQueryButton = page.locator('[data-testid="query-apns-btn"]');
    this.apnListContainer = page.locator('[data-testid="apn-list-container"]');
    this.apn5OnstarhuRow = page.locator('[data-testid="apn-row-apn5-onstarhu"]');
    this.apn5AssignedIndicator = page.locator('[data-testid="apn5-assigned-indicator"]');
    
    this.apn5ConfigLink = page.locator('[data-testid="apn5-config-link"]');
    this.apn5ConfigModal = page.locator('[data-testid="apn5-config-modal"]');
    this.ipv4SupportCheckbox = page.locator('[data-testid="apn5-ipv4-support"]');
    this.ipv6SupportCheckbox = page.locator('[data-testid="apn5-ipv6-support"]');
    this.fotaNavigationIndicator = page.locator('[data-testid="apn5-fota-navigation"]');
    
    this.billingConfigTab = page.locator('[data-testid="billing-config-tab"]');
    this.apn5BulkRateValue = page.locator('[data-testid="apn5-bulk-rate-value"]');
    this.apn5InPoolIndicator = page.locator('[data-testid="apn5-in-pool-indicator"]');
    this.bulkBillingSection = page.locator('[data-testid="bulk-billing-section"]');
    this.inPoolGranelSection = page.locator('[data-testid="servicios-in-pool-granel-section"]');
  }

  async navigateToSystem() {
    await this.page.goto('/life-cycle');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await expect(this.userProfileIndicator).toBeVisible();
  }

  async verifyLineAvailableForProvisioning() {
    await expect(this.lineAvailableStatus).toBeVisible();
    const status = await this.lineAvailableStatus.textContent();
    return status.includes('Disponible');
  }

  async selectProductivePlanExcludingTestingAndPurged() {
    await this.planDropdown.click();
    await this.page.waitForSelector('[data-testid="plan-option"]');
    const firstProductivePlan = this.productivePlanOptions.first();
    await firstProductivePlan.click();
  }

  async provisionLine() {
    await this.provisionButton.click();
    await this.page.waitForSelector('[data-testid="provisioning-success-msg"]');
  }

  async verifyLineRegisteredInPlan() {
    await expect(this.provisioningSuccessMessage).toBeVisible();
    const planLabel = await this.registeredPlanLabel.textContent();
    return planLabel && !planLabel.includes('TESTING') && !planLabel.includes('PURGED');
  }

  async queryAssignedAPNs() {
    await this.apnQueryButton.click();
    await this.page.waitForSelector('[data-testid="apn-list-container"]');
  }

  async verifyAPN5OnstarhuAssigned() {
    await expect(this.apn5OnstarhuRow).toBeVisible();
    const assignedStatus = await this.apn5AssignedIndicator.textContent();
    return assignedStatus.includes('Asignado') || assignedStatus.includes('Assigned');
  }

  async openAPN5Configuration() {
    await this.apn5ConfigLink.click();
    await expect(this.apn5ConfigModal).toBeVisible();
  }

  async verifyAPN5SupportsIPv4() {
    const isChecked = await this.ipv4SupportCheckbox.isChecked();
    return isChecked;
  }

  async verifyAPN5SupportsIPv6() {
    const isChecked = await this.ipv6SupportCheckbox.isChecked();
    return isChecked;
  }

  async verifyAPN5AllowsFOTANavigation() {
    const fotaText = await this.fotaNavigationIndicator.textContent();
    return fotaText.includes('FOTA') || fotaText.includes('Habilitado');
  }

  async openBillingConfiguration() {
    await this.billingConfigTab.click();
    await expect(this.bulkBillingSection).toBeVisible();
  }

  async getAPN5BulkRate() {
    const rateText = await this.apn5BulkRateValue.textContent();
    const rateMatch = rateText.match(/[\d.]+/);
    return rateMatch ? rateMatch[0] : null;
  }

  async verifyAPN5NotInPool() {
    const inPoolText = await this.apn5InPoolIndicator.textContent();
    return inPoolText.includes('No') || inPoolText.includes('Excluido') || !inPoolText.includes('Pool');
  }
}

module.exports = LifeCycleProvisioningPage;