const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.searchInput = '[data-testid="search-client-contract"]';
    this.searchButton = '[data-testid="search-button"]';
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownCategoryList = '[data-testid="breakdown-category-list"]';
    this.breakdownCategoryItem = '[data-testid="breakdown-category-item"]';
    this.categoryValueField = '[data-testid="category-value"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.negativeValueIndicator = '[data-testid="negative-value"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.loginUsernameInput = '[data-testid="login-username"]';
    this.loginPasswordInput = '[data-testid="login-password"]';
    this.loginSubmitButton = '[data-testid="login-submit"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    await this.page.fill(this.loginUsernameInput, username);
    await this.page.fill(this.loginPasswordInput, password);
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractWithNegativeValuesExists() {
    await this.page.fill(this.searchInput, 'negative_values_contract');
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractListItem, { timeout: 10000 });
    const contracts = await this.page.locator(this.contractListItem).count();
    return contracts > 0;
  }

  async selectContractWithNegativeValues() {
    await this.page.click(`${this.contractListItem}:first-child`);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getBreakdownCategoriesCount() {
    return await this.page.locator(this.breakdownCategoryItem).count();
  }

  async getNegativeValueCategories() {
    const negativeElements = await this.page.locator(this.negativeValueIndicator).all();
    const negativeValues = [];
    for (const element of negativeElements) {
      const textContent = await element.textContent();
      negativeValues.push(textContent);
    }
    return negativeValues;
  }

  async validateNegativeMonetaryFormat(value) {
    const negativeMoneyRegex = /^-\$[0-9]{1,3}(,[0-9]{3})*\.[0-9]{2}$/;
    return negativeMoneyRegex.test(value.trim());
  }

  async getTotalContractValue() {
    const totalText = await this.page.textContent(this.totalValueDisplay);
    const cleanedValue = totalText.replace(/[^0-9.-]/g, '');
    return parseFloat(cleanedValue);
  }

  async calculateAlgebraicSumOfCategories() {
    const categoryElements = await this.page.locator(this.categoryValueField).all();
    let sum = 0;
    for (const element of categoryElements) {
      const textContent = await element.textContent();
      const cleanedValue = textContent.replace(/[^0-9.-]/g, '');
      const numericValue = parseFloat(cleanedValue);
      if (!isNaN(numericValue)) {
        sum += numericValue;
      }
    }
    return sum;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractBreakdownPage;