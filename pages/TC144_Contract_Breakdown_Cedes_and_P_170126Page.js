const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = page.locator('[data-testid="login-username"]');
    this.passwordInput = page.locator('[data-testid="login-password"]');
    this.loginButton = page.locator('[data-testid="login-submit-button"]');
    this.mainInterface = page.locator('[data-testid="acticenter-main-interface"]');
    
    // Search locators
    this.contractSearchButton = page.locator('[data-testid="contract-search-button"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.contractSearchResults = page.locator('[data-testid="contract-search-results"]');
    this.contractWithCedesAndPagares = page.locator('[data-testid="contract-item-cedes-pagares"]');
    
    // Contract value component locators
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
    this.breakdownCloseButton = page.locator('[data-testid="breakdown-close-button"]');
    
    // Cedes and Pagares specific locators
    this.cedesAndPagaresItem = page.locator('[data-testid="breakdown-item-cedes-pagares"]');
    this.cedesAndPagaresValue = page.locator('[data-testid="breakdown-item-cedes-pagares-value"]');
    
    // Other breakdown items
    this.poderDeCompraMxnItem = page.locator('[data-testid="breakdown-item-poder-compra-mxn"]');
    this.efectivoMxnItem = page.locator('[data-testid="breakdown-item-efectivo-mxn"]');
    this.efectivoUsdItem = page.locator('[data-testid="breakdown-item-efectivo-usd"]');
    this.pendientesPorLiquidarItem = page.locator('[data-testid="breakdown-item-pendientes-liquidar"]');
    this.fondosItem = page.locator('[data-testid="breakdown-item-fondos"]');
    this.mercadoDineroItem = page.locator('[data-testid="breakdown-item-mercado-dinero"]');
    this.mercadoCapitalesItem = page.locator('[data-testid="breakdown-item-mercado-capitales"]');
  }

  async navigateToLogin() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainInterfaceIsDisplayed() {
    await expect(this.mainInterface).toBeVisible({ timeout: 10000 });
  }

  async openContractSearch() {
    await this.contractSearchButton.click();
    await expect(this.contractSearchInput).toBeVisible();
  }

  async searchAndSelectContractWithCedesAndPagares() {
    const contractNumber = process.env.TEST_CONTRACT_CEDES_PAGARES || 'CONTRACT_WITH_CEDES';
    await this.contractSearchInput.fill(contractNumber);
    await this.page.waitForTimeout(500);
    await this.contractSearchResults.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTotalContractValueComponentIsVisible() {
    await expect(this.totalContractValueComponent).toBeVisible({ timeout: 10000 });
  }

  async clickTotalContractValueComponent() {
    await this.totalContractValueComponent.click();
    await this.page.waitForTimeout(500);
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async areBreakdownItemsListed() {
    const itemsCount = await this.breakdownItemsList.locator('[data-testid^="breakdown-item-"]').count();
    return itemsCount > 0;
  }

  async isCedesAndPagaresItemVisible() {
    return await this.cedesAndPagaresItem.isVisible();
  }

  async getCedesAndPagaresMonetaryValue() {
    await expect(this.cedesAndPagaresValue).toBeVisible();
    const valueText = await this.cedesAndPagaresValue.textContent();
    return valueText ? valueText.trim() : null;
  }

  async closeBreakdownPopup() {
    await this.breakdownCloseButton.click();
    await expect(this.breakdownPopup).not.toBeVisible();
  }
}

module.exports = ContractBreakdownPage;