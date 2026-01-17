const { expect } = require('@playwright/test');

class BSCS7PackagePage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="bscs7-username"]';
    this.passwordInput = '[data-testid="bscs7-password"]';
    this.loginButton = '[data-testid="bscs7-login-btn"]';
    
    // Main navigation locators
    this.mainConfigScreen = '[data-testid="package-configuration-screen"]';
    this.b2b2cModuleLink = '[data-testid="nav-b2b2c-module"]';
    this.createPackageButton = '[data-testid="btn-create-new-package"]';
    
    // Package form locators
    this.packageForm = '[data-testid="package-creation-form"]';
    this.capacityInput = '[data-testid="input-package-capacity"]';
    this.costInput = '[data-testid="input-cost-without-igv"]';
    this.validitySelect = '[data-testid="select-validity-months"]';
    this.classificationSelect = '[data-testid="select-classification"]';
    this.validationIndicator = '[data-testid="data-validation-success"]';
    
    // Restrictions locators
    this.localConsumptionCheckbox = '[data-testid="checkbox-local-consumption-only"]';
    this.roamingCheckbox = '[data-testid="checkbox-roaming-enabled"]';
    this.queuingCheckbox = '[data-testid="checkbox-queuing-enabled"]';
    this.restrictionsConfirmation = '[data-testid="restrictions-configured-indicator"]';
    
    // Save and confirmation locators
    this.saveButton = '[data-testid="btn-save-package"]';
    this.confirmationMessage = '[data-testid="message-creation-confirmation"]';
    
    // Package list locators
    this.soldPlanLink = '[data-testid="nav-sold-plan-packages"]';
    this.packageCatalogTable = '[data-testid="table-package-catalog"]';
    this.packageRow = '[data-testid="package-row"]';
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BSCS7_BASE_URL || 'https://bscs7.example.com');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainConfigurationScreenVisible() {
    return await this.page.isVisible(this.mainConfigScreen);
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
    const validityVisible = await this.page.isVisible(this.validitySelect);
    const classificationVisible = await this.page.isVisible(this.classificationSelect);
    return formVisible && capacityVisible && costVisible && validityVisible && classificationVisible;
  }

  async enterCapacity(capacity) {
    await this.page.fill(this.capacityInput, capacity);
  }

  async enterCostWithoutIGV(cost) {
    await this.page.fill(this.costInput, cost);
  }

  async selectValidity(months) {
    await this.page.selectOption(this.validitySelect, { label: `${months} meses` });
  }

  async selectClassification(classification) {
    await this.page.selectOption(this.classificationSelect, { label: classification });
  }

  async isDataValidated() {
    await this.page.waitForSelector(this.validationIndicator, { timeout: 5000 });
    return await this.page.isVisible(this.validationIndicator);
  }

  async enableLocalConsumptionOnly() {
    await this.page.check(this.localConsumptionCheckbox);
  }

  async disableRoaming() {
    const isChecked = await this.page.isChecked(this.roamingCheckbox);
    if (isChecked) {
      await this.page.uncheck(this.roamingCheckbox);
    }
  }

  async enableQueuing() {
    await this.page.check(this.queuingCheckbox);
  }

  async areRestrictionsConfigured() {
    const localOnly = await this.page.isChecked(this.localConsumptionCheckbox);
    const roamingDisabled = !(await this.page.isChecked(this.roamingCheckbox));
    const queuingEnabled = await this.page.isChecked(this.queuingCheckbox);
    return localOnly && roamingDisabled && queuingEnabled;
  }

  async savePackageConfiguration() {
    await this.page.click(this.saveButton);
    await this.page.waitForSelector(this.confirmationMessage);
  }

  async getConfirmationMessage() {
    return await this.page.textContent(this.confirmationMessage);
  }

  async navigateToSOLDPackageList() {
    await this.page.click(this.soldPlanLink);
    await this.page.waitForSelector(this.packageCatalogTable);
  }

  async isPackageInCatalog(classification, capacity, validityMonths) {
    const packageSelector = `${this.packageRow}[data-classification="${classification}"][data-capacity="${capacity}"][data-validity="${validityMonths}"]`;
    return await this.page.isVisible(packageSelector);
  }

  async getPackageDetails(classification, capacity) {
    const packageSelector = `${this.packageRow}[data-classification="${classification}"][data-capacity="${capacity}"]`;
    const packageElement = this.page.locator(packageSelector);
    
    return {
      capacity: await packageElement.locator('[data-testid="package-capacity"]').textContent(),
      cost: await packageElement.locator('[data-testid="package-cost"]').textContent(),
      validity: await packageElement.locator('[data-testid="package-validity"]').textContent(),
      classification: await packageElement.locator('[data-testid="package-classification"]').textContent(),
      localOnly: (await packageElement.locator('[data-testid="package-local-only"]').textContent()) === 'Sí',
      roamingDisabled: (await packageElement.locator('[data-testid="package-roaming"]').textContent()) === 'No',
      queuingEnabled: (await packageElement.locator('[data-testid="package-queuing"]').textContent()) === 'Sí'
    };
  }
}

module.exports = BSCS7PackagePage;