class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractWithoutPurchasingPower = '[data-testid="contract-item-no-purchasing-power"]';
    this.contractLoadedIndicator = '[data-testid="contract-loaded-indicator"]';
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.purchasingPowerMXNItem = '[data-testid="purchasing-power-mxn-item"]';
    this.purchasingPowerMXNValue = '[data-testid="purchasing-power-mxn-value"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithoutPurchasingPower() {
    const contractSelector = this.contractWithoutPurchasingPower;
    await this.page.waitForSelector(contractSelector, { state: 'visible' });
    await this.page.click(contractSelector);
  }

  async verifyContractLoaded() {
    await this.page.waitForSelector(this.contractLoadedIndicator, { state: 'visible', timeout: 10000 });
  }

  async clickTotalValueComponent() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
    await this.page.click(this.totalValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isPurchasingPowerMXNVisible() {
    return await this.page.isVisible(this.purchasingPowerMXNItem);
  }

  async getPurchasingPowerMXNValue() {
    await this.page.waitForSelector(this.purchasingPowerMXNValue, { state: 'visible' });
    return await this.page.textContent(this.purchasingPowerMXNValue);
  }
}

module.exports = ContractBreakdownPage;