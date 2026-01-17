class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.casaDeBolsaIndividualOption = '[data-testid="contract-type-casa-bolsa-pf"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-value-breakdown-popup"]';
    this.usdCashItem = '[data-testid="efectivo-usd-item"]';
    this.usdCashValue = '[data-testid="efectivo-usd-value"]';
    this.contractLoadedIndicator = '[data-testid="contract-info-loaded"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || '/acticenter');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectCasaDeBolsaIndividualContract() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.casaDeBolsaIndividualOption, { state: 'visible' });
    await this.page.click(this.casaDeBolsaIndividualOption);
    await this.page.click(this.contractListItem + ':first-child');
  }

  async verifyContractLoaded() {
    await this.page.waitForSelector(this.contractLoadedIndicator, { state: 'visible', timeout: 15000 });
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isUsdCashItemVisible() {
    return await this.page.isVisible(this.usdCashItem);
  }

  async getUsdCashValue() {
    await this.page.waitForSelector(this.usdCashValue, { state: 'visible' });
    return await this.page.textContent(this.usdCashValue);
  }
};

module.exports = ActicenterPage;