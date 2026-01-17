class BillingPage {
  constructor(page) {
    this.page = page;
    this.shellProcessInput = '[data-testid="shell-process-input"]';
    this.executeShellButton = '[data-testid="execute-shell-button"]';
    this.processStatusIndicator = '[data-testid="process-status-indicator"]';
    this.documentAllTable = '[data-testid="document-all-table"]';
    this.occRecordsContainer = '[data-testid="occ-records-container"]';
    this.inPoolServiceRow = '[data-testid="occ-row-in-pool-service"]';
    this.inPoolBulkServiceRow = '[data-testid="occ-row-in-pool-bulk-service"]';
    this.occAmountCell = '[data-testid="occ-amount-cell"]';
    this.occConceptCell = '[data-testid="occ-concept-cell"]';
    this.occCustomerIdCell = '[data-testid="occ-customer-id-cell"]';
    this.occCycleDateCell = '[data-testid="occ-cycle-date-cell"]';
    this.occPreBillingStatusCell = '[data-testid="occ-pre-billing-status-cell"]';
    this.occGlossCell = '[data-testid="occ-gloss-cell"]';
    this.occHPExtremeStatusCell = '[data-testid="occ-hp-extreme-status-cell"]';
    this.soldPlanConfigSection = '[data-testid="sold-plan-config-section"]';
    this.lineCountInput = '[data-testid="line-count-input"]';
    this.poolSizeInput = '[data-testid="pool-size-input"]';
    this.consumptionInput = '[data-testid="consumption-input"]';
    this.activeLineCountDisplay = '[data-testid="active-line-count-display"]';
    this.currentConsumptionDisplay = '[data-testid="current-consumption-display"]';
    this.queryOCCButton = '[data-testid="query-occ-button"]';
    this.saveConfigButton = '[data-testid="save-config-button"]';
  }

  async navigateToBillingSystem() {
    await this.page.goto('/billing/bscs7');
    await this.page.waitForLoadState('networkidle');
  }

  async configureSOLDPlanLines(lineCount, poolSize) {
    await this.page.click(this.soldPlanConfigSection);
    await this.page.fill(this.lineCountInput, lineCount.toString());
    await this.page.fill(this.poolSizeInput, poolSize.toString());
    await this.page.click(this.saveConfigButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getActiveLineCount() {
    const text = await this.page.textContent(this.activeLineCountDisplay);
    return parseInt(text, 10);
  }

  async setTelemetryConsumption(consumption) {
    await this.page.fill(this.consumptionInput, consumption.toString());
    await this.page.click(this.saveConfigButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentConsumption() {
    const text = await this.page.textContent(this.currentConsumptionDisplay);
    return parseInt(text, 10);
  }

  async executeShellProcess(shellName) {
    await this.page.fill(this.shellProcessInput, shellName);
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.processStatusIndicator, { state: 'visible' });
    await this.page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        return element && (element.textContent.includes('SUCCESS') || element.textContent.includes('FAILED'));
      },
      this.processStatusIndicator,
      { timeout: 60000 }
    );
  }

  async getShellProcessStatus() {
    return await this.page.textContent(this.processStatusIndicator);
  }

  async navigateToDocumentAllTable() {
    await this.page.click(this.documentAllTable);
    await this.page.waitForLoadState('networkidle');
  }

  async queryOCCRecords() {
    await this.page.click(this.queryOCCButton);
    await this.page.waitForSelector(this.occRecordsContainer, { state: 'visible' });
  }

  async getInPoolServiceOCC() {
    const row = await this.page.$(this.inPoolServiceRow);
    return row;
  }

  async getOCCAmount(occRecord) {
    const amountText = await occRecord.$eval(this.occAmountCell, (el) => el.textContent);
    return parseFloat(amountText.replace('S/. ', '').replace(',', '.'));
  }

  async checkInPoolBulkServiceOCCExists() {
    const row = await this.page.$(this.inPoolBulkServiceRow);
    return row !== null;
  }

  async getInPoolBulkServiceOCCRecords() {
    return await this.page.$$(this.inPoolBulkServiceRow);
  }

  async validateOCCGloss(occRecord) {
    const glossText = await occRecord.$eval(this.occGlossCell, (el) => el.textContent);
    return glossText && glossText.trim().length > 0;
  }

  async isOCCReadyForHPExtreme(occRecord) {
    const statusText = await occRecord.$eval(this.occHPExtremeStatusCell, (el) => el.textContent);
    return statusText === 'AVAILABLE' || statusText === 'READY';
  }

  async validateOCCField(occRecord, fieldName) {
    const fieldSelectors = {
      CUSTOMER_ID: this.occCustomerIdCell,
      CONCEPT: this.occConceptCell,
      AMOUNT: this.occAmountCell,
      CYCLE_DATE: this.occCycleDateCell,
      PRE_BILLING_STATUS: this.occPreBillingStatusCell
    };
    const selector = fieldSelectors[fieldName];
    if (!selector) return false;
    const fieldElement = await occRecord.$(selector);
    if (!fieldElement) return false;
    const text = await fieldElement.textContent();
    return text && text.trim().length > 0;
  }
}

module.exports = BillingPage;