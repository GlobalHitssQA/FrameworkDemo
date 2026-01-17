const { expect } = require('@playwright/test');

class ShellCalculationPage {
  constructor(page) {
    this.page = page;
    
    this.systemStatusIndicator = page.locator('[data-testid="system-status-indicator"]');
    this.shellStatusBadge = page.locator('[data-testid="shell-status-badge"]');
    this.activeLinesCount = page.locator('[data-testid="active-lines-count"]');
    this.assignedPoolDisplay = page.locator('[data-testid="assigned-pool-display"]');
    this.udrTableStatus = page.locator('[data-testid="udr-table-status"]');
    this.apnDataList = page.locator('[data-testid="apn-data-list"]');
    this.consumptionInput = page.locator('[data-testid="consumption-input"]');
    this.applyScenarioButton = page.locator('[data-testid="apply-scenario-btn"]');
    this.executeShellButton = page.locator('[data-testid="execute-shell-btn"]');
    this.calculatedPoolValue = page.locator('[data-testid="calculated-pool-value"]');
    this.calculatedConsumptionValue = page.locator('[data-testid="calculated-consumption-value"]');
    this.surplusIndicator = page.locator('[data-testid="surplus-indicator"]');
    this.surplusValue = page.locator('[data-testid="surplus-value"]');
    this.auditLogsButton = page.locator('[data-testid="audit-logs-btn"]');
    this.auditLogPanel = page.locator('[data-testid="audit-log-panel"]');
    this.logAssignedPool = page.locator('[data-testid="log-assigned-pool"]');
    this.logTotalConsumption = page.locator('[data-testid="log-total-consumption"]');
    this.logSurplus = page.locator('[data-testid="log-surplus"]');
    this.modifyScenarioButton = page.locator('[data-testid="modify-scenario-btn"]');
    this.planTypeSelector = page.locator('[data-testid="plan-type-selector"]');
    this.executionResultPanel = page.locator('[data-testid="execution-result-panel"]');
  }

  async navigateToSystem() {
    await this.page.goto('/bscs7/shell-management');
    await this.page.waitForLoadState('networkidle');
  }

  async verifySystemAvailability() {
    await expect(this.systemStatusIndicator).toBeVisible();
    const status = await this.systemStatusIndicator.textContent();
    expect(status).toContain('Available');
  }

  async verifyShellDeployed() {
    await expect(this.shellStatusBadge).toBeVisible();
    const shellStatus = await this.shellStatusBadge.textContent();
    expect(shellStatus).toContain('sh_BSCS_calculaFacturaGM');
  }

  async verifyActiveLinesInSOLDPlan(expectedCount) {
    await this.planTypeSelector.selectOption('SOLD');
    await this.page.waitForLoadState('networkidle');
    const countText = await this.activeLinesCount.textContent();
    const count = parseInt(countText, 10);
    expect(count).toBe(expectedCount);
  }

  async verifyAssignedPoolSize(expectedPoolMB) {
    const poolText = await this.assignedPoolDisplay.textContent();
    const poolValue = parseInt(poolText.replace(/[^0-9]/g, ''), 10);
    expect(poolValue).toBe(expectedPoolMB);
  }

  async verifyUDRTableContainsData() {
    await expect(this.udrTableStatus).toBeVisible();
    const status = await this.udrTableStatus.textContent();
    expect(status).toContain('UDR_LT_01');
  }

  async verifyAPNDataPresent(apnList) {
    const apnDataText = await this.apnDataList.textContent();
    for (const apn of apnList) {
      expect(apnDataText).toContain(apn);
    }
  }

  async configureConsumptionScenario(consumptionMB) {
    await this.consumptionInput.clear();
    await this.consumptionInput.fill(consumptionMB.toString());
    await this.applyScenarioButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async modifyConsumptionScenario(consumptionMB) {
    await this.modifyScenarioButton.click();
    await this.consumptionInput.clear();
    await this.consumptionInput.fill(consumptionMB.toString());
    await this.applyScenarioButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async executeShellCalculation() {
    await this.executeShellButton.click();
    await expect(this.executionResultPanel).toBeVisible({ timeout: 30000 });
  }

  async getCalculatedPoolValue() {
    const poolText = await this.calculatedPoolValue.textContent();
    return parseInt(poolText.replace(/[^0-9]/g, ''), 10);
  }

  async getCalculatedConsumptionValue() {
    const consumptionText = await this.calculatedConsumptionValue.textContent();
    return parseInt(consumptionText.replace(/[^0-9]/g, ''), 10);
  }

  async checkSurplusExists() {
    const indicatorText = await this.surplusIndicator.textContent();
    return indicatorText.toLowerCase().includes('yes') || indicatorText.toLowerCase().includes('exists');
  }

  async getSurplusValue() {
    const surplusText = await this.surplusValue.textContent();
    const value = parseInt(surplusText.replace(/[^0-9]/g, ''), 10);
    return isNaN(value) ? 0 : value;
  }

  async openAuditLogs() {
    await this.auditLogsButton.click();
    await expect(this.auditLogPanel).toBeVisible();
  }

  async getAuditLogData() {
    const assignedPoolText = await this.logAssignedPool.textContent();
    const totalConsumptionText = await this.logTotalConsumption.textContent();
    const surplusText = await this.logSurplus.textContent();
    
    return {
      assignedPool: parseInt(assignedPoolText.replace(/[^0-9]/g, ''), 10),
      totalConsumption: parseInt(totalConsumptionText.replace(/[^0-9]/g, ''), 10),
      surplus: parseInt(surplusText.replace(/[^0-9]/g, ''), 10) || 0
    };
  }
}

module.exports = ShellCalculationPage;