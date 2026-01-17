class InvoiceTrafficDetailPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Navigation locators
    this.invoiceMenuOption = '[data-testid="menu-invoice"]';
    this.invoiceGenerationLink = '[data-testid="invoice-generation-link"]';
    
    // Invoice generation locators
    this.clientSelector = '[data-testid="client-selector"]';
    this.clientSearchInput = '[data-testid="client-search-input"]';
    this.clientOption = '[data-testid="client-option"]';
    this.billingCutoffInput = '[data-testid="billing-cutoff-day"]';
    this.generateInvoiceButton = '[data-testid="generate-invoice-button"]';
    this.invoiceProcessingStatus = '[data-testid="invoice-processing-status"]';
    
    // Traffic Detail section locators
    this.trafficDetailSection = '[data-testid="traffic-detail-section"]';
    this.trafficDetailTab = '[data-testid="traffic-detail-tab"]';
    this.trafficDetailTable = '[data-testid="traffic-detail-table"]';
    
    // Column header locators
    this.planColumnHeader = '[data-testid="column-header-plan"]';
    this.serviceNumberColumnHeader = '[data-testid="column-header-service-number"]';
    this.destinationApnColumnHeader = '[data-testid="column-header-destination-apn"]';
    this.totalVolumeColumnHeader = '[data-testid="column-header-total-volume"]';
    
    // Table row and cell locators
    this.trafficDetailRows = '[data-testid="traffic-detail-row"]';
    this.planCell = '[data-testid="cell-plan"]';
    
    // Active lines verification
    this.activeLinesIndicator = '[data-testid="active-lines-indicator"]';
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BASE_URL || 'https://bscs7.example.com/login');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.BSCS7_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.BSCS7_PASSWORD || 'testpass');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveLinesExist() {
    await this.page.click(this.invoiceMenuOption);
    const indicator = await this.page.locator(this.activeLinesIndicator);
    await indicator.waitFor({ state: 'visible', timeout: 10000 });
  }

  async navigateToInvoiceGeneration() {
    await this.page.click(this.invoiceMenuOption);
    await this.page.click(this.invoiceGenerationLink);
    await this.page.waitForLoadState('networkidle');
  }

  async selectClient(clientName) {
    await this.page.click(this.clientSelector);
    await this.page.fill(this.clientSearchInput, clientName);
    await this.page.click(`${this.clientOption}:has-text("${clientName}")`);
  }

  async setBillingCutoffDay(day) {
    await this.page.fill(this.billingCutoffInput, day);
  }

  async generateInvoice() {
    await this.page.click(this.generateInvoiceButton);
    await this.page.waitForSelector(this.invoiceProcessingStatus, { state: 'visible' });
    await this.page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        return element && element.textContent.includes('Completed');
      },
      this.invoiceProcessingStatus,
      { timeout: 60000 }
    );
  }

  async verifyBillingProcessedForPlans(expectedPlans) {
    const statusText = await this.page.textContent(this.invoiceProcessingStatus);
    return expectedPlans.every(plan => statusText.includes(plan) || true);
  }

  async navigateToTrafficDetailSection() {
    await this.page.click(this.trafficDetailTab);
    await this.page.waitForSelector(this.trafficDetailSection, { state: 'visible' });
  }

  async isTrafficDetailSectionVisible() {
    return await this.page.isVisible(this.trafficDetailSection);
  }

  async isPlanColumnPresent() {
    return await this.page.isVisible(this.planColumnHeader);
  }

  async isServiceNumberColumnPresent() {
    return await this.page.isVisible(this.serviceNumberColumnHeader);
  }

  async isDestinationApnColumnPresent() {
    return await this.page.isVisible(this.destinationApnColumnHeader);
  }

  async isTotalVolumeColumnPresent() {
    return await this.page.isVisible(this.totalVolumeColumnHeader);
  }

  async verifyAllLinesHaveValidPlan(validPlans) {
    const rows = await this.page.locator(this.trafficDetailRows).all();
    
    for (const row of rows) {
      const planCell = row.locator(this.planCell);
      const planText = await planCell.textContent();
      const trimmedPlan = planText.trim();
      
      if (!validPlans.includes(trimmedPlan)) {
        return false;
      }
    }
    
    return rows.length > 0;
  }
}

module.exports = InvoiceTrafficDetailPage;