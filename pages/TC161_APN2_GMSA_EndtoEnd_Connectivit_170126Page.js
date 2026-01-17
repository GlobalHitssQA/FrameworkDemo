class ProvisioningPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-btn"]';
    this.provisioningMenu = '[data-testid="menu-provisioning"]';
    this.lineProvisioningOption = '[data-testid="menu-line-provisioning"]';
    this.newLineButton = '[data-testid="btn-new-line"]';
    this.planSelector = '[data-testid="select-plan"]';
    this.apn2Checkbox = '[data-testid="checkbox-apn2-gmsa"]';
    this.confirmProvisioningButton = '[data-testid="btn-confirm-provisioning"]';
    this.provisioningStatusLabel = '[data-testid="label-provisioning-status"]';
    this.apn2ConfiguredIndicator = '[data-testid="indicator-apn2-configured"]';
  }

  async navigateToLogin() {
    await this.page.goto('/login');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.TEST_PASSWORD || 'testpass');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToLineProvisioning() {
    await this.page.click(this.provisioningMenu);
    await this.page.click(this.lineProvisioningOption);
    await this.page.waitForLoadState('networkidle');
  }

  async startNewLineProvisioning() {
    await this.page.click(this.newLineButton);
  }

  async selectPlanWithAPN2Support(planName) {
    await this.page.selectOption(this.planSelector, { label: planName });
    await this.page.check(this.apn2Checkbox);
    await this.page.click(this.confirmProvisioningButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineProvisioned() {
    const statusText = await this.page.textContent(this.provisioningStatusLabel);
    return statusText.includes('Provisioned') || statusText.includes('Success');
  }

  async verifyAPN2Configured() {
    return await this.page.isVisible(this.apn2ConfiguredIndicator);
  }
}

class BSCS7Page {
  constructor(page) {
    this.page = page;
    this.systemStatusIndicator = '[data-testid="bscs7-system-status"]';
    this.lineDetailsMenu = '[data-testid="menu-line-details"]';
    this.msisdnSearchInput = '[data-testid="input-msisdn-search"]';
    this.searchButton = '[data-testid="btn-search-line"]';
    this.apnNameLabel = '[data-testid="label-apn-name"]';
    this.apnStatusLabel = '[data-testid="label-apn-status"]';
  }

  async verifySystemAvailable() {
    await this.page.goto('/bscs7');
    await this.page.waitForSelector(this.systemStatusIndicator);
    const status = await this.page.textContent(this.systemStatusIndicator);
    return status.includes('Available') || status.includes('Online');
  }

  async navigateToLineDetails() {
    await this.page.click(this.lineDetailsMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async searchLineByMSISDN() {
    const msisdn = process.env.TEST_MSISDN || '1234567890';
    await this.page.fill(this.msisdnSearchInput, msisdn);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getAssignedAPNName() {
    return await this.page.textContent(this.apnNameLabel);
  }

  async getAPNStatus() {
    const statusText = await this.page.textContent(this.apnStatusLabel);
    return statusText.toLowerCase();
  }
}

class NetworkMonitorPage {
  constructor(page) {
    this.page = page;
    this.networkComponentsPanel = '[data-testid="panel-network-components"]';
    this.hlrStatus = '[data-testid="status-hlr"]';
    this.hssStatus = '[data-testid="status-hss"]';
    this.imsStatus = '[data-testid="status-ims"]';
    this.pcrfStatus = '[data-testid="status-pcrf"]';
    this.instantLinkStatus = '[data-testid="status-instant-link"]';
    this.dataSessionPanel = '[data-testid="panel-data-session"]';
    this.initiateSessionButton = '[data-testid="btn-initiate-session-apn2"]';
    this.sessionStatusLabel = '[data-testid="label-session-status"]';
    this.fotaTrafficButton = '[data-testid="btn-initiate-fota-traffic"]';
    this.udrTableSelector = '[data-testid="table-udr-records"]';
    this.udrTableRows = '[data-testid="table-udr-records"] tbody tr';
    this.connectivityTestButton = '[data-testid="btn-test-connectivity"]';
    this.connectivityStatusLabel = '[data-testid="label-connectivity-status"]';
    this.fotaDownloadTestButton = '[data-testid="btn-test-fota-download"]';
    this.fotaDownloadStatusLabel = '[data-testid="label-fota-download-status"]';
  }

  async verifyNetworkComponentsConfigured() {
    await this.page.goto('/network-monitor');
    await this.page.waitForSelector(this.networkComponentsPanel);
    const hlr = await this.page.textContent(this.hlrStatus);
    const hss = await this.page.textContent(this.hssStatus);
    const ims = await this.page.textContent(this.imsStatus);
    const pcrf = await this.page.textContent(this.pcrfStatus);
    return hlr.includes('Configured') && hss.includes('Configured') && ims.includes('Configured') && pcrf.includes('Configured');
  }

  async verifyInstantLinkOperational() {
    const status = await this.page.textContent(this.instantLinkStatus);
    return status.includes('Operational') || status.includes('Online');
  }

  async initiateDataSessionAPN2() {
    await this.page.click(this.dataSessionPanel);
    await this.page.click(this.initiateSessionButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDataSessionEstablished() {
    const status = await this.page.textContent(this.sessionStatusLabel);
    return status.includes('Established') || status.includes('Active');
  }

  async initiateFOTATraffic() {
    await this.page.click(this.fotaTrafficButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTrafficInUDRTable(tableName) {
    await this.page.waitForSelector(this.udrTableSelector);
    const rows = await this.page.$$(this.udrTableRows);
    return rows.length > 0;
  }

  async verifyEndToEndConnectivity() {
    await this.page.click(this.connectivityTestButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getConnectivityStatus() {
    const status = await this.page.textContent(this.connectivityStatusLabel);
    return status.toLowerCase();
  }

  async verifyFOTADownloadCapability() {
    await this.page.click(this.fotaDownloadTestButton);
    await this.page.waitForLoadState('networkidle');
    const status = await this.page.textContent(this.fotaDownloadStatusLabel);
    return status.includes('Success') || status.includes('Ready');
  }
}

module.exports = { ProvisioningPage, BSCS7Page, NetworkMonitorPage };