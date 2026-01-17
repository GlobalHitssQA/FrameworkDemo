const { expect } = require('@playwright/test');

class ShellExecutionPage {
  constructor(page) {
    this.page = page;
    
    this.systemConsoleLink = '[data-testid="system-console-link"]';
    this.systemStatusIndicator = '[data-testid="system-status-indicator"]';
    this.shellDeploymentStatus = '[data-testid="shell-deployment-status"]';
    this.databaseConsoleLink = '[data-testid="database-console-link"]';
    this.soldPlanLineTable = '[data-testid="sold-plan-line-table"]';
    this.udrTableStatus = '[data-testid="udr-table-status"]';
    this.sqlQueryInput = '[data-testid="sql-query-input"]';
    this.executeQueryButton = '[data-testid="execute-query-button"]';
    this.queryResultsTable = '[data-testid="query-results-table"]';
    this.insertSuccessMessage = '[data-testid="insert-success-message"]';
    this.shellExecutionLink = '[data-testid="shell-execution-link"]';
    this.shellScriptSelector = '[data-testid="shell-script-selector"]';
    this.executeShellButton = '[data-testid="execute-shell-button"]';
    this.shellExecutionStatus = '[data-testid="shell-execution-status"]';
    this.summarizedTrafficTotal = '[data-testid="summarized-traffic-total"]';
    this.excludedTrafficSection = '[data-testid="excluded-traffic-section"]';
    this.inPoolTrafficDetails = '[data-testid="in-pool-traffic-details"]';
    this.executionLogsLink = '[data-testid="execution-logs-link"]';
    this.executionLogContent = '[data-testid="execution-log-content"]';
    this.apnFilteringLogSection = '[data-testid="apn-filtering-log-section"]';
  }

  async navigateToSystemConsole() {
    await this.page.click(this.systemConsoleLink);
    await this.page.waitForLoadState('networkidle');
  }

  async verifySystemAvailability() {
    const status = await this.page.locator(this.systemStatusIndicator);
    await expect(status).toHaveText('BSCS7 Online');
  }

  async verifyShellDeployment() {
    const deploymentStatus = await this.page.locator(this.shellDeploymentStatus);
    await expect(deploymentStatus).toContainText('sh_BSCS_calculaFacturaGM');
    await expect(deploymentStatus).toContainText('Deployed');
  }

  async navigateToDatabaseConsole() {
    await this.page.click(this.databaseConsoleLink);
    await this.page.waitForLoadState('networkidle');
  }

  async verifySOLDPlanLineExists() {
    const table = await this.page.locator(this.soldPlanLineTable);
    await expect(table).toBeVisible();
    const rowCount = await table.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThan(0);
  }

  async verifyUDRTableAccessible() {
    const udrStatus = await this.page.locator(this.udrTableStatus);
    await expect(udrStatus).toHaveText('UDR_LT_01 Accessible');
  }

  async insertTrafficRecords(records) {
    for (const record of records) {
      const insertQuery = `INSERT INTO UDR_LT_01 (APN_NAME, TRAFFIC_MB, RECORD_DATE) VALUES ('${record.apn}', ${record.megabytes}, SYSDATE)`;
      await this.page.fill(this.sqlQueryInput, insertQuery);
      await this.page.click(this.executeQueryButton);
      await this.page.waitForSelector(this.insertSuccessMessage);
    }
  }

  async verifyRecordsInserted() {
    const successMessage = await this.page.locator(this.insertSuccessMessage);
    await expect(successMessage).toBeVisible();
  }

  async navigateToShellExecution() {
    await this.page.click(this.shellExecutionLink);
    await this.page.waitForLoadState('networkidle');
  }

  async executeShellScript(scriptName) {
    await this.page.selectOption(this.shellScriptSelector, scriptName);
    await this.page.click(this.executeShellButton);
  }

  async waitForShellCompletion() {
    await this.page.waitForSelector(`${this.shellExecutionStatus}:has-text("Completed")`, { timeout: 60000 });
  }

  async getSummarizedTrafficTotal() {
    const totalElement = await this.page.locator(this.summarizedTrafficTotal);
    const totalText = await totalElement.textContent();
    return parseInt(totalText.replace(/[^0-9]/g, ''), 10);
  }

  async getExcludedAPNTraffic() {
    const excludedSection = await this.page.locator(this.excludedTrafficSection);
    const apn2Traffic = await excludedSection.locator('[data-testid="apn2-traffic"]').textContent();
    const apn5Traffic = await excludedSection.locator('[data-testid="apn5-traffic"]').textContent();
    const apn6Traffic = await excludedSection.locator('[data-testid="apn6-traffic"]').textContent();
    return {
      apn2: parseInt(apn2Traffic, 10),
      apn5: parseInt(apn5Traffic, 10),
      apn6: parseInt(apn6Traffic, 10)
    };
  }

  async getInPoolTrafficDetails() {
    const inPoolDetails = await this.page.locator(this.inPoolTrafficDetails);
    return await inPoolDetails.textContent();
  }

  async navigateToExecutionLogs() {
    await this.page.click(this.executionLogsLink);
    await this.page.waitForLoadState('networkidle');
  }

  async getExecutionLogContent() {
    const logContent = await this.page.locator(this.executionLogContent);
    return await logContent.textContent();
  }
}

module.exports = ShellExecutionPage;