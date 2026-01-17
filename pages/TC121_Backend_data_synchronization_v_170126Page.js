class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Main Screen
    this.mainContainer = '[data-testid="acticenter-main-container"]';
    this.searchIcon = '[data-testid="client-contract-search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    
    // Locators - Contract Selection
    this.casaBolsaPersonaFisicaOption = '[data-testid="contract-type-casa-bolsa-pf"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Locators - Contract Value Component
    this.contractValueComponent = '[data-testid="contract-value-composition"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.debtFunds = '[data-testid="debt-funds-value"]';
    this.coverageFunds = '[data-testid="coverage-funds-value"]';
    this.variableIncomeFunds = '[data-testid="variable-income-funds-value"]';
    this.moneyMarket = '[data-testid="money-market-value"]';
    this.capitalMarket = '[data-testid="capital-market-value"]';
    this.pendingSettlement = '[data-testid="pending-settlement-value"]';
    this.breakdownCloseButton = '[data-testid="breakdown-popup-close"]';
    
    // All breakdown items for sum calculation
    this.breakdownItems = '[data-testid^="breakdown-item-"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenLoaded() {
    await this.page.waitForSelector(this.mainContainer, { state: 'visible', timeout: 10000 });
  }

  async selectCasaDeBolsaPersonaFisicaContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.casaBolsaPersonaFisicaOption, { state: 'visible' });
    await this.page.click(this.casaBolsaPersonaFisicaOption);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async verifyAllBreakdownItemsDisplayed() {
    const requiredElements = [
      this.purchasingPowerMXN,
      this.cashMXN,
      this.cashUSD,
      this.debtFunds,
      this.coverageFunds,
      this.variableIncomeFunds,
      this.moneyMarket,
      this.capitalMarket,
      this.pendingSettlement
    ];
    
    for (const element of requiredElements) {
      const isVisible = await this.page.isVisible(element);
      if (!isVisible) return false;
    }
    return true;
  }

  async getPurchasingPowerMXN() {
    const text = await this.page.textContent(this.purchasingPowerMXN);
    return this.parseMonetaryValue(text);
  }

  async getAdvisorModuleCurrentCashValue() {
    const response = await this.page.request.get('/api/advisor-module/currentcash');
    const data = await response.json();
    return data.purchasingPowerMXN;
  }

  async verifyFundsValuesMatchServices() {
    const [debtFundsUI, coverageFundsUI, variableIncomeUI] = await Promise.all([
      this.page.textContent(this.debtFunds).then(this.parseMonetaryValue),
      this.page.textContent(this.coverageFunds).then(this.parseMonetaryValue),
      this.page.textContent(this.variableIncomeFunds).then(this.parseMonetaryValue)
    ]);

    const fundsResponse = await this.page.request.get('/api/funds/values');
    const fundsData = await fundsResponse.json();

    return debtFundsUI === fundsData.debtFunds &&
           coverageFundsUI === fundsData.coverageFunds &&
           variableIncomeUI === fundsData.variableIncome;
  }

  async getTotalContractValue() {
    const text = await this.page.textContent(this.totalContractValue);
    return this.parseMonetaryValue(text);
  }

  async calculateSumOfAllBreakdownItems() {
    const values = await Promise.all([
      this.page.textContent(this.purchasingPowerMXN),
      this.page.textContent(this.cashMXN),
      this.page.textContent(this.cashUSD),
      this.page.textContent(this.debtFunds),
      this.page.textContent(this.coverageFunds),
      this.page.textContent(this.variableIncomeFunds),
      this.page.textContent(this.moneyMarket),
      this.page.textContent(this.capitalMarket),
      this.page.textContent(this.pendingSettlement)
    ]);

    return values.reduce((sum, value) => sum + this.parseMonetaryValue(value), 0);
  }

  parseMonetaryValue(text) {
    if (!text) return 0;
    const cleanedText = text.replace(/[^0-9.-]/g, '');
    return parseFloat(cleanedText) || 0;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ActicenterPage;