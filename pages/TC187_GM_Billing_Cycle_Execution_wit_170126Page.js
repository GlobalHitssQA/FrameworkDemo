class BillingCyclePage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.billingConfigurationMenu = '[data-testid="billing-configuration-menu"]';
    this.gmLinesSection = '[data-testid="gm-lines-section"]';
    
    // Billing cycle configuration locators
    this.billingCycleDay29Indicator = '[data-testid="billing-cycle-day-29"]';
    this.lifeCyclePlanSelector = '[data-testid="life-cycle-plan-selector"]';
    this.activeLineStatusBadge = '[data-testid="line-status-active"]';
    
    // Consumption locators
    this.consumptionGeneratorPanel = '[data-testid="consumption-generator-panel"]';
    this.voiceConsumptionInput = '[data-testid="voice-consumption-input"]';
    this.smsConsumptionInput = '[data-testid="sms-consumption-input"]';
    this.dataConsumptionInput = '[data-testid="data-consumption-input"]';
    this.generateConsumptionButton = '[data-testid="generate-consumption-btn"]';
    
    // UDR table locators
    this.udrTableSection = '[data-testid="udr-lt-01-table"]';
    this.udrRecordRow = '[data-testid="udr-record-row"]';
    this.udrDateTimeColumn = '[data-testid="udr-datetime-column"]';
    
    // In Pool Shell locators
    this.inPoolShellPanel = '[data-testid="in-pool-shell-panel"]';
    this.executeShellButton = '[data-testid="execute-shell-btn"]';
    this.shellExecutionStatus = '[data-testid="shell-execution-status"]';
    this.occGeneratedIndicator = '[data-testid="occ-generated-indicator"]';
    
    // Billing process locators
    this.prebillingPanel = '[data-testid="prebilling-panel"]';
    this.executePrebillingButton = '[data-testid="execute-prebilling-btn"]';
    this.billingPanel = '[data-testid="billing-panel"]';
    this.executeBillingButton = '[data-testid="execute-billing-btn"]';
    this.billingCycleStatus = '[data-testid="billing-cycle-status"]';
    this.chargesProcessedIndicator = '[data-testid="charges-processed-indicator"]';
    
    // Invoice locators
    this.consolidatedInvoiceSection = '[data-testid="consolidated-invoice-section"]';
    this.invoiceGeneratedStatus = '[data-testid="invoice-generated-status"]';
    this.invoicePeriodStart = '[data-testid="invoice-period-start"]';
    this.invoicePeriodEnd = '[data-testid="invoice-period-end"]';
    this.invoiceCutoffDate = '[data-testid="invoice-cutoff-date"]';
    
    // Invoice detail locators
    this.inPoolServicesSection = '[data-testid="in-pool-services-section"]';
    this.inPoolGranelSection = '[data-testid="in-pool-granel-section"]';
    this.trafficDetailSection = '[data-testid="traffic-detail-sold-section"]';
    this.planFieldInTrafficDetail = '[data-testid="plan-field-traffic-detail"]';
    this.invoiceServicesTable = '[data-testid="invoice-services-table"]';
    this.invoiceConsumptionTable = '[data-testid="invoice-consumption-table"]';
    this.invoiceChargesTable = '[data-testid="invoice-charges-table"]';
  }

  async navigateToBillingConfiguration() {
    await this.page.click(this.billingConfigurationMenu);
    await this.page.waitForSelector(this.gmLinesSection);
  }

  async verifyGMLinesActiveWithDay29Cycle() {
    await this.page.waitForSelector(this.billingCycleDay29Indicator);
    const isDay29Configured = await this.page.isVisible(this.billingCycleDay29Indicator);
    const hasActiveLines = await this.page.isVisible(this.activeLineStatusBadge);
    return isDay29Configured && hasActiveLines;
  }

  async generateConsumptionForLines() {
    await this.page.click(this.consumptionGeneratorPanel);
    await this.page.fill(this.voiceConsumptionInput, '100');
    await this.page.fill(this.smsConsumptionInput, '50');
    await this.page.fill(this.dataConsumptionInput, '1024');
    await this.page.click(this.generateConsumptionButton);
    await this.page.waitForTimeout(2000);
  }

  async verifyConsumptionRegisteredInUDR() {
    await this.page.waitForSelector(this.udrTableSection);
    const records = await this.page.$$(this.udrRecordRow);
    return records.length > 0;
  }

  async executeInPoolCalculationShell() {
    await this.page.click(this.inPoolShellPanel);
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.shellExecutionStatus);
  }

  async verifyInPoolOCCsGenerated() {
    const occIndicator = await this.page.isVisible(this.occGeneratedIndicator);
    return occIndicator;
  }

  async executePrebillingProcess() {
    await this.page.click(this.prebillingPanel);
    await this.page.click(this.executePrebillingButton);
    await this.page.waitForTimeout(3000);
  }

  async executeBillingProcess() {
    await this.page.click(this.billingPanel);
    await this.page.click(this.executeBillingButton);
    await this.page.waitForTimeout(3000);
  }

  async verifyBillingCycleClosed() {
    const statusText = await this.page.textContent(this.billingCycleStatus);
    return statusText.includes('Closed') || statusText.includes('Cerrado');
  }

  async verifyChargesProcessed() {
    return await this.page.isVisible(this.chargesProcessedIndicator);
  }

  async verifyConsolidatedInvoiceGenerated() {
    await this.page.waitForSelector(this.consolidatedInvoiceSection);
    const statusText = await this.page.textContent(this.invoiceGeneratedStatus);
    return statusText.includes('Generated') || statusText.includes('Generada');
  }

  async verifyInvoicePeriodDay29ToDay28() {
    const periodStart = await this.page.textContent(this.invoicePeriodStart);
    const periodEnd = await this.page.textContent(this.invoicePeriodEnd);
    const cutoffDate = await this.page.textContent(this.invoiceCutoffDate);
    
    const startDay = parseInt(periodStart.split('/')[0]) || parseInt(periodStart.split('-')[2]);
    const endDay = parseInt(periodEnd.split('/')[0]) || parseInt(periodEnd.split('-')[2]);
    
    return startDay === 29 && endDay === 28;
  }

  async verifyInvoiceIncludesAllServices() {
    const inPoolVisible = await this.page.isVisible(this.inPoolServicesSection);
    const inPoolGranelVisible = await this.page.isVisible(this.inPoolGranelSection);
    const trafficDetailVisible = await this.page.isVisible(this.trafficDetailSection);
    const servicesTableVisible = await this.page.isVisible(this.invoiceServicesTable);
    return inPoolVisible && inPoolGranelVisible && trafficDetailVisible && servicesTableVisible;
  }

  async verifyInvoiceIncludesAllConsumption() {
    await this.page.waitForSelector(this.invoiceConsumptionTable);
    const consumptionRows = await this.page.$$(`${this.invoiceConsumptionTable} tr`);
    return consumptionRows.length > 1;
  }

  async verifyInvoiceIncludesAllCharges() {
    await this.page.waitForSelector(this.invoiceChargesTable);
    const chargesRows = await this.page.$$(`${this.invoiceChargesTable} tr`);
    return chargesRows.length > 1;
  }
};

module.exports = BillingCyclePage;