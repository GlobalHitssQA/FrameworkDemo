const { expect } = require('@playwright/test');

class InstantLinkPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this._usernameInput = '[data-testid="instant-link-username"]';
    this._passwordInput = '[data-testid="instant-link-password"]';
    this._loginButton = '[data-testid="instant-link-login-btn"]';
    this._userProfileIndicator = '[data-testid="user-profile-indicator"]';
    
    // Navigation locators
    this._lineProvisioningMenu = '[data-testid="menu-line-provisioning"]';
    this._networkStatusIndicator = '[data-testid="network-status-indicator"]';
    
    // Line selection locators
    this._lineSearchInput = '[data-testid="line-search-input"]';
    this._gmLineFilter = '[data-testid="filter-general-motors"]';
    this._lineResultsTable = '[data-testid="line-results-table"]';
    this._lineRow = '[data-testid="line-row"]';
    this._lineConfigurationPanel = '[data-testid="line-configuration-panel"]';
    
    // RATEPLAN selection locators
    this._rateplanDropdown = '[data-testid="rateplan-dropdown"]';
    this._rateplanOption = '[data-testid="rateplan-option"]';
    this._selectedRateplanDisplay = '[data-testid="selected-rateplan-display"]';
    
    // Provisioning action locators
    this._provisioningButton = '[data-testid="execute-provisioning-btn"]';
    this._provisioningConfirmModal = '[data-testid="provisioning-confirm-modal"]';
    this._confirmProvisioningBtn = '[data-testid="confirm-provisioning-btn"]';
    this._provisioningSuccessMessage = '[data-testid="provisioning-success-message"]';
    
    // Logs and transaction locators
    this._logsPanel = '[data-testid="provisioning-logs-panel"]';
    this._transactionDetailsPanel = '[data-testid="transaction-details-panel"]';
    this._serviceVolteLogEntry = '[data-testid="service-volte-log-entry"]';
    this._networkElementsLogsTab = '[data-testid="network-elements-logs-tab"]';
    
    // Network elements query locators
    this._networkQueryPanel = '[data-testid="network-query-panel"]';
    this._hlrHssStatusIndicator = '[data-testid="hlr-hss-status"]';
    this._imsStatusIndicator = '[data-testid="ims-status"]';
    this._volteStatusField = '[data-testid="volte-status-field"]';
    
    // Configuration matrix locators
    this._configMatrixPanel = '[data-testid="config-matrix-panel"]';
    this._volteConfigTable = '[data-testid="volte-config-table"]';
  }

  async navigateToInstantLink() {
    await this.page.goto(process.env.INSTANT_LINK_URL || 'https://instantlink.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithProvisioningPermissions() {
    const username = process.env.INSTANT_LINK_USER || 'provision_user';
    const password = process.env.INSTANT_LINK_PASSWORD || 'secure_password';
    
    await this.page.fill(this._usernameInput, username);
    await this.page.fill(this._passwordInput, password);
    await this.page.click(this._loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isUserAuthenticated() {
    return await this.page.isVisible(this._userProfileIndicator);
  }

  async verifyNetworkElementsConnectivity() {
    await this.page.click(this._networkStatusIndicator);
    await this.page.waitForSelector(this._networkQueryPanel);
    
    const hlrHssConnected = await this.page.getAttribute(this._hlrHssStatusIndicator, 'data-connected') === 'true';
    const imsConnected = await this.page.getAttribute(this._imsStatusIndicator, 'data-connected') === 'true';
    
    return {
      hlrHss: hlrHssConnected,
      ims: imsConnected
    };
  }

  async getVoLTEConfigurationMatrix() {
    await this.page.click(this._configMatrixPanel);
    await this.page.waitForSelector(this._volteConfigTable);
    
    const getVolteStatus = async (rateplan) => {
      const selector = `[data-testid="volte-config-${rateplan.toLowerCase()}"]`;
      return await this.page.getAttribute(selector, 'data-enabled') === 'true';
    };
    
    return {
      testing: await getVolteStatus('testing'),
      manufacture: await getVolteStatus('manufacture'),
      unsoldNotInShowroom: await getVolteStatus('unsold-not-in-showroom'),
      unsoldShowroom: await getVolteStatus('unsold-showroom'),
      sold: await getVolteStatus('sold'),
      dormant: await getVolteStatus('dormant'),
      purged: await getVolteStatus('purged')
    };
  }

  async verifyActiveGMLineExists() {
    await this.page.click(this._lineProvisioningMenu);
    await this.page.click(this._gmLineFilter);
    await this.page.waitForSelector(this._lineResultsTable);
    
    const lineCount = await this.page.locator(this._lineRow).count();
    return lineCount > 0;
  }

  async navigateToLineProvisioning() {
    await this.page.click(this._lineProvisioningMenu);
    await this.page.waitForSelector(this._lineSearchInput);
  }

  async selectGeneralMotorsLine() {
    await this.page.click(this._gmLineFilter);
    await this.page.waitForSelector(this._lineResultsTable);
    
    const firstLine = this.page.locator(this._lineRow).first();
    await firstLine.click();
    
    const lineId = await firstLine.getAttribute('data-line-id');
    return lineId;
  }

  async isLineConfigurationDisplayed() {
    return await this.page.isVisible(this._lineConfigurationPanel);
  }

  async selectRateplan(rateplan) {
    await this.page.click(this._rateplanDropdown);
    await this.page.waitForSelector(this._rateplanOption);
    
    const rateplanSelector = `[data-testid="rateplan-option-${rateplan.toLowerCase()}"]`;
    await this.page.click(rateplanSelector);
  }

  async getSelectedRateplan() {
    return await this.page.textContent(this._selectedRateplanDisplay);
  }

  async executeProvisioning() {
    await this.page.click(this._provisioningButton);
    await this.page.waitForSelector(this._provisioningConfirmModal);
    await this.page.click(this._confirmProvisioningBtn);
    
    await this.page.waitForSelector(this._provisioningSuccessMessage, { timeout: 30000 });
    
    const successVisible = await this.page.isVisible(this._provisioningSuccessMessage);
    return { success: successVisible };
  }

  async getProvisioningTransactionDetails() {
    await this.page.click(this._transactionDetailsPanel);
    
    const transactionId = await this.page.getAttribute(this._transactionDetailsPanel, 'data-transaction-id');
    const serviceVolteIncluded = await this.page.isVisible(this._serviceVolteLogEntry);
    
    return {
      transactionId,
      serviceVolteIncluded
    };
  }

  async getProvisioningLogs() {
    await this.page.click(this._logsPanel);
    await this.page.click(this._networkElementsLogsTab);
    
    const serviceVolteEntry = this.page.locator(this._serviceVolteLogEntry);
    const entryExists = await serviceVolteEntry.count() > 0;
    
    if (!entryExists) {
      return {
        serviceVolteParameter: undefined,
        serviceVolteValue: undefined,
        sentToHlrHss: false,
        sentToIms: false
      };
    }
    
    const serviceVolteValue = await serviceVolteEntry.getAttribute('data-value');
    const sentToHlrHss = await serviceVolteEntry.getAttribute('data-sent-hlr-hss') === 'true';
    const sentToIms = await serviceVolteEntry.getAttribute('data-sent-ims') === 'true';
    
    return {
      serviceVolteParameter: 'SERVICE_VOLTE',
      serviceVolteValue,
      sentToHlrHss,
      sentToIms
    };
  }

  async queryNetworkElementsVoLTEStatus(lineId) {
    await this.page.click(this._networkQueryPanel);
    
    const lineQueryInput = '[data-testid="network-query-line-input"]';
    const queryButton = '[data-testid="network-query-execute-btn"]';
    
    await this.page.fill(lineQueryInput, lineId);
    await this.page.click(queryButton);
    await this.page.waitForSelector(this._volteStatusField);
    
    const hlrHssVoLTEEnabled = await this.page.getAttribute(`${this._hlrHssStatusIndicator} ${this._volteStatusField}`, 'data-enabled') === 'true';
    const imsVoLTEEnabled = await this.page.getAttribute(`${this._imsStatusIndicator} ${this._volteStatusField}`, 'data-enabled') === 'true';
    
    return {
      hlrHssVoLTEEnabled,
      imsVoLTEEnabled
    };
  }
}

module.exports = InstantLinkPage;