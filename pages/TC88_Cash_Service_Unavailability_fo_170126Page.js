class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopupTrigger = '[data-testid="breakdown-popup-trigger"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.cashMXNSection = '[data-testid="cash-mxn-section"]';
    this.cashMXNErrorMessage = '[data-testid="cash-mxn-error-message"]';
    this.cashMXNErrorIndicator = '[data-testid="cash-mxn-error-indicator"]';
    this.fundsSection = '[data-testid="funds-section"]';
    this.pendingSettlementSection = '[data-testid="pending-settlement-section"]';
    this.bankContractSelector = '[data-testid="bank-contract-selector"]';
    this.bankContractOption = '[data-testid="bank-contract-option"]';
    this.searchInput = '[data-testid="client-contract-search"]';
    this.userAuthIndicator = '[data-testid="user-authenticated-indicator"]';
    this.moneyMarketSection = '[data-testid="money-market-section"]';
    this.capitalMarketSection = '[data-testid="capital-market-section"]';
    this.cashUSDSection = '[data-testid="cash-usd-section"]';
    this.purchasePowerMXN = '[data-testid="purchase-power-mxn"]';
  }

  async simulateCashServiceUnavailable() {
    await this.page.route('**/api/cash/bank-account/**', (route) => {
      route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Service Unavailable' })
      });
    });
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userAuthIndicator, { state: 'visible', timeout: 10000 });
  }

  async selectBankContract() {
    await this.page.click(this.bankContractSelector);
    await this.page.waitForSelector(this.bankContractOption, { state: 'visible' });
    await this.page.click(this.bankContractOption);
  }

  async waitForContractValueComponentLoad() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 15000 });
  }

  async isCashMXNErrorMessageVisible() {
    try {
      await this.page.waitForSelector(this.cashMXNErrorMessage, { state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async openBreakdownPopup() {
    await this.page.click(this.breakdownPopupTrigger);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async hasCashMXNErrorIndicator() {
    const errorIndicator = await this.page.locator(this.cashMXNErrorIndicator).isVisible();
    const sectionHasError = await this.page.locator(this.cashMXNSection).getAttribute('data-error');
    return errorIndicator || sectionHasError === 'true';
  }

  async areOtherBreakdownSectionsVisible() {
    const fundsVisible = await this.page.locator(this.fundsSection).isVisible();
    const pendingVisible = await this.page.locator(this.pendingSettlementSection).isVisible();
    return fundsVisible || pendingVisible;
  }

  async isFundsSectionVisible() {
    return await this.page.locator(this.fundsSection).isVisible();
  }

  async isPendingSettlementSectionVisible() {
    return await this.page.locator(this.pendingSettlementSection).isVisible();
  }

  async closeBreakdownPopup() {
    await this.page.click('body', { position: { x: 0, y: 0 } });
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = ContractValuePage;