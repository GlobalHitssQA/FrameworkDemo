const { expect } = require('@playwright/test');

class InPoolBillingPage {
  constructor(page) {
    this.page = page;
    
    this.inPoolModuleLink = '[data-testid="in-pool-module-link"]';
    this.soldLinesTable = '[data-testid="sold-lines-table"]';
    this.soldLineStatusColumn = '[data-testid="sold-line-status"]';
    this.inPoolPackageIndicator = '[data-testid="in-pool-package-configured"]';
    this.parametricTableLink = '[data-testid="parametric-table-link"]';
    this.tariffConfigurationSection = '[data-testid="tariff-configuration-section"]';
    this.bulkTariffValue = '[data-testid="bulk-tariff-value"]';
    this.inPoolAllocationField = '[data-testid="in-pool-allocation-total"]';
    this.activeLinesCount = '[data-testid="active-lines-count"]';
    this.consumptionScenarioInput = '[data-testid="consumption-scenario-input"]';
    this.configureScenarioButton = '[data-testid="configure-scenario-btn"]';
    this.telemetryTrafficInput = '[data-testid="telemetry-traffic-input"]';
    this.generateTrafficButton = '[data-testid="generate-traffic-btn"]';
    this.recordedConsumptionValue = '[data-testid="recorded-consumption-value"]';
    this.calculationShellLink = '[data-testid="calculation-shell-link"]';
    this.executeShellButton = '[data-testid="execute-shell-btn"]';
    this.shellExecutionStatus = '[data-testid="shell-execution-status"]';
    this.identifiedExcessField = '[data-testid="identified-excess-amount"]';
    this.appliedTariffField = '[data-testid="applied-bulk-tariff"]';
    this.occInPoolServiceLink = '[data-testid="occ-in-pool-service-link"]';
    this.occInPoolServiceAmount = '[data-testid="occ-in-pool-service-amount"]';
    this.occInPoolBulkServiceLink = '[data-testid="occ-in-pool-bulk-service-link"]';
    this.occInPoolBulkServiceAmount = '[data-testid="occ-in-pool-bulk-service-amount"]';
    this.invoiceInPoolSection = '[data-testid="invoice-in-pool-section"]';
    this.invoiceInPoolBulkSection = '[data-testid="invoice-in-pool-bulk-section"]';
    this.trafficDetailSection = '[data-testid="traffic-detail-section"]';
    this.planFieldInTrafficDetail = '[data-testid="plan-field-traffic-detail"]';
  }

  async navigateToInPoolModule() {
    await this.page.click(this.inPoolModuleLink);
    await this.page.waitForSelector(this.soldLinesTable);
  }

  async verifySoldLinesAreActive() {
    const statusElements = await this.page.$$(this.soldLineStatusColumn);
    for (const element of statusElements) {
      const status = await element.textContent();
      expect(status.toLowerCase()).toContain('activ');
    }
  }

  async verifyInPoolPackageConfigured() {
    const isVisible = await this.page.isVisible(this.inPoolPackageIndicator);
    expect(isVisible).toBeTruthy();
  }

  async navigateToParametricTable() {
    await this.page.click(this.parametricTableLink);
    await this.page.waitForSelector(this.tariffConfigurationSection);
  }

  async verifyTariffConfiguration() {
    const tariffValue = await this.page.textContent(this.bulkTariffValue);
    expect(parseFloat(tariffValue)).toBe(0.0372);
  }

  async calculateTotalInPoolAllocation() {
    const allocationText = await this.page.textContent(this.inPoolAllocationField);
    return parseFloat(allocationText);
  }

  async getNumberOfActiveLines() {
    const linesCountText = await this.page.textContent(this.activeLinesCount);
    return parseInt(linesCountText, 10);
  }

  async configureConsumptionScenario(targetConsumption) {
    await this.page.fill(this.consumptionScenarioInput, targetConsumption.toString());
    await this.page.click(this.configureScenarioButton);
    await this.page.waitForLoadState('networkidle');
  }

  async generateTelemetryTraffic(totalTraffic) {
    await this.page.fill(this.telemetryTrafficInput, totalTraffic.toString());
    await this.page.click(this.generateTrafficButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getRecordedTelemetryConsumption() {
    const consumptionText = await this.page.textContent(this.recordedConsumptionValue);
    return parseFloat(consumptionText);
  }

  async navigateToCalculationShell() {
    await this.page.click(this.calculationShellLink);
    await this.page.waitForSelector(this.executeShellButton);
  }

  async executeInPoolCalculationShell() {
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.shellExecutionStatus);
    await this.page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        return element && element.textContent.toLowerCase().includes('complet');
      },
      this.shellExecutionStatus,
      { timeout: 60000 }
    );
  }

  async getIdentifiedExcessAmount() {
    const excessText = await this.page.textContent(this.identifiedExcessField);
    return parseFloat(excessText);
  }

  async getAppliedBulkTariff() {
    const tariffText = await this.page.textContent(this.appliedTariffField);
    return parseFloat(tariffText);
  }

  async navigateToOccInPoolService() {
    await this.page.click(this.occInPoolServiceLink);
    await this.page.waitForSelector(this.occInPoolServiceAmount);
  }

  async getOccInPoolServiceAmount() {
    const amountText = await this.page.textContent(this.occInPoolServiceAmount);
    return parseFloat(amountText.replace(/[^0-9.]/g, ''));
  }

  async navigateToOccInPoolBulkService() {
    await this.page.click(this.occInPoolBulkServiceLink);
    await this.page.waitForSelector(this.occInPoolBulkServiceAmount);
  }

  async getOccInPoolBulkServiceAmount() {
    const amountText = await this.page.textContent(this.occInPoolBulkServiceAmount);
    return parseFloat(amountText.replace(/[^0-9.]/g, ''));
  }
}

module.exports = InPoolBillingPage;