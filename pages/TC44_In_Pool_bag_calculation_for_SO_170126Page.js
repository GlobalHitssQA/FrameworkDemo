const { expect } = require('@playwright/test');

class InPoolCalculationPage {
  constructor(page) {
    this.page = page;
    
    // System navigation locators
    this.systemStatusIndicator = page.locator('[data-testid="system-status-indicator"]');
    this.bscs7SystemLink = page.locator('[data-testid="bscs7-system-link"]');
    
    // Line configuration locators
    this.lineConfigurationMenu = page.locator('[data-testid="line-configuration-menu"]');
    this.soldPlanFilter = page.locator('[data-testid="sold-plan-filter"]');
    this.activeLinesCount = page.locator('[data-testid="active-lines-count"]');
    this.ratePlanColumn = page.locator('[data-testid="rate-plan-column"]');
    
    // Shell execution locators
    this.shellExecutionMenu = page.locator('[data-testid="shell-execution-menu"]');
    this.inPoolShellButton = page.locator('[data-testid="sh-bscs-proceso-factura-gm"]');
    this.executeShellButton = page.locator('[data-testid="execute-shell-button"]');
    this.shellStatusIndicator = page.locator('[data-testid="shell-status-indicator"]');
    this.shellCompletionMessage = page.locator('[data-testid="shell-completion-message"]');
    
    // Calculation results locators
    this.identifiedLinesResult = page.locator('[data-testid="identified-lines-result"]');
    this.calculatedBagResult = page.locator('[data-testid="calculated-bag-mb"]');
    
    // OCC report locators
    this.occReportMenu = page.locator('[data-testid="occ-report-menu"]');
    this.occConceptCell = page.locator('[data-testid="occ-concept-servicio-in-pool"]');
    this.occAmountCell = page.locator('[data-testid="occ-amount-value"]');
    
    // Rate and total locators
    this.appliedRateValue = page.locator('[data-testid="applied-rate-per-package"]');
    this.totalAmountValue = page.locator('[data-testid="total-amount-without-igv"]');
  }

  async navigateToSystem() {
    await this.bscs7SystemLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifySystemOperational() {
    await expect(this.systemStatusIndicator).toBeVisible();
    const status = await this.systemStatusIndicator.textContent();
    expect(status).toContain('Operational');
  }

  async navigateToLineConfiguration() {
    await this.lineConfigurationMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveLines(lineCount, ratePlan) {
    await this.soldPlanFilter.selectOption({ value: `rate-plan-${ratePlan}` });
    await this.page.waitForLoadState('networkidle');
    const count = await this.activeLinesCount.textContent();
    expect(parseInt(count)).toBe(lineCount);
  }

  async navigateToShellExecution() {
    await this.shellExecutionMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async executeInPoolCalculationShell() {
    await this.inPoolShellButton.click();
    await this.executeShellButton.click();
  }

  async waitForShellCompletion() {
    await expect(this.shellCompletionMessage).toBeVisible({ timeout: 60000 });
    const completionText = await this.shellCompletionMessage.textContent();
    expect(completionText).toContain('Completed');
  }

  async getIdentifiedLinesCount() {
    const linesText = await this.identifiedLinesResult.textContent();
    return parseInt(linesText);
  }

  async getCalculatedInPoolBag() {
    const bagText = await this.calculatedBagResult.textContent();
    return parseInt(bagText);
  }

  async navigateToOCCReport() {
    await this.occReportMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getOCCConcept() {
    return await this.occConceptCell.textContent();
  }

  async getOCCAmount() {
    const amountText = await this.occAmountCell.textContent();
    return parseFloat(amountText.replace(/[^0-9.]/g, ''));
  }

  async getAppliedRate() {
    const rateText = await this.appliedRateValue.textContent();
    return parseFloat(rateText.replace(/[^0-9.]/g, ''));
  }

  async getTotalAmount() {
    const totalText = await this.totalAmountValue.textContent();
    return parseFloat(totalText.replace(/[^0-9.]/g, ''));
  }
}

module.exports = InPoolCalculationPage;