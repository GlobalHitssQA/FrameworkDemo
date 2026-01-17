const { expect } = require('@playwright/test');

class BSCS7PackagePage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    // Main navigation locators
    this.mainScreen = page.locator('[data-testid="main-configuration-screen"]');
    this.packagesMenu = page.locator('[data-testid="packages-menu"]');
    this.b2b2cModuleLink = page.locator('[data-testid="b2b2c-module-link"]');
    this.createPackageButton = page.locator('[data-testid="create-package-button"]');
    
    // Package form locators
    this.packageForm = page.locator('[data-testid="package-creation-form"]');
    this.capacityInput = page.locator('[data-testid="package-capacity-input"]');
    this.costInput = page.locator('[data-testid="package-cost-input"]');
    this.validityInput = page.locator('[data-testid="package-validity-input"]');
    this.classificationSelect = page.locator('[data-testid="package-classification-select"]');
    
    // Restrictions locators
    this.localConsumptionCheckbox = page.locator('[data-testid="local-consumption-checkbox"]');
    this.roamingCheckbox = page.locator('[data-testid="roaming-checkbox"]');
    this.queuingCheckbox = page.locator('[data-testid="queuing-checkbox"]');
    this.restrictionsPanel = page.locator('[data-testid="restrictions-panel"]');
    
    // Validation locators
    this.validationSuccess = page.locator('[data-testid="validation-success-indicator"]');
    this.saveButton = page.locator('[data-testid="save-package-button"]');
    this.confirmationMessage = page.locator('[data-testid="confirmation-message"]');
    
    // Package list locators
    this.packageListSection = page.locator('[data-testid="package-list-section"]');
    this.soldPlanFilter = page.locator('[data-testid="sold-plan-filter"]');
    this.packageCatalogTable = page.locator('[data-testid="package-catalog-table"]');
    this.soldPlanIndicator = page.locator('[data-testid="sold-plan-indicator"]');
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.example.com/login');
  }

  async login() {
    await this.usernameInput.fill(process.env.BSCS7_USERNAME || 'testuser');
    await this.passwordInput.fill(process.env.BSCS7_PASSWORD || 'testpassword');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await expect(this.mainScreen).toBeVisible({ timeout: 10000 });
  }

  async verifySOLDPlanConfigured() {
    await expect(this.soldPlanIndicator).toBeVisible();
  }

  async navigateToB2B2CPackageModule() {
    await this.packagesMenu.click();
    await this.b2b2cModuleLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickCreateNewPackage() {
    await this.createPackageButton.click();
  }

  async isPackageFormDisplayed() {
    const capacityVisible = await this.capacityInput.isVisible();
    const costVisible = await this.costInput.isVisible();
    const validityVisible = await this.validityInput.isVisible();
    const classificationVisible = await this.classificationSelect.isVisible();
    return capacityVisible && costVisible && validityVisible && classificationVisible;
  }

  async fillPackageCapacity(capacity) {
    await this.capacityInput.clear();
    await this.capacityInput.fill(capacity.replace('GB', ''));
  }

  async fillPackageCost(cost) {
    await this.costInput.clear();
    await this.costInput.fill(cost);
  }

  async fillPackageValidity(validity) {
    await this.validityInput.clear();
    await this.validityInput.fill(validity);
  }

  async selectPackageClassification(classification) {
    await this.classificationSelect.selectOption({ label: classification });
  }

  async isDataValidationSuccessful() {
    await this.page.waitForTimeout(500);
    return await this.validationSuccess.isVisible();
  }

  async selectLocalConsumptionOnly() {
    const isChecked = await this.localConsumptionCheckbox.isChecked();
    if (!isChecked) {
      await this.localConsumptionCheckbox.check();
    }
  }

  async disableRoaming() {
    const isChecked = await this.roamingCheckbox.isChecked();
    if (isChecked) {
      await this.roamingCheckbox.uncheck();
    }
  }

  async enableQueuing() {
    const isChecked = await this.queuingCheckbox.isChecked();
    if (!isChecked) {
      await this.queuingCheckbox.check();
    }
  }

  async areRestrictionsApplied() {
    const localChecked = await this.localConsumptionCheckbox.isChecked();
    const roamingUnchecked = !(await this.roamingCheckbox.isChecked());
    const queuingChecked = await this.queuingCheckbox.isChecked();
    return localChecked && roamingUnchecked && queuingChecked;
  }

  async savePackageConfiguration() {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getConfirmationMessage() {
    await expect(this.confirmationMessage).toBeVisible({ timeout: 10000 });
    return await this.confirmationMessage.textContent();
  }

  async navigateToPackageList() {
    await this.packageListSection.click();
    await this.page.waitForLoadState('networkidle');
  }

  async filterBySOLDPlan() {
    await this.soldPlanFilter.click();
    await this.page.waitForTimeout(1000);
  }

  async isPackageInCatalog(classification, capacity, validityMonths) {
    const packageRow = this.page.locator(
      `[data-testid="package-catalog-table"] tr:has-text("${classification}"):has-text("${capacity}"):has-text("${validityMonths}")`
    );
    return await packageRow.isVisible();
  }
}

module.exports = BSCS7PackagePage;