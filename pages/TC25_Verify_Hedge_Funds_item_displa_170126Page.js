class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    // Contract search locators
    this.contractSearchIcon = page.locator('[data-testid="contract-search-icon"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.contractListItem = page.locator('[data-testid="contract-list-item"]');
    
    // Total contract value component
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value-component"]');
    
    // Breakdown popup locators
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.breakdownList = page.locator('[data-testid="breakdown-list"]');
    this.closeBreakdownButton = page.locator('[data-testid="close-breakdown-button"]');
    
    // Hedge Funds specific locators
    this.hedgeFundsItem = page.locator('[data-testid="breakdown-item-hedge-funds"]');
    this.hedgeFundsLabel = page.locator('[data-testid="breakdown-item-hedge-funds"] [data-testid="item-label"]');
    this.hedgeFundsAccumulatedValue = page.locator('[data-testid="breakdown-item-hedge-funds"] [data-testid="item-accumulated-value"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async authenticate() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectContractWithHedgeFunds() {
    await this.contractSearchIcon.click();
    const contractId = process.env.TEST_CONTRACT_HEDGE_FUNDS || 'CONTRACT_HEDGE_FUNDS_001';
    await this.contractSearchInput.fill(contractId);
    await this.contractSearchInput.press('Enter');
    await this.contractListItem.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickTotalContractValueComponent() {
    await this.totalContractValueComponent.waitFor({ state: 'visible' });
    await this.totalContractValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
    return await this.breakdownPopup.isVisible();
  }

  async scrollToHedgeFundsItem() {
    await this.hedgeFundsItem.scrollIntoViewIfNeeded();
  }

  async isHedgeFundsItemVisible() {
    return await this.hedgeFundsItem.isVisible();
  }

  async getHedgeFundsAccumulatedValue() {
    await this.hedgeFundsAccumulatedValue.waitFor({ state: 'visible' });
    return await this.hedgeFundsAccumulatedValue.textContent();
  }

  async closeBreakdownPopup() {
    await this.closeBreakdownButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }
}

module.exports = ContractValuePage;