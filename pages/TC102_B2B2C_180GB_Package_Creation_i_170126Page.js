const { expect } = require('@playwright/test');

class BSCS7PackagePage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="bscs7-username-input"]';
    this.passwordInput = '[data-testid="bscs7-password-input"]';
    this.loginButton = '[data-testid="bscs7-login-button"]';
    
    // Navigation locators
    this.packageAdminMenuLink = '[data-testid="package-administration-menu"]';
    this.packageAdminModule = '[data-testid="package-administration-module"]';
    
    // Package form locators
    this.packageNameInput = '[data-testid="package-name-input"]';
    this.packageCapacityInput = '[data-testid="package-capacity-input"]';
    this.packageCostInput = '[data-testid="package-cost-input"]';
    this.packageValidityInput = '[data-testid="package-validity-input"]';
    this.individualModeRadio = '[data-testid="package-mode-individual"]';
    this.localCoverageCheckbox = '[data-testid="package-coverage-local"]';
    this.roamingDisabledCheckbox = '[data-testid="package-roaming-disabled"]';
    this.savePackageButton = '[data-testid="save-package-button"]';
    this.packageRegistrationMessage = '[data-testid="package-registration-message"]';
    
    // Plan association locators
    this.packageSelect = '[data-testid="package-select-dropdown"]';
    this.planSelect = '[data-testid="plan-select-dropdown"]';
    this.associateButton = '[data-testid="associate-package-plan-button"]';
    this.associationConfirmation = '[data-testid="association-confirmation-message"]';
    
    // Query locators
    this.searchPackageInput = '[data-testid="search-package-input"]';
    this.searchPlanFilter = '[data-testid="search-plan-filter"]';
    this.searchButton = '[data-testid="search-button"]';
    this.packageDetailsContainer = '[data-testid="package-details-container"]';
    this.packageDetailName = '[data-testid="package-detail-name"]';
    this.packageDetailValidity = '[data-testid="package-detail-validity"]';
    this.packageDetailCost = '[data-testid="package-detail-cost"]';
    this.packageDetailPlan = '[data-testid="package-detail-plan"]';
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.BSCS7_USERNAME || 'admin');
    await this.page.fill(this.passwordInput, process.env.BSCS7_PASSWORD || 'admin123');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToPackageAdministration() {
    await this.page.click(this.packageAdminMenuLink);
    await this.page.waitForSelector(this.packageAdminModule);
  }

  async isPackageAdministrationModuleVisible() {
    return await this.page.isVisible(this.packageAdminModule);
  }

  async enterPackageData(packageData) {
    await this.page.fill(this.packageNameInput, packageData.name);
    await this.page.fill(this.packageCapacityInput, packageData.capacity);
    await this.page.fill(this.packageCostInput, packageData.cost);
    await this.page.fill(this.packageValidityInput, packageData.validity);
  }

  async selectIndividualMode() {
    await this.page.click(this.individualModeRadio);
  }

  async selectLocalCoverageWithoutRoaming() {
    await this.page.check(this.localCoverageCheckbox);
    await this.page.check(this.roamingDisabledCheckbox);
  }

  async savePackage() {
    await this.page.click(this.savePackageButton);
    await this.page.waitForSelector(this.packageRegistrationMessage);
  }

  async getPackageRegistrationConfirmation() {
    return await this.page.textContent(this.packageRegistrationMessage);
  }

  async associatePackageToPlan(packageName, planName) {
    await this.page.selectOption(this.packageSelect, { label: packageName });
    await this.page.selectOption(this.planSelect, { label: planName });
    await this.page.click(this.associateButton);
    await this.page.waitForSelector(this.associationConfirmation);
  }

  async isPackageAssociationConfirmed() {
    return await this.page.isVisible(this.associationConfirmation);
  }

  async queryPackageAvailability(packageName, planName) {
    await this.page.fill(this.searchPackageInput, packageName);
    await this.page.selectOption(this.searchPlanFilter, { label: planName });
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.packageDetailsContainer);
  }

  async getPackageDetails() {
    return {
      name: await this.page.textContent(this.packageDetailName),
      validity: await this.page.textContent(this.packageDetailValidity),
      cost: await this.page.textContent(this.packageDetailCost),
      plan: await this.page.textContent(this.packageDetailPlan)
    };
  }
}

module.exports = BSCS7PackagePage;