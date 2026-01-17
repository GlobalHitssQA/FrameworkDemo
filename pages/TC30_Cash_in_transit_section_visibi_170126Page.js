class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Contract search and selection locators
    this.contractSearchIcon = '[data-testid="contract-search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.bankContractOption = '[data-testid="contract-type-bank"]';
    this.brokerageHouseContractOption = '[data-testid="contract-type-brokerage"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Total value component locators
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.totalValueAmount = '[data-testid="total-value-amount"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="value-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    
    // Cash in transit locators
    this.cashInTransitRow = '[data-testid="cash-in-transit-row"]';
    this.cashInTransitLabel = '[data-testid="cash-in-transit-label"]';
    this.cashInTransitValue = '[data-testid="cash-in-transit-value"]';
    
    // Other breakdown items locators
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.funds = '[data-testid="funds"]';
    this.cedesAndNotes = '[data-testid="cedes-and-notes"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpassword';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectBankContract() {
    await this.page.click(this.contractSearchIcon);
    await this.page.waitForSelector(this.bankContractOption);
    await this.page.click(this.bankContractOption);
    const contractItems = this.page.locator(this.contractListItem);
    await contractItems.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectBrokerageHouseContract() {
    await this.page.click(this.contractSearchIcon);
    await this.page.waitForSelector(this.brokerageHouseContractOption);
    await this.page.click(this.brokerageHouseContractOption);
    const contractItems = this.page.locator(this.contractListItem);
    await contractItems.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isCashInTransitVisible() {
    return await this.page.isVisible(this.cashInTransitRow);
  }

  async getCashInTransitValue() {
    if (await this.isCashInTransitVisible()) {
      return await this.page.textContent(this.cashInTransitValue);
    }
    return null;
  }

  async isValidMonetaryValue(value) {
    if (!value) return false;
    const monetaryPattern = /^\$?[\d,]+(\.\d{2})?\s*(MXN|USD)?$/;
    return monetaryPattern.test(value.trim());
  }

  async closeBreakdownPopup() {
    if (await this.isBreakdownPopupVisible()) {
      await this.page.click(this.breakdownCloseButton);
      await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
    }
  }

  async getBreakdownItems() {
    const items = await this.page.locator(`${this.breakdownList} > *`).all();
    const breakdownData = [];
    for (const item of items) {
      const label = await item.locator('[data-testid$="-label"]').textContent();
      const value = await item.locator('[data-testid$="-value"]').textContent();
      breakdownData.push({ label, value });
    }
    return breakdownData;
  }
}

module.exports = ContractValuePage;