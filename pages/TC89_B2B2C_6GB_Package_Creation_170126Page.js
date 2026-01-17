class PackageConfigurationPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Navigation locators
    this.packageConfigModule = '[data-testid="package-configuration-module"]';
    this.packageAdminInterface = '[data-testid="package-admin-interface"]';
    
    // Package creation locators
    this.createPackageButton = '[data-testid="create-package-button"]';
    this.packageCodeInput = '[data-testid="package-code-input"]';
    this.packageCapacityInput = '[data-testid="package-capacity-input"]';
    this.packageValidityInput = '[data-testid="package-validity-input"]';
    this.packageCostInput = '[data-testid="package-cost-input"]';
    this.packageTypeSelect = '[data-testid="package-type-select"]';
    this.packageFormValid = '[data-testid="package-form-valid"]';
    
    // Corporate account association locators
    this.corporateAccountSection = '[data-testid="corporate-account-section"]';
    this.soldPlanOption = '[data-testid="sold-plan-option"]';
    this.confirmAssociationButton = '[data-testid="confirm-association-button"]';
    this.gmLinkIndicator = '[data-testid="gm-link-indicator"]';
    
    // Coverage settings locators
    this.coverageSettingsTab = '[data-testid="coverage-settings-tab"]';
    this.localNavigationCheckbox = '[data-testid="local-navigation-checkbox"]';
    this.roamingCoverageCheckbox = '[data-testid="roaming-coverage-checkbox"]';
    this.localOnlyRestrictionBadge = '[data-testid="local-only-restriction-badge"]';
    
    // Queueing rules locators
    this.queueingRulesSection = '[data-testid="queueing-rules-section"]';
    this.maxActivePackagesInput = '[data-testid="max-active-packages-input"]';
    this.unlimitedActivationsCheckbox = '[data-testid="unlimited-activations-checkbox"]';
    this.queueingRulesConfiguredIndicator = '[data-testid="queueing-rules-configured"]';
    
    // Save and verification locators
    this.saveButton = '[data-testid="save-package-button"]';
    this.saveConfirmationMessage = '[data-testid="save-confirmation-message"]';
    this.databaseStorageIndicator = '[data-testid="database-storage-indicator"]';
    this.provisioningAvailableIndicator = '[data-testid="provisioning-available-indicator"]';
    
    // API validation locators
    this.apiValidationTab = '[data-testid="api-validation-tab"]';
    this.buyProductAPISearch = '[data-testid="buy-product-api-search"]';
    this.apiProductList = '[data-testid="api-product-list"]';
    this.packageInAPIList = '[data-testid="package-b2b2c-6gb-api-item"]';
  }

  async navigateToLogin() {
    await this.page.goto('/bscs7/login');
  }

  async loginWithConfigPermissions() {
    await this.page.fill(this.usernameInput, process.env.BSCS7_CONFIG_USER || 'config_admin');
    await this.page.fill(this.passwordInput, process.env.BSCS7_CONFIG_PASSWORD || 'config_password');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToPackageConfigurationModule() {
    await this.page.click(this.packageConfigModule);
    await this.page.waitForSelector(this.packageAdminInterface);
  }

  async isPackageAdminInterfaceVisible() {
    return await this.page.isVisible(this.packageAdminInterface);
  }

  async clickCreateNewPackage() {
    await this.page.click(this.createPackageButton);
  }

  async enterPackageCode(code) {
    await this.page.fill(this.packageCodeInput, code);
  }

  async isPackageCodeEntered() {
    const value = await this.page.inputValue(this.packageCodeInput);
    return value.length > 0;
  }

  async setPackageCapacity(capacity) {
    await this.page.fill(this.packageCapacityInput, capacity);
  }

  async setPackageValidity(validity) {
    await this.page.fill(this.packageValidityInput, validity);
  }

  async setPackageCost(cost) {
    await this.page.fill(this.packageCostInput, cost);
  }

  async setPackageType(type) {
    await this.page.selectOption(this.packageTypeSelect, { label: type });
  }

  async arePackageAttributesAccepted() {
    return await this.page.isVisible(this.packageFormValid);
  }

  async openCorporateAccountAssociation() {
    await this.page.click(this.corporateAccountSection);
  }

  async selectSOLDPlan() {
    await this.page.click(this.soldPlanOption);
  }

  async confirmAccountAssociation() {
    await this.page.click(this.confirmAssociationButton);
  }

  async isPackageLinkedToGM() {
    return await this.page.isVisible(this.gmLinkIndicator);
  }

  async openCoverageSettings() {
    await this.page.click(this.coverageSettingsTab);
  }

  async enableLocalNavigationOnly() {
    await this.page.check(this.localNavigationCheckbox);
  }

  async disableRoamingCoverage() {
    await this.page.uncheck(this.roamingCoverageCheckbox);
  }

  async isLocalOnlyRestrictionSet() {
    return await this.page.isVisible(this.localOnlyRestrictionBadge);
  }

  async openQueueingRulesSection() {
    await this.page.click(this.queueingRulesSection);
  }

  async setMaxActivePackages(max) {
    await this.page.fill(this.maxActivePackagesInput, max);
  }

  async setUnlimitedActivations() {
    await this.page.check(this.unlimitedActivationsCheckbox);
  }

  async areQueueingRulesConfigured() {
    return await this.page.isVisible(this.queueingRulesConfiguredIndicator);
  }

  async savePackageConfiguration() {
    await this.page.click(this.saveButton);
  }

  async waitForSaveConfirmation() {
    await this.page.waitForSelector(this.saveConfirmationMessage);
  }

  async isPackageStoredInDatabase() {
    return await this.page.isVisible(this.databaseStorageIndicator);
  }

  async isPackageAvailableForProvisioning() {
    return await this.page.isVisible(this.provisioningAvailableIndicator);
  }

  async navigateToAPIValidation() {
    await this.page.click(this.apiValidationTab);
  }

  async searchPackageInBuyProductAPI() {
    await this.page.fill(this.buyProductAPISearch, 'B2B2C 6GB');
    await this.page.waitForSelector(this.apiProductList);
  }

  async isPackageVisibleInAPIProductList() {
    return await this.page.isVisible(this.packageInAPIList);
  }
}

module.exports = PackageConfigurationPage;