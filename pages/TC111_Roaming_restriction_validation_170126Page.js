class PackageActivationPage {
  constructor(page) {
    this.page = page;
    
    this.packageManagementLink = '[data-testid="package-management-link"]';
    this.userPlanStatusLabel = '[data-testid="user-plan-status"]';
    this.provisioningStatusIndicator = '[data-testid="provisioning-status-indicator"]';
    this.packageTypeDropdown = '[data-testid="package-type-dropdown"]';
    this.packageOptionTrial6GB = '[data-testid="package-option-trial-6gb"]';
    this.packageOptionB2B2C = '[data-testid="package-option-b2b2c"]';
    this.activatePackageButton = '[data-testid="activate-package-button"]';
    this.packageActivationStatusLabel = '[data-testid="package-activation-status"]';
    this.roamingSimulatorLink = '[data-testid="roaming-simulator-link"]';
    this.roamingModeDropdown = '[data-testid="roaming-mode-dropdown"]';
    this.internationalRoamingOption = '[data-testid="roaming-mode-international"]';
    this.simulateConsumptionButton = '[data-testid="simulate-consumption-button"]';
    this.roamingBlockedAlert = '[data-testid="roaming-blocked-alert"]';
    this.roamingBlockedMessage = '[data-testid="roaming-blocked-message"]';
    this.packageRestrictionLabel = '[data-testid="package-restriction-label"]';
    this.localOnlyIndicator = '[data-testid="local-only-indicator"]';
  }

  async navigateToPackageManagement() {
    await this.page.click(this.packageManagementLink);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserHasActiveSOLDPlan() {
    const planStatus = await this.page.textContent(this.userPlanStatusLabel);
    return planStatus.includes('SOLD') && planStatus.includes('activ');
  }

  async verifyProvisioningSystemStatus() {
    const status = await this.page.getAttribute(this.provisioningStatusIndicator, 'data-status');
    return status === 'operational';
  }

  async selectPackageType(packageType) {
    await this.page.click(this.packageTypeDropdown);
    if (packageType === 'TRIAL_6GB') {
      await this.page.click(this.packageOptionTrial6GB);
    } else if (packageType === 'B2B2C') {
      await this.page.click(this.packageOptionB2B2C);
    }
  }

  async clickActivatePackage() {
    await this.page.click(this.activatePackageButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPackageActivationStatus(packageType) {
    const statusText = await this.page.textContent(this.packageActivationStatusLabel);
    return statusText.toLowerCase().includes('activ');
  }

  async navigateToRoamingSimulator() {
    await this.page.click(this.roamingSimulatorLink);
    await this.page.waitForLoadState('networkidle');
  }

  async selectRoamingMode(mode) {
    await this.page.click(this.roamingModeDropdown);
    if (mode === 'international') {
      await this.page.click(this.internationalRoamingOption);
    }
  }

  async simulateDataConsumption() {
    await this.page.click(this.simulateConsumptionButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyRoamingBlocked() {
    return await this.page.isVisible(this.roamingBlockedAlert);
  }

  async getRoamingBlockedMessage() {
    return await this.page.textContent(this.roamingBlockedMessage);
  }

  async verifyPackageLocalOnlyRestriction(packageType) {
    const restrictionText = await this.page.textContent(this.packageRestrictionLabel);
    const localOnlyVisible = await this.page.isVisible(this.localOnlyIndicator);
    return localOnlyVisible && restrictionText.toLowerCase().includes('local');
  }
}

module.exports = PackageActivationPage;