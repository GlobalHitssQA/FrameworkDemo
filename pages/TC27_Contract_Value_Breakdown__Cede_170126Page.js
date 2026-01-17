class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Contract search locators
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchLupaButton = '[data-testid="search-lupa-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Contract value component locators
    this.contractValueComponent = '[data-testid="contract-total-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Breakdown items locators
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.cedesAndPagaresSection = '[data-testid="breakdown-item-cedes-pagares"]';
    this.cedesAndPagaresLabel = '[data-testid="breakdown-item-cedes-pagares"] [data-testid="item-label"]';
    this.cedesAndPagaresValue = '[data-testid="breakdown-item-cedes-pagares"] [data-testid="item-monetary-value"]';
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

  async selectContractWithCedesAndPagares() {
    const contractId = process.env.CONTRACT_WITH_CEDES_PAGARES || 'CONTRACT001';
    
    await this.page.fill(this.contractSearchInput, contractId);
    await this.page.click(this.searchLupaButton);
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { timeout: 10000 });
    return await this.page.isVisible(this.contractValueComponent);
  }

  async clickContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent);
    await this.page.click(this.contractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isCedesAndPagaresSectionVisible() {
    await this.page.waitForSelector(this.breakdownList);
    return await this.page.isVisible(this.cedesAndPagaresSection);
  }

  async getCedesAndPagaresMonetaryValue() {
    await this.page.waitForSelector(this.cedesAndPagaresValue);
    return await this.page.textContent(this.cedesAndPagaresValue);
  }

  async isValidMonetaryFormat(value) {
    if (!value || value.trim() === '') {
      return false;
    }
    const monetaryPattern = /^\$?[\d,]+(\.\d{2})?\s*(MXN|USD)?$/;
    return monetaryPattern.test(value.trim());
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;