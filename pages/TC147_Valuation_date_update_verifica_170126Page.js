const { expect } = require('@playwright/test');

class ValuationDatePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Authentication
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Locators - Contract Search
    this.searchContractInput = '[data-testid="search-contract-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractSearchIcon = '[data-testid="contract-search-icon"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.activeContractSelector = '[data-testid="active-contract"]';
    
    // Locators - Total Value Component
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.valuationDateLabel = '[data-testid="valuation-date-label"]';
    this.valuationDateValue = '[data-testid="valuation-date-value"]';
    this.contractValueDisplay = '[data-testid="contract-value-display"]';
    
    // Locators - Refresh and Navigation
    this.refreshButton = '[data-testid="refresh-button"]';
    this.contractDetailSection = '[data-testid="contract-detail-section"]';
    
    // State management
    this.simulatedDate = null;
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpassword';
    
    await this.page.waitForSelector(this.usernameInput, { state: 'visible' });
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchAndSelectContract() {
    const contractNumber = process.env.TEST_CONTRACT_NUMBER || '123456';
    
    await this.page.waitForSelector(this.searchContractInput, { state: 'visible' });
    await this.page.fill(this.searchContractInput, contractNumber);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(this.activeContractSelector);
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
  }

  async isValuationDateVisible() {
    await this.page.waitForSelector(this.valuationDateValue, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.valuationDateValue);
  }

  async getValuationDate() {
    await this.page.waitForSelector(this.valuationDateValue, { state: 'visible' });
    const dateText = await this.page.textContent(this.valuationDateValue);
    return dateText ? dateText.trim() : null;
  }

  async simulateSystemDateChange() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.simulatedDate = tomorrow;
    
    await this.page.evaluate((newDate) => {
      const originalDate = Date;
      const mockDate = new Date(newDate);
      
      window.Date = class extends originalDate {
        constructor(...args) {
          if (args.length === 0) {
            return mockDate;
          }
          return new originalDate(...args);
        }
        static now() {
          return mockDate.getTime();
        }
      };
    }, tomorrow.toISOString());
    
    await this.page.waitForTimeout(1000);
  }

  async refreshContractView() {
    const refreshButtonExists = await this.page.isVisible(this.refreshButton);
    
    if (refreshButtonExists) {
      await this.page.click(this.refreshButton);
    } else {
      await this.page.reload();
    }
    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
  }

  async getExpectedSystemDate() {
    const date = this.simulatedDate || new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  async clickTotalValueComponent() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
    await this.page.click(this.totalValueComponent);
  }

  async getContractValue() {
    await this.page.waitForSelector(this.contractValueDisplay, { state: 'visible' });
    return await this.page.textContent(this.contractValueDisplay);
  }
}

module.exports = ValuationDatePage;