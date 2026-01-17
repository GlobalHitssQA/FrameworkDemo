const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.searchInput = page.locator('[data-testid="search-client-contract"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    this.totalValueComponent = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.poderDeCompraMXNItem = page.locator('[data-testid="item-poder-compra-mxn"]');
    this.efectivoMXNItem = page.locator('[data-testid="item-efectivo-mxn"]');
    this.casaDeBolsaContractOption = page.locator('[data-testid="contract-type-casa-bolsa"]');
    this.bancoContractOption = page.locator('[data-testid="contract-type-banco"]');
    this.contractInfoContainer = page.locator('[data-testid="contract-info-container"]');
    this.userAuthIndicator = page.locator('[data-testid="user-authenticated"]');
    this.closePopupButton = page.locator('[data-testid="close-breakdown-popup"]');
    this.contractSelector = page.locator('[data-testid="contract-selector"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await expect(this.userAuthIndicator).toBeVisible({ timeout: 10000 });
  }

  async selectCasaDeBolsaContract() {
    await this.contractSelector.click();
    await this.casaDeBolsaContractOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectBancoContract() {
    await this.contractSelector.click();
    await this.bancoContractOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractInformationLoaded() {
    await this.contractInfoContainer.waitFor({ state: 'visible', timeout: 10000 });
    return await this.contractInfoContainer.isVisible();
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.click();
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async isPoderDeCompraMXNVisible() {
    return await this.poderDeCompraMXNItem.isVisible();
  }

  async isEfectivoMXNVisible() {
    return await this.efectivoMXNItem.isVisible();
  }

  async closeBreakdownPopup() {
    const isVisible = await this.breakdownPopup.isVisible();
    if (isVisible) {
      await this.closePopupButton.click();
      await this.breakdownPopup.waitFor({ state: 'hidden', timeout: 3000 });
    }
  }
};

module.exports = ContractBreakdownPage;