class PackageConfigurationPage {
  constructor(page) {
    this.page = page;
    
    this.packageConfigurationModule = '[data-testid="package-configuration-module"]';
    this.packageManagementInterface = '[data-testid="package-management-interface"]';
    this.createNewPackageButton = '[data-testid="btn-create-new-package"]';
    this.packageCodeInput = '[data-testid="input-package-code"]';
    this.packageCapacityInput = '[data-testid="input-package-capacity"]';
    this.packageValidityInput = '[data-testid="input-package-validity"]';
    this.packageCostInput = '[data-testid="input-package-cost"]';
    this.packageTypeSelect = '[data-testid="select-package-type"]';
    this.ratePlanSelect = '[data-testid="select-rate-plan"]';
    this.roamingToggle = '[data-testid="toggle-roaming"]';
    this.singleConsumptionCheckbox = '[data-testid="checkbox-single-consumption"]';
    this.unlimitedActivationsCheckbox = '[data-testid="checkbox-unlimited-activations"]';
    this.saveButton = '[data-testid="btn-save-package"]';
    this.packageTable = '[data-testid="table-packages"]';
    this.successMessage = '[data-testid="message-success"]';
    this.apiValidationStatus = '[data-testid="api-validation-status"]';
  }

  async navigateToPackageConfiguration() {
    await this.page.click(this.packageConfigurationModule);
    await this.page.waitForSelector(this.packageManagementInterface);
  }

  async isPackageManagementInterfaceVisible() {
    return await this.page.isVisible(this.packageManagementInterface);
  }

  async clickCreateNewPackage() {
    await this.page.click(this.createNewPackageButton);
  }

  async enterPackageCode(code) {
    await this.page.fill(this.packageCodeInput, code);
  }

  async enterPackageCapacity(capacity) {
    await this.page.fill(this.packageCapacityInput, capacity);
  }

  async enterPackageValidity(validity) {
    await this.page.fill(this.packageValidityInput, validity);
  }

  async enterPackageCost(cost) {
    await this.page.fill(this.packageCostInput, cost);
  }

  async selectPackageType(packageType) {
    await this.page.selectOption(this.packageTypeSelect, { label: packageType });
  }

  async selectRatePlan(ratePlan) {
    await this.page.selectOption(this.ratePlanSelect, { label: ratePlan });
  }

  async disableRoaming() {
    const isChecked = await this.page.isChecked(this.roamingToggle);
    if (isChecked) {
      await this.page.click(this.roamingToggle);
    }
  }

  async configureSingleConsumption() {
    await this.page.check(this.singleConsumptionCheckbox);
  }

  async enableUnlimitedActivations() {
    await this.page.check(this.unlimitedActivationsCheckbox);
  }

  async savePackageConfiguration() {
    await this.page.click(this.saveButton);
    await this.page.waitForSelector(this.successMessage);
  }

  async isPackageRegistered(packageCode) {
    const tableContent = await this.page.textContent(this.packageTable);
    return tableContent.includes(packageCode);
  }

  async isPackageVisibleInBuyProductApi() {
    await this.page.waitForSelector(this.apiValidationStatus);
    const statusText = await this.page.textContent(this.apiValidationStatus);
    return statusText.includes('Available') || statusText.includes('Visible');
  }
}

module.exports = PackageConfigurationPage;