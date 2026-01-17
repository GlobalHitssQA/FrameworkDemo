class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button-magnifier"]';
    this.contractValueComponent = '[data-testid="contract-total-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.investmentItemRow = '[data-testid="investment-item-row"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
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
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenLoaded() {
    try {
      await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async startTimeMeasurement() {
    return Date.now();
  }

  async selectContractWithMultipleItems() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    const contracts = await this.page.$$(this.contractListItem);
    if (contracts.length > 0) {
      await contracts[0].click();
    }
  }

  async waitForContractValueComponentAndMeasure(startTime) {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 5000 });
    const endTime = Date.now();
    return endTime - startTime;
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async waitForBreakdownPopupAndMeasure(startTime) {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    const endTime = Date.now();
    return endTime - startTime;
  }

  async areAllInvestmentItemsVisible() {
    const itemSelectors = [
      this.purchasingPowerMXN,
      this.cashMXN,
      this.cashUSD,
      this.debtFunds,
      this.hedgeFunds,
      this.equityFunds,
      this.moneyMarket,
      this.capitalMarket,
      this.pendingSettlement
    ];

    for (const selector of itemSelectors) {
      try {
        const element = await this.page.$(selector);
        if (element) {
          const isVisible = await element.isVisible();
          const textContent = await element.textContent();
          if (!isVisible || !textContent || textContent.trim() === '') {
            return false;
          }
        }
      } catch (error) {
        continue;
      }
    }

    const investmentItems = await this.page.$$(this.investmentItemRow);
    if (investmentItems.length === 0) {
      return false;
    }

    for (const item of investmentItems) {
      const isVisible = await item.isVisible();
      if (!isVisible) {
        return false;
      }
    }

    return true;
  }
}

module.exports = ActicenterPage;