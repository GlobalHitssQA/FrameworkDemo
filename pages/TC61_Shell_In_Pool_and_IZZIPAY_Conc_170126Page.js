class ShellExecutionPage {
  constructor(page) {
    this.page = page;
    
    this.shellManagementSection = '[data-testid="shell-management-section"]';
    this.sharedTablesPanel = '[data-testid="shared-tables-panel"]';
    this.processControlTable = '[data-testid="process-control-table"]';
    this.temporaryTablesStatus = '[data-testid="temporary-tables-status"]';
    this.activeProcessIndicator = '[data-testid="active-process-indicator"]';
    
    this.shellIzzipayButton = '[data-testid="execute-shell-izzipay-btn"]';
    this.shellInPoolButton = '[data-testid="execute-shell-inpool-btn"]';
    this.izzipayProcessRow = '[data-testid="izzipay-process-row"]';
    this.izzipayUniqueId = '[data-testid="izzipay-unique-identifier"]';
    this.izzipayStatusCell = '[data-testid="izzipay-status-cell"]';
    
    this.inPoolProcessRow = '[data-testid="inpool-process-row"]';
    this.inPoolStatusCell = '[data-testid="inpool-status-cell"]';
    this.blockingMessage = '[data-testid="blocking-message"]';
    this.waitingMessage = '[data-testid="waiting-message"]';
    
    this.sharedTablesStatusIndicator = '[data-testid="shared-tables-status"]';
    this.executionSuccessMessage = '[data-testid="execution-success-message"]';
    this.conflictWarning = '[data-testid="conflict-warning"]';
    
    this.refreshStatusButton = '[data-testid="refresh-status-btn"]';
    this.processLogPanel = '[data-testid="process-log-panel"]';
  }

  async navigateToShellManagement() {
    await this.page.click('[data-testid="nav-shell-management"]');
    await this.page.waitForSelector(this.shellManagementSection);
  }

  async verifySharedTablesConfiguration() {
    await this.page.waitForSelector(this.sharedTablesPanel);
    const isVisible = await this.page.isVisible(this.sharedTablesPanel);
    return isVisible;
  }

  async verifyTablesAvailableWithoutActiveProcesses() {
    await this.page.waitForSelector(this.processControlTable);
    const activeProcesses = await this.page.locator(this.activeProcessIndicator).count();
    return activeProcesses === 0;
  }

  async executeShellIzzipay() {
    await this.page.click(this.shellIzzipayButton);
    await this.page.waitForSelector(this.izzipayProcessRow);
  }

  async verifyIzzipayProcessRegistered() {
    const isVisible = await this.page.isVisible(this.izzipayProcessRow);
    return isVisible;
  }

  async verifyIzzipayHasUniqueIdentifier() {
    const uniqueId = await this.page.textContent(this.izzipayUniqueId);
    return uniqueId && uniqueId.trim().length > 0;
  }

  async attemptExecuteShellInPool() {
    await this.page.click(this.shellInPoolButton);
    await this.page.waitForTimeout(1000);
  }

  async verifyInPoolExecutionBlocked() {
    const statusText = await this.page.textContent(this.inPoolStatusCell);
    return statusText && (statusText.includes('Blocked') || statusText.includes('Waiting'));
  }

  async isBlockingMessageVisible() {
    const blockingVisible = await this.page.isVisible(this.blockingMessage);
    const waitingVisible = await this.page.isVisible(this.waitingMessage);
    return blockingVisible || waitingVisible;
  }

  async waitForIzzipayCompletion() {
    await this.page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        return element && element.textContent.includes('Finished');
      },
      this.izzipayStatusCell,
      { timeout: 120000 }
    );
  }

  async verifySharedTablesReleased() {
    const statusText = await this.page.textContent(this.sharedTablesStatusIndicator);
    return statusText && statusText.includes('Available');
  }

  async verifyIzzipayStatusFinished() {
    const statusText = await this.page.textContent(this.izzipayStatusCell);
    return statusText && statusText.includes('Finished');
  }

  async executeShellInPool() {
    await this.page.click(this.shellInPoolButton);
    await this.page.waitForSelector(this.inPoolProcessRow);
  }

  async verifyInPoolExecutedSuccessfully() {
    const successVisible = await this.page.isVisible(this.executionSuccessMessage);
    const statusText = await this.page.textContent(this.inPoolStatusCell);
    return successVisible || (statusText && statusText.includes('Running'));
  }

  async verifyNoConflictWithIzzipay() {
    const conflictVisible = await this.page.isVisible(this.conflictWarning);
    return !conflictVisible;
  }
}

module.exports = ShellExecutionPage;