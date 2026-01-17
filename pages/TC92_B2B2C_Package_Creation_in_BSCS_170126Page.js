const { expect } = require('@playwright/test');

class BSCS7PackagePage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="bscs7-username"]';
    this.passwordInput = '[data-testid="bscs7-password"]';
    this.loginButton = '[data-testid="bscs7-login-btn"]';
    
    // Navigation locators
    this.packageConfigScreen = '[data-testid="package-configuration-screen"]';
    this.b2b2cModuleLink = '[data-testid="b2b2c-module-link"]';
    this.createNewPackageButton = '[data-testid="create-new-package-btn"]';
    
    // Package creation form locators
    this.packageCreationForm = '[data-testid="package-creation-form"]';
    this.capacityInput = '[data-testid="package-capacity-input"]';
    this.costWithoutIGVInput = '[data-testid="package-cost-input"]';
    this.validityDaysInput = '[data-testid="package-validity-input"]';
    this.classificationSelect = '[data-testid="package-classification-select"]';
    this.classificationOption = (value) => `[data-testid="classification-option-${value.toLowerCase()}"]`;
    
    // Validation locators
    this.validationSuccessIndicator = '[data-testid="validation-success"]';
    this.validationErrorMessage = '[data-testid="validation-error"]';
    
    // Restriction locators
    this.localConsumptionCheckbox = '[data-testid="local-consumption-only-checkbox"]';
    this.roamingDisabledCheckbox = '[data-testid="roaming-disabled-checkbox"]';
    this.queuingEnabledCheckbox = '[data-testid="queuing-enabled-checkbox"]';
    this.restrictionsConfirmation = '[data-testid="restrictions-registered-indicator"]';
    
    // Save and confirmation locators
    this.savePackageButton = '[data-testid="save-package-btn"]';
    this.confirmationMessage = '[data-testid="confirmation-message"]';
    
    // Package catalog locators
    this.packageCatalogTable = '[data-testid="sold-plan-package-catalog"]';
    this.packageRow = (packageName) => `[data-testid="package-row-${packageName.replace(/\s+/g, '-').toLowerCase()}"]`;
    this.packageCapacityCell = '[data-testid="package-capacity-cell"]';
    this.packageCostCell = '[data-testid="package-cost-cell"]';
    this.packageValidityCell = '[data-testid="package-validity-cell"]';
    this.packageClassificationCell = '[data-testid="package-classification-cell"]';
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BSCS7_BASE_URL || 'https://bscs7.example.com');
  }

  async login() {
    const username = process.env.BSCS7_USERNAME || 'test_user';
    const password = process.env.BSCS7_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.packageConfigScreen);
  }

  async isPackageConfigurationScreenDisplayed() {
    return await this.page.isVisible(this.packageConfigScreen);
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

  async enterCapacity(capacity) {
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
    await this.page.waitForTimeout(500);
    const hasError = await this.page.isVisible(this.validationErrorMessage);
    return !hasError;
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

  async isPackageInSOLDCatalog(packageName, validity) {
    await this.page.waitForSelector(this.packageCatalogTable);
    const row = this.page.locator(this.packageRow(packageName));
    return await row.isVisible();
  }

  async getPackageDetails(packageName) {
    const row = this.page.locator(this.packageRow(packageName));
    
    const capacity = await row.locator(this.packageCapacityCell).textContent();
    const cost = await row.locator(this.packageCostCell).textContent();
    const validity = await row.locator(this.packageValidityCell).textContent();
    const classification = await row.locator(this.packageClassificationCell).textContent();
    
    return {
      capacity: capacity.trim(),
      cost: cost.trim(),
      validity: validity.trim(),
      classification: classification.trim()
    };
  }
}

module.exports = BSCS7PackagePage;