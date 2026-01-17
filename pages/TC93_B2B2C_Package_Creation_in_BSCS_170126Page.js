class BSCS7PackagePage {
  constructor(page) {
    this.page = page;
    
    // Navigation and Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainConfigScreen = '[data-testid="package-configuration-screen"]';
    
    // Module navigation locators
    this.b2b2cModuleLink = '[data-testid="b2b2c-module-link"]';
    this.createNewPackageButton = '[data-testid="create-new-package-btn"]';
    
    // Package form locators
    this.packageForm = '[data-testid="package-creation-form"]';
    this.capacityInput = '[data-testid="package-capacity-input"]';
    this.costInput = '[data-testid="package-cost-input"]';
    this.validityInput = '[data-testid="package-validity-input"]';
    this.classificationSelect = '[data-testid="package-classification-select"]';
    this.validationIndicator = '[data-testid="data-validation-indicator"]';
    
    // Restrictions locators
    this.localConsumptionCheckbox = '[data-testid="local-consumption-only-checkbox"]';
    this.roamingCheckbox = '[data-testid="roaming-enabled-checkbox"]';
    this.queuingCheckbox = '[data-testid="queuing-enabled-checkbox"]';
    this.restrictionsConfirmation = '[data-testid="restrictions-registered-indicator"]';
    
    // Save and confirmation locators
    this.saveButton = '[data-testid="save-package-btn"]';
    this.confirmationMessage = '[data-testid="confirmation-message"]';
    
    // Package list locators
    this.packageListTable = '[data-testid="packages-list-table"]';
    this.packageRowSelector = '[data-testid="package-row"]';
    this.soldPlanFilter = '[data-testid="sold-plan-filter"]';
  }

  async navigateToSystem() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.example.com');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.BSCS7_USER || 'admin');
    await this.page.fill(this.passwordInput, process.env.BSCS7_PASSWORD || 'password');
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.mainConfigScreen);
  }

  async isPackageConfigurationScreenDisplayed() {
    return await this.page.isVisible(this.mainConfigScreen);
  }

  async navigateToB2B2CModule() {
    await this.page.click(this.b2b2cModuleLink);
    await this.page.waitForLoadState('networkidle');
  }

  async clickCreateNewPackage() {
    await this.page.click(this.createNewPackageButton);
    await this.page.waitForSelector(this.packageForm);
  }

  async isPackageFormDisplayed() {
    const formVisible = await this.page.isVisible(this.packageForm);
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

  async enterPackageValidity(validity) {
    await this.page.fill(this.validityInput, validity);
  }

  async selectClassification(classification) {
    await this.page.selectOption(this.classificationSelect, { label: classification });
  }

  async isDataValidated() {
    await this.page.waitForSelector(this.validationIndicator);
    const validationText = await this.page.textContent(this.validationIndicator);
    return validationText.includes('válido') || validationText.includes('valid');
  }

  async configureLocalConsumptionOnly() {
    await this.page.check(this.localConsumptionCheckbox);
  }

  async disableRoaming() {
    await this.page.uncheck(this.roamingCheckbox);
  }

  async enableQueuing() {
    await this.page.check(this.queuingCheckbox);
  }

  async areRestrictionsRegistered() {
    return await this.page.isVisible(this.restrictionsConfirmation);
  }

  async savePackageConfiguration() {
    await this.page.click(this.saveButton);
    await this.page.waitForSelector(this.confirmationMessage);
  }

  async getConfirmationMessage() {
    return await this.page.textContent(this.confirmationMessage);
  }

  async isPackageInSOLDPlanList(classification, capacity, validity) {
    await this.page.click(this.soldPlanFilter);
    await this.page.waitForSelector(this.packageListTable);
    const packageRows = await this.page.$$eval(this.packageRowSelector, (rows, params) => {
      return rows.some(row => {
        const text = row.textContent;
        return text.includes(params.classification) && 
               text.includes(params.capacity) && 
               text.includes(params.validity);
      });
    }, { classification, capacity, validity });
    return packageRows;
  }

  async getPackageDataFromCatalog(packageName) {
    const packageRow = await this.page.$(`${this.packageRowSelector}:has-text("${packageName}")`);
    if (!packageRow) {
      throw new Error(`Package ${packageName} not found in catalog`);
    }
    const capacity = await packageRow.$eval('[data-testid="package-capacity-cell"]', el => el.textContent);
    const cost = await packageRow.$eval('[data-testid="package-cost-cell"]', el => el.textContent);
    const validity = await packageRow.$eval('[data-testid="package-validity-cell"]', el => el.textContent);
    const classification = await packageRow.$eval('[data-testid="package-classification-cell"]', el => el.textContent);
    return {
      capacity: capacity.trim(),
      cost: cost.trim().replace('S/. ', ''),
      validity: validity.trim(),
      classification: classification.trim()
    };
  }
}

module.exports = BSCS7PackagePage;