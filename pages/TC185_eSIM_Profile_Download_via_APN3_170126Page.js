const { expect } = require('@playwright/test');

class ESIMDownloadPage {
  constructor(page) {
    this.page = page;
    
    // Provisioning Panel Locators
    this.provisioningPanelLink = '[data-testid="provisioning-panel-link"]';
    this.testingPlanOption = '[data-testid="plan-option-testing"]';
    this.apn3ConfigDropdown = '[data-testid="apn3-config-dropdown"]';
    this.apn3PreproductiveOption = '[data-testid="apn3-preproductive-option"]';
    this.provisionLineButton = '[data-testid="provision-gm-line-btn"]';
    this.lineProvisionedStatus = '[data-testid="line-status-provisioned"]';
    this.gmLineInput = '[data-testid="gm-line-number-input"]';
    
    // eSIM Download Section Locators
    this.esimDownloadSectionLink = '[data-testid="esim-download-section"]';
    this.apn3ConnectionRadio = '[data-testid="apn3-connection-radio"]';
    this.initiateDownloadButton = '[data-testid="initiate-esim-download-btn"]';
    this.apn3ConnectionStatus = '[data-testid="apn3-connection-status"]';
    this.downloadProgressBar = '[data-testid="esim-download-progress"]';
    this.downloadSuccessMessage = '[data-testid="download-success-message"]';
    this.deviceActivationStatus = '[data-testid="device-activation-status"]';
    this.activationErrorsContainer = '[data-testid="activation-errors-container"]';
    
    // BSCS7 Console Locators
    this.bscs7ConsoleLink = '[data-testid="bscs7-console-link"]';
    this.udrQueryInput = '[data-testid="udr-query-input"]';
    this.executeQueryButton = '[data-testid="execute-query-btn"]';
    this.udrResultsTable = '[data-testid="udr-results-table"]';
    this.apn3TrafficCostCell = '[data-testid="apn3-traffic-cost"]';
    
    // Invoice Section Locators
    this.invoiceSectionLink = '[data-testid="invoice-section-link"]';
    this.invoiceSearchInput = '[data-testid="invoice-search-input"]';
    this.searchInvoiceButton = '[data-testid="search-invoice-btn"]';
    this.invoiceDetailsTable = '[data-testid="invoice-details-table"]';
    this.apn3ChargesRow = '[data-testid="apn3-charges-row"]';
    this.esimDownloadChargesRow = '[data-testid="esim-download-charges"]';
    this.inPoolServicesSection = '[data-testid="in-pool-services-section"]';
    this.trafficDetailSection = '[data-testid="traffic-detail-sold-section"]';
  }

  async navigateToProvisioningPanel() {
    await this.page.click(this.provisioningPanelLink);
    await this.page.waitForLoadState('networkidle');
  }

  async selectTestingPlan() {
    await this.page.click(this.testingPlanOption);
  }

  async configureAPN3AsPreproductive() {
    await this.page.click(this.apn3ConfigDropdown);
    await this.page.click(this.apn3PreproductiveOption);
  }

  async provisionGMLine() {
    await this.page.click(this.provisionLineButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineProvisioned() {
    await this.page.waitForSelector(this.lineProvisionedStatus, { timeout: 30000 });
    return await this.page.isVisible(this.lineProvisionedStatus);
  }

  async navigateToESIMDownloadSection() {
    await this.page.click(this.esimDownloadSectionLink);
    await this.page.waitForLoadState('networkidle');
  }

  async selectAPN3Connection() {
    await this.page.click(this.apn3ConnectionRadio);
  }

  async initiateESIMProfileDownload() {
    await this.page.click(this.initiateDownloadButton);
  }

  async verifyAPN3ConnectionEstablished() {
    await this.page.waitForSelector(this.apn3ConnectionStatus, { timeout: 30000 });
    const status = await this.page.textContent(this.apn3ConnectionStatus);
    return status.includes('connected') || status.includes('established');
  }

  async waitForDownloadCompletion() {
    await this.page.waitForSelector(this.downloadSuccessMessage, { timeout: 120000 });
  }

  async verifyDownloadSuccess() {
    return await this.page.isVisible(this.downloadSuccessMessage);
  }

  async getDeviceActivationStatus() {
    await this.page.waitForSelector(this.deviceActivationStatus);
    return await this.page.textContent(this.deviceActivationStatus);
  }

  async checkForActivationErrors() {
    const errorsExist = await this.page.isVisible(this.activationErrorsContainer);
    if (errorsExist) {
      const errorText = await this.page.textContent(this.activationErrorsContainer);
      return errorText.trim().length > 0;
    }
    return false;
  }

  async navigateToBSCS7Console() {
    await this.page.click(this.bscs7ConsoleLink);
    await this.page.waitForLoadState('networkidle');
  }

  async queryUDRTable() {
    const query = "SELECT * FROM UDR_LT_01 WHERE APN = 'APN3' ORDER BY TIMESTAMP DESC LIMIT 10";
    await this.page.fill(this.udrQueryInput, query);
    await this.page.click(this.executeQueryButton);
    await this.page.waitForSelector(this.udrResultsTable);
  }

  async getAPN3TrafficCost() {
    await this.page.waitForSelector(this.apn3TrafficCostCell);
    return await this.page.textContent(this.apn3TrafficCostCell);
  }

  async navigateToInvoiceSection() {
    await this.page.click(this.invoiceSectionLink);
    await this.page.waitForLoadState('networkidle');
  }

  async searchCurrentInvoice() {
    const currentDate = new Date().toISOString().split('T')[0];
    await this.page.fill(this.invoiceSearchInput, currentDate);
    await this.page.click(this.searchInvoiceButton);
    await this.page.waitForSelector(this.invoiceDetailsTable);
  }

  async getAPN3ChargesFromInvoice() {
    const chargesVisible = await this.page.isVisible(this.apn3ChargesRow);
    if (chargesVisible) {
      return await this.page.textContent(this.apn3ChargesRow);
    }
    return '0.00';
  }

  async verifyNoESIMDownloadCharges() {
    return await this.page.isVisible(this.esimDownloadChargesRow);
  }
}

module.exports = ESIMDownloadPage;