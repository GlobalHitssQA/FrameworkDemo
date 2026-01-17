class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Contract selection locators
    this.contractScreen = '[data-testid="contract-screen"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractOption = '[data-testid="contract-option"]';
    this.searchButton = '[data-testid="search-button"]';
    this.searchInput = '[data-testid="search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Contract Value and Composition locators
    this.contractValueComponent = '[data-testid="contract-value-composition"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    
    // Breakdown sections locators
    this.buyingPowerSection = '[data-testid="buying-power-section"]';
    this.buyingPowerMXN = '[data-testid="buying-power-mxn"]';
    this.cashSection = '[data-testid="cash-section"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.fundsSection = '[data-testid="funds-section"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarketSection = '[data-testid="money-market-section"]';
    this.capitalMarketSection = '[data-testid="capital-market-section"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    
    // State tracking
    this.currentContractId = null;
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

  async selectFirstAvailableContract() {
    await this.page.waitForSelector(this.contractSelector);
    await this.page.click(this.contractSelector);
    const firstContract = this.page.locator(this.contractOption).first();
    this.currentContractId = await firstContract.getAttribute('data-contract-id');
    await firstContract.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractScreenDisplayed() {
    return await this.page.isVisible(this.contractScreen);
  }

  async clickContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent);
    await this.page.click(this.contractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isBuyingPowerSectionVisible() {
    return await this.page.isVisible(this.buyingPowerSection);
  }

  async isCashSectionVisible() {
    return await this.page.isVisible(this.cashSection);
  }

  async isFundsSectionVisible() {
    return await this.page.isVisible(this.fundsSection);
  }

  async clickSearchFunction() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async selectDifferentContract() {
    const contractItems = this.page.locator(this.contractListItem);
    const count = await contractItems.count();
    for (let i = 0; i < count; i++) {
      const item = contractItems.nth(i);
      const contractId = await item.getAttribute('data-contract-id');
      if (contractId !== this.currentContractId) {
        await item.click();
        this.currentContractId = contractId;
        break;
      }
    }
    await this.page.waitForLoadState('networkidle');
  }

  async isBreakdownPopupClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }

  async isNewContractDataDisplayed() {
    await this.page.waitForSelector(this.contractTotalValue);
    const valueText = await this.page.textContent(this.contractTotalValue);
    return valueText !== null && valueText.length > 0;
  }

  async isBreakdownPopupHidden() {
    return !(await this.page.isVisible(this.breakdownPopup));
  }

  async getContractTotalValue() {
    return await this.page.textContent(this.contractTotalValue);
  }

  async getBuyingPowerValue() {
    return await this.page.textContent(this.buyingPowerMXN);
  }

  async getCashMXNValue() {
    return await this.page.textContent(this.cashMXN);
  }

  async getCashUSDValue() {
    return await this.page.textContent(this.cashUSD);
  }
}

module.exports = ActicenterPage;