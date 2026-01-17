class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    // Locators - Using semantic data-testid as primary strategy
    this.mainScreenContainer = '[data-testid="acticenter-main-screen"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-value-breakdown-popup"]';
    this.pendingSettlementItem = '[data-testid="pending-settlement-item"]';
    this.pendingSettlementValue = '[data-testid="pending-settlement-value"]';
    this.contractLoadedIndicator = '[data-testid="contract-info-loaded"]';
    
    // Alternative selectors using semantic IDs
    this.altMainScreen = '#acticenter-dashboard';
    this.altSearchIcon = '.search-icon, [aria-label="Search contract"]';
    this.altTotalValue = '.contract-total-value, #valor-total-contrato';
    this.altBreakdownPopup = '.breakdown-popup, .desglose-contrato';
    this.altPendingSettlement = '.pending-settlement, .pendientes-liquidar';
  }

  async navigateToActicenter() {
    await this.page.goto('/acticenter');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    const mainScreen = this.page.locator(this.mainScreenContainer).or(this.page.locator(this.altMainScreen));
    await mainScreen.waitFor({ state: 'visible', timeout: 10000 });
  }

  async openContractSearch() {
    const searchButton = this.page.locator(this.contractSearchButton).or(this.page.locator(this.altSearchIcon));
    await searchButton.click();
  }

  async selectContractWithPendingOperations() {
    const searchInput = this.page.locator(this.contractSearchInput);
    if (await searchInput.isVisible()) {
      await searchInput.fill('CONTRACT_WITH_PENDING');
      await this.page.keyboard.press('Enter');
    }
    const contractItem = this.page.locator(this.contractListItem).first();
    await contractItem.click();
  }

  async verifyContractIsLoaded() {
    const loadedIndicator = this.page.locator(this.contractLoadedIndicator).or(this.page.locator(this.altTotalValue));
    await loadedIndicator.waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickTotalContractValue() {
    const totalValue = this.page.locator(this.totalContractValueComponent).or(this.page.locator(this.altTotalValue));
    await totalValue.click();
  }

  async isBreakdownPopupVisible() {
    const popup = this.page.locator(this.breakdownPopup).or(this.page.locator(this.altBreakdownPopup));
    await popup.waitFor({ state: 'visible', timeout: 5000 });
    return await popup.isVisible();
  }

  async isPendingSettlementItemVisible() {
    const pendingItem = this.page.locator(this.pendingSettlementItem).or(this.page.locator(this.altPendingSettlement));
    return await pendingItem.isVisible();
  }

  async getPendingSettlementValue() {
    const valueLocator = this.page.locator(this.pendingSettlementValue).or(
      this.page.locator(`${this.altPendingSettlement} .value, ${this.altPendingSettlement} span`)
    );
    await valueLocator.waitFor({ state: 'visible', timeout: 5000 });
    return await valueLocator.textContent();
  }
}

module.exports = ActicenterPage;