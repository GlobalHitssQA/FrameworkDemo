const { expect } = require('@playwright/test');

class ShellExecutionPage {
  constructor(page) {
    this.page = page;
    
    // System Console Locators
    this.systemConsoleContainer = '[data-testid="system-console-container"]';
    this.bscs7StatusIndicator = '[data-testid="bscs7-status-indicator"]';
    this.shellDeploymentPanel = '[data-testid="shell-deployment-panel"]';
    this.shellListItem = '[data-testid="shell-list-item"]';
    
    // Database Table Locators
    this.tableExplorerPanel = '[data-testid="table-explorer-panel"]';
    this.tableNameInput = '[data-testid="table-name-input"]';
    this.tableSearchButton = '[data-testid="table-search-button"]';
    this.tableExistsIndicator = '[data-testid="table-exists-indicator"]';
    this.tableRecordCount = '[data-testid="table-record-count"]';
    
    // Traffic Records Locators
    this.trafficRecordsGrid = '[data-testid="traffic-records-grid"]';
    this.insertRecordsButton = '[data-testid="insert-records-button"]';
    this.planTypeSelector = '[data-testid="plan-type-selector"]';
    this.apnCheckboxContainer = '[data-testid="apn-checkbox-container"]';
    this.apnCheckbox = '[data-testid="apn-checkbox"]';
    this.insertConfirmButton = '[data-testid="insert-confirm-button"]';
    this.insertedRecordsCounter = '[data-testid="inserted-records-counter"]';
    
    // Shell Execution Locators
    this.shellExecutionPanel = '[data-testid="shell-execution-panel"]';
    this.shellNameSelector = '[data-testid="shell-name-selector"]';
    this.executeShellButton = '[data-testid="execute-shell-button"]';
    this.shellStatusIndicator = '[data-testid="shell-status-indicator"]';
    this.shellExecutionLog = '[data-testid="shell-execution-log"]';
    
    // Temporary Table Locators
    this.tempTablePanel = '[data-testid="temp-table-panel"]';
    this.createTempTableButton = '[data-testid="create-temp-table-button"]';
    this.tempTableStatus = '[data-testid="temp-table-status"]';
    this.tempTableRecordGrid = '[data-testid="temp-table-record-grid"]';
    this.tempTableRecordCount = '[data-testid="temp-table-record-count"]';
    
    // Validation Locators
    this.costValidationPanel = '[data-testid="cost-validation-panel"]';
    this.zeroCostIndicator = '[data-testid="zero-cost-indicator"]';
    this.inPoolConfigPanel = '[data-testid="in-pool-config-panel"]';
    this.inPoolCostValue = '[data-testid="in-pool-cost-value"]';
    this.apnFilterResults = '[data-testid="apn-filter-results"]';
  }

  async navigateToSystemConsole() {
    await this.page.goto('/system/console');
    await this.page.waitForSelector(this.systemConsoleContainer);
  }

  async verifyBSCS7SystemAvailable() {
    const statusElement = await this.page.locator(this.bscs7StatusIndicator);
    const statusText = await statusElement.textContent();
    return statusText.includes('Available') || statusText.includes('Online');
  }

  async verifyShellDeployed(shellName) {
    await this.page.click(this.shellDeploymentPanel);
    const shellItems = await this.page.locator(`${this.shellListItem}:has-text("${shellName}")`);
    return await shellItems.count() > 0;
  }

  async verifyTableExists(tableName) {
    await this.page.click(this.tableExplorerPanel);
    await this.page.fill(this.tableNameInput, tableName);
    await this.page.click(this.tableSearchButton);
    await this.page.waitForSelector(this.tableExistsIndicator);
    const indicator = await this.page.locator(this.tableExistsIndicator);
    const text = await indicator.textContent();
    return text.includes('Exists') || text.includes('Found');
  }

  async createTemporaryWorkTable() {
    await this.page.click(this.tempTablePanel);
    await this.page.click(this.createTempTableButton);
    await this.page.waitForSelector(this.tempTableStatus);
  }

  async verifyTemporaryTableEmpty() {
    const countElement = await this.page.locator(this.tempTableRecordCount);
    const countText = await countElement.textContent();
    return parseInt(countText) === 0;
  }

  async verifyInPoolPackageZeroCost() {
    await this.page.click(this.inPoolConfigPanel);
    const costElement = await this.page.locator(this.inPoolCostValue);
    const costText = await costElement.textContent();
    return parseFloat(costText) === 0;
  }

  async insertTestTrafficRecords(planType, apnList) {
    await this.page.click(this.insertRecordsButton);
    await this.page.selectOption(this.planTypeSelector, planType);
    
    for (const apn of apnList) {
      const apnCheckboxLocator = `${this.apnCheckbox}[data-apn="${apn}"]`;
      await this.page.check(apnCheckboxLocator);
    }
    
    await this.page.click(this.insertConfirmButton);
    await this.page.waitForSelector(this.insertedRecordsCounter);
  }

  async getInsertedRecordsCount() {
    const counterElement = await this.page.locator(this.insertedRecordsCounter);
    const countText = await counterElement.textContent();
    return parseInt(countText);
  }

  async executeShell(shellName) {
    await this.page.click(this.shellExecutionPanel);
    await this.page.selectOption(this.shellNameSelector, shellName);
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.shellStatusIndicator);
  }

  async getShellExecutionStatus() {
    const statusElement = await this.page.locator(this.shellStatusIndicator);
    const statusText = await statusElement.textContent();
    return statusText.toLowerCase();
  }

  async verifyRecordsReadFromUDR() {
    const logElement = await this.page.locator(this.shellExecutionLog);
    const logText = await logElement.textContent();
    return logText.includes('UDR_LT_01') && logText.includes('records read');
  }

  async getTemporaryTableRecordCount() {
    await this.page.click(this.tempTablePanel);
    const countElement = await this.page.locator(this.tempTableRecordCount);
    const countText = await countElement.textContent();
    return parseInt(countText);
  }

  async verifyAllSOLDRecordsInTempTable() {
    const gridElement = await this.page.locator(this.tempTableRecordGrid);
    const gridText = await gridElement.textContent();
    return gridText.includes('SOLD');
  }

  async verifyAllCycleLinesIncluded() {
    const logElement = await this.page.locator(this.shellExecutionLog);
    const logText = await logElement.textContent();
    return logText.includes('All cycle lines processed') || logText.includes('SOLD lines included');
  }

  async verifyUDRRecordsZeroCost() {
    await this.page.click(this.costValidationPanel);
    const zeroCostElement = await this.page.locator(this.zeroCostIndicator);
    const indicatorText = await zeroCostElement.textContent();
    return indicatorText.includes('Zero') || indicatorText.includes('0.00');
  }

  async verifyNoExcludedAPNsInTempTable(excludedAPNs) {
    await this.page.click(this.tempTablePanel);
    const gridElement = await this.page.locator(this.tempTableRecordGrid);
    const gridText = await gridElement.textContent();
    
    for (const apn of excludedAPNs) {
      if (gridText.includes(apn)) {
        return true;
      }
    }
    return false;
  }
}

module.exports = ShellExecutionPage;