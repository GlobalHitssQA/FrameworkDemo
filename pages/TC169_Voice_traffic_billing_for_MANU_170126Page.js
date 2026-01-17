const { expect } = require('@playwright/test');

class ManufacturePlanPage {
  constructor(page) {
    this.page = page;
    
    // Line Provisioning Locators
    this.lineProvisioningMenu = '[data-testid="menu-line-provisioning"]';
    this.manufacturePlanOption = '[data-testid="plan-manufacture"]';
    this.volteToggle = '[data-testid="toggle-volte"]';
    this.includedMinutesInput = '[data-testid="input-included-minutes"]';
    this.confirmProvisioningButton = '[data-testid="btn-confirm-provisioning"]';
    this.provisioningSuccessMessage = '[data-testid="msg-provisioning-success"]';
    
    // BSCS7 Locators
    this.bscs7Menu = '[data-testid="menu-bscs7"]';
    this.lineSearchInput = '[data-testid="input-line-search"]';
    this.searchButton = '[data-testid="btn-search"]';
    this.includedMinutesDisplay = '[data-testid="display-included-minutes"]';
    this.volteStatusDisplay = '[data-testid="display-service-volte-status"]';
    
    // Call Simulator Locators
    this.callSimulatorMenu = '[data-testid="menu-call-simulator"]';
    this.callDurationInput = '[data-testid="input-call-duration"]';
    this.executeCallButton = '[data-testid="btn-execute-call"]';
    this.callConfirmationMessage = '[data-testid="msg-call-confirmation"]';
    
    // Consumption Summary Locators
    this.consumptionSummaryMenu = '[data-testid="menu-consumption-summary"]';
    this.remainingMinutesDisplay = '[data-testid="display-remaining-minutes"]';
    this.additionalChargesDisplay = '[data-testid="display-additional-charges"]';
    
    // Consumption Details Locators
    this.consumptionDetailsMenu = '[data-testid="menu-consumption-details"]';
    this.excessMinutesDisplay = '[data-testid="display-excess-minutes"]';
    this.bulkRateDisplay = '[data-testid="display-bulk-rate"]';
    
    // Invoice Locators
    this.invoiceMenu = '[data-testid="menu-invoice"]';
    this.invoiceExcessMinutesDisplay = '[data-testid="invoice-excess-minutes"]';
    this.invoiceExcessChargeDisplay = '[data-testid="invoice-excess-charge"]';
    this.invoiceIncludedChargeDisplay = '[data-testid="invoice-included-charge"]';
    this.inPoolServicesSection = '[data-testid="section-in-pool-services"]';
    this.trafficDetailSection = '[data-testid="section-traffic-detail-sold"]';
    this.planField = '[data-testid="field-plan"]';
    
    // Network Records Locators
    this.networkRecordsMenu = '[data-testid="menu-network-records"]';
    this.callTechnologyDisplay = '[data-testid="display-call-technology"]';
  }

  async navigateToLineProvisioning() {
    await this.page.click(this.lineProvisioningMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLineWithManufacturePlan() {
    await this.page.click(this.manufacturePlanOption);
  }

  async enableVoLTE() {
    await this.page.click(this.volteToggle);
  }

  async setIncludedVoiceMinutes(minutes) {
    await this.page.fill(this.includedMinutesInput, minutes.toString());
  }

  async confirmProvisioning() {
    await this.page.click(this.confirmProvisioningButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isLineProvisionedSuccessfully() {
    return await this.page.isVisible(this.provisioningSuccessMessage);
  }

  async navigateToBSCS7() {
    await this.page.click(this.bscs7Menu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchProvisionedLine() {
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getIncludedMinutesFromBSCS7() {
    return await this.page.textContent(this.includedMinutesDisplay);
  }

  async getVoLTEStatusFromBSCS7() {
    return await this.page.textContent(this.volteStatusDisplay);
  }

  async navigateToCallSimulator() {
    await this.page.click(this.callSimulatorMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async simulateVoiceCall(durationMinutes) {
    await this.page.fill(this.callDurationInput, durationMinutes.toString());
  }

  async confirmCallExecution() {
    await this.page.click(this.executeCallButton);
    await this.page.waitForSelector(this.callConfirmationMessage);
  }

  async navigateToConsumptionSummary() {
    await this.page.click(this.consumptionSummaryMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async getRemainingIncludedMinutes() {
    return await this.page.textContent(this.remainingMinutesDisplay);
  }

  async getAdditionalCharges() {
    return await this.page.textContent(this.additionalChargesDisplay);
  }

  async navigateToConsumptionDetails() {
    await this.page.click(this.consumptionDetailsMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async getExcessMinutes() {
    return await this.page.textContent(this.excessMinutesDisplay);
  }

  async getBulkRatePerMinute() {
    return await this.page.textContent(this.bulkRateDisplay);
  }

  async navigateToInvoice() {
    await this.page.click(this.invoiceMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async getInvoiceExcessMinutes() {
    return await this.page.textContent(this.invoiceExcessMinutesDisplay);
  }

  async getInvoiceExcessCharge() {
    return await this.page.textContent(this.invoiceExcessChargeDisplay);
  }

  async getIncludedMinutesCharge() {
    return await this.page.textContent(this.invoiceIncludedChargeDisplay);
  }

  async navigateToNetworkRecords() {
    await this.page.click(this.networkRecordsMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async getCallTechnology() {
    return await this.page.textContent(this.callTechnologyDisplay);
  }
}

module.exports = ManufacturePlanPage;