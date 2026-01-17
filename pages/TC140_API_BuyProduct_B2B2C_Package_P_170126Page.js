const { expect } = require('@playwright/test');

class BuyProductApiPage {
  constructor(page) {
    this.page = page;
    this.baseApiUrl = process.env.API_BASE_URL || 'https://hub-apigee.example.com';
    this.buyProductEndpoint = '/api/v1/buyProduct';
    this.bscs7Endpoint = '/api/v1/bscs7/packages';
    this.siacEndpoint = '/api/v1/siac/records';
    this.billingEndpoint = '/api/v1/billing/charges';
    
    this.selectors = {
      lineSearchInput: '[data-testid="line-search-input"]',
      searchButton: '[data-testid="search-line-button"]',
      lineStatusBadge: '[data-testid="line-status-badge"]',
      packageListContainer: '[data-testid="package-list-container"]',
      buyPackageButton: '[data-testid="buy-package-button"]',
      packageCodeInput: '[data-testid="package-code-input"]',
      confirmPurchaseButton: '[data-testid="confirm-purchase-button"]',
      responseStatusDisplay: '[data-testid="response-status"]',
      responseMessageDisplay: '[data-testid="response-message"]',
      bscs7PackageTable: '[data-testid="bscs7-package-table"]',
      packageStatusCell: '[data-testid="package-status-cell"]',
      packageDataCell: '[data-testid="package-data-cell"]',
      packageValidityCell: '[data-testid="package-validity-cell"]',
      siacRecordTable: '[data-testid="siac-record-table"]',
      billingInfoSection: '[data-testid="billing-info-section"]',
      packageConfigSection: '[data-testid="package-config-section"]'
    };
  }

  async identifyEligibleLine() {
    const response = await this.page.request.get(`${this.baseApiUrl}/api/v1/lines/eligible`, {
      params: {
        plan: 'SOLD',
        excludePackages: 'B2B2C'
      }
    });
    
    const data = await response.json();
    
    return {
      lineNumber: data.lineNumber || null,
      isEligible: data.eligible || false,
      plan: data.plan || null
    };
  }

  async invokeBuyProductApi(lineNumber, packageCode) {
    const response = await this.page.request.post(`${this.baseApiUrl}${this.buyProductEndpoint}`, {
      data: {
        lineNumber: lineNumber,
        packageCode: packageCode,
        validityMonths: 12
      },
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.APIGEE_API_KEY || ''
      }
    });
    
    return response;
  }

  async getResponseStatusCode(response) {
    return response.status();
  }

  async getResponseMessage(response) {
    const body = await response.json();
    return body.message || '';
  }

  async verifyPackageInBSCS7(lineNumber) {
    const response = await this.page.request.get(`${this.baseApiUrl}${this.bscs7Endpoint}`, {
      params: {
        lineNumber: lineNumber
      }
    });
    
    const data = await response.json();
    const activePackage = data.packages?.find(pkg => pkg.type === 'B2B2C' && pkg.status === 'active');
    
    return {
      packageName: activePackage?.name || '',
      availableData: activePackage?.availableData || '0GB',
      validityDays: activePackage?.validityDays || 0,
      status: activePackage?.status || 'inactive'
    };
  }

  async verifySiacUnicoRecord(lineNumber, packageCode) {
    const response = await this.page.request.get(`${this.baseApiUrl}${this.siacEndpoint}`, {
      params: {
        lineNumber: lineNumber,
        packageCode: packageCode
      }
    });
    
    const data = await response.json();
    const record = data.records?.[0];
    
    return {
      hasDate: !!record?.date,
      hasTime: !!record?.time,
      hasUser: !!record?.user,
      packageCode: record?.packageCode || '',
      lineNumber: record?.lineNumber || '',
      validity: record?.validity || ''
    };
  }

  async verifyBillingRegistration(lineNumber) {
    const response = await this.page.request.get(`${this.baseApiUrl}${this.billingEndpoint}`, {
      params: {
        lineNumber: lineNumber
      }
    });
    
    const data = await response.json();
    const charge = data.charges?.find(c => c.type === 'B2B2C_PACKAGE');
    
    return {
      amount: charge?.amount || 0,
      includesIGV: charge?.includesIGV || false,
      billingCycle: charge?.cycle || '',
      cutoffDay: charge?.cutoffDay || 0
    };
  }

  async verifyPackageConfiguration(lineNumber) {
    const response = await this.page.request.get(`${this.baseApiUrl}/api/v1/packages/configuration`, {
      params: {
        lineNumber: lineNumber
      }
    });
    
    const data = await response.json();
    
    return {
      localNavigationEnabled: data.localNavigation || false,
      roamingEnabled: data.roaming || false
    };
  }

  async navigateToLineSearch() {
    await this.page.goto(`${this.baseApiUrl}/lines`);
    await this.page.waitForSelector(this.selectors.lineSearchInput);
  }

  async searchLine(lineNumber) {
    await this.page.fill(this.selectors.lineSearchInput, lineNumber);
    await this.page.click(this.selectors.searchButton);
    await this.page.waitForSelector(this.selectors.lineStatusBadge);
  }

  async getLineStatus() {
    return await this.page.textContent(this.selectors.lineStatusBadge);
  }

  async selectPackageForPurchase(packageCode) {
    await this.page.fill(this.selectors.packageCodeInput, packageCode);
    await this.page.click(this.selectors.buyPackageButton);
  }

  async confirmPurchase() {
    await this.page.click(this.selectors.confirmPurchaseButton);
    await this.page.waitForSelector(this.selectors.responseStatusDisplay);
  }

  async getDisplayedResponseStatus() {
    return await this.page.textContent(this.selectors.responseStatusDisplay);
  }

  async getDisplayedResponseMessage() {
    return await this.page.textContent(this.selectors.responseMessageDisplay);
  }
};

module.exports = BuyProductApiPage;