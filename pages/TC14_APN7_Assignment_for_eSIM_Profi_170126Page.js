const { expect } = require('@playwright/test');

class LifeCycleProvisioningPage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    // Line provisioning locators
    this.lineAvailabilityIndicator = page.locator('[data-testid="line-availability-status"]');
    this.planSelector = page.locator('[data-testid="plan-selector"]');
    this.nonPurgedPlanOptions = page.locator('[data-testid="plan-option"]:not([data-plan-type="PURGED"])');
    this.provisionButton = page.locator('[data-testid="provision-line-button"]');
    this.registrationStatusLabel = page.locator('[data-testid="line-registration-status"]');
    
    // APN Configuration locators
    this.apnConfigurationTab = page.locator('[data-testid="apn-configuration-tab"]');
    this.queryAPNsButton = page.locator('[data-testid="query-apns-button"]');
    this.apnListContainer = page.locator('[data-testid="apn-list-container"]');
    this.apn7Row = page.locator('[data-testid="apn-row-apn7"]');
    this.apn7NameCell = page.locator('[data-testid="apn7-name"]');
    this.apn7ESIMConfigStatus = page.locator('[data-testid="apn7-esim-config-status"]');
    this.apn7DescriptionCell = page.locator('[data-testid="apn7-description"]');
    
    // Billing locators
    this.billingTab = page.locator('[data-testid="billing-section-tab"]');
    this.trafficCostQueryButton = page.locator('[data-testid="query-traffic-cost-button"]');
    this.apn7TrafficCostValue = page.locator('[data-testid="apn7-traffic-cost-value"]');
    
    // Plan availability locators
    this.productivePlansSection = page.locator('[data-testid="productive-plans-section"]');
    this.preproductivePlansSection = page.locator('[data-testid="preproductive-plans-section"]');
    this.apn7ProductiveIndicator = page.locator('[data-testid="apn7-productive-indicator"]');
  }

  async navigateToSystem() {
    await this.page.goto(process.env.LIFE_CYCLE_URL || 'https://lifecycle.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    await this.usernameInput.fill(process.env.TEST_USERNAME || 'testuser');
    await this.passwordInput.fill(process.env.TEST_PASSWORD || 'testpass');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineAvailability() {
    await this.lineAvailabilityIndicator.waitFor({ state: 'visible' });
    const statusText = await this.lineAvailabilityIndicator.textContent();
    return statusText.toLowerCase().includes('available');
  }

  async selectNonPurgedPlan() {
    await this.planSelector.click();
    await this.nonPurgedPlanOptions.first().click();
  }

  async provisionLine() {
    await this.provisionButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getLineRegistrationStatus() {
    await this.registrationStatusLabel.waitFor({ state: 'visible' });
    return await this.registrationStatusLabel.textContent();
  }

  async navigateToAPNConfiguration() {
    await this.apnConfigurationTab.click();
    await this.apnListContainer.waitFor({ state: 'visible' });
  }

  async queryAssignedAPNs() {
    await this.queryAPNsButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isAPN7Assigned() {
    return await this.apn7Row.isVisible();
  }

  async getAPN7Name() {
    return await this.apn7NameCell.textContent();
  }

  async isAPN7ConfiguredForESIM() {
    const statusText = await this.apn7ESIMConfigStatus.textContent();
    return statusText.toLowerCase().includes('enabled') || statusText.toLowerCase().includes('configured');
  }

  async navigateToBillingSection() {
    await this.billingTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async queryAPN7TrafficCost() {
    await this.trafficCostQueryButton.click();
    await this.apn7TrafficCostValue.waitFor({ state: 'visible' });
  }

  async getAPN7TrafficCost() {
    const costText = await this.apn7TrafficCostValue.textContent();
    return parseFloat(costText.replace(/[^0-9.-]/g, ''));
  }

  async verifyAPN7ProductiveAvailability() {
    const isInProductive = await this.apn7ProductiveIndicator.isVisible();
    const productiveSection = await this.productivePlansSection.locator('[data-testid="apn7-row-apn7"]').isVisible();
    
    let isInPreproductive = false;
    try {
      isInPreproductive = await this.preproductivePlansSection.locator('[data-testid="apn7-row-apn7"]').isVisible({ timeout: 2000 });
    } catch (e) {
      isInPreproductive = false;
    }
    
    return isInProductive && productiveSection && !isInPreproductive;
  }

  async getAPN7Description() {
    return await this.apn7DescriptionCell.textContent();
  }
}

module.exports = LifeCycleProvisioningPage;