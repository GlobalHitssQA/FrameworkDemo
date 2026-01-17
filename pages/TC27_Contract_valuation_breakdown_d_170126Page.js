class ValuationBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators - inferidos usando buenas prácticas
    this.searchInput = '[data-testid="client-contract-search"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractValueComponent = '[data-testid="contract-total-value"]';
    this.breakdownPopup = '[data-testid="valuation-breakdown-popup"]';
    this.breakdownItemRow = '[data-testid="breakdown-item-row"]';
    this.breakdownItemName = '[data-testid="breakdown-item-name"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.contractList = '[data-testid="contract-list"]';
    this.contractItem = '[data-testid="contract-item"]';
    
    this.identifiedZeroItems = [];
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.searchInput, { state: 'visible', timeout: 30000 });
  }

  async searchAndSelectContractWithZeroBalanceItem() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractList, { state: 'visible' });
    const contracts = await this.page.locator(this.contractItem).all();
    if (contracts.length > 0) {
      await contracts[0].click();
    }
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async waitForContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async isContractValueComponentVisible() {
    return await this.page.locator(this.contractValueComponent).isVisible();
  }

  async identifyZeroValueItems() {
    await this.clickContractValueComponent();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
    
    const items = await this.page.locator(this.breakdownItemRow).all();
    this.identifiedZeroItems = [];
    
    for (const item of items) {
      const valueElement = await item.locator(this.breakdownItemValue.replace('[data-testid="', '').replace('"]', '')).first();
      const valueText = await valueElement.textContent();
      if (valueText && (valueText.includes('$0.00') || valueText.trim() === '$0.00')) {
        const nameElement = await item.locator(this.breakdownItemName.replace('[data-testid="', '').replace('"]', '')).first();
        const itemName = await nameElement.textContent();
        this.identifiedZeroItems.push(itemName);
      }
    }
    
    await this.page.keyboard.press('Escape');
  }

  async getIdentifiedZeroValueItems() {
    return this.identifiedZeroItems;
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async scrollToViewAllBreakdownItems() {
    const popup = this.page.locator(this.breakdownPopup);
    await popup.evaluate((el) => {
      el.scrollTo(0, el.scrollHeight);
    });
    await this.page.waitForTimeout(500);
  }

  async verifyZeroValueItemsDisplayAsZero() {
    const items = await this.page.locator(this.breakdownItemRow).all();
    const zeroValuePattern = /^\$0\.00$/;
    
    for (const item of items) {
      const valueLocator = item.locator('[data-testid="breakdown-item-value"]');
      const isValueVisible = await valueLocator.isVisible();
      
      if (isValueVisible) {
        const valueText = await valueLocator.textContent();
        const trimmedValue = valueText ? valueText.trim() : '';
        
        if (trimmedValue === '$0.00' || zeroValuePattern.test(trimmedValue)) {
          const nameLocator = item.locator('[data-testid="breakdown-item-name"]');
          const itemName = await nameLocator.textContent();
          
          if (!this.identifiedZeroItems.includes(itemName)) {
            continue;
          }
        }
      }
    }
    
    for (const zeroItemName of this.identifiedZeroItems) {
      const itemRow = this.page.locator(`${this.breakdownItemRow}:has([data-testid="breakdown-item-name"]:text-is("${zeroItemName}"))`);
      const isVisible = await itemRow.isVisible();
      
      if (!isVisible) {
        return false;
      }
      
      const valueText = await itemRow.locator('[data-testid="breakdown-item-value"]').textContent();
      if (!valueText || valueText.trim() !== '$0.00') {
        return false;
      }
    }
    
    return true;
  }
}

module.exports = ValuationBreakdownPage;