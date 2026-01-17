const { expect } = require('@playwright/test');

class ContractCompositionPage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.dashboardContainer = page.locator('[data-testid="dashboard-container"]');
    
    // Contract search locators
    this.searchIcon = page.locator('[data-testid="contract-search-icon"]');
    this.searchInput = page.locator('[data-testid="contract-search-input"]');
    this.searchResultsList = page.locator('[data-testid="search-results-list"]');
    this.contractResultItem = page.locator('[data-testid="contract-result-item"]');
    
    // Contract value component locators
    this.contractValueComponent = page.locator('[data-testid="contract-total-value-component"]');
    this.compositionPopup = page.locator('[data-testid="composition-breakdown-popup"]');
    this.closeBreakdownButton = page.locator('[data-testid="close-breakdown-button"]');
    
    // No data message locators
    this.noDataMessage = page.locator('[data-testid="no-data-message"]');
    this.noDataMessageAlternative = page.locator('.no-data-available-message');
    
    // Monetary fields locators
    this.purchasePowerMXN = page.locator('[data-testid="poder-compra-mxn-value"]');
    this.cashMXN = page.locator('[data-testid="efectivo-mxn-value"]');
    this.cashUSD = page.locator('[data-testid="efectivo-usd-value"]');
    this.pendingSettlement = page.locator('[data-testid="pendientes-liquidar-value"]');
    this.funds = page.locator('[data-testid="fondos-value"]');
    this.cedesAndPagares = page.locator('[data-testid="cedes-pagares-value"]');
    this.moneyMarket = page.locator('[data-testid="mercado-dinero-value"]');
    this.capitalMarket = page.locator('[data-testid="mercado-capitales-value"]');
    
    // Test data for contract without composition
    this.contractWithoutDataId = 'CONTRACT_NO_DATA_001';
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpassword';
    
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifySuccessfulLogin() {
    await expect(this.dashboardContainer).toBeVisible({ timeout: 10000 });
  }

  async openContractSearch() {
    await this.searchIcon.click();
    await expect(this.searchInput).toBeVisible();
  }

  async searchContractWithoutData() {
    await this.searchInput.fill(this.contractWithoutDataId);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async selectContractFromResults() {
    await expect(this.searchResultsList).toBeVisible();
    await this.contractResultItem.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickContractValueComponent() {
    await expect(this.contractValueComponent).toBeVisible();
    await this.contractValueComponent.click();
    await this.page.waitForTimeout(500);
  }

  async isNoDataMessageVisible() {
    const primaryVisible = await this.noDataMessage.isVisible().catch(() => false);
    if (primaryVisible) return true;
    
    const alternativeVisible = await this.noDataMessageAlternative.isVisible().catch(() => false);
    return alternativeVisible;
  }

  async getNoDataMessageText() {
    const primaryVisible = await this.noDataMessage.isVisible().catch(() => false);
    if (primaryVisible) {
      return await this.noDataMessage.textContent();
    }
    return await this.noDataMessageAlternative.textContent();
  }

  async verifyAllFieldsShowZeroValue() {
    const monetaryFields = [
      this.purchasePowerMXN,
      this.cashMXN,
      this.cashUSD,
      this.pendingSettlement,
      this.funds,
      this.cedesAndPagares,
      this.moneyMarket,
      this.capitalMarket
    ];
    
    const zeroPattern = /\$0\.00|\$0|0\.00|--/;
    
    for (const field of monetaryFields) {
      const isFieldVisible = await field.isVisible().catch(() => false);
      if (isFieldVisible) {
        const value = await field.textContent();
        if (!zeroPattern.test(value)) {
          return false;
        }
      }
    }
    return true;
  }

  async closeCompositionPopup() {
    const isPopupVisible = await this.compositionPopup.isVisible().catch(() => false);
    if (isPopupVisible) {
      await this.closeBreakdownButton.click();
    }
  }
}

module.exports = ContractCompositionPage;