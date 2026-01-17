class ActicenterContractPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractSelectorDropdown = '[data-testid="contract-selector-dropdown"]';
    this.casaBolsaPersonaMoralOption = '[data-testid="contract-option-casa-bolsa-persona-moral"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.cashUsdItem = '[data-testid="breakdown-item-efectivo-usd"]';
    this.cashUsdValue = '[data-testid="breakdown-value-efectivo-usd"]';
    this.closeBreakdownButton = '[data-testid="breakdown-close-button"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async openContractSelector() {
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.contractSelectorDropdown, { state: 'visible' });
  }

  async selectCasaBolsaPersonaMoralContract() {
    await this.page.click(this.casaBolsaPersonaMoralOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueVisible() {
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickTotalContractValue() {
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isCashUsdItemVisible() {
    return await this.page.isVisible(this.cashUsdItem);
  }

  async getCashUsdValue() {
    await this.page.waitForSelector(this.cashUsdValue, { state: 'visible' });
    return await this.page.textContent(this.cashUsdValue);
  }

  isValidUsdCurrencyFormat(value) {
    const usdPattern = /^\$?\s?[\d,]+(\.\d{2})?\s?(USD|usd|Usd)?$/;
    const usdSymbolPattern = /^US\$\s?[\d,]+(\.\d{2})?$/;
    return usdPattern.test(value.trim()) || usdSymbolPattern.test(value.trim());
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = ActicenterContractPage;