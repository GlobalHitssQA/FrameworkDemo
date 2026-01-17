class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.bancoPersonaMoralOption = '[data-testid="contract-type-banco-persona-moral"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.usdCashSection = '[data-testid="efectivo-usd-section"]';
    this.usdCashAmountLabel = '[data-testid="efectivo-usd-amount"]';
    this.mexdolarBalanceLabel = '[data-testid="mexdolar-account-balance"]';
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
    this.loadingSpinner = '[data-testid="loading-spinner"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || '/acticenter');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectBancoPersonaMoralContract() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.bancoPersonaMoralOption, { state: 'visible' });
    await this.page.click(this.bancoPersonaMoralOption);
    const contractItem = this.page.locator(this.contractListItem).filter({ hasText: 'Mexdolar' }).first();
    await contractItem.click();
  }

  async verifyContractLoaded() {
    await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden', timeout: 15000 });
    await this.page.waitForSelector(this.contractInfoContainer, { state: 'visible' });
  }

  async verifyTotalValueComponentDisplayed() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isUsdCashSectionVisible() {
    return await this.page.isVisible(this.usdCashSection);
  }

  async getUsdCashAmount() {
    const amountText = await this.page.textContent(this.usdCashAmountLabel);
    return this.parseAmount(amountText);
  }

  async getMexdolarAccountBalance() {
    const balanceText = await this.page.textContent(this.mexdolarBalanceLabel);
    return this.parseAmount(balanceText);
  }

  parseAmount(text) {
    if (!text) return 0;
    const cleanedText = text.replace(/[^0-9.,]/g, '').replace(',', '');
    return parseFloat(cleanedText) || 0;
  }
};

module.exports = ActicenterPage;