const { expect } = require('@playwright/test');

class InPoolServicesPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = page.locator('[data-testid="bscs7-username-input"]');
    this.passwordInput = page.locator('[data-testid="bscs7-password-input"]');
    this.loginButton = page.locator('[data-testid="bscs7-login-button"]');
    
    this.soldPlanSection = page.locator('[data-testid="sold-plan-section"]');
    this.activeLinesTable = page.locator('[data-testid="active-lines-table"]');
    this.activeLinesCountDisplay = page.locator('[data-testid="active-lines-count"]');
    
    this.parametricTableSection = page.locator('[data-testid="parametric-table-section"]');
    this.rateConfigField = page.locator('[data-testid="rate-config-10mb-package"]');
    
    this.inPoolCalculationButton = page.locator('[data-testid="execute-inpool-shell-button"]');
    this.calculationStatusIndicator = page.locator('[data-testid="calculation-status"]');
    this.totalAssignedPoolDisplay = page.locator('[data-testid="total-assigned-pool"]');
    
    this.occInPoolServicesSection = page.locator('[data-testid="occ-inpool-services"]');
    this.occRateDisplay = page.locator('[data-testid="occ-rate-display"]');
    
    this.invoiceSummaryLink = page.locator('[data-testid="invoice-summary-link"]');
    this.inPoolServicesItem = page.locator('[data-testid="servicios-in-pool-item"]');
    this.inPoolServicesAmountDisplay = page.locator('[data-testid="servicios-in-pool-amount"]');
    
    this.billingCycleSelector = page.locator('[data-testid="billing-cycle-selector"]');
    this.invoiceDetailSection = page.locator('[data-testid="invoice-detail-section"]');
  }

  async navigateToBSCS7() {
    await this.page.goto('/bscs7');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    await this.usernameInput.fill(process.env.BSCS7_USERNAME || 'test_user');
    await this.passwordInput.fill(process.env.BSCS7_PASSWORD || 'test_password');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveLinesExistInSOLD() {
    await this.soldPlanSection.waitFor({ state: 'visible' });
    const linesCount = await this.activeLinesTable.locator('tbody tr').count();
    return linesCount > 0;
  }

  async getConfiguredRateFromParametricTable() {
    await this.parametricTableSection.click();
    const rateText = await this.rateConfigField.textContent();
    return parseFloat(rateText.replace('S/. ', '').replace(',', '.'));
  }

  async getActiveLinesCountInSOLDPlan() {
    await this.soldPlanSection.waitFor({ state: 'visible' });
    const countText = await this.activeLinesCountDisplay.textContent();
    return parseInt(countText, 10);
  }

  async executeInPoolCalculationShell() {
    await this.inPoolCalculationButton.click();
    await this.calculationStatusIndicator.waitFor({ state: 'visible' });
    await this.page.waitForFunction(
      (selector) => document.querySelector(selector)?.textContent === 'Completed',
      '[data-testid="calculation-status"]',
      { timeout: 60000 }
    );
  }

  async getTotalAssignedPool() {
    const poolText = await this.totalAssignedPoolDisplay.textContent();
    return parseInt(poolText.replace(' MB', ''), 10);
  }

  async verifyOCCInPoolServicesGenerated() {
    await this.occInPoolServicesSection.waitFor({ state: 'visible' });
    return await this.occInPoolServicesSection.isVisible();
  }

  async getOCCRate() {
    const rateText = await this.occRateDisplay.textContent();
    return parseFloat(rateText.replace('S/. ', '').replace(',', '.'));
  }

  async navigateToInvoiceSummary() {
    await this.invoiceSummaryLink.click();
    await this.invoiceDetailSection.waitFor({ state: 'visible' });
  }

  async getInPoolServicesAmount() {
    await this.inPoolServicesItem.waitFor({ state: 'visible' });
    const amountText = await this.inPoolServicesAmountDisplay.textContent();
    return parseFloat(amountText.replace('S/. ', '').replace(',', '.'));
  }
}

module.exports = InPoolServicesPage;