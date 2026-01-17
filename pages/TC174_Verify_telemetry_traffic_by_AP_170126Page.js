const { expect } = require('@playwright/test');

class InPoolTrafficPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.provisioningSectionLink = page.locator('[data-testid="provisioning-section-link"]');
    this.inPoolConfigLink = page.locator('[data-testid="in-pool-config-link"]');
    this.trafficGenerationLink = page.locator('[data-testid="traffic-generation-link"]');
    this.shellExecutionLink = page.locator('[data-testid="shell-execution-link"]');
    this.occSectionLink = page.locator('[data-testid="occ-section-link"]');
    
    // Provisioning locators
    this.linesCountInput = page.locator('[data-testid="lines-count-input"]');
    this.planSelector = page.locator('[data-testid="plan-selector"]');
    this.soldPlanOption = page.locator('[data-testid="plan-option-sold"]');
    this.apnConfigInput = page.locator('[data-testid="apn-config-input"]');
    this.provisionButton = page.locator('[data-testid="provision-lines-button"]');
    this.provisionedLinesCounter = page.locator('[data-testid="provisioned-lines-counter"]');
    this.apnStatusIndicator = page.locator('[data-testid="apn-status-indicator"]');
    this.inPoolPackageStatus = page.locator('[data-testid="in-pool-package-status"]');
    
    // In Pool configuration locators
    this.totalInPoolBagDisplay = page.locator('[data-testid="total-in-pool-bag-display"]');
    this.calculateBagButton = page.locator('[data-testid="calculate-bag-button"]');
    
    // Traffic generation locators
    this.trafficAmountInput = page.locator('[data-testid="traffic-amount-input"]');
    this.apnSelectorDropdown = page.locator('[data-testid="apn-selector-dropdown"]');
    this.generateTrafficButton = page.locator('[data-testid="generate-traffic-button"]');
    this.udrTableTrafficValue = page.locator('[data-testid="udr-table-traffic-value"]');
    
    // Shell execution locators
    this.executeShellButton = page.locator('[data-testid="execute-shell-button"]');
    this.shellExecutionStatus = page.locator('[data-testid="shell-execution-status"]');
    this.consumptionStatusDisplay = page.locator('[data-testid="consumption-status-display"]');
    
    // OCC section locators
    this.occServicioInPoolRow = page.locator('[data-testid="occ-servicio-in-pool-row"]');
    this.occServicioInPoolAmount = page.locator('[data-testid="occ-servicio-in-pool-amount"]');
    this.occServicioInPoolGranelRow = page.locator('[data-testid="occ-servicio-in-pool-granel-row"]');
    this.occTableContainer = page.locator('[data-testid="occ-table-container"]');
  }

  async navigateToProvisioningSection() {
    await this.provisioningSectionLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLinesInSoldPlan(lineCount, apnName) {
    await this.linesCountInput.fill(lineCount.toString());
    await this.planSelector.click();
    await this.soldPlanOption.click();
    await this.apnConfigInput.fill(apnName);
    await this.provisionButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getProvisionedLinesCount() {
    const countText = await this.provisionedLinesCounter.textContent();
    return parseInt(countText, 10);
  }

  async verifyApnConfiguration(apnName) {
    const statusText = await this.apnStatusIndicator.textContent();
    return statusText.includes('active') || statusText.includes('activa');
  }

  async verifyInPoolPackageAssigned() {
    const statusText = await this.inPoolPackageStatus.textContent();
    return statusText.includes('assigned') || statusText.includes('asignado');
  }

  async navigateToInPoolConfiguration() {
    await this.inPoolConfigLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async calculateTotalInPoolBag() {
    await this.calculateBagButton.click();
    await this.page.waitForLoadState('networkidle');
    const bagText = await this.totalInPoolBagDisplay.textContent();
    return parseInt(bagText.replace(/[^0-9]/g, ''), 10);
  }

  async navigateToTrafficGeneration() {
    await this.trafficGenerationLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async generateTelemetryTraffic(amountMB, apnName) {
    await this.trafficAmountInput.fill(amountMB.toString());
    await this.apnSelectorDropdown.selectOption({ label: apnName });
    await this.generateTrafficButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getRegisteredTrafficInUdrTable() {
    const trafficText = await this.udrTableTrafficValue.textContent();
    return parseInt(trafficText.replace(/[^0-9]/g, ''), 10);
  }

  async navigateToShellExecution() {
    await this.shellExecutionLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async executeInPoolCalculationShell() {
    await this.executeShellButton.click();
    await this.shellExecutionStatus.waitFor({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
  }

  async getConsumptionStatus() {
    const statusText = await this.consumptionStatusDisplay.textContent();
    if (statusText.includes('within') || statusText.includes('dentro')) {
      return 'within_bag';
    }
    return 'exceeded';
  }

  async navigateToOccSection() {
    await this.occSectionLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyOccServicioInPoolGenerated() {
    return await this.occServicioInPoolRow.isVisible();
  }

  async getOccServicioInPoolAmount() {
    return await this.occServicioInPoolAmount.textContent();
  }

  async verifyOccServicioInPoolGranelNotGenerated() {
    return await this.occServicioInPoolGranelRow.isVisible();
  }
}

module.exports = InPoolTrafficPage;