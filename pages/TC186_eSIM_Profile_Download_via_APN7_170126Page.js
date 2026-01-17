class ESIMProfilePage {
  constructor(page) {
    this.page = page;
    
    // Provisioning Section Locators
    this.provisioningSection = '[data-testid="provisioning-section"]';
    this.planSelector = '[data-testid="plan-selector"]';
    this.apn7ConfigCheckbox = '[data-testid="apn7-config-checkbox"]';
    this.provisionButton = '[data-testid="provision-lines-button"]';
    this.provisioningStatusIndicator = '[data-testid="provisioning-status"]';
    this.lineInputField = '[data-testid="line-input-field"]';
    
    // eSIM Download Section Locators
    this.esimDownloadSection = '[data-testid="esim-download-section"]';
    this.initiateDownloadButton = '[data-testid="initiate-esim-download"]';
    this.apn7ConnectionStatus = '[data-testid="apn7-connection-status"]';
    this.downloadProgressIndicator = '[data-testid="download-progress"]';
    this.downloadCompleteIndicator = '[data-testid="download-complete"]';
    this.downloadResultsTable = '[data-testid="download-results-table"]';
    this.downloadResultRow = '[data-testid="download-result-row"]';
    this.downloadStatusCell = '[data-testid="download-status"]';
    this.downloadErrorsCell = '[data-testid="download-errors"]';
    
    // BSCS7 Console Locators
    this.bscs7ConsoleLink = '[data-testid="bscs7-console-link"]';
    this.udrQuerySection = '[data-testid="udr-query-section"]';
    this.udrTableSelector = '[data-testid="udr-table-selector"]';
    this.executeQueryButton = '[data-testid="execute-query-button"]';
    this.trafficRecordsTable = '[data-testid="traffic-records-table"]';
    this.trafficRecordRow = '[data-testid="traffic-record-row"]';
    this.costColumnCell = '[data-testid="cost-column"]';
    this.apnFilterInput = '[data-testid="apn-filter-input"]';
    
    // Invoice Section Locators
    this.invoiceSection = '[data-testid="invoice-section"]';
    this.consolidatedInvoiceLink = '[data-testid="consolidated-gm-invoice"]';
    this.invoiceChargesTable = '[data-testid="invoice-charges-table"]';
    this.apn7ChargesRow = '[data-testid="apn7-charges-row"]';
    this.totalChargesCell = '[data-testid="total-charges"]';
    this.esimDownloadChargesSection = '[data-testid="esim-download-charges"]';
    this.serviciosInPoolSection = '[data-testid="servicios-in-pool-section"]';
    this.detalleTraficSection = '[data-testid="detalle-trafico-sold"]';
  }

  async navigateToProvisioningSection() {
    await this.page.click(this.provisioningSection);
    await this.page.waitForSelector(this.planSelector);
  }

  async provisionLinesWithAPN7(plans) {
    for (const plan of plans) {
      await this.page.click(this.planSelector);
      await this.page.click(`[data-testid="plan-option-${plan.replace(/\s+/g, '-').toLowerCase()}"]`);
      await this.page.check(this.apn7ConfigCheckbox);
      await this.page.click(this.provisionButton);
      await this.page.waitForSelector(this.provisioningStatusIndicator);
    }
  }

  async getProvisioningStatus() {
    const statusElement = await this.page.waitForSelector(this.provisioningStatusIndicator);
    return await statusElement.textContent();
  }

  async navigateToESIMDownloadSection() {
    await this.page.click(this.esimDownloadSection);
    await this.page.waitForSelector(this.initiateDownloadButton);
  }

  async initiateESIMDownloadForAllPlans() {
    await this.page.click(this.initiateDownloadButton);
    await this.page.waitForSelector(this.downloadProgressIndicator);
  }

  async getAPN7ConnectionStatus() {
    const statusElement = await this.page.waitForSelector(this.apn7ConnectionStatus);
    return await statusElement.textContent();
  }

  async completeESIMDownloadProcess() {
    await this.page.waitForSelector(this.downloadCompleteIndicator, { timeout: 120000 });
  }

  async waitForDownloadCompletion() {
    await this.page.waitForSelector(this.downloadResultsTable);
  }

  async getDownloadResultsForAllLines() {
    const rows = await this.page.$$(this.downloadResultRow);
    const results = [];
    for (const row of rows) {
      const status = await row.$eval(this.downloadStatusCell, el => el.textContent);
      const errorsText = await row.$eval(this.downloadErrorsCell, el => el.textContent);
      const errors = errorsText ? errorsText.split(',').filter(e => e.trim()) : [];
      results.push({ status: status.trim().toLowerCase(), errors });
    }
    return results;
  }

  async navigateToBSCS7Console() {
    await this.page.click(this.bscs7ConsoleLink);
    await this.page.waitForSelector(this.udrQuerySection);
  }

  async queryUDRLT01Table() {
    await this.page.click(this.udrTableSelector);
    await this.page.click('[data-testid="udr-lt-01-option"]');
    await this.page.fill(this.apnFilterInput, 'APN7');
    await this.page.click(this.executeQueryButton);
    await this.page.waitForSelector(this.trafficRecordsTable);
  }

  async getAPN7TrafficRecords() {
    const rows = await this.page.$$(this.trafficRecordRow);
    const records = [];
    for (const row of rows) {
      const costText = await row.$eval(this.costColumnCell, el => el.textContent);
      const cost = parseFloat(costText.replace(/[^0-9.-]/g, ''));
      records.push({ cost });
    }
    return records;
  }

  async navigateToInvoiceSection() {
    await this.page.click(this.invoiceSection);
    await this.page.waitForSelector(this.consolidatedInvoiceLink);
  }

  async openConsolidatedGMInvoice() {
    await this.page.click(this.consolidatedInvoiceLink);
    await this.page.waitForSelector(this.invoiceChargesTable);
  }

  async getAPN7ChargesFromInvoice() {
    const isVisible = await this.page.isVisible(this.apn7ChargesRow);
    if (!isVisible) {
      return 0;
    }
    const chargesText = await this.page.$eval(this.totalChargesCell, el => el.textContent);
    return parseFloat(chargesText.replace(/[^0-9.-]/g, '')) || 0;
  }

  async hasESIMDownloadCharges() {
    const isVisible = await this.page.isVisible(this.esimDownloadChargesSection);
    if (!isVisible) {
      return false;
    }
    const chargesText = await this.page.$eval(`${this.esimDownloadChargesSection} ${this.totalChargesCell}`, el => el.textContent);
    const charges = parseFloat(chargesText.replace(/[^0-9.-]/g, '')) || 0;
    return charges > 0;
  }
};

module.exports = ESIMProfilePage;