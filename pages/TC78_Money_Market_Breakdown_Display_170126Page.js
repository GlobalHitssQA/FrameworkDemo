class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.contractSearchButton = page.locator('[data-testid="contract-search-button"]');
    this.contractListItem = page.locator('[data-testid="contract-list-item"]');
    this.contractWithoutMoneyMarket = page.locator('[data-testid="contract-item-no-money-market"]');
    this.totalValueComponent = page.locator('[data-testid="contract-total-value-component"]');
    this.totalValueAmount = page.locator('[data-testid="contract-total-value-amount"]');
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.moneyMarketSection = page.locator('[data-testid="breakdown-money-market-section"]');
    this.moneyMarketValue = page.locator('[data-testid="breakdown-money-market-value"]');
    this.popupOverlay = page.locator('[data-testid="popup-overlay"]');
    this.pageContainer = page.locator('[data-testid="page-container"]');
  }

  async navigateToContractValueScreen() {
    await this.page.goto('/contract-value');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractWithoutMoneyMarketExists() {
    await this.contractListItem.first().waitFor({ state: 'visible' });
  }

  async selectContractWithoutMoneyMarket() {
    await this.contractWithoutMoneyMarket.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractTotalValueDisplayed() {
    return await this.totalValueComponent.isVisible();
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
    return await this.breakdownPopup.isVisible();
  }

  async locateMoneyMarketSection() {
    await this.moneyMarketSection.waitFor({ state: 'visible', timeout: 5000 });
  }

  async getMoneyMarketValue() {
    const valueText = await this.moneyMarketValue.textContent();
    return valueText.trim();
  }

  async clickOutsideBreakdownPopup() {
    await this.page.mouse.click(10, 10);
  }

  async isBreakdownPopupClosed() {
    await this.breakdownPopup.waitFor({ state: 'hidden', timeout: 5000 });
    return !(await this.breakdownPopup.isVisible());
  }
}

module.exports = ContractValuePage;