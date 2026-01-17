const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.loginUsernameInput = page.locator('[data-testid="login-username"]');
    this.loginPasswordInput = page.locator('[data-testid="login-password"]');
    this.loginSubmitButton = page.locator('[data-testid="login-submit"]');
    
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    this.casaDeBolsaPhysicalPersonContract = page.locator('[data-testid="contract-item-casa-bolsa-pf"]');
    this.contractWithZeroBalance = page.locator('[data-testid="contract-item-zero-balance"]');
    
    this.totalValueComponent = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownCloseButton = page.locator('[data-testid="breakdown-close-button"]');
    
    this.purchasingPowerMXNItem = page.locator('[data-testid="breakdown-item-purchasing-power-mxn"]');
    this.purchasingPowerMXNLabel = page.locator('[data-testid="breakdown-label-purchasing-power-mxn"]');
    this.purchasingPowerMXNValue = page.locator('[data-testid="breakdown-value-purchasing-power-mxn"]');
    
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
    
    this.currentCashDataSource = page.locator('[data-testid="current-cash-value"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async authenticate() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.loginUsernameInput.fill(username);
    await this.loginPasswordInput.fill(password);
    await this.loginSubmitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectCasaDeBolsaPhysicalPersonContract() {
    await this.casaDeBolsaPhysicalPersonContract.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectContractWithZeroBalance() {
    await this.closeBreakdownPopup();
    await this.contractWithZeroBalance.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.totalValueComponent.isVisible();
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async waitForBreakdownPopup() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
  }

  async closeBreakdownPopup() {
    if (await this.breakdownPopup.isVisible()) {
      await this.breakdownCloseButton.click();
      await this.breakdownPopup.waitFor({ state: 'hidden' });
    }
  }

  async isPurchasingPowerMXNVisible() {
    return await this.purchasingPowerMXNItem.isVisible();
  }

  async getPurchasingPowerMXNValue() {
    return await this.purchasingPowerMXNValue.textContent();
  }

  async isPurchasingPowerValueAlignedRight() {
    const alignment = await this.purchasingPowerMXNValue.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.textAlign;
    });
    return alignment === 'right' || alignment === 'end';
  }

  async getExpectedCurrentCashValue() {
    return await this.currentCashDataSource.getAttribute('data-value') || 
           await this.currentCashDataSource.textContent();
  }

  isValidMexicanPesoFormat(value) {
    const pesoPattern = /^\$[\d,]+\.\d{2}$/;
    return pesoPattern.test(value.trim());
  }

  normalizeMonetaryValue(value) {
    if (!value) return '0.00';
    const cleaned = value.replace(/[$,\s]/g, '');
    const numericValue = parseFloat(cleaned);
    return isNaN(numericValue) ? '0.00' : numericValue.toFixed(2);
  }
}

module.exports = ContractValuePage;