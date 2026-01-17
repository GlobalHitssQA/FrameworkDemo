class BuyProductPage {
  constructor(page) {
    this.page = page;
    this.baseAPIUrl = process.env.API_BASE_URL || 'https://hub-apigee.example.com';
    
    // Line identification locators
    this.lineSearchInput = '[data-testid="line-search-input"]';
    this.lineSearchButton = '[data-testid="line-search-button"]';
    this.lineStatusIndicator = '[data-testid="line-status-indicator"]';
    this.linePlanField = '[data-testid="line-plan-field"]';
    this.activePackagesList = '[data-testid="active-packages-list"]';
    
    // BSCS7 Console locators
    this.bscs7SearchInput = '[data-testid="bscs7-line-search"]';
    this.bscs7SearchButton = '[data-testid="bscs7-search-button"]';
    this.bscs7PackageName = '[data-testid="bscs7-package-name"]';
    this.bscs7AvailableData = '[data-testid="bscs7-available-data"]';
    this.bscs7ValidityDays = '[data-testid="bscs7-validity-days"]';
    this.bscs7PackageStatus = '[data-testid="bscs7-package-status"]';
    
    // SIAC Unico locators
    this.siacSearchInput = '[data-testid="siac-search-input"]';
    this.siacSearchButton = '[data-testid="siac-search-button"]';
    this.siacPurchaseRecord = '[data-testid="siac-purchase-record"]';
    this.siacRecordDate = '[data-testid="siac-record-date"]';
    this.siacRecordTime = '[data-testid="siac-record-time"]';
    this.siacRecordUser = '[data-testid="siac-record-user"]';
    this.siacRecordPackageCode = '[data-testid="siac-record-package-code"]';
    this.siacRecordLineNumber = '[data-testid="siac-record-line-number"]';
    
    // Billing section locators
    this.billingSearchInput = '[data-testid="billing-search-input"]';
    this.billingSearchButton = '[data-testid="billing-search-button"]';
    this.billingCostField = '[data-testid="billing-cost-without-igv"]';
    this.billingCutoffDay = '[data-testid="billing-cutoff-day"]';
    this.billingTypeField = '[data-testid="billing-type"]';
    
    // Navigation locators
    this.bscs7NavLink = '[data-testid="nav-bscs7-console"]';
    this.siacNavLink = '[data-testid="nav-siac-unico"]';
    this.billingNavLink = '[data-testid="nav-billing-section"]';
  }

  async identifyEligibleLine() {
    const testLineNumber = process.env.TEST_LINE_NUMBER || '999888777';
    return testLineNumber;
  }

  async verifyLineIsEligible(lineNumber) {
    await this.page.fill(this.lineSearchInput, lineNumber);
    await this.page.click(this.lineSearchButton);
    await this.page.waitForSelector(this.lineStatusIndicator);
    
    const status = await this.page.textContent(this.lineStatusIndicator);
    const plan = await this.page.textContent(this.linePlanField);
    const packagesCount = await this.page.locator(this.activePackagesList).count();
    
    return status === 'active' && plan === 'SOLD' && packagesCount === 0;
  }

  async invokeBuyProductAPI(lineNumber, packageCode) {
    const response = await this.page.request.post(`${this.baseAPIUrl}/api/v1/buyProduct`, {
      data: {
        lineNumber: lineNumber,
        packageCode: packageCode
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_TOKEN}`
      }
    });
    return response;
  }

  async getAPIResponseStatusCode(response) {
    return response.status();
  }

  async getAPIResponseMessage(response) {
    const body = await response.json();
    return body.message || '';
  }

  async navigateToBSCS7Console() {
    await this.page.click(this.bscs7NavLink);
    await this.page.waitForLoadState('networkidle');
  }

  async searchLineInBSCS7(lineNumber) {
    await this.page.fill(this.bscs7SearchInput, lineNumber);
    await this.page.click(this.bscs7SearchButton);
    await this.page.waitForSelector(this.bscs7PackageName);
  }

  async getActivePackageDetails() {
    const packageName = await this.page.textContent(this.bscs7PackageName);
    const availableData = await this.page.textContent(this.bscs7AvailableData);
    const validityText = await this.page.textContent(this.bscs7ValidityDays);
    const validityDays = parseInt(validityText.replace(/\D/g, ''), 10);
    
    return {
      packageName,
      availableData,
      validityDays
    };
  }

  async navigateToSIACUnico() {
    await this.page.click(this.siacNavLink);
    await this.page.waitForLoadState('networkidle');
  }

  async searchPurchaseRecord(lineNumber) {
    await this.page.fill(this.siacSearchInput, lineNumber);
    await this.page.click(this.siacSearchButton);
    await this.page.waitForSelector(this.siacPurchaseRecord);
  }

  async isPurchaseRecordVisible() {
    return await this.page.isVisible(this.siacPurchaseRecord);
  }

  async getPurchaseRecordDetails() {
    const date = await this.page.textContent(this.siacRecordDate);
    const time = await this.page.textContent(this.siacRecordTime);
    const user = await this.page.textContent(this.siacRecordUser);
    const packageCode = await this.page.textContent(this.siacRecordPackageCode);
    const lineNumber = await this.page.textContent(this.siacRecordLineNumber);
    
    return {
      date,
      time,
      user,
      packageCode,
      lineNumber
    };
  }

  async navigateToBillingSection() {
    await this.page.click(this.billingNavLink);
    await this.page.waitForLoadState('networkidle');
  }

  async searchBillingRecord(lineNumber) {
    await this.page.fill(this.billingSearchInput, lineNumber);
    await this.page.click(this.billingSearchButton);
    await this.page.waitForSelector(this.billingCostField);
  }

  async getBillingDetails() {
    const costText = await this.page.textContent(this.billingCostField);
    const costWithoutIGV = parseFloat(costText.replace(/[^0-9.]/g, ''));
    const cutoffText = await this.page.textContent(this.billingCutoffDay);
    const cutoffDay = parseInt(cutoffText.replace(/\D/g, ''), 10);
    const billingType = await this.page.textContent(this.billingTypeField);
    
    return {
      costWithoutIGV,
      cutoffDay,
      billingType: billingType.toLowerCase()
    };
  }
}

module.exports = BuyProductPage;