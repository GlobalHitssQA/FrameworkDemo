class RatePlanPurgedPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    this.ratePlanSearchInput = '[data-testid="rate-plan-search"]';
    this.ratePlanSearchButton = '[data-testid="rate-plan-search-button"]';
    this.ratePlanConfigSection = '[data-testid="rate-plan-config-section"]';
    
    this.planStatusLabel = '[data-testid="plan-status-label"]';
    this.homologationStatusLabel = '[data-testid="homologation-status"]';
    
    this.servicesTable = '[data-testid="pcp-servicios-planes-table"]';
    this.vozServiceRow = '[data-testid="service-row-voz"]';
    this.smsServiceRow = '[data-testid="service-row-sms"]';
    this.dataServiceRow = '[data-testid="service-row-datos"]';
    this.noServicesMessage = '[data-testid="no-services-message"]';
    
    this.apnConfigSection = '[data-testid="apn-config-section"]';
    this.apnTable = '[data-testid="apn-matrix-table"]';
    this.noAPNsMessage = '[data-testid="no-apns-message"]';
    
    this.volteConfigSection = '[data-testid="volte-config-section"]';
    this.volteServiceLabel = '[data-testid="service-volte-label"]';
    this.volteStatusIndicator = '[data-testid="volte-status-indicator"]';
    
    this.simStatusSection = '[data-testid="sim-status-section"]';
    this.simStatusLabel = '[data-testid="sim-status-label"]';
    this.simServicesAvailable = '[data-testid="sim-services-available"]';
  }

  async navigateToSystem() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.system.local');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.BSCS7_USERNAME || 'test_user');
    await this.page.fill(this.passwordInput, process.env.BSCS7_PASSWORD || 'test_password');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async accessRatePlanConfiguration(ratePlanName) {
    await this.page.fill(this.ratePlanSearchInput, ratePlanName);
    await this.page.click(this.ratePlanSearchButton);
    await this.page.waitForSelector(this.ratePlanConfigSection);
  }

  async isNewPlanWithoutHomologation() {
    const homologationStatus = await this.page.textContent(this.homologationStatusLabel);
    return homologationStatus.toLowerCase().includes('sin homologacion') || 
           homologationStatus.toLowerCase().includes('nuevo');
  }

  async verifyNoServicesConfigured() {
    const noServicesVisible = await this.page.isVisible(this.noServicesMessage);
    if (noServicesVisible) {
      return true;
    }
    
    const vozVisible = await this.page.isVisible(this.vozServiceRow);
    const smsVisible = await this.page.isVisible(this.smsServiceRow);
    const dataVisible = await this.page.isVisible(this.dataServiceRow);
    
    return !vozVisible && !smsVisible && !dataVisible;
  }

  async verifyNoAPNsAssigned() {
    await this.page.click(this.apnConfigSection);
    const noAPNsVisible = await this.page.isVisible(this.noAPNsMessage);
    if (noAPNsVisible) {
      return true;
    }
    
    const apnRows = await this.page.locator(`${this.apnTable} tbody tr`).count();
    return apnRows === 0;
  }

  async verifyVoLTEDisabled() {
    await this.page.click(this.volteConfigSection);
    const volteVisible = await this.page.isVisible(this.volteServiceLabel);
    
    if (!volteVisible) {
      return true;
    }
    
    const volteStatus = await this.page.textContent(this.volteStatusIndicator);
    return volteStatus.toLowerCase().includes('desactivado') || 
           volteStatus.toLowerCase().includes('disabled') ||
           volteStatus.toLowerCase().includes('no');
  }

  async verifySIMInactiveStatus() {
    await this.page.click(this.simStatusSection);
    const simStatus = await this.page.textContent(this.simStatusLabel);
    const servicesAvailable = await this.page.textContent(this.simServicesAvailable);
    
    const isInactive = simStatus.toLowerCase().includes('inactiva') || 
                       simStatus.toLowerCase().includes('inactive');
    const noServices = servicesAvailable.toLowerCase().includes('sin servicios') || 
                       servicesAvailable.toLowerCase().includes('no services') ||
                       servicesAvailable === '0';
    
    return isInactive && noServices;
  }
}

module.exports = RatePlanPurgedPage;