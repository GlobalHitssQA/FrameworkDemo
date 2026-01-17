const { expect } = require('@playwright/test');

class BSCS7RatePlanPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BSCS7_URL || 'https://bscs7.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.userPermissionsIndicator = '[data-testid="user-permissions"]';
    
    // Navigation locators
    this.ratePlanMenuLink = '[data-testid="menu-rate-plan"]';
    this.ratePlanConfigurationLink = '[data-testid="rate-plan-configuration"]';
    this.ratePlanSelector = '[data-testid="rate-plan-selector"]';
    this.ratePlanSearchInput = '[data-testid="rate-plan-search"]';
    
    // Rate Plan details locators
    this.ratePlanNameField = '[data-testid="rate-plan-name"]';
    this.ratePlanHomologationField = '[data-testid="rate-plan-homologation"]';
    this.ratePlanStatusField = '[data-testid="rate-plan-status"]';
    
    // In Pool package locators
    this.inPoolPackageSection = '[data-testid="in-pool-package-section"]';
    this.packageSizeField = '[data-testid="package-size"]';
    this.packagePriceField = '[data-testid="package-price"]';
    this.excessPriceField = '[data-testid="excess-price-per-mb"]';
    this.igvIncludedField = '[data-testid="igv-included"]';
    this.parametricTableLink = '[data-testid="parametric-table-link"]';
    this.parametricTableContent = '[data-testid="parametric-table-content"]';
    
    // APN configuration locators
    this.apnRestrictionsSection = '[data-testid="apn-restrictions-section"]';
    this.inPoolApnList = '[data-testid="in-pool-apn-list"]';
    this.apnListItem = '[data-testid="apn-list-item"]';
    
    // Bulk billing locators
    this.bulkBillingSection = '[data-testid="bulk-billing-section"]';
    this.bulkApnList = '[data-testid="bulk-apn-list"]';
    this.bulkRateField = '[data-testid="bulk-rate-per-mb"]';
    this.inPoolParticipationField = '[data-testid="in-pool-participation"]';
    
    // Package types locators
    this.allowedPackagesSection = '[data-testid="allowed-packages-section"]';
    this.allowedPackagesList = '[data-testid="allowed-packages-list"]';
    this.packageTypeItem = '[data-testid="package-type-item"]';
    
    // In Pool modality locators
    this.inPoolModalitySection = '[data-testid="in-pool-modality-section"]';
    this.localConsumptionToggle = '[data-testid="local-consumption-toggle"]';
    this.roamingIncludedToggle = '[data-testid="roaming-included-toggle"]';
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

  async verifyQueryPermissions() {
    await this.page.waitForSelector(this.userPermissionsIndicator);
    const permissionsText = await this.page.textContent(this.userPermissionsIndicator);
    return permissionsText.includes('query') || permissionsText.includes('consulta');
  }

  async navigateToRatePlanConfiguration() {
    await this.page.click(this.ratePlanMenuLink);
    await this.page.waitForSelector(this.ratePlanConfigurationLink);
    await this.page.click(this.ratePlanConfigurationLink);
    await this.page.waitForLoadState('networkidle');
  }

  async selectRatePlan(ratePlanName) {
    await this.page.waitForSelector(this.ratePlanSelector);
    await this.page.fill(this.ratePlanSearchInput, ratePlanName);
    await this.page.click(`${this.ratePlanSelector} >> text=${ratePlanName}`);
    await this.page.waitForLoadState('networkidle');
  }

  async getRatePlanDetails() {
    await this.page.waitForSelector(this.ratePlanNameField);
    const name = await this.page.textContent(this.ratePlanNameField);
    const homologatedWith = await this.page.textContent(this.ratePlanHomologationField);
    const status = await this.page.textContent(this.ratePlanStatusField);
    
    return {
      name: name.trim(),
      homologatedWith: homologatedWith.trim(),
      status: status.trim()
    };
  }

  async getInPoolPackageConfiguration() {
    await this.page.waitForSelector(this.inPoolPackageSection);
    
    const packageSize = await this.page.textContent(this.packageSizeField);
    const pricePerPackage = await this.page.textContent(this.packagePriceField);
    const excessPricePerMB = await this.page.textContent(this.excessPriceField);
    const igvText = await this.page.textContent(this.igvIncludedField);
    
    return {
      packageSize: packageSize.trim(),
      pricePerPackage: parseFloat(pricePerPackage.replace(/[^0-9.]/g, '')),
      excessPricePerMB: parseFloat(excessPricePerMB.replace(/[^0-9.]/g, '')),
      includesIGV: igvText.toLowerCase().includes('yes') || igvText.toLowerCase().includes('si')
    };
  }

  async verifyParametricTable(tableName) {
    await this.page.click(this.parametricTableLink);
    await this.page.waitForSelector(this.parametricTableContent);
    const tableContent = await this.page.textContent(this.parametricTableContent);
    return tableContent.includes(tableName);
  }

  async getInPoolAPNRestrictions() {
    await this.page.waitForSelector(this.apnRestrictionsSection);
    const apnElements = await this.page.$$(`${this.inPoolApnList} ${this.apnListItem}`);
    const apnList = [];
    
    for (const element of apnElements) {
      const text = await element.textContent();
      apnList.push(text.trim());
    }
    
    return apnList;
  }

  async getBulkBillingConfiguration() {
    await this.page.waitForSelector(this.bulkBillingSection);
    
    const bulkApnElements = await this.page.$$(`${this.bulkApnList} ${this.apnListItem}`);
    const apns = [];
    
    for (const element of bulkApnElements) {
      const text = await element.textContent();
      apns.push(text.trim());
    }
    
    const rateText = await this.page.textContent(this.bulkRateField);
    const participationText = await this.page.textContent(this.inPoolParticipationField);
    
    return {
      apns: apns,
      ratePerMB: parseFloat(rateText.replace(/[^0-9.]/g, '')),
      inPoolParticipation: participationText.toLowerCase().includes('yes') || participationText.toLowerCase().includes('si')
    };
  }

  async getAllowedPackageTypes() {
    await this.page.waitForSelector(this.allowedPackagesSection);
    const packageElements = await this.page.$$(`${this.allowedPackagesList} ${this.packageTypeItem}`);
    const packages = [];
    
    for (const element of packageElements) {
      const text = await element.textContent();
      packages.push(text.trim());
    }
    
    return packages;
  }

  async getInPoolModalityConfiguration() {
    await this.page.waitForSelector(this.inPoolModalitySection);
    
    const localConsumptionValue = await this.page.getAttribute(this.localConsumptionToggle, 'aria-checked');
    const roamingIncludedValue = await this.page.getAttribute(this.roamingIncludedToggle, 'aria-checked');
    
    return {
      localConsumption: localConsumptionValue === 'true',
      roamingIncluded: roamingIncludedValue === 'true'
    };
  }
}

module.exports = BSCS7RatePlanPage;