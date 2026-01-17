const { expect } = require('@playwright/test');

class LifeCycleBillingPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.lineConfigurationMenu = '[data-testid="line-configuration-menu"]';
    this.smsRoamingSection = '[data-testid="sms-roaming-section"]';
    this.udrTableSection = '[data-testid="udr-table-section"]';
    this.billingSection = '[data-testid="billing-section"]';
    this.consolidatedInvoiceSection = '[data-testid="consolidated-invoice-section"]';
    
    // Line configuration locators
    this.planSelector = '[data-testid="plan-selector"]';
    this.lineStatusIndicator = '[data-testid="line-status-indicator"]';
    this.addLineButton = '[data-testid="add-line-button"]';
    this.saveConfigurationButton = '[data-testid="save-configuration-button"]';
    this.lineActiveStatus = '[data-testid="line-active-status"]';
    
    // SMS Roaming locators
    this.sendSMSButton = '[data-testid="send-sms-roaming-button"]';
    this.smsRoamingConfirmation = '[data-testid="sms-roaming-confirmation"]';
    this.selectAllLinesCheckbox = '[data-testid="select-all-lines-checkbox"]';
    
    // UDR Table locators
    this.udrTableContainer = '[data-testid="udr-lt-01-table"]';
    this.udrSMSRoamingRecords = '[data-testid="udr-sms-roaming-record"]';
    this.udrLineIdentifier = '[data-testid="udr-line-identifier"]';
    
    // Billing locators
    this.executeBillingButton = '[data-testid="execute-billing-button"]';
    this.billingProcessStatus = '[data-testid="billing-process-status"]';
    this.smsRoamingRateField = '[data-testid="sms-roaming-bulk-rate"]';
    
    // Invoice locators
    this.trafficDetailSection = '[data-testid="traffic-detail-section"]';
    this.smsRoamingTrafficRow = '[data-testid="sms-roaming-traffic-row"]';
    this.invoiceTotalAmount = '[data-testid="invoice-total-amount"]';
    this.planColumnInTrafficDetail = '[data-testid="plan-column-traffic-detail"]';
    this.inPoolServicesSection = '[data-testid="in-pool-services-section"]';
    this.inPoolBulkServicesSection = '[data-testid="in-pool-bulk-services-section"]';
  }

  async navigateToLineConfiguration() {
    await this.page.click(this.lineConfigurationMenu);
    await this.page.waitForSelector(this.planSelector);
  }

  async configureLineInPlan(planName) {
    await this.page.click(this.addLineButton);
    await this.page.selectOption(this.planSelector, { label: planName });
    await this.page.click(this.saveConfigurationButton);
    await this.page.waitForSelector(this.lineStatusIndicator);
  }

  async verifyAllLinesAreActive() {
    const statusElements = await this.page.locator(this.lineActiveStatus).all();
    for (const element of statusElements) {
      const status = await element.textContent();
      if (status !== 'Active') {
        return false;
      }
    }
    return statusElements.length === 6;
  }

  async navigateToSMSRoamingSection() {
    await this.page.click(this.smsRoamingSection);
    await this.page.waitForSelector(this.sendSMSButton);
  }

  async sendSMSInRoamingForAllLines() {
    await this.page.check(this.selectAllLinesCheckbox);
    await this.page.click(this.sendSMSButton);
    await this.page.waitForSelector(this.smsRoamingConfirmation);
  }

  async navigateToUDRTable() {
    await this.page.click(this.udrTableSection);
    await this.page.waitForSelector(this.udrTableContainer);
  }

  async verifySMSRoamingTrafficInUDR() {
    const records = await this.page.locator(this.udrSMSRoamingRecords).all();
    return records.length >= 6;
  }

  async navigateToBillingSection() {
    await this.page.click(this.billingSection);
    await this.page.waitForSelector(this.executeBillingButton);
  }

  async executeBillingProcess() {
    await this.page.click(this.executeBillingButton);
    await this.page.waitForSelector(this.billingProcessStatus);
    await this.page.waitForFunction(
      (selector) => document.querySelector(selector)?.textContent === 'Completed',
      this.billingProcessStatus,
      { timeout: 60000 }
    );
  }

  async getSMSRoamingBulkRate() {
    const rateText = await this.page.textContent(this.smsRoamingRateField);
    return rateText.replace(/[^0-9.]/g, '');
  }

  async navigateToConsolidatedInvoice() {
    await this.page.click(this.consolidatedInvoiceSection);
    await this.page.waitForSelector(this.trafficDetailSection);
  }

  async isTrafficDetailSectionVisible() {
    return await this.page.isVisible(this.trafficDetailSection);
  }

  async isSMSRoamingTrafficInTrafficDetail() {
    return await this.page.isVisible(this.smsRoamingTrafficRow);
  }

  async verifyInvoiceAmountAtBulkRate() {
    const smsRows = await this.page.locator(this.smsRoamingTrafficRow).all();
    for (const row of smsRows) {
      const amountText = await row.locator('[data-testid="row-amount"]').textContent();
      const amount = parseFloat(amountText.replace(/[^0-9.]/g, ''));
      const countText = await row.locator('[data-testid="row-message-count"]').textContent();
      const count = parseInt(countText, 10);
      const expectedAmount = count * 0.05;
      if (Math.abs(amount - expectedAmount) > 0.01) {
        return false;
      }
    }
    return true;
  }
}

module.exports = LifeCycleBillingPage;