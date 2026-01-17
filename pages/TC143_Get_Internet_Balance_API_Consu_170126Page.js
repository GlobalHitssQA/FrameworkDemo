const { expect } = require('@playwright/test');

class GetInternetBalancePage {
  constructor(page) {
    this.page = page;
    this.apiContext = null;
    
    this.loginUsernameInput = '[data-testid="login-username"]';
    this.loginPasswordInput = '[data-testid="login-password"]';
    this.loginSubmitButton = '[data-testid="login-submit"]';
    this.dashboardContainer = '[data-testid="dashboard-container"]';
    this.lineStatusIndicator = '[data-testid="line-status-indicator"]';
    this.planTypeLabel = '[data-testid="plan-type-label"]';
    this.apiStatusIndicator = '[data-testid="api-status-indicator"]';
    this.bscs7ConnectionStatus = '[data-testid="bscs7-connection-status"]';
    this.balanceInfoContainer = '[data-testid="balance-info-container"]';
    this.trial6GBSection = '[data-testid="trial-6gb-package-section"]';
    this.b2b2cSection = '[data-testid="b2b2c-package-section"]';
    this.totalCapacityField = '[data-testid="total-capacity"]';
    this.consumedCapacityField = '[data-testid="consumed-capacity"]';
    this.remainingCapacityField = '[data-testid="remaining-capacity"]';
    this.expirationDateField = '[data-testid="expiration-date"]';
    
    this.apiBaseUrl = process.env.API_BASE_URL || 'https://api.example.com';
    this.apiEndpoint = '/v1/getInternetBalance';
  }

  async authenticateUser() {
    const authToken = process.env.AUTH_TOKEN;
    if (authToken) {
      this.apiContext = {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      };
      return true;
    }
    return false;
  }

  async verifyLineActiveWithSOLDPlan() {
    const lineNumber = process.env.TEST_LINE_NUMBER;
    const response = await this.page.request.get(
      `${this.apiBaseUrl}/v1/lineStatus/${lineNumber}`,
      this.apiContext
    );
    const data = await response.json();
    return data.status === 'active' && data.planType === 'SOLD';
  }

  async checkApiAvailability() {
    try {
      const response = await this.page.request.get(
        `${this.apiBaseUrl}/health`,
        this.apiContext
      );
      return response.ok();
    } catch (error) {
      return false;
    }
  }

  async verifyBSCS7Connection() {
    try {
      const response = await this.page.request.get(
        `${this.apiBaseUrl}/v1/bscs7/status`,
        this.apiContext
      );
      const data = await response.json();
      return data.connected === true;
    } catch (error) {
      return false;
    }
  }

  async invokeGetInternetBalanceAPI() {
    const lineNumber = process.env.TEST_LINE_NUMBER;
    const response = await this.page.request.post(
      `${this.apiBaseUrl}${this.apiEndpoint}`,
      {
        ...this.apiContext,
        data: {
          lineNumber: lineNumber,
          planType: 'SOLD',
          includePackageDetails: true
        }
      }
    );
    return {
      status: response.status(),
      body: await response.json()
    };
  }

  async verifySuccessfulResponse(apiResponse) {
    return apiResponse.status === 200 && 
           apiResponse.body && 
           apiResponse.body.success === true;
  }

  async verifyTrial6GBPackagePresent(apiResponse) {
    if (!apiResponse.body || !apiResponse.body.packages) {
      return false;
    }
    const trial6GB = apiResponse.body.packages.find(
      pkg => pkg.packageType === 'TRIAL_6GB' && pkg.status === 'active'
    );
    return trial6GB !== undefined;
  }

  async getTrial6GBPackageDetails(apiResponse) {
    const trial6GB = apiResponse.body.packages.find(
      pkg => pkg.packageType === 'TRIAL_6GB'
    );
    if (!trial6GB) {
      return {};
    }
    return {
      totalCapacity: trial6GB.totalCapacityMB,
      consumedCapacity: trial6GB.consumedCapacityMB,
      remainingCapacity: trial6GB.remainingCapacityMB,
      expirationDate: trial6GB.expirationDate
    };
  }

  async verifyB2B2CPackagePresent(apiResponse) {
    if (!apiResponse.body || !apiResponse.body.packages) {
      return false;
    }
    const b2b2c = apiResponse.body.packages.find(
      pkg => pkg.packageType === 'B2B2C' && pkg.status === 'active'
    );
    return b2b2c !== undefined;
  }

  async getB2B2CPackageDetails(apiResponse) {
    const b2b2c = apiResponse.body.packages.find(
      pkg => pkg.packageType === 'B2B2C'
    );
    if (!b2b2c) {
      return {};
    }
    return {
      totalCapacity: b2b2c.totalCapacityMB,
      consumedCapacity: b2b2c.consumedCapacityMB,
      remainingCapacity: b2b2c.remainingCapacityMB,
      expirationDate: b2b2c.expirationDate
    };
  }

  async validateBalanceAgainstBSCS7(apiResponse) {
    const lineNumber = process.env.TEST_LINE_NUMBER;
    const bscs7Response = await this.page.request.get(
      `${this.apiBaseUrl}/v1/bscs7/consumption/${lineNumber}`,
      {
        ...this.apiContext,
        data: {
          table: 'UDR_LT_01'
        }
      }
    );
    const bscs7Data = await bscs7Response.json();
    
    if (!apiResponse.body.packages || !bscs7Data.records) {
      return false;
    }
    
    for (const pkg of apiResponse.body.packages) {
      const bscs7Record = bscs7Data.records.find(
        record => record.packageId === pkg.packageId
      );
      if (!bscs7Record) {
        return false;
      }
      if (pkg.consumedCapacityMB !== bscs7Record.consumedMB) {
        return false;
      }
    }
    return true;
  }
}

module.exports = GetInternetBalancePage;