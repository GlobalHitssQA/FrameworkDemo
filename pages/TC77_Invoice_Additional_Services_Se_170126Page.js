const { expect } = require('@playwright/test');

class InvoicePage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    this.customerSearchInput = '[data-testid="customer-search-input"]';
    this.customerSelectDropdown = '[data-testid="customer-select-dropdown"]';
    this.generalMotorsOption = '[data-testid="customer-option-general-motors"]';
    
    this.generateInvoiceButton = '[data-testid="generate-invoice-button"]';
    this.invoiceProcessingStatus = '[data-testid="invoice-processing-status"]';
    
    this.additionalServicesSection = '[data-testid="additional-services-section"]';
    this.additionalServicesSectionHeader = '[data-testid="additional-services-header"]';
    this.additionalServicesTable = '[data-testid="additional-services-table"]';
    
    this.apnTrafficRow = '[data-testid="apn-traffic-row"]';
    this.apnNameCell = '[data-testid="apn-name-cell"]';
    this.apnRateCell = '[data-testid="apn-rate-cell"]';
    this.apnConsumptionCell = '[data-testid="apn-consumption-cell"]';
    
    this.soldPlanLinesTable = '[data-testid="sold-plan-lines-table"]';
    this.soldPlanLineRow = '[data-testid="sold-plan-line-row"]';
    
    this.inPoolShellStatus = '[data-testid="in-pool-shell-status"]';
    this.billingProcessStatus = '[data-testid="billing-process-status"]';
    
    this.inPoolServicesSection = '[data-testid="in-pool-services-section"]';
    this.inPoolGranelSection = '[data-testid="in-pool-granel-section"]';
  }

  async navigateToLogin() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.BSCS7_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.BSCS7_PASSWORD || 'testpass');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveSoldLinesExist() {
    await this.page.goto('/billing/sold-lines');
    await this.page.waitForSelector(this.soldPlanLinesTable);
    const rows = await this.page.$$(this.soldPlanLineRow);
    return rows.length > 0;
  }

  async verifyInPoolShellExecuted() {
    await this.page.goto('/billing/in-pool-status');
    const statusElement = await this.page.$(this.inPoolShellStatus);
    if (!statusElement) return false;
    const statusText = await statusElement.textContent();
    return statusText.includes('Executed') || statusText.includes('Completed');
  }

  async selectGeneralMotorsCustomer() {
    await this.page.goto('/billing/invoices');
    await this.page.waitForLoadState('networkidle');
    await this.page.fill(this.customerSearchInput, 'General Motors');
    await this.page.waitForSelector(this.customerSelectDropdown);
    await this.page.click(this.generalMotorsOption);
  }

  async generateInvoice() {
    await this.page.click(this.generateInvoiceButton);
    await this.page.waitForSelector(this.invoiceProcessingStatus);
    await this.page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        return element && element.textContent.includes('Completed');
      },
      this.invoiceProcessingStatus,
      { timeout: 60000 }
    );
  }

  async verifyBillingProcessedByApn() {
    const statusElement = await this.page.$(this.billingProcessStatus);
    if (!statusElement) return false;
    const statusText = await statusElement.textContent();
    return statusText.includes('APN differentiation applied');
  }

  async navigateToAdditionalServicesSection() {
    await this.page.click(this.additionalServicesSectionHeader);
    await this.page.waitForSelector(this.additionalServicesTable);
  }

  async isAdditionalServicesSectionVisible() {
    return await this.page.isVisible(this.additionalServicesSection);
  }

  async isApnTrafficDisplayed(apnName, expectedRate) {
    const rows = await this.page.$$(this.apnTrafficRow);
    for (const row of rows) {
      const nameCell = await row.$(this.apnNameCell.replace('[data-testid="apn-traffic-row"] ', ''));
      const rateCell = await row.$(this.apnRateCell.replace('[data-testid="apn-traffic-row"] ', ''));
      if (nameCell && rateCell) {
        const name = await nameCell.textContent();
        const rate = await rateCell.textContent();
        if (name.includes(apnName) && rate.includes(expectedRate)) {
          return true;
        }
      }
    }
    return false;
  }

  async isApnTrafficNotDisplayed(apnName) {
    const sectionContent = await this.page.textContent(this.additionalServicesSection);
    return !sectionContent.includes(apnName);
  }

  async getAdditionalServicesSectionContent() {
    return await this.page.textContent(this.additionalServicesSection);
  }

  async verifyTelemetryApnsInInPoolSection(apnName) {
    const inPoolContent = await this.page.textContent(this.inPoolServicesSection);
    const inPoolGranelContent = await this.page.textContent(this.inPoolGranelSection);
    return inPoolContent.includes(apnName) || inPoolGranelContent.includes(apnName);
  }
}

module.exports = InvoicePage;