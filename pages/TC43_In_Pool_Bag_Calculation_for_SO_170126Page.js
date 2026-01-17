class BillingCalculationPage {
  constructor(page) {
    this.page = page;
    
    // System navigation locators
    this.systemStatusIndicator = '[data-testid="system-status-indicator"]';
    this.menuBilling = '[data-testid="menu-billing"]';
    this.menuConfiguration = '[data-testid="menu-configuration"]';
    
    // Parametric table locators
    this.parametricTableLink = '[data-testid="link-parametric-table"]';
    this.tableInPoolRates = '[data-testid="table-inpool-rates"]';
    this.rateConfigStatus = '[data-testid="rate-config-status"]';
    
    // Line configuration locators
    this.lineConfigSection = '[data-testid="section-line-configuration"]';
    this.inputLineCount = '[data-testid="input-line-count"]';
    this.selectPlanType = '[data-testid="select-plan-type"]';
    this.selectRatePlan = '[data-testid="select-rate-plan"]';
    this.btnConfigureLines = '[data-testid="btn-configure-lines"]';
    this.registeredLinesCount = '[data-testid="registered-lines-count"]';
    
    // Shell execution locators
    this.shellExecutionSection = '[data-testid="section-shell-execution"]';
    this.btnExecuteShell = '[data-testid="btn-execute-shell"]';
    this.shellExecutionLog = '[data-testid="shell-execution-log"]';
    this.identifiedLinesResult = '[data-testid="identified-lines-result"]';
    this.calculatedBagResult = '[data-testid="calculated-bag-result"]';
    
    // OCC query locators
    this.occQuerySection = '[data-testid="section-occ-query"]';
    this.inputServiceConcept = '[data-testid="input-service-concept"]';
    this.btnQueryOCC = '[data-testid="btn-query-occ"]';
    this.occResultsTable = '[data-testid="table-occ-results"]';
    this.occValueWithoutIGV = '[data-testid="occ-value-without-igv"]';
    this.appliedRatePerPackage = '[data-testid="applied-rate-per-package"]';
    this.totalAmountWithoutIGV = '[data-testid="total-amount-without-igv"]';
  }

  async navigateToSystem() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async verifySystemOperational() {
    await this.page.waitForSelector(this.systemStatusIndicator);
    const status = await this.page.locator(this.systemStatusIndicator).textContent();
    return status.includes('Operational');
  }

  async navigateToParametricTable() {
    await this.page.click(this.menuConfiguration);
    await this.page.click(this.parametricTableLink);
    await this.page.waitForSelector(this.tableInPoolRates);
  }

  async verifyInPoolRatesConfigured() {
    const configStatus = await this.page.locator(this.rateConfigStatus).textContent();
    return configStatus.includes('Configured');
  }

  async navigateToLineConfiguration() {
    await this.page.click(this.menuBilling);
    await this.page.waitForSelector(this.lineConfigSection);
  }

  async configureActiveLines(lineCount, planType, ratePlan) {
    await this.page.fill(this.inputLineCount, lineCount.toString());
    await this.page.selectOption(this.selectPlanType, planType);
    await this.page.selectOption(this.selectRatePlan, ratePlan.toString());
    await this.page.click(this.btnConfigureLines);
    await this.page.waitForLoadState('networkidle');
  }

  async getRegisteredLinesCount(planType) {
    await this.page.waitForSelector(this.registeredLinesCount);
    const countText = await this.page.locator(this.registeredLinesCount).textContent();
    return parseInt(countText, 10);
  }

  async navigateToShellExecution() {
    await this.page.waitForSelector(this.shellExecutionSection);
  }

  async executeInPoolCalculationShell() {
    await this.page.click(this.btnExecuteShell);
    await this.page.waitForSelector(this.shellExecutionLog);
    await this.page.waitForLoadState('networkidle');
  }

  async getIdentifiedLinesFromShell() {
    await this.page.waitForSelector(this.identifiedLinesResult);
    const linesText = await this.page.locator(this.identifiedLinesResult).textContent();
    return parseInt(linesText, 10);
  }

  async getCalculatedInPoolBag() {
    await this.page.waitForSelector(this.calculatedBagResult);
    const bagText = await this.page.locator(this.calculatedBagResult).textContent();
    return parseInt(bagText, 10);
  }

  async navigateToOCCQuery() {
    await this.page.waitForSelector(this.occQuerySection);
  }

  async queryOCCsByServiceConcept(concept) {
    await this.page.fill(this.inputServiceConcept, concept);
    await this.page.click(this.btnQueryOCC);
    await this.page.waitForSelector(this.occResultsTable);
  }

  async getOCCValueWithoutIGV() {
    await this.page.waitForSelector(this.occValueWithoutIGV);
    const valueText = await this.page.locator(this.occValueWithoutIGV).textContent();
    return parseFloat(valueText.replace(/[^0-9.]/g, ''));
  }

  async getAppliedRatePerPackage() {
    await this.page.waitForSelector(this.appliedRatePerPackage);
    const rateText = await this.page.locator(this.appliedRatePerPackage).textContent();
    return parseFloat(rateText.replace(/[^0-9.]/g, ''));
  }

  async getTotalAmountWithoutIGV() {
    await this.page.waitForSelector(this.totalAmountWithoutIGV);
    const totalText = await this.page.locator(this.totalAmountWithoutIGV).textContent();
    return parseFloat(totalText.replace(/[^0-9.]/g, ''));
  }
}

module.exports = BillingCalculationPage;