class BSCS7PackagePage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = page.locator('[data-testid="bscs7-username-input"]');
    this.passwordInput = page.locator('[data-testid="bscs7-password-input"]');
    this.loginButton = page.locator('[data-testid="bscs7-login-button"]');
    
    // Navigation locators
    this.packageAdminMenuItem = page.locator('[data-testid="menu-package-administration"]');
    this.packageAdminModule = page.locator('[data-testid="package-administration-module"]');
    
    // Package form locators
    this.packageNameInput = page.locator('[data-testid="package-name-input"]');
    this.packageCapacityInput = page.locator('[data-testid="package-capacity-input"]');
    this.packageCostInput = page.locator('[data-testid="package-cost-input"]');
    this.packageValidityInput = page.locator('[data-testid="package-validity-days-input"]');
    this.packageModeSelect = page.locator('[data-testid="package-mode-select"]');
    this.packageCoverageSelect = page.locator('[data-testid="package-coverage-select"]');
    this.roamingCheckbox = page.locator('[data-testid="package-roaming-checkbox"]');
    this.savePackageButton = page.locator('[data-testid="save-package-button"]');
    
    // Package details locators
    this.registeredPackageMode = page.locator('[data-testid="registered-package-mode"]');
    this.registeredPackageCoverage = page.locator('[data-testid="registered-package-coverage"]');
    this.registeredPackageRoaming = page.locator('[data-testid="registered-package-roaming"]');
    
    // Plan association locators
    this.planAssociationSection = page.locator('[data-testid="plan-association-section"]');
    this.packageSelector = page.locator('[data-testid="package-selector"]');
    this.planSelector = page.locator('[data-testid="plan-selector"]');
    this.ratePlanInput = page.locator('[data-testid="rate-plan-input"]');
    this.associateButton = page.locator('[data-testid="associate-package-button"]');
    this.associationConfirmation = page.locator('[data-testid="association-confirmation-message"]');
    
    // Query locators
    this.queryPackageInput = page.locator('[data-testid="query-package-input"]');
    this.queryPlanInput = page.locator('[data-testid="query-plan-input"]');
    this.queryButton = page.locator('[data-testid="query-availability-button"]');
    this.queryResultName = page.locator('[data-testid="query-result-package-name"]');
    this.queryResultValidity = page.locator('[data-testid="query-result-validity-months"]');
    this.queryResultCost = page.locator('[data-testid="query-result-cost"]');
    this.queryResultPlan = page.locator('[data-testid="query-result-associated-plan"]');
  }

  async login() {
    await this.usernameInput.fill(process.env.BSCS7_USERNAME || 'admin');
    await this.passwordInput.fill(process.env.BSCS7_PASSWORD || 'password');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToPackageAdministration() {
    await this.packageAdminMenuItem.click();
    await this.packageAdminModule.waitFor({ state: 'visible' });
  }

  async isPackageAdministrationModuleVisible() {
    return await this.packageAdminModule.isVisible();
  }

  async enterPackageData(packageData) {
    await this.packageNameInput.fill(packageData.name);
    await this.packageCapacityInput.fill(packageData.capacity.toString());
    await this.packageCostInput.fill(packageData.cost.toString());
    await this.packageValidityInput.fill(packageData.validityDays.toString());
    await this.packageModeSelect.selectOption('individual');
    await this.packageCoverageSelect.selectOption('local');
    
    const isRoamingChecked = await this.roamingCheckbox.isChecked();
    if (isRoamingChecked) {
      await this.roamingCheckbox.uncheck();
    }
    
    await this.savePackageButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getRegisteredPackageDetails() {
    const mode = await this.registeredPackageMode.textContent();
    const coverage = await this.registeredPackageCoverage.textContent();
    const roamingText = await this.registeredPackageRoaming.textContent();
    
    return {
      mode: mode.trim().toLowerCase(),
      coverage: coverage.trim().toLowerCase(),
      roaming: roamingText.trim().toLowerCase() === 'yes'
    };
  }

  async associatePackageToPlan(packageName, planName, ratePlan) {
    await this.planAssociationSection.click();
    await this.packageSelector.selectOption(packageName);
    await this.planSelector.selectOption(planName);
    await this.ratePlanInput.fill(ratePlan);
    await this.associateButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getAssociationConfirmationMessage() {
    await this.associationConfirmation.waitFor({ state: 'visible' });
    return await this.associationConfirmation.textContent();
  }

  async queryPackageAvailability(packageName, planName) {
    await this.queryPackageInput.fill(packageName);
    await this.queryPlanInput.fill(planName);
    await this.queryButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getPackageAvailabilityInfo() {
    const name = await this.queryResultName.textContent();
    const validityText = await this.queryResultValidity.textContent();
    const costText = await this.queryResultCost.textContent();
    const plan = await this.queryResultPlan.textContent();
    
    return {
      name: name.trim(),
      validityMonths: parseInt(validityText.trim(), 10),
      cost: parseFloat(costText.trim()),
      associatedPlan: plan.trim()
    };
  }
}

module.exports = BSCS7PackagePage;