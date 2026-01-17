class InvoicePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BILLING_SYSTEM_URL || 'https://billing.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Navigation locators
    this.billingModule = '[data-testid="billing-module"]';
    this.invoiceSection = '[data-testid="invoice-section"]';
    
    // Client selection locators
    this.clientSelector = '[data-testid="client-selector"]';
    this.generalMotorsOption = '[data-testid="client-option-general-motors"]';
    
    // Invoice generation locators
    this.generateInvoiceButton = '[data-testid="generate-invoice-button"]';
    this.invoiceLoadingIndicator = '[data-testid="invoice-loading"]';
    this.invoiceContainer = '[data-testid="invoice-container"]';
    
    // Billing cycle locators
    this.billingCycleStatus = '[data-testid="billing-cycle-status"]';
    this.soldRatePlanIndicator = '[data-testid="sold-rateplan-indicator"]';
    
    // Invoice sections locators
    this.sectionConsolidated = '[data-testid="section-consolidated"]';
    this.sectionAdditionalServices = '[data-testid="section-additional-services"]';
    this.sectionTrafficDetail = '[data-testid="section-traffic-detail"]';
    this.sectionTrafficDetailSold = '[data-testid="section-traffic-detail-sold"]';
    this.sectionLdi = '[data-testid="section-ldi"]';
    this.sectionRoaming = '[data-testid="section-roaming"]';
    
    // Traffic Detail SOLD section structure locators
    this.soldSectionHeader = '[data-testid="sold-section-header"]';
    this.soldApnField = '[data-testid="sold-apn-field"]';
    this.soldVolumeField = '[data-testid="sold-volume-mb-field"]';
    this.soldPlanField = '[data-testid="sold-plan-field"]';
  }

  async navigateToBillingSystem() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.BILLING_USERNAME || 'test_user';
    const password = process.env.BILLING_PASSWORD || 'test_password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyBillingCycleClosed() {
    await this.page.click(this.billingModule);
    const statusElement = this.page.locator(this.billingCycleStatus);
    const statusText = await statusElement.textContent();
    return statusText.toLowerCase().includes('closed') || statusText.toLowerCase().includes('cerrado');
  }

  async verifySoldRatePlanLinesExist() {
    const soldIndicator = this.page.locator(this.soldRatePlanIndicator);
    return await soldIndicator.isVisible();
  }

  async selectGeneralMotorsClient() {
    await this.page.click(this.clientSelector);
    await this.page.click(this.generalMotorsOption);
  }

  async generateConsolidatedInvoice() {
    await this.page.click(this.generateInvoiceButton);
  }

  async waitForInvoiceGeneration() {
    await this.page.waitForSelector(this.invoiceLoadingIndicator, { state: 'hidden', timeout: 60000 });
    const invoiceContainer = this.page.locator(this.invoiceContainer);
    return await invoiceContainer.isVisible();
  }

  async getAllInvoiceSections() {
    const sections = [];
    if (await this.page.locator(this.sectionConsolidated).isVisible()) sections.push('Consolidated');
    if (await this.page.locator(this.sectionAdditionalServices).isVisible()) sections.push('Additional Services');
    if (await this.page.locator(this.sectionTrafficDetail).isVisible()) sections.push('Traffic Detail');
    if (await this.page.locator(this.sectionTrafficDetailSold).isVisible()) sections.push('Traffic Detail SOLD');
    if (await this.page.locator(this.sectionLdi).isVisible()) sections.push('LDI');
    if (await this.page.locator(this.sectionRoaming).isVisible()) sections.push('Roaming');
    return sections;
  }

  async verifySoldSectionPosition() {
    const trafficDetailSection = this.page.locator(this.sectionTrafficDetail);
    const soldSection = this.page.locator(this.sectionTrafficDetailSold);
    const trafficDetailBox = await trafficDetailSection.boundingBox();
    const soldBox = await soldSection.boundingBox();
    if (trafficDetailBox && soldBox) {
      return soldBox.y > trafficDetailBox.y;
    }
    return false;
  }

  async verifySoldSectionHeader() {
    const header = this.page.locator(this.soldSectionHeader);
    return await header.isVisible();
  }

  async verifyApnFieldExists() {
    const apnField = this.page.locator(this.soldApnField);
    return await apnField.isVisible();
  }

  async verifyVolumeFieldExists() {
    const volumeField = this.page.locator(this.soldVolumeField);
    return await volumeField.isVisible();
  }

  async verifyPlanFieldExists() {
    const planField = this.page.locator(this.soldPlanField);
    return await planField.isVisible();
  }
}

module.exports = InvoicePage;