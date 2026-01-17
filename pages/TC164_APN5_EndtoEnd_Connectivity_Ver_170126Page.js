const { expect } = require('@playwright/test');

class APN5ConnectivityPage {
  constructor(page) {
    this.page = page;
    
    this.userAuthIndicator = '[data-testid="user-authenticated-indicator"]';
    this.networkStatusPanel = '[data-testid="network-status-panel"]';
    this.dualStackIndicator = '[data-testid="dual-stack-support-indicator"]';
    this.pcrfStatusSection = '[data-testid="pcrf-status-section"]';
    this.pcrfApn5PolicyStatus = '[data-testid="pcrf-apn5-policy-status"]';
    this.instantLinkStatus = '[data-testid="instant-link-status"]';
    this.bscs7StatusIndicator = '[data-testid="bscs7-availability-status"]';
    
    this.provisioningMenuLink = '[data-testid="provisioning-menu-link"]';
    this.provisioningSection = '[data-testid="provisioning-section"]';
    this.planDropdown = '[data-testid="plan-selection-dropdown"]';
    this.unsoldShowroomOption = '[data-testid="plan-option-unsold-showroom"]';
    this.apnConfigSection = '[data-testid="apn-configuration-section"]';
    this.apn5Checkbox = '[data-testid="apn5-onstarlhu-checkbox"]';
    this.submitProvisioningBtn = '[data-testid="submit-provisioning-button"]';
    this.provisioningSuccessMessage = '[data-testid="provisioning-success-message"]';
    this.apn5DualStackStatus = '[data-testid="apn5-dual-stack-status"]';
    
    this.bscs7NavigationLink = '[data-testid="bscs7-navigation-link"]';
    this.bscs7SearchInput = '[data-testid="bscs7-line-search-input"]';
    this.bscs7SearchButton = '[data-testid="bscs7-search-button"]';
    this.bscs7ApnSection = '[data-testid="bscs7-apn-section"]';
    this.bscs7Apn5Row = '[data-testid="bscs7-apn5-row"]';
    this.bscs7Ipv4SupportIndicator = '[data-testid="bscs7-ipv4-support"]';
    this.bscs7Ipv6SupportIndicator = '[data-testid="bscs7-ipv6-support"]';
    
    this.dataSessionMenuLink = '[data-testid="data-session-menu-link"]';
    this.dataSessionSection = '[data-testid="data-session-section"]';
    this.apnSessionDropdown = '[data-testid="apn-session-dropdown"]';
    this.apn5SessionOption = '[data-testid="apn-option-apn5"]';
    this.protocolDropdown = '[data-testid="protocol-selection-dropdown"]';
    this.ipv4ProtocolOption = '[data-testid="protocol-option-ipv4"]';
    this.ipv6ProtocolOption = '[data-testid="protocol-option-ipv6"]';
    this.initiateSessionBtn = '[data-testid="initiate-session-button"]';
    this.sessionStatusIndicator = '[data-testid="session-status-indicator"]';
    this.ipv4SessionActiveStatus = '[data-testid="ipv4-session-active"]';
    this.ipv6SessionActiveStatus = '[data-testid="ipv6-session-active"]';
    
    this.fotaTrafficSection = '[data-testid="fota-traffic-section"]';
    this.initiateFotaTrafficBtn = '[data-testid="initiate-fota-traffic-button"]';
    this.trafficLogTable = '[data-testid="traffic-log-table"]';
    this.bulkRateIndicator = '[data-testid="bulk-rate-indicator"]';
    this.trafficFlowStatus = '[data-testid="traffic-flow-status"]';
    this.ipv6TrafficLogRow = '[data-testid="ipv6-traffic-log-row"]';
    this.ipv6BulkRateIndicator = '[data-testid="ipv6-bulk-rate-indicator"]';
  }

