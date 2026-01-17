class BillingInPoolPage {
  constructor(page) {
    this.page = page;
    
    this.soldLinesSection = '[data-testid="sold-lines-section"]';
    this.activeSOLDLinesTable = '[data-testid="active-sold-lines-table"]';
    this.soldLinesCountDisplay = '[data-testid="sold-lines-count"]';
    this.inPoolAllocationDisplay = '[data-testid="in-pool-allocation-value"]';
    
    this.shellConfigurationPanel = '[data-testid="shell-configuration-panel"]';
    this.inPoolShellStatus = '[data-testid="in-pool-shell-status"]';
    this.executeShellButton = '[data-testid="execute-shell-button"]';
    this.shellCalculationResult = '[data-testid="shell-calculation-result"]';
    this.shellConsumptionValue = '[data-testid="shell-consumption-value"]';
    this.shellExcessValue = '[data-testid="shell-excess-value"]';
    
    this.documentAllTable = '[data-testid="document-all-table"]';
    this.documentAllTableStatus = '[data-testid="document-all-status"]';
    
    this.telemetryConfigSection = '[data-testid="telemetry-config-section"]';
    this.telemetryConsumptionInput = '[data-testid="telemetry-consumption-input"]';
    this.apn1TrafficValue = '[data-testid="apn1-traffic-value"]';
    this.apn4TrafficValue = '[data-testid="apn4-traffic-value"]';
    this.applyConsumptionButton = '[data-testid="apply-consumption-button"]';
    
    this.occRecordsSection = '[data-testid="occ-records-section"]';
    this.inPoolServiceOCCRow = '[data-testid="occ-in-pool-service"]';
    this.inPoolServiceOCCAmount = '[data-testid="occ-in-pool-service-amount"]';
    this.inPoolGranelOCCRow = '[data-testid="occ-in-pool-granel"]';
    
    this.navigationMenu = '[data-testid="navigation-menu"]';
    this.soldLinesMenuItem = '[data-testid="menu-sold-lines"]';
    this.shellMenuItem = '[data-testid="menu-shell"]';
    this.documentAllMenuItem = '[data-testid="menu-document-all"]';
    this.telemetryMenuItem = '[data-testid="menu-telemetry"]';
    this.occMenuItem = '[data-testid="menu-occ-records"]';
  }

  async navigateToSOLDLinesSection() {
    await this.page.click(this.navigationMenu);
    await this.page.click(this.soldLinesMenuItem);
    await this.page.waitForSelector(this.soldLinesSection);
  }

  async verifyActiveSOLDLinesExist() {
    await this.page.waitForSelector(this.activeSOLDLinesTable);
    const rows = await this.page.locator(`${this.activeSOLDLinesTable} tbody tr`).count();
    return rows > 0;
  }

  async verifyInPoolShellConfiguration() {
    await this.page.click(this.navigationMenu);
    await this.page.click(this.shellMenuItem);
    await this.page.waitForSelector(this.shellConfigurationPanel);
    const status = await this.page.textContent(this.inPoolShellStatus);
    return status.toLowerCase().includes('configured') || status.toLowerCase().includes('active');
  }

  async navigateToDocumentAllTable() {
    await this.page.click(this.navigationMenu);
    await this.page.click(this.documentAllMenuItem);
    await this.page.waitForSelector(this.documentAllTable);
  }

  async verifyDocumentAllTableAvailable() {
    const isVisible = await this.page.isVisible(this.documentAllTable);
    const status = await this.page.textContent(this.documentAllTableStatus);
    return isVisible && status.toLowerCase().includes('available');
  }

  async getActiveSOLDLinesCount() {
    await this.page.waitForSelector(this.activeSOLDLinesTable);
    const count = await this.page.locator(`${this.activeSOLDLinesTable} tbody tr`).count();
    return count;
  }

  async calculateInPoolAllocation(linesCount) {
    return linesCount * 10;
  }

  async getDisplayedSOLDLinesCount() {
    const countText = await this.page.textContent(this.soldLinesCountDisplay);
    return parseInt(countText, 10);
  }

  async navigateToTelemetryConfiguration() {
    await this.page.click(this.navigationMenu);
    await this.page.click(this.telemetryMenuItem);
    await this.page.waitForSelector(this.telemetryConfigSection);
  }

  async setTelemetryConsumption(consumptionMB) {
    await this.page.fill(this.telemetryConsumptionInput, consumptionMB.toString());
    await this.page.click(this.applyConsumptionButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getAPN1TrafficConsumption() {
    const value = await this.page.textContent(this.apn1TrafficValue);
    return parseFloat(value);
  }

  async getAPN4TrafficConsumption() {
    const value = await this.page.textContent(this.apn4TrafficValue);
    return parseFloat(value);
  }

  async navigateToInPoolShell() {
    await this.page.click(this.navigationMenu);
    await this.page.click(this.shellMenuItem);
    await this.page.waitForSelector(this.shellConfigurationPanel);
  }

  async executeInPoolCalculationShell() {
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.shellCalculationResult);
  }

  async getShellCalculatedConsumption() {
    const value = await this.page.textContent(this.shellConsumptionValue);
    return parseFloat(value);
  }

  async getExcessConsumption() {
    const value = await this.page.textContent(this.shellExcessValue);
    return parseFloat(value);
  }

  async navigateToOCCRecords() {
    await this.page.click(this.navigationMenu);
    await this.page.click(this.occMenuItem);
    await this.page.waitForSelector(this.occRecordsSection);
  }

  async verifyInPoolServiceOCCExists() {
    return await this.page.isVisible(this.inPoolServiceOCCRow);
  }

  async getInPoolServiceOCCAmount() {
    const amountText = await this.page.textContent(this.inPoolServiceOCCAmount);
    const cleanedAmount = amountText.replace(/[^0-9.]/g, '');
    return parseFloat(cleanedAmount);
  }

  async verifyInPoolGranelOCCNotExists() {
    return await this.page.isVisible(this.inPoolGranelOCCRow);
  }
}

module.exports = BillingInPoolPage;