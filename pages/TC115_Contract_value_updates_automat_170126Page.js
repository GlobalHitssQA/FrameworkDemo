class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.navigationMarker = Date.now();
    
    // Locators - Authentication and Navigation
    this.acticenterUrl = '/acticenter';
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractWithFundsOption = '[data-testid="contract-item-with-funds"]';
    
    // Locators - Total Value Component
    this.totalValueComponent = '[data-testid="total-contract-value-component"]';
    this.totalValueAmount = '[data-testid="total-value-amount"]';
    this.breakdownPopupTrigger = '[data-testid="breakdown-popup-trigger"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    
    // Locators - Breakdown Items
    this.fundsBalanceItem = '[data-testid="funds-balance-item"]';
    this.fundsBalanceValue = '[data-testid="funds-balance-value"]';
    this.variableIncomeFundsValue = '[data-testid="variable-income-funds-value"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.cedesAndPagares = '[data-testid="cedes-pagares"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    
    // Locators - Fund Sale Operations
    this.fundsSaleSection = '[data-testid="funds-sale-section"]';
    this.variableIncomeFundSelect = '[data-testid="variable-income-fund-select"]';
    this.saleAmountInput = '[data-testid="sale-amount-input"]';
    this.submitSaleButton = '[data-testid="submit-sale-button"]';
    this.transactionConfirmation = '[data-testid="transaction-confirmation"]';
    this.transactionSuccessMessage = '[data-testid="transaction-success-message"]';
    
    // Locators - Distribution Tooltip
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.acticenterUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible', timeout: 10000 });
  }

  async openContractSearch() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async selectContractWithFunds() {
    await this.page.click(this.contractWithFundsOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async getTotalContractValue() {
    const valueText = await this.page.textContent(this.totalValueAmount);
    return this.parseMonetaryValue(valueText);
  }

  async openBreakdownPopup() {
    await this.page.click(this.breakdownPopupTrigger);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async getFundsBalance() {
    await this.openBreakdownPopup();
    const valueText = await this.page.textContent(this.fundsBalanceValue);
    await this.closeBreakdownPopup();
    return this.parseMonetaryValue(valueText);
  }

  async getVariableIncomeFundsValue() {
    await this.openBreakdownPopup();
    const valueText = await this.page.textContent(this.variableIncomeFundsValue);
    await this.closeBreakdownPopup();
    return this.parseMonetaryValue(valueText);
  }

  async getPurchasingPowerMXN() {
    await this.openBreakdownPopup();
    const valueText = await this.page.textContent(this.purchasingPowerMXN);
    await this.closeBreakdownPopup();
    return this.parseMonetaryValue(valueText);
  }

  async openFundsSaleSection() {
    await this.page.click(this.fundsSaleSection);
    await this.page.waitForSelector(this.variableIncomeFundSelect, { state: 'visible' });
  }

  async selectVariableIncomeFund() {
    await this.page.click(this.variableIncomeFundSelect);
    await this.page.waitForTimeout(500);
  }

  async enterSaleAmount(amount) {
    await this.page.fill(this.saleAmountInput, amount.toString());
  }

  async submitSaleOperation() {
    await this.page.click(this.submitSaleButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isTransactionConfirmed() {
    await this.page.waitForSelector(this.transactionConfirmation, { state: 'visible', timeout: 30000 });
    return await this.page.isVisible(this.transactionSuccessMessage);
  }

  async waitForAutomaticRefresh() {
    await this.page.waitForTimeout(5000);
    await this.page.waitForLoadState('networkidle');
  }

  async checkIfPageWasReloaded() {
    const currentMarker = await this.page.evaluate(() => window.navigationMarker);
    return currentMarker !== this.navigationMarker;
  }

  parseMonetaryValue(valueString) {
    if (!valueString) return 0;
    const cleanedValue = valueString.replace(/[$,MXN\s]/g, '');
    return parseFloat(cleanedValue) || 0;
  }
}module.exports = ContractValuePage;