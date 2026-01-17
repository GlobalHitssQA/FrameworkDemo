class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Authentication
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Locators - Contract Selection
    this.contractSearchIcon = '[data-testid="contract-search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.activeContractSelector = '[data-testid="active-contract"]';
    
    // Locators - Total Value Component
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.totalValueAmount = '[data-testid="total-value-amount"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.popupCloseButton = '[data-testid="popup-close-button"]';
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpass';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.click(this.contractSearchIcon);
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForContractValueComponentVisible() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
  }

  async waitForBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async getBreakdownValues() {
    const values = {
      totalValue: await this.page.textContent(this.totalValueAmount),
      purchasingPowerMXN: await this.page.textContent(this.purchasingPowerMXN),
      cashMXN: await this.page.textContent(this.cashMXN),
      cashUSD: await this.page.textContent(this.cashUSD),
      debtFunds: await this.page.textContent(this.debtFunds),
      hedgeFunds: await this.page.textContent(this.hedgeFunds),
      equityFunds: await this.page.textContent(this.equityFunds),
      moneyMarket: await this.page.textContent(this.moneyMarket),
      capitalMarket: await this.page.textContent(this.capitalMarket),
      pendingSettlement: await this.page.textContent(this.pendingSettlement)
    };
    return values;
  }

  async refreshPage() {
    await this.page.reload({ waitUntil: 'networkidle' });
  }

  async hasContractDataLoaded() {
    const totalValue = await this.page.textContent(this.totalValueAmount);
    return totalValue !== null && totalValue.trim() !== '';
  }

  async validateBreakdownValuesLoaded(values) {
    return Object.values(values).every(value => value !== null && value !== undefined);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.popupCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;