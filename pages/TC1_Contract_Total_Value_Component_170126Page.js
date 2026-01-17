const { expect } = require('@playwright/test');

class FundsOperationPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Main screen locators
    this.mainScreenContainer = '[data-testid="main-screen-container"]';
    this.searchButton = '[data-testid="search-client-contract-button"]';
    this.searchInput = '[data-testid="search-input"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    
    // Funds operation screen locators
    this.fundsOperationScreen = '[data-testid="funds-operation-screen"]';
    this.contractTotalValueComponent = '[data-testid="contract-total-value-component"]';
    this.contractTotalValueAmount = '[data-testid="contract-total-value-amount"]';
    
    // Alternative CSS selectors
    this.contractValueComponentAlt = '#contract-total-value';
    this.contractAmountAlt = '.contract-value-amount';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'test_advisor';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreenContainer, { state: 'visible', timeout: 10000 });
  }

  async clickSearchButton() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async searchAndSelectContract() {
    const contractNumber = process.env.TEST_CONTRACT_NUMBER || '123456';
    await this.page.fill(this.searchInput, contractNumber);
    await this.page.waitForSelector(this.searchResultItem, { state: 'visible' });
    await this.page.click(this.searchResultItem);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyFundsOperationScreenIsDisplayed() {
    await this.page.waitForSelector(this.fundsOperationScreen, { state: 'visible', timeout: 10000 });
  }

  async isContractTotalValueComponentVisible() {
    try {
      const component = await this.page.locator(this.contractTotalValueComponent);
      const isVisible = await component.isVisible();
      if (!isVisible) {
        const altComponent = await this.page.locator(this.contractValueComponentAlt);
        return await altComponent.isVisible();
      }
      return isVisible;
    } catch (error) {
      return false;
    }
  }

  async getContractTotalValueAmount() {
    try {
      let amountElement = this.page.locator(this.contractTotalValueAmount);
      let isVisible = await amountElement.isVisible();
      
      if (!isVisible) {
        amountElement = this.page.locator(this.contractAmountAlt);
      }
      
      await amountElement.waitFor({ state: 'visible', timeout: 5000 });
      const text = await amountElement.textContent();
      return text ? text.trim() : null;
    } catch (error) {
      return null;
    }
  }
}

module.exports = FundsOperationPage;