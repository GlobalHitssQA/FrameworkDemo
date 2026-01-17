class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://acticenter.example.com';
    
    // Locators - inferidos basados en buenas prácticas
    this.acticenterModule = '[data-testid="acticenter-module"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.activeContractItem = '[data-testid="active-contract-item"]';
    this.contractValueComponent = '[data-testid="contract-total-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.popupDebtFunds = '[data-testid="popup-debt-funds"]';
    this.popupEquityFunds = '[data-testid="popup-equity-funds"]';
    this.popupCoverageFunds = '[data-testid="popup-coverage-funds"]';
    this.popupCashMXN = '[data-testid="popup-cash-mxn"]';
    this.popupCashUSD = '[data-testid="popup-cash-usd"]';
    this.popupBuyingPower = '[data-testid="popup-buying-power"]';
    this.popupPendingSettlement = '[data-testid="popup-pending-settlement"]';
    this.popupMoneyMarket = '[data-testid="popup-money-market"]';
    this.popupCapitalMarket = '[data-testid="popup-capital-market"]';
    this.popupCloseButton = '[data-testid="popup-close-button"]';
    this.popupOverlay = '[data-testid="popup-overlay"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForSelector(this.acticenterModule, { state: 'visible' });
  }

  async selectActiveContract() {
    await this.page.click(this.contractSearchButton);
    await this.page.click(this.activeContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async clickContractValueAndMeasureTime() {
    const startTime = performance.now();
    
    await this.page.click(this.contractValueComponent);
    
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
    await this.waitForPopupContentLoaded();
    
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    
    return elapsedTime;
  }

  async waitForPopupContentLoaded() {
    await Promise.all([
      this.page.waitForSelector(this.popupDebtFunds, { state: 'visible', timeout: 5000 }).catch(() => {}),
      this.page.waitForSelector(this.popupCashMXN, { state: 'visible', timeout: 5000 }).catch(() => {}),
      this.page.waitForSelector(this.popupBuyingPower, { state: 'visible', timeout: 5000 }).catch(() => {})
    ]);
  }

  async verifyPopupFullyLoaded() {
    const isPopupVisible = await this.page.isVisible(this.breakdownPopup);
    return isPopupVisible;
  }

  async closePopup() {
    const closeButtonVisible = await this.page.isVisible(this.popupCloseButton);
    
    if (closeButtonVisible) {
      await this.page.click(this.popupCloseButton);
    } else {
      await this.page.click(this.popupOverlay, { position: { x: 10, y: 10 } });
    }
    
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async getPopupContent() {
    const content = {};
    
    if (await this.page.isVisible(this.popupDebtFunds)) {
      content.debtFunds = await this.page.textContent(this.popupDebtFunds);
    }
    if (await this.page.isVisible(this.popupEquityFunds)) {
      content.equityFunds = await this.page.textContent(this.popupEquityFunds);
    }
    if (await this.page.isVisible(this.popupCashMXN)) {
      content.cashMXN = await this.page.textContent(this.popupCashMXN);
    }
    if (await this.page.isVisible(this.popupCashUSD)) {
      content.cashUSD = await this.page.textContent(this.popupCashUSD);
    }
    if (await this.page.isVisible(this.popupBuyingPower)) {
      content.buyingPower = await this.page.textContent(this.popupBuyingPower);
    }
    
    return content;
  }
}

module.exports = ActicenterPage;