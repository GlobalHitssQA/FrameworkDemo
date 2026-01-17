const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.roleSelector = '[data-testid="role-selector"]';
    this.patrimonialBankingOption = '[data-testid="role-patrimonial-banking"]';
    
    // Main screen locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.headerLogo = '[data-testid="acticenter-logo"]';
    
    // Contract selector locators
    this.contractSelectorButton = '[data-testid="contract-selector-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchLupa = '[data-testid="search-lupa-icon"]';
    this.physicalPersonContractOption = '[data-testid="contract-type-physical-person"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Contract value component locators
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.contractValueAmount = '[data-testid="contract-value-amount"]';
    this.contractValueCurrency = '[data-testid="contract-value-currency"]';
    this.contractValueDate = '[data-testid="contract-value-date"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    
    // Loading indicator
    this.loadingSpinner = '[data-testid="loading-spinner"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsPatrimonialBankingAdvisor() {
    const username = process.env.ACTICENTER_USERNAME || 'advisor_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    
    await this.page.waitForSelector(this.roleSelector, { state: 'visible' });
    await this.page.click(this.roleSelector);
    await this.page.click(this.patrimonialBankingOption);
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
    const isVisible = await this.page.isVisible(this.mainScreen);
    return isVisible;
  }

  async openContractSelector() {
    await this.page.click(this.contractSelectorButton);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async selectPhysicalPersonContract() {
    await this.page.click(this.physicalPersonContractOption);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(`${this.contractListItem}:first-child`);
  }

  async waitForContractToLoad() {
    await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden', timeout: 15000 });
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async isTotalContractValueComponentVisible() {
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async getTotalContractValueText() {
    await this.page.waitForSelector(this.contractValueAmount, { state: 'visible' });
    return await this.page.textContent(this.contractValueAmount);
  }

  async verifyContractValueIsUpdated() {
    const valueText = await this.getTotalContractValueText();
    const hasValidValue = valueText && valueText.trim().length > 0;
    const hasNumericValue = /[\d,]+/.test(valueText);
    return hasValidValue && hasNumericValue;
  }

  async clickOnTotalValueForBreakdown() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;