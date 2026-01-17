class RatePlanDormantPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BSCS7_URL || 'https://bscs7.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Navigation locators
    this.ratePlanMenu = '[data-testid="rate-plan-menu"]';
    this.ratePlanConfigOption = '[data-testid="rate-plan-configuration"]';
    this.ratePlanSearchInput = '[data-testid="rate-plan-search-input"]';
    this.ratePlanDormantRow = '[data-testid="rate-plan-row-dormant"]';
    
    // Rate Plan details locators
    this.planStatusLabel = '[data-testid="plan-status-label"]';
    this.homologationSection = '[data-testid="homologation-section"]';
    this.noHomologationIndicator = '[data-testid="no-homologation-indicator"]';
    
    // Included services locators
    this.includedServicesTab = '[data-testid="included-services-tab"]';
    this.voiceIncludedValue = '[data-testid="voice-included-value"]';
    this.smsIncludedValue = '[data-testid="sms-included-value"]';
    this.dataIncludedValue = '[data-testid="data-included-value"]';
    
    // Database records locators
    this.fuPackRecordsCount = '[data-testid="fu-pack-records-count"]';
    this.fupVersionRecordsCount = '[data-testid="fup-version-records-count"]';
    
    // Bulk tariffs locators
    this.bulkTariffsTab = '[data-testid="bulk-tariffs-tab"]';
    this.voiceTariffValue = '[data-testid="voice-tariff-value"]';
    this.smsTariffValue = '[data-testid="sms-tariff-value"]';
    this.dataTariffValue = '[data-testid="data-tariff-value"]';
    
    // APN matrix locators
    this.apnMatrixTab = '[data-testid="apn-matrix-tab"]';
    this.apnMatrixTable = '[data-testid="apn-matrix-table"]';
    this.assignedApnRows = '[data-testid="assigned-apn-row"]';
    
    // Services locators
    this.servicesTab = '[data-testid="services-tab"]';
    this.volteServiceLabel = '[data-testid="service-volte-label"]';
    this.volteServiceStatus = '[data-testid="service-volte-status"]';
  }

  async navigateToSystem() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.BSCS7_USERNAME || 'admin';
    const password = process.env.BSCS7_PASSWORD || 'password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToRatePlanConfiguration() {
    await this.page.click(this.ratePlanMenu);
    await this.page.click(this.ratePlanConfigOption);
    await this.page.waitForLoadState('networkidle');
  }

  async selectRatePlanDormant() {
    await this.page.fill(this.ratePlanSearchInput, 'DORMANT');
    await this.page.click(this.ratePlanDormantRow);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyRatePlanIsNew() {
    const statusText = await this.page.textContent(this.planStatusLabel);
    return statusText.toLowerCase().includes('new') || statusText.toLowerCase().includes('nuevo');
  }

  async verifyNoLegacyHomologation() {
    const isVisible = await this.page.isVisible(this.noHomologationIndicator);
    return isVisible;
  }

  async verifyNoVoiceIncluded() {
    await this.page.click(this.includedServicesTab);
    const voiceValue = await this.page.textContent(this.voiceIncludedValue);
    return voiceValue === '0' || voiceValue === '-' || voiceValue.toLowerCase() === 'none';
  }

  async verifyNoSmsIncluded() {
    const smsValue = await this.page.textContent(this.smsIncludedValue);
    return smsValue === '0' || smsValue === '-' || smsValue.toLowerCase() === 'none';
  }

  async verifyNoDataIncluded() {
    const dataValue = await this.page.textContent(this.dataIncludedValue);
    return dataValue === '0' || dataValue === '-' || dataValue.toLowerCase() === 'none';
  }

  async getFuPackRecordsCount() {
    const countText = await this.page.textContent(this.fuPackRecordsCount);
    return parseInt(countText, 10);
  }

  async getFupVersionRecordsCount() {
    const countText = await this.page.textContent(this.fupVersionRecordsCount);
    return parseInt(countText, 10);
  }

  async navigateToBulkTariffsSection() {
    await this.page.click(this.bulkTariffsTab);
    await this.page.waitForLoadState('networkidle');
  }

  async getVoiceTariff() {
    const tariffText = await this.page.textContent(this.voiceTariffValue);
    return parseFloat(tariffText.replace(/[^0-9.]/g, ''));
  }

  async getSmsTariff() {
    const tariffText = await this.page.textContent(this.smsTariffValue);
    return parseFloat(tariffText.replace(/[^0-9.]/g, ''));
  }

  async getDataTariff() {
    const tariffText = await this.page.textContent(this.dataTariffValue);
    return parseFloat(tariffText.replace(/[^0-9.]/g, ''));
  }

  async navigateToApnMatrixSection() {
    await this.page.click(this.apnMatrixTab);
    await this.page.waitForLoadState('networkidle');
  }

  async getAssignedApns() {
    const apnElements = await this.page.$$(this.assignedApnRows);
    const apns = [];
    for (const element of apnElements) {
      const apnName = await element.textContent();
      apns.push(apnName.trim());
    }
    return apns;
  }

  async navigateToServicesSection() {
    await this.page.click(this.servicesTab);
    await this.page.waitForLoadState('networkidle');
  }

  async isVolteServiceActive() {
    const isLabelVisible = await this.page.isVisible(this.volteServiceLabel);
    if (!isLabelVisible) return false;
    const statusText = await this.page.textContent(this.volteServiceStatus);
    return statusText.toLowerCase().includes('active') || statusText.toLowerCase().includes('activo') || statusText.toLowerCase().includes('enabled');
  }
}

module.exports = RatePlanDormantPage;