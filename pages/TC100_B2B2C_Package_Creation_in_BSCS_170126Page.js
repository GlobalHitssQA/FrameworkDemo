const { expect } = require('@playwright/test');

class BSCS7PackagePage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="bscs7-username-input"]';
    this.passwordInput = '[data-testid="bscs7-password-input"]';
    this.loginButton = '[data-testid="bscs7-login-button"]';
    
    // Navigation locators
    this.packageConfigScreen = '[data-testid="package-configuration-screen"]';
    this.b2b2cModuleLink = '[data-testid="b2b2c-module-link"]';
    this.createPackageButton = '[data-testid="create-new-package-button"]';
    
    // Package form locators
    this.packageForm = '[data-testid="package-creation-form"]';
    this.capacityInput = '[data-testid="package-capacity-input"]';
    this.costInput = '[data-testid="package-cost-input"]';
    this.validityInput = '[data-testid="package-validity-input"]';
    this.classificationSelect = '[data-testid="package-classification-select"]';
    this.classificationOption = (value) => `[data-testid="classification-option-${value}"]`;
    
    // Restriction locators
    this.localConsumptionCheckbox = '[data-testid="local-consumption-only-checkbox"]';
    this.roamingToggle = '[data-testid="roaming-toggle"]';
    this.queuingToggle = '[data-testid="queuing-toggle"]';
    this.restrictionsAppliedIndicator = '[data-testid="restrictions-applied-indicator"]';
    
    // Action locators
    this.saveButton = '[data-testid="save-package-button"]';
    this.confirmationMessage = '[data-testid="confirmation-message"]';
    
    // Package list locators
    this.soldPlanPackageList = '[data-testid="sold-plan-package-list"]';
    this.packageRow = (name) => `[data-testid="package-row-${name.replace(/\s+/g, '-').toLowerCase()}"]`;
    this.packageCapacityCell = '[data-testid="package-capacity-cell"]';
    this.packageValidityCell = '[data-testid="package-validity-cell"]';
    this.packageClassificationCell = '[data-testid="package-classification-cell"]';
    
    // Validation locators
    this.formValidationSuccess = '[data-testid="form-validation-success"]';
  }

  async navigateToSystem() {
    await this.page.goto(process.env.BSCS7_BASE_URL || 'https://bscs7.example.com');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.BSCS7_USERNAME || 'admin');
    await this.page.fill(this.passwordInput, process.env.BSCS7_PASSWORD || 'password');
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.packageConfigScreen);
  }

  async isPackageConfigurationScreenVisible() {
    return await this.page.isVisible(this.packageConfigScreen);
  }

  async navigateToB2B2CModule() {
    await this.page.click(this.b2b2cModuleLink);
    await this.page.waitForLoadState('networkidle');
  }

  async clickCreateNewPackage() {
    await this.page.click(this.createPackageButton);
    await this.page.waitForSelector(this.packageForm);
  }

  async isPackageFormVisible() {
    const formVisible = await this.page.isVisible(this.packageForm);
    const capacityVisible = await this.page.isVisible(this.capacityInput);
    const costVisible = await this.page.isVisible(this.costInput);
    const validityVisible = await this.page.isVisible(this.validityInput);
    const classificationVisible = await this.page.isVisible(this.classificationSelect);
    return formVisible && capacityVisible && costVisible && validityVisible && classificationVisible;
  }

  async fillPackageCapacity(capacity) {
    await this.page.fill(this.capacityInput, capacity.replace('GB', ''));
  }

  async fillPackageCost(cost) {
    await this.page.fill(this.costInput, cost);
  }

  async fillPackageValidity(days) {
    await this.page.fill(this.validityInput, days);
  }

  async selectPackageClassification(classification) {
    await this.page.click(this.classificationSelect);
    await this.page.click(this.classificationOption(classification.toLowerCase()));
  }

  async isFormDataValid() {
    return await this.page.isVisible(this.formValidationSuccess);
  }

  async selectLocalConsumptionOnly() {
    const isChecked = await this.page.isChecked(this.localConsumptionCheckbox);
    if (!isChecked) {
      await this.page.click(this.localConsumptionCheckbox);
    }
  }

  async disableRoaming() {
    const roamingEnabled = await this.page.getAttribute(this.roamingToggle, 'aria-checked');
    if (roamingEnabled === 'true') {
      await this.page.click(this.roamingToggle);
    }
  }

  async enableQueuing() {
    const queuingEnabled = await this.page.getAttribute(this.queuingToggle, 'aria-checked');
    if (queuingEnabled !== 'true') {
      await this.page.click(this.queuingToggle);
    }
  }

  async areRestrictionsApplied() {
    return await this.page.isVisible(this.restrictionsAppliedIndicator);
  }

  async savePackageConfiguration() {
    await this.page.click(this.saveButton);
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
    const packageRowSelector = this.packageRow(packageName);
    await this.page.waitForSelector(packageRowSelector);
    
    const capacity = await this.page.textContent(`${packageRowSelector} ${this.packageCapacityCell}`);
    const validity = await this.page.textContent(`${packageRowSelector} ${this.packageValidityCell}`);
    const classification = await this.page.textContent(`${packageRowSelector} ${this.packageClassificationCell}`);
    
    return {
      capacity: capacity.trim(),
      validity: validity.trim(),
      classification: classification.trim()
    };
  }
}

module.exports = BSCS7PackagePage;