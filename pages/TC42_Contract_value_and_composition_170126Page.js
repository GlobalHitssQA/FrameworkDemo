class ContractCompositionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.profileSelector = '[data-testid="profile-selector"]';
    this.patrimonialBankingOption = '[data-testid="profile-patrimonial-banking"]';
    
    // Main screen locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    
    // Contract selection locators
    this.contractList = '[data-testid="contract-list"]';
    this.corporatePersonContractItem = '[data-testid="contract-item-corporate-person"]';
    this.contractTypeFilter = '[data-testid="contract-type-filter"]';
    this.corporatePersonFilterOption = '[data-testid="filter-persona-moral"]';
    
    // Contract value component locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.reviewDate = '[data-testid="review-date"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Cash sections locators
    this.mxnCashSection = '[data-testid="cash-mxn-section"]';
    this.mxnCashValue = '[data-testid="cash-mxn-value"]';
    this.usdCashSection = '[data-testid="cash-usd-section"]';
    this.usdCashValue = '[data-testid="cash-usd-value"]';
    
    // Investment breakdown locators
    this.purchasingPowerMxn = '[data-testid="purchasing-power-mxn"]';
    this.debtFundsSection = '[data-testid="debt-funds-section"]';
    this.hedgeFundsSection = '[data-testid="hedge-funds-section"]';
    this.equityFundsSection = '[data-testid="equity-funds-section"]';
    this.moneyMarketSection = '[data-testid="money-market-section"]';
    this.capitalMarketSection = '[data-testid="capital-market-section"]';
    this.pendingSettlementSection = '[data-testid="pending-settlement-section"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithPatrimonialBankingProfile() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
    
    await this.page.click(this.profileSelector);
    await this.page.click(this.patrimonialBankingOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenDisplayed() {
    return await this.page.isVisible(this.mainScreen);
  }

  async selectCorporatePersonContract() {
    await this.page.click(this.contractTypeFilter);
    await this.page.click(this.corporatePersonFilterOption);
    await this.page.waitForLoadState('networkidle');
    await this.page.click(this.corporatePersonContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async getTotalContractValue() {
    return await this.page.textContent(this.totalContractValue);
  }

  async getReviewDate() {
    return await this.page.textContent(this.reviewDate);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isMxnCashSectionVisible() {
    return await this.page.isVisible(this.mxnCashSection);
  }

  async getMxnCashValue() {
    return await this.page.textContent(this.mxnCashValue);
  }

  async hasMexdolarAccount() {
    return await this.page.isVisible(this.usdCashSection);
  }

  async isUsdCashSectionVisible() {
    return await this.page.isVisible(this.usdCashSection);
  }

  async getUsdCashValue() {
    if (await this.isUsdCashSectionVisible()) {
      return await this.page.textContent(this.usdCashValue);
    }
    return null;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async clickOutsideComponent() {
    await this.page.click(this.mainScreen, { position: { x: 10, y: 10 } });
  }
}

module.exports = ContractCompositionPage;