class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.profileSelector = '[data-testid="profile-selector"]';
    this.privateBankingOption = '[data-testid="profile-option-private-banking"]';
    
    // Main screen locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.searchIcon = '[data-testid="search-icon"]';
    this.searchInput = '[data-testid="search-contract-input"]';
    
    // Contract locators
    this.casaDeBolsaContractItem = '[data-testid="contract-item-casa-bolsa"]';
    this.contractValueComponent = '[data-testid="contract-total-value-component"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-items-list"]';
    this.pendingSettlementsItem = '[data-testid="breakdown-item-pending-settlements"]';
    this.pendingSettlementsValue = '[data-testid="pending-settlements-monetary-value"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithPrivateBankingProfile() {
    await this.page.fill(this.usernameInput, process.env.ACTICENTER_USERNAME || 'test_user');
    await this.page.fill(this.passwordInput, process.env.ACTICENTER_PASSWORD || 'test_password');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
    
    if (await this.page.isVisible(this.profileSelector)) {
      await this.page.click(this.profileSelector);
      await this.page.click(this.privateBankingOption);
    }
  }

  async isMainScreenVisible() {
    return await this.page.isVisible(this.mainScreen);
  }

  async searchContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async selectCasaDeBolsaContract() {
    await this.page.fill(this.searchInput, 'Casa de Bolsa');
    await this.page.waitForSelector(this.casaDeBolsaContractItem, { state: 'visible' });
    await this.page.click(this.casaDeBolsaContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isPendingSettlementsItemVisible() {
    return await this.page.isVisible(this.pendingSettlementsItem);
  }

  async getPendingSettlementsMonetaryValue() {
    const valueElement = await this.page.locator(this.pendingSettlementsValue);
    return await valueElement.textContent();
  }

  async isValidMonetaryFormat(value) {
    if (!value) return false;
    const monetaryRegex = /^\$?[\d,]+(\.\d{2})?\s*(MXN|USD)?$/;
    return monetaryRegex.test(value.trim());
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractBreakdownPage;