const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    // Main screen locators
    this.mainScreen = page.locator('[data-testid="acticenter-main-screen"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.searchLupa = page.locator('[data-testid="search-lupa-button"]');
    
    // Contract value component locators
    this.totalValueComponent = page.locator('[data-testid="total-contract-value-component"]');
    this.valueCompositionComponent = page.locator('[data-testid="value-composition-component"]');
    
    // Breakdown popup locators
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownList = page.locator('[data-testid="breakdown-list"]');
    this.closeBreakdownButton = page.locator('[data-testid="close-breakdown-button"]');
    
    // Breakdown items locators
    this.breakdownItemPoderCompraMXN = page.locator('[data-testid="breakdown-item-poder-compra-mxn"]');
    this.breakdownItemEfectivoMXN = page.locator('[data-testid="breakdown-item-efectivo-mxn"]');
    this.breakdownItemEfectivoUSD = page.locator('[data-testid="breakdown-item-efectivo-usd"]');
    this.breakdownItemPendientesLiquidar = page.locator('[data-testid="breakdown-item-pendientes-liquidar"]');
    this.breakdownItemFondos = page.locator('[data-testid="breakdown-item-fondos"]');
    this.breakdownItemCedesPagares = page.locator('[data-testid="breakdown-item-cedes-pagares"]');
    this.breakdownItemMercadoDinero = page.locator('[data-testid="breakdown-item-mercado-dinero"]');
    this.breakdownItemMercadoCapitales = page.locator('[data-testid="breakdown-item-mercado-capitales"]');
  }

  async navigateToLogin() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
  }

  async loginAsAdvisor() {
    await this.usernameInput.fill(process.env.ADVISOR_USERNAME || 'advisor_user');
    await this.passwordInput.fill(process.env.ADVISOR_PASSWORD || 'advisor_password');
    await this.loginButton.click();
  }

  async verifyMainScreenDisplayed() {
    await expect(this.mainScreen).toBeVisible({ timeout: 10000 });
  }

  async selectContractFromQueryScreen() {
    await this.contractSearchInput.click();
    await this.contractSearchInput.fill(process.env.TEST_CONTRACT_NUMBER || '123456');
    await this.searchLupa.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTotalValueComponentDisplayed() {
    await expect(this.totalValueComponent).toBeVisible({ timeout: 10000 });
  }

  async clickValueCompositionComponent() {
    await this.valueCompositionComponent.click();
  }

  async verifyBreakdownPopupDisplayed() {
    await expect(this.breakdownPopup).toBeVisible({ timeout: 5000 });
    await expect(this.breakdownList).toBeVisible();
  }

  async verifyVerticalAlignment() {
    const totalValueBox = await this.totalValueComponent.boundingBox();
    const breakdownListBox = await this.breakdownList.boundingBox();
    
    if (!totalValueBox || !breakdownListBox) {
      return false;
    }
    
    const totalValueCenterX = totalValueBox.x + (totalValueBox.width / 2);
    const breakdownListCenterX = breakdownListBox.x + (breakdownListBox.width / 2);
    
    const alignmentTolerance = 50;
    const isHorizontallyCentered = Math.abs(totalValueCenterX - breakdownListCenterX) <= alignmentTolerance;
    
    const isVerticallyPositioned = breakdownListBox.y >= totalValueBox.y;
    
    const leftEdgeAligned = Math.abs(totalValueBox.x - breakdownListBox.x) <= alignmentTolerance;
    
    return (isHorizontallyCentered || leftEdgeAligned) && isVerticallyPositioned;
  }

  async closeBreakdownPopup() {
    await this.closeBreakdownButton.click();
    await expect(this.breakdownPopup).not.toBeVisible();
  }
}

module.exports = ContractBreakdownPage;