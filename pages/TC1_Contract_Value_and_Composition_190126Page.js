class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-btn"]';
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    
    // Navigation locators
    this.fundOperationMenu = '[data-testid="menu-fund-operation"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-btn"]';
    this.casaDeBolsaContractOption = '[data-testid="contract-type-casa-bolsa"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Value component locators
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.contractDateLabel = '[data-testid="contract-date-label"]';
    
    // Popup locators
    this.breakdownPopup = '[data-testid="value-breakdown-popup"]';
    this.breakdownItemRow = '[data-testid="breakdown-item-row"]';
    this.poderCompraMxnItem = '[data-testid="breakdown-item-poder-compra-mxn"]';
    this.efectivoUsdItem = '[data-testid="breakdown-item-efectivo-usd"]';
    this.breakdownItemLabel = '[data-testid="breakdown-item-label"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    this.popupCloseButton = '[data-testid="popup-close-btn"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isUserLoggedIn() {
    return await this.page.isVisible(this.userProfileIndicator);
  }

  async navigateToFundOperation() {
    await this.page.click(this.fundOperationMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async selectCasaDeBolsaContract() {
    await this.page.click(this.casaDeBolsaContractOption);
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractLoaded() {
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async isValueComponentVisible() {
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async getTotalContractValue() {
    return await this.page.textContent(this.totalContractValue);
  }

  async clickValueComponent() {
    await this.page.click(this.valueCompositionComponent);
    await this.page.waitForSelector(this.breakdownPopup);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isBreakdownItemVisible(itemName) {
    const itemMap = {
      'Poder de compra MXN': this.poderCompraMxnItem,
      'Efectivo USD': this.efectivoUsdItem
    };
    const selector = itemMap[itemName] || `[data-testid="breakdown-item-${itemName.toLowerCase().replace(/\s+/g, '-')}"]`;
    return await this.page.isVisible(selector);
  }

  async getBreakdownItemValue(itemName) {
    const itemMap = {
      'Poder de compra MXN': this.poderCompraMxnItem,
      'Efectivo USD': this.efectivoUsdItem
    };
    const selector = itemMap[itemName] || `[data-testid="breakdown-item-${itemName.toLowerCase().replace(/\s+/g, '-')}"]`;
    const itemElement = this.page.locator(selector);
    const valueElement = itemElement.locator(this.breakdownItemValue);
    return await valueElement.textContent();
  }

  async closeBreakdownPopup() {
    await this.page.click(this.popupCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;