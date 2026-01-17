class ValueCompositionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://ota-acticenter.example.com';
    
    // Locators
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.breakdownPopupTrigger = '[data-testid="breakdown-popup-trigger"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownPopupClose = '[data-testid="breakdown-popup-close"]';
    this.searchButton = '[data-testid="search-client-contract"]';
    this.searchInput = '[data-testid="search-input"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.fundsList = '[data-testid="funds-list"]';
    this.moneyMarketSection = '[data-testid="money-market-section"]';
    this.capitalMarketSection = '[data-testid="capital-market-section"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.componentOverlay = '[data-testid="component-overlay"]';
  }

  async navigateToComponent() {
    await this.page.goto(this.baseUrl);
  }

  async waitForComponentToLoad() {
    await this.page.waitForSelector(this.valueCompositionComponent, { state: 'visible', timeout: 10000 });
  }

  async setTabletLandscapeViewport() {
    await this.page.setViewportSize({ width: 1024, height: 768 });
  }

  async setTabletPortraitViewport() {
    await this.page.setViewportSize({ width: 768, height: 1024 });
  }

  async isComponentDisplayedCorrectly() {
    const component = this.page.locator(this.valueCompositionComponent);
    return await component.isVisible();
  }

  async areAllElementsVisible() {
    const elements = [
      this.totalContractValue,
      this.breakdownPopupTrigger,
      this.searchButton,
      this.purchasingPowerMXN
    ];
    
    for (const element of elements) {
      const isVisible = await this.page.locator(element).isVisible();
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async openBreakdownPopup() {
    await this.page.locator(this.breakdownPopupTrigger).click();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async closeBreakdownPopup() {
    const closeButton = this.page.locator(this.breakdownPopupClose);
    if (await closeButton.isVisible()) {
      await closeButton.click();
    } else {
      await this.page.locator(this.componentOverlay).click({ position: { x: 10, y: 10 } });
    }
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }

  async isSearchFunctionVisible() {
    return await this.page.locator(this.searchButton).isVisible();
  }

  async clickSearchButton() {
    await this.page.locator(this.searchButton).click();
  }

  async isSearchInputActive() {
    await this.page.waitForSelector(this.searchInput, { state: 'visible', timeout: 5000 });
    return await this.page.locator(this.searchInput).isVisible();
  }

  async enterSearchQuery(query) {
    await this.page.locator(this.searchInput).fill(query);
  }

  async getContractTotalValue() {
    return await this.page.locator(this.totalContractValue).textContent();
  }
}

module.exports = ValueCompositionPage;