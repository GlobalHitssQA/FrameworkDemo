class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.searchButton = '[data-testid="search-contract-button"]';
    this.searchInput = '[data-testid="search-contract-input"]';
    this.contractResultItem = '[data-testid="contract-result-item"]';
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    this.expandBreakdownButton = '[data-testid="expand-breakdown-button"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.buyingPowerMXNField = '[data-testid="buying-power-mxn"]';
    this.buyingPowerMXNValue = '[data-testid="buying-power-mxn-value"]';
    this.cashMXNField = '[data-testid="cash-mxn"]';
    this.cashMXNValue = '[data-testid="cash-mxn-value"]';
    this.cashUSDField = '[data-testid="cash-usd"]';
    this.loginUsernameInput = '[data-testid="login-username"]';
    this.loginPasswordInput = '[data-testid="login-password"]';
    this.loginSubmitButton = '[data-testid="login-submit"]';
    this.closePopupButton = '[data-testid="close-popup-button"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.loginUsernameInput, username);
    await this.page.fill(this.loginPasswordInput, password);
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchContract(contractId) {
    await this.page.click(this.searchButton);
    await this.page.fill(this.searchInput, contractId);
    await this.page.press(this.searchInput, 'Enter');
    await this.page.waitForSelector(this.contractResultItem);
  }

  async selectContract(contractId) {
    const contractSelector = `[data-testid="contract-result-item"][data-contract-id="${contractId}"]`;
    await this.page.click(contractSelector);
    await this.page.waitForSelector(this.valueCompositionComponent);
  }

  async isValueCompositionComponentDisplayed() {
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async expandContractBreakdown() {
    await this.page.click(this.expandBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup);
  }

  async isBreakdownPopupDisplayed() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isBuyingPowerMXNDisplayed() {
    return await this.page.isVisible(this.buyingPowerMXNField);
  }

  async getBuyingPowerMXNValue() {
    await this.page.waitForSelector(this.buyingPowerMXNValue);
    return await this.page.textContent(this.buyingPowerMXNValue);
  }

  async isCashMXNDisplayed() {
    return await this.page.isVisible(this.cashMXNField);
  }

  async getCashMXNValue() {
    await this.page.waitForSelector(this.cashMXNValue);
    return await this.page.textContent(this.cashMXNValue);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closePopupButton);
  }

  async clickOutsidePopup() {
    await this.page.click('body', { position: { x: 10, y: 10 } });
  }

  normalizeMonetaryValue(value) {
    if (!value) return null;
    return value.replace(/[$,\s]/g, '').trim();
  }
}

class AdvisorModulePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ADVISOR_MODULE_URL || 'https://advisor-module.example.com';
    
    this.searchContractInput = '[data-testid="advisor-search-input"]';
    this.searchContractButton = '[data-testid="advisor-search-button"]';
    this.contractListItem = '[data-testid="advisor-contract-item"]';
    this.currentCashField = '[data-testid="currentcash-field"]';
    this.currentCashValue = '[data-testid="currentcash-value"]';
    this.loginUsernameInput = '[data-testid="advisor-login-username"]';
    this.loginPasswordInput = '[data-testid="advisor-login-password"]';
    this.loginSubmitButton = '[data-testid="advisor-login-submit"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.loginUsernameInput, username);
    await this.page.fill(this.loginPasswordInput, password);
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchContract(contractId) {
    await this.page.fill(this.searchContractInput, contractId);
    await this.page.click(this.searchContractButton);
    await this.page.waitForSelector(this.contractListItem);
  }

  async selectContract(contractId) {
    const contractSelector = `[data-testid="advisor-contract-item"][data-contract-id="${contractId}"]`;
    await this.page.click(contractSelector);
    await this.page.waitForSelector(this.currentCashField);
  }

  async isCurrentCashDisplayed() {
    return await this.page.isVisible(this.currentCashField);
  }

  async getCurrentCashValue() {
    await this.page.waitForSelector(this.currentCashValue);
    return await this.page.textContent(this.currentCashValue);
  }
}

module.exports = { ActicenterPage, AdvisorModulePage };