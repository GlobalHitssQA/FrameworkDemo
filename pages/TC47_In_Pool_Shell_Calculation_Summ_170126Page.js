const { expect } = require('@playwright/test');

class InPoolCalculationPage {
  constructor(page) {
    this.page = page;
    
    // System navigation and status locators
    this._systemStatusIndicator = '[data-testid="bscs7-system-status"]';
    this._systemOperationalBadge = '[data-testid="system-operational-badge"]';
    
    // Line configuration locators
    this._lineConfigurationSection = '[data-testid="line-configuration-section"]';
    this._soldPlanSelector = '[data-testid="sold-plan-selector"]';
    this._lineNumberInput = '[data-testid="line-number-input"]';
    this._consumptionInput = '[data-testid="consumption-mb-input"]';
    this._apnSelector = '[data-testid="apn-selector"]';
    this._saveLineConfigButton = '[data-testid="save-line-config-button"]';
    this._configuredLinesCount = '[data-testid="configured-lines-count"]';
    
    // UDR table locators
    this._udrTableSection = '[data-testid="udr-lt-01-table-section"]';
    this._udrRecordsTable = '[data-testid="udr-records-table"]';
    this._udrRecordRow = '[data-testid="udr-record-row"]';
    this._udrApnFilter = '[data-testid="udr-apn-filter"]';
    this._udrRecordsCountDisplay = '[data-testid="udr-records-count"]';
    
    // Shell execution locators
    this._shellExecutionSection = '[data-testid="shell-execution-section"]';
    this._executeShellButton = '[data-testid="execute-shell-button"]';
    this._shellStatusIndicator = '[data-testid="shell-status-indicator"]';
    this._shellSuccessMessage = '[data-testid="shell-success-message"]';
    
    // Temporary work table locators
    this._tempWorkTableSection = '[data-testid="temp-work-table-section"]';
    this._extractedRecordsCount = '[data-testid="extracted-records-count"]';
    
    // Traffic calculation locators
    this._trafficCalculationSection = '[data-testid="traffic-calculation-section"]';
    this._totalTrafficDisplay = '[data-testid="total-traffic-mb-display"]';
    this._trafficBreakdownTable = '[data-testid="traffic-breakdown-table"]';
    
    // In Pool bag locators
    this._inPoolBagSection = '[data-testid="in-pool-bag-section"]';
    this._assignedBagDisplay = '[data-testid="assigned-bag-mb-display"]';
    this._linesCountForBag = '[data-testid="lines-count-for-bag"]';
    this._bagPerLineValue = '[data-testid="bag-per-line-mb"]';
    
    // Consumption comparison locators
    this._consumptionComparisonSection = '[data-testid="consumption-comparison-section"]';
    this._consumptionStatusIndicator = '[data-testid="consumption-status-indicator"]';
    this._excessBulkIndicator = '[data-testid="excess-bulk-indicator"]';
    this._withinBagBadge = '[data-testid="within-bag-badge"]';
  }

  async navigateToSystem() {
    await this.page.goto('/bscs7/in-pool-calculation');
    await this.page.waitForLoadState('networkidle');
  }

  async verifySystemOperational() {
    await this.page.waitForSelector(this._systemStatusIndicator);
    const statusBadge = await this.page.locator(this._systemOperationalBadge);
    return await statusBadge.isVisible();
  }

  async configureLineInSOLDPlan(lineNumber, consumptionMb) {
    await this.page.click(this._lineConfigurationSection);
    await this.page.fill(this._lineNumberInput, lineNumber.toString());
    await this.page.selectOption(this._soldPlanSelector, 'SOLD');
    await this.page.fill(this._consumptionInput, consumptionMb.toString());
    await this.page.selectOption(this._apnSelector, 'onstarsa');
    await this.page.click(this._saveLineConfigButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getConfiguredLinesCount() {
    const countElement = await this.page.locator(this._configuredLinesCount);
    const countText = await countElement.textContent();
    return parseInt(countText, 10);
  }

  async registerConsumptionInUDR(lineNumber, consumptionMb, apnName) {
    await this.page.waitForSelector(this._udrTableSection);
    const recordRow = await this.page.locator(`${this._udrRecordRow}[data-line="${lineNumber}"]`);
    await recordRow.waitFor({ state: 'visible' });
  }

  async getUDRRecordsCount(apnFilter) {
    await this.page.fill(this._udrApnFilter, apnFilter);
    await this.page.waitForLoadState('networkidle');
    const countElement = await this.page.locator(this._udrRecordsCountDisplay);
    const countText = await countElement.textContent();
    return parseInt(countText, 10);
  }

  async executeCalculationShell() {
    await this.page.click(this._shellExecutionSection);
    await this.page.click(this._executeShellButton);
    await this.page.waitForSelector(this._shellStatusIndicator);
  }

  async verifyShellExecutionSuccess() {
    const successMessage = await this.page.locator(this._shellSuccessMessage);
    return await successMessage.isVisible();
  }

  async getExtractedRecordsFromTempTable() {
    await this.page.waitForSelector(this._tempWorkTableSection);
    const countElement = await this.page.locator(this._extractedRecordsCount);
    const countText = await countElement.textContent();
    return parseInt(countText, 10);
  }

  async getTotalTrafficCalculation() {
    await this.page.waitForSelector(this._trafficCalculationSection);
    const totalElement = await this.page.locator(this._totalTrafficDisplay);
    const totalText = await totalElement.textContent();
    return parseInt(totalText.replace(/[^0-9]/g, ''), 10);
  }

  async getAssignedInPoolBag(numberOfLines) {
    await this.page.waitForSelector(this._inPoolBagSection);
    const bagElement = await this.page.locator(this._assignedBagDisplay);
    const bagText = await bagElement.textContent();
    return parseInt(bagText.replace(/[^0-9]/g, ''), 10);
  }

  async verifyConsumptionWithinBag(consumed, assigned) {
    await this.page.waitForSelector(this._consumptionComparisonSection);
    const withinBadge = await this.page.locator(this._withinBagBadge);
    return await withinBadge.isVisible() && consumed <= assigned;
  }

  async checkExcessBulkConsumption() {
    const excessIndicator = await this.page.locator(this._excessBulkIndicator);
    const isVisible = await excessIndicator.isVisible();
    if (!isVisible) return false;
    const indicatorText = await excessIndicator.textContent();
    return indicatorText.toLowerCase().includes('excess') || indicatorText.toLowerCase().includes('excedente');
  }
}

module.exports = InPoolCalculationPage;