class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Contract Value Component
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownOverlay = '[data-testid="breakdown-overlay"]';
    
    // Locators - Breakdown Items
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItemPurchasingPower = '[data-testid="breakdown-item-purchasing-power-mxn"]';
    this.breakdownItemCashMxn = '[data-testid="breakdown-item-cash-mxn"]';
    this.breakdownItemCashUsd = '[data-testid="breakdown-item-cash-usd"]';
    this.breakdownItemPendingSettlement = '[data-testid="breakdown-item-pending-settlement"]';
    this.breakdownItemFunds = '[data-testid="breakdown-item-funds"]';
    this.breakdownItemCedes = '[data-testid="breakdown-item-cedes-promissory"]';
    this.breakdownItemMoneyMarket = '[data-testid="breakdown-item-money-market"]';
    this.breakdownItemCapitalMarket = '[data-testid="breakdown-item-capital-market"]';
    
    // Locators - Search
    this.searchMagnifyingGlass = '[data-testid="search-magnifying-glass"]';
    this.clientSearchScreen = '[data-testid="client-search-screen"]';
    this.contractSelectionList = '[data-testid="contract-selection-list"]';
    
    // Locators - Contract Selection
    this.registeredContractItem = '[data-testid="registered-contract-item"]';
    this.contractListContainer = '[data-testid="contract-list-container"]';
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyApplicationLoaded() {
    await this.page.waitForSelector(this.contractListContainer, { state: 'visible', timeout: 10000 });
  }

  async selectRegisteredContract() {
    await this.page.waitForSelector(this.registeredContractItem, { state: 'visible' });
    await this.page.click(this.registeredContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.contractValueComponent);
  }

  async tapContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async areBreakdownItemsDisplayed() {
    const itemsVisible = await this.page.isVisible(this.breakdownItemsList);
    if (!itemsVisible) return false;
    
    const breakdownItems = [
      this.breakdownItemPurchasingPower,
      this.breakdownItemCashMxn,
      this.breakdownItemCashUsd,
      this.breakdownItemPendingSettlement,
      this.breakdownItemFunds,
      this.breakdownItemCedes,
      this.breakdownItemMoneyMarket,
      this.breakdownItemCapitalMarket
    ];
    
    for (const item of breakdownItems) {
      const isVisible = await this.page.isVisible(item);
      if (!isVisible) return false;
    }
    return true;
  }

  async tapSearchMagnifyingGlass() {
    await this.page.click(this.searchMagnifyingGlass);
    await this.page.waitForLoadState('networkidle');
  }

  async isClientSearchScreenVisible() {
    await this.page.waitForSelector(this.clientSearchScreen, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.clientSearchScreen);
  }

  async verifyContractSelectionAvailable() {
    await this.page.waitForSelector(this.contractSelectionList, { state: 'visible' });
  }

  async tapOutsidePopup() {
    await this.page.click(this.breakdownOverlay, { position: { x: 10, y: 10 } });
  }

  async isBreakdownPopupClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }

  async getContractTotalValue() {
    return await this.page.textContent(this.contractTotalValue);
  }
}

module.exports = ContractValuePage;