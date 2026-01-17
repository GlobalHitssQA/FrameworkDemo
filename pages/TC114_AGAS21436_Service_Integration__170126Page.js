const { expect } = require('@playwright/test');

class ActicenterContractPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    this.locators = {
      usernameInput: '[data-testid="login-username"]',
      passwordInput: '[data-testid="login-password"]',
      loginButton: '[data-testid="login-submit-btn"]',
      userProfileIndicator: '[data-testid="user-profile-indicator"]',
      contractSearchButton: '[data-testid="contract-search-btn"]',
      contractSearchInput: '[data-testid="contract-search-input"]',
      physicalPersonFilter: '[data-testid="filter-persona-fisica"]',
      contractResultsList: '[data-testid="contract-results-list"]',
      contractResultItem: '[data-testid="contract-result-item"]',
      operationScreen: '[data-testid="operation-screen-container"]',
      totalContractValueComponent: '[data-testid="total-contract-value"]',
      contractValueAmount: '[data-testid="contract-value-amount"]',
      loadingSpinner: '[data-testid="loading-spinner"]'
    };
    
    this.serviceCallData = null;
    this.serviceResponseData = null;
    this.serviceResponseTime = null;
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.locators.usernameInput, username);
    await this.page.fill(this.locators.passwordInput, password);
    await this.page.click(this.locators.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isUserAuthenticated() {
    return await this.page.isVisible(this.locators.userProfileIndicator);
  }

  async openContractSearch() {
    await this.page.click(this.locators.contractSearchButton);
    await this.page.waitForSelector(this.locators.contractSearchInput);
  }

  async searchPhysicalPersonContract() {
    await this.page.click(this.locators.physicalPersonFilter);
    const testContractNumber = process.env.TEST_PF_CONTRACT || '12345678';
    await this.page.fill(this.locators.contractSearchInput, testContractNumber);
    await this.page.press(this.locators.contractSearchInput, 'Enter');
    await this.page.waitForSelector(this.locators.contractResultsList);
  }

  async selectFirstContractResult() {
    await this.setupNetworkInterception();
    await this.page.click(`${this.locators.contractResultItem}:first-child`);
    await this.waitForServiceResponse();
  }

  async setupNetworkInterception() {
    const startTime = Date.now();
    
    this.page.on('request', (request) => {
      if (request.url().includes('AGAS21436')) {
        this.serviceCallData = {
          endpoint: request.url(),
          method: request.method(),
          params: this.parseRequestParams(request)
        };
      }
    });

    this.page.on('response', async (response) => {
      if (response.url().includes('AGAS21436')) {
        this.serviceResponseTime = Date.now() - startTime;
        try {
          const responseBody = await response.json();
          this.serviceResponseData = {
            status: response.status(),
            data: responseBody
          };
        } catch (e) {
          this.serviceResponseData = {
            status: response.status(),
            data: null
          };
        }
      }
    });
  }

  parseRequestParams(request) {
    const url = new URL(request.url());
    const params = {};
    url.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    if (request.postData()) {
      try {
        Object.assign(params, JSON.parse(request.postData()));
      } catch (e) {
        params.rawPostData = request.postData();
      }
    }
    
    return params;
  }

  async waitForServiceResponse() {
    await this.page.waitForResponse(
      (response) => response.url().includes('AGAS21436'),
      { timeout: 10000 }
    );
    await this.page.waitForSelector(this.locators.loadingSpinner, { state: 'hidden' });
  }

  async isOperationScreenVisible() {
    return await this.page.isVisible(this.locators.operationScreen);
  }

  async captureAGAS21436ServiceCall() {
    return this.serviceCallData;
  }

  async getAGAS21436ServiceResponse() {
    return this.serviceResponseData;
  }

  async getAGAS21436ResponseTime() {
    return this.serviceResponseTime;
  }

  async getTotalContractValueDisplayed() {
    await this.page.waitForSelector(this.locators.contractValueAmount);
    const valueText = await this.page.textContent(this.locators.contractValueAmount);
    return valueText.trim();
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
};

module.exports = ActicenterContractPage;