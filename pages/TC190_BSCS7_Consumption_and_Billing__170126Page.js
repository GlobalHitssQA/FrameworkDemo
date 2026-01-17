const { expect } = require('@playwright/test');

class BSCS7BillingPage {
  constructor(page) {
    this.page = page;
    
    this.systemStatusIndicator = '[data-testid="bscs7-system-status"]';
    this.gmLinesStatusPanel = '[data-testid="gm-lines-status-panel"]';
    this.shellInPoolConfigSection = '[data-testid="shell-inpool-config"]';
    this.reportingSystemsStatus = '[data-testid="reporting-systems-status"]';
    this.consumptionGeneratorForm = '[data-testid="consumption-generator-form"]';
    this.voiceMinutesInput = '[data-testid="voice-minutes-input"]';
    this.smsCountInput = '[data-testid="sms-count-input"]';
    this.bulkDataInput = '[data-testid="bulk-data-mb-input"]';
    this.inPoolDataInput = '[data-testid="inpool-data-mb-input"]';
    this.generateConsumptionButton = '[data-testid="generate-consumption-btn"]';
    this.udrTableViewer = '[data-testid="udr-lt-01-table-viewer"]';
    this.udrRecordsList = '[data-testid="udr-records-list"]';
    this.executeShellButton = '[data-testid="execute-inpool-shell-btn"]';
    this.shellExecutionStatus = '[data-testid="shell-execution-status"]';
    this.shellProcessedMBValue = '[data-testid="shell-processed-mb"]';
    this.occGenerationStatus = '[data-testid="occ-generation-status"]';
    this.billingProcessButton = '[data-testid="execute-billing-process-btn"]';
    this.billingProcessStatus = '[data-testid="billing-process-status"]';
    this.invoiceGenerationStatus = '[data-testid="invoice-generation-status"]';
    this.consolidatedInvoiceSection = '[data-testid="consolidated-invoice-section"]';
    this.inPoolServicesSection = '[data-testid="servicios-in-pool-section"]';
    this.inPoolGranelSection = '[data-testid="servicios-in-pool-granel-section"]';
    this.trafficDetailSection = '[data-testid="detalle-trafico-sold-section"]';
    this.planFieldInTrafficDetail = '[data-testid="plan-field-traffic-detail"]';
    this.consumptionTotalsPanel = '[data-testid="consumption-totals-panel"]';
    this.voiceTotalValue = '[data-testid="voice-total-value"]';
    this.smsTotalValue = '[data-testid="sms-total-value"]';
    this.dataTotalValue = '[data-testid="data-total-value"]';
    this.inPoolTotalValue = '[data-testid="inpool-total-value"]';
    this.reportingQueryButton = '[data-testid="query-reporting-systems-btn"]';
    this.datawarehouseQueryButton = '[data-testid="query-datawarehouse-btn"]';
    this.reportingResultsPanel = '[data-testid="reporting-results-panel"]';
    this.datawarehouseResultsPanel = '[data-testid="datawarehouse-results-panel"]';
    this.integrityValidationPanel = '[data-testid="integrity-validation-panel"]';
    this.discrepancyIndicator = '[data-testid="discrepancy-indicator"]';
    this.comparisonResultsTable = '[data-testid="comparison-results-table"]';
    
    this.consumptionData = null;
    this.bscs7Totals = null;
    this.invoiceTotals = null;
    this.reportingData = null;
    this.datawarehouseData = null;
  }

  async navigateToBSCS7Console() {
    await this.page.goto('/bscs7/console');
    await this.page.waitForLoadState('networkidle');
  }

  async verifySystemOperational() {
    await this.page.waitForSelector(this.systemStatusIndicator);
    const status = await this.page.textContent(this.systemStatusIndicator);
    return status.toLowerCase().includes('operational') || status.toLowerCase().includes('online');
  }

  async verifyGMLinesActive() {
    await this.page.waitForSelector(this.gmLinesStatusPanel);
    const isVisible = await this.page.isVisible(this.gmLinesStatusPanel);
    const statusText = await this.page.textContent(this.gmLinesStatusPanel);
    return isVisible && statusText.toLowerCase().includes('active');
  }

  async verifyShellInPoolConfigured() {
    await this.page.waitForSelector(this.shellInPoolConfigSection);
    const configStatus = await this.page.textContent(this.shellInPoolConfigSection);
    return configStatus.toLowerCase().includes('configured');
  }

  async verifyReportingSystemsAvailable() {
    await this.page.waitForSelector(this.reportingSystemsStatus);
    const status = await this.page.textContent(this.reportingSystemsStatus);
    return status.toLowerCase().includes('available');
  }

