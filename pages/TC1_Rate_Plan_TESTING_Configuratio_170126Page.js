class RatePlanPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BSCS7_URL || 'https://bscs7.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Navigation locators
    this.ratePlanMenuOption = '[data-testid="menu-rate-plan"]';
    this.configurationSection = '[data-testid="rate-plan-configuration"]';
    
    // Search locators
    this.searchInput = '[data-testid="rate-plan-search-input"]';
    this.searchButton = '[data-testid="rate-plan-search-button"]';
    
    // Rate Plan details locators
    this.ratePlanContainer = '[data-testid="rate-plan-details-container"]';
    this.ratePlanIdentifier = '[data-testid="rate-plan-identifier"]';
    this.basicParametersSection = '[data-testid="basic-parameters-section"]';
    
    // APN locators
    this.apnListContainer = '[data-testid="apn-list-container"]';
    this.apnItem = '[data-testid^="apn-item-"]';
    this.esimApnSection = '[data-testid="esim-apn-section"]';
    this.productiveApnIndicator = '[data-testid="productive-apn-indicator"]';
    
    // Billing configuration locators
    this.billingConfigSection = '[data-testid="billing-configuration"]';
    this.freeUnitsIndicator = '[data-testid="free-units-indicator"]';
    this.bulkBillingStatus = '[data-testid="bulk-billing-status"]';
    
    // Services locators
    this.servicesSection = '[data-testid="services-section"]';
    this.volteServiceStatus = '[data-testid="volte-service-status"]';
    this.volteActiveLabel = '[data-testid="volte-active-label"]';
  }

  async navigateToSystem() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.BSCS7_USERNAME || 'test_user';
    const password = process.env.BSCS7_PASSWORD || 'test_password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToRatePlanSection() {
    await this.page.click(this.ratePlanMenuOption);
    await this.page.waitForSelector(this.configurationSection);
  }

  async searchRatePlan(ratePlanName) {
    await this.page.fill(this.searchInput, ratePlanName);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.ratePlanContainer);
  }

  async isRatePlanDisplayed() {
    return await this.page.isVisible(this.ratePlanContainer);
  }

  async hasUniqueIdentifier() {
    const identifier = await this.page.textContent(this.ratePlanIdentifier);
    return identifier && identifier.trim().length > 0;
  }

  async hasBasicParameters() {
    return await this.page.isVisible(this.basicParametersSection);
  }

  async getAssignedApns() {
    const apnElements = await this.page.$$(this.apnItem);
    const apns = [];
    for (const element of apnElements) {
      const apnText = await element.textContent();
      apns.push(apnText.trim());
    }
    return apns;
  }

  async hasProductiveApns() {
    return await this.page.isVisible(this.productiveApnIndicator);
  }

  async getEsimProfileApns() {
    await this.page.waitForSelector(this.esimApnSection);
    const esimSection = await this.page.$(this.esimApnSection);
    const apnElements = await esimSection.$$('[data-testid^="esim-apn-"]');
    const apns = [];
    for (const element of apnElements) {
      const apnText = await element.textContent();
      apns.push(apnText.trim());
    }
    return apns;
  }

  async hasFreeUnitsConfigured() {
    const freeUnitsText = await this.page.textContent(this.freeUnitsIndicator);
    return freeUnitsText && freeUnitsText.toLowerCase() !== 'none' && freeUnitsText !== '0';
  }

  async isBulkBillingEnabled() {
    const billingStatus = await this.page.textContent(this.bulkBillingStatus);
    return billingStatus && billingStatus.toLowerCase().includes('granel');
  }

  async isVolteServiceEnabled() {
    const isVisible = await this.page.isVisible(this.volteActiveLabel);
    if (isVisible) {
      const labelText = await this.page.textContent(this.volteActiveLabel);
      return labelText && labelText.toLowerCase().includes('active');
    }
    return false;
  }
}

module.exports = RatePlanPage;