const { expect } = require('@playwright/test');

class BSCS7Page {
  constructor(page) {
    this.page = page;
    
    // System navigation locators
    this.systemStatusIndicator = '[data-testid="system-status-indicator"]';
    this.mainMenuButton = '[data-testid="main-menu-btn"]';
    
    // Line provisioning locators
    this.provisioningMenuOption = '[data-testid="menu-line-provisioning"]';
    this.accountSearchInput = '[data-testid="account-search-input"]';
    this.generalMotorsAccountOption = '[data-testid="account-option-general-motors"]';
    this.planDropdown = '[data-testid="plan-dropdown"]';
    this.soldPlanOption = '[data-testid="plan-option-sold-rateplan3"]';
    this.confirmProvisioningButton = '[data-testid="btn-confirm-provisioning"]';
    this.provisioningSuccessMessage = '[data-testid="provisioning-success-msg"]';
    this.assignedPlanLabel = '[data-testid="assigned-plan-label"]';
    
    // Package assignment locators
    this.packageAssignmentsMenu = '[data-testid="menu-package-assignments"]';
    this.lineSearchInput = '[data-testid="line-search-input"]';
    this.searchButton = '[data-testid="btn-search"]';
    this.inPool10MBPackageStatus = '[data-testid="package-inpool-10mb-status"]';
    this.packageAssignmentType = '[data-testid="package-assignment-type"]';
    
    // Package configuration locators
    this.packageConfigMenu = '[data-testid="menu-package-configuration"]';
    this.packageQueryInput = '[data-testid="package-query-input"]';
    this.executeQueryButton = '[data-testid="btn-execute-query"]';
    this.packageCapacityField = '[data-testid="field-package-capacity"]';
    this.packageRateField = '[data-testid="field-package-rate"]';
    this.apnCoverageField = '[data-testid="field-apn-coverage"]';
    this.consumptionTypeField = '[data-testid="field-consumption-type"]';
    
    // Account status locators
    this.accountStatusIndicator = '[data-testid="gm-account-status"]';
    this.inPoolPackageConfigStatus = '[data-testid="inpool-package-config-status"]';
    
    // Stored data
    this.provisionedLineNumber = null;
  }

  async navigateToSystem() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifySystemAvailable() {
    await this.page.waitForSelector(this.systemStatusIndicator);
    const status = await this.page.locator(this.systemStatusIndicator).textContent();
    return status.includes('Available') || status.includes('Online');
  }

  async verifyInPool10MBPackageConfigured() {
    await this.page.click(this.mainMenuButton);
    await this.page.click(this.packageConfigMenu);
    await this.page.fill(this.packageQueryInput, 'In Pool 10MB');
    await this.page.click(this.executeQueryButton);
    await this.page.waitForSelector(this.inPoolPackageConfigStatus);
    const configStatus = await this.page.locator(this.inPoolPackageConfigStatus).textContent();
    return configStatus.includes('Configured') || configStatus.includes('Active');
  }

  async verifyGeneralMotorsAccountActive() {
    await this.page.fill(this.accountSearchInput, 'General Motors');
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.accountStatusIndicator);
    const accountStatus = await this.page.locator(this.accountStatusIndicator).textContent();
    return accountStatus.includes('Active');
  }

  async navigateToLineProvisioning() {
    await this.page.click(this.mainMenuButton);
    await this.page.click(this.provisioningMenuOption);
    await this.page.waitForLoadState('networkidle');
  }

  async selectGeneralMotorsAccount() {
    await this.page.fill(this.accountSearchInput, 'General Motors');
    await this.page.waitForSelector(this.generalMotorsAccountOption);
    await this.page.click(this.generalMotorsAccountOption);
  }

  async selectSOLDPlanRatePlan3() {
    await this.page.click(this.planDropdown);
    await this.page.waitForSelector(this.soldPlanOption);
    await this.page.click(this.soldPlanOption);
  }

  async confirmLineProvisioning() {
    await this.page.click(this.confirmProvisioningButton);
    await this.page.waitForSelector(this.provisioningSuccessMessage);
    const successMsg = await this.page.locator(this.provisioningSuccessMessage).textContent();
    const lineMatch = successMsg.match(/Line:\s*(\d+)/);
    if (lineMatch) {
      this.provisionedLineNumber = lineMatch[1];
    }
  }

  async verifyLineProvisionedWithSOLDPlan() {
    const planLabel = await this.page.locator(this.assignedPlanLabel).textContent();
    return planLabel.includes('SOLD') && planLabel.includes('RatePlan 3');
  }

  async navigateToPackageAssignments() {
    await this.page.click(this.mainMenuButton);
    await this.page.click(this.packageAssignmentsMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchProvisionedLine() {
    await this.page.fill(this.lineSearchInput, this.provisionedLineNumber || '');
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.inPool10MBPackageStatus);
  }

  async verifyInPool10MBAutoAssigned() {
    const packageStatus = await this.page.locator(this.inPool10MBPackageStatus).textContent();
    const assignmentType = await this.page.locator(this.packageAssignmentType).textContent();
    return packageStatus.includes('Active') && assignmentType.includes('Automatic');
  }

  async navigateToPackageConfigurationTables() {
    await this.page.click(this.mainMenuButton);
    await this.page.click(this.packageConfigMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async queryInPoolPackageConfiguration() {
    await this.page.fill(this.packageQueryInput, 'In Pool 10MB');
    await this.page.click(this.executeQueryButton);
    await this.page.waitForSelector(this.packageCapacityField);
  }

  async getPackageCapacity() {
    const capacity = await this.page.locator(this.packageCapacityField).textContent();
    return capacity.trim();
  }

  async getPackageRate() {
    const rate = await this.page.locator(this.packageRateField).textContent();
    return rate.replace(/[^\d.]/g, '');
  }

  async getAPNCoverage() {
    const coverage = await this.page.locator(this.apnCoverageField).textContent();
    const apns = coverage.match(/APN\d+/g) || [];
    return apns;
  }

  async getConsumptionType() {
    const consumptionType = await this.page.locator(this.consumptionTypeField).textContent();
    return consumptionType.trim();
  }
}

module.exports = BSCS7Page;