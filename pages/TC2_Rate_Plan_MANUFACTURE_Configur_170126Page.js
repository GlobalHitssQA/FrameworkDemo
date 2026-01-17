const { expect } = require('@playwright/test');

class RatePlanManufacturePage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    // Navigation locators
    this.ratePlanMenu = page.locator('[data-testid="rate-plan-menu"]');
    this.ratePlanSearchInput = page.locator('[data-testid="rate-plan-search-input"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    
    // Rate Plan configuration locators
    this.ratePlanNameLabel = page.locator('[data-testid="rate-plan-name"]');
    this.homologationStatusLabel = page.locator('[data-testid="homologation-status"]');
    this.homologatedWithLabel = page.locator('[data-testid="homologated-with"]');
    
    // Free Units table locators
    this.freeUnitsTable = page.locator('[data-testid="free-units-table"]');
    this.freeUnitsRows = page.locator('[data-testid="free-units-table"] tbody tr');
    
    // APN configuration locators
    this.apnConfigTab = page.locator('[data-testid="apn-config-tab"]');
    this.apnTable = page.locator('[data-testid="apn-table"]');
    this.apnRows = page.locator('[data-testid="apn-table"] tbody tr');
    
    // Excess tariffs locators
    this.excessTariffsTab = page.locator('[data-testid="excess-tariffs-tab"]');
    this.tariffsTable = page.locator('[data-testid="tariffs-table"]');
    this.tariffRows = page.locator('[data-testid="tariffs-table"] tbody tr');
  }

  async navigateToSystem() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.system.local');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.BSCS7_USERNAME || 'test_user';
    const password = process.env.BSCS7_PASSWORD || 'test_password';
    
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openRatePlanConfiguration(ratePlanName) {
    await this.ratePlanMenu.click();
    await this.ratePlanSearchInput.fill(ratePlanName);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
    
    const ratePlanRow = this.page.locator(`[data-testid="rate-plan-row-${ratePlanName}"]`);
    await ratePlanRow.click();
  }

  async verifyRatePlanHomologation(ratePlanName, expectedHomologation) {
    const planName = await this.ratePlanNameLabel.textContent();
    const homologatedWith = await this.homologatedWithLabel.textContent();
    
    return planName.includes(ratePlanName) && homologatedWith.includes(expectedHomologation);
  }

  async getFreeUnitConfiguration(unitType) {
    const unitRow = this.page.locator(`[data-testid="free-unit-row-${unitType}"]`);
    
    const quantityCell = unitRow.locator('[data-testid="quantity-cell"]');
    const renewalCell = unitRow.locator('[data-testid="renewal-cell"]');
    
    const quantity = parseInt(await quantityCell.textContent(), 10);
    const renewal = await renewalCell.textContent();
    
    return {
      quantity: quantity,
      renewal: renewal.toLowerCase().trim()
    };
  }

  async openApnConfiguration() {
    await this.apnConfigTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getAssociatedApns() {
    const apnNames = [];
    const rowCount = await this.apnRows.count();
    
    for (let i = 0; i < rowCount; i++) {
      const apnNameCell = this.apnRows.nth(i).locator('[data-testid="apn-name-cell"]');
      const apnName = await apnNameCell.textContent();
      apnNames.push(apnName.trim());
    }
    
    return apnNames;
  }

  async getApnTariff(apnName) {
    const apnRow = this.page.locator(`[data-testid="apn-row-${apnName}"]`);
    const tariffCell = apnRow.locator('[data-testid="tariff-cell"]');
    const tariffText = await tariffCell.textContent();
    
    return parseFloat(tariffText.replace(/[^0-9.]/g, ''));
  }

  async verifyEsimDownloadAllowed(apnName) {
    const apnRow = this.page.locator(`[data-testid="apn-row-${apnName}"]`);
    const esimCell = apnRow.locator('[data-testid="esim-allowed-cell"]');
    const esimStatus = await esimCell.textContent();
    
    return esimStatus.toLowerCase().includes('yes') || esimStatus.toLowerCase().includes('allowed');
  }

  async openExcessTariffsSection() {
    await this.excessTariffsTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getExcessTariff(serviceType) {
    const tariffRow = this.page.locator(`[data-testid="tariff-row-${serviceType}"]`);
    const rateCell = tariffRow.locator('[data-testid="rate-cell"]');
    const igvCell = tariffRow.locator('[data-testid="igv-included-cell"]');
    
    const rateText = await rateCell.textContent();
    const igvText = await igvCell.textContent();
    
    return {
      rate: parseFloat(rateText.replace(/[^0-9.]/g, '')),
      includesIgv: igvText.toLowerCase().includes('yes') || igvText.toLowerCase().includes('included')
    };
  }
}

module.exports = RatePlanManufacturePage;