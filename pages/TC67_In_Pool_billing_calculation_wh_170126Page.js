class InPoolBillingPage {
  constructor(page) {
    this.page = page;
    
    this.soldLinesSection = '[data-testid="sold-lines-section"]';
    this.inPoolConfigPanel = '[data-testid="in-pool-config-panel"]';
    this.calculationShellStatus = '[data-testid="calculation-shell-status"]';
    this.parametricTableSection = '[data-testid="parametric-table-section"]';
    this.activeLinesCounter = '[data-testid="active-lines-counter"]';
    this.consumptionTargetInput = '[data-testid="consumption-target-input"]';
    this.apn1TrafficInput = '[data-testid="apn1-traffic-input"]';
    this.apn4TrafficInput = '[data-testid="apn4-traffic-input"]';
    this.generateTrafficButton = '[data-testid="generate-traffic-button"]';
    this.totalTrafficDisplay = '[data-testid="total-traffic-display"]';
    this.executeShellButton = '[data-testid="execute-shell-button"]';
    this.shellExecutionLoader = '[data-testid="shell-execution-loader"]';
    this.excessDetectedDisplay = '[data-testid="excess-detected-display"]';
    this.occInPoolServiceSection = '[data-testid="occ-in-pool-service-section"]';
    this.occInPoolServiceAmount = '[data-testid="occ-in-pool-service-amount"]';
    this.occInPoolGranelSection = '[data-testid="occ-in-pool-granel-section"]';
    this.occInPoolGranelAmount = '[data-testid="occ-in-pool-granel-amount"]';
    this.granelExcessMBDisplay = '[data-testid="granel-excess-mb-display"]';
    this.invoiceServicesInPoolSection = '[data-testid="invoice-services-in-pool"]';
    this.invoiceServicesInPoolGranelSection = '[data-testid="invoice-services-in-pool-granel"]';
    this.invoiceTrafficDetailSection = '[data-testid="invoice-traffic-detail-sold"]';
    this.planFieldInTrafficDetail = '[data-testid="plan-field-traffic-detail"]';
  }

  async navigateToInPoolConfiguration() {
    await this.page.click(this.inPoolConfigPanel);
    await this.page.waitForSelector(this.soldLinesSection);
  }

  async verifySOLDLinesConfigured() {
    return await this.page.isVisible(this.soldLinesSection);
  }

  async verifyCalculationShellConfigured() {
    const statusText = await this.page.textContent(this.calculationShellStatus);
    return statusText.includes('Configured') || statusText.includes('Active');
  }

  async verifyParametricTableRates() {
    return await this.page.isVisible(this.parametricTableSection);
  }

  async getActiveSOLDLinesCount() {
    const countText = await this.page.textContent(this.activeLinesCounter);
    return parseInt(countText, 10);
  }

  async calculateTotalInPoolPool(numberOfLines) {
    return numberOfLines * 10;
  }

  async configureConsumptionTarget(targetMB) {
    await this.page.fill(this.consumptionTargetInput, targetMB.toString());
  }

  async generateTelemetryTrafficAPN1(trafficMB) {
    await this.page.fill(this.apn1TrafficInput, trafficMB.toString());
    await this.page.click(this.generateTrafficButton);
  }

  async generateTelemetryTrafficAPN4(trafficMB) {
    await this.page.fill(this.apn4TrafficInput, trafficMB.toString());
    await this.page.click(this.generateTrafficButton);
  }

  async getTotalGeneratedTraffic() {
    const trafficText = await this.page.textContent(this.totalTrafficDisplay);
    return parseFloat(trafficText);
  }

  async executeCalculationShell() {
    await this.page.click(this.executeShellButton);
  }

  async waitForShellExecution() {
    await this.page.waitForSelector(this.shellExecutionLoader, { state: 'hidden', timeout: 60000 });
  }

  async getDetectedExcess() {
    const excessText = await this.page.textContent(this.excessDetectedDisplay);
    return parseFloat(excessText);
  }

  async verifyOCCInPoolServiceGenerated() {
    return await this.page.isVisible(this.occInPoolServiceSection);
  }

  async getOCCInPoolServiceAmount() {
    const amountText = await this.page.textContent(this.occInPoolServiceAmount);
    return parseFloat(amountText.replace('S/.', '').trim());
  }

  async verifyOCCInPoolGranelServiceGenerated() {
    return await this.page.isVisible(this.occInPoolGranelSection);
  }

  async getGranelExcessMB() {
    const excessText = await this.page.textContent(this.granelExcessMBDisplay);
    return parseFloat(excessText);
  }

  async getOCCInPoolGranelServiceAmount() {
    const amountText = await this.page.textContent(this.occInPoolGranelAmount);
    return parseFloat(amountText.replace('S/.', '').trim());
  }
}

module.exports = InPoolBillingPage;