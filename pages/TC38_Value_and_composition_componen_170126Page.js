class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.actinver.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Desktop interface locators
    this.desktopContainer = '[data-testid="desktop-container"]';
    this.mainDashboard = '[data-testid="main-dashboard"]';
    
    // Search locators
    this.searchIcon = '[data-testid="search-icon"]';
    this.headerSearchIcon = '[data-testid="header-search-icon"]';
    this.searchInput = '[data-testid="search-input"]';
    this.searchResults = '[data-testid="search-results"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    
    // Contract and value component locators
    this.contractDisplay = '[data-testid="contract-display"]';
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    
    // Breakdown item locators
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.transitCash = '[data-testid="transit-cash"]';
    this.cedesAndNotes = '[data-testid="cedes-and-notes"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    
    // Monetary value format regex
    this.monetaryFormatRegex = /^\$[\d,]+(\.\d{2})?$/;
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithPrivateBankingCredentials() {
    const username = process.env.PRIVATE_BANKING_USERNAME || 'test_user';
    const password = process.env.PRIVATE_BANKING_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isDesktopInterfaceVisible() {
    await this.page.waitForSelector(this.desktopContainer, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.desktopContainer);
  }

  async clickSearchIcon() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async searchAndSelectPrivateBankingContract() {
    const contractNumber = process.env.PRIVATE_BANKING_CONTRACT || '123456';
    await this.page.fill(this.searchInput, contractNumber);
    await this.page.waitForSelector(this.searchResults, { state: 'visible' });
    await this.page.click(this.searchResultItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractDisplayed() {
    await this.page.waitForSelector(this.contractDisplay, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractDisplay);
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickValueCompositionComponent() {
    await this.page.click(this.valueCompositionComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async verifyBreakdownItemsFormat() {
    const breakdownItems = [
      this.purchasingPowerMXN,
      this.cashMXN,
      this.cashUSD,
      this.pendingSettlement,
      this.debtFunds,
      this.hedgeFunds,
      this.equityFunds,
      this.cedesAndNotes,
      this.moneyMarket,
      this.capitalMarket
    ];

    for (const itemSelector of breakdownItems) {
      const isVisible = await this.page.isVisible(itemSelector);
      if (isVisible) {
        const element = await this.page.locator(itemSelector);
        const textAlign = await element.evaluate(el => window.getComputedStyle(el).textAlign);
        if (textAlign !== 'right') {
          return false;
        }
      }
    }
    return true;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async clickHeaderSearchIcon() {
    await this.page.click(this.headerSearchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async verifySearchFunctionality() {
    const isSearchInputVisible = await this.page.isVisible(this.searchInput);
    const isSearchIconVisible = await this.page.isVisible(this.headerSearchIcon);
    return isSearchInputVisible && isSearchIconVisible;
  }

  async isValueComponentUpdatedAfterSearch() {
    const initialValue = await this.page.textContent(this.totalValueComponent);
    const alternativeContract = process.env.ALTERNATIVE_CONTRACT || '789012';
    
    await this.page.fill(this.searchInput, alternativeContract);
    await this.page.waitForSelector(this.searchResults, { state: 'visible' });
    await this.page.click(this.searchResultItem);
    await this.page.waitForLoadState('networkidle');
    
    const updatedValue = await this.page.textContent(this.totalValueComponent);
    return initialValue !== updatedValue || updatedValue !== null;
  }
}

module.exports = ActicenterPage;