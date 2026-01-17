const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.authenticatedUserIndicator = page.locator('[data-testid="user-authenticated-indicator"]');
    this.casaDeBolsaContractOption = page.locator('[data-testid="contract-casa-bolsa"]');
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="contract-value-breakdown-popup"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
    this.purchasingPowerItem = page.locator('[data-testid="breakdown-item-poder-compra"]');
    this.purchasingPowerItemName = page.locator('[data-testid="breakdown-item-poder-compra"] [data-testid="item-name"]');
    this.closeBreakdownButton = page.locator('[data-testid="breakdown-popup-close-button"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await expect(this.authenticatedUserIndicator).toBeVisible({ timeout: 10000 });
  }

  async verifyCasaDeBolsaContractAvailable() {
    await expect(this.casaDeBolsaContractOption).toBeVisible({ timeout: 10000 });
  }

  async selectCasaDeBolsaContract() {
    await this.casaDeBolsaContractOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueComponentVisible() {
    return await this.totalContractValueComponent.isVisible();
  }

  async clickTotalContractValueComponent() {
    await this.totalContractValueComponent.click();
    await this.page.waitForTimeout(500);
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async isPurchasingPowerItemVisible() {
    return await this.purchasingPowerItem.isVisible();
  }

  async getPurchasingPowerItemName() {
    return await this.purchasingPowerItemName.textContent();
  }

  async closeBreakdownPopup() {
    await this.closeBreakdownButton.click();
    await expect(this.breakdownPopup).not.toBeVisible();
  }
}

module.exports = ContractValuePage;