class ContractCompositionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.corporatePersonFilter = '[data-testid="filter-persona-moral"]';
    this.brokerageHouseFilter = '[data-testid="filter-casa-bolsa"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.compositionPopup = '[data-testid="composition-breakdown-popup"]';
    this.purchasingPowerMXN = '[data-testid="item-poder-compra-mxn"]';
    this.purchasingPowerMXNAmount = '[data-testid="amount-poder-compra-mxn"]';
    this.cashUSD = '[data-testid="item-efectivo-usd"]';
    this.cashUSDAmount = '[data-testid="amount-efectivo-usd"]';
    this.breakdownItems = {
      pendingSettlement: '[data-testid="item-pendientes-liquidar"]',
      debtFunds: '[data-testid="item-fondos-deuda"]',
      coverageFunds: '[data-testid="item-fondos-cobertura"]',
      variableIncomeFunds: '[data-testid="item-fondos-renta-variable"]',
      cedesAndPromissoryNotes: '[data-testid="item-cedes-pagares"]',
      moneyMarket: '[data-testid="item-mercado-dinero"]',
      capitalMarket: '[data-testid="item-mercado-capitales"]'
    };
    this.breakdownAmounts = '[data-testid^="amount-"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectCorporatePersonContract() {
    await this.page.click(this.corporatePersonFilter);
    await this.page.waitForLoadState('networkidle');
  }

  async selectBrokerageHouseContract() {
    await this.page.click(this.brokerageHouseFilter);
    await this.page.waitForLoadState('networkidle');
    await this.page.click(`${this.contractListItem}:first-child`);
  }

  async waitForContractToLoad() {
    await this.page.waitForSelector(this.totalContractValue, { state: 'visible', timeout: 10000 });
  }

  async isTotalContractValueVisible() {
    return await this.page.isVisible(this.totalContractValue);
  }

  async clickTotalContractValue() {
    await this.page.click(this.totalContractValue);
    await this.page.waitForSelector(this.compositionPopup, { state: 'visible' });
  }

  async isCompositionPopupVisible() {
    return await this.page.isVisible(this.compositionPopup);
  }

  async isPurchasingPowerMXNVisible() {
    return await this.page.isVisible(this.purchasingPowerMXN);
  }

  async getPurchasingPowerMXNAmount() {
    return await this.page.textContent(this.purchasingPowerMXNAmount);
  }

  async isCashUSDVisible() {
    return await this.page.isVisible(this.cashUSD);
  }

  async getCashUSDAmount() {
    return await this.page.textContent(this.cashUSDAmount);
  }

  async isBreakdownItemVisible(itemKey) {
    const selector = this.breakdownItems[itemKey];
    if (!selector) {
      throw new Error(`Unknown breakdown item: ${itemKey}`);
    }
    return await this.page.isVisible(selector);
  }

  async getAllBreakdownAmounts() {
    const elements = await this.page.locator(this.breakdownAmounts).all();
    const amounts = [];
    for (const element of elements) {
      const text = await element.textContent();
      amounts.push(text.trim());
    }
    return amounts;
  }

  async isPopupVerticallyAligned() {
    const contractValueBox = await this.page.locator(this.totalContractValue).boundingBox();
    const popupBox = await this.page.locator(this.compositionPopup).boundingBox();
    if (!contractValueBox || !popupBox) {
      return false;
    }
    const contractValueCenterX = contractValueBox.x + (contractValueBox.width / 2);
    const popupCenterX = popupBox.x + (popupBox.width / 2);
    const tolerance = 50;
    return Math.abs(contractValueCenterX - popupCenterX) <= tolerance;
  }
}

module.exports = ContractCompositionPage;