class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.acticenterContainer = '[data-testid="acticenter-container"]';
    this.searchButton = '[data-testid="search-client-contract-button"]';
    this.searchInput = '[data-testid="search-input"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-value-breakdown-popup"]';
    this.purchasingPowerMXN = '[data-testid="breakdown-purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="breakdown-cash-mxn"]';
    this.cashUSD = '[data-testid="breakdown-cash-usd"]';
    this.pendingSettlement = '[data-testid="breakdown-pending-settlement"]';
    this.debtFunds = '[data-testid="breakdown-debt-funds"]';
    this.hedgeFunds = '[data-testid="breakdown-hedge-funds"]';
    this.equityFunds = '[data-testid="breakdown-equity-funds"]';
    this.cedesAndPromissoryNotes = '[data-testid="breakdown-cedes-promissory-notes"]';
    this.moneyMarket = '[data-testid="breakdown-money-market"]';
    this.capitalMarket = '[data-testid="breakdown-capital-market"]';
  }

  async setViewportToResponsiveLandscape() {
    await this.page.setViewportSize({ width: 1024, height: 768 });
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActicenterInterfaceIsDisplayed() {
    await this.page.waitForSelector(this.acticenterContainer, { state: 'visible', timeout: 10000 });
  }

  async clickSearchButton() {
    await this.page.click(this.searchButton);
  }

  async searchAndSelectContract() {
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
    await this.page.fill(this.searchInput, process.env.TEST_CONTRACT_NUMBER || 'TEST-CONTRACT-001');
    await this.page.waitForSelector(this.searchResultItem, { state: 'visible' });
    await this.page.click(this.searchResultItem);
  }

  async isTotalContractValueComponentVisible() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isPurchasingPowerMXNVisible() {
    return await this.page.isVisible(this.purchasingPowerMXN);
  }

  async isCashMXNVisible() {
    return await this.page.isVisible(this.cashMXN);
  }

  async isCashUSDVisible() {
    return await this.page.isVisible(this.cashUSD);
  }

  async isPendingSettlementVisible() {
    return await this.page.isVisible(this.pendingSettlement);
  }

  async isDebtFundsVisible() {
    return await this.page.isVisible(this.debtFunds);
  }

  async isHedgeFundsVisible() {
    return await this.page.isVisible(this.hedgeFunds);
  }

  async isEquityFundsVisible() {
    return await this.page.isVisible(this.equityFunds);
  }

  async isCedesAndPromissoryNotesVisible() {
    return await this.page.isVisible(this.cedesAndPromissoryNotes);
  }

  async isMoneyMarketVisible() {
    return await this.page.isVisible(this.moneyMarket);
  }

  async isCapitalMarketVisible() {
    return await this.page.isVisible(this.capitalMarket);
  }
}

module.exports = ContractValuePage;