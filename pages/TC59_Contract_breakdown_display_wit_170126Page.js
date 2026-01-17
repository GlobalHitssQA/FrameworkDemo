const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = page.locator('[data-testid="login-username"]');
    this.passwordInput = page.locator('[data-testid="login-password"]');
    this.loginButton = page.locator('[data-testid="login-submit-button"]');
    this.searchInput = page.locator('[data-testid="search-client-contract"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    this.totalValueComponent = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
    this.breakdownItem = page.locator('[data-testid="breakdown-item"]');
    this.breakdownItemAmount = page.locator('[data-testid="breakdown-item-amount"]');
    this.closeBreakdownButton = page.locator('[data-testid="breakdown-close-button"]');
    this.contractSearchResult = page.locator('[data-testid="contract-search-result"]');
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
  }

  async authenticate() {
    await this.usernameInput.fill(process.env.TEST_USERNAME || 'testuser');
    await this.passwordInput.fill(process.env.TEST_PASSWORD || 'testpassword');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchAndSelectContractWithMultipleItems() {
    const contractNumber = process.env.TEST_CONTRACT_MULTIPLE_ITEMS || 'CONTRACT123';
    await this.searchInput.fill(contractNumber);
    await this.searchButton.click();
    await this.contractSearchResult.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.totalValueComponent.isVisible();
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.click();
    await this.breakdownPopup.waitFor({ state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async getBreakdownItems() {
    await this.breakdownItemsList.waitFor({ state: 'visible' });
    return await this.breakdownItem.all();
  }

  async itemHasPositiveValue(item) {
    const amountElement = item.locator('[data-testid="breakdown-item-amount"]');
    const amountText = await amountElement.textContent();
    const numericValue = this.parseMonetaryValue(amountText);
    return numericValue > 0;
  }

  async isAmountAlignedRight(item) {
    const amountElement = item.locator('[data-testid="breakdown-item-amount"]');
    const textAlign = await amountElement.evaluate(el => {
      return window.getComputedStyle(el).textAlign;
    });
    return textAlign === 'right' || textAlign === 'end';
  }

  async isBreakdownVerticallyAlignedWithTotalComponent() {
    const totalComponentBox = await this.totalValueComponent.boundingBox();
    const popupBox = await this.breakdownPopup.boundingBox();
    
    if (!totalComponentBox || !popupBox) {
      return false;
    }
    
    const tolerance = 50;
    const totalComponentCenter = totalComponentBox.x + (totalComponentBox.width / 2);
    const popupCenter = popupBox.x + (popupBox.width / 2);
    
    return Math.abs(totalComponentCenter - popupCenter) <= tolerance;
  }

  async getTotalValueFromComponent() {
    const totalText = await this.totalValueComponent.textContent();
    return this.parseMonetaryValue(totalText);
  }

  async calculateSumOfBreakdownItems() {
    const items = await this.getBreakdownItems();
    let sum = 0;
    
    for (const item of items) {
      const amountElement = item.locator('[data-testid="breakdown-item-amount"]');
      const amountText = await amountElement.textContent();
      sum += this.parseMonetaryValue(amountText);
    }
    
    return sum;
  }

  parseMonetaryValue(text) {
    if (!text) return 0;
    const cleanedText = text.replace(/[^0-9.-]/g, '');
    return parseFloat(cleanedText) || 0;
  }

  async closeBreakdownPopup() {
    await this.closeBreakdownButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }
}

module.exports = ContractBreakdownPage;