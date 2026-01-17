const { expect } = require('@playwright/test');

class BSCS7PackagePage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="bscs7-username"]';
    this.passwordInput = '[data-testid="bscs7-password"]';
    this.loginButton = '[data-testid="bscs7-login-btn"]';
    
    // Navigation locators
    this.packageAdminModule = '[data-testid="package-admin-module"]';
    this.packageModuleContainer = '[data-testid="package-module-container"]';
    this.planConfigSection = '[data-testid="plan-config-section"]';
    
    // Package form locators
    this.newPackageButton = '[data-testid="new-package-btn"]';
    this.packageNameInput = '[data-testid="package-name-input"]';
    this.packageCapacityInput = '[data-testid="package-capacity-input"]';
    this.packageCostInput = '[data-testid="package-cost-input"]';
    this.packageValidityInput = '[data-testid="package-validity-input"]';
    this.individualModeRadio = '[data-testid="individual-mode-radio"]';
    this.localCoverageCheckbox = '[data-testid="local-coverage-checkbox"]';
    this.noRoamingCheckbox = '[data-testid="no-roaming-checkbox"]';
    this.savePackageButton = '[data-testid="save-package-btn"]';
    this.confirmationMessage = '[data-testid="confirmation-message"]';
    
    // Plan association locators
    this.planAssociationLink = '[data-testid="plan-association-link"]';
    this.packageSelectDropdown = '[data-testid="package-select-dropdown"]';
    this.planSelectDropdown = '[data-testid="plan-select-dropdown"]';
    this.confirmAssociationButton = '[data-testid="confirm-association-btn"]';
    this.associationConfirmation = '[data-testid="association-confirmation"]';
    
    // Query locators
    this.packageQueryLink = '[data-testid="package-query-link"]';
    this.searchPackageInput = '[data-testid="search-package-input"]';
    this.planFilterDropdown = '[data-testid="plan-filter-dropdown"]';
    this.packageDetailsContainer = '[data-testid="package-details-container"]';
    this.packageNameDisplay = '[data-testid="package-name-display"]';
    this.packageValidityDisplay = '[data-testid="package-validity-display"]';
    this.packageCostDisplay = '[data-testid="package-cost-display"]';
    this.packagePlanDisplay = '[data-testid="package-plan-display"]';
    this.packageStatusBadge = '[data-testid="package-status-badge"]';
  }

  async navigateToLogin() {
    await this.page.goto('/bscs7/login');
  }

  async loginWithConfigurationPermissions() {
    await this.page.fill(this.usernameInput, process.env.BSCS7_USERNAME || 'admin_config');
    await this.page.fill(this.passwordInput, process.env.BSCS7_PASSWORD || 'password');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifySoldPlanConfigured() {
    await this.page.click(this.planConfigSection);
    const soldPlan = await this.page.locator('[data-testid="plan-row-SOLD"]');
    return await soldPlan.isVisible();
  }

  async accessPackageAdministrationModule() {
    await this.page.click(this.packageAdminModule);
    await this.page.waitForSelector(this.packageModuleContainer);
  }

  async isPackageModuleVisible() {
    return await this.page.isVisible(this.packageModuleContainer);
  }

  async openNewPackageForm() {
    await this.page.click(this.newPackageButton);
  }

  async enterPackageName(name) {
    await this.page.fill(this.packageNameInput, name);
  }

  async enterPackageCapacity(capacity) {
    await this.page.fill(this.packageCapacityInput, capacity.toString());
  }

  async enterPackageCost(cost) {
    await this.page.fill(this.packageCostInput, cost.toString());
  }

  async enterPackageValidity(days) {
    await this.page.fill(this.packageValidityInput, days.toString());
  }

  async selectIndividualMode() {
    await this.page.click(this.individualModeRadio);
  }

  async selectLocalCoverageWithoutRoaming() {
    await this.page.check(this.localCoverageCheckbox);
    await this.page.check(this.noRoamingCheckbox);
  }

  async savePackage() {
    await this.page.click(this.savePackageButton);
    await this.page.waitForSelector(this.confirmationMessage);
  }

  async getConfirmationMessage() {
    return await this.page.textContent(this.confirmationMessage);
  }

  async navigateToPlanAssociation() {
    await this.page.click(this.planAssociationLink);
  }

  async selectPackageForAssociation(packageName) {
    await this.page.selectOption(this.packageSelectDropdown, { label: packageName });
  }

  async selectPlanForAssociation(planName) {
    await this.page.selectOption(this.planSelectDropdown, { label: planName });
  }

  async confirmAssociation() {
    await this.page.click(this.confirmAssociationButton);
    await this.page.waitForSelector(this.associationConfirmation);
  }

  async getAssociationConfirmation() {
    return await this.page.textContent(this.associationConfirmation);
  }

  async isPackageAvailableForActivation(packageName) {
    const packageRow = await this.page.locator(`[data-testid="package-row-${packageName.replace(/\s+/g, '-')}"]`);
    const statusBadge = await packageRow.locator(this.packageStatusBadge);
    const status = await statusBadge.textContent();
    return status.toLowerCase().includes('disponible') || status.toLowerCase().includes('available');
  }

  async navigateToPackageQuery() {
    await this.page.click(this.packageQueryLink);
  }

  async searchPackageByName(name) {
    await this.page.fill(this.searchPackageInput, name);
    await this.page.press(this.searchPackageInput, 'Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async filterByPlan(planName) {
    await this.page.selectOption(this.planFilterDropdown, { label: planName });
    await this.page.waitForLoadState('networkidle');
  }

  async getPackageDetails() {
    await this.page.waitForSelector(this.packageDetailsContainer);
    const name = await this.page.textContent(this.packageNameDisplay);
    const validityText = await this.page.textContent(this.packageValidityDisplay);
    const costText = await this.page.textContent(this.packageCostDisplay);
    const plan = await this.page.textContent(this.packagePlanDisplay);
    
    return {
      name: name.trim(),
      validity: parseInt(validityText.replace(/\D/g, '')),
      cost: parseFloat(costText.replace(/[^\d.]/g, '')),
      plan: plan.trim()
    };
  }
};

module.exports = BSCS7PackagePage;