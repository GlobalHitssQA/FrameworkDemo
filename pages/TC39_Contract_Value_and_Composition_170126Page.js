class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainScreen = '[data-testid="main-screen"]';
    
    // Contract search locators
    this.searchIcon = '[data-testid="search-client-contract"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.individualPersonContractOption = '[data-testid="contract-option-individual"]';
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
    
    // Contract value component locators
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.popupOverlay = '[data-testid="popup-overlay"]';
    
    // Breakdown items locators
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    
    // Monetary value locators
    this.monetaryValues = '[data-testid="monetary-value"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithPatrimonialBankingProfile() {
    const username = process.env.PATRIMONIAL_USER || 'test_patrimonial_user';
    const password = process.env.PATRIMONIAL_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.mainScreen);
  }

  async selectIndividualPersonContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
    await this.page.fill(this.contractSearchInput, 'Persona Fisica');
    await this.page.click(this.individualPersonContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractInfoLoaded() {
    await this.page.waitForSelector(this.contractInfoContainer, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractInfoContainer);
  }

  async isTotalContractValueComponentVisible() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async areApplicableItemsDisplayed() {
    const items = [
      this.purchasingPowerMXN,
      this.cashMXN,
      this.cashUSD,
      this.debtFunds,
      this.hedgeFunds,
      this.equityFunds,
      this.moneyMarket,
      this.capitalMarket,
      this.pendingSettlement
    ];
    
    for (const item of items) {
      const isVisible = await this.page.isVisible(item);
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async areMonetaryValuesFormattedCorrectly() {
    const values = await this.page.locator(this.monetaryValues).all();
    const currencyRegex = /^\$[\d,]+(\.\d{2})?$/;
    
    for (const value of values) {
      const text = await value.textContent();
      const trimmedText = text.trim();
      
      if (!currencyRegex.test(trimmedText)) {
        return false;
      }
      
      const alignment = await value.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.textAlign;
      });
      
      if (alignment !== 'right') {
        return false;
      }
    }
    return true;
  }

  async clickOutsideBreakdownPopup() {
    await this.page.click(this.popupOverlay, { position: { x: 10, y: 10 } });
  }

  async isBreakdownPopupClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }
}

module.exports = ContractValuePage;