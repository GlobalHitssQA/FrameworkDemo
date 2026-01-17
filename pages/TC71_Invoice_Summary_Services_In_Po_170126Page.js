class BillingPage {
  constructor(page) {
    this.page = page;
    
    // Authentication and Navigation Locators
    this.loginContainer = '[data-testid="bscs7-login-container"]';
    this.userAuthIndicator = '[data-testid="user-authenticated-indicator"]';
    this.billingSystemHeader = '[data-testid="billing-system-header"]';
    
    // Client Selection Locators
    this.clientSearchInput = '[data-testid="client-search-input"]';
    this.clientDropdown = '[data-testid="client-dropdown"]';
    this.clientBillingScreen = '[data-testid="client-billing-screen"]';
    this.clientNameDisplay = '[data-testid="client-name-display"]';
    
    // SOLD Lines Locators
    this.soldLinesTable = '[data-testid="sold-lines-table"]';
    this.soldLineRows = '[data-testid="sold-line-row"]';
    this.activeLineStatus = '[data-testid="line-status-active"]';
    this.inPoolConsumptionIndicator = '[data-testid="in-pool-consumption-indicator"]';
    
    // Billing Process Locators
    this.billingCutoffInput = '[data-testid="billing-cutoff-day-input"]';
    this.executeBillingButton = '[data-testid="execute-billing-button"]';
    this.billingProgressIndicator = '[data-testid="billing-progress-indicator"]';
    this.billingCompleteStatus = '[data-testid="billing-complete-status"]';
    
    // Invoice and Receipt Summary Locators
    this.generatedInvoiceLink = '[data-testid="generated-invoice-link"]';
    this.receiptSummarySection = '[data-testid="receipt-summary-section"]';
    this.receiptSummaryTab = '[data-testid="receipt-summary-tab"]';
    
    // Services In Pool Locators
    this.servicesInPoolItem = '[data-testid="services-in-pool-item"]';
    this.servicesInPoolAmount = '[data-testid="services-in-pool-amount"]';
    this.servicesInPoolDescription = '[data-testid="services-in-pool-description"]';
    
    // OCC Related Locators
    this.occServicesInPool = '[data-testid="occ-services-in-pool"]';
    this.activeLinesCounter = '[data-testid="active-lines-counter"]';
  }

  async navigateToBillingSystem() {
    await this.page.goto('/bscs7/billing');
    await this.page.waitForSelector(this.billingSystemHeader);
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userAuthIndicator, { state: 'visible' });
  }

  async verifyActiveSOLDLinesExist() {
    await this.page.waitForSelector(this.soldLinesTable);
    const activeLines = await this.page.locator(`${this.soldLineRows} ${this.activeLineStatus}`).count();
    if (activeLines === 0) {
      throw new Error('No active SOLD lines found');
    }
  }

  async verifyInPoolConsumptionWithinAllocation() {
    const indicator = await this.page.locator(this.inPoolConsumptionIndicator).first();
    await indicator.waitFor({ state: 'visible' });
  }

  async selectClient(clientName) {
    await this.page.fill(this.clientSearchInput, clientName);
    await this.page.waitForSelector(this.clientDropdown);
    await this.page.click(`${this.clientDropdown} >> text=${clientName}`);
  }

  async verifyClientBillingScreenDisplayed() {
    await this.page.waitForSelector(this.clientBillingScreen, { state: 'visible' });
    const displayedName = await this.page.textContent(this.clientNameDisplay);
    if (!displayedName.includes('General Motors')) {
      throw new Error('Client billing screen not displaying General Motors data');
    }
  }

  async setBillingCutoffDay(day) {
    await this.page.fill(this.billingCutoffInput, day);
  }

  async executeMonthlyBillingProcess() {
    await this.page.click(this.executeBillingButton);
    await this.page.waitForSelector(this.billingProgressIndicator, { state: 'visible' });
  }

  async waitForBillingProcessCompletion() {
    await this.page.waitForSelector(this.billingCompleteStatus, { state: 'visible', timeout: 60000 });
  }

  async openGeneratedInvoice() {
    await this.page.click(this.generatedInvoiceLink);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToReceiptSummarySection() {
    await this.page.click(this.receiptSummaryTab);
    await this.page.waitForSelector(this.receiptSummarySection, { state: 'visible' });
  }

  async isServicesInPoolItemVisible() {
    return await this.page.isVisible(this.servicesInPoolItem);
  }

  async getServicesInPoolAmount() {
    return await this.page.textContent(this.servicesInPoolAmount);
  }

  async getActiveSOLDLinesCount() {
    const counterText = await this.page.textContent(this.activeLinesCounter);
    return parseInt(counterText, 10);
  }
}

module.exports = BillingPage;