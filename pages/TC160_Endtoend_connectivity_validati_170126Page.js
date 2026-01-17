class TelemetryConnectivityPage {
  constructor(page) {
    this.page = page;
    
    // Provisioning Portal Locators
    this.provisioningPortalUrl = '/provisioning';
    this.lineSearchInput = '[data-testid="line-search-input"]';
    this.rateplanDropdown = '[data-testid="rateplan-dropdown"]';
    this.rateplanSOLDOption = '[data-testid="rateplan-option-sold"]';
    this.apn1Checkbox = '[data-testid="apn1-onstarsa-checkbox"]';
    this.inPoolModeRadio = '[data-testid="in-pool-mode-radio"]';
    this.provisionButton = '[data-testid="provision-line-button"]';
    this.provisioningStatusText = '[data-testid="provisioning-status"]';
    
    // Device Simulator Locators
    this.deviceSimulatorUrl = '/device-simulator';
    this.apnSelector = '[data-testid="apn-selector"]';
    this.apn1Option = '[data-testid="apn-option-onstarsa"]';
    this.establishSessionButton = '[data-testid="establish-session-button"]';
    this.sessionStatusIndicator = '[data-testid="session-status"]';
    
    // HLR/HSS Console Locators
    this.hlrHssConsoleUrl = '/hlr-hss-console';
    this.lineAuthSearchInput = '[data-testid="auth-search-input"]';
    this.searchAuthButton = '[data-testid="search-auth-button"]';
    this.authResultText = '[data-testid="auth-result"]';
    this.apn1AuthStatus = '[data-testid="apn1-auth-status"]';
    
    // PCRF Console Locators
    this.pcrfConsoleUrl = '/pcrf-console';
    this.policySearchInput = '[data-testid="policy-search-input"]';
    this.searchPoliciesButton = '[data-testid="search-policies-button"]';
    this.inPoolPolicyStatus = '[data-testid="in-pool-policy-status"]';
    this.consumptionSourceText = '[data-testid="consumption-source"]';
    
    // GGSN/PGW Console Locators
    this.ggsnPgwConsoleUrl = '/ggsn-pgw-console';
    this.trafficRoutingSearchInput = '[data-testid="traffic-routing-search"]';
    this.searchRoutingButton = '[data-testid="search-routing-button"]';
    this.routingDestinationText = '[data-testid="routing-destination"]';
    this.e2eConnectivityStatus = '[data-testid="e2e-connectivity-status"]';
    
    // Telemetry Server Dashboard Locators
    this.telemetryServerUrl = '/telemetry-server';
    this.receivedDataSearchInput = '[data-testid="received-data-search"]';
    this.searchDataButton = '[data-testid="search-data-button"]';
    this.dataReceivedIndicator = '[data-testid="data-received-indicator"]';
    this.dataIntegrityStatus = '[data-testid="data-integrity-status"]';
    
    // BSCS7 Console Locators
    this.bscs7ConsoleUrl = '/bscs7-console';
    this.udrTableQueryInput = '[data-testid="udr-query-input"]';
    this.executeQueryButton = '[data-testid="execute-query-button"]';
    this.consumptionRecordApn = '[data-testid="consumption-record-apn"]';
    this.consumptionRecordCost = '[data-testid="consumption-record-cost"]';
    this.consumptionRecordBillingMode = '[data-testid="consumption-record-billing-mode"]';
  }

  async navigateToProvisioningPortal() {
    await this.page.goto(this.provisioningPortalUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLineWithRateplanSOLD() {
    await this.page.click(this.rateplanDropdown);
    await this.page.click(this.rateplanSOLDOption);
  }

  async enableAPN1ForInPoolTelemetry() {
    await this.page.check(this.apn1Checkbox);
    await this.page.check(this.inPoolModeRadio);
    await this.page.click(this.provisionButton);
    await this.page.waitForSelector(this.provisioningStatusText);
  }

  async getProvisioningStatus() {
    return await this.page.textContent(this.provisioningStatusText);
  }

  async navigateToDeviceSimulator() {
    await this.page.goto(this.deviceSimulatorUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async establishDataSessionWithAPN1() {
    await this.page.click(this.apnSelector);
    await this.page.click(this.apn1Option);
    await this.page.click(this.establishSessionButton);
    await this.page.waitForSelector(this.sessionStatusIndicator);
  }

  async getDataSessionStatus() {
    return await this.page.textContent(this.sessionStatusIndicator);
  }

  async navigateToHLRHSSConsole() {
    await this.page.goto(this.hlrHssConsoleUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async searchForLineAuthentication() {
    await this.page.click(this.searchAuthButton);
    await this.page.waitForSelector(this.authResultText);
  }

  async getAuthenticationResult() {
    return await this.page.textContent(this.authResultText);
  }

  async verifyAPN1Authentication() {
    const status = await this.page.textContent(this.apn1AuthStatus);
    return status === 'AUTHENTICATED';
  }

  async navigateToPCRFConsole() {
    await this.page.goto(this.pcrfConsoleUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async searchForActivePolicies() {
    await this.page.click(this.searchPoliciesButton);
    await this.page.waitForSelector(this.inPoolPolicyStatus);
  }

  async getInPoolPolicyStatus() {
    return await this.page.textContent(this.inPoolPolicyStatus);
  }

  async getConsumptionSource() {
    return await this.page.textContent(this.consumptionSourceText);
  }

  async navigateToGGSNPGWConsole() {
    await this.page.goto(this.ggsnPgwConsoleUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async searchForTrafficRouting() {
    await this.page.click(this.searchRoutingButton);
    await this.page.waitForSelector(this.routingDestinationText);
  }

  async getTrafficRoutingDestination() {
    return await this.page.textContent(this.routingDestinationText);
  }

  async getEndToEndConnectivityStatus() {
    return await this.page.textContent(this.e2eConnectivityStatus);
  }

  async navigateToTelemetryServerDashboard() {
    await this.page.goto(this.telemetryServerUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async searchForReceivedData() {
    await this.page.click(this.searchDataButton);
    await this.page.waitForSelector(this.dataReceivedIndicator);
  }

  async isDataReceivedFromVehicle() {
    const indicator = await this.page.textContent(this.dataReceivedIndicator);
    return indicator === 'RECEIVED';
  }

  async validateDataIntegrity() {
    return await this.page.textContent(this.dataIntegrityStatus);
  }

  async navigateToBSCS7Console() {
    await this.page.goto(this.bscs7ConsoleUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async queryUDRLT01Table() {
    await this.page.fill(this.udrTableQueryInput, 'SELECT * FROM UDR_LT_01 WHERE APN = onstarsa');
    await this.page.click(this.executeQueryButton);
    await this.page.waitForSelector(this.consumptionRecordApn);
  }

  async getConsumptionRecord() {
    const apn = await this.page.textContent(this.consumptionRecordApn);
    const cost = await this.page.textContent(this.consumptionRecordCost);
    const billingMode = await this.page.textContent(this.consumptionRecordBillingMode);
    return { apn, cost, billingMode };
  }
}

module.exports = TelemetryConnectivityPage;