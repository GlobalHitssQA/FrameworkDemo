class ContractValuationPage {
  constructor(page) {
    this.page = page;
    
    // Locators - inferidos siguiendo mejores prácticas
    this.searchInput = '[data-testid="search-client-contract"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractList = '[data-testid="contract-list"]';
    this.bankContractItem = '[data-testid="bank-contract-item"]';
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    this.userProfileIndicator = '[data-testid="user-profile"]';
    this.loadingIndicator = '[data-testid="loading-indicator"]';
    this.contractLoadedIndicator = '[data-testid="contract-loaded"]';
    this.valuationServiceStatus = '[data-testid="valuation-service-status"]';
    
    // Rubros específicos del desglose
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.fundsSection = '[data-testid="funds-section"]';
    this.cedesAndPromissory = '[data-testid="cedes-promissory"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyBankContractIsAvailable() {
    await this.page.waitForSelector(this.contractList, { state: 'visible' });
    const bankContract = await this.page.locator(this.bankContractItem).first();
    await bankContract.waitFor({ state: 'visible' });
  }

  async verifyValuationServiceIsAvailable() {
    const response = await this.page.request.get(process.env.VALUATION_SERVICE_URL || '/api/valuation/health');
    return response.ok();
  }

  async selectBankContract() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractList, { state: 'visible' });
    await this.page.click(this.bankContractItem);
    await this.page.waitForSelector(this.loadingIndicator, { state: 'hidden', timeout: 15000 });
  }

  async isContractLoaded() {
    await this.page.waitForSelector(this.contractLoadedIndicator, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractLoadedIndicator);
  }

  async accessContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 10000 });
  }

  async isValuationServiceInvoked() {
    const response = await this.page.waitForResponse(
      response => response.url().includes('/api/valuation') && response.status() === 200,
      { timeout: 15000 }
    );
    return response !== null;
  }

  async isTotalContractValueVisible() {
    await this.page.waitForSelector(this.totalContractValue, { state: 'visible' });
    const text = await this.page.textContent(this.totalContractValue);
    return text !== null && text.length > 0;
  }

  async isItemizedBreakdownVisible() {
    await this.page.waitForSelector(this.breakdownItemsList, { state: 'visible' });
    return await this.page.isVisible(this.breakdownItemsList);
  }

  async getBreakdownItems() {
    await this.page.waitForSelector(this.breakdownItem, { state: 'visible' });
    return await this.page.locator(this.breakdownItem).all();
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async getTotalContractValueText() {
    return await this.page.textContent(this.totalContractValue);
  }

  async getBreakdownItemValues() {
    const items = await this.page.locator(this.breakdownItem).all();
    const values = [];
    for (const item of items) {
      values.push(await item.textContent());
    }
    return values;
  }
};

module.exports = ContractValuationPage;