const { expect } = require('@playwright/test');

class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    this.locators = {
      usernameInput: '[data-testid="login-username"]',
      passwordInput: '[data-testid="login-password"]',
      loginButton: '[data-testid="login-submit-button"]',
      userProfileIndicator: '[data-testid="user-profile-indicator"]',
      fundsOperationMenu: '[data-testid="menu-funds-operation"]',
      operationMainScreen: '[data-testid="operation-main-screen"]',
      contractSearchButton: '[data-testid="contract-search-button"]',
      contractSearchInput: '[data-testid="contract-search-input"]',
      personaMoralContractOption: '[data-testid="contract-persona-moral"]',
      personaMoralMexdolarOption: '[data-testid="contract-persona-moral-mexdolar"]',
      contractTotalValueComponent: '[data-testid="contract-total-value"]',
      contractValueAmount: '[data-testid="contract-value-amount"]',
      usdBalanceComponent: '[data-testid="usd-balance-component"]',
      usdBalanceAmount: '[data-testid="usd-balance-amount"]',
      usdCurrencyLabel: '[data-testid="usd-currency-label"]',
      breakdownPopup: '[data-testid="breakdown-popup"]',
      purchasingPowerMXN: '[data-testid="purchasing-power-mxn"]',
      cashMXN: '[data-testid="cash-mxn"]',
      cashUSD: '[data-testid="cash-usd"]',
      pendingSettlement: '[data-testid="pending-settlement"]'
    };
    
    this.agas21471Response = null;
    this.responseTime = 0;
    this.serviceWasCalled = false;
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.locators.usernameInput, username);
    await this.page.fill(this.locators.passwordInput, password);
    await this.page.click(this.locators.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isUserLoggedIn() {
    return await this.page.isVisible(this.locators.userProfileIndicator);
  }

  async navigateToFundsOperation() {
    await this.page.click(this.locators.fundsOperationMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async isOperationScreenVisible() {
    return await this.page.isVisible(this.locators.operationMainScreen);
  }

  async openContractSearch() {
    await this.page.click(this.locators.contractSearchButton);
    await this.page.waitForSelector(this.locators.contractSearchInput);
  }

  async selectPersonaMoralContract() {
    await this.setupServiceInterceptor();
    await this.page.click(this.locators.personaMoralContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async selectPersonaMoralMexdolarContract() {
    await this.setupServiceInterceptor();
    await this.page.click(this.locators.personaMoralMexdolarOption);
    await this.page.waitForLoadState('networkidle');
  }

  async setupServiceInterceptor() {
    const startTime = Date.now();
    
    this.page.on('response', async (response) => {
      if (response.url().includes('AGAS21471')) {
        this.serviceWasCalled = true;
        this.responseTime = Date.now() - startTime;
        try {
          this.agas21471Response = {
            status: response.status(),
            data: await response.json()
          };
        } catch (e) {
          this.agas21471Response = {
            status: response.status(),
            data: null
          };
        }
      }
    });
  }

  async captureAGAS21471Response() {
    await this.page.waitForTimeout(2000);
    return this.agas21471Response;
  }

  async getServiceResponseTime() {
    return this.responseTime;
  }

  async wasAGAS21471ServiceCalled() {
    return this.serviceWasCalled;
  }

  async isContractValueDisplayed() {
    return await this.page.isVisible(this.locators.contractTotalValueComponent);
  }

  async getDisplayedContractValue() {
    const valueText = await this.page.textContent(this.locators.contractValueAmount);
    return this.parseNumericValue(valueText);
  }

  async getDisplayedUSDBalance() {
    const valueText = await this.page.textContent(this.locators.usdBalanceAmount);
    return this.parseNumericValue(valueText);
  }

  async getUSDCurrencyLabel() {
    return await this.page.textContent(this.locators.usdCurrencyLabel);
  }

  parseNumericValue(text) {
    if (!text) return 0;
    const cleanedText = text.replace(/[^0-9.-]/g, '');
    return parseFloat(cleanedText);
  }

  async clickOutsideBreakdownPopup() {
    await this.page.click('body', { position: { x: 10, y: 10 } });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.locators.breakdownPopup);
  }

  async getPurchasingPowerMXN() {
    const valueText = await this.page.textContent(this.locators.purchasingPowerMXN);
    return this.parseNumericValue(valueText);
  }

  async getCashMXN() {
    const valueText = await this.page.textContent(this.locators.cashMXN);
    return this.parseNumericValue(valueText);
  }

  async getPendingSettlement() {
    const valueText = await this.page.textContent(this.locators.pendingSettlement);
    return this.parseNumericValue(valueText);
  }
};

module.exports = ActicenterPage;