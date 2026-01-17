class ContractCompositionPage {
  constructor(page) {
    this.page = page;
    
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-btn"]';
    this.mainScreen = '[data-testid="main-dashboard"]';
    
    this.contractSearchButton = '[data-testid="contract-search-btn"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.personaMoralContractOption = '[data-testid="contract-option-persona-moral"]';
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.reviewDate = '[data-testid="review-date"]';
    
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    
    this.sections = {
      cashMXN: '[data-testid="section-cash-mxn"]',
      cashUSD: '[data-testid="section-cash-usd"]',
      pendingSettlements: '[data-testid="section-pending-settlements"]',
      debtFunds: '[data-testid="section-debt-funds"]',
      hedgeFunds: '[data-testid="section-hedge-funds"]',
      equityFunds: '[data-testid="section-equity-funds"]',
      cashInTransit: '[data-testid="section-cash-in-transit"]',
      certificates: '[data-testid="section-certificates"]',
      moneyMarket: '[data-testid="section-money-market"]',
      capitalMarket: '[data-testid="section-capital-market"]'
    };
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithBancaPrivadaCredentials() {
    const username = process.env.BANCA_PRIVADA_USERNAME || 'test_banca_privada';
    const password = process.env.BANCA_PRIVADA_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenDisplayed() {
    return await this.page.isVisible(this.mainScreen);
  }

  async openContractSearch() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractSearchInput);
  }

  async selectPersonaMoralContract() {
    await this.page.click(this.personaMoralContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
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
    await this.page.waitForSelector(this.breakdownPopup);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isSectionVisible(sectionKey) {
    const selector = this.sections[sectionKey];
    if (!selector) {
      throw new Error(`Unknown section: ${sectionKey}`);
    }
    return await this.page.isVisible(selector);
  }

  async closeBreakdownPopup() {
    await this.page.click('body', { position: { x: 0, y: 0 } });
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractCompositionPage;