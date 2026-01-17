class ContractAccessPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://ota-acticenter.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="input-username"]';
    this.passwordInput = '[data-testid="input-password"]';
    this.loginButton = '[data-testid="btn-login"]';
    this.loginSuccessIndicator = '[data-testid="dashboard-container"]';
    
    // Search locators
    this.searchIcon = '[data-testid="search-icon-client-contract"]';
    this.searchInput = '[data-testid="input-search-contract"]';
    this.searchResultsList = '[data-testid="search-results-list"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    
    // Contract value component locators
    this.contractValueComponent = '[data-testid="contract-total-value-component"]';
    this.contractCompositionComponent = '[data-testid="contract-composition-breakdown"]';
    this.compositionPopup = '[data-testid="composition-popup-detail"]';
    this.closeBreakdownButton = '[data-testid="btn-close-breakdown"]';
    
    // Authorization locators
    this.accessDeniedMessage = '[data-testid="message-access-denied"]';
    this.unauthorizedContractIndicator = '[data-testid="contract-unauthorized"]';
    this.noAccessTooltip = '[data-testid="tooltip-no-access"]';
    
    // Contract list locators
    this.contractListContainer = '[data-testid="contracts-list-container"]';
    this.contractItem = '[data-testid="contract-item"]';
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async enterUsername(username) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifySuccessfulLogin() {
    await this.page.waitForSelector(this.loginSuccessIndicator, { state: 'visible', timeout: 10000 });
  }

  async clickSearchIcon() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async enterContractSearch(contractId) {
    await this.page.fill(this.searchInput, contractId);
    await this.page.waitForSelector(this.searchResultsList, { state: 'visible', timeout: 5000 });
  }

  async selectContractFromResults() {
    await this.page.click(`${this.searchResultItem}:first-child`);
    await this.page.waitForLoadState('networkidle');
  }

  async attemptSelectNonAssignedContract() {
    const resultItem = this.page.locator(`${this.searchResultItem}:first-child`);
    const isClickable = await resultItem.isEnabled().catch(() => false);
    if (isClickable) {
      await resultItem.click().catch(() => {});
      await this.page.waitForTimeout(1000);
    }
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async isContractCompositionVisible() {
    return await this.page.isVisible(this.contractCompositionComponent);
  }

  async isAccessDeniedMessageVisible() {
    return await this.page.isVisible(this.accessDeniedMessage);
  }

  async isContractNotSelectable() {
    const unauthorizedIndicator = await this.page.isVisible(this.unauthorizedContractIndicator);
    const noAccessTooltip = await this.page.isVisible(this.noAccessTooltip);
    const valueNotVisible = !(await this.page.isVisible(this.contractValueComponent));
    return unauthorizedIndicator || noAccessTooltip || valueNotVisible;
  }

  async getDisplayedContractsList() {
    await this.page.waitForSelector(this.searchResultsList, { state: 'visible' });
    return await this.page.$$eval(this.searchResultItem, items => 
      items.map(item => item.textContent.trim())
    );
  }

  async checkUnauthorizedContractInList(contractId) {
    const contracts = await this.getDisplayedContractsList();
    return contracts.some(contract => contract.includes(contractId));
  }
}

module.exports = ContractAccessPage;