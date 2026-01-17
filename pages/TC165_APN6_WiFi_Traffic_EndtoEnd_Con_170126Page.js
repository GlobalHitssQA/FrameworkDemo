const { expect } = require('@playwright/test');

class APN6ConnectivityPage {
  constructor(page) {
    this.page = page;
    
    // Provisioning Module Locators
    this.provisioningMenuBtn = page.locator('[data-testid="menu-provisioning"]');
    this.planSelector = page.locator('[data-testid="plan-selector"]');
    this.manufacturePlanOption = page.locator('[data-testid="plan-option-manufacture"]');
    this.apn6Checkbox = page.locator('[data-testid="apn6-wifi-checkbox"]');
    this.apnConfigInput = page.locator('#apn-configuration-input');
    this.submitProvisioningBtn = page.locator('[data-testid="btn-submit-provisioning"]');
    this.provisioningSuccessMessage = page.locator('[data-testid="provisioning-success-msg"]');
    
    // BSCS7 Console Locators
    this.bscs7MenuBtn = page.locator('[data-testid="menu-bscs7"]');
    this.lineSearchInput = page.locator('#bscs7-line-search');
    this.searchLineBtn = page.locator('[data-testid="btn-search-line"]');
    this.apnConfigTab = page.locator('[data-testid="tab-apn-configuration"]');
    this.apn6StatusField = page.locator('[data-testid="apn6-status-field"]');
    this.apn6NameField = page.locator('[data-testid="apn6-name-field"]');
    
    // Data Session Module Locators
    this.dataSessionMenuBtn = page.locator('[data-testid="menu-data-session"]');
    this.initiateSessionBtn = page.locator('[data-testid="btn-initiate-wifi-session"]');
    this.sessionStatusField = page.locator('[data-testid="session-status"]');
    this.sessionAPNTypeField = page.locator('[data-testid="session-apn-type"]');
    
    // Traffic Test Locators
    this.executeTrafficTestBtn = page.locator('[data-testid="btn-execute-traffic-test"]');
    this.trafficProgressIndicator = page.locator('[data-testid="traffic-progress"]');
    this.trafficCompleteStatus = page.locator('[data-testid="traffic-complete-status"]');
    
    // UDR Records Locators
    this.udrRecordsMenuBtn = page.locator('[data-testid="menu-udr-records"]');
    this.udrTableSelector = page.locator('[data-testid="udr-table-selector"]');
    this.udrLT01Option = page.locator('[data-testid="udr-option-lt01"]');
    this.udrSearchBtn = page.locator('[data-testid="btn-search-udr"]');
    this.udrRecordRow = page.locator('[data-testid="udr-record-row"]');
    this.udrRecordStatus = page.locator('[data-testid="udr-record-status"]');
    
    // Billing Module Locators
    this.billingMenuBtn = page.locator('[data-testid="menu-billing"]');
    this.billingTypeField = page.locator('[data-testid="billing-type-field"]');
    this.ratePerMBField = page.locator('[data-testid="rate-per-mb"]');
    this.igvIncludedField = page.locator('[data-testid="igv-included-indicator"]');
  }

  async navigateToProvisioningModule() {
    await this.provisioningMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectManufacturePlan() {
    await this.planSelector.click();
    await this.manufacturePlanOption.click();
  }

  async configureAPN6ForWiFi() {
    await this.apn6Checkbox.check();
    await this.apnConfigInput.fill('onstarawificp');
  }

  async submitProvisioning() {
    await this.submitProvisioningBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isLineProvisionedSuccessfully() {
    return await this.provisioningSuccessMessage.isVisible();
  }

  async navigateToBSCS7Console() {
    await this.bscs7MenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchLineInBSCS7() {
    await this.lineSearchInput.fill(this.currentLineNumber || '');
    await this.searchLineBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openAPNConfiguration() {
    await this.apnConfigTab.click();
  }

  async getAPN6Status() {
    return await this.apn6StatusField.textContent();
  }

  async getAPN6Name() {
    return await this.apn6NameField.textContent();
  }

  async navigateToDataSessionModule() {
    await this.dataSessionMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async initiateWiFiDataSession() {
    await this.initiateSessionBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getDataSessionStatus() {
    return await this.sessionStatusField.textContent();
  }

  async getSessionAPNType() {
    return await this.sessionAPNTypeField.textContent();
  }

  async executeWiFiTrafficTest() {
    await this.executeTrafficTestBtn.click();
  }

  async waitForTrafficCompletion() {
    await this.trafficCompleteStatus.waitFor({ state: 'visible', timeout: 60000 });
  }

  async navigateToUDRRecords() {
    await this.udrRecordsMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchTrafficInUDRLT01() {
    await this.udrTableSelector.click();
    await this.udrLT01Option.click();
    await this.udrSearchBtn.click();
    await this.page.waitForLoadState('networkidle');
    return await this.udrRecordRow.isVisible();
  }

  async getUDRRecordStatus() {
    return await this.udrRecordStatus.textContent();
  }

  async navigateToBillingModule() {
    await this.billingMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getBillingType() {
    return await this.billingTypeField.textContent();
  }

  async getRatePerMB() {
    const rateText = await this.ratePerMBField.textContent();
    return parseFloat(rateText.replace(/[^0-9.]/g, ''));
  }

  async doesRateIncludeIGV() {
    const igvText = await this.igvIncludedField.textContent();
    return igvText.toLowerCase().includes('incluido') || igvText.toLowerCase() === 'si';
  }
}

module.exports = APN6ConnectivityPage;