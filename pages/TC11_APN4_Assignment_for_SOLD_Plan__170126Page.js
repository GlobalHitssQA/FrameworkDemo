class ProvisioningPage {
  constructor(page) {
    this.page = page;
    
    this.loginIndicator = page.locator('[data-testid="user-authenticated-indicator"]');
    this.availableLineSelector = page.locator('[data-testid="available-line-selector"]');
    this.planDropdown = page.locator('[data-testid="plan-dropdown"]');
    this.soldPlanOption = page.locator('[data-testid="plan-option-sold-rateplan3"]');
    this.provisionButton = page.locator('[data-testid="provision-line-button"]');
    this.lineStatusIndicator = page.locator('[data-testid="line-status-indicator"]');
    this.soldPlanConfirmation = page.locator('[data-testid="sold-plan-confirmation"]');
    this.apnConfigurationTab = page.locator('[data-testid="apn-configuration-tab"]');
    this.apnListContainer = page.locator('[data-testid="apn-list-container"]');
    this.apn4Row = page.locator('[data-testid="apn4-onstar01-v6-row"]');
    this.apn4DetailsButton = page.locator('[data-testid="apn4-details-button"]');
    this.apn4ProtocolField = page.locator('[data-testid="apn4-protocol-type"]');
    this.apn4TelemetryIndicator = page.locator('[data-testid="apn4-telemetry-enabled"]');
    this.ipv6StatusIndicator = page.locator('[data-testid="ipv6-status-indicator"]');
    this.inPoolConfigTab = page.locator('[data-testid="in-pool-configuration-tab"]');
    this.inPoolParticipantsList = page.locator('[data-testid="in-pool-participants-list"]');
    this.apn4InPoolStatus = page.locator('[data-testid="apn4-in-pool-status"]');
    this.apn1InPoolStatus = page.locator('[data-testid="apn1-in-pool-status"]');
    this.inPoolBagSize = page.locator('[data-testid="in-pool-bag-size"]');
    this.trafficDetailSection = page.locator('[data-testid="traffic-detail-sold-section"]');
  }

  async navigateToProvisioningSystem() {
    await this.page.goto('/provisioning');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserAuthenticated() {
    await this.loginIndicator.waitFor({ state: 'visible' });
    return await this.loginIndicator.isVisible();
  }

  async verifyValidLineAvailable() {
    await this.availableLineSelector.waitFor({ state: 'visible' });
    return await this.availableLineSelector.isVisible();
  }

  async selectSOLDPlan() {
    await this.planDropdown.click();
    await this.soldPlanOption.click();
  }

  async provisionLineInPlan() {
    await this.provisionButton.click();
    await this.lineStatusIndicator.waitFor({ state: 'visible' });
  }

  async verifyLineRegisteredInSOLDPlan() {
    await this.soldPlanConfirmation.waitFor({ state: 'visible' });
    const confirmationText = await this.soldPlanConfirmation.textContent();
    return confirmationText.includes('SOLD') || confirmationText.includes('RatePlan3');
  }

  async navigateToAPNConfiguration() {
    await this.apnConfigurationTab.click();
    await this.apnListContainer.waitFor({ state: 'visible' });
  }

  async verifyAPN4Assignment() {
    await this.apn4Row.waitFor({ state: 'visible' });
    const apn4Text = await this.apn4Row.textContent();
    return apn4Text.includes('Onstar01.v6') || apn4Text.includes('APN4');
  }

  async openAPN4Details() {
    await this.apn4DetailsButton.click();
    await this.apn4ProtocolField.waitFor({ state: 'visible' });
  }

  async verifyIPv6TelemetryEnabled() {
    const protocolText = await this.apn4ProtocolField.textContent();
    const telemetryVisible = await this.apn4TelemetryIndicator.isVisible();
    const ipv6Status = await this.ipv6StatusIndicator.textContent();
    return protocolText.includes('IPv6') && telemetryVisible && ipv6Status.includes('Enabled');
  }

  async navigateToInPoolConfiguration() {
    await this.inPoolConfigTab.click();
    await this.inPoolParticipantsList.waitFor({ state: 'visible' });
  }

  async verifyAPN4InPoolParticipation() {
    const apn4Status = await this.apn4InPoolStatus.textContent();
    const apn1Status = await this.apn1InPoolStatus.textContent();
    const bagSize = await this.inPoolBagSize.textContent();
    const apn4Active = apn4Status.includes('Active') || apn4Status.includes('Participating');
    const apn1Active = apn1Status.includes('Active') || apn1Status.includes('Participating');
    const correctBagSize = bagSize.includes('10MB') || bagSize.includes('10 MB');
    return apn4Active && apn1Active && correctBagSize;
  }
};

module.exports = ProvisioningPage;