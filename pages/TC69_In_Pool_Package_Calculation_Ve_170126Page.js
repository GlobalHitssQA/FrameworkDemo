const { expect } = require('@playwright/test');

class InPoolCalculationPage {
  constructor(page) {
    this.page = page;
    
    this.billingSystemContainer = page.locator('[data-testid="billing-system-container"]');
    this.soldLinesSection = page.locator('[data-testid="sold-lines-section"]');
    this.soldLinesCountField = page.locator('[data-testid="sold-lines-count"]');
    this.ratePlanFilter = page.locator('[data-testid="rate-plan-filter"]');
    this.ratePlanSoldOption = page.locator('[data-testid="rate-plan-option-sold"]');
    this.billingCycleSelector = page.locator('[data-testid="billing-cycle-selector"]');
    this.queryLinesButton = page.locator('[data-testid="query-lines-button"]');
    this.shellStatusIndicator = page.locator('[data-testid="shell-status-indicator"]');
    this.parametricTableSection = page.locator('[data-testid="parametric-table-section"]');
    this.packageCostField = page.locator('[data-testid="package-cost-field"]');
    this.executeShellButton = page.locator('[data-testid="execute-shell-button"]');
    this.shellLogContainer = page.locator('[data-testid="shell-log-container"]');
    this.shellLogQuotaValue = page.locator('[data-testid="shell-log-quota-value"]');
    this.inPoolQuotaResult = page.locator('[data-testid="in-pool-quota-result"]');
    this.packageCountDisplay = page.locator('[data-testid="package-count-display"]');
    this.occInPoolServiceSection = page.locator('[data-testid="occ-in-pool-service-section"]');
    this.occInPoolAmountField = page.locator('[data-testid="occ-in-pool-amount"]');
    this.invoiceDetailSection = page.locator('[data-testid="invoice-detail-section"]');
    this.inPoolServicesInvoiceSection = page.locator('[data-testid="in-pool-services-invoice"]');
    this.trafficDetailSection = page.locator('[data-testid="traffic-detail-sold-section"]');
    this.planFieldInTrafficDetail = page.locator('[data-testid="plan-field-traffic-detail"]');
  }

  async navigateToBillingSystem() {
    await this.page.goto(process.env.BILLING_SYSTEM_URL || 'https://billing.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyBillingSystemAccess() {
    await expect(this.billingSystemContainer).toBeVisible({ timeout: 10000 });
  }

  async verifyShellOperational() {
    await this.shellStatusIndicator.waitFor({ state: 'visible', timeout: 5000 });
    const statusText = await this.shellStatusIndicator.textContent();
    return statusText.toLowerCase().includes('operational') || statusText.toLowerCase().includes('activo');
  }

  async getParametricTablePackageCost() {
    await this.parametricTableSection.click();
    const costText = await this.packageCostField.textContent();
    return parseFloat(costText.replace(/[^0-9.]/g, ''));
  }

  async querySoldLinesCount() {
    await this.ratePlanFilter.click();
    await this.ratePlanSoldOption.click();
    await this.queryLinesButton.click();
    await this.soldLinesCountField.waitFor({ state: 'visible', timeout: 10000 });
    const countText = await this.soldLinesCountField.textContent();
    return parseInt(countText.replace(/[^0-9]/g, ''), 10);
  }

  async calculateExpectedInPoolQuota(linesCount, mbPerLine) {
    return linesCount * mbPerLine;
  }

  async executeInPoolCalculationShell() {
    await this.executeShellButton.click();
    await this.shellLogContainer.waitFor({ state: 'visible', timeout: 30000 });
    await this.page.waitForSelector('[data-testid="shell-execution-complete"]', { timeout: 60000 });
  }

  async getShellLogCalculatedQuota() {
    const quotaText = await this.shellLogQuotaValue.textContent();
    return parseInt(quotaText.replace(/[^0-9]/g, ''), 10);
  }

  async calculatePackageCount(totalQuota, packageSize) {
    return Math.floor(totalQuota / packageSize);
  }

  async getOccInPoolServiceAmount() {
    await this.occInPoolServiceSection.waitFor({ state: 'visible', timeout: 5000 });
    const amountText = await this.occInPoolAmountField.textContent();
    return parseFloat(amountText.replace(/[^0-9.]/g, ''));
  }

  async verifyInvoiceInPoolSection() {
    await expect(this.inPoolServicesInvoiceSection).toBeVisible();
    return true;
  }

  async verifyTrafficDetailSection() {
    await expect(this.trafficDetailSection).toBeVisible();
    const planText = await this.planFieldInTrafficDetail.textContent();
    return planText.includes('SOLD');
  }
}

module.exports = InPoolCalculationPage;