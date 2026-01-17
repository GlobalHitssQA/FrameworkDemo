class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractWithCedesOption = '[data-testid="contract-option-cedes-pagares"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.breakdownItemCedesPagares = '[data-testid="breakdown-item-cedes-pagares"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithCedesYPagares() {
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.contractWithCedesOption, { state: 'visible' });
    await this.page.click(this.contractWithCedesOption);
  }

  async verifyContractValueComponentIsDisplayed() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickOnTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isBreakdownItemVisible(itemName) {
    const itemSelector = this.getBreakdownItemSelector(itemName);
    return await this.page.isVisible(itemSelector);
  }

  async getBreakdownItemText(itemName) {
    const itemSelector = this.getBreakdownItemSelector(itemName);
    await this.page.waitForSelector(itemSelector, { state: 'visible' });
    return await this.page.textContent(itemSelector);
  }

  getBreakdownItemSelector(itemName) {
    if (itemName === 'Cedes y pagarés') {
      return this.breakdownItemCedesPagares;
    }
    return `[data-testid="breakdown-item"]:has-text("${itemName}")`;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = ActicenterPage;