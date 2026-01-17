class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://ota-acticenter.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.logoutButton = '[data-testid="logout-button"]';
    
    // Profile indicator locators
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    this.profileTypeLabel = '[data-testid="profile-type-label"]';
    
    // Contract search and selection locators
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    
    // Value and composition component locators
    this.totalValueComponent = '[data-testid="total-contract-value-component"]';
    this.compositionBreakdownButton = '[data-testid="composition-breakdown-button"]';
    this.compositionPopup = '[data-testid="composition-breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    
    // Profile-specific content locators
    this.patrimonialBankingSection = '[data-testid="patrimonial-banking-section"]';
    this.privateBankingSection = '[data-testid="private-banking-section"]';
    this.wealthManagementSection = '[data-testid="wealth-management-section"]';
    
    // Value breakdown items
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.fundsSection = '[data-testid="funds-section"]';
    this.cedesAndNotes = '[data-testid="cedes-and-notes"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    
    // Profile credentials mapping
    this.profileCredentials = {
      patrimonial: { username: 'user_patrimonial', password: 'test_password' },
      private: { username: 'user_private', password: 'test_password' },
      wealthManagement: { username: 'user_wealth', password: 'test_password' }
    };
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateWithProfile(profileType) {
    const credentials = this.profileCredentials[profileType];
    await this.page.fill(this.usernameInput, credentials.username);
    await this.page.fill(this.passwordInput, credentials.password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible' });
    const isVisible = await this.page.isVisible(this.userProfileIndicator);
    return isVisible;
  }

  async logout() {
    const logoutVisible = await this.page.isVisible(this.logoutButton);
    if (logoutVisible) {
      await this.page.click(this.logoutButton);
      await this.page.waitForLoadState('networkidle');
    }
  }

  async selectContract() {
    await this.page.waitForSelector(this.contractSelector, { state: 'visible' });
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async viewValueAndCompositionComponent() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
    await this.page.click(this.compositionBreakdownButton);
    await this.page.waitForSelector(this.compositionPopup, { state: 'visible' });
  }

  async verifyProfileRestrictions(profileType) {
    let sectionSelector;
    
    switch (profileType) {
      case 'patrimonial':
        sectionSelector = this.patrimonialBankingSection;
        break;
      case 'private':
        sectionSelector = this.privateBankingSection;
        break;
      case 'wealthManagement':
        sectionSelector = this.wealthManagementSection;
        break;
      default:
        throw new Error(`Unknown profile type: ${profileType}`);
    }
    
    const isSectionVisible = await this.page.isVisible(sectionSelector);
    const isComponentVisible = await this.page.isVisible(this.totalValueComponent);
    const profileLabel = await this.page.textContent(this.profileTypeLabel);
    
    const expectedProfiles = {
      patrimonial: 'Banca Patrimonial',
      private: 'Banca Privada',
      wealthManagement: 'Wealth Management'
    };
    
    const profileMatchesExpected = profileLabel.includes(expectedProfiles[profileType]);
    
    return isSectionVisible && isComponentVisible && profileMatchesExpected;
  }

  async closeCompositionPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.compositionPopup, { state: 'hidden' });
  }

  async getContractTotalValue() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
    return await this.page.textContent(this.totalValueComponent);
  }

  async getBreakdownValues() {
    const values = {};
    values.purchasingPowerMXN = await this.page.textContent(this.purchasingPowerMXN);
    values.cashMXN = await this.page.textContent(this.cashMXN);
    values.cashUSD = await this.page.textContent(this.cashUSD);
    values.pendingSettlement = await this.page.textContent(this.pendingSettlement);
    values.funds = await this.page.textContent(this.fundsSection);
    values.cedesAndNotes = await this.page.textContent(this.cedesAndNotes);
    values.moneyMarket = await this.page.textContent(this.moneyMarket);
    values.capitalMarket = await this.page.textContent(this.capitalMarket);
    return values;
  }
}

module.exports = ContractValuePage;