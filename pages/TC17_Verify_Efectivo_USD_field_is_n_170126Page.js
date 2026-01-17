const { expect } = require('@playwright/test');

class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    this.mainScreen = page.locator('[data-testid="acticenter-main-screen"]');
    this.contractSearchButton = page.locator('[data-testid="contract-search-button"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.bancoContractOption = page.locator('[data-testid="contract-option-banco"]');
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.efectivoUSDField = page.locator('[data-testid="efectivo-usd"]');
    this.efectivoMXNField = page.locator('[data-testid="efectivo-mxn"]');
    this.breakdownFieldsList = page.locator('[data-testid="breakdown-field"]');
    this.contractInfoContainer = page.locator('[data-testid="contract-info-container"]');
    this.poderCompraMXN = page.locator('[data-testid="poder-compra-mxn"]');
  }

  async navigateToActicenter() {
    await this.page.goto('/acticenter');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await expect(this.mainScreen).toBeVisible({ timeout: 10000 });
  }

  async openContractSearch() {
    await this.contractSearchButton.click();
    await expect(this.contractSearchInput).toBeVisible();
  }

  async selectBancoContractWithoutMexdolar() {
    await this.bancoContractOption.first().click();
  }

  async verifyContractIsLoaded() {
    await expect(this.contractInfoContainer).toBeVisible({ timeout: 10000 });
    await expect(this.totalContractValueComponent).toBeVisible();
  }

  async clickTotalContractValueComponent() {
    await this.totalContractValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async isEfectivoUSDVisible() {
    return await this.efectivoUSDField.isVisible();
  }

  async isEfectivoMXNVisible() {
    return await this.efectivoMXNField.isVisible();
  }

  async getBreakdownFields() {
    const fields = await this.breakdownFieldsList.allTextContents();
    return fields;
  }

  async closeBreakdownPopup() {
    await this.page.keyboard.press('Escape');
    await expect(this.breakdownPopup).not.toBeVisible();
  }
}

module.exports = ActicenterPage;