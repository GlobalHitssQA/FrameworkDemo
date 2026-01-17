class InvoiceTrafficDetailPage {
  constructor(page) {
    this.page = page;
    
    this.loginUsernameInput = '[data-testid="login-username"]';
    this.loginPasswordInput = '[data-testid="login-password"]';
    this.loginSubmitButton = '[data-testid="login-submit"]';
    
    this.invoiceGenerationMenu = '[data-testid="menu-invoice-generation"]';
    this.clientSearchInput = '[data-testid="client-search-input"]';
    this.clientSearchButton = '[data-testid="client-search-button"]';
    this.clientResultRow = '[data-testid="client-result-general-motors"]';
    this.generateInvoiceButton = '[data-testid="generate-invoice-button"]';
    
    this.invoiceListTable = '[data-testid="invoice-list-table"]';
    this.latestInvoiceRow = '[data-testid="invoice-row"]:first-child';
    this.viewInvoiceButton = '[data-testid="view-invoice-button"]';
    
    this.trafficDetailSection = '[data-testid="section-traffic-detail"]';
    this.trafficDetailSOLDSection = '[data-testid="section-traffic-detail-sold"]';
    this.trafficDetailTable = '[data-testid="traffic-detail-table"]';
    this.trafficDetailSOLDTable = '[data-testid="traffic-detail-sold-table"]';
    
    this.planColumnHeader = '[data-testid="column-plan"]';
    this.apnColumnHeader = '[data-testid="column-apn"]';
    
    this.soldPlanRows = '[data-testid="traffic-row"][data-plan="SOLD"]';
    this.apnCell = '[data-testid="cell-apn"]';
    
    this.activeSOLDLinesIndicator = '[data-testid="active-sold-lines-status"]';
    this.inPoolShellStatus = '[data-testid="in-pool-shell-status"]';
  }

  async navigateToLogin() {
    await this.page.goto('/login');
  }

  async login() {
    await this.page.fill(this.loginUsernameInput, process.env.BSCS7_USERNAME || 'testuser');
    await this.page.fill(this.loginPasswordInput, process.env.BSCS7_PASSWORD || 'testpass');
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveSOLDLinesExist() {
    await this.page.goto('/admin/lines');
    const indicator = await this.page.locator(this.activeSOLDLinesIndicator);
    await indicator.waitFor({ state: 'visible' });
  }

  async verifyInPoolShellExecuted() {
    await this.page.goto('/admin/shell-status');
    const status = await this.page.locator(this.inPoolShellStatus);
    const statusText = await status.textContent();
    if (!statusText.includes('Executed') && !statusText.includes('Completado')) {
      throw new Error('In Pool shell has not been executed');
    }
  }

  async navigateToInvoiceGeneration() {
    await this.page.click(this.invoiceGenerationMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async selectGeneralMotorsClient() {
    await this.page.fill(this.clientSearchInput, 'General Motors');
    await this.page.click(this.clientSearchButton);
    await this.page.waitForSelector(this.clientResultRow);
    await this.page.click(this.clientResultRow);
  }

  async generateInvoice() {
    await this.page.click(this.generateInvoiceButton);
    await this.page.waitForLoadState('networkidle');
  }

  async openGeneratedInvoice() {
    await this.page.waitForSelector(this.invoiceListTable);
    await this.page.click(this.latestInvoiceRow);
    await this.page.click(this.viewInvoiceButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToTrafficDetailSection() {
    const section = await this.page.locator(this.trafficDetailSection);
    await section.scrollIntoViewIfNeeded();
    await section.waitFor({ state: 'visible' });
  }

  async isAPNTrafficVisible(apnNumber, apnName) {
    const selector = `${this.trafficDetailTable} [data-testid="traffic-row"][data-plan="SOLD"] [data-testid="cell-apn"][data-apn="${apnNumber}"]`;
    const elements = await this.page.locator(selector).all();
    
    for (const element of elements) {
      const text = await element.textContent();
      if (text.includes(apnName)) {
        return true;
      }
    }
    return elements.length > 0;
  }

  async isAPNTrafficHiddenInMainSection(apnNumber, apnName) {
    const selector = `${this.trafficDetailTable} [data-testid="traffic-row"][data-plan="SOLD"] [data-testid="cell-apn"][data-apn="${apnNumber}"]`;
    const elements = await this.page.locator(selector).all();
    
    if (elements.length === 0) {
      return true;
    }
    
    for (const element of elements) {
      const text = await element.textContent();
      if (text.includes(apnName)) {
        return false;
      }
    }
    return true;
  }

  async isTrafficDetailSOLDSectionVisible() {
    const section = await this.page.locator(this.trafficDetailSOLDSection);
    return await section.isVisible();
  }

  async verifyTelemetryTrafficInSOLDSection() {
    const table = await this.page.locator(this.trafficDetailSOLDTable);
    await table.waitFor({ state: 'visible' });
    
    const apn1Selector = `${this.trafficDetailSOLDTable} [data-testid="cell-apn"][data-apn="APN1"]`;
    const apn4Selector = `${this.trafficDetailSOLDTable} [data-testid="cell-apn"][data-apn="APN4"]`;
    
    const apn1Elements = await this.page.locator(apn1Selector).all();
    const apn4Elements = await this.page.locator(apn4Selector).all();
    
    return apn1Elements.length > 0 || apn4Elements.length > 0;
  }

  async getTrafficDetailTableContent() {
    const table = await this.page.locator(this.trafficDetailTable);
    return await table.textContent();
  }

  async getSOLDSectionTableContent() {
    const table = await this.page.locator(this.trafficDetailSOLDTable);
    return await table.textContent();
  }
}

module.exports = InvoiceTrafficDetailPage;