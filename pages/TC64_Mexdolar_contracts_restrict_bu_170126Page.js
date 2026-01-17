class ActicenterContractPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    
    // Main screen locators
    this.mainScreenContainer = '[data-testid="acticenter-main-screen"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.searchInput = '[data-testid="search-input"]';
    this.searchIcon = '[data-testid="search-icon-lupa"]';
    
    // Contract locators
    this.contractResultsList = '[data-testid="contract-results-list"]';
    this.firstContractResult = '[data-testid="contract-result-item"]:first-child';
    this.contractReadOnlyIndicator = '[data-testid="contract-readonly-indicator"]';
    this.contractTypeLabel = '[data-testid="contract-type-label"]';
    
    // Operations locators
    this.operationsIcon = '[data-testid="operations-icon"]';
    this.operationsIconDisabled = '[data-testid="operations-icon"][aria-disabled="true"]';
    this.buySellModuleButton = '[data-testid="buy-sell-module-button"]';
    this.buySellModuleContainer = '[data-testid="buy-sell-module-container"]';
    
    // Contract values locators
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    this.contractBreakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.fundsList = '[data-testid="funds-list"]';
    this.pendingSettlements = '[data-testid="pending-settlements"]';
    
    // Operation options locators
    this.operationOptionsContainer = '[data-testid="operation-options-container"]';
    this.buyButton = '[data-testid="buy-operation-button"]';
    this.sellButton = '[data-testid="sell-operation-button"]';
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

  async isMainScreenDisplayed() {
    return await this.page.isVisible(this.mainScreenContainer);
  }

  async openContractSearch() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.searchInput);
  }

  async searchMexdolarPersonaMoralContract() {
    await this.page.fill(this.searchInput, 'Mexdolar Persona Moral');
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.contractResultsList);
  }

  async selectFirstContractResult() {
    await this.page.click(this.firstContractResult);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractInReadOnlyMode() {
    const readOnlyIndicator = await this.page.isVisible(this.contractReadOnlyIndicator);
    const contractType = await this.page.textContent(this.contractTypeLabel);
    return readOnlyIndicator || contractType.includes('Solo consulta');
  }

  async isOperationsIconDisabled() {
    const isDisabledByAttribute = await this.page.isVisible(this.operationsIconDisabled);
    if (isDisabledByAttribute) return true;
    
    const operationsIcon = await this.page.locator(this.operationsIcon);
    const isDisabled = await operationsIcon.getAttribute('disabled');
    const ariaDisabled = await operationsIcon.getAttribute('aria-disabled');
    const hasDisabledClass = await operationsIcon.evaluate(el => el.classList.contains('disabled'));
    
    return isDisabled !== null || ariaDisabled === 'true' || hasDisabledClass;
  }

  async canAccessBuySellModule() {
    const buySellButton = await this.page.locator(this.buySellModuleButton);
    const isButtonVisible = await buySellButton.isVisible().catch(() => false);
    
    if (!isButtonVisible) return false;
    
    const isDisabled = await buySellButton.isDisabled().catch(() => true);
    if (isDisabled) return false;
    
    await buySellButton.click({ timeout: 2000 }).catch(() => {});
    const moduleOpened = await this.page.isVisible(this.buySellModuleContainer);
    
    return moduleOpened;
  }

  async areContractValuesVisible() {
    const totalValueVisible = await this.page.isVisible(this.contractTotalValue);
    const purchasingPowerVisible = await this.page.isVisible(this.purchasingPowerMXN);
    const cashVisible = await this.page.isVisible(this.cashMXN) || await this.page.isVisible(this.cashUSD);
    
    return totalValueVisible || purchasingPowerVisible || cashVisible;
  }

  async areOperationOptionsVisible() {
    const operationContainerVisible = await this.page.isVisible(this.operationOptionsContainer);
    const buyButtonVisible = await this.page.isVisible(this.buyButton);
    const sellButtonVisible = await this.page.isVisible(this.sellButton);
    
    if (!operationContainerVisible && !buyButtonVisible && !sellButtonVisible) {
      return false;
    }
    
    if (buyButtonVisible) {
      const buyButton = await this.page.locator(this.buyButton);
      const isBuyEnabled = !(await buyButton.isDisabled().catch(() => true));
      if (isBuyEnabled) return true;
    }
    
    if (sellButtonVisible) {
      const sellButton = await this.page.locator(this.sellButton);
      const isSellEnabled = !(await sellButton.isDisabled().catch(() => true));
      if (isSellEnabled) return true;
    }
    
    return false;
  }
}

module.exports = ActicenterContractPage;