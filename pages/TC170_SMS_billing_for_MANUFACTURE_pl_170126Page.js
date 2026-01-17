const { expect } = require('@playwright/test');

class ManufacturePlanPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.provisioningMenuLink = page.locator('[data-testid="provisioning-menu"]');
    this.bscs7ConsoleLink = page.locator('[data-testid="bscs7-console-link"]');
    this.smsConsumptionLink = page.locator('[data-testid="sms-consumption-section"]');
    this.consumptionDetailLink = page.locator('[data-testid="consumption-detail-link"]');
    this.invoiceSectionLink = page.locator('[data-testid="invoice-section-link"]');
    
    // Provisioning locators
    this.planSelector = page.locator('[data-testid="plan-selector"]');
    this.manufacturePlanOption = page.locator('[data-testid="plan-option-manufacture"]');
    this.includedSmsInput = page.locator('[data-testid="included-sms-input"]');
    this.provisionLineButton = page.locator('[data-testid="provision-line-btn"]');
    this.provisioningSuccessMessage = page.locator('[data-testid="provisioning-success-msg"]');
    
    // BSCS7 locators
    this.bscs7IncludedSmsDisplay = page.locator('[data-testid="bscs7-included-sms"]');
    this.billingCycleInfo = page.locator('[data-testid="billing-cycle-info"]');
    
    // SMS consumption locators
    this.smsCountInput = page.locator('[data-testid="sms-count-input"]');
    this.sendSmsButton = page.locator('[data-testid="send-sms-btn"]');
    this.remainingIncludedSmsDisplay = page.locator('[data-testid="remaining-included-sms"]');
    this.additionalChargesDisplay = page.locator('[data-testid="additional-sms-charges"]');
    
    // Consumption detail locators
    this.excessSmsCountDisplay = page.locator('[data-testid="excess-sms-count"]');
    this.bulkRateDisplay = page.locator('[data-testid="bulk-rate-per-sms"]');
    this.trafficDetailSection = page.locator('[data-testid="traffic-detail-sold"]');
    
    // Invoice locators
    this.inPoolServicesSection = page.locator('[data-testid="services-in-pool-section"]');
    this.inPoolBulkSection = page.locator('[data-testid="services-in-pool-bulk-section"]');
    this.invoiceExcessSmsCount = page.locator('[data-testid="invoice-excess-sms-count"]');
    this.invoiceIncludedSmsCharge = page.locator('[data-testid="invoice-included-sms-charge"]');
    this.invoiceTotalSmsCharge = page.locator('[data-testid="invoice-total-sms-charge"]');
  }

  async navigateToProvisioningSection() {
    await this.provisioningMenuLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLineInManufacturePlan(includedSms) {
    await this.planSelector.click();
    await this.manufacturePlanOption.click();
    await this.includedSmsInput.fill(includedSms.toString());
    await this.provisionLineButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineProvisionedSuccessfully() {
    return await this.provisioningSuccessMessage.isVisible();
  }

  async navigateToBSCS7Console() {
    await this.bscs7ConsoleLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getIncludedSmsFromBSCS7() {
    const text = await this.bscs7IncludedSmsDisplay.textContent();
    return parseInt(text, 10);
  }

  async navigateToSmsConsumptionSection() {
    await this.smsConsumptionLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async sendSmsMessages(count) {
    await this.smsCountInput.fill(count.toString());
    await this.sendSmsButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getAdditionalSmsCharges() {
    const text = await this.additionalChargesDisplay.textContent();
    return parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
  }

  async getRemainingIncludedSms() {
    const text = await this.remainingIncludedSmsDisplay.textContent();
    return parseInt(text, 10);
  }

  async navigateToConsumptionDetail() {
    await this.consumptionDetailLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getExcessSmsCount() {
    const text = await this.excessSmsCountDisplay.textContent();
    return parseInt(text, 10);
  }

  async getBulkRatePerSms() {
    const text = await this.bulkRateDisplay.textContent();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async navigateToInvoiceSection() {
    await this.invoiceSectionLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getInvoicedExcessSmsCount() {
    const text = await this.invoiceExcessSmsCount.textContent();
    return parseInt(text, 10);
  }

  async getIncludedSmsChargeOnInvoice() {
    const text = await this.invoiceIncludedSmsCharge.textContent();
    return parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
  }
};

module.exports = ManufacturePlanPage;