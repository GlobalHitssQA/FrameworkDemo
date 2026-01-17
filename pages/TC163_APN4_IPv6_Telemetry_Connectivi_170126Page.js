const { expect } = require('@playwright/test');

class TelemetryConnectivityPage {
  constructor(page) {
    this.page = page;
    
    // Provisioning Section Locators
    this.provisioningMenuBtn = page.locator('[data-testid="menu-provisioning"]');
    this.newLineBtn = page.locator('[data-testid="btn-new-line"]');
    this.soldPlanSelect = page.locator('[data-testid="select-plan-sold"]');
    this.apnConfigSection = page.locator('[data-testid="section-apn-config"]');
    this.apn4Checkbox = page.locator('[data-testid="checkbox-apn4-onstar01-v6"]');
    this.provisionBtn = page.locator('[data-testid="btn-provision-line"]');
    this.provisioningStatus = page.locator('[data-testid="status-provisioning"]');
    
    // BSCS7 Console Locators
    this.bscs7MenuBtn = page.locator('[data-testid="menu-bscs7"]');
    this.lineSearchInput = page.locator('[data-testid="input-line-search"]');
    this.searchBtn = page.locator('[data-testid="btn-search"]');
    this.apnConfigTab = page.locator('[data-testid="tab-apn-configuration"]');
    this.apn4StatusLabel = page.locator('[data-testid="label-apn4-status"]');
    this.ipv6StatusIndicator = page.locator('[data-testid="indicator-ipv6-enabled"]');
    
    // Session Management Locators
    this.sessionMgmtMenuBtn = page.locator('[data-testid="menu-session-management"]');
    this.initiateSessionBtn = page.locator('[data-testid="btn-initiate-session"]');
    this.protocolSelect = page.locator('[data-testid="select-protocol"]');
    this.ipv6Option = page.locator('[data-testid="option-ipv6"]');
    this.startSessionBtn = page.locator('[data-testid="btn-start-session"]');
    this.sessionStatusLabel = page.locator('[data-testid="label-session-status"]');
    this.sessionProtocolLabel = page.locator('[data-testid="label-session-protocol"]');
    
    // Data Transmission Locators
    this.dataTransmissionMenuBtn = page.locator('[data-testid="menu-data-transmission"]');
    this.telemetryTypeSelect = page.locator('[data-testid="select-telemetry-type"]');
    this.transmitBtn = page.locator('[data-testid="btn-transmit-data"]');
    
    // UDR Records Locators
    this.udrRecordsMenuBtn = page.locator('[data-testid="menu-udr-records"]');
    this.udrLt01Table = page.locator('[data-testid="table-udr-lt-01"]');
    this.trafficRecordRow = page.locator('[data-testid="row-traffic-record"]');
    
    // Quota Management Locators
    this.quotaMgmtMenuBtn = page.locator('[data-testid="menu-quota-management"]');
    this.inPoolSection = page.locator('[data-testid="section-in-pool"]');
    this.inPoolUsageLabel = page.locator('[data-testid="label-in-pool-usage"]');
    this.inPoolLimitLabel = page.locator('[data-testid="label-in-pool-limit"]');
    this.trafficAccountedIndicator = page.locator('[data-testid="indicator-traffic-accounted"]');
  }

  async navigateToProvisioningSection() {
    await this.provisioningMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLineWithSOLDPlan() {
    await this.newLineBtn.click();
    await this.soldPlanSelect.click();
    await this.page.locator('[data-testid="option-sold-plan"]').click();
  }

  async configureAPN4Onstar01V6() {
    await this.apnConfigSection.click();
    await this.apn4Checkbox.check();
    await this.provisionBtn.click();
  }

  async verifyLineProvisionedWithAPN4() {
    await this.provisioningStatus.waitFor({ state: 'visible' });
    const statusText = await this.provisioningStatus.textContent();
    return statusText.includes('Provisioned') && statusText.includes('APN4');
  }

  async navigateToBSCS7Console() {
    await this.bscs7MenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchLineInBSCS7() {
    await this.lineSearchInput.fill(process.env.TEST_LINE_NUMBER || '5500000000');
    await this.searchBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openAPNConfiguration() {
    await this.apnConfigTab.click();
  }

  async getAPN4Status() {
    return await this.apn4StatusLabel.textContent();
  }

  async isIPv6ProtocolEnabled() {
    return await this.ipv6StatusIndicator.isVisible();
  }

  async navigateToSessionManagement() {
    await this.sessionMgmtMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async initiateDataSessionAPN4() {
    await this.initiateSessionBtn.click();
  }

  async selectIPv6Protocol() {
    await this.protocolSelect.click();
    await this.ipv6Option.click();
  }

  async startTelemetrySession() {
    await this.startSessionBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifySessionEstablished() {
    const statusText = await this.sessionStatusLabel.textContent();
    return statusText.includes('Established') || statusText.includes('Active');
  }

  async getSessionProtocol() {
    return await this.sessionProtocolLabel.textContent();
  }

  async navigateToDataTransmission() {
    await this.dataTransmissionMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectTelemetryDataType() {
    await this.telemetryTypeSelect.click();
    await this.page.locator('[data-testid="option-telemetry-ipv6"]').click();
  }

  async transmitTelemetryData() {
    await this.transmitBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToUDRRecords() {
    await this.udrRecordsMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTrafficInUDRLT01() {
    await this.udrLt01Table.waitFor({ state: 'visible' });
    const rowCount = await this.trafficRecordRow.count();
    return rowCount > 0;
  }

  async navigateToQuotaManagement() {
    await this.quotaMgmtMenuBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTrafficAccountedInPool() {
    await this.inPoolSection.click();
    return await this.trafficAccountedIndicator.isVisible();
  }

  async getInPoolQuotaUsage() {
    const usageText = await this.inPoolUsageLabel.textContent();
    const usageMatch = usageText.match(/([\d.]+)/);
    return usageMatch ? parseFloat(usageMatch[1]) : 0;
  }

  async getInPoolQuotaLimit() {
    return await this.inPoolLimitLabel.textContent();
  }
}

module.exports = TelemetryConnectivityPage;