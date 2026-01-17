const { expect } = require('@playwright/test');

class PackageAdministrationPage {
  constructor(page) {
    this.page = page;
    
    this.packageAdminMenuLink = '[data-testid="menu-package-administration"]';
    this.packageInterfaceContainer = '[data-testid="package-interface-container"]';
    this.createNewPackageButton = '[data-testid="btn-create-new-package"]';
    this.packageIdentifierInput = '[data-testid="input-package-identifier"]';
    this.packageFormContainer = '[data-testid="package-form-container"]';
    this.capacityInput = '[data-testid="input-package-capacity"]';
    this.capacityUnitSelect = '[data-testid="select-capacity-unit"]';
    this.validityInput = '[data-testid="input-package-validity"]';
    this.validityUnitSelect = '[data-testid="select-validity-unit"]';
    this.costInput = '[data-testid="input-package-cost"]';
    this.costWithoutTaxCheckbox = '[data-testid="checkbox-cost-without-tax"]';
    this.categorySelect = '[data-testid="select-package-category"]';
    this.corporateAccountSelect = '[data-testid="select-corporate-account"]';
    this.planSelect = '[data-testid="select-plan"]';
    this.linkAccountButton = '[data-testid="btn-link-account"]';
    this.linkSuccessMessage = '[data-testid="message-link-success"]';
    this.localNavigationCheckbox = '[data-testid="checkbox-local-navigation"]';
    this.roamingCheckbox = '[data-testid="checkbox-roaming"]';
    this.geographicRestrictionMessage = '[data-testid="message-geographic-restriction"]';
    this.queuingCheckbox = '[data-testid="checkbox-queuing-enabled"]';
    this.simultaneousPackagesInput = '[data-testid="input-simultaneous-packages"]';
    this.unlimitedActivationsCheckbox = '[data-testid="checkbox-unlimited-activations"]';
    this.consumptionRulesMessage = '[data-testid="message-consumption-rules"]';
    this.saveConfigurationButton = '[data-testid="btn-save-configuration"]';
    this.databaseStorageMessage = '[data-testid="message-database-storage"]';
    this.apiAvailabilitySection = '[data-testid="section-api-availability"]';
    this.buyProductApiStatus = '[data-testid="status-buyproduct-api"]';
    this.getInternetBalanceApiStatus = '[data-testid="status-getinternetbalance-api"]';
  }

  async navigateToPackageAdministration() {
    await this.page.click(this.packageAdminMenuLink);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPackageInterfaceDisplayed() {
    await expect(this.page.locator(this.packageInterfaceContainer)).toBeVisible();
  }

  async clickCreateNewPackage() {
    await this.page.click(this.createNewPackageButton);
  }

  async enterPackageIdentifier(identifier) {
    await this.page.fill(this.packageIdentifierInput, identifier);
  }

  async verifyPackageFormEnabled() {
    await expect(this.page.locator(this.packageFormContainer)).toBeVisible();
    await expect(this.page.locator(this.capacityInput)).toBeEnabled();
  }

  async setPackageCapacity(capacity) {
    await this.page.fill(this.capacityInput, capacity);
    await this.page.selectOption(this.capacityUnitSelect, 'GB');
  }

  async setPackageValidity(days) {
    await this.page.fill(this.validityInput, days);
    await this.page.selectOption(this.validityUnitSelect, 'days');
  }

  async setPackageCostWithoutTax(cost) {
    await this.page.fill(this.costInput, cost);
    await this.page.check(this.costWithoutTaxCheckbox);
  }

  async setPackageCategory(category) {
    await this.page.selectOption(this.categorySelect, category);
  }

  async linkToCorporateAccounts(accountName, plan) {
    await this.page.selectOption(this.corporateAccountSelect, accountName);
    await this.page.selectOption(this.planSelect, plan);
    await this.page.click(this.linkAccountButton);
  }

  async verifyPackageLinkSuccess() {
    await expect(this.page.locator(this.linkSuccessMessage)).toBeVisible();
  }

  async setLocalNavigationOnly() {
    await this.page.check(this.localNavigationCheckbox);
  }

  async disableRoaming() {
    await this.page.uncheck(this.roamingCheckbox);
  }

  async verifyGeographicRestrictionApplied() {
    await expect(this.page.locator(this.geographicRestrictionMessage)).toBeVisible();
  }

  async enableQueuing() {
    await this.page.check(this.queuingCheckbox);
  }

  async setSimultaneousPackages(count) {
    await this.page.fill(this.simultaneousPackagesInput, count);
  }

  async setUnlimitedActivations() {
    await this.page.check(this.unlimitedActivationsCheckbox);
  }

  async verifyConsumptionRulesRegistered() {
    await expect(this.page.locator(this.consumptionRulesMessage)).toBeVisible();
  }

  async savePackageConfiguration() {
    await this.page.click(this.saveConfigurationButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPackageStoredInDatabase(packageName) {
    const message = await this.page.locator(this.databaseStorageMessage).textContent();
    return message.includes(packageName);
  }

  async verifyPackageAvailableInBuyProductAPI() {
    await expect(this.page.locator(this.apiAvailabilitySection)).toBeVisible();
    const status = await this.page.locator(this.buyProductApiStatus).textContent();
    return status.includes('available') || status.includes('active');
  }

  async verifyPackageAvailableInGetInternetBalanceAPI() {
    const status = await this.page.locator(this.getInternetBalanceApiStatus).textContent();
    return status.includes('available') || status.includes('active');
  }
}

module.exports = PackageAdministrationPage;