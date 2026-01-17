const { expect } = require('@playwright/test');

class ValuationBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Main screen locators
    this.mainScreen = '[data-testid="main-screen"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.searchInput = '[data-testid="search-input"]';
    
    // Contract locators
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractWithCapitalMarket = '[data-testid="contract-capital-market"]';
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
    
    // Total value component locators
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="valuation-breakdown-popup"]';
    
    // Capital market section locators
    this.capitalMarketSection = '[data-testid="capital-market-section"]';
    this.capitalMarketName = '[data-testid="capital-market-name"]';
    this.capitalMarketValue = '[data-testid="capital-market-value"]';
    
    // Breakdown list locators
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.mainScreen);
  }

  async openContractSearch() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async selectContractWithCapitalMarketInvestments() {
    const contractSelector = this.contractWithCapitalMarket;
    await this.page.waitForSelector(contractSelector, { state: 'visible' });
    await this.page.click(contractSelector);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractInformationLoaded() {
    await this.page.waitForSelector(this.contractInfoContainer, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractInfoContainer);
  }

  async clickTotalContractValue() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isCapitalMarketSectionVisible() {
    await this.page.waitForSelector(this.capitalMarketSection, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.capitalMarketSection);
  }

  async isCapitalMarketNameLeftAligned() {
    const nameElement = await this.page.locator(this.capitalMarketName);
    const textAlign = await nameElement.evaluate(el => {
      return window.getComputedStyle(el).textAlign;
    });
    return textAlign === 'left' || textAlign === 'start';
  }

  async isCapitalMarketValueRightAligned() {
    const valueElement = await this.page.locator(this.capitalMarketValue);
    const textAlign = await valueElement.evaluate(el => {
      return window.getComputedStyle(el).textAlign;
    });
    return textAlign === 'right' || textAlign === 'end';
  }

  async getCapitalMarketSectionText() {
    return await this.page.textContent(this.capitalMarketSection);
  }

  async getCapitalMarketValue() {
    return await this.page.textContent(this.capitalMarketValue);
  }
}

module.exports = ValuationBreakdownPage;