const { expect } = require('@playwright/test');

class BSCS7PackagePage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-btn"]';
    this.mainScreen = '[data-testid="main-dashboard"]';
    
    this.packagesMenu = '[data-testid="menu-packages"]';
    this.b2b2cModuleLink = '[data-testid="module-b2b2c-packages"]';
    this.createPackageButton = '[data-testid="btn-create-package"]';
    
    this.packageForm = '[data-testid="package-creation-form"]';
    this.capacityInput = '[data-testid="input-package-capacity"]';
    this.costInput = '[data-testid="input-package-cost"]';
    this.validityInput = '[data-testid="input-package-validity"]';
    this.classificationSelect = '[data-testid="select-package-classification"]';
    
    this.localConsumptionCheckbox = '[data-testid="checkbox-local-consumption"]';
    this.roamingCheckbox = '[data-testid="checkbox-roaming"]';
    this.queuingCheckbox = '[data-testid="checkbox-queuing"]';
    
    this.savePackageButton = '[data-testid="btn-save-package"]';
    this.confirmationMessageElement = '[data-testid="message-confirmation"]';
    
    this.packagesListTable = '[data-testid="table-packages-list"]';
    this.soldPlanFilter = '[data-testid="filter-sold-plan"]';
    this.packageRowSelector = '[data-testid="package-row"]';
    
    this.validationSuccessIndicator = '[data-testid="validation-success"]';
    this.restrictionsConfirmation = '[data-testid="restrictions-registered"]';
  }

  async navigateToLoginPage() {
    await this.page.goto(process.env.BSCS7_BASE_URL || 'https://bscs7.example.com');
  }

  async loginWithAuthorizedUser() {
    await this.page.fill(this.usernameInput, process.env.BSCS7_USERNAME || 'admin');
    await this.page.fill(this.passwordInput, process.env.BSCS7_PASSWORD || 'password');
    await this.page.click(this.loginButton);
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible' });
  }

  async verifySOLDPlanConfigured() {
    await this.page.click(this.packagesMenu);
    const soldPlanExists = await this.page.isVisible(this.soldPlanFilter);
    expect(soldPlanExists).toBe(true);
  }

  async navigateToB2B2CPackageModule() {
    await this.page.click(this.packagesMenu);
    await this.page.click(this.b2b2cModuleLink);
  }

  async clickCreateNewPackage() {
    await this.page.click(this.createPackageButton);
  }

  async isPackageFormDisplayed() {
    return await this.page.isVisible(this.packageForm);
  }

  async verifyFormFieldsPresent() {
    await this.page.waitForSelector(this.capacityInput, { state: 'visible' });
    await this.page.waitForSelector(this.costInput, { state: 'visible' });
    await this.page.waitForSelector(this.validityInput, { state: 'visible' });
    await this.page.waitForSelector(this.classificationSelect, { state: 'visible' });
  }

  async fillPackageCapacity(capacity) {
    await this.page.fill(this.capacityInput, capacity);
  }

  async fillPackageCost(cost) {
    await this.page.fill(this.costInput, cost);
  }

  async fillPackageValidity(validity) {
    await this.page.fill(this.validityInput, validity);
  }

  async selectPackageClassification(classification) {
    await this.page.selectOption(this.classificationSelect, classification);
  }

  async isPackageDataValid() {
    return await this.page.isVisible(this.validationSuccessIndicator);
  }

  async selectLocalConsumptionOnly() {
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

  async clickSavePackage() {
    await this.page.click(this.savePackageButton);
  }

  async getConfirmationMessage() {
    await this.page.waitForSelector(this.confirmationMessageElement, { state: 'visible' });
    return await this.page.textContent(this.confirmationMessageElement);
  }

  async navigateToPackagesList() {
    await this.page.click(this.packagesMenu);
    await this.page.waitForSelector(this.packagesListTable, { state: 'visible' });
  }

  async filterBySOLDPlan() {
    await this.page.click(this.soldPlanFilter);
  }

  async isPackageVisibleInCatalog(classification, capacity, validity) {
    const packageRow = this.page.locator(this.packageRowSelector).filter({
      hasText: classification
    }).filter({
      hasText: capacity
    }).filter({
      hasText: validity
    });
    return await packageRow.isVisible();
  }

  async verifyPackageDataInCatalog(capacity, cost, validity, classification) {
    const packageRow = this.page.locator(this.packageRowSelector).filter({
      hasText: classification
    });
    const rowText = await packageRow.textContent();
    expect(rowText).toContain(capacity);
    expect(rowText).toContain(cost);
    expect(rowText).toContain(validity);
    expect(rowText).toContain(classification);
  }
}

module.exports = BSCS7PackagePage;