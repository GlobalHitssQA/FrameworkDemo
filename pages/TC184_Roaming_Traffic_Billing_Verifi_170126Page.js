class RoamingBillingPage {
  constructor(page) {
    this.page = page;
    
    this.lineConfigurationMenu = '[data-testid="line-configuration-menu"]';
    this.soldPlanIndicator = '[data-testid="sold-plan-indicator"]';
    this.inPoolPackageStatus = '[data-testid="in-pool-package-status"]';
    this.inPoolAvailableIndicator = '[data-testid="in-pool-available"]';
    
    this.trafficGenerationMenu = '[data-testid="traffic-generation-menu"]';
    this.apnTypeSelector = '[data-testid="apn-type-selector"]';
    this.roamingModeCheckbox = '[data-testid="roaming-mode-checkbox"]';
    this.generateTrafficButton = '[data-testid="generate-traffic-btn"]';
    
    this.shellExecutionMenu = '[data-testid="shell-execution-menu"]';
    this.inPoolShellButton = '[data-testid="in-pool-calculation-shell-btn"]';
    this.shellStatusIndicator = '[data-testid="shell-status-indicator"]';
    this.shellResultsPanel = '[data-testid="shell-results-panel"]';
    this.roamingExclusionFlag = '[data-testid="roaming-exclusion-flag"]';
    
    this.billingProcessMenu = '[data-testid="billing-process-menu"]';
    this.executeBillingButton = '[data-testid="execute-billing-btn"]';
    this.billingStatusIndicator = '[data-testid="billing-status-indicator"]';
    this.billingDetailsPanel = '[data-testid="billing-details-panel"]';
    this.roamingChargeRateField = '[data-testid="roaming-charge-rate"]';
    this.inPoolDiscountIndicator = '[data-testid="in-pool-discount-indicator"]';
    
    this.udrTableMenu = '[data-testid="udr-table-menu"]';
    this.udrLt01Table = '[data-testid="udr-lt-01-table"]';
    this.roamingTrafficRow = '[data-testid="roaming-traffic-row"]';
    this.inPoolAppliedColumn = '[data-testid="in-pool-applied-column"]';
    
    this.invoiceMenu = '[data-testid="invoice-menu"]';
    this.soldInPoolSection = '[data-testid="sold-in-pool-traffic-detail-section"]';
    this.bulkRateSection = '[data-testid="servicios-in-pool-granel-section"]';
    this.roamingTrafficEntry = '[data-testid="roaming-traffic-entry"]';
    this.billingSectionLabel = '[data-testid="billing-section-label"]';
  }

  async navigateToLineConfiguration() {
    await this.page.click(this.lineConfigurationMenu);
    await this.page.waitForSelector(this.soldPlanIndicator);
  }

  async verifyLinesInSoldPlan() {
    const planIndicator = await this.page.locator(this.soldPlanIndicator);
    const planText = await planIndicator.textContent();
    return planText.includes('SOLD');
  }

  async verifyInPoolPackageAssigned() {
    const packageStatus = await this.page.locator(this.inPoolPackageStatus);
    return await packageStatus.isVisible();
  }

  async isInPoolPackageAvailable() {
    const availableIndicator = await this.page.locator(this.inPoolAvailableIndicator);
    return await availableIndicator.isVisible();
  }

  async navigateToTrafficGeneration() {
    await this.page.click(this.trafficGenerationMenu);
    await this.page.waitForSelector(this.apnTypeSelector);
  }

  async selectAPNType(apnType) {
    await this.page.click(this.apnTypeSelector);
    await this.page.click(`[data-testid="apn-option-${apnType.toLowerCase()}"]`);
  }

  async generateRoamingTraffic() {
    await this.page.check(this.roamingModeCheckbox);
    await this.page.click(this.generateTrafficButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToShellExecution() {
    await this.page.click(this.shellExecutionMenu);
    await this.page.waitForSelector(this.inPoolShellButton);
  }

  async executeInPoolCalculationShell() {
    await this.page.click(this.inPoolShellButton);
  }

  async waitForShellProcessCompletion() {
    await this.page.waitForSelector(`${this.shellStatusIndicator}:has-text("Completed")`, { timeout: 60000 });
  }

  async navigateToShellResults() {
    await this.page.click(this.shellResultsPanel);
  }

  async verifyRoamingExcludedFromInPool() {
    const exclusionFlag = await this.page.locator(this.roamingExclusionFlag);
    const flagText = await exclusionFlag.textContent();
    return flagText.includes('Excluded');
  }

  async navigateToBillingProcess() {
    await this.page.click(this.billingProcessMenu);
    await this.page.waitForSelector(this.executeBillingButton);
  }

  async executeBillingProcess() {
    await this.page.click(this.executeBillingButton);
  }

  async waitForBillingCompletion() {
    await this.page.waitForSelector(`${this.billingStatusIndicator}:has-text("Completed")`, { timeout: 120000 });
  }

  async navigateToBillingDetails() {
    await this.page.click(this.billingDetailsPanel);
    await this.page.waitForSelector(this.roamingChargeRateField);
  }

  async getRoamingChargeRate() {
    const rateField = await this.page.locator(this.roamingChargeRateField);
    return await rateField.textContent();
  }

  async hasInPoolDiscountApplied() {
    const discountIndicator = await this.page.locator(this.inPoolDiscountIndicator);
    const discountText = await discountIndicator.textContent();
    return discountText !== 'None' && discountText !== '0';
  }

  async navigateToUDRTable() {
    await this.page.click(this.udrTableMenu);
    await this.page.waitForSelector(this.udrLt01Table);
  }

  async verifyRoamingTrafficInUDR() {
    const roamingRow = await this.page.locator(this.roamingTrafficRow);
    return await roamingRow.isVisible();
  }

  async isInPoolAppliedToRoaming() {
    const inPoolColumn = await this.page.locator(`${this.roamingTrafficRow} ${this.inPoolAppliedColumn}`);
    const columnText = await inPoolColumn.textContent();
    return columnText === 'Yes' || columnText === 'true';
  }

  async navigateToInvoice() {
    await this.page.click(this.invoiceMenu);
    await this.page.waitForSelector(this.soldInPoolSection);
  }

  async isRoamingInSoldInPoolSection() {
    const inPoolSection = await this.page.locator(this.soldInPoolSection);
    const sectionContent = await inPoolSection.textContent();
    return sectionContent.includes('Roaming');
  }

  async isRoamingInBulkRateSection() {
    const bulkSection = await this.page.locator(this.bulkRateSection);
    const roamingEntry = await bulkSection.locator(this.roamingTrafficEntry);
    return await roamingEntry.isVisible();
  }

  async getRoamingBillingDetails() {
    const sectionLabel = await this.page.locator(`${this.bulkRateSection} ${this.billingSectionLabel}`);
    const section = await sectionLabel.textContent();
    return { section: section.trim() };
  }
}

module.exports = RoamingBillingPage;