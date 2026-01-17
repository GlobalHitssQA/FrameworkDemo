const { expect } = require('@playwright/test');

class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.currentContractId = null;
    
    // Locators - Acticenter
    this.searchIcon = '[data-testid="search-client-contract"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractResultItem = '[data-testid="contract-result-item"]';
    this.contractScreen = '[data-testid="contract-detail-screen"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.expandBreakdownButton = '[data-testid="expand-breakdown-button"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.cashMXNValue = '[data-testid="cash-mxn-value"]';
    this.cashUSDValue = '[data-testid="cash-usd-value"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.debtFunds = '[data-testid="debt-funds-value"]';
    this.hedgeFunds = '[data-testid="hedge-funds-value"]';
    this.equityFunds = '[data-testid="equity-funds-value"]';
    this.moneyMarket = '[data-testid="money-market-value"]';
    this.capitalMarket = '[data-testid="capital-market-value"]';
    this.pendingSettlement = '[data-testid="pending-settlement-value"]';
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    this.personaMoralIndicator = '[data-testid="persona-moral-indicator"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await expect(this.page.locator(this.userProfileIndicator)).toBeVisible();
  }

  async verifyPersonaMoralContractExists() {
    await this.page.locator(this.searchIcon).click();
    await this.page.locator(this.searchInput).fill(process.env.TEST_CONTRACT_ID || 'PM-CONTRACT-001');
    await this.page.locator(this.contractSearchButton).click();
    await expect(this.page.locator(this.personaMoralIndicator)).toBeVisible();
  }

  async searchAndSelectContract() {
    await this.page.locator(this.searchIcon).click();
    this.currentContractId = process.env.TEST_CONTRACT_ID || 'PM-CONTRACT-001';
    await this.page.locator(this.searchInput).fill(this.currentContractId);
    await this.page.locator(this.contractSearchButton).click();
    await this.page.locator(this.contractResultItem).first().click();
  }

  async isContractScreenDisplayed() {
    return await this.page.locator(this.contractScreen).isVisible();
  }

  async expandContractValueBreakdown() {
    await this.page.locator(this.expandBreakdownButton).click();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async captureAllCategoryValues() {
    const values = {
      totalContractValue: await this.extractNumericValue(this.totalContractValue),
      cashMXN: await this.extractNumericValue(this.cashMXNValue),
      cashUSD: await this.extractNumericValue(this.cashUSDValue),
      purchasingPowerMXN: await this.extractNumericValue(this.purchasingPowerMXN),
      debtFunds: await this.extractNumericValue(this.debtFunds),
      hedgeFunds: await this.extractNumericValue(this.hedgeFunds),
      equityFunds: await this.extractNumericValue(this.equityFunds),
      moneyMarket: await this.extractNumericValue(this.moneyMarket),
      capitalMarket: await this.extractNumericValue(this.capitalMarket),
      pendingSettlement: await this.extractNumericValue(this.pendingSettlement)
    };
    return values;
  }

  async extractNumericValue(selector) {
    const text = await this.page.locator(selector).textContent();
    return parseFloat(text.replace(/[^0-9.-]/g, ''));
  }

  getCurrentContractId() {
    return this.currentContractId;
  }
}

class SAPPage {
  constructor(page) {
    this.page = page;
    
    // Locators - SAP
    this.sapLoginContainer = '[data-testid="sap-login-container"]';
    this.contractSearchField = '[data-testid="sap-contract-search"]';
    this.searchExecuteButton = '[data-testid="sap-search-execute"]';
    this.contractDataContainer = '[data-testid="sap-contract-data"]';
    this.mexdolarAccountSection = '[data-testid="sap-mexdolar-account"]';
    this.mexdolarBalance = '[data-testid="sap-mexdolar-balance"]';
    this.sapCashMXN = '[data-testid="sap-cash-mxn"]';
    this.sapCashUSD = '[data-testid="sap-cash-usd"]';
    this.sapTotalValue = '[data-testid="sap-total-value"]';
    this.sapPurchasingPower = '[data-testid="sap-purchasing-power"]';
    this.sapPendingSettlement = '[data-testid="sap-pending-settlement"]';
  }

  async navigateToSAP() {
    await this.page.goto(process.env.SAP_URL || 'https://sap.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async searchContract(contractId) {
    await this.page.locator(this.contractSearchField).fill(contractId);
    await this.page.locator(this.searchExecuteButton).click();
    await this.page.waitForSelector(this.contractDataContainer, { state: 'visible' });
  }

  async isContractDataDisplayed() {
    return await this.page.locator(this.contractDataContainer).isVisible();
  }

  async captureMexdolarAccountValues() {
    await this.page.locator(this.mexdolarAccountSection).click();
    const mexdolarBalance = await this.extractNumericValue(this.mexdolarBalance);
    return { mexdolarBalance };
  }

  async captureAllCategoryValues() {
    const values = {
      totalContractValue: await this.extractNumericValue(this.sapTotalValue),
      cashMXN: await this.extractNumericValue(this.sapCashMXN),
      cashUSD: await this.extractNumericValue(this.sapCashUSD),
      purchasingPowerMXN: await this.extractNumericValue(this.sapPurchasingPower),
      pendingSettlement: await this.extractNumericValue(this.sapPendingSettlement)
    };
    return values;
  }

  async extractNumericValue(selector) {
    const text = await this.page.locator(selector).textContent();
    return parseFloat(text.replace(/[^0-9.-]/g, ''));
  }
}

module.exports = { ActicenterPage, SAPPage };