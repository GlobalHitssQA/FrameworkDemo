class InPoolGranelPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.userAuthenticatedIndicator = '[data-testid="user-authenticated-indicator"]';
    
    this.shellExecuteButton = '[data-testid="shell-execute-button"]';
    this.shellStatusIndicator = '[data-testid="shell-status-indicator"]';
    this.totalConsumptionField = '[data-testid="total-consumption-mb"]';
    
    this.soldLinesTable = '[data-testid="sold-lines-table"]';
    this.soldLineRows = '[data-testid="sold-line-row"]';
    this.lineCountIndicator = '[data-testid="active-sold-line-count"]';
    
    this.parametricTableSection = '[data-testid="parametric-table-section"]';
    this.excessRateField = '[data-testid="excess-rate-value"]';
    
    this.invoiceSummaryLink = '[data-testid="invoice-summary-link"]';
    this.serviciosInPoolGranelSection = '[data-testid="servicios-in-pool-granel-section"]';
    this.serviciosInPoolGranelAmount = '[data-testid="servicios-in-pool-granel-amount"]';
    
    this.occSection = '[data-testid="occ-section"]';
    this.occServiciosInPoolGranel = '[data-testid="occ-servicios-in-pool-granel"]';
    this.occAmountField = '[data-testid="occ-amount"]';
    
    this.excessCalculationResult = '[data-testid="excess-calculation-result"]';
    this.consumptionTotalizedIndicator = '[data-testid="consumption-totalized-indicator"]';
  }

  async navigateToLogin() {
    await this.page.goto('/bscs7/login');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.BSCS7_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.BSCS7_PASSWORD || 'testpass');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userAuthenticatedIndicator, { state: 'visible' });
    return await this.page.isVisible(this.userAuthenticatedIndicator);
  }

  async verifyActiveSOLDLinesExist() {
    await this.page.waitForSelector(this.soldLinesTable, { state: 'visible' });
    const rows = await this.page.locator(this.soldLineRows).count();
    return rows > 0;
  }

  async getActiveSOLDLineCount() {
    const countText = await this.page.textContent(this.lineCountIndicator);
    return parseInt(countText, 10);
  }

  async getConfiguredExcessRate() {
    await this.page.waitForSelector(this.parametricTableSection, { state: 'visible' });
    const rateText = await this.page.textContent(this.excessRateField);
    return parseFloat(rateText);
  }

  async executeInPoolCalculationShell() {
    await this.page.click(this.shellExecuteButton);
    await this.page.waitForSelector(this.shellStatusIndicator, { state: 'visible' });
    await this.page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        return element && element.textContent.includes('Completed');
      },
      this.shellStatusIndicator,
      { timeout: 60000 }
    );
  }

  async getTotalTelemetryConsumption() {
    await this.page.waitForSelector(this.totalConsumptionField, { state: 'visible' });
    const consumptionText = await this.page.textContent(this.totalConsumptionField);
    return parseFloat(consumptionText.replace(/[^0-9.]/g, ''));
  }

  async verifyConsumptionTotalized() {
    return await this.page.isVisible(this.consumptionTotalizedIndicator);
  }

  async calculateExcess(totalConsumption, assignedPool) {
    const excess = totalConsumption - assignedPool;
    return excess > 0 ? excess : 0;
  }

  async applyExcessRate(excessMB, rate) {
    return excessMB * rate;
  }

  async verifyOCCGenerated() {
    await this.page.waitForSelector(this.occSection, { state: 'visible' });
    return await this.page.isVisible(this.occServiciosInPoolGranel);
  }

  async getOCCAmount() {
    const amountText = await this.page.textContent(this.occAmountField);
    return parseFloat(amountText.replace(/[^0-9.]/g, ''));
  }

  async navigateToInvoiceSummary() {
    await this.page.click(this.invoiceSummaryLink);
    await this.page.waitForLoadState('networkidle');
  }

  async queryServiciosInPoolGranel() {
    await this.page.waitForSelector(this.serviciosInPoolGranelSection, { state: 'visible' });
  }

  async getServiciosInPoolGranelAmount() {
    await this.page.waitForSelector(this.serviciosInPoolGranelAmount, { state: 'visible' });
    const amountText = await this.page.textContent(this.serviciosInPoolGranelAmount);
    return parseFloat(amountText.replace(/[^0-9.]/g, ''));
  }
}

module.exports = InPoolGranelPage;