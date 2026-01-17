class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators - inferidos usando buenas prácticas
    this.loginUsernameInput = '[data-testid="login-username"]';
    this.loginPasswordInput = '[data-testid="login-password"]';
    this.loginSubmitButton = '[data-testid="login-submit"]';
    this.contractSearchIcon = '[data-testid="contract-search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchResults = '[data-testid="contract-search-results"]';
    this.contractResultItem = '[data-testid="contract-result-item"]';
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.pendingToSettleItem = '[data-testid="pending-to-settle-item"]';
    this.pendingToSettleValue = '[data-testid="pending-to-settle-value"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.debtFundsValue = '[data-testid="debt-funds-value"]';
    this.hedgeFundsValue = '[data-testid="hedge-funds-value"]';
    this.equityFundsValue = '[data-testid="equity-funds-value"]';
    this.moneyMarketValue = '[data-testid="money-market-value"]';
    this.capitalMarketValue = '[data-testid="capital-market-value"]';
    this.cashMxnValue = '[data-testid="cash-mxn-value"]';
    this.cashUsdValue = '[data-testid="cash-usd-value"]';
    this.purchasingPowerValue = '[data-testid="purchasing-power-value"]';
    this.contractLoadedIndicator = '[data-testid="contract-loaded-indicator"]';
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://ota-acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async performLogin() {
    await this.page.fill(this.loginUsernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(this.loginPasswordInput, process.env.TEST_PASSWORD || 'testpassword');
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractSearchIsAvailable() {
    await this.page.waitForSelector(this.contractSearchIcon, { state: 'visible' });
  }

  async searchAndSelectContractWithoutPendingOperations() {
    await this.page.click(this.contractSearchIcon);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
    const contractNumber = process.env.CONTRACT_WITHOUT_PENDING || 'CONTRACT_NO_PENDING_001';
    await this.page.fill(this.contractSearchInput, contractNumber);
    await this.page.waitForSelector(this.contractSearchResults, { state: 'visible' });
    await this.page.click(this.contractResultItem);
  }

  async isContractLoaded() {
    await this.page.waitForSelector(this.contractLoadedIndicator, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractLoadedIndicator);
  }

  async clickTotalValueComponent() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
    await this.page.click(this.totalValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async scrollToPendingToSettleItem() {
    const pendingItem = this.page.locator(this.pendingToSettleItem);
    await pendingItem.scrollIntoViewIfNeeded();
  }

  async getPendingToSettleValue() {
    await this.page.waitForSelector(this.pendingToSettleValue, { state: 'visible' });
    const valueText = await this.page.textContent(this.pendingToSettleValue);
    return valueText.trim();
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.totalContractValue, { state: 'visible' });
    const valueText = await this.page.textContent(this.totalContractValue);
    return this.parseMonetaryValue(valueText);
  }

  async calculateSumOfNonPendingItems() {
    const debtFunds = await this.getNumericValue(this.debtFundsValue);
    const hedgeFunds = await this.getNumericValue(this.hedgeFundsValue);
    const equityFunds = await this.getNumericValue(this.equityFundsValue);
    const moneyMarket = await this.getNumericValue(this.moneyMarketValue);
    const capitalMarket = await this.getNumericValue(this.capitalMarketValue);
    const cashMxn = await this.getNumericValue(this.cashMxnValue);
    const cashUsd = await this.getNumericValue(this.cashUsdValue);
    const purchasingPower = await this.getNumericValue(this.purchasingPowerValue);
    
    const sum = debtFunds + hedgeFunds + equityFunds + moneyMarket + capitalMarket + cashMxn + cashUsd + purchasingPower;
    return sum;
  }

  async getNumericValue(selector) {
    try {
      const isVisible = await this.page.isVisible(selector);
      if (!isVisible) return 0;
      const valueText = await this.page.textContent(selector);
      return this.parseMonetaryValue(valueText);
    } catch (error) {
      return 0;
    }
  }

  parseMonetaryValue(valueString) {
    if (!valueString) return 0;
    const cleanedValue = valueString.replace(/[$,\s]/g, '');
    const numericValue = parseFloat(cleanedValue);
    return isNaN(numericValue) ? 0 : numericValue;
  }
};

module.exports = ContractBreakdownPage;