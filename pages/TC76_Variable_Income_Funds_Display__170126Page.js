class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.searchClientInput = '[data-testid="search-client-contract"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractWithoutVariableFunds = '[data-testid="contract-no-variable-income"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="value-breakdown-popup"]';
    this.breakdownSections = '[data-testid="breakdown-section"]';
    this.variableIncomeFundsSection = '[data-testid="variable-income-funds-section"]';
    this.variableIncomeFundsValue = '[data-testid="variable-income-funds-value"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.sectionValueItems = '[data-testid="section-value-item"]';
    this.contractLoadedIndicator = '[data-testid="contract-loaded"]';
    this.userAuthenticatedIndicator = '[data-testid="user-authenticated"]';
    this.debtFundsSection = '[data-testid="debt-funds-section"]';
    this.hedgeFundsSection = '[data-testid="hedge-funds-section"]';
    this.moneyMarketSection = '[data-testid="money-market-section"]';
    this.capitalsSection = '[data-testid="capitals-section"]';
    this.cashMxnSection = '[data-testid="cash-mxn-section"]';
    this.cashUsdSection = '[data-testid="cash-usd-section"]';
    this.pendingSettlementSection = '[data-testid="pending-settlement-section"]';
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userAuthenticatedIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyContractWithoutVariableIncomeFundsExists() {
    const contractExists = await this.page.locator(this.contractWithoutVariableFunds).count();
    return contractExists > 0;
  }

  async selectContractWithoutVariableIncomeFunds() {
    await this.page.click(this.contractWithoutVariableFunds);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractLoaded() {
    await this.page.waitForSelector(this.contractLoadedIndicator, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractLoadedIndicator);
  }

  async clickTotalContractValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getBreakdownSectionsCount() {
    await this.page.waitForSelector(this.breakdownSections, { state: 'visible' });
    return await this.page.locator(this.breakdownSections).count();
  }

  async locateVariableIncomeFundsSection() {
    await this.page.waitForSelector(this.variableIncomeFundsSection, { state: 'visible', timeout: 5000 });
  }

  async getVariableIncomeFundsValue() {
    await this.page.waitForSelector(this.variableIncomeFundsValue, { state: 'visible' });
    const valueText = await this.page.textContent(this.variableIncomeFundsValue);
    return valueText.trim();
  }

  async getTotalContractValue() {
    const totalText = await this.page.textContent(this.totalValueDisplay);
    return this.parseMoneyValue(totalText);
  }

  async calculateSumOfAllSections() {
    const sectionValues = await this.page.locator(this.sectionValueItems).allTextContents();
    let sum = 0;
    for (const value of sectionValues) {
      sum += this.parseMoneyValue(value);
    }
    return sum;
  }

  parseMoneyValue(valueString) {
    const cleanValue = valueString.replace(/[$,]/g, '').trim();
    return parseFloat(cleanValue) || 0;
  }
}

module.exports = ContractValuePage;