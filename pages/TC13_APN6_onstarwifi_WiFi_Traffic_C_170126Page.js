const { expect } = require('@playwright/test');

class LifeCycleProvisioningPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = page.locator('[data-testid="login-username"]');
    this.passwordInput = page.locator('[data-testid="login-password"]');
    this.loginButton = page.locator('[data-testid="login-submit-btn"]');
    
    this.lineSearchInput = page.locator('[data-testid="line-search-input"]');
    this.lineSearchButton = page.locator('[data-testid="line-search-btn"]');
    this.lineAvailabilityStatus = page.locator('[data-testid="line-availability-status"]');
    
    this.planDropdown = page.locator('[data-testid="plan-selector-dropdown"]');
    this.productivePlanOption = page.locator('[data-testid="plan-option-productive"]:not([data-plan="TESTING"]):not([data-plan="PURGED"])');
    this.provisionLineButton = page.locator('[data-testid="provision-line-btn"]');
    this.registrationConfirmation = page.locator('[data-testid="registration-confirmation-message"]');
    
    this.apnConfigurationTab = page.locator('[data-testid="tab-apn-configuration"]');
    this.queryAPNsButton = page.locator('[data-testid="query-apns-btn"]');
    this.apnListContainer = page.locator('[data-testid="apn-list-container"]');
    this.apn6Row = page.locator('[data-testid="apn-row-apn6-onstarwifi"]');
    this.apn6StatusBadge = page.locator('[data-testid="apn6-status-badge"]');
    this.apn6WifiIndicator = page.locator('[data-testid="apn6-wifi-traffic-indicator"]');
    
    this.billingConfigTab = page.locator('[data-testid="tab-billing-configuration"]');
    this.apn6BillingDetailsLink = page.locator('[data-testid="apn6-billing-details-link"]');
    this.bulkRateValue = page.locator('[data-testid="apn6-bulk-rate-value"]');
    this.billingTypeLabel = page.locator('[data-testid="apn6-billing-type-label"]');
    
    this.trialPackageCheckbox = page.locator('[data-testid="package-trial-6gb-enabled"]');
    this.b2b2cPackageCheckbox = page.locator('[data-testid="package-b2b2c-enabled"]');
    this.packagesSection = page.locator('[data-testid="additional-packages-section"]');
    
    this.inPoolConfigTab = page.locator('[data-testid="tab-inpool-configuration"]');
    this.apn6InPoolStatus = page.locator('[data-testid="apn6-inpool-participation-status"]');
    this.inPoolExclusionBadge = page.locator('[data-testid="apn6-inpool-excluded-badge"]');
  }

  async navigateToSystem() {
    await this.page.goto('/lifecycle/admin');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    await this.usernameInput.fill(process.env.LIFECYCLE_USERNAME || 'testuser');
    await this.passwordInput.fill(process.env.LIFECYCLE_PASSWORD || 'testpass');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineAvailability() {
    await this.lineSearchInput.fill(process.env.TEST_LINE_NUMBER || '999999999');
    await this.lineSearchButton.click();
    await this.lineAvailabilityStatus.waitFor({ state: 'visible' });
    const statusText = await this.lineAvailabilityStatus.textContent();
    return statusText.includes('Disponible') || statusText.includes('Available');
  }

  async selectProductivePlan() {
    await this.planDropdown.click();
    await this.productivePlanOption.first().click();
  }

  async provisionLine() {
    await this.provisionLineButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineRegistration() {
    await this.registrationConfirmation.waitFor({ state: 'visible' });
    return await this.registrationConfirmation.isVisible();
  }

  async navigateToAPNConfiguration() {
    await this.apnConfigurationTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async queryAssignedAPNs() {
    await this.queryAPNsButton.click();
    await this.apnListContainer.waitFor({ state: 'visible' });
  }

  async isAPN6Assigned() {
    await this.apn6Row.waitFor({ state: 'visible' });
    const statusText = await this.apn6StatusBadge.textContent();
    return statusText.includes('Asignado') || statusText.includes('Assigned');
  }

  async isAPN6ConfiguredForWiFi() {
    await this.apn6WifiIndicator.waitFor({ state: 'visible' });
    const indicatorText = await this.apn6WifiIndicator.textContent();
    return indicatorText.includes('WiFi') || indicatorText.includes('Habilitado');
  }

  async navigateToBillingConfiguration() {
    await this.billingConfigTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectAPN6BillingDetails() {
    await this.apn6BillingDetailsLink.click();
    await this.bulkRateValue.waitFor({ state: 'visible' });
  }

  async getAPN6BulkRate() {
    const rateText = await this.bulkRateValue.textContent();
    const rateMatch = rateText.match(/([\d.]+)/);
    return rateMatch ? rateMatch[1] : null;
  }

  async isTrialPackageEnabled() {
    await this.packagesSection.waitFor({ state: 'visible' });
    return await this.trialPackageCheckbox.isChecked();
  }

  async isB2B2CPackageEnabled() {
    return await this.b2b2cPackageCheckbox.isChecked();
  }

  async navigateToInPoolConfiguration() {
    await this.inPoolConfigTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async checkAPN6InPoolStatus() {
    await this.apn6InPoolStatus.waitFor({ state: 'visible' });
  }

  async isAPN6ExcludedFromInPool() {
    const isExcludedBadgeVisible = await this.inPoolExclusionBadge.isVisible();
    if (isExcludedBadgeVisible) {
      return true;
    }
    const statusText = await this.apn6InPoolStatus.textContent();
    return statusText.includes('Excluido') || statusText.includes('Excluded') || statusText.includes('No participa');
  }
}

module.exports = LifeCycleProvisioningPage;