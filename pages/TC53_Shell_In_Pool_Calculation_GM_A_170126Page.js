const { expect } = require('@playwright/test');

class ShellExecutionPage {
  constructor(page) {
    this.page = page;
    
    this.shellConsoleUrl = '/bscs7/shell-console';
    this.systemStatusIndicator = '[data-testid="bscs7-system-status"]';
    this.deployedShellsList = '[data-testid="deployed-shells-list"]';
    this.shellNameItem = '[data-testid="shell-name-item"]';
    this.executeShellButton = '[data-testid="execute-shell-btn"]';
    this.shellSelector = '[data-testid="shell-selector"]';
    this.controlTableSection = '[data-testid="control-table-section"]';
    this.processIdentifierField = '[data-testid="process-unique-id"]';
    this.processStatusIndicator = '[data-testid="process-status"]';
    this.queryLogsTab = '[data-testid="query-logs-tab"]';
    this.customerIdTableFilter = '[data-testid="filter-customer-id-table"]';
    this.queryResultsTable = '[data-testid="query-results-table"]';
    this.queryResultRow = '[data-testid="query-result-row"]';
    this.accountTypeColumn = '[data-testid="account-type-column"]';
    this.corporateIdentifierColumn = '[data-testid="corporate-identifier-column"]';
    this.executionLogsTab = '[data-testid="execution-logs-tab"]';
    this.currentExecutionFilter = '[data-testid="filter-current-execution"]';
    this.gmAccountCountLog = '[data-testid="gm-account-count-log"]';
    this.processedAccountsList = '[data-testid="processed-accounts-list"]';
    this.processedAccountRow = '[data-testid="processed-account-row"]';
    this.activeGMAccountsCounter = '[data-testid="active-gm-accounts-counter"]';
    this.gmAccountVerificationSection = '[data-testid="gm-account-verification"]';
    this.excludedAccountsSection = '[data-testid="excluded-accounts-section"]';
  }

  async navigateToShellConsole() {
    await this.page.goto(this.shellConsoleUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyBSCS7SystemAvailable() {
    await this.page.waitForSelector(this.systemStatusIndicator);
    const status = await this.page.locator(this.systemStatusIndicator).textContent();
    return status.toLowerCase().includes('available') || status.toLowerCase().includes('online');
  }

  async verifyShellDeployed(shellName) {
    await this.page.waitForSelector(this.deployedShellsList);
    const shells = await this.page.locator(this.shellNameItem).allTextContents();
    return shells.some(shell => shell.includes(shellName));
  }

  async verifyActiveGMAccountsExist() {
    await this.page.click(this.gmAccountVerificationSection);
    const counter = await this.page.locator(this.activeGMAccountsCounter).textContent();
    return parseInt(counter) > 0;
  }

  async executeShell(shellName) {
    await this.page.click(this.shellSelector);
    await this.page.locator(`[data-testid="shell-option-${shellName}"]`).click();
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.processStatusIndicator);
  }

  async verifyProcessRegisteredInControlTable() {
    await this.page.waitForSelector(this.controlTableSection);
    const isVisible = await this.page.locator(this.controlTableSection).isVisible();
    const hasProcessId = await this.page.locator(this.processIdentifierField).isVisible();
    return isVisible && hasProcessId;
  }

  async getProcessUniqueIdentifier() {
    await this.page.waitForSelector(this.processIdentifierField);
    return await this.page.locator(this.processIdentifierField).textContent();
  }

  async navigateToQueryLogs() {
    await this.page.click(this.queryLogsTab);
    await this.page.waitForLoadState('networkidle');
  }

  async filterByCustomerIdTable() {
    await this.page.click(this.customerIdTableFilter);
    await this.page.waitForSelector(this.queryResultsTable);
  }

  async getCustomerIdQueryResults() {
    await this.page.waitForSelector(this.queryResultsTable);
    const rows = await this.page.locator(this.queryResultRow).all();
    const results = [];
    for (const row of rows) {
      const customerId = await row.locator('[data-testid="customer-id-value"]').textContent();
      const accountType = await row.locator(this.accountTypeColumn).textContent();
      results.push({ customerId, accountType });
    }
    return results;
  }

  async verifyAllResultsAreGMAccounts(queryResults) {
    return queryResults.every(result => 
      result.accountType.toLowerCase().includes('general motors') || 
      result.accountType.toLowerCase().includes('gm')
    );
  }

  async verifyNonGMAccountsExcluded() {
    await this.page.waitForSelector(this.excludedAccountsSection);
    const excludedAccounts = await this.page.locator(`${this.excludedAccountsSection} [data-testid="excluded-account-row"]`).all();
    for (const account of excludedAccounts) {
      const accountType = await account.locator(this.accountTypeColumn).textContent();
      if (accountType.toLowerCase().includes('general motors') || accountType.toLowerCase().includes('gm')) {
        return false;
      }
    }
    return true;
  }

  async getProcessedAccounts() {
    await this.page.waitForSelector(this.processedAccountsList);
    const rows = await this.page.locator(this.processedAccountRow).all();
    const accounts = [];
    for (const row of rows) {
      const customerId = await row.locator('[data-testid="processed-customer-id"]').textContent();
      const corporateId = await row.locator(this.corporateIdentifierColumn).textContent();
      accounts.push({ customerId, corporateId });
    }
    return accounts;
  }

  async verifyOnlyCorporateGMIdentifier(processedAccounts) {
    const gmCorporateIdentifiers = ['GM', 'GENERAL_MOTORS', 'GM_CORP'];
    return processedAccounts.every(account => 
      gmCorporateIdentifiers.some(id => account.corporateId.toUpperCase().includes(id))
    );
  }

  async navigateToExecutionLogs() {
    await this.page.click(this.executionLogsTab);
    await this.page.waitForLoadState('networkidle');
  }

  async filterLogsByCurrentExecution() {
    await this.page.click(this.currentExecutionFilter);
    await this.page.waitForSelector(this.gmAccountCountLog);
  }

  async getLoggedGMAccountCount() {
    await this.page.waitForSelector(this.gmAccountCountLog);
    const countText = await this.page.locator(this.gmAccountCountLog).textContent();
    const match = countText.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  async getTotalActiveGMAccountsInSystem() {
    await this.page.waitForSelector(this.activeGMAccountsCounter);
    const counterText = await this.page.locator(this.activeGMAccountsCounter).textContent();
    return parseInt(counterText);
  }
}

module.exports = ShellExecutionPage;