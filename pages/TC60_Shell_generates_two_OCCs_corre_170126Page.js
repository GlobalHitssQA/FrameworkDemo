const { expect } = require('@playwright/test');

class BillingProcessPage {
  constructor(page) {
    this.page = page;
    
    this.billingSystemUrl = '/bscs7/billing';
    
    this.activeLinesTable = '[data-testid="active-lines-table"]';
    this.planTypeColumn = '[data-testid="plan-type-column"]';
    this.poolSizeField = '[data-testid="pool-size-field"]';
    this.consumptionConfigSection = '[data-testid="consumption-config-section"]';
    this.totalConsumptionInput = '[data-testid="total-consumption-input"]';
    this.excessConsumptionDisplay = '[data-testid="excess-consumption-display"]';
    this.shellExecuteButton = '[data-testid="shell-execute-button"]';
    this.shellProcessDropdown = '[data-testid="shell-process-dropdown"]';
    this.occResultsContainer = '[data-testid="occ-results-container"]';
    this.occCountDisplay = '[data-testid="occ-count-display"]';
    this.documentAllTableLink = '[data-testid="document-all-table-link"]';
    this.documentAllTable = '[data-testid="document-all-table"]';
    this.occConceptColumn = '[data-testid="occ-concept-column"]';
    this.occAmountColumn = '[data-testid="occ-amount-column"]';
    this.occCustomerIdColumn = '[data-testid="occ-customer-id-column"]';
    this.occStatusColumn = '[data-testid="occ-status-column"]';
    this.shellLogsLink = '[data-testid="shell-logs-link"]';
    this.shellLogContainer = '[data-testid="shell-log-container"]';
    this.logEntryRow = '[data-testid="log-entry-row"]';
    this.totalBilledDisplay = '[data-testid="total-billed-display"]';
    this.inPoolServiceRow = '[data-testid="occ-row-servicio-in-pool"]';
    this.inPoolBulkServiceRow = '[data-testid="occ-row-servicio-in-pool-granel"]';
    this.preBillingStatusBadge = '[data-testid="pre-billing-status-badge"]';
    this.parametricRatesTable = '[data-testid="parametric-rates-table"]';
  }

  async navigateToBillingSystem() {
    await this.page.goto(this.billingSystemUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveLinesInPlan(lineCount, planType, poolMB) {
    await this.page.waitForSelector(this.activeLinesTable);
    const lines = await this.page.locator(this.activeLinesTable).locator('tr').count();
    expect(lines - 1).toBe(lineCount);
    
    const planText = await this.page.locator(this.planTypeColumn).first().textContent();
    expect(planText).toContain(planType);
    
    const poolSize = await this.page.locator(this.poolSizeField).textContent();
    expect(poolSize).toContain(poolMB.toString());
  }

  async configureConsumptionScenario(totalConsumption, excessMB) {
    await this.page.click(this.consumptionConfigSection);
    await this.page.fill(this.totalConsumptionInput, totalConsumption.toString());
    await this.page.waitForSelector(this.excessConsumptionDisplay);
    const excessText = await this.page.locator(this.excessConsumptionDisplay).textContent();
    expect(excessText).toContain(excessMB.toString());
  }

  async executeShellProcess(shellName) {
    await this.page.click(this.shellProcessDropdown);
    await this.page.click(`[data-testid="shell-option-${shellName}"]`);
    await this.page.click(this.shellExecuteButton);
    await this.page.waitForSelector(this.occResultsContainer, { timeout: 60000 });
  }

  async getGeneratedOCCCount() {
    const countText = await this.page.locator(this.occCountDisplay).textContent();
    return parseInt(countText, 10);
  }

  async navigateToDocumentAllTable() {
    await this.page.click(this.documentAllTableLink);
    await this.page.waitForSelector(this.documentAllTable);
  }

  async getOCCAmountByConcept(concept) {
    const rows = this.page.locator(`${this.documentAllTable} tr`);
    const rowCount = await rows.count();
    
    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const conceptText = await row.locator(this.occConceptColumn).textContent();
      
      if (conceptText && conceptText.includes(concept)) {
        const amountText = await row.locator(this.occAmountColumn).textContent();
        return parseFloat(amountText.replace(/[^0-9.]/g, ''));
      }
    }
    return null;
  }

  async verifyCustomerIdForBothOCCs() {
    const inPoolCustomerId = await this.page.locator(this.inPoolServiceRow).locator(this.occCustomerIdColumn).textContent();
    const bulkCustomerId = await this.page.locator(this.inPoolBulkServiceRow).locator(this.occCustomerIdColumn).textContent();
    
    return inPoolCustomerId && bulkCustomerId && inPoolCustomerId === bulkCustomerId ? inPoolCustomerId : null;
  }

  async verifyDifferentiatedConcepts() {
    const inPoolConcept = await this.page.locator(this.inPoolServiceRow).locator(this.occConceptColumn).textContent();
    const bulkConcept = await this.page.locator(this.inPoolBulkServiceRow).locator(this.occConceptColumn).textContent();
    
    return inPoolConcept !== bulkConcept && 
           inPoolConcept.includes('Servicio In Pool') && 
           bulkConcept.includes('Servicio In Pool Granel');
  }

  async verifyParametricRatesApplied(packageRate, excessRate) {
    await this.page.click(this.parametricRatesTable);
    const ratesContent = await this.page.locator(this.parametricRatesTable).textContent();
    
    return ratesContent.includes(packageRate.toString()) && 
           ratesContent.includes(excessRate.toString());
  }

  async verifyPreBillingStatus() {
    const inPoolStatus = await this.page.locator(this.inPoolServiceRow).locator(this.preBillingStatusBadge).textContent();
    const bulkStatus = await this.page.locator(this.inPoolBulkServiceRow).locator(this.preBillingStatusBadge).textContent();
    
    return inPoolStatus.toLowerCase().includes('disponible') && 
           bulkStatus.toLowerCase().includes('disponible');
  }

  async navigateToShellLogs() {
    await this.page.click(this.shellLogsLink);
    await this.page.waitForSelector(this.shellLogContainer);
  }

  async getLogEntryForOCC(occType) {
    const logEntries = this.page.locator(this.logEntryRow);
    const count = await logEntries.count();
    
    for (let i = 0; i < count; i++) {
      const entryText = await logEntries.nth(i).textContent();
      if (entryText.includes(occType)) {
        return entryText;
      }
    }
    return '';
  }

  async getTotalBilledFromLog() {
    const totalText = await this.page.locator(this.totalBilledDisplay).textContent();
    return parseFloat(totalText.replace(/[^0-9.]/g, ''));
  }
}

module.exports = BillingProcessPage;