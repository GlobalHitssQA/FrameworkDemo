class BillingPage {
  constructor(page) {
    this.page = page;
    
    this.loginContainer = page.locator('[data-testid="bscs7-login-container"]');
    this.userAuthIndicator = page.locator('[data-testid="user-authenticated-indicator"]');
    this.clientSearchInput = page.locator('[data-testid="client-search-input"]');
    this.clientSearchButton = page.locator('[data-testid="client-search-button"]');
    this.billingScreenHeader = page.locator('[data-testid="billing-screen-header"]');
    this.clientNameDisplay = page.locator('[data-testid="client-name-display"]');
    this.soldPlanLinesTable = page.locator('[data-testid="sold-plan-lines-table"]');
    this.inPoolCalculationStatus = page.locator('[data-testid="in-pool-calculation-status"]');
    this.preBillingStatus = page.locator('[data-testid="pre-billing-status"]');
    this.monthlyBillingButton = page.locator('[data-testid="execute-monthly-billing-button"]');
    this.cutoffDateInput = page.locator('[data-testid="cutoff-date-input"]');
    this.planTypeFilter = page.locator('[data-testid="plan-type-filter"]');
    this.executeBillingConfirmButton = page.locator('[data-testid="confirm-billing-execution"]');
    this.billingProcessIndicator = page.locator('[data-testid="billing-process-indicator"]');
    this.occListContainer = page.locator('[data-testid="occ-list-container"]');
    this.receiptSummaryTab = page.locator('[data-testid="receipt-summary-tab"]');
    this.receiptSummarySection = page.locator('[data-testid="receipt-summary-section"]');
    this.inPoolServicesItem = page.locator('[data-testid="in-pool-services-item"]');
    this.inPoolServicesAmount = page.locator('[data-testid="in-pool-services-amount"]');
    this.inPoolGranelServicesItem = page.locator('[data-testid="in-pool-granel-services-item"]');
    this.inPoolGranelServicesAmount = page.locator('[data-testid="in-pool-granel-services-amount"]');
    this.invoiceSummaryItemsList = page.locator('[data-testid="invoice-summary-items-list"]');
  }

  async navigateToBillingSystem() {
    await this.page.goto(process.env.BSCS7_URL || '/billing');
    await this.loginContainer.waitFor({ state: 'visible', timeout: 10000 });
  }

  async verifyUserIsAuthenticated() {
    await this.userAuthIndicator.waitFor({ state: 'visible', timeout: 5000 });
  }

  async verifyActiveSoldPlanLinesWithExcessConsumption() {
    await this.soldPlanLinesTable.waitFor({ state: 'visible' });
    const rows = await this.soldPlanLinesTable.locator('tr[data-excess="true"]').count();
    return rows > 0;
  }

  async verifyInPoolCalculationShellExecuted() {
    const status = await this.inPoolCalculationStatus.textContent();
    return status.includes('Completed') || status.includes('Success');
  }

  async verifyPreBillingCompleted() {
    const status = await this.preBillingStatus.textContent();
    return status.includes('Completed') || status.includes('Success');
  }

  async accessClientBilling(clientName) {
    await this.clientSearchInput.fill(clientName);
    await this.clientSearchButton.click();
    await this.billingScreenHeader.waitFor({ state: 'visible' });
  }

  async isBillingScreenDisplayedForClient(clientCode) {
    const headerText = await this.billingScreenHeader.textContent();
    const clientDisplayed = await this.clientNameDisplay.textContent();
    return headerText.includes('Billing') && clientDisplayed.includes(clientCode);
  }

  async executeMonthlyBillingProcess(cutoffDay, planType) {
    await this.monthlyBillingButton.click();
    await this.cutoffDateInput.fill(cutoffDay.toString());
    await this.planTypeFilter.selectOption({ label: planType });
    await this.executeBillingConfirmButton.click();
  }

  async waitForBillingProcessCompletion() {
    await this.billingProcessIndicator.waitFor({ state: 'hidden', timeout: 60000 });
  }

  async verifyOCCsGenerated(occTypes) {
    await this.occListContainer.waitFor({ state: 'visible' });
    for (const occType of occTypes) {
      const occItem = this.occListContainer.locator(`[data-occ-type="${occType}"]`);
      if (!(await occItem.isVisible())) {
        return false;
      }
    }
    return true;
  }

  async navigateToReceiptSummary() {
    await this.receiptSummaryTab.click();
    await this.receiptSummarySection.waitFor({ state: 'visible' });
  }

  async isInPoolServicesItemVisible() {
    return await this.inPoolServicesItem.isVisible();
  }

  async inPoolServicesHasValidAmount() {
    const amount = await this.inPoolServicesAmount.textContent();
    return amount && parseFloat(amount.replace(/[^0-9.-]/g, '')) > 0;
  }

  async isInPoolGranelServicesItemVisible() {
    return await this.inPoolGranelServicesItem.isVisible();
  }

  async inPoolGranelServicesHasValidAmount() {
    const amount = await this.inPoolGranelServicesAmount.textContent();
    return amount && parseFloat(amount.replace(/[^0-9.-]/g, '')) > 0;
  }

  async verifyItemsDisplayedSeparately() {
    const inPoolBoundingBox = await this.inPoolServicesItem.boundingBox();
    const granelBoundingBox = await this.inPoolGranelServicesItem.boundingBox();
    return inPoolBoundingBox && granelBoundingBox && inPoolBoundingBox.y !== granelBoundingBox.y;
  }

  async verifyBothItemsHaveCorrespondingAmounts() {
    const inPoolAmount = await this.inPoolServicesAmount.textContent();
    const granelAmount = await this.inPoolGranelServicesAmount.textContent();
    return inPoolAmount && granelAmount && inPoolAmount !== granelAmount;
  }
}

module.exports = BillingPage;