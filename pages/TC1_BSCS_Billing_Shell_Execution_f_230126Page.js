const { expect } = require('@playwright/test');

class BillingShellPage {
  constructor(page) {
    this.page = page;
    
    this.parametricTableSection = '[data-testid="parametric-table-section"]';
    this.tmcodeField = '[data-testid="tmcode-sold-field"]';
    this.sncodeField = '[data-testid="sncode-inpool-field"]';
    this.packageCostField = '[data-testid="package-cost-field"]';
    this.bulkRateField = '[data-testid="bulk-rate-field"]';
    
    this.shellExecutionSection = '[data-testid="shell-execution-section"]';
    this.shellSelector = '[data-testid="shell-selector"]';
    this.executeShellButton = '[data-testid="execute-shell-button"]';
    this.shellStatusIndicator = '[data-testid="shell-status-indicator"]';
    
    this.controlTableSection = '[data-testid="control-table-section"]';
    this.processIdentifierField = '[data-testid="process-identifier-field"]';
    this.processDetailTable = '[data-testid="process-detail-table"]';
    
    this.accountsSection = '[data-testid="gm-accounts-section"]';
    this.accountsCountLabel = '[data-testid="accounts-count-label"]';
    this.soldLinesTable = '[data-testid="sold-lines-table"]';
    this.inPoolStatusIndicator = '[data-testid="inpool-status-indicator"]';
    
    this.trafficSection = '[data-testid="traffic-section"]';
    this.udrTableStatus = '[data-testid="udr-table-status"]';
    this.tempTableStatus = '[data-testid="temp-table-status"]';
    this.zeroCostIndicator = '[data-testid="zero-cost-indicator"]';
    
    this.calculationSection = '[data-testid="calculation-section"]';
    this.apn1TrafficField = '[data-testid="apn1-traffic-field"]';
    this.apn4TrafficField = '[data-testid="apn4-traffic-field"]';
    this.totalConsumedMBField = '[data-testid="total-consumed-mb-field"]';
    this.assignedPoolField = '[data-testid="assigned-pool-field"]';
    this.comparisonResultField = '[data-testid="comparison-result-field"]';
    
    this.occSection = '[data-testid="occ-section"]';
    this.occ1ConceptField = '[data-testid="occ1-concept-field"]';
    this.occ1AmountField = '[data-testid="occ1-amount-field"]';
    this.occ1GlossField = '[data-testid="occ1-gloss-field"]';
    this.occ2ConceptField = '[data-testid="occ2-concept-field"]';
    this.occ2AmountField = '[data-testid="occ2-amount-field"]';
    this.occ2GlossField = '[data-testid="occ2-gloss-field"]';
    this.excessMBField = '[data-testid="excess-mb-field"]';
    
    this.documentAllSection = '[data-testid="document-all-section"]';
    this.documentAllTable = '[data-testid="document-all-table"]';
    this.occ1DocumentRow = '[data-testid="occ1-document-row"]';
    this.occ2DocumentRow = '[data-testid="occ2-document-row"]';
    this.hpExtremeStatusIndicator = '[data-testid="hp-extreme-status"]';
    
    this.concurrencySection = '[data-testid="concurrency-section"]';
    this.izzipayStatusIndicator = '[data-testid="izzipay-status"]';
    this.sequentialControlIndicator = '[data-testid="sequential-control-indicator"]';
    this.workTableConflictIndicator = '[data-testid="work-table-conflict-indicator"]';
    this.activeSoldLinesCountField = '[data-testid="active-sold-lines-count"]';
  }

  async navigateToParametricTableConfig() {
    await this.page.click('[data-testid="menu-configuration"]');
    await this.page.click('[data-testid="submenu-parametric-tables"]');
    await this.page.waitForSelector(this.parametricTableSection);
  }

  async verifyParametricTableLoaded() {
    await expect(this.page.locator(this.parametricTableSection)).toBeVisible();
  }

  async verifyTMCodeConfiguredForSOLD() {
    const tmcode = await this.page.locator(this.tmcodeField).inputValue();
    expect(tmcode).toBeTruthy();
  }

  async verifySNCodeConfiguredForInPool() {
    const sncode = await this.page.locator(this.sncodeField).inputValue();
    expect(sncode).toBeTruthy();
  }

  async verifyPackageCostConfigured(expectedCost) {
    const cost = await this.page.locator(this.packageCostField).inputValue();
    expect(cost).toBe(expectedCost);
  }

  async verifyBulkRateConfigured(expectedRate) {
    const rate = await this.page.locator(this.bulkRateField).inputValue();
    expect(rate).toBe(expectedRate);
  }

  async navigateToShellExecution() {
    await this.page.click('[data-testid="menu-shell-execution"]');
    await this.page.waitForSelector(this.shellExecutionSection);
  }

  async selectShell(shellName) {
    await this.page.selectOption(this.shellSelector, shellName);
  }

