const { expect } = require('@playwright/test');

class BSCS7PlanChangePage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.planManagementMenu = page.locator('[data-testid="plan-management-menu"]');
    this.instantLinkMenu = page.locator('[data-testid="instant-link-provisioning"]');
    
    // Plan status locators
    this.currentPlanStatus = page.locator('[data-testid="current-plan-status"]');
    this.ratePlanValue = page.locator('[data-testid="rateplan-value"]');
    this.planActivationDate = page.locator('[data-testid="plan-activation-date"]');
    this.planEffectiveStatus = page.locator('[data-testid="plan-effective-status"]');
    
    // Package locators
    this.inPoolPackageSection = page.locator('[data-testid="in-pool-package-section"]');
    this.inPoolPackageStatus = page.locator('[data-testid="in-pool-package-status"]');
    this.packageSizeValue = page.locator('[data-testid="package-size-value"]');
    this.assignedAPNsList = page.locator('[data-testid="assigned-apns-list"]');
    
    // Traffic mode locators
    this.telemetryModeValue = page.locator('[data-testid="telemetry-mode-value"]');
    this.otherServicesMode = page.locator('[data-testid="other-services-traffic-mode"]');
    this.allServicesTrafficMode = page.locator('[data-testid="all-services-traffic-mode"]');
    
    // Service billing locators
    this.voiceBillingMode = page.locator('[data-testid="voice-billing-mode"]');
    this.smsBillingMode = page.locator('[data-testid="sms-billing-mode"]');
    this.dataBillingMode = page.locator('[data-testid="data-billing-mode"]');
    
    // VoLTE locators
    this.volteStatusIndicator = page.locator('[data-testid="volte-status"]');
    
    // Plan change form locators
    this.targetPlanDropdown = page.locator('[data-testid="target-plan-dropdown"]');
    this.executePlanChangeButton = page.locator('[data-testid="execute-plan-change-btn"]');
    this.planChangeConfirmation = page.locator('[data-testid="plan-change-confirmation"]');
    
    // Instant Link locators
    this.instantLinkRatePlan = page.locator('[data-testid="instant-link-rateplan"]');
    this.instantLinkServiceVoLTE = page.locator('[data-testid="instant-link-service-volte"]');
    this.networkAPNStatus = page.locator('[data-testid="network-apn-status"]');
  }

  async navigateToPlanManagement() {
    await this.planManagementMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToInstantLinkProvisioning() {
    await this.instantLinkMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentPlanStatus() {
    return await this.currentPlanStatus.textContent();
  }

  async getRatePlanValue() {
    return await this.ratePlanValue.textContent();
  }

  async getPlanActivationDate() {
    return await this.planActivationDate.textContent();
  }

  async getPlanEffectiveStatus() {
    return await this.planEffectiveStatus.textContent();
  }

  async verifyInPoolPackageAssigned(packageSize, apns) {
    const isVisible = await this.inPoolPackageSection.isVisible();
    if (!isVisible) return false;
    
    const currentSize = await this.packageSizeValue.textContent();
    if (currentSize !== packageSize) return false;
    
    const assignedAPNs = await this.assignedAPNsList.textContent();
    for (const apn of apns) {
      if (!assignedAPNs.includes(apn)) return false;
    }
    return true;
  }

  async hasActiveInPoolPackage() {
    const status = await this.inPoolPackageStatus.textContent();
    return status === 'Active';
  }

  async getTelemetryMode() {
    return await this.telemetryModeValue.textContent();
  }

  async getOtherServicesTrafficMode() {
    return await this.otherServicesMode.textContent();
  }

  async getAllServicesTrafficMode() {
    return await this.allServicesTrafficMode.textContent();
  }

  async getServiceBillingMode(service) {
    const locatorMap = {
      'VOICE': this.voiceBillingMode,
      'SMS': this.smsBillingMode,
      'DATA': this.dataBillingMode
    };
    return await locatorMap[service].textContent();
  }

  async getVoLTEStatus() {
    return await this.volteStatusIndicator.textContent();
  }

  async selectTargetPlan(planName) {
    await this.targetPlanDropdown.click();
    const option = this.page.locator(`[data-testid="plan-option-${planName.toLowerCase()}"]`);
    await option.click();
  }

  async executePlanChange() {
    await this.executePlanChangeButton.click();
  }

  async waitForPlanChangeConfirmation() {
    await this.planChangeConfirmation.waitFor({ state: 'visible', timeout: 30000 });
  }

  async getInstantLinkRatePlan() {
    return await this.instantLinkRatePlan.textContent();
  }

  async getInstantLinkServiceVoLTE() {
    return await this.instantLinkServiceVoLTE.textContent();
  }

  async getAPNStatusInNetwork(apnName) {
    const apnRow = this.page.locator(`[data-testid="apn-row-${apnName.toLowerCase()}"]`);
    const statusCell = apnRow.locator('[data-testid="apn-status"]');
    return await statusCell.textContent();
  }
}

module.exports = BSCS7PlanChangePage;