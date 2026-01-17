class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    this.usernameInput = '[data-testid="login-username-input"]';
    this.passwordInput = '[data-testid="login-password-input"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.mainScreenContainer = '[data-testid="main-screen-container"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.searchInput = '[data-testid="search-client-contract-input"]';
    this.bankContractOption = '[data-testid="contract-type-banco"]';
    this.casaDeBolsaContractOption = '[data-testid="contract-type-casa-bolsa"]';
    this.totalValueComponent = '[data-testid="total-contract-value-component"]';
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.cashInTransitItem = '[data-testid="breakdown-item-efectivo-transito"]';
    this.closeBreakdownButton = '[data-testid="breakdown-close-button"]';
    this.contractInfoContainer = '[data-testid="contract-information-container"]';
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
  }

  async loginAsAdvisor() {
    const username = process.env.ADVISOR_USERNAME || 'advisor_test';
    const password = process.env.ADVISOR_PASSWORD || 'password_test';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreenContainer, { state: 'visible', timeout: 10000 });
  }

  async openContractSearch() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async selectBankTypeContract() {
    await this.page.click(this.bankContractOption);
    await this.page.waitForSelector(this.contractInfoContainer, { state: 'visible' });
  }

  async selectCasaDeBolsaTypeContract() {
    await this.page.click(this.casaDeBolsaContractOption);
    await this.page.waitForSelector(this.contractInfoContainer, { state: 'visible' });
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickValueCompositionComponent() {
    await this.page.click(this.valueCompositionComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isCashInTransitItemVisible() {
    return await this.page.isVisible(this.cashInTransitItem);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async isContractInformationVisible() {
    return await this.page.isVisible(this.contractInfoContainer);
  }
}

module.exports = ContractBreakdownPage;