class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    
    // Contract search locators
    this.searchIcon = '[data-testid="search-contract-icon"]';
    this.searchInput = '[data-testid="search-contract-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.individualPersonContract = '[data-testid="contract-individual-person"]';
    
    // Contract value component locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.reviewDate = '[data-testid="review-date"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    
    // Investment breakdown locators
    this.buyingPowerMXN = '[data-testid="buying-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithWealthManagementCredentials() {
    const username = process.env.WM_USERNAME || 'wm_test_user';
    const password = process.env.WM_PASSWORD || 'wm_test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenDisplayed() {
    return await this.page.isVisible(this.mainScreen);
  }

  async selectIndividualPersonContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput);
    await this.page.fill(this.searchInput, 'Persona Fisica WM');
    await this.page.waitForSelector(this.individualPersonContract);
    await this.page.click(this.individualPersonContract);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { timeout: 10000 });
    return await this.page.isVisible(this.contractValueComponent);
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.totalContractValue);
    return await this.page.textContent(this.totalContractValue);
  }

  async getReviewDate() {
    await this.page.waitForSelector(this.reviewDate);
    return await this.page.textContent(this.reviewDate);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getBreakdownItemsCount() {
    const items = await this.page.$$(this.breakdownItem);
    return items.length;
  }

  async areMonetaryValuesRightAligned() {
    const valueElements = await this.page.$$(this.breakdownItemValue);
    
    for (const element of valueElements) {
      const textAlign = await element.evaluate(el => {
        return window.getComputedStyle(el).textAlign;
      });
      
      if (textAlign !== 'right' && textAlign !== 'end') {
        return false;
      }
    }
    
    return valueElements.length > 0;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.mainScreen);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;