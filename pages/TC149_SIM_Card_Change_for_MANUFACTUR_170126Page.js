const { expect } = require('@playwright/test');

class SimChangePage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.userProfileIcon = '[data-testid="user-profile-icon"]';
    
    // Line management locators
    this.lineManagementMenu = '[data-testid="line-management-menu"]';
    this.lineSearchInput = '[data-testid="line-search-input"]';
    this.lineSearchButton = '[data-testid="line-search-button"]';
    this.lineResultsTable = '[data-testid="line-results-table"]';
    this.lineRowSelector = '[data-testid="line-row"]';
    this.linePlanColumn = '[data-testid="line-plan-column"]';
    this.lineIccidColumn = '[data-testid="line-iccid-column"]';
    
    // SIM inventory locators
    this.simInventoryMenu = '[data-testid="sim-inventory-menu"]';
    this.availableSimTable = '[data-testid="available-sim-table"]';
    this.simIccidCell = '[data-testid="sim-iccid-cell"]';
    this.simStatusCell = '[data-testid="sim-status-cell"]';
    
    // SIM change module locators
    this.simChangeMenu = '[data-testid="sim-change-menu"]';
    this.msisdnInput = '[data-testid="msisdn-input"]';
    this.newIccidInput = '[data-testid="new-iccid-input"]';
    this.confirmSimChangeButton = '[data-testid="confirm-sim-change-button"]';
    this.simChangeConfirmationMessage = '[data-testid="sim-change-confirmation-message"]';
    this.simChangeRequestStatus = '[data-testid="sim-change-request-status"]';
    
    // INSTANT LINK locators
    this.instantLinkMenu = '[data-testid="instant-link-menu"]';
    this.instantLinkSearchInput = '[data-testid="instant-link-search-input"]';
    this.instantLinkSearchButton = '[data-testid="instant-link-search-button"]';
    this.instantLinkIccidField = '[data-testid="instant-link-iccid-field"]';
    this.instantLinkRatePlanField = '[data-testid="instant-link-rateplan-field"]';
    this.instantLinkApnList = '[data-testid="instant-link-apn-list"]';
    this.instantLinkApnItem = '[data-testid="instant-link-apn-item"]';
    
    // BSCS7 locators
    this.bscs7Menu = '[data-testid="bscs7-menu"]';
    this.bscs7SearchInput = '[data-testid="bscs7-search-input"]';
    this.bscs7SearchButton = '[data-testid="bscs7-search-button"]';
    this.bscs7VoiceMinutesField = '[data-testid="bscs7-voice-minutes-field"]';
    this.bscs7SmsCountField = '[data-testid="bscs7-sms-count-field"]';
    this.bscs7DataMbField = '[data-testid="bscs7-data-mb-field"]';
    this.bscs7IccidField = '[data-testid="bscs7-iccid-field"]';
    
    // Network provisioning locators
    this.networkProvisioningMenu = '[data-testid="network-provisioning-menu"]';
    this.networkSearchInput = '[data-testid="network-search-input"]';
    this.networkSearchButton = '[data-testid="network-search-button"]';
    this.hlrVolteStatusField = '[data-testid="hlr-volte-status-field"]';
    this.hssVolteStatusField = '[data-testid="hss-volte-status-field"]';
    this.imsVolteStatusField = '[data-testid="ims-volte-status-field"]';
    
    // APN configuration locators
    this.apnConfigurationMenu = '[data-testid="apn-configuration-menu"]';
    this.apnSearchInput = '[data-testid="apn-search-input"]';
    this.apnSearchButton = '[data-testid="apn-search-button"]';
    this.apnEsimDownloadEnabled = '[data-testid="apn-esim-download-enabled"]';
    this.apnEsimDownloadCost = '[data-testid="apn-esim-download-cost"]';
    
    // SIAC Unico locators
    this.siacUnicoMenu = '[data-testid="siac-unico-menu"]';
    this.siacUnicoSearchInput = '[data-testid="siac-unico-search-input"]';
    this.siacUnicoSearchButton = '[data-testid="siac-unico-search-button"]';
    this.siacUnicoTransactionTable = '[data-testid="siac-unico-transaction-table"]';
    this.siacUnicoPreviousIccid = '[data-testid="siac-unico-previous-iccid"]';
    this.siacUnicoNewIccid = '[data-testid="siac-unico-new-iccid"]';
    this.siacUnicoTimestamp = '[data-testid="siac-unico-timestamp"]';
    this.siacUnicoUserId = '[data-testid="siac-unico-user-id"]';
    this.siacUnicoTransactionType = '[data-testid="siac-unico-transaction-type"]';
  }

  async navigateToLogin() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithSimChangePermissions() {
    await this.page.fill(this.usernameInput, process.env.SIM_CHANGE_USER || 'simchange_user');
    await this.page.fill(this.passwordInput, process.env.SIM_CHANGE_PASSWORD || 'password');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isUserLoggedIn() {
    return await this.page.isVisible(this.userProfileIcon);
  }

  async navigateToLineManagement() {
    await this.page.click(this.lineManagementMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveManufactureLine() {
    const lineRows = await this.page.locator(this.lineRowSelector).all();
    for (const row of lineRows) {
      const planText = await row.locator(this.linePlanColumn).textContent();
      if (planText && planText.includes('MANUFACTURE')) {
        await row.click();
        return await row.locator('[data-testid="line-msisdn-column"]').textContent();
      }
    }
    throw new Error('No active MANUFACTURE line found');
  }

  async getCurrentIccid() {
    return await this.page.textContent(this.lineIccidColumn);
  }

  async getLinePlanName() {
    return await this.page.textContent(this.linePlanColumn);
  }

  async navigateToSimInventory() {
    await this.page.click(this.simInventoryMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async getAvailableSimCard() {
    const firstAvailableSim = await this.page.locator(`${this.availableSimTable} tr`).filter({ hasText: 'AVAILABLE' }).first();
    return await firstAvailableSim.locator(this.simIccidCell).textContent();
  }

  async isSimCardAvailable(iccid) {
    const simRow = await this.page.locator(`${this.availableSimTable} tr`).filter({ hasText: iccid });
    const status = await simRow.locator(this.simStatusCell).textContent();
    return status === 'AVAILABLE';
  }

  async navigateToSimChangeModule() {
    await this.page.click(this.simChangeMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async selectLineForSimChange(msisdn) {
    await this.page.fill(this.msisdnInput, msisdn);
  }

  async enterNewIccid(iccid) {
    await this.page.fill(this.newIccidInput, iccid);
  }

  async confirmSimChangeRequest() {
    await this.page.click(this.confirmSimChangeButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getSimChangeConfirmation() {
    await this.page.waitForSelector(this.simChangeConfirmationMessage);
    return await this.page.textContent(this.simChangeConfirmationMessage);
  }

  async getSimChangeRequestStatus() {
    return await this.page.textContent(this.simChangeRequestStatus);
  }

  async navigateToInstantLink() {
    await this.page.click(this.instantLinkMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchLineInInstantLink(msisdn) {
    await this.page.fill(this.instantLinkSearchInput, msisdn);
    await this.page.click(this.instantLinkSearchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getIccidFromInstantLink() {
    return await this.page.textContent(this.instantLinkIccidField);
  }

  async getRatePlanFromInstantLink() {
    return await this.page.textContent(this.instantLinkRatePlanField);
  }

  async getConfiguredApnsFromInstantLink() {
    const apnItems = await this.page.locator(this.instantLinkApnItem).all();
    const apns = [];
    for (const item of apnItems) {
      const apnName = await item.textContent();
      apns.push(apnName.trim());
    }
    return apns;
  }

  async navigateToBscs7() {
    await this.page.click(this.bscs7Menu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchLineInBscs7(msisdn) {
    await this.page.fill(this.bscs7SearchInput, msisdn);
    await this.page.click(this.bscs7SearchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getFreeUnitsFromBscs7() {
    const voiceMinutes = parseInt(await this.page.textContent(this.bscs7VoiceMinutesField), 10);
    const smsCount = parseInt(await this.page.textContent(this.bscs7SmsCountField), 10);
    const dataMb = parseInt(await this.page.textContent(this.bscs7DataMbField), 10);
    return { voiceMinutes, smsCount, dataMb };
  }

  async getIccidFromBscs7() {
    return await this.page.textContent(this.bscs7IccidField);
  }

  async navigateToNetworkProvisioning() {
    await this.page.click(this.networkProvisioningMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchLineInNetworkSystems(msisdn) {
    await this.page.fill(this.networkSearchInput, msisdn);
    await this.page.click(this.networkSearchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getVolteStatusFromHlr() {
    return await this.page.textContent(this.hlrVolteStatusField);
  }

  async getVolteStatusFromHss() {
    return await this.page.textContent(this.hssVolteStatusField);
  }

  async getVolteStatusFromIms() {
    return await this.page.textContent(this.imsVolteStatusField);
  }

  async navigateToApnConfiguration() {
    await this.page.click(this.apnConfigurationMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async getApnConfiguration(apnName) {
    await this.page.fill(this.apnSearchInput, apnName);
    await this.page.click(this.apnSearchButton);
    await this.page.waitForLoadState('networkidle');
    const esimDownloadEnabled = await this.page.textContent(this.apnEsimDownloadEnabled) === 'true';
    const esimDownloadCost = parseFloat(await this.page.textContent(this.apnEsimDownloadCost));
    return { esimDownloadEnabled, esimDownloadCost };
  }

  async navigateToSiacUnico() {
    await this.page.click(this.siacUnicoMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchTransactionInSiacUnico(msisdn) {
    await this.page.fill(this.siacUnicoSearchInput, msisdn);
    await this.page.click(this.siacUnicoSearchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getSimChangeTransactionDetails() {
    const previousIccid = await this.page.textContent(this.siacUnicoPreviousIccid);
    const newIccid = await this.page.textContent(this.siacUnicoNewIccid);
    const timestamp = await this.page.textContent(this.siacUnicoTimestamp);
    const userId = await this.page.textContent(this.siacUnicoUserId);
    const transactionType = await this.page.textContent(this.siacUnicoTransactionType);
    return { previousIccid, newIccid, timestamp, userId, transactionType };
  }
}

module.exports = SimChangePage;