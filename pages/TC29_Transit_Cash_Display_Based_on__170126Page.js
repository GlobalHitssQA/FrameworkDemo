class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.searchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="contract-search-button"]';
    this.bankContractOption = '[data-testid="contract-type-bank"]';
    this.brokerageHouseContractOption = '[data-testid="contract-type-brokerage"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="value-breakdown-popup"]';
    this.transitCashItem = '[data-testid="breakdown-item-transit-cash"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.authenticationIndicator = '[data-testid="user-authenticated"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.authenticationIndicator, { state: 'visible', timeout: 10000 });
  }

  async selectBankContract() {
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.bankContractOption, { state: 'visible' });
    await this.page.click(this.bankContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async selectBrokerageHouseContract() {
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.brokerageHouseContractOption, { state: 'visible' });
    await this.page.click(this.brokerageHouseContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async clickTotalContractValue() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForTimeout(500);
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isTransitCashVisible() {
    return await this.page.isVisible(this.transitCashItem);
  }

  async closeBreakdownPopup() {
    await this.page.click('body', { position: { x: 0, y: 0 } });
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;