  async executeShell() {
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.shellStatusIndicator);
  }

  async waitForShellCompletion() {
    await this.page.waitForSelector('[data-testid="shell-status-complete"]', { timeout: 120000 });
  }

  async getProcessIdentifier() {
    return await this.page.locator(this.processIdentifierField).textContent();
  }

  async verifyProcessIdInControlTable(processId) {
    const tableContent = await this.page.locator(this.controlTableSection).textContent();
    expect(tableContent).toContain(processId);
  }

  async verifyGMAccountsIdentified() {
    await expect(this.page.locator(this.accountsSection)).toBeVisible();
  }

  async getIdentifiedAccountsCount() {
    const countText = await this.page.locator(this.accountsCountLabel).textContent();
    return parseInt(countText, 10);
  }

  async verifySOLDLinesExtracted() {
    await expect(this.page.locator(this.soldLinesTable)).toBeVisible();
  }

  async verifyInPoolPackageAssigned() {
    const status = await this.page.locator(this.inPoolStatusIndicator).textContent();
    expect(status).toContain('Assigned');
  }

  async verifyTrafficCopyInitiated() {
    await expect(this.page.locator(this.trafficSection)).toBeVisible();
  }

  async waitForTrafficCopyCompletion() {
    await this.page.waitForSelector('[data-testid="traffic-copy-complete"]');
  }

  async verifyOriginalRecordsZeroCost() {
    const indicator = await this.page.locator(this.zeroCostIndicator).textContent();
    expect(indicator).toContain('Zero Cost Verified');
  }

  async verifyTrafficSummarized() {
    await expect(this.page.locator(this.calculationSection)).toBeVisible();
  }

  async verifyAPN1TrafficIncluded() {
    const apn1Value = await this.page.locator(this.apn1TrafficField).textContent();
    expect(parseFloat(apn1Value)).toBeGreaterThanOrEqual(0);
  }

  async verifyAPN4TrafficIncluded() {
    const apn4Value = await this.page.locator(this.apn4TrafficField).textContent();
    expect(parseFloat(apn4Value)).toBeGreaterThanOrEqual(0);
  }

  async getTotalConsumedMB() {
    const value = await this.page.locator(this.totalConsumedMBField).textContent();
    return parseFloat(value);
  }

  async getPoolComparisonResult() {
    return await this.page.locator(this.comparisonResultField).textContent();
  }

  async verifyCalculationComplete() {
    await this.page.waitForSelector('[data-testid="calculation-complete-indicator"]');
  }

  async verifyOCC1Generated() {
    await expect(this.page.locator(this.occ1ConceptField)).toBeVisible();
  }

  async getOCC1Concept() {
    return await this.page.locator(this.occ1ConceptField).textContent();
  }

  async getActiveSOLDLinesCount() {
    const count = await this.page.locator(this.activeSoldLinesCountField).textContent();
    return parseInt(count, 10);
  }

  async getOCC1Amount() {
    const amount = await this.page.locator(this.occ1AmountField).textContent();
    return parseFloat(amount.replace('S/.', '').trim());
  }

  async getOCC1Gloss() {
    return await this.page.locator(this.occ1GlossField).textContent();
  }

  async checkConsumptionExceedsPool() {
    const result = await this.page.locator(this.comparisonResultField).textContent();
    return result.includes('Excess') || result.includes('Exceeded');
  }

  async verifyOCC2Generated() {
    await expect(this.page.locator(this.occ2ConceptField)).toBeVisible();
  }

  async getOCC2Concept() {
    return await this.page.locator(this.occ2ConceptField).textContent();
  }

  async getExcessMB() {
    const value = await this.page.locator(this.excessMBField).textContent();
    return parseFloat(value);
  }

  async getOCC2Amount() {
    const amount = await this.page.locator(this.occ2AmountField).textContent();
    return parseFloat(amount.replace('S/.', '').trim());
  }

  async getOCC2Gloss() {
    return await this.page.locator(this.occ2GlossField).textContent();
  }

  async verifyOCCGenerationComplete() {
    await this.page.waitForSelector('[data-testid="occ-generation-complete"]');
  }

  async navigateToDocumentAllTable() {
    await this.page.click('[data-testid="menu-document-all"]');
    await this.page.waitForSelector(this.documentAllSection);
  }

  async verifyOCC1InDocumentAll() {
    await expect(this.page.locator(this.occ1DocumentRow)).toBeVisible();
  }

  async verifyOCC2InDocumentAll() {
    await expect(this.page.locator(this.occ2DocumentRow)).toBeVisible();
  }

  async verifyOCCsAvailableForHPExtreme() {
    const status = await this.page.locator(this.hpExtremeStatusIndicator).textContent();
    expect(status).toContain('Available');
  }

  async checkIZZIPAYShellStatus() {
    const status = await this.page.locator(this.izzipayStatusIndicator).textContent();
    return status.includes('Running');
  }

  async verifySequentialExecutionControl() {
    const indicator = await this.page.locator(this.sequentialControlIndicator).textContent();
    expect(indicator).toContain('Sequential');
  }

  async checkWorkTableConflicts() {
    const indicator = await this.page.locator(this.workTableConflictIndicator).textContent();
    return indicator.includes('Conflict');
  }
}

module.exports = BillingShellPage;