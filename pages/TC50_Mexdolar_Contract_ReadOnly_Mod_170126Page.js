class MexdolarContractPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Search locators
    this.searchIcon = '[data-testid="search-icon"]';
    this.searchInput = '[data-testid="search-contract-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractResultItem = '[data-testid="contract-result-mexdolar-pm"]';
    
    // Value and composition component locators
    this.valueComponent = '[data-testid="contract-value-component"]';
    this.compositionComponent = '[data-testid="contract-composition-component"]';
    this.totalValuationButton = '[data-testid="total-valuation-button"]';
    this.breakdownPopup = '[data-testid="valuation-breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    
    // Cash USD locators
    this.cashUSDField = '[data-testid="cash-usd-field"]';
    this.cashUSDValue = '[data-testid="cash-usd-value"]';
    this.cashUSDLabel = '[data-testid="efectivo-usd-label"]';
    
    // Operation locators
    this.operationIcon = '[data-testid="operation-icon"]';
    this.buyButton = '[data-testid="buy-operation-button"]';
    this.sellButton = '[data-testid="sell-operation-button"]';
    this.operationComponent = '[data-testid="operation-component"]';
    
    // Read-only mode indicators
    this.readOnlyIndicator = '[data-testid="read-only-indicator"]';
    this.contractModeLabel = '[data-testid="contract-mode-label"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchContract(contractType) {
    await this.page.click(this.searchIcon);
    await this.page.fill(this.searchInput, contractType);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectMexdolarPMContract() {
    await this.page.click(this.contractResultItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isValueComponentVisible() {
    return await this.page.isVisible(this.valueComponent);
  }

  async isCompositionComponentVisible() {
    return await this.page.isVisible(this.compositionComponent);
  }

  async openTotalValuationBreakdown() {
    await this.page.click(this.totalValuationButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isCashUSDFieldVisible() {
    return await this.page.isVisible(this.cashUSDField);
  }

  async getCashUSDValue() {
    return await this.page.textContent(this.cashUSDValue);
  }

  async verifyCashUSDWithoutConversion(value) {
    const usdPattern = /^\$?[\d,]+\.?\d*\s*(USD)?$/;
    return usdPattern.test(value.trim());
  }

  async attemptToAccessOperationFunction() {
    const isOperationIconVisible = await this.page.isVisible(this.operationIcon);
    if (isOperationIconVisible) {
      await this.page.click(this.operationIcon);
    }
  }

  async isBuyOperationDisabled() {
    const buyButton = await this.page.$(this.buyButton);
    if (!buyButton) return true;
    const isDisabled = await buyButton.isDisabled();
    const isHidden = !(await buyButton.isVisible());
    return isDisabled || isHidden;
  }

  async isSellOperationDisabled() {
    const sellButton = await this.page.$(this.sellButton);
    if (!sellButton) return true;
    const isDisabled = await sellButton.isDisabled();
    const isHidden = !(await sellButton.isVisible());
    return isDisabled || isHidden;
  }

  async isContractInReadOnlyMode() {
    const readOnlyVisible = await this.page.isVisible(this.readOnlyIndicator);
    if (readOnlyVisible) return true;
    const modeLabel = await this.page.textContent(this.contractModeLabel).catch(() => '');
    return modeLabel.toLowerCase().includes('consulta') || modeLabel.toLowerCase().includes('read-only');
  }

  async verifyNoOperationOptionsEnabled() {
    const buyDisabled = await this.isBuyOperationDisabled();
    const sellDisabled = await this.isSellOperationDisabled();
    const operationComponentHidden = !(await this.page.isVisible(this.operationComponent));
    return buyDisabled && sellDisabled && operationComponentHidden;
  }

  async closeBreakdownPopup() {
    const isPopupVisible = await this.page.isVisible(this.breakdownPopup);
    if (isPopupVisible) {
      await this.page.click(this.closeBreakdownButton);
    }
  }
}

module.exports = MexdolarContractPage;