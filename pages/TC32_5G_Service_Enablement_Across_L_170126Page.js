class LifeCyclePage {
  constructor(page) {
    this.page = page;
    
    this.userPermissionsIndicator = '[data-testid="user-permissions-indicator"]';
    this.gmLineStatusBadge = '[data-testid="gm-line-status-badge"]';
    this.instantLinkStatusIndicator = '[data-testid="instant-link-status"]';
    this.networkAvailabilityIndicator = '[data-testid="network-availability-status"]';
    this.pcrfConfigurationPanel = '[data-testid="pcrf-configuration-panel"]';
    this.networkElementsStatus = '[data-testid="network-elements-5g-status"]';
    this.planSelectorDropdown = '[data-testid="plan-selector-dropdown"]';
    this.provisionLineButton = '[data-testid="provision-line-button"]';
    this.service5GToggle = '[data-testid="service-5g-toggle"]';
    this.service5GStatusIndicator = '[data-testid="service-5g-status"]';
    this.networkProvisioningStatus = '[data-testid="network-provisioning-status"]';
    this.changePlanButton = '[data-testid="change-plan-button"]';
    this.currentPlanLabel = '[data-testid="current-plan-label"]';
    this.planOptionItem = '[data-testid="plan-option-{planName}"]';
    this.confirmPlanChangeButton = '[data-testid="confirm-plan-change-button"]';
    this.simStatusIndicator = '[data-testid="sim-status-indicator"]';
    this.activeServicesPanel = '[data-testid="active-services-panel"]';
    this.serviceListItems = '[data-testid="service-list-item"]';
    this.bscs7ConfigPanel = '[data-testid="bscs7-config-panel"]';
    this.lineSearchInput = '#line-search-input';
    this.searchButton = '[data-testid="search-button"]';
    this.lineDetailsPanel = '[data-testid="line-details-panel"]';
  }

  async navigateToSystem() {
    await this.page.goto(process.env.BASE_URL || 'https://lifecycle-gm.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserHasConfigurationPermissions() {
    await this.page.waitForSelector(this.userPermissionsIndicator);
    const permissionsText = await this.page.textContent(this.userPermissionsIndicator);
    return permissionsText.includes('BSCS7') && permissionsText.includes('Configuration');
  }

  async verifyGMLineIsActive() {
    await this.page.waitForSelector(this.gmLineStatusBadge);
    const statusText = await this.page.textContent(this.gmLineStatusBadge);
    return statusText.toLowerCase().includes('active');
  }

  async verifyInstantLinkConnectivity() {
    await this.page.waitForSelector(this.instantLinkStatusIndicator);
    const status = await this.page.textContent(this.instantLinkStatusIndicator);
    return status.toLowerCase().includes('connected');
  }

  async verifyNetworkAvailability() {
    await this.page.waitForSelector(this.networkAvailabilityIndicator);
    const status = await this.page.textContent(this.networkAvailabilityIndicator);
    return status.toLowerCase().includes('available');
  }

  async verify5GSupportInPCRF() {
    await this.page.waitForSelector(this.pcrfConfigurationPanel);
    const isVisible = await this.page.isVisible(this.pcrfConfigurationPanel);
    const content = await this.page.textContent(this.pcrfConfigurationPanel);
    return isVisible && content.includes('5G');
  }

  async verify5GNetworkElementsConfiguration() {
    await this.page.waitForSelector(this.networkElementsStatus);
    const status = await this.page.textContent(this.networkElementsStatus);
    return status.toLowerCase().includes('configured');
  }

  async provisionLineInPlan(planName) {
    await this.page.click(this.planSelectorDropdown);
    await this.page.waitForSelector(`[data-testid="plan-option-${planName}"]`);
    await this.page.click(`[data-testid="plan-option-${planName}"]`);
    await this.page.click(this.provisionLineButton);
    await this.page.waitForLoadState('networkidle');
  }

  async is5GServiceEnabled() {
    await this.page.waitForSelector(this.service5GStatusIndicator);
    const status = await this.page.textContent(this.service5GStatusIndicator);
    return status.toLowerCase().includes('enabled') || status.toLowerCase().includes('active');
  }

  async verifyNetworkParametersProvisioned() {
    await this.page.waitForSelector(this.networkProvisioningStatus);
    const status = await this.page.textContent(this.networkProvisioningStatus);
    return status.toLowerCase().includes('provisioned') || status.toLowerCase().includes('success');
  }

  async changePlan(fromPlan, toPlan) {
    await this.page.click(this.changePlanButton);
    await this.page.waitForSelector(this.planSelectorDropdown);
    await this.page.click(this.planSelectorDropdown);
    const planSelector = `[data-testid="plan-option-${toPlan.replace(/\s+/g, '-').toUpperCase()}"]`;
    await this.page.waitForSelector(planSelector);
    await this.page.click(planSelector);
    await this.page.click(this.confirmPlanChangeButton);
    await this.page.waitForLoadState('networkidle');
  }

  async changePlanTo(planName) {
    await this.page.click(this.changePlanButton);
    await this.page.waitForSelector(this.planSelectorDropdown);
    await this.page.click(this.planSelectorDropdown);
    const normalizedPlanName = planName.replace(/\s+/g, '-').toUpperCase();
    const planSelector = `[data-testid="plan-option-${normalizedPlanName}"]`;
    await this.page.waitForSelector(planSelector);
    await this.page.click(planSelector);
    await this.page.click(this.confirmPlanChangeButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyCurrentPlan(expectedPlan) {
    await this.page.waitForSelector(this.currentPlanLabel);
    const currentPlan = await this.page.textContent(this.currentPlanLabel);
    return currentPlan.toUpperCase().includes(expectedPlan.toUpperCase());
  }

  async isSimActive() {
    await this.page.waitForSelector(this.simStatusIndicator);
    const status = await this.page.textContent(this.simStatusIndicator);
    return status.toLowerCase().includes('active');
  }

  async hasActiveServices() {
    await this.page.waitForSelector(this.activeServicesPanel);
    const services = await this.page.$$(this.serviceListItems);
    return services.length > 0;
  }
};

module.exports = LifeCyclePage;