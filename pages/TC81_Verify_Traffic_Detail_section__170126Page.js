class InvoicePage {
  constructor(page) {
    this.page = page;
    this.loginUsernameInput = page.locator('[data-testid="login-username"]');
    this.loginPasswordInput = page.locator('[data-testid="login-password"]');
    this.loginButton = page.locator('[data-testid="login-submit-button"]');
    this.invoiceSection = page.locator('[data-testid="consolidated-invoice"]');
    this.invoiceListItem = page.locator('[data-testid="invoice-list-item-gm"]');
    this.trafficDetailSection = page.locator('[data-testid="traffic-detail-section"]');
    this.planFieldHeader = page.locator('[data-testid="traffic-detail-plan-column"]');
    this.ratePlanFilter = page.locator('[data-testid="rateplan-filter-dropdown"]');
    this.ratePlanOption = (plan) => page.locator(`[data-testid="rateplan-option-${plan}"]`);
    this.trafficRows = page.locator('[data-testid="traffic-detail-row"]');
    this.planCells = page.locator('[data-testid="traffic-detail-plan-cell"]');
    this.apnCells = page.locator('[data-testid="traffic-detail-apn-cell"]');
  }

  async navigateToLogin() {
    await this.page.goto('/login');
  }

  async login() {
    await this.loginUsernameInput.fill(process.env.BILLING_USERNAME || 'testuser');
    await this.loginPasswordInput.fill(process.env.BILLING_PASSWORD || 'testpass');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyInvoiceAvailable() {
    await this.page.goto('/invoices');
    await this.invoiceListItem.waitFor({ state: 'visible', timeout: 10000 });
  }

  async openConsolidatedInvoice() {
    await this.invoiceListItem.click();
    await this.invoiceSection.waitFor({ state: 'visible', timeout: 10000 });
  }

  async isInvoiceDisplayed() {
    return await this.invoiceSection.isVisible();
  }

  async scrollToTrafficDetailSection() {
    await this.trafficDetailSection.scrollIntoViewIfNeeded();
  }

  async isTrafficDetailSectionVisible() {
    return await this.trafficDetailSection.isVisible();
  }

  async isPlanFieldVisible() {
    return await this.planFieldHeader.isVisible();
  }

  async filterByRatePlan(plan) {
    await this.ratePlanFilter.click();
    await this.ratePlanOption(plan).click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyAllLinesHavePlan(expectedPlan) {
    const planTexts = await this.planCells.allTextContents();
    return planTexts.every(text => text.trim() === expectedPlan);
  }

  async verifyTrafficApns(validApns) {
    const apnTexts = await this.apnCells.allTextContents();
    return apnTexts.every(apn => validApns.some(valid => apn.toLowerCase().includes(valid.toLowerCase())));
  }

  async verifyNoTrafficFromApns(excludedApns) {
    const apnTexts = await this.apnCells.allTextContents();
    return apnTexts.every(apn => !excludedApns.some(excluded => apn.toUpperCase().includes(excluded.toUpperCase())));
  }
}

module.exports = InvoicePage;