  async generateControlledConsumption(consumptionParams) {
    this.consumptionData = consumptionParams;
    await this.page.waitForSelector(this.consumptionGeneratorForm);
    await this.page.fill(this.voiceMinutesInput, consumptionParams.voiceMinutes.toString());
    await this.page.fill(this.smsCountInput, consumptionParams.smsCount.toString());
    await this.page.fill(this.bulkDataInput, consumptionParams.bulkDataMB.toString());
    await this.page.fill(this.inPoolDataInput, consumptionParams.inPoolMB.toString());
    await this.page.click(this.generateConsumptionButton);
    await this.page.waitForSelector(this.udrTableViewer);
  }

  async verifyConsumptionInUDRTable() {
    await this.page.waitForSelector(this.udrRecordsList);
    const records = await this.page.locator(this.udrRecordsList).count();
    return records > 0;
  }

  async executeInPoolCalculationShell() {
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.shellExecutionStatus);
    await this.page.waitForFunction(
      (selector) => {
        const el = document.querySelector(selector);
        return el && (el.textContent.includes('completed') || el.textContent.includes('finished'));
      },
      this.shellExecutionStatus,
      { timeout: 60000 }
    );
  }

  async verifyShellProcessingResult(expectedMB) {
    const processedMBText = await this.page.textContent(this.shellProcessedMBValue);
    const processedMB = parseInt(processedMBText.replace(/[^0-9]/g, ''), 10);
    const occStatus = await this.page.textContent(this.occGenerationStatus);
    return {
      processedMB: processedMB,
      occsGenerated: occStatus.toLowerCase().includes('generated') || occStatus.toLowerCase().includes('success')
    };
  }

  async executeBillingProcess() {
    await this.page.click(this.billingProcessButton);
    await this.page.waitForSelector(this.billingProcessStatus);
  }

  async waitForInvoiceGeneration() {
    await this.page.waitForFunction(
      (selector) => {
        const el = document.querySelector(selector);
        return el && (el.textContent.includes('completed') || el.textContent.includes('generated'));
      },
      this.invoiceGenerationStatus,
      { timeout: 120000 }
    );
  }

  async verifyInvoiceGenerated() {
    await this.page.waitForSelector(this.consolidatedInvoiceSection);
    const inPoolVisible = await this.page.isVisible(this.inPoolServicesSection);
    const granelVisible = await this.page.isVisible(this.inPoolGranelSection);
    const trafficDetailVisible = await this.page.isVisible(this.trafficDetailSection);
    return inPoolVisible && granelVisible && trafficDetailVisible;
  }

  async extractConsumptionTotalsByTrafficType() {
    await this.page.waitForSelector(this.consumptionTotalsPanel);
    const voiceTotal = await this.page.textContent(this.voiceTotalValue);
    const smsTotal = await this.page.textContent(this.smsTotalValue);
    const dataTotal = await this.page.textContent(this.dataTotalValue);
    const inPoolTotal = await this.page.textContent(this.inPoolTotalValue);
    this.bscs7Totals = {
      voice: parseInt(voiceTotal.replace(/[^0-9]/g, ''), 10),
      sms: parseInt(smsTotal.replace(/[^0-9]/g, ''), 10),
      data: parseInt(dataTotal.replace(/[^0-9]/g, ''), 10),
      inPool: parseInt(inPoolTotal.replace(/[^0-9]/g, ''), 10)
    };
    return this.bscs7Totals;
  }

  async compareBSCS7WithInvoice() {
    const invoiceVoice = await this.page.textContent(`${this.trafficDetailSection} [data-testid="invoice-voice-total"]`);
    const invoiceSMS = await this.page.textContent(`${this.trafficDetailSection} [data-testid="invoice-sms-total"]`);
    const invoiceData = await this.page.textContent(`${this.inPoolGranelSection} [data-testid="invoice-data-total"]`);
    const invoiceInPool = await this.page.textContent(`${this.inPoolServicesSection} [data-testid="invoice-inpool-total"]`);
    this.invoiceTotals = {
      voice: parseInt(invoiceVoice.replace(/[^0-9]/g, ''), 10),
      sms: parseInt(invoiceSMS.replace(/[^0-9]/g, ''), 10),
      data: parseInt(invoiceData.replace(/[^0-9]/g, ''), 10),
      inPool: parseInt(invoiceInPool.replace(/[^0-9]/g, ''), 10)
    };
    return {
      voiceMatch: this.bscs7Totals.voice === this.invoiceTotals.voice,
      smsMatch: this.bscs7Totals.sms === this.invoiceTotals.sms,
      dataMatch: this.bscs7Totals.data === this.invoiceTotals.data,
      inPoolMatch: this.bscs7Totals.inPool === this.invoiceTotals.inPool
    };
  }

  async queryReportingSystems() {
    await this.page.click(this.reportingQueryButton);
    await this.page.waitForSelector(this.reportingResultsPanel);
    const reportingVoice = await this.page.textContent(`${this.reportingResultsPanel} [data-testid="reporting-voice-total"]`);
    const reportingSMS = await this.page.textContent(`${this.reportingResultsPanel} [data-testid="reporting-sms-total"]`);
    const reportingData = await this.page.textContent(`${this.reportingResultsPanel} [data-testid="reporting-data-total"]`);
    const reportingInPool = await this.page.textContent(`${this.reportingResultsPanel} [data-testid="reporting-inpool-total"]`);
    this.reportingData = {
      voice: parseInt(reportingVoice.replace(/[^0-9]/g, ''), 10),
      sms: parseInt(reportingSMS.replace(/[^0-9]/g, ''), 10),
      data: parseInt(reportingData.replace(/[^0-9]/g, ''), 10),
      inPool: parseInt(reportingInPool.replace(/[^0-9]/g, ''), 10)
    };
  }

  async queryDatawarehouse() {
    await this.page.click(this.datawarehouseQueryButton);
    await this.page.waitForSelector(this.datawarehouseResultsPanel);
    const dwVoice = await this.page.textContent(`${this.datawarehouseResultsPanel} [data-testid="dw-voice-total"]`);
    const dwSMS = await this.page.textContent(`${this.datawarehouseResultsPanel} [data-testid="dw-sms-total"]`);
    const dwData = await this.page.textContent(`${this.datawarehouseResultsPanel} [data-testid="dw-data-total"]`);
    const dwInPool = await this.page.textContent(`${this.datawarehouseResultsPanel} [data-testid="dw-inpool-total"]`);
    this.datawarehouseData = {
      voice: parseInt(dwVoice.replace(/[^0-9]/g, ''), 10),
      sms: parseInt(dwSMS.replace(/[^0-9]/g, ''), 10),
      data: parseInt(dwData.replace(/[^0-9]/g, ''), 10),
      inPool: parseInt(dwInPool.replace(/[^0-9]/g, ''), 10)
    };
  }

  async verifyReportingSystemsMatch() {
    const reportingMatch = 
      this.bscs7Totals.voice === this.reportingData.voice &&
      this.bscs7Totals.sms === this.reportingData.sms &&
      this.bscs7Totals.data === this.reportingData.data &&
      this.bscs7Totals.inPool === this.reportingData.inPool;
    const dwMatch = 
      this.bscs7Totals.voice === this.datawarehouseData.voice &&
      this.bscs7Totals.sms === this.datawarehouseData.sms &&
      this.bscs7Totals.data === this.datawarehouseData.data &&
      this.bscs7Totals.inPool === this.datawarehouseData.inPool;
    return reportingMatch && dwMatch;
  }

  async validateDataIntegrity() {
    await this.page.waitForSelector(this.integrityValidationPanel);
    const discrepancyElement = await this.page.$(this.discrepancyIndicator);
    let hasDiscrepancies = false;
    if (discrepancyElement) {
      const discrepancyText = await discrepancyElement.textContent();
      hasDiscrepancies = discrepancyText.toLowerCase().includes('discrepancy') || discrepancyText.toLowerCase().includes('mismatch');
    }
    const bscs7InvoiceMatch = 
      this.bscs7Totals.voice === this.invoiceTotals.voice &&
      this.bscs7Totals.sms === this.invoiceTotals.sms &&
      this.bscs7Totals.data === this.invoiceTotals.data &&
      this.bscs7Totals.inPool === this.invoiceTotals.inPool;
    const bscs7ReportingMatch = 
      this.bscs7Totals.voice === this.reportingData.voice &&
      this.bscs7Totals.sms === this.reportingData.sms &&
      this.bscs7Totals.data === this.reportingData.data &&
      this.bscs7Totals.inPool === this.reportingData.inPool;
    const invoiceReportingMatch = 
      this.invoiceTotals.voice === this.reportingData.voice &&
      this.invoiceTotals.sms === this.reportingData.sms &&
      this.invoiceTotals.data === this.reportingData.data &&
      this.invoiceTotals.inPool === this.reportingData.inPool;
    return {
      hasDiscrepancies: hasDiscrepancies,
      bscs7InvoiceMatch: bscs7InvoiceMatch,
      bscs7ReportingMatch: bscs7ReportingMatch,
      invoiceReportingMatch: invoiceReportingMatch
    };
  }
}

module.exports = BSCS7BillingPage;