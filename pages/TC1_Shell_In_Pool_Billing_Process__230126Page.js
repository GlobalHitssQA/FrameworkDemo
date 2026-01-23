class ShellBillingPage {
  constructor(page) {
    this.page = page;
    
    this.parametricTableSection = '[data-testid="parametric-table-section"]';
    this.tmcodeInput = '[data-testid="tmcode-input"]';
    this.sncodeInput = '[data-testid="sncode-input"]';
    this.packageCostInput = '[data-testid="package-cost-input"]';
    this.bulkRateInput = '[data-testid="bulk-rate-input"]';
    this.saveConfigButton = '[data-testid="save-config-button"]';
    this.configSuccessMessage = '[data-testid="config-success-message"]';
    
    this.shellExecutionSection = '[data-testid="shell-execution-section"]';
    this.executeProcesoFacturaButton = '[data-testid="execute-proceso-factura-gm-button"]';
    this.executeCalculaFacturaButton = '[data-testid="execute-calcula-factura-gm-button"]';
    this.processIdentifierDisplay = '[data-testid="process-identifier-display"]';
    this.executionStatusIndicator = '[data-testid="execution-status-indicator"]';
    
    this.controlTableSection = '[data-testid="control-table-section"]';
    this.processControlTable = '[data-testid="process-control-table"]';
    this.processRowByIdPrefix = '[data-testid="process-row-"]';
    
    this.gmAccountsSection = '[data-testid="gm-accounts-section"]';
    this.accountsListTable = '[data-testid="accounts-list-table"]';
    this.accountRow = '[data-testid="account-row"]';
    this.planColumnValue = '[data-testid="plan-column-value"]';
    
    this.trafficSection = '[data-testid="traffic-section"]';
    this.udrTable = '[data-testid="udr-lt-01-table"]';
    this.tempWorkTable = '[data-testid="temp-work-table"]';
    this.trafficCostColumn = '[data-testid="traffic-cost-column"]';
    
    this.calculationSection = '[data-testid="calculation-section"]';
    this.totalMBConsumedDisplay = '[data-testid="total-mb-consumed"]';
    this.assignedPoolDisplay = '[data-testid="assigned-pool-mb"]';
    this.activeLinesCountDisplay = '[data-testid="active-lines-count"]';
    this.excessMBDisplay = '[data-testid="excess-mb-display"]';
    
    this.occSection = '[data-testid="occ-section"]';
    this.occ1ServiceInPool = '[data-testid="occ1-service-in-pool"]';
    this.occ2BulkInPoolService = '[data-testid="occ2-bulk-in-pool-service"]';
    this.occConceptField = '[data-testid="occ-concept"]';
    this.occAmountField = '[data-testid="occ-amount"]';
    this.occGlossField = '[data-testid="occ-gloss"]';
    
    this.documentAllSection = '[data-testid="document-all-section"]';
    this.documentAllTable = '[data-testid="document-all-table"]';
    this.billingAvailabilityStatus = '[data-testid="billing-availability-status"]';
    
    this.concurrencySection = '[data-testid="concurrency-section"]';
    this.izzipayExecutionStatus = '[data-testid="izzipay-execution-status"]';
    this.sequentialExecutionIndicator = '[data-testid="sequential-execution-indicator"]';
  }

  async navigateToParametricTableConfig() {
    await this.page.click(this.parametricTableSection);
    await this.page.waitForSelector(this.tmcodeInput);
  }

  async configureParametricTable(tmcode, sncode, packageCost, bulkRate) {
    await this.page.fill(this.tmcodeInput, tmcode);
    await this.page.fill(this.sncodeInput, sncode);
    await this.page.fill(this.packageCostInput, packageCost.toString());
    await this.page.fill(this.bulkRateInput, bulkRate.toString());
    await this.page.click(this.saveConfigButton);
  }

  async verifyParametricTableConfiguration() {
    await this.page.waitForSelector(this.configSuccessMessage);
    return await this.page.isVisible(this.configSuccessMessage);
  }

  async navigateToShellExecution() {
    await this.page.click(this.shellExecutionSection);
    await this.page.waitForSelector(this.executeProcesoFacturaButton);
  }

  async executeShellProcesoFacturaGM() {
    await this.page.click(this.executeProcesoFacturaButton);
    await this.page.waitForSelector(this.executionStatusIndicator);
  }

  async getProcessIdentifier() {
    await this.page.waitForSelector(this.processIdentifierDisplay);
    return await this.page.textContent(this.processIdentifierDisplay);
  }

  async verifyProcessInControlTable(processId) {
    const processRowSelector = `${this.processRowByIdPrefix}${processId}]`;
    return await this.page.isVisible(processRowSelector);
  }

  async getIdentifiedGMAccounts() {
    await this.page.waitForSelector(this.accountsListTable);
    const rows = await this.page.$$(this.accountRow);
    return rows;
  }

  async verifyAccountsHaveSOLDPlan(accounts) {
    for (const account of accounts) {
      const planValue = await account.$eval(this.planColumnValue, el => el.textContent);
      if (planValue !== 'SOLD') {
        return false;
      }
    }
    return true;
  }

  async executeTelemetryTrafficCopy() {
    await this.page.waitForSelector(this.trafficSection);
  }

  async verifyTrafficCopiedToTempTable() {
    await this.page.waitForSelector(this.tempWorkTable);
    const rows = await this.page.$$(`${this.tempWorkTable} tr`);
    return rows.length > 1;
  }

  async verifyUDRRecordsHaveZeroCost() {
    const costElements = await this.page.$$(this.trafficCostColumn);
    for (const element of costElements) {
      const cost = await element.textContent();
      if (parseFloat(cost) !== 0) {
        return false;
      }
    }
    return true;
  }

  async executeShellCalculaFacturaGM() {
    await this.page.click(this.executeCalculaFacturaButton);
    await this.page.waitForSelector(this.calculationSection);
  }

  async getTotalMBCalculation() {
    const totalConsumed = parseFloat(await this.page.textContent(this.totalMBConsumedDisplay));
    const assignedPool = parseFloat(await this.page.textContent(this.assignedPoolDisplay));
    const activeLines = parseInt(await this.page.textContent(this.activeLinesCountDisplay));
    return { totalConsumed, assignedPool, activeLines };
  }

  async getActiveSOLDLinesCount() {
    return parseInt(await this.page.textContent(this.activeLinesCountDisplay));
  }

  async getOCC1ServiceInPool() {
    await this.page.waitForSelector(this.occ1ServiceInPool);
    const concept = await this.page.$eval(`${this.occ1ServiceInPool} ${this.occConceptField}`, el => el.textContent);
    const amount = parseFloat(await this.page.$eval(`${this.occ1ServiceInPool} ${this.occAmountField}`, el => el.textContent));
    const gloss = await this.page.$eval(`${this.occ1ServiceInPool} ${this.occGlossField}`, el => el.textContent);
    return { concept, amount, gloss };
  }

  async getOCC2BulkInPoolService() {
    const isVisible = await this.page.isVisible(this.occ2BulkInPoolService);
    if (!isVisible) {
      return null;
    }
    const concept = await this.page.$eval(`${this.occ2BulkInPoolService} ${this.occConceptField}`, el => el.textContent);
    const amount = parseFloat(await this.page.$eval(`${this.occ2BulkInPoolService} ${this.occAmountField}`, el => el.textContent));
    const gloss = await this.page.$eval(`${this.occ2BulkInPoolService} ${this.occGlossField}`, el => el.textContent);
    return { concept, amount, gloss };
  }

  async verifyOCCsInDocumentAll() {
    await this.page.waitForSelector(this.documentAllTable);
    const occ1Registered = await this.page.isVisible(`${this.documentAllTable} [data-testid="occ1-row"]`);
    return occ1Registered;
  }

  async verifyOCCsAvailableForBilling() {
    const status = await this.page.textContent(this.billingAvailabilityStatus);
    return status === 'Available';
  }

  async verifySequentialExecutionWithIZZIPAY() {
    const izzipayStatus = await this.page.textContent(this.izzipayExecutionStatus);
    const sequentialIndicator = await this.page.textContent(this.sequentialExecutionIndicator);
    return izzipayStatus !== 'Running' || sequentialIndicator === 'Sequential';
  }
}

module.exports = ShellBillingPage;