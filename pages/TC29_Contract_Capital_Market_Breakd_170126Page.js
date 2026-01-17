class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Contract search locators
    this.contractSearchIcon = '[data-testid="contract-search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Contract value component locators
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Breakdown items locators
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.capitalMarketSection = '[data-testid="breakdown-item-mercado-capitales"]';
    this.capitalMarketLabel = '[data-testid="breakdown-item-mercado-capitales"] [data-testid="item-label"]';
    this.capitalMarketValue = '[data-testid="breakdown-item-mercado-capitales"] [data-testid="item-value"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpassword';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectContractWithCapitalMarketInvestments() {
    await this.page.click(this.contractSearchIcon);
    await this.page.waitForSelector(this.contractSearchInput);
    await this.page.fill(this.contractSearchInput, process.env.TEST_CONTRACT_ID || 'CONTRACT_CAPITAL_MARKET');
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickTotalContractValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isCapitalMarketSectionVisible() {
    await this.page.waitForSelector(this.capitalMarketSection, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.capitalMarketSection);
  }

  async getCapitalMarketAccumulatedValue() {
    await this.page.waitForSelector(this.capitalMarketValue, { state: 'visible' });
    const valueText = await this.page.textContent(this.capitalMarketValue);
    return valueText ? valueText.trim() : null;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = ContractBreakdownPage;