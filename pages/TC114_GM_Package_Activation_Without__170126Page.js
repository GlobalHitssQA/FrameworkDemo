class PackageActivationPage {
  constructor(page) {
    this.page = page;
    
    this.packageManagementUrl = '/package-management';
    
    this.soldPlanIndicator = '[data-testid="sold-plan-indicator"]';
    this.apiStatusIndicator = '[data-testid="api-status-indicator"]';
    this.packageTypeSelector = '[data-testid="package-type-selector"]';
    this.trial6GBOption = '[data-testid="package-option-trial-6gb"]';
    this.b2b2cPackageSelector = '[data-testid="b2b2c-package-selector"]';
    this.capacityDropdown = '[data-testid="capacity-dropdown"]';
    this.activatePackageButton = '[data-testid="activate-package-btn"]';
    this.activationSuccessMessage = '[data-testid="activation-success-message"]';
    this.packageQueuedMessage = '[data-testid="package-queued-message"]';
    this.errorMessageContainer = '[data-testid="error-message-container"]';
    this.activationRestrictionMessage = '[data-testid="activation-restriction-message"]';
    this.viewSummaryButton = '[data-testid="view-package-summary-btn"]';
    this.activePackagesCount = '[data-testid="active-packages-count"]';
    this.queuedPackagesCount = '[data-testid="queued-packages-count"]';
    this.queuedB2B2CPackagesList = '[data-testid="queued-b2b2c-packages"] .package-item';
  }

  async navigateToPackageManagement() {
    await this.page.goto(this.packageManagementUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserHasActiveSOLDPlan() {
    await this.page.waitForSelector(this.soldPlanIndicator);
    const planText = await this.page.textContent(this.soldPlanIndicator);
    return planText.includes('SOLD');
  }

  async verifyAPIConnectivity() {
    await this.page.waitForSelector(this.apiStatusIndicator);
    const status = await this.page.getAttribute(this.apiStatusIndicator, 'data-status');
    return status === 'connected';
  }

  async selectPackageType(packageType) {
    await this.page.click(this.packageTypeSelector);
    if (packageType === 'TRIAL_6GB') {
      await this.page.click(this.trial6GBOption);
    }
  }

  async selectB2B2CPackageWithCapacity(capacity) {
    await this.page.click(this.packageTypeSelector);
    await this.page.click(this.b2b2cPackageSelector);
    await this.page.click(this.capacityDropdown);
    await this.page.click(`[data-testid="capacity-option-${capacity.toLowerCase()}"]`);
  }

  async clickActivatePackageButton() {
    await this.page.click(this.activatePackageButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPackageActivationSuccess(packageType) {
    await this.page.waitForSelector(this.activationSuccessMessage);
    const message = await this.page.textContent(this.activationSuccessMessage);
    return message.includes(packageType) || message.includes('activado');
  }

  async verifyPackageQueued(packageType) {
    await this.page.waitForSelector(this.packageQueuedMessage);
    const message = await this.page.textContent(this.packageQueuedMessage);
    return message.includes('encolado') || message.includes('queued');
  }

  async getQueuedB2B2CPackagesCount() {
    const packages = await this.page.$$(this.queuedB2B2CPackagesList);
    return packages.length;
  }

  async isErrorMessageVisible() {
    return await this.page.isVisible(this.errorMessageContainer);
  }

  async isActivationRestrictionVisible() {
    return await this.page.isVisible(this.activationRestrictionMessage);
  }

  async clickViewPackageSummaryButton() {
    await this.page.click(this.viewSummaryButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getActivePackagesCount() {
    const countText = await this.page.textContent(this.activePackagesCount);
    return parseInt(countText, 10);
  }

  async getTotalQueuedPackagesCount() {
    const countText = await this.page.textContent(this.queuedPackagesCount);
    return parseInt(countText, 10);
  }
}

module.exports = PackageActivationPage;