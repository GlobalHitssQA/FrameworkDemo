const { expect } = require('@playwright/test');

class BSCS7PackagePage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Navigation locators
    this.packageConfigurationScreen = '[data-testid="package-configuration-screen"]';
    this.b2b2cModuleLink = '[data-testid="b2b2c-module-link"]';
    this.createNewPackageButton = '[data-testid="create-new-package-button"]';
    
    // Package creation form locators
    this.packageCreationForm = '[data-testid="package-creation-form"]';
    this.capacityInput = '[data-testid="package-capacity-input"]';
    this.costWithoutIGVInput = '[data-testid="cost-without-igv-input"]';
    this.validityDaysInput = '[data-testid="validity-days-input"]';
    this.classificationSelect = '[data-testid="classification-select"]';
    this.classificationOption = (value) => `[data-testid="classification-option-${value}"]`;
    
    // Restrictions locators
    this.localConsumptionCheckbox = '[data-testid="local-consumption-checkbox"]';
    this.roamingCheckbox = '[data-testid="roaming-checkbox"]';
    this.queuingCheckbox = '[data-testid="queuing-checkbox"]';
    this.restrictionsConfirmation = '[data-testid="restrictions-confirmation"]';
    
    // Validation locators
    this.dataValidationIndicator = '[data-testid="data-validation-indicator"]';
    this.validationSuccessIcon = '[data-testid="validation-success-icon"]';
    
    // Save and confirmation locators
    this.savePackageButton = '[data-testid="save-package-button"]';
    this.confirmationMessage = '[data-testid="confirmation-message"]';
    
    // Package list locators
    this.packageListTable = '[data-testid="package-list-table"]';
    this.soldPlanPackageList = '[data-testid="sold-plan-package-list"]';
    this.packageRow = (packageName) => `[data-testid="package-row-${packageName.replace(/\s+/g, '-').toLowerCase()}"]`;
    this.packageCapacityCell = '[data-testid="package-capacity-cell"]';
    this.packageValidityCell = '[data-testid="package-validity-cell"]';
    this.packageClassificationCell = '[data-testid="package-classification-cell"]';
  }

  async navigateToSystem() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.example.com');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.BSCS7_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.BSCS7_PASSWORD || 'testpassword');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isPackageConfigurationScreenDisplayed() {
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

  async isPackageCreationFormDisplayed() {
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
    await this.page.waitForSelector(this.dataValidationIndicator);
    return await this.page.isVisible(this.validationSuccessIcon);
  }

  async selectLocalConsumptionOnly() {
    const isChecked = await this.page.isChecked(this.localConsumptionCheckbox);
    if (!isChecked) {
      await this.page.click(this.localConsumptionCheckbox);
    }
  }

  async disableRoaming() {
    const isChecked = await this.page.isChecked(this.roamingCheckbox);
    if (isChecked) {
      await this.page.click(this.roamingCheckbox);
    }
  }

  async enableQueuing() {
    const isChecked = await this.page.isChecked(this.queuingCheckbox);
    if (!isChecked) {
      await this.page.click(this.queuingCheckbox);
    }
  }

  async areRestrictionsRegistered() {
    return await this.page.isVisible(this.restrictionsConfirmation);
  }

  async savePackageConfiguration() {
    await this.page.click(this.savePackageButton);
    await this.page.waitForSelector(this.confirmationMessage);
  }

  async getConfirmationMessage() {
    return await this.page.textContent(this.confirmationMessage);
  }

  async isPackageInSOLDPlanList(packageName) {
    await this.page.waitForSelector(this.soldPlanPackageList);
    return await this.page.isVisible(this.packageRow(packageName));
  }

  async getPackageDetails(packageName) {
    const row = this.packageRow(packageName);
    await this.page.waitForSelector(row);
    
    const capacity = await this.page.textContent(`${row} ${this.packageCapacityCell}`);
    const validity = await this.page.textContent(`${row} ${this.packageValidityCell}`);
    const classification = await this.page.textContent(`${row} ${this.packageClassificationCell}`);
    
    return {
      capacity: capacity.trim(),
      validity: validity.trim(),
      classification: classification.trim()
    };
  }
}

module.exports = BSCS7PackagePage;