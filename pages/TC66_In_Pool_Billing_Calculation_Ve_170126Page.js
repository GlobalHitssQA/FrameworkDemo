class InPoolBillingPage {
  constructor(page) {
    this.page = page;
    
    this.soldPlanManagementLink = '[data-testid="sold-plan-management-link"]';
    this.activeLinesTable = '[data-testid="active-lines-table"]';
    this.activeLinesRows = '[data-testid="active-lines-table"] tbody tr[data-status="active"]';
    this.inPoolPackageStatus = '[data-testid="in-pool-package-status"]';
    this.inPoolBagDisplay = '[data-testid="in-pool-bag-total"]';
    this.telemetryConsumptionInput = '[data-testid="telemetry-consumption-input"]';
    this.configuredConsumptionDisplay = '[data-testid="configured-consumption-value"]';
    this.executeShellButton = '[data-testid="execute-in-pool-shell-btn"]';
    this.shellProcessingIndicator = '[data-testid="shell-processing-indicator"]';
    this.shellResultContainer = '[data-testid="shell-calculation-result"]';
    this.excessConsumptionIndicator = '[data-testid="excess-consumption-flag"]';
    this.excessAmountDisplay = '[data-testid="excess-amount-value"]';
    this.occInPoolServiceSection = '[data-testid="occ-in-pool-service-section"]';
    this.occInPoolServiceAmount = '[data-testid="occ-in-pool-service-amount"]';
    this.occInPoolServiceStatus = '[data-testid="occ-in-pool-service-generated"]';
    this.occInPoolGranelSection = '[data-testid="occ-in-pool-granel-section"]';
    this.documentAllTable = '[data-testid="document-all-table"]';
    this.documentAllGranelRows = '[data-testid="document-all-table"] tr[data-concept="in-pool-granel"]';
    this.planDetailSection = '[data-testid="plan-detail-section"]';
    this.trafficDetailSection = '[data-testid="traffic-detail-sold-section"]';
    this.invoiceInPoolSection = '[data-testid="invoice-in-pool-services-section"]';
    this.invoiceGranelSection = '[data-testid="invoice-in-pool-granel-section"]';
  }

  async navigateToSoldPlanManagement() {
    await this.page.click(this.soldPlanManagementLink);
    await this.page.waitForSelector(this.activeLinesTable);
  }

  async verifyInPoolPackageConfigured() {
    const status = await this.page.textContent(this.inPoolPackageStatus);
    return status.includes('Configured') || status.includes('Active');
  }

  async getActiveSOLDLinesCount() {
    await this.page.waitForSelector(this.activeLinesRows);
    const rows = await this.page.$$(this.activeLinesRows);
    return rows.length;
  }

  async calculateTotalInPoolBag(numberOfLines) {
    const bagPerLine = 10;
    return numberOfLines * bagPerLine;
  }

  async configureTelemetryConsumption(consumptionMB) {
    await this.page.fill(this.telemetryConsumptionInput, consumptionMB.toString());
    await this.page.waitForTimeout(500);
  }

  async getConfiguredConsumption() {
    const value = await this.page.textContent(this.configuredConsumptionDisplay);
    return parseFloat(value.replace(/[^0-9.]/g, ''));
  }

  async executeInPoolCalculationShell() {
    await this.page.click(this.executeShellButton);
  }

  async waitForShellProcessingComplete() {
    await this.page.waitForSelector(this.shellProcessingIndicator, { state: 'hidden', timeout: 60000 });
    await this.page.waitForSelector(this.shellResultContainer);
  }

  async checkForExcessConsumption() {
    const indicator = await this.page.$(this.excessConsumptionIndicator);
    if (!indicator) return false;
    const value = await this.page.getAttribute(this.excessConsumptionIndicator, 'data-has-excess');
    return value === 'true';
  }

  async getShellCalculationResult() {
    const excessText = await this.page.textContent(this.excessAmountDisplay);
    const excessAmount = parseFloat(excessText.replace(/[^0-9.]/g, '')) || 0;
    return { excessAmount };
  }

  async getOCCInPoolServiceAmount() {
    const isVisible = await this.page.isVisible(this.occInPoolServiceSection);
    if (!isVisible) {
      return { isGenerated: false, amount: 0 };
    }
    const amountText = await this.page.textContent(this.occInPoolServiceAmount);
    const amount = parseFloat(amountText.replace(/[^0-9.]/g, ''));
    const statusAttr = await this.page.getAttribute(this.occInPoolServiceStatus, 'data-generated');
    return { isGenerated: statusAttr === 'true', amount };
  }

  async checkOCCInPoolGranelExists() {
    const granelSection = await this.page.$(this.occInPoolGranelSection);
    if (!granelSection) return false;
    const isVisible = await this.page.isVisible(this.occInPoolGranelSection);
    return isVisible;
  }

  async verifyDocumentAllTableNoGranel() {
    await this.page.waitForSelector(this.documentAllTable);
    const granelRows = await this.page.$$(this.documentAllGranelRows);
    return granelRows.length === 0;
  }
};

module.exports = InPoolBillingPage;