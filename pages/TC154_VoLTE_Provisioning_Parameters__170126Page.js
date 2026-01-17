const { expect } = require('@playwright/test');

class InstantLinkPage {
  constructor(page) {
    this.page = page;
    
    this.lineStatusIndicator = '[data-testid="line-status-indicator"]';
    this.hlrHssConnectionStatus = '[data-testid="hlr-hss-connection-status"]';
    this.volteConfigMatrix = '[data-testid="volte-config-matrix"]';
    this.networkStatusPanel = '[data-testid="network-status-panel"]';
    this.rateplanSelector = '[data-testid="rateplan-selector"]';
    this.provisioningButton = '[data-testid="btn-execute-provisioning"]';
    this.serviceVolteCheckbox = '[data-testid="service-volte-checkbox"]';
    this.provisioningRequestLog = '[data-testid="provisioning-request-log"]';
    this.transactionLogsPanel = '[data-testid="transaction-logs-panel"]';
    this.hlrHssParametersTable = '[data-testid="hlr-hss-parameters-table"]';
    this.volteStatusCell = '[data-testid="volte-status-cell"]';
    this.testCallButton = '[data-testid="btn-test-call"]';
    this.callStatusIndicator = '[data-testid="call-status-indicator"]';
    this.callTechnologyLabel = '[data-testid="call-technology-label"]';
    this.purgedRateplanOption = '[data-testid="rateplan-option-purged"]';
    this.volteDisabledMessage = '[data-testid="volte-disabled-message"]';
  }

  async navigateToInstantLink() {
    await this.page.goto('/instant-link');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineIsActive() {
    const statusElement = this.page.locator(this.lineStatusIndicator);
    await expect(statusElement).toBeVisible();
    const status = await statusElement.textContent();
    return status.includes('Active');
  }

  async verifyHLRHSSConnectivity() {
    const connectionStatus = this.page.locator(this.hlrHssConnectionStatus);
    await expect(connectionStatus).toBeVisible();
    const status = await connectionStatus.textContent();
    return status.includes('Connected');
  }

  async verifyVoLTEConfigurationMatrix() {
    const matrixElement = this.page.locator(this.volteConfigMatrix);
    await expect(matrixElement).toBeVisible();
    return true;
  }

  async verifyNetworkInfrastructure() {
    const networkPanel = this.page.locator(this.networkStatusPanel);
    await expect(networkPanel).toBeVisible();
    const status = await networkPanel.textContent();
    return status.includes('VoLTE Ready');
  }

  async executeVoLTEProvisioning(rateplanType) {
    await this.page.locator(this.rateplanSelector).click();
    await this.page.locator(`[data-testid="rateplan-option-${rateplanType.toLowerCase()}"]`).click();
    await this.page.locator(this.serviceVolteCheckbox).check();
    await this.page.locator(this.provisioningButton).click();
    await this.page.waitForSelector('[data-testid="provisioning-success-message"]');
    return true;
  }

  async verifyProvisioningRequestSent() {
    const requestLog = this.page.locator(this.provisioningRequestLog);
    await expect(requestLog).toBeVisible();
    const logContent = await requestLog.textContent();
    return logContent.includes('SERVICE_VOLTE');
  }

  async verifyTransactionLogInHLRHSS() {
    const logsPanel = this.page.locator(this.transactionLogsPanel);
    await expect(logsPanel).toBeVisible();
    const logs = await logsPanel.textContent();
    return logs.includes('VoLTE Provisioning Request Received');
  }

  async verifyVoLTEParametersInHLRHSS() {
    const parametersTable = this.page.locator(this.hlrHssParametersTable);
    await expect(parametersTable).toBeVisible();
    const volteStatus = this.page.locator(this.volteStatusCell);
    const status = await volteStatus.textContent();
    return status.includes('Enabled');
  }

  async makeTestVoLTECall() {
    await this.page.locator(this.testCallButton).click();
    await this.page.waitForSelector(this.callStatusIndicator);
    return true;
  }

  async verifyVoLTECallEstablished() {
    const callStatus = this.page.locator(this.callStatusIndicator);
    const status = await callStatus.textContent();
    const technologyLabel = this.page.locator(this.callTechnologyLabel);
    const technology = await technologyLabel.textContent();
    return status.includes('Connected') && technology.includes('VoLTE');
  }

  async executeProvisioningToPurgedRateplan() {
    await this.page.locator(this.rateplanSelector).click();
    await this.page.locator(this.purgedRateplanOption).click();
    await this.page.locator(this.provisioningButton).click();
    await this.page.waitForSelector('[data-testid="provisioning-success-message"]');
    return true;
  }

  async verifyVoLTEParametersDisabled() {
    const volteStatus = this.page.locator(this.volteStatusCell);
    const status = await volteStatus.textContent();
    return status.includes('Disabled');
  }

  async verifyVoLTECallsNotAvailable() {
    const disabledMessage = this.page.locator(this.volteDisabledMessage);
    await expect(disabledMessage).toBeVisible();
    return true;
  }
}

module.exports = InstantLinkPage;