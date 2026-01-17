class InvoicePage {
  constructor(page) {
    this.page = page;
    
    this.loginUsernameInput = page.locator('[data-testid="login-username"]');
    this.loginPasswordInput = page.locator('[data-testid="login-password"]');
    this.loginSubmitButton = page.locator('[data-testid="login-submit"]');
    
    this.clientSearchInput = page.locator('[data-testid="client-search-input"]');
    this.clientSearchResults = page.locator('[data-testid="client-search-results"]');
    this.generalMotorsOption = page.locator('[data-testid="client-option-general-motors"]');
    
    this.generateInvoiceButton = page.locator('[data-testid="generate-invoice-btn"]');
    this.invoiceProcessingIndicator = page.locator('[data-testid="invoice-processing-indicator"]');
    this.invoiceSuccessMessage = page.locator('[data-testid="invoice-success-message"]');
    
    this.invoiceListTable = page.locator('[data-testid="invoice-list-table"]');
    this.latestInvoiceRow = page.locator('[data-testid="invoice-row"]').first();
    this.openInvoiceButton = page.locator('[data-testid="open-invoice-btn"]');
    
    this.additionalServicesSection = page.locator('[data-testid="additional-services-section"]');
    this.additionalServicesSectionHeader = page.locator('[data-testid="additional-services-header"]');
    this.dataConsumptionTable = page.locator('[data-testid="data-consumption-table"]');
    
    this.planColumnSelector = '[data-testid="plan-column"]';
    this.dataTrafficColumn = page.locator('[data-testid="data-traffic-column"]');
    this.bulkRateDisplay = page.locator('[data-testid="bulk-rate-display"]');
    
    this.smsConsumptionSection = page.locator('[data-testid="sms-consumption-section"]');
    this.voiceConsumptionSection = page.locator('[data-testid="voice-consumption-section"]');
    
    this.activeLinesIndicator = page.locator('[data-testid="active-lines-indicator"]');
    this.billingStatusIndicator = page.locator('[data-testid="billing-status"]');
  }

  async navigateToLogin() {
    await this.page.goto('/bscs7/login');
    await this.page.waitForLoadState('networkidle');
  }

  async loginToBSCS7() {
    await this.loginUsernameInput.fill(process.env.BSCS7_USERNAME || 'testuser');
    await this.loginPasswordInput.fill(process.env.BSCS7_PASSWORD || 'testpass');
    await this.loginSubmitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveLinesExist() {
    await this.activeLinesIndicator.waitFor({ state: 'visible', timeout: 10000 });
    const text = await this.activeLinesIndicator.textContent();
    return text && parseInt(text) > 0;
  }

  async selectGeneralMotorsClient() {
    await this.clientSearchInput.click();
    await this.clientSearchInput.fill('General Motors');
    await this.clientSearchResults.waitFor({ state: 'visible' });
    await this.generalMotorsOption.click();
  }

  async initiateInvoiceGeneration() {
    await this.generateInvoiceButton.click();
  }

  async waitForInvoiceProcessing() {
    await this.invoiceProcessingIndicator.waitFor({ state: 'visible' });
    await this.invoiceProcessingIndicator.waitFor({ state: 'hidden', timeout: 60000 });
  }

  async verifyBillingProcessed() {
    await this.invoiceSuccessMessage.waitFor({ state: 'visible', timeout: 30000 });
    return await this.invoiceSuccessMessage.isVisible();
  }

  async openGeneratedInvoice() {
    await this.invoiceListTable.waitFor({ state: 'visible' });
    await this.latestInvoiceRow.click();
    await this.openInvoiceButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToAdditionalServicesSection() {
    await this.additionalServicesSection.scrollIntoViewIfNeeded();
    await this.additionalServicesSectionHeader.click();
  }

  async isAdditionalServicesSectionVisible() {
    return await this.additionalServicesSection.isVisible();
  }

  async verifyPlanDataTrafficDisplayed(planName) {
    const planRow = this.page.locator(`[data-testid="plan-row-${planName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await planRow.waitFor({ state: 'visible', timeout: 10000 });
    const dataTraffic = planRow.locator('[data-testid="data-traffic-value"]');
    const trafficValue = await dataTraffic.textContent();
    return trafficValue && trafficValue.trim().length > 0;
  }

  async getBulkRatePerMB() {
    await this.bulkRateDisplay.waitFor({ state: 'visible' });
    const rateText = await this.bulkRateDisplay.textContent();
    const rateMatch = rateText.match(/([\d.]+)/);
    return rateMatch ? parseFloat(rateMatch[1]) : null;
  }

  async verifySMSConsumptionDisplay() {
    await this.smsConsumptionSection.waitFor({ state: 'visible' });
    const isVisible = await this.smsConsumptionSection.isVisible();
    const content = await this.smsConsumptionSection.textContent();
    return isVisible && content && content.trim().length > 0;
  }

  async verifyVoiceConsumptionDisplay() {
    await this.voiceConsumptionSection.waitFor({ state: 'visible' });
    const isVisible = await this.voiceConsumptionSection.isVisible();
    const content = await this.voiceConsumptionSection.textContent();
    return isVisible && content && content.trim().length > 0;
  }
}

module.exports = InvoicePage;