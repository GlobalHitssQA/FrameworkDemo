const { expect } = require('@playwright/test');

class PreBillingShellPage {
  constructor(page) {
    this.page = page;
    
    this.systemMonitorLink = '[data-testid="system-monitor-link"]';
    this.bscs7StatusIndicator = '[data-testid="bscs7-status-indicator"]';
    this.parameterTableStatus = '[data-testid="parameter-table-status"]';
    this.processSchedulerTab = '[data-testid="process-scheduler-tab"]';
    this.searchScheduleInput = '[data-testid="search-schedule-input"]';
    this.gmPreBillingRow = '[data-testid="gm-prebilling-schedule-row"]';
    this.cutoffDayField = '[data-testid="cutoff-day-field"]';
    this.startDateTimeField = '[data-testid="start-datetime-field"]';
    this.shellExecutionPanel = '[data-testid="shell-execution-panel"]';
    this.shellSelector = '[data-testid="shell-selector"]';
    this.executeShellButton = '[data-testid="execute-shell-button"]';
    this.shellStatusIndicator = '[data-testid="shell-status-indicator"]';
    this.processControlTable = '[data-testid="process-control-table"]';
    this.processIdCell = '[data-testid="process-id-cell"]';
    this.systemLogsTab = '[data-testid="system-logs-tab"]';
    this.shellExecutionFilter = '[data-testid="shell-execution-filter"]';
    this.gmShellLogEntry = '[data-testid="gm-shell-log-entry"]';
    this.izzipayShellLogEntry = '[data-testid="izzipay-shell-log-entry"]';
    this.conflictWarningBanner = '[data-testid="conflict-warning-banner"]';
    this.documentAllTableLink = '[data-testid="document-all-table-link"]';
    this.occSearchInput = '[data-testid="occ-search-input"]';
    this.occRegistrationStatus = '[data-testid="occ-registration-status"]';
    this.occAvailabilityStatus = '[data-testid="occ-availability-status"]';
    this.preBillingMonitorTab = '[data-testid="prebilling-monitor-tab"]';
    this.preBillingStatusIndicator = '[data-testid="prebilling-status-indicator"]';
    this.preBillingErrorsPanel = '[data-testid="prebilling-errors-panel"]';
    this.preBillingInconsistenciesPanel = '[data-testid="prebilling-inconsistencies-panel"]';
    this.occsProcessedCounter = '[data-testid="occs-processed-counter"]';
  }

  async navigateToSystemMonitor() {
    await this.page.click(this.systemMonitorLink);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyBSCS7SystemAvailability() {
    const statusElement = await this.page.locator(this.bscs7StatusIndicator);
    const status = await statusElement.textContent();
    return status.toLowerCase().includes('available') || status.toLowerCase().includes('online');
  }

  async verifyParameterTableConfiguration() {
    const statusElement = await this.page.locator(this.parameterTableStatus);
    const status = await statusElement.textContent();
    return status.toLowerCase().includes('configured') || status.toLowerCase().includes('active');
  }

  async openProcessScheduler() {
    await this.page.click(this.processSchedulerTab);
    await this.page.waitForLoadState('networkidle');
  }

  async searchGMPreBillingSchedule() {
    await this.page.fill(this.searchScheduleInput, 'General Motors');
    await this.page.keyboard.press('Enter');
    await this.page.waitForSelector(this.gmPreBillingRow);
  }

  async getPreBillingScheduleInfo() {
    const cutoffDay = await this.page.locator(this.cutoffDayField).textContent();
    const startDateTime = await this.page.locator(this.startDateTimeField).textContent();
    return {
      cutoffDay: cutoffDay.trim(),
      startDateTime: startDateTime.trim()
    };
  }

  async navigateToShellExecutionPanel() {
    await this.page.click(this.shellExecutionPanel);
    await this.page.waitForLoadState('networkidle');
  }

  async selectShell(shellName) {
    await this.page.click(this.shellSelector);
    await this.page.locator(`text=${shellName}`).click();
  }

  async executeShellManually() {
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.shellStatusIndicator);
  }

  async getShellExecutionStatus() {
    const statusElement = await this.page.locator(this.shellStatusIndicator);
    const status = await statusElement.textContent();
    return {
      started: status.toLowerCase().includes('running') || status.toLowerCase().includes('started')
    };
  }

  async getProcessControlTableEntry() {
    await this.page.waitForSelector(this.processControlTable);
    const processId = await this.page.locator(this.processIdCell).first().textContent();
    return processId.trim();
  }

  async navigateToSystemLogs() {
    await this.page.click(this.systemLogsTab);
    await this.page.waitForLoadState('networkidle');
  }

  async filterLogsByShellExecution() {
    await this.page.click(this.shellExecutionFilter);
    await this.page.waitForLoadState('networkidle');
  }

  async checkShellExecutionConflicts() {
    const hasConflicts = await this.page.locator(this.conflictWarningBanner).isVisible();
    const gmShellTime = await this.page.locator(this.gmShellLogEntry).getAttribute('data-execution-time');
    const izzipayShellTime = await this.page.locator(this.izzipayShellLogEntry).getAttribute('data-execution-time');
    return {
      hasConflicts,
      gmShellTime,
      izzipayShellTime
    };
  }

  async waitForShellCompletion() {
    await this.page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        return element && (element.textContent.toLowerCase().includes('completed') || element.textContent.toLowerCase().includes('finished'));
      },
      this.shellStatusIndicator,
      { timeout: 300000 }
    );
  }

  async navigateToDocumentAllTable() {
    await this.page.click(this.documentAllTableLink);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyOCCRegistration(occType) {
    await this.page.fill(this.occSearchInput, occType);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
    
    const registrationStatus = await this.page.locator(this.occRegistrationStatus).textContent();
    const availabilityStatus = await this.page.locator(this.occAvailabilityStatus).textContent();
    
    return {
      registered: registrationStatus.toLowerCase().includes('registered') || registrationStatus.toLowerCase().includes('active'),
      availableForPreBilling: availabilityStatus.toLowerCase().includes('available') || availabilityStatus.toLowerCase().includes('ready')
    };
  }

  async navigateToPreBillingMonitor() {
    await this.page.click(this.preBillingMonitorTab);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForPreBillingStart() {
    await this.page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        return element && (element.textContent.toLowerCase().includes('running') || element.textContent.toLowerCase().includes('processing'));
      },
      this.preBillingStatusIndicator,
      { timeout: 600000 }
    );
  }

  async getPreBillingProcessingStatus() {
    const errorsPanel = await this.page.locator(this.preBillingErrorsPanel);
    const inconsistenciesPanel = await this.page.locator(this.preBillingInconsistenciesPanel);
    const occsCounter = await this.page.locator(this.occsProcessedCounter);
    
    const errorsText = await errorsPanel.textContent();
    const inconsistenciesText = await inconsistenciesPanel.textContent();
    const occsProcessedText = await occsCounter.textContent();
    
    const errors = errorsText.trim() === '' || errorsText.trim() === '0' ? [] : errorsText.split(',');
    const inconsistencies = inconsistenciesText.trim() === '' || inconsistenciesText.trim() === '0' ? [] : inconsistenciesText.split(',');
    const occsProcessed = parseInt(occsProcessedText.replace(/\D/g, ''), 10) || 0;
    
    return {
      errors,
      inconsistencies,
      occsProcessed
    };
  }
}

module.exports = PreBillingShellPage;