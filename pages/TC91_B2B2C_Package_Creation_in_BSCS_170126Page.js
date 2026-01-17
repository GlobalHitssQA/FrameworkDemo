class BSCS7PackagePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BSCS7_URL || 'https://bscs7.example.com';
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-btn"]';
    this.packageConfigScreen = '[data-testid="package-configuration-screen"]';
    this.b2b2cModuleLink = '[data-testid="menu-b2b2c-packages"]';
    this.createNewPackageButton = '[data-testid="btn-create-new-package"]';
    this.packageCreationForm = '[data-testid="package-creation-form"]';
    this.capacityInput = '[data-testid="input-package-capacity"]';
    this.costInput = '[data-testid="input-package-cost"]';
    this.validityInput = '[data-testid="input-package-validity"]';
    this.classificationSelect = '[data-testid="select-classification"]';
    this.classificationOptionB2B2C = '[data-testid="option-classification-b2b2c"]';
    this.validationSuccessIndicator = '[data-testid="validation-success"]';
    this.localConsumptionCheckbox = '[data-testid="checkbox-local-consumption"]';
    this.roamingCheckbox = '[data-testid="checkbox-roaming"]';
    this.queuingCheckbox = '[data-testid="checkbox-queuing"]';
    this.restrictionsConfirmation = '[data-testid="restrictions-configured"]';
    this.savePackageButton = '[data-testid="btn-save-package"]';
    this.confirmationMessage = '[data-testid="confirmation-message"]';
    this.soldPlanPackageList = '[data-testid="sold-plan-package-list"]';
    this.packageCatalogTable = '[data-testid="package-catalog-table"]';
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
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
    const costVisible = await this.page.isVisible(this.costInput);
    const validityVisible = await this.page.isVisible(this.validityInput);
    const classificationVisible = await this.page.isVisible(this.classificationSelect);
    return formVisible && capacityVisible && costVisible && validityVisible && classificationVisible;
  }

  async enterPackageCapacity(capacity) {
    await this.page.fill(this.capacityInput, capacity);
  }

  async enterPackageCost(cost) {
    await this.page.fill(this.costInput, cost);
  }

  async enterPackageValidity(days) {
    await this.page.fill(this.validityInput, days);
  }

  async selectClassification(classification) {
    await this.page.click(this.classificationSelect);
    if (classification === 'B2B2C') {
      await this.page.click(this.classificationOptionB2B2C);
    }
  }

  async isDataValidated() {
    return await this.page.isVisible(this.validationSuccessIndicator);
  }

  async configureLocalConsumptionOnly() {
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

  async areRestrictionsConfigured() {
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
    const packageRow = `${this.soldPlanPackageList} [data-testid="package-row-${packageName.replace(/\s+/g, '-').toLowerCase()}"]`;
    return await this.page.isVisible(packageRow);
  }

  async getPackageDataFromCatalog(packageName) {
    const packageRowSelector = `${this.packageCatalogTable} tr:has-text("${packageName}")`;
    await this.page.waitForSelector(packageRowSelector);
    const capacity = await this.page.textContent(`${packageRowSelector} [data-testid="cell-capacity"]`);
    const cost = await this.page.textContent(`${packageRowSelector} [data-testid="cell-cost"]`);
    const validity = await this.page.textContent(`${packageRowSelector} [data-testid="cell-validity"]`);
    const classification = await this.page.textContent(`${packageRowSelector} [data-testid="cell-classification"]`);
    return {
      capacity: capacity.trim(),
      cost: cost.trim(),
      validity: validity.trim(),
      classification: classification.trim()
    };
  }
}

module.exports = BSCS7PackagePage;