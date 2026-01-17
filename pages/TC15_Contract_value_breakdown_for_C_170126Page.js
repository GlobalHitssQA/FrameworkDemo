class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractSelectorDropdown = '[data-testid="contract-selector-dropdown"]';
    this.casaBolsaPersonaFisicaOption = '[data-testid="contract-option-casa-bolsa-pf"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.usdCashItem = '[data-testid="breakdown-item-efectivo-usd"]';
    this.usdCashValue = '[data-testid="efectivo-usd-value"]';
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

  async selectCasaDeBolsaPersonaFisicaContract() {
    await this.page.click(this.casaBolsaPersonaFisicaOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueComponentVisible() {
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isUsdCashItemVisible() {
    await this.page.waitForSelector(this.breakdownList, { state: 'visible' });
    return await this.page.isVisible(this.usdCashItem);
  }

  async verifyUsdCashCurrencyFormat() {
    const valueText = await this.page.textContent(this.usdCashValue);
    const usdFormatRegex = /^\$[\d,]+(\.\d{2})?\s*(USD|usd)?$/;
    const alternativeFormat = /^USD\s*\$?[\d,]+(\.\d{2})?$/;
    return usdFormatRegex.test(valueText.trim()) || alternativeFormat.test(valueText.trim());
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = ContractBreakdownPage;