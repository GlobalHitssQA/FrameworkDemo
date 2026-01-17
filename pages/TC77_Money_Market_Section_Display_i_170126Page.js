class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.mainScreen = page.locator('[data-testid="acticenter-main-screen"]');
    this.contractSelector = page.locator('[data-testid="contract-selector"]');
    this.contractWithMoneyMarket = page.locator('[data-testid="contract-money-market"]');
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.moneyMarketSection = page.locator('[data-testid="breakdown-item-mercado-dinero"]');
    this.moneyMarketSectionName = page.locator('[data-testid="breakdown-item-mercado-dinero"] [data-testid="item-name"]');
    this.closeBreakdownButton = page.locator('[data-testid="close-breakdown-button"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
  }

  async verifyMainScreenDisplayed() {
    await this.mainScreen.waitFor({ state: 'visible', timeout: 10000 });
  }

  async selectContractWithMoneyMarket() {
    await this.contractSelector.click();
    await this.contractWithMoneyMarket.click();
  }

  async verifyContractValueComponentDisplayed() {
    await this.totalContractValueComponent.waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickOnTotalContractValue() {
    await this.totalContractValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async getMoneyMarketSectionName() {
    await this.moneyMarketSection.waitFor({ state: 'visible', timeout: 5000 });
    return await this.moneyMarketSectionName.textContent();
  }

  async closeBreakdownPopup() {
    await this.closeBreakdownButton.click();
  }
};

module.exports = ActicenterPage;