class ContractPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.searchIcon = '[data-testid="search-contract-icon"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.contractComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownToggle = '[data-testid="breakdown-toggle"]';
    this.clientSearchScreen = '[data-testid="client-search-screen"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.cashMxnValue = '[data-testid="cash-mxn-value"]';
    this.cashUsdValue = '[data-testid="cash-usd-value"]';
    this.buyingPowerMxn = '[data-testid="buying-power-mxn"]';
    this.debtFundsValue = '[data-testid="debt-funds-value"]';
    this.hedgeFundsValue = '[data-testid="hedge-funds-value"]';
    this.equityFundsValue = '[data-testid="equity-funds-value"]';
    this.moneyMarketValue = '[data-testid="money-market-value"]';
    this.capitalMarketValue = '[data-testid="capital-market-value"]';
    this.pendingSettlementValue = '[data-testid="pending-settlement-value"]';
    this.loadingIndicator = '[data-testid="loading-indicator"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(this.contractComponent, { state: 'visible', timeout: 10000 });
  }

  async selectInitialContract() {
    const contracts = await this.page.locator(this.contractListItem).all();
    if (contracts.length > 0) {
      await contracts[0].click();
      await this.waitForContractLoad();
    }
  }

  async isContractComponentVisible() {
    return await this.page.locator(this.contractComponent).isVisible();
  }

  async getContractBreakdownValues() {
    await this.expandBreakdownSection();
    
    const values = {
      totalValue: await this.getTotalContractValue(),
      cashMxn: await this.getTextContentSafe(this.cashMxnValue),
      cashUsd: await this.getTextContentSafe(this.cashUsdValue),
      buyingPower: await this.getTextContentSafe(this.buyingPowerMxn),
      debtFunds: await this.getTextContentSafe(this.debtFundsValue),
      hedgeFunds: await this.getTextContentSafe(this.hedgeFundsValue),
      equityFunds: await this.getTextContentSafe(this.equityFundsValue),
      moneyMarket: await this.getTextContentSafe(this.moneyMarketValue),
      capitalMarket: await this.getTextContentSafe(this.capitalMarketValue),
      pendingSettlement: await this.getTextContentSafe(this.pendingSettlementValue)
    };
    
    return values;
  }

  async getTextContentSafe(selector) {
    const element = this.page.locator(selector);
    if (await element.isVisible()) {
      return await element.textContent();
    }
    return null;
  }

  async clickSearchIcon() {
    await this.page.locator(this.searchIcon).click();
    await this.page.waitForSelector(this.clientSearchScreen, { state: 'visible' });
  }

  async isClientSearchScreenVisible() {
    return await this.page.locator(this.clientSearchScreen).isVisible();
  }

  async selectSecondContract() {
    const contracts = await this.page.locator(this.contractListItem).all();
    if (contracts.length > 1) {
      await contracts[1].click();
    }
  }

  async waitForContractLoad() {
    const loadingVisible = await this.page.locator(this.loadingIndicator).isVisible();
    if (loadingVisible) {
      await this.page.waitForSelector(this.loadingIndicator, { state: 'hidden', timeout: 15000 });
    }
    await this.page.waitForLoadState('networkidle');
  }

  async getTotalContractValue() {
    return await this.page.locator(this.totalContractValue).textContent();
  }

  async expandBreakdownSection() {
    const isPopupVisible = await this.page.locator(this.breakdownPopup).isVisible();
    if (!isPopupVisible) {
      await this.page.locator(this.breakdownToggle).click();
      await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
    }
  }

  async isBreakdownPopupVisible() {
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async compareContractValues(firstValues, secondValues) {
    const keysToCompare = Object.keys(firstValues);
    let hasDifferences = false;
    
    for (const key of keysToCompare) {
      if (firstValues[key] !== secondValues[key]) {
        hasDifferences = true;
        break;
      }
    }
    
    return hasDifferences;
  }

  async closeBreakdownByClickingOutside() {
    await this.page.locator('body').click({ position: { x: 0, y: 0 } });
  }
}

module.exports = ContractPage;