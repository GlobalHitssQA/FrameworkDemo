const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = page.locator('[data-testid="login-username"]');
    this.passwordInput = page.locator('[data-testid="login-password"]');
    this.loginButton = page.locator('[data-testid="login-submit-button"]');
    this.mainScreen = page.locator('[data-testid="acticenter-main-screen"]');
    
    // Search locators
    this.searchInput = page.locator('[data-testid="contract-search-input"]');
    this.searchButton = page.locator('[data-testid="contract-search-button"]');
    this.searchResultsList = page.locator('[data-testid="search-results-list"]');
    this.firstSearchResult = page.locator('[data-testid="search-result-item"]').first();
    
    // Contract value component locators
    this.totalValueComponent = page.locator('[data-testid="total-contract-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.closeBreakdownButton = page.locator('[data-testid="breakdown-close-button"]');
    
    // Breakdown items locators
    this.capitalMarketSection = page.locator('[data-testid="breakdown-item-capital-market"]');
    this.capitalMarketValue = page.locator('[data-testid="breakdown-value-capital-market"]');
    this.capitalMarketLabel = page.locator('[data-testid="breakdown-label-capital-market"]');
  }

  async navigateToLogin() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await expect(this.mainScreen).toBeVisible({ timeout: 10000 });
  }

  async searchContract(contractNumber) {
    await this.searchInput.fill(contractNumber);
    await this.searchButton.click();
    await this.searchResultsList.waitFor({ state: 'visible' });
  }

  async selectContractFromResults() {
    await this.firstSearchResult.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractLoaded() {
    await expect(this.totalValueComponent).toBeVisible({ timeout: 10000 });
  }

  async verifyTotalValueComponentDisplayed() {
    await expect(this.totalValueComponent).toBeVisible();
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
    return await this.breakdownPopup.isVisible();
  }

  async getCapitalMarketValue() {
    await this.capitalMarketValue.waitFor({ state: 'visible' });
    return await this.capitalMarketValue.textContent();
  }

  async isCapitalMarketValueAlignedRight() {
    const alignment = await this.capitalMarketValue.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.textAlign === 'right' || style.justifyContent === 'flex-end';
    });
    return alignment;
  }

  async closeBreakdownPopup() {
    await this.closeBreakdownButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }
};

module.exports = ContractValuePage;