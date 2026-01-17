class ActicenterWealthPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.desktopInterface = '[data-testid="desktop-interface"]';
    
    // Contract and operation module locators
    this.operationModule = '[data-testid="operation-module"]';
    this.wealthManagementContractList = '[data-testid="wealth-contract-list"]';
    this.contractItem = '[data-testid="contract-item"]';
    
    // Value and composition component locators
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    
    // Breakdown items locators
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.buyingPowerMXN = '[data-testid="buying-power-mxn"]';
    this.cashMXNBank = '[data-testid="cash-mxn-bank"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.cashInTransit = '[data-testid="cash-in-transit"]';
    this.cdsPromissoryNotes = '[data-testid="cds-promissory-notes"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    
    // Monetary value locators
    this.monetaryValue = '[data-testid="monetary-value"]';
    this.breakdownValue = '.breakdown-value';
    
    // Search locators
    this.searchMagnifyingGlass = '[data-testid="search-magnifying-glass"]';
    this.clientSearchScreen = '[data-testid="client-search-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsWealthManagementUser() {
    const username = process.env.WEALTH_MANAGEMENT_USER || 'wealth_user';
    const password = process.env.WEALTH_MANAGEMENT_PASSWORD || 'wealth_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isDesktopInterfaceDisplayed() {
    await this.page.waitForSelector(this.desktopInterface, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.desktopInterface);
  }

  async selectWealthManagementContract() {
    await this.page.waitForSelector(this.operationModule, { state: 'visible' });
    await this.page.click(this.operationModule);
    await this.page.waitForSelector(this.wealthManagementContractList, { state: 'visible' });
    const firstContract = this.page.locator(this.contractItem).first();
    await firstContract.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickValueCompositionComponent() {
    await this.page.waitForSelector(this.valueCompositionComponent, { state: 'visible' });
    await this.page.click(this.valueCompositionComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async areAllBreakdownItemsVisible() {
    const items = [
      this.buyingPowerMXN,
      this.cashMXNBank,
      this.pendingSettlement,
      this.debtFunds,
      this.hedgeFunds,
      this.equityFunds,
      this.cdsPromissoryNotes,
      this.moneyMarket,
      this.capitalMarket
    ];

    for (const item of items) {
      const isVisible = await this.page.isVisible(item);
      if (!isVisible) {
        return false;
      }
    }
    
    return true;
  }

  async validateMonetaryFormat() {
    const monetaryValues = await this.page.locator(this.breakdownValue).all();
    const monetaryRegex = /^\$[\d,]+\.\d{2}$/;
    
    for (const valueElement of monetaryValues) {
      const text = await valueElement.textContent();
      const cleanText = text.trim();
      if (!monetaryRegex.test(cleanText)) {
        return false;
      }
    }
    
    return true;
  }

  async areValuesRightAligned() {
    const monetaryValues = await this.page.locator(this.breakdownValue).all();
    
    for (const valueElement of monetaryValues) {
      const textAlign = await valueElement.evaluate(el => {
        return window.getComputedStyle(el).textAlign;
      });
      if (textAlign !== 'right') {
        return false;
      }
    }
    
    return true;
  }

  async validateZeroValuesFormat() {
    const monetaryValues = await this.page.locator(this.breakdownValue).all();
    const zeroValueRegex = /^\$0\.00$/;
    
    for (const valueElement of monetaryValues) {
      const text = await valueElement.textContent();
      const cleanText = text.trim();
      if (cleanText === '$0.00' && !zeroValueRegex.test(cleanText)) {
        return false;
      }
    }
    
    return true;
  }

  async clickSearchMagnifyingGlass() {
    await this.page.waitForSelector(this.searchMagnifyingGlass, { state: 'visible' });
    await this.page.click(this.searchMagnifyingGlass);
  }

  async isClientSearchScreenVisible() {
    await this.page.waitForSelector(this.clientSearchScreen, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.clientSearchScreen);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ActicenterWealthPage;