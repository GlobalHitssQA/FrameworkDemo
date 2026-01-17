class InPoolCalculationPage {
  constructor(page) {
    this.page = page;
    this.systemStatusIndicator = '[data-testid="bscs7-system-status"]';
    this.lineConfigurationSection = '[data-testid="line-configuration-section"]';
    this.lineSelector = '[data-testid="line-selector"]';
    this.planTypeDropdown = '[data-testid="plan-type-dropdown"]';
    this.soldPlanOption = '[data-testid="plan-option-sold"]';
    this.apnSelector = '[data-testid="apn-selector"]';
    this.apn4Option = '[data-testid="apn-onstar01-v6"]';
    this.consumptionInput = '[data-testid="consumption-mb-input"]';
    this.saveConfigurationButton = '[data-testid="save-line-configuration"]';
    this.udrRecordsTable = '[data-testid="udr-lt-01-records-table"]';
    this.executeShellButton = '[data-testid="execute-sh-bscs-calcula-factura"]';
    this.shellExecutionStatus = '[data-testid="shell-execution-status"]';
    this.temporaryWorkTable = '[data-testid="temp-work-table"]';
    this.totalTrafficDisplay = '[data-testid="total-apn4-traffic"]';
    this.assignedBucketDisplay = '[data-testid="assigned-in-pool-bucket"]';
    this.excessIndicator = '[data-testid="bulk-excess-indicator"]';
    this.inPoolSummarySection = '[data-testid="in-pool-summary-section"]';
  }

  async navigateToSystem() {
    await this.page.goto('/bscs7/in-pool-calculation');
    await this.page.waitForLoadState('networkidle');
  }

  async verifySystemOperational() {
    await this.page.waitForSelector(this.systemStatusIndicator);
    const statusText = await this.page.textContent(this.systemStatusIndicator);
    return statusText.includes('Operational') || statusText.includes('Active');
  }

  async configureLineConsumption(lineName, consumptionMb) {
    await this.page.click(this.lineConfigurationSection);
    await this.page.selectOption(this.lineSelector, { label: lineName });
    await this.page.click(this.planTypeDropdown);
    await this.page.click(this.soldPlanOption);
    await this.page.click(this.apnSelector);
    await this.page.click(this.apn4Option);
    await this.page.fill(this.consumptionInput, consumptionMb.toString());
    await this.page.click(this.saveConfigurationButton);
    await this.page.waitForSelector(`[data-testid="line-${lineName.toLowerCase()}-configured"]`);
  }

  async verifyConsumptionRegisteredInUDR() {
    await this.page.waitForSelector(this.udrRecordsTable);
    const rows = await this.page.locator(`${this.udrRecordsTable} tbody tr`).count();
    return rows >= 10;
  }

  async executeCalculationShell() {
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(`${this.shellExecutionStatus}:has-text("Completed")`, { timeout: 60000 });
  }

  async verifyTrafficExtraction() {
    await this.page.waitForSelector(this.temporaryWorkTable);
    const extractedRecords = await this.page.locator(`${this.temporaryWorkTable} tbody tr`).count();
    return extractedRecords >= 10;
  }

  async getTotalAPN4Traffic() {
    await this.page.waitForSelector(this.totalTrafficDisplay);
    const totalText = await this.page.textContent(this.totalTrafficDisplay);
    return parseInt(totalText.replace(/[^0-9]/g, ''), 10);
  }

  async calculateAssignedBucket(lineCount) {
    const mbPerLine = 10;
    const calculatedBucket = lineCount * mbPerLine;
    await this.page.waitForSelector(this.assignedBucketDisplay);
    const displayedBucket = await this.page.textContent(this.assignedBucketDisplay);
    const displayedValue = parseInt(displayedBucket.replace(/[^0-9]/g, ''), 10);
    return displayedValue === calculatedBucket ? calculatedBucket : displayedValue;
  }

  async verifyNoExcessGenerated(consumption, bucket) {
    if (consumption <= bucket) {
      const excessVisible = await this.page.isVisible(this.excessIndicator);
      if (excessVisible) {
        const excessText = await this.page.textContent(this.excessIndicator);
        return excessText.includes('Excess') || excessText.includes('Exceeded');
      }
      return false;
    }
    return true;
  }
};

module.exports = InPoolCalculationPage;