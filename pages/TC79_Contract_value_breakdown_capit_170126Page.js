class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.mainScreenContainer = '[data-testid="acticenter-main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item-capital-market"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.capitalMarketSection = '[data-testid="breakdown-item-mercado-capitales"]';
    this.capitalMarketSectionName = '[data-testid="breakdown-item-mercado-capitales"] [data-testid="item-name"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreenContainer, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithCapitalMarketInvestments() {
    await this.page.waitForSelector(this.contractListItem, { state: 'visible', timeout: 10000 });
    await this.page.click(this.contractListItem);
  }

  async verifyTotalContractValueComponentIsDisplayed() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupDisplayed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getCapitalMarketSectionName() {
    await this.page.waitForSelector(this.capitalMarketSectionName, { state: 'visible', timeout: 5000 });
    return await this.page.textContent(this.capitalMarketSectionName);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }
}

module.exports = ActicenterPage;