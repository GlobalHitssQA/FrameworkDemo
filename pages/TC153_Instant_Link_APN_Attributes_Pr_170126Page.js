class InstantLinkPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.INSTANT_LINK_URL || 'https://instantlink.example.com';
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-btn"]';
    this.lineProvisioningMenu = '[data-testid="menu-line-provisioning"]';
    this.gmLinesSection = '[data-testid="section-gm-lines"]';
    this.lineSearchInput = '[data-testid="input-line-search"]';
    this.lineResultsTable = '[data-testid="table-line-results"]';
    this.lineRowSelector = '[data-testid="row-line-item"]';
    this.selectedLineDisplay = '[data-testid="display-selected-line"]';
    this.provisioningAvailableIndicator = '[data-testid="indicator-provisioning-available"]';
    this.ratePlanDropdown = '[data-testid="dropdown-rateplan"]';
    this.ratePlanOption = '[data-testid="option-rateplan"]';
    this.executeProvisioningButton = '[data-testid="btn-execute-provisioning"]';
    this.provisioningConfirmationModal = '[data-testid="modal-provisioning-confirmation"]';
    this.confirmProvisioningButton = '[data-testid="btn-confirm-provisioning"]';
    this.logsMenu = '[data-testid="menu-logs"]';
    this.logsFilterInput = '[data-testid="input-logs-filter"]';
    this.logsFilterApplyButton = '[data-testid="btn-apply-logs-filter"]';
    this.logsTable = '[data-testid="table-logs"]';
    this.logRowSelector = '[data-testid="row-log-item"]';
    this.apnAttributesColumn = '[data-testid="column-apn-attributes"]';
    this.networkElementsMenu = '[data-testid="menu-network-elements"]';
    this.pcrfQuerySection = '[data-testid="section-pcrf-query"]';
    this.hlrHssQuerySection = '[data-testid="section-hlr-hss-query"]';
    this.queryExecuteButton = '[data-testid="btn-execute-query"]';
    this.queryResultsPanel = '[data-testid="panel-query-results"]';
    this.apnConfigurationList = '[data-testid="list-apn-configuration"]';
    this.bscs7StatusIndicator = '[data-testid="indicator-bscs7-status"]';
    this.networkConnectivityIndicator = '[data-testid="indicator-network-connectivity"]';
  }

  async navigateToInstantLink() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithProvisioningPermissions() {
    const username = process.env.INSTANT_LINK_USER || 'provision_user';
    const password = process.env.INSTANT_LINK_PASSWORD || 'secure_password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyBSCS7Configuration() {
    await this.page.waitForSelector(this.bscs7StatusIndicator);
    const status = await this.page.textContent(this.bscs7StatusIndicator);
    return status.includes('Configured') || status.includes('Active');
  }

  async verifyNetworkElementsConnectivity() {
    await this.page.waitForSelector(this.networkConnectivityIndicator);
    const status = await this.page.textContent(this.networkConnectivityIndicator);
    return status.includes('Connected') || status.includes('Online');
  }

  async accessLineProvisioning() {
    await this.page.click(this.lineProvisioningMenu);
    await this.page.waitForSelector(this.gmLinesSection);
  }

  async selectGeneralMotorsLine() {
    await this.page.waitForSelector(this.lineResultsTable);
    const firstLine = this.page.locator(this.lineRowSelector).first();
    await firstLine.click();
  }

  async isLineAvailableForProvisioning() {
    await this.page.waitForSelector(this.selectedLineDisplay);
    const indicator = await this.page.isVisible(this.provisioningAvailableIndicator);
    return indicator;
  }

  async selectRatePlan(ratePlanName) {
    await this.page.click(this.ratePlanDropdown);
    await this.page.click(`${this.ratePlanOption}[data-value="${ratePlanName}"]`);
  }

  async executeProvisioning() {
    await this.page.click(this.executeProvisioningButton);
    await this.page.waitForSelector(this.provisioningConfirmationModal);
    await this.page.click(this.confirmProvisioningButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getSentAPNsFromLogs() {
    await this.navigateToLogs();
    const logRows = await this.page.locator(this.logRowSelector).all();
    const apns = [];
    for (const row of logRows) {
      const apnText = await row.locator(this.apnAttributesColumn).textContent();
      const apnMatches = apnText.match(/APN\d/g);
      if (apnMatches) {
        apns.push(...apnMatches);
      }
    }
    return [...new Set(apns)];
  }

  async getAPNConfigurations() {
    const configItems = await this.page.locator(this.apnConfigurationList).locator('li').all();
    const configurations = [];
    for (const item of configItems) {
      const text = await item.textContent();
      configurations.push({
        usage: text.includes('usage:') ? text.split('usage:')[1].split(',')[0].trim() : null,
        classification: text.includes('class:') ? text.split('class:')[1].split(',')[0].trim() : null,
        billing: text.includes('billing:') ? text.split('billing:')[1].split(',')[0].trim() : null
      });
    }
    return configurations;
  }

  async navigateToLogs() {
    await this.page.click(this.logsMenu);
    await this.page.waitForSelector(this.logsTable);
  }

  async filterLogsByAPNAttributes() {
    await this.page.fill(this.logsFilterInput, 'APN attributes');
    await this.page.click(this.logsFilterApplyButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getAPNLogDetails(apnName) {
    const logRow = this.page.locator(this.logRowSelector, { hasText: apnName }).first();
    const logText = await logRow.textContent();
    const usageMatch = logText.match(/usage:\s*([^,]+)/);
    return {
      apnName: apnName,
      usage: usageMatch ? usageMatch[1].trim() : null
    };
  }

  async navigateToNetworkElementsQuery() {
    await this.page.click(this.networkElementsMenu);
    await this.page.waitForSelector(this.pcrfQuerySection);
  }

  async queryPCRF() {
    await this.page.click(this.pcrfQuerySection);
    await this.page.click(this.queryExecuteButton);
    await this.page.waitForSelector(this.queryResultsPanel);
  }

  async queryHLRHSS() {
    await this.page.click(this.hlrHssQuerySection);
    await this.page.click(this.queryExecuteButton);
    await this.page.waitForSelector(this.queryResultsPanel);
  }

  async getPCRFConfiguration() {
    const resultsText = await this.page.textContent(this.queryResultsPanel);
    return {
      apnsConfigured: resultsText.includes('APN') && !resultsText.includes('No APNs')
    };
  }

  async getHLRHSSConfiguration() {
    const resultsText = await this.page.textContent(this.queryResultsPanel);
    return {
      apnsConfigured: resultsText.includes('APN') && !resultsText.includes('No APNs')
    };
  }
}

module.exports = InstantLinkPage;