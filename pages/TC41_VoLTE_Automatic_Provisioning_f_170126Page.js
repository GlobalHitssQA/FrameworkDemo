class VoLTEProvisioningPage {
  constructor(page) {
    this.page = page;
    
    // BSCS7 System Locators
    this.bscs7LoginButton = '[data-testid="bscs7-login-btn"]';
    this.soldPlanConfigSection = '[data-testid="sold-plan-config"]';
    this.planStatusIndicator = '[data-testid="plan-status-indicator"]';
    
    // Service Selection Locators
    this.autoConectadoServiceOption = '[data-testid="service-auto-conectado-gm"]';
    this.soldPlanRatePlan3Option = '[data-testid="rate-plan-sold-3"]';
    this.activateLineButton = '[data-testid="btn-activate-line"]';
    
    // Line Status Locators
    this.lineStatusField = '[data-testid="line-activation-status"]';
    this.assignedPlanField = '[data-testid="assigned-plan-name"]';
    
    // INSTANT LINK Locators
    this.instantLinkNavButton = '[data-testid="nav-instant-link"]';
    this.instantLinkStatusIndicator = '[data-testid="instant-link-status"]';
    this.provisioningSearchInput = '[data-testid="provisioning-search-input"]';
    this.searchProvisioningButton = '[data-testid="btn-search-provisioning"]';
    this.serviceVoLTEParameterField = '[data-testid="param-service-volte"]';
    
    // Network Configuration Locators
    this.networkConfigNavButton = '[data-testid="nav-network-config"]';
    this.networkAvailabilityStatus = '[data-testid="network-hlr-hss-ims-status"]';
    this.queryLineServicesButton = '[data-testid="btn-query-line-services"]';
    this.volteServiceStatus = '[data-testid="volte-service-status"]';
    
    // SIM Card Locators
    this.simCardStatusField = '[data-testid="sim-card-status"]';
    this.simCardValidationIndicator = '[data-testid="sim-validation-indicator"]';
    
    // Voice Call Locators
    this.initiateCallButton = '[data-testid="btn-initiate-call"]';
    this.callTechnologyField = '[data-testid="call-technology-type"]';
    this.callStatusField = '[data-testid="call-connection-status"]';
  }

  async navigateToBSCS7() {
    await this.page.click(this.bscs7LoginButton);
    await this.page.waitForSelector(this.soldPlanConfigSection);
  }

  async verifySOLDPlanConfiguration() {
    await this.page.waitForSelector(this.planStatusIndicator);
    const status = await this.page.textContent(this.planStatusIndicator);
    return status === 'CONFIGURED';
  }

  async checkInstantLinkStatus() {
    await this.page.waitForSelector(this.instantLinkStatusIndicator);
    const status = await this.page.textContent(this.instantLinkStatusIndicator);
    return status === 'OPERATIONAL';
  }

  async checkNetworkAvailability() {
    await this.page.waitForSelector(this.networkAvailabilityStatus);
    const status = await this.page.textContent(this.networkAvailabilityStatus);
    return status === 'AVAILABLE';
  }

  async verifySIMCardReady() {
    await this.page.waitForSelector(this.simCardValidationIndicator);
    const isValid = await this.page.textContent(this.simCardValidationIndicator);
    return isValid === 'VALID';
  }

  async selectAutoConectadoService() {
    await this.page.waitForSelector(this.autoConectadoServiceOption);
    await this.page.click(this.autoConectadoServiceOption);
  }

  async selectSOLDPlanRatePlan3() {
    await this.page.waitForSelector(this.soldPlanRatePlan3Option);
    await this.page.click(this.soldPlanRatePlan3Option);
  }

  async activateNewLine() {
    await this.page.waitForSelector(this.activateLineButton);
    await this.page.click(this.activateLineButton);
    await this.page.waitForSelector(this.lineStatusField);
  }

  async getLineActivationStatus() {
    await this.page.waitForSelector(this.lineStatusField);
    return await this.page.textContent(this.lineStatusField);
  }

  async getAssignedPlan() {
    await this.page.waitForSelector(this.assignedPlanField);
    return await this.page.textContent(this.assignedPlanField);
  }

  async navigateToInstantLink() {
    await this.page.click(this.instantLinkNavButton);
    await this.page.waitForSelector(this.provisioningSearchInput);
  }

  async searchProvisioningParameters() {
    await this.page.click(this.searchProvisioningButton);
    await this.page.waitForSelector(this.serviceVoLTEParameterField);
  }

  async getServiceVoLTEParameter() {
    await this.page.waitForSelector(this.serviceVoLTEParameterField);
    return await this.page.textContent(this.serviceVoLTEParameterField);
  }

  async navigateToNetworkConfiguration() {
    await this.page.click(this.networkConfigNavButton);
    await this.page.waitForSelector(this.queryLineServicesButton);
  }

  async queryLineServices() {
    await this.page.click(this.queryLineServicesButton);
    await this.page.waitForSelector(this.volteServiceStatus);
  }

  async isVoLTEEnabled() {
    await this.page.waitForSelector(this.volteServiceStatus);
    const status = await this.page.textContent(this.volteServiceStatus);
    return status === 'ENABLED';
  }

  async initiateVoiceCall() {
    await this.page.waitForSelector(this.initiateCallButton);
    await this.page.click(this.initiateCallButton);
    await this.page.waitForSelector(this.callStatusField);
  }

  async getCallTechnology() {
    await this.page.waitForSelector(this.callTechnologyField);
    return await this.page.textContent(this.callTechnologyField);
  }

  async getCallStatus() {
    await this.page.waitForSelector(this.callStatusField);
    return await this.page.textContent(this.callStatusField);
  }
}

module.exports = VoLTEProvisioningPage;