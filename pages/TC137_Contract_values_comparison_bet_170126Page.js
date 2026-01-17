class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.searchInput = '[data-testid="search-contract-input"]';
    this.searchButton = '[data-testid="search-contract-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn-value"]';
    this.cashMXN = '[data-testid="cash-mxn-value"]';
    this.cashUSD = '[data-testid="cash-usd-value"]';
    this.pendingSettlement = '[data-testid="pending-settlement-value"]';
    this.debtFunds = '[data-testid="debt-funds-value"]';
    this.hedgeFunds = '[data-testid="hedge-funds-value"]';
    this.equityFunds = '[data-testid="equity-funds-value"]';
    this.cedesAndPromissoryNotes = '[data-testid="cedes-promissory-notes-value"]';
    this.moneyMarket = '[data-testid="money-market-value"]';
    this.capitalMarket = '[data-testid="capital-market-value"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async searchContract(contractNumber) {
    await this.page.fill(this.searchInput, contractNumber);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
  }

  async selectContract() {
    await this.page.click(this.contractListItem);
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async waitForBreakdownPopup() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async getMonetaryValue(selector) {
    const text = await this.page.textContent(selector);
    return this.parseMonetaryValue(text);
  }

  parseMonetaryValue(text) {
    if (!text) return null;
    return text.trim().replace(/[\s,]/g, '');
  }

  async getPurchasingPowerMXN() {
    return await this.getMonetaryValue(this.purchasingPowerMXN);
  }

  async getCashMXN() {
    return await this.getMonetaryValue(this.cashMXN);
  }

  async getCashUSD() {
    return await this.getMonetaryValue(this.cashUSD);
  }

  async getPendingSettlement() {
    return await this.getMonetaryValue(this.pendingSettlement);
  }

  async getDebtFunds() {
    return await this.getMonetaryValue(this.debtFunds);
  }

  async getHedgeFunds() {
    return await this.getMonetaryValue(this.hedgeFunds);
  }

  async getEquityFunds() {
    return await this.getMonetaryValue(this.equityFunds);
  }

  async getCedesAndPromissoryNotes() {
    return await this.getMonetaryValue(this.cedesAndPromissoryNotes);
  }

  async getMoneyMarket() {
    return await this.getMonetaryValue(this.moneyMarket);
  }

  async getCapitalMarket() {
    return await this.getMonetaryValue(this.capitalMarket);
  }

  async getTotalContractValue() {
    return await this.getMonetaryValue(this.totalContractValue);
  }

  async getAllCategoryValues() {
    return {
      purchasingPowerMXN: await this.getPurchasingPowerMXN(),
      cashMXN: await this.getCashMXN(),
      cashUSD: await this.getCashUSD(),
      pendingSettlement: await this.getPendingSettlement(),
      debtFunds: await this.getDebtFunds(),
      hedgeFunds: await this.getHedgeFunds(),
      equityFunds: await this.getEquityFunds(),
      cedesAndPromissoryNotes: await this.getCedesAndPromissoryNotes(),
      moneyMarket: await this.getMoneyMarket(),
      capitalMarket: await this.getCapitalMarket()
    };
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }
}

class ModuloAsesorPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.MODULO_ASESOR_URL || 'https://modulo-asesor.example.com';
    
    this.searchInput = '[data-testid="ma-search-contract-input"]';
    this.searchButton = '[data-testid="ma-search-contract-button"]';
    this.contractListItem = '[data-testid="ma-contract-list-item"]';
    this.contractDetail = '[data-testid="ma-contract-detail"]';
    
    this.purchasingPowerMXN = '[data-testid="ma-purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="ma-cash-mxn"]';
    this.cashUSD = '[data-testid="ma-cash-usd"]';
    this.pendingSettlement = '[data-testid="ma-pending-settlement"]';
    this.debtFunds = '[data-testid="ma-debt-funds"]';
    this.hedgeFunds = '[data-testid="ma-hedge-funds"]';
    this.equityFunds = '[data-testid="ma-equity-funds"]';
    this.cedesAndPromissoryNotes = '[data-testid="ma-cedes-promissory-notes"]';
    this.moneyMarket = '[data-testid="ma-money-market"]';
    this.capitalMarket = '[data-testid="ma-capital-market"]';
  }

  async navigateToModuloAsesor() {
    await this.page.goto(this.baseUrl);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async searchContract(contractNumber) {
    await this.page.fill(this.searchInput, contractNumber);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
  }

  async selectContract() {
    await this.page.click(this.contractListItem);
    await this.page.waitForSelector(this.contractDetail, { state: 'visible' });
  }

  async getMonetaryValue(selector) {
    const text = await this.page.textContent(selector);
    return this.parseMonetaryValue(text);
  }

  parseMonetaryValue(text) {
    if (!text) return null;
    return text.trim().replace(/[\s,]/g, '');
  }

  async getAllCategoryValues() {
    return {
      purchasingPowerMXN: await this.getMonetaryValue(this.purchasingPowerMXN),
      cashMXN: await this.getMonetaryValue(this.cashMXN),
      cashUSD: await this.getMonetaryValue(this.cashUSD),
      pendingSettlement: await this.getMonetaryValue(this.pendingSettlement),
      debtFunds: await this.getMonetaryValue(this.debtFunds),
      hedgeFunds: await this.getMonetaryValue(this.hedgeFunds),
      equityFunds: await this.getMonetaryValue(this.equityFunds),
      cedesAndPromissoryNotes: await this.getMonetaryValue(this.cedesAndPromissoryNotes),
      moneyMarket: await this.getMonetaryValue(this.moneyMarket),
      capitalMarket: await this.getMonetaryValue(this.capitalMarket)
    };
  }
}

module.exports = { ActicenterPage, ModuloAsesorPage };