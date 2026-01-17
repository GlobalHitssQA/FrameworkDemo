class BSCS7PackagePage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="bscs7-username-input"]';
    this.passwordInput = '[data-testid="bscs7-password-input"]';
    this.loginButton = '[data-testid="bscs7-login-button"]';
    
    // Main navigation locators
    this.packageConfigurationScreen = '[data-testid="package-configuration-screen"]';
    this.b2b2cModuleLink = '[data-testid="b2b2c-module-link"]';
    this.createNewPackageButton = '[data-testid="create-new-package-button"]';
    
    // Package creation form locators
    this.packageCreationForm = '[data-testid="package-creation-form"]';
    this.capacityInput = '[data-testid="package-capacity-input"]';
    this.costWithoutIGVInput = '[data-testid="package-cost-input"]';
    this.validityDaysInput = '[data-testid="package-validity-input"]';
    this.classificationSelect = '[data-testid="package-classification-select"]';
    this.classificationOption = (value) => `[data-testid="classification-option-${value}"]`;
    
    // Restriction configuration locators
    this.localConsumptionCheckbox = '[data-testid="local-consumption-only-checkbox"]';
    this.roamingDisabledCheckbox = '[data-testid="roaming-disabled-checkbox"]';
    this.queuingEnabledCheckbox = '[data-testid="queuing-enabled-checkbox"]';
    this.restrictionsConfiguredIndicator = '[data-testid="restrictions-configured-indicator"]';
    
    // Validation and save locators
    this.dataValidatedIndicator = '[data-testid="data-validated-indicator"]';
    this.savePackageButton = '[data-testid="save-package-button"]';
    this.confirmationMessage = '[data-testid="confirmation-message"]';
    
    // Package list locators
    this.soldPlanPackageList = '[data-testid="sold-plan-package-list"]';
    this.packageRow = (type, capacity, months) => `[data-testid="package-row-${type}-${capacity}-${months}m"]`;
    this.packageCapacityCell = '[data-testid="package-capacity-cell"]';
    this.packageCostCell = '[data-testid="package-cost-cell"]';
    this.packageValidityCell = '[data-testid="package-validity-cell"]';
    this.packageClassificationCell = '[data-testid="package-classification-cell"]';
    this.packageLocalOnlyCell = '[data-testid="package-local-only-cell"]';
    this.packageRoamingCell = '[data-testid="package-roaming-cell"]';
    this.packageQueuingCell = '[data-testid="package-queuing-cell"]';
  }

  async navigateToLoginPage() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.example.com');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.BSCS7_USERNAME || 'test_user');
    await this.page.fill(this.passwordInput, process.env.BSCS7_PASSWORD || 'test_password');
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.packageConfigurationScreen);
  }

  async isPackageConfigurationScreenVisible() {
    return await this.page.isVisible(this.packageConfigurationScreen);
  }

  async navigateToB2B2CModule() {
    await this.page.click(this.b2b2cModuleLink);
    await this.page.waitForLoadState('networkidle');
  }

  async clickCreateNewPackage() {
    await this.page.click(this.createNewPackageButton);
    await this.page.waitForSelector(this.packageCreationForm);
  }

  async isPackageCreationFormVisible() {
    const formVisible = await this.page.isVisible(this.packageCreationForm);
    const capacityVisible = await this.page.isVisible(this.capacityInput);
    const costVisible = await this.page.isVisible(this.costWithoutIGVInput);
    const validityVisible = await this.page.isVisible(this.validityDaysInput);
    const classificationVisible = await this.page.isVisible(this.classificationSelect);
    return formVisible && capacityVisible && costVisible && validityVisible && classificationVisible;
  }

  async enterPackageCapacity(capacity) {
    await this.page.fill(this.capacityInput, capacity);
  }

  async enterCostWithoutIGV(cost) {
    await this.page.fill(this.costWithoutIGVInput, cost);
  }

  async enterValidityDays(days) {
    await this.page.fill(this.validityDaysInput, days);
  }

  async selectClassification(classification) {
    await this.page.click(this.classificationSelect);
    await this.page.click(this.classificationOption(classification));
  }

  async isDataValidated() {
    return await this.page.isVisible(this.dataValidatedIndicator);
  }

  async configureLocalConsumptionOnly() {
    const isChecked = await this.page.isChecked(this.localConsumptionCheckbox);
    if (!isChecked) {
      await this.page.click(this.localConsumptionCheckbox);
    }
  }

  async disableRoaming() {
    const isChecked = await this.page.isChecked(this.roamingDisabledCheckbox);
    if (!isChecked) {
      await this.page.click(this.roamingDisabledCheckbox);
    }
  }

  async enableQueuing() {
    const isChecked = await this.page.isChecked(this.queuingEnabledCheckbox);
    if (!isChecked) {
      await this.page.click(this.queuingEnabledCheckbox);
    }
  }

  async areRestrictionsConfigured() {
    return await this.page.isVisible(this.restrictionsConfiguredIndicator);
  }

  async savePackageConfiguration() {
    await this.page.click(this.savePackageButton);
    await this.page.waitForSelector(this.confirmationMessage);
  }

  async getConfirmationMessage() {
    return await this.page.textContent(this.confirmationMessage);
  }

  async navigateToPackageListForSOLDPlan() {
    await this.page.click(this.soldPlanPackageList);
    await this.page.waitForLoadState('networkidle');
  }

  async isPackageVisibleInCatalog(type, capacity, months) {
    const packageRowSelector = this.packageRow(type, capacity, months);
    return await this.page.isVisible(packageRowSelector);
  }

  async getPackageDetails() {
    return {
      capacity: await this.page.textContent(this.packageCapacityCell),
      cost: await this.page.textContent(this.packageCostCell),
      validity: await this.page.textContent(this.packageValidityCell),
      classification: await this.page.textContent(this.packageClassificationCell),
      localOnly: (await this.page.textContent(this.packageLocalOnlyCell)) === 'true',
      roamingDisabled: (await this.page.textContent(this.packageRoamingCell)) === 'true',
      queuingEnabled: (await this.page.textContent(this.packageQueuingCell)) === 'true'
    };
  }
}

module.exports = BSCS7PackagePage;