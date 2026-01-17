class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.casaBolsaPersonaMoralOption = '[data-testid="contract-type-casa-bolsa-persona-moral"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="value-breakdown-popup"]';
    this.usdCashItem = '[data-testid="breakdown-item-efectivo-usd"]';
    this.usdCashValue = '[data-testid="efectivo-usd-value"]';
    this.closePopupButton = '[data-testid="close-breakdown-popup"]';
  }

  async navigateToActicenter() {
    await this.page.goto('/acticenter');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible' });
  }

  async selectCasaDeBolsaPersonaMoralContract() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.casaBolsaPersonaMoralOption, { state: 'visible' });
    await this.page.click(this.casaBolsaPersonaMoralOption);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isUsdCashItemVisible() {
    return await this.page.isVisible(this.usdCashItem);
  }

  async getUsdCashValue() {
    await this.page.waitForSelector(this.usdCashValue, { state: 'visible' });
    return await this.page.textContent(this.usdCashValue);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closePopupButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ActicenterPage;