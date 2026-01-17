const { expect } = require('@playwright/test');

class InPoolCalculationPage {
  constructor(page) {
    this.page = page;
    
    // System navigation locators
    this.systemStatusIndicator = '[data-testid="system-status-indicator"]';
    this.parametricTablesSection = '[data-testid="parametric-tables-section"]';
    this.bscs7SystemPanel = '[data-testid="bscs7-system-panel"]';
    
    // Line configuration locators
    this.lineConfigurationMenu = '[data-testid="line-configuration-menu"]';
    this.activeLinesTable = '[data-testid="active-lines-table"]';
    this.soldPlanFilter = '[data-testid="sold-plan-filter"]';
    this.ratePlanColumn = '[data-testid="rate-plan-column"]';
    this.lineCountDisplay = '[data-testid="line-count-display"]';
    
    // Shell execution locators
    this.shellExecutionPanel = '[data-testid="shell-execution-panel"]';
    this.inPoolShellButton = '[data-testid="in-pool-shell-execute-btn"]';
    this.shellStatusIndicator = '[data-testid="shell-status-indicator"]';
    this.shellProgressBar = '[data-testid="shell-progress-bar"]';
    
    // Results and calculation locators
    this.identifiedLinesCount = '[data-testid="identified-lines-count"]';
    this.calculatedBagValue = '[data-testid="calculated-bag-value"]';
    this.bagCalculationDetails = '[data-testid="bag-calculation-details"]';
    
    // OCC consultation locators
    this.occConsultationMenu = '[data-testid="occ-consultation-menu"]';
    this.occTableResults = '[data-testid="occ-table-results"]';
    this.occInPoolServiceRow = '[data-testid="occ-in-pool-service-row"]';
    this.occValueCell = '[data-testid="occ-value-cell"]';
    this.occConceptCell = '[data-testid="occ-concept-cell"]';
    
    // Rate and tariff locators
    this.appliedRateDisplay = '[data-testid="applied-rate-display"]';
    this.totalAmountDisplay = '[data-testid="total-amount-display"]';
    this.rateCalculationSummary = '[data-testid="rate-calculation-summary"]';
    this.tariffDetailsSection = '[data-testid="tariff-details-section"]';
  }

  async navigateToSystem() {
    await this.page.locator(this.bscs7SystemPanel).waitFor({ state: 'visible' });
  }

  async verifySystemOperational() {
    const statusIndicator = this.page.locator(this.systemStatusIndicator);
    await expect(statusIndicator).toBeVisible();
    const statusText = await statusIndicator.textContent();
    expect(statusText).toContain('Operational');
  }

  async verifyParametricTablesConfigured() {
    const tablesSection = this.page.locator(this.parametricTablesSection);
    await expect(tablesSection).toBeVisible();
  }

  async navigateToLineConfiguration() {
    await this.page.locator(this.lineConfigurationMenu).click();
    await this.page.locator(this.activeLinesTable).waitFor({ state: 'visible' });
  }

  async verifyActiveLinesInSOLDPlan(expectedCount) {
    await this.page.locator(this.soldPlanFilter).click();
    const lineCount = await this.page.locator(this.lineCountDisplay).textContent();
    expect(parseInt(lineCount)).toBe(expectedCount);
  }

  async verifyRatePlanAssignment(ratePlan) {
    const ratePlanText = await this.page.locator(this.ratePlanColumn).first().textContent();
    expect(ratePlanText).toContain(ratePlan);
  }

  async navigateToShellExecution() {
    await this.page.locator(this.shellExecutionPanel).click();
  }

  async executeInPoolCalculationShell() {
    await this.page.locator(this.inPoolShellButton).click();
  }

  async waitForShellCompletion() {
    await this.page.locator(this.shellStatusIndicator).waitFor({ state: 'visible' });
    await expect(this.page.locator(this.shellStatusIndicator)).toContainText('Completed');
  }

  async getIdentifiedLinesCount() {
    const countText = await this.page.locator(this.identifiedLinesCount).textContent();
    return parseInt(countText);
  }

  async verifyLinesInSOLDPlan() {
    const soldPlanIndicator = this.page.locator(this.soldPlanFilter);
    await expect(soldPlanIndicator).toBeVisible();
  }

  async getCalculatedInPoolBag() {
    const bagText = await this.page.locator(this.calculatedBagValue).textContent();
    return parseInt(bagText.replace(/[^0-9]/g, ''));
  }

  async verifyBagCalculationFormula(lines, mbPerLine) {
    const details = await this.page.locator(this.bagCalculationDetails).textContent();
    expect(details).toContain(`${lines}`);
    expect(details).toContain(`${mbPerLine}`);
  }

  async navigateToOCCConsultation() {
    await this.page.locator(this.occConsultationMenu).click();
    await this.page.locator(this.occTableResults).waitFor({ state: 'visible' });
  }

  async getOCCValueForInPoolService() {
    const valueText = await this.page.locator(this.occInPoolServiceRow).locator(this.occValueCell).textContent();
    return parseFloat(valueText.replace(/[^0-9.]/g, ''));
  }

  async verifyOCCConceptIsInPoolService() {
    const conceptText = await this.page.locator(this.occInPoolServiceRow).locator(this.occConceptCell).textContent();
    expect(conceptText).toContain('Servicio In Pool');
  }

  async getAppliedRatePerPackage() {
    const rateText = await this.page.locator(this.appliedRateDisplay).textContent();
    return parseFloat(rateText.replace(/[^0-9.]/g, ''));
  }

  async getTotalAmountForLines() {
    const totalText = await this.page.locator(this.totalAmountDisplay).textContent();
    return parseFloat(totalText.replace(/[^0-9.]/g, ''));
  }

  async verifyRateCalculation(lines, ratePerPackage, expectedTotal) {
    const summary = await this.page.locator(this.rateCalculationSummary).textContent();
    expect(summary).toContain(`${lines}`);
    expect(summary).toContain(`${ratePerPackage}`);
    expect(summary).toContain(`${expectedTotal}`);
  }
}

module.exports = InPoolCalculationPage;