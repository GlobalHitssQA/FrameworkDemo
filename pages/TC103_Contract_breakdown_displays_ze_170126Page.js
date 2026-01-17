class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators - inferidos basados en buenas prácticas
    this.authenticatedUserIndicator = '[data-testid="user-authenticated-indicator"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractWithZeroBalance = '[data-testid="contract-item-zero-balance"]';
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemRow = '[data-testid="breakdown-item-row"]';
    this.itemValueCell = '[data-testid="item-value-cell"]';
    this.itemNameCell = '[data-testid="item-name-cell"]';
    this.zeroBalanceItem = '[data-testid="breakdown-item-row"]:has([data-testid="item-value-cell"]:text("$0.00"))';
    this.contractLoadedIndicator = '[data-testid="contract-loaded-indicator"]';
    this.purchasePowerMXN = '[data-testid="purchase-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.authenticatedUserIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyContractWithZeroBalanceItemExists() {
    await this.page.waitForSelector(this.contractListItem, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithZeroBalanceItem() {
    await this.page.click(this.contractWithZeroBalance);
  }

  async isContractLoaded() {
    return await this.page.isVisible(this.contractLoadedIndicator);
  }

  async clickTotalValueComponent() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
    await this.page.click(this.totalValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async identifyZeroBalanceItems() {
    await this.page.waitForSelector(this.breakdownItemRow, { state: 'visible' });
    return await this.page.locator(this.zeroBalanceItem).all();
  }

  async getZeroBalanceItems() {
    return await this.page.locator(this.zeroBalanceItem).all();
  }

  async getItemValue(itemElement) {
    const valueCell = await itemElement.locator(this.itemValueCell);
    return await valueCell.textContent();
  }

  async verifyAllApplicableItemsArePresent() {
    const applicableItems = [
      this.purchasePowerMXN,
      this.cashMXN,
      this.cashUSD,
      this.debtFunds,
      this.hedgeFunds,
      this.equityFunds,
      this.moneyMarket,
      this.capitalMarket,
      this.pendingSettlement
    ];
    
    for (const itemSelector of applicableItems) {
      const isPresent = await this.page.isVisible(itemSelector);
      if (!isPresent) {
        return false;
      }
    }
    return true;
  }

  async getItemsDisplayingZeroBalance() {
    const allItems = await this.page.locator(this.breakdownItemRow).all();
    const itemsWithZero = [];
    
    for (const item of allItems) {
      const valueText = await item.locator(this.itemValueCell).textContent();
      if (valueText && valueText.includes('$0.00')) {
        itemsWithZero.push(item);
      }
    }
    return itemsWithZero;
  }
}

module.exports = ContractBreakdownPage;