  async navigateToSystem() {
    await this.page.goto(process.env.BASE_URL || 'https://lifecycle-gm.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserAuthenticated() {
    await this.page.waitForSelector(this.userAuthIndicator, { state: 'visible' });
    return await this.page.isVisible(this.userAuthIndicator);
  }

  async verifyDualStackNetworkSupport() {
    await this.page.waitForSelector(this.networkStatusPanel, { state: 'visible' });
    const dualStackEnabled = await this.page.isVisible(this.dualStackIndicator);
    return dualStackEnabled;
  }

  async verifyPCRFPoliciesForAPN5() {
    await this.page.waitForSelector(this.pcrfStatusSection, { state: 'visible' });
    const policyStatus = await this.page.textContent(this.pcrfApn5PolicyStatus);
    return policyStatus.includes('configured') || policyStatus.includes('active');
  }

  async verifyInstantLinkOperational() {
    await this.page.waitForSelector(this.instantLinkStatus, { state: 'visible' });
    const status = await this.page.textContent(this.instantLinkStatus);
    return status.includes('operational') || status.includes('active');
  }

  async verifyBSCS7Availability() {
    await this.page.waitForSelector(this.bscs7StatusIndicator, { state: 'visible' });
    const status = await this.page.textContent(this.bscs7StatusIndicator);
    return status.includes('available') || status.includes('online');
  }

  async openProvisioningSection() {
    await this.page.click(this.provisioningMenuLink);
    await this.page.waitForSelector(this.provisioningSection, { state: 'visible' });
  }

  async selectUnsoldShowroomPlan() {
    await this.page.click(this.planDropdown);
    await this.page.waitForSelector(this.unsoldShowroomOption, { state: 'visible' });
    await this.page.click(this.unsoldShowroomOption);
  }

  async configureAPN5Onstarlhu() {
    await this.page.waitForSelector(this.apnConfigSection, { state: 'visible' });
    await this.page.check(this.apn5Checkbox);
  }

  async submitProvisioning() {
    await this.page.click(this.submitProvisioningBtn);
    await this.page.waitForSelector(this.provisioningSuccessMessage, { state: 'visible' });
  }

  async verifyLineProvisionedWithAPN5DualStack() {
    await this.page.waitForSelector(this.apn5DualStackStatus, { state: 'visible' });
    const status = await this.page.textContent(this.apn5DualStackStatus);
    return status.includes('IPv4') && status.includes('IPv6');
  }

  async navigateToBSCS7() {
    await this.page.click(this.bscs7NavigationLink);
    await this.page.waitForSelector(this.bscs7SearchInput, { state: 'visible' });
  }

  async searchLineInBSCS7() {
    await this.page.fill(this.bscs7SearchInput, process.env.TEST_LINE_NUMBER || '');
    await this.page.click(this.bscs7SearchButton);
    await this.page.waitForSelector(this.bscs7ApnSection, { state: 'visible' });
  }

  async verifyAPN5IPv4Support() {
    await this.page.waitForSelector(this.bscs7Apn5Row, { state: 'visible' });
    return await this.page.isVisible(this.bscs7Ipv4SupportIndicator);
  }

  async verifyAPN5IPv6Support() {
    await this.page.waitForSelector(this.bscs7Apn5Row, { state: 'visible' });
    return await this.page.isVisible(this.bscs7Ipv6SupportIndicator);
  }

  async navigateToDataSessionSection() {
    await this.page.click(this.dataSessionMenuLink);
    await this.page.waitForSelector(this.dataSessionSection, { state: 'visible' });
  }

  async selectAPN5ForSession() {
    await this.page.click(this.apnSessionDropdown);
    await this.page.waitForSelector(this.apn5SessionOption, { state: 'visible' });
    await this.page.click(this.apn5SessionOption);
  }

  async selectIPv4Protocol() {
    await this.page.click(this.protocolDropdown);
    await this.page.waitForSelector(this.ipv4ProtocolOption, { state: 'visible' });
    await this.page.click(this.ipv4ProtocolOption);
  }

  async selectIPv6Protocol() {
    await this.page.click(this.protocolDropdown);
    await this.page.waitForSelector(this.ipv6ProtocolOption, { state: 'visible' });
    await this.page.click(this.ipv6ProtocolOption);
  }

  async initiateDataSession() {
    await this.page.click(this.initiateSessionBtn);
    await this.page.waitForSelector(this.sessionStatusIndicator, { state: 'visible' });
  }

  async verifyIPv4SessionEstablished() {
    await this.page.waitForSelector(this.ipv4SessionActiveStatus, { state: 'visible' });
    const status = await this.page.textContent(this.ipv4SessionActiveStatus);
    return status.includes('established') || status.includes('active');
  }

  async verifyIPv6SessionEstablished() {
    await this.page.waitForSelector(this.ipv6SessionActiveStatus, { state: 'visible' });
    const status = await this.page.textContent(this.ipv6SessionActiveStatus);
    return status.includes('established') || status.includes('active');
  }

  async initiateFOTATrafficIPv4() {
    await this.page.waitForSelector(this.fotaTrafficSection, { state: 'visible' });
    await this.page.click(this.initiateFotaTrafficBtn);
    await this.page.waitForSelector(this.trafficLogTable, { state: 'visible' });
  }

  async initiateFOTATrafficIPv6() {
    await this.page.waitForSelector(this.fotaTrafficSection, { state: 'visible' });
    await this.page.click(this.initiateFotaTrafficBtn);
    await this.page.waitForSelector(this.ipv6TrafficLogRow, { state: 'visible' });
  }

  async verifyTrafficRecordedWithBulkRate() {
    await this.page.waitForSelector(this.trafficLogTable, { state: 'visible' });
    const flowStatus = await this.page.textContent(this.trafficFlowStatus);
    const bulkRate = await this.page.isVisible(this.bulkRateIndicator);
    return flowStatus.includes('success') && bulkRate;
  }

  async verifyIPv6TrafficRecordedWithBulkRate() {
    await this.page.waitForSelector(this.ipv6TrafficLogRow, { state: 'visible' });
    const bulkRate = await this.page.isVisible(this.ipv6BulkRateIndicator);
    return bulkRate;
  }
}

module.exports = APN5ConnectivityPage;