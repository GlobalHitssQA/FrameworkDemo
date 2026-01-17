const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    // Main screen locators
    this.mainScreen = page.locator('[data-testid="acticenter-main-screen"]');
    this.headerTitle = page.locator('[data-testid="header-title"]');
    
    // Contract selector locators
    this.contractSelector = page.locator('[data-testid="contract-selector"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.contractSearchButton = page.locator('[data-testid="contract-search-button"]');
    this.individualPersonContractOption = page.locator('[data-testid="contract-option-individual-person"]');
    this.contractList = page.locator('[data-testid="contract-list"]');
    
    // Operation flow locators
    this.operationFlowContainer = page.locator('[data-testid="operation-flow-container"]');
    
    // Total contract value component locators
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value-component"]');
    this.totalContractValueAmount = page.locator('[data-testid="total-contract-value-amount"]');
    this.totalContractValueCurrency = page.locator('[data-testid="total-contract-value-currency"]');
    this.contractValueDate = page.locator('[data-testid="contract-value-date"]');
    
    // Breakdown popup locators
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.breakdownCloseButton = page.locator('[data-testid="breakdown-close-button"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsPrivateBankingBanker() {
    const username = process.env.PRIVATE_BANKING_USERNAME || 'banker_user';
    const password = process.env.PRIVATE_BANKING_PASSWORD || 'banker_password';
    
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenDisplayed() {
    await this.mainScreen.waitFor({ state: 'visible', timeout: 10000 });
    return await this.mainScreen.isVisible();
  }

  async openContractSelector() {
    await this.contractSelector.click();
    await this.contractList.waitFor({ state: 'visible' });
  }

  async selectIndividualPersonContract() {
    await this.individualPersonContractOption.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async isOperationFlowDisplayed() {
    await this.operationFlowContainer.waitFor({ state: 'visible', timeout: 10000 });
    return await this.operationFlowContainer.isVisible();
  }

  async isTotalContractValueComponentVisible() {
    await this.totalContractValueComponent.waitFor({ state: 'visible', timeout: 10000 });
    return await this.totalContractValueComponent.isVisible();
  }

  async getContractValueCurrency() {
    const currencyText = await this.totalContractValueCurrency.textContent();
    return currencyText.trim();
  }

  async getTotalContractValue() {
    const valueText = await this.totalContractValueAmount.textContent();
    return valueText.trim();
  }

  async isValidMonetaryValue(valueText) {
    const monetaryPattern = /^\$?[\d,]+(\.\d{2})?\s*(MXN)?$/;
    return monetaryPattern.test(valueText.replace(/\s+/g, ' ').trim()) || valueText.length > 0;
  }

  async clickOnTotalValueComponent() {
    await this.totalContractValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
    return await this.breakdownPopup.isVisible();
  }

  async closeBreakdownPopup() {
    await this.breakdownCloseButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }
}

module.exports = ContractValuePage;