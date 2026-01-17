class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.loginUsernameInput = '[data-testid="login-username-input"]';
    this.loginPasswordInput = '[data-testid="login-password-input"]';
    this.loginSubmitButton = '[data-testid="login-submit-button"]';
    this.mainScreenContainer = '[data-testid="main-screen-container"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.casaDeBolsaContractOption = '[data-testid="contract-option-casa-bolsa"]';
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
  }

  async login(username, password) {
    await this.page.fill(this.loginUsernameInput, username);
    await this.page.fill(this.loginPasswordInput, password);
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForSelector(this.mainScreenContainer, { state: 'visible' });
  }

  async isMainScreenVisible() {
    return await this.page.isVisible(this.mainScreenContainer);
  }

  async openContractSearch() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async selectCasaDeBolsaContract() {
    await this.page.click(this.casaDeBolsaContractOption);
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isItemVisible(itemName) {
    const items = await this.page.$$eval(this.breakdownItem, (elements) => 
      elements.map(el => el.textContent)
    );
    return items.some(item => item.includes(itemName));
  }

  async getBreakdownItemsList() {
    await this.page.waitForSelector(this.breakdownItem, { state: 'visible' });
    return await this.page.$$eval(this.breakdownItem, (elements) => 
      elements.map(el => el.textContent.trim())
    );
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractBreakdownPage;