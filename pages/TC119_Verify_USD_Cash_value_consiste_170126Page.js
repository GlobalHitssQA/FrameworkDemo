class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.searchIcon = '[data-testid="search-icon-lupa"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.contractResultItem = '[data-testid="contract-result-item"]';
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.contractBreakdownTrigger = '[data-testid="contract-breakdown-trigger"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.usdCashItem = '[data-testid="efectivo-usd-item"]';
    this.usdCashValue = '[data-testid="efectivo-usd-value"]';
    this.dashboardContainer = '[data-testid="dashboard-container"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async waitForDashboard() {
    await this.page.waitForSelector(this.dashboardContainer, { state: 'visible' });
  }

  async clickSearchIcon() {
    await this.page.click(this.searchIcon);
  }

  async searchContract(contractId) {
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
    await this.page.fill(this.searchInput, contractId);
    await this.page.press(this.searchInput, 'Enter');
  }

  async selectContractFromResults(contractId) {
    const contractSelector = `${this.contractResultItem}[data-contract-id="${contractId}"]`;
    await this.page.waitForSelector(contractSelector, { state: 'visible' });
    await this.page.click(contractSelector);
  }

  async isValueCompositionComponentVisible() {
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async expandContractBreakdown() {
    await this.page.click(this.contractBreakdownTrigger);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isUsdCashItemVisible() {
    return await this.page.isVisible(this.usdCashItem);
  }

  async getUsdCashValue() {
    const valueText = await this.page.textContent(this.usdCashValue);
    return this.parseMonetaryValue(valueText);
  }

  parseMonetaryValue(text) {
    if (!text) return null;
    const cleanedValue = text.replace(/[^0-9.-]/g, '');
    return parseFloat(cleanedValue);
  }
}

class AssetPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ASSET_URL || 'https://asset.example.com';
    
    this.searchInput = '[data-testid="asset-contract-search"]';
    this.contractListItem = '[data-testid="asset-contract-item"]';
    this.usdCashDisplay = '[data-testid="asset-usd-cash-display"]';
    this.usdCashValueElement = '[data-testid="asset-usd-cash-value"]';
    this.pageLoadIndicator = '[data-testid="asset-dashboard-ready"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async waitForPageLoad() {
    await this.page.waitForSelector(this.pageLoadIndicator, { state: 'visible' });
  }

  async searchContract(contractId) {
    await this.page.fill(this.searchInput, contractId);
    await this.page.press(this.searchInput, 'Enter');
  }

  async selectContract(contractId) {
    const contractSelector = `${this.contractListItem}[data-contract-id="${contractId}"]`;
    await this.page.waitForSelector(contractSelector, { state: 'visible' });
    await this.page.click(contractSelector);
  }

  async isUsdCashValueVisible() {
    return await this.page.isVisible(this.usdCashDisplay);
  }

  async getUsdCashValue() {
    const valueText = await this.page.textContent(this.usdCashValueElement);
    return this.parseMonetaryValue(valueText);
  }

  parseMonetaryValue(text) {
    if (!text) return null;
    const cleanedValue = text.replace(/[^0-9.-]/g, '');
    return parseFloat(cleanedValue);
  }
}

module.exports = { ActicenterPage, AssetPage };