class SoldPlanPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this._provisioningSection = '[data-testid="provisioning-section"]';
    this._trafficMonitoringSection = '[data-testid="traffic-monitoring-section"]';
    this._shellExecutionSection = '[data-testid="shell-execution-section"]';
    this._occSection = '[data-testid="occ-section"]';
    this._invoiceSection = '[data-testid="invoice-section"]';
    
    // Provisioning locators
    this._linesCountInput = '[data-testid="lines-count-input"]';
    this._apnSelect = '[data-testid="apn-select"]';
    this._apn4Option = '[data-testid="apn4-option"]';
    this._provisionButton = '[data-testid="provision-lines-button"]';
    this._provisionedLinesCount = '[data-testid="provisioned-lines-count"]';
    this._apnStatusIndicator = '[data-testid="apn4-status-indicator"]';
    this._inPoolPackageStatus = '[data-testid="in-pool-package-status"]';
    
    // In Pool quota locators
    this._inPoolTotalQuota = '[data-testid="in-pool-total-quota"]';
    
    // Traffic monitoring locators
    this._trafficAmountInput = '[data-testid="traffic-amount-input"]';
    this._generateTrafficButton = '[data-testid="generate-traffic-button"]';
    this._udrRegisteredTraffic = '[data-testid="udr-registered-traffic"]';
    
    // Shell execution locators
    this._executeShellButton = '[data-testid="execute-in-pool-shell-button"]';
    this._calculatedExcess = '[data-testid="calculated-excess-amount"]';
    
    // OCC locators
    this._inPoolServiceOCC = '[data-testid="in-pool-service-occ"]';
    this._inPoolServiceOCCAmount = '[data-testid="in-pool-service-occ-amount"]';
    this._inPoolBulkServiceOCC = '[data-testid="in-pool-bulk-service-occ"]';
    this._inPoolBulkServiceOCCAmount = '[data-testid="in-pool-bulk-service-occ-amount"]';
    
    // Invoice locators
    this._trafficDetailSOLDSection = '[data-testid="traffic-detail-sold-section"]';
    this._invoiceInPoolServiceRow = '[data-testid="invoice-in-pool-service-row"]';
    this._invoiceInPoolServiceAmount = '[data-testid="invoice-in-pool-service-amount"]';
    this._invoiceBulkServiceRow = '[data-testid="invoice-bulk-service-row"]';
    this._invoiceBulkServiceAmount = '[data-testid="invoice-bulk-service-amount"]';
  }

  async navigateToProvisioningSection() {
    await this.page.click(this._provisioningSection);
    await this.page.waitForSelector(this._linesCountInput);
  }

  async provisionLinesWithAPN4(lineCount, apnValue) {
    await this.page.fill(this._linesCountInput, lineCount.toString());
    await this.page.click(this._apnSelect);
    await this.page.click(this._apn4Option);
    await this.page.click(this._provisionButton);
    await this.page.waitForSelector(this._provisionedLinesCount);
  }

  async getProvisionedLinesCount() {
    const text = await this.page.textContent(this._provisionedLinesCount);
    return parseInt(text, 10);
  }

  async verifyAPN4Active() {
    const status = await this.page.textContent(this._apnStatusIndicator);
    return status.toLowerCase().includes('active') || status.toLowerCase().includes('activo');
  }

  async verifyInPoolPackageAssigned() {
    const status = await this.page.textContent(this._inPoolPackageStatus);
    return status.toLowerCase().includes('assigned') || status.toLowerCase().includes('asignado');
  }

  async getInPoolTotalQuota() {
    const text = await this.page.textContent(this._inPoolTotalQuota);
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async navigateToTrafficMonitoring() {
    await this.page.click(this._trafficMonitoringSection);
    await this.page.waitForSelector(this._trafficAmountInput);
  }

  async generateTelemetryTraffic(amountMB) {
    await this.page.fill(this._trafficAmountInput, amountMB.toString());
    await this.page.click(this._generateTrafficButton);
    await this.page.waitForSelector(this._udrRegisteredTraffic);
  }

  async getRegisteredTrafficInUDR() {
    const text = await this.page.textContent(this._udrRegisteredTraffic);
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async navigateToShellExecution() {
    await this.page.click(this._shellExecutionSection);
    await this.page.waitForSelector(this._executeShellButton);
  }

  async executeInPoolCalculationShell() {
    await this.page.click(this._executeShellButton);
    await this.page.waitForSelector(this._calculatedExcess);
  }

  async getCalculatedExcess() {
    const text = await this.page.textContent(this._calculatedExcess);
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async navigateToOCCSection() {
    await this.page.click(this._occSection);
    await this.page.waitForSelector(this._inPoolServiceOCC);
  }

  async getInPoolServiceOCCAmount() {
    const text = await this.page.textContent(this._inPoolServiceOCCAmount);
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getInPoolBulkServiceOCCAmount() {
    const text = await this.page.textContent(this._inPoolBulkServiceOCCAmount);
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async navigateToInvoiceSection() {
    await this.page.click(this._invoiceSection);
    await this.page.waitForSelector(this._trafficDetailSOLDSection);
  }

  async isTrafficDetailSOLDSectionVisible() {
    return await this.page.isVisible(this._trafficDetailSOLDSection);
  }

  async isInPoolServiceOCCDisplayedInInvoice() {
    return await this.page.isVisible(this._invoiceInPoolServiceRow);
  }

  async isInPoolBulkServiceOCCDisplayedInInvoice() {
    return await this.page.isVisible(this._invoiceBulkServiceRow);
  }

  async getInvoiceInPoolServiceAmount() {
    const text = await this.page.textContent(this._invoiceInPoolServiceAmount);
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getInvoiceBulkServiceAmount() {
    const text = await this.page.textContent(this._invoiceBulkServiceAmount);
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }
}

module.exports = SoldPlanPage;