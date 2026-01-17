const { expect } = require('@playwright/test');

class ValuationBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    // Main screen locators
    this.mainScreen = page.locator('[data-testid="acticenter-main-screen"]');
    this.headerLogo = page.locator('[data-testid="acticenter-header-logo"]');
    
    // Contract selector locators
    this.contractSelector = page.locator('[data-testid="contract-selector"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.casaDeBolsaContractOption = page.locator('[data-testid="contract-option-casa-bolsa"]');
    this.contractSelectorDropdown = page.locator('[data-testid="contract-selector-dropdown"]');
    this.selectedContractInfo = page.locator('[data-testid="selected-contract-info"]');
    
    // Total contract value component locators
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value-component"]');
    this.valuationBreakdownPopup = page.locator('[data-testid="valuation-breakdown-popup"]');
    
    // Breakdown items locators
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
    this.cashInTransitItem = page.locator('[data-testid="breakdown-item-cash-in-transit"]');
    this.effectiveMXNItem = page.locator('[data-testid="breakdown-item-effective-mxn"]');
    this.effectiveUSDItem = page.locator('[data-testid="breakdown-item-effective-usd"]');
    this.purchasingPowerItem = page.locator('[data-testid="breakdown-item-purchasing-power"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithBankingPermissions() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user_patrimonial';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await expect(this.mainScreen).toBeVisible({ timeout: 10000 });
  }

  async openContractSelector() {
    await this.contractSelector.click();
    await expect(this.contractSelectorDropdown).toBeVisible();
  }

  async selectCasaDeBolsaContract() {
    await this.casaDeBolsaContractOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractIsLoaded() {
    await expect(this.selectedContractInfo).toBeVisible();
    await expect(this.totalContractValueComponent).toBeVisible();
  }

  async clickTotalContractValueComponent() {
    await this.totalContractValueComponent.click();
  }

  async verifyBreakdownPopupIsDisplayed() {
    await expect(this.valuationBreakdownPopup).toBeVisible({ timeout: 5000 });
    await expect(this.breakdownItemsList).toBeVisible();
  }

  async isCashInTransitItemVisible() {
    try {
      await this.cashInTransitItem.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getBreakdownItems() {
    const items = await this.breakdownItemsList.locator('[data-testid^="breakdown-item-"]').all();
    const itemTexts = [];
    for (const item of items) {
      itemTexts.push(await item.textContent());
    }
    return itemTexts;
  }

  async closeBreakdownPopup() {
    await this.page.keyboard.press('Escape');
    await expect(this.valuationBreakdownPopup).not.toBeVisible();
  }
}

module.exports = ValuationBreakdownPage;