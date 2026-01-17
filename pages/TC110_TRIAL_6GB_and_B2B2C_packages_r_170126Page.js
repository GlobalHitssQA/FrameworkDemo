class PackageConfigurationPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.packageManagementMenu = '[data-testid="menu-package-management"]';
    this.trafficSimulatorMenu = '[data-testid="menu-traffic-simulator"]';
    this.packageConfigTableMenu = '[data-testid="menu-package-configuration"]';
    
    // Line selection locators
    this.testLineDropdown = '[data-testid="select-test-line"]';
    this.soldPlanLineOption = '[data-testid="line-sold-plan"]';
    this.lineStatusIndicator = '[data-testid="line-status-indicator"]';
    
    // Package activation locators
    this.packageTypeDropdown = '[data-testid="select-package-type"]';
    this.trial6GBOption = '[data-testid="option-trial-6gb"]';
    this.b2b2cOption = '[data-testid="option-b2b2c"]';
    this.activatePackageButton = '[data-testid="btn-activate-package"]';
    this.activationConfirmationMessage = '[data-testid="msg-activation-confirmation"]';
    
    // Coverage and roaming locators
    this.coverageAttributeField = '[data-testid="field-coverage-attribute"]';
    this.roamingStatusField = '[data-testid="field-roaming-status"]';
    
    // Traffic simulator locators
    this.roamingModeCheckbox = '[data-testid="checkbox-roaming-mode"]';
    this.simulateConsumptionButton = '[data-testid="btn-simulate-consumption"]';
    this.trafficBlockedIndicator = '[data-testid="indicator-traffic-blocked"]';
    this.localNavigationIndicator = '[data-testid="indicator-local-navigation"]';
    
    // Package configuration table locators
    this.packageSearchInput = '[data-testid="input-package-search"]';
    this.searchButton = '[data-testid="btn-search"]';
    this.packageTableRows = '[data-testid="table-packages"] tbody tr';
    this.roamingParameterColumn = '[data-testid="col-roaming-parameter"]';
    this.packageNameColumn = '[data-testid="col-package-name"]';
  }

  async navigateToPackageManagement() {
    await this.page.click(this.packageManagementMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToTrafficSimulator() {
    await this.page.click(this.trafficSimulatorMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToPackageConfigurationTable() {
    await this.page.click(this.packageConfigTableMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async verifySOLDPlanLineAvailable() {
    await this.page.waitForSelector(this.testLineDropdown);
    const isVisible = await this.page.isVisible(this.soldPlanLineOption);
    return isVisible;
  }

  async selectTestLine() {
    await this.page.click(this.testLineDropdown);
    await this.page.click(this.soldPlanLineOption);
    await this.page.waitForSelector(this.lineStatusIndicator);
  }

  async activatePackage(packageType) {
    await this.page.click(this.packageTypeDropdown);
    if (packageType === 'TRIAL 6GB') {
      await this.page.click(this.trial6GBOption);
    } else if (packageType === 'B2B2C') {
      await this.page.click(this.b2b2cOption);
    }
    await this.page.click(this.activatePackageButton);
    await this.page.waitForSelector(this.activationConfirmationMessage);
  }

  async getPackageCoverageAttribute() {
    await this.page.waitForSelector(this.coverageAttributeField);
    return await this.page.textContent(this.coverageAttributeField);
  }

  async getRoamingStatus() {
    await this.page.waitForSelector(this.roamingStatusField);
    return await this.page.textContent(this.roamingStatusField);
  }

  async simulateRoamingDataConsumption(packageType) {
    await this.page.check(this.roamingModeCheckbox);
    await this.page.click(this.simulateConsumptionButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isRoamingTrafficBlocked() {
    await this.page.waitForSelector(this.trafficBlockedIndicator);
    const blockedText = await this.page.textContent(this.trafficBlockedIndicator);
    return blockedText.includes('BLOCKED') || blockedText.includes('BLOQUEADO');
  }

  async isLocalNavigationAllowed() {
    await this.page.waitForSelector(this.localNavigationIndicator);
    const allowedText = await this.page.textContent(this.localNavigationIndicator);
    return allowedText.includes('ALLOWED') || allowedText.includes('PERMITIDO');
  }

  async searchPackage(packageName) {
    await this.page.fill(this.packageSearchInput, packageName);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getPackageRoamingParameter(packageName) {
    const rows = await this.page.$$(this.packageTableRows);
    for (const row of rows) {
      const name = await row.$eval(this.packageNameColumn, el => el.textContent);
      if (name.includes(packageName)) {
        const roamingValue = await row.$eval(this.roamingParameterColumn, el => el.textContent);
        return roamingValue.trim();
      }
    }
    return null;
  }
}

module.exports = PackageConfigurationPage;