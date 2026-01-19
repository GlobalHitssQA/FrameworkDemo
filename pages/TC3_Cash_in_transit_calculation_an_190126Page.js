class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.userProfileIndicator = '[data-testid="user-profile"]';
    
    // Contract search locators
    this.searchButton = '[data-testid="search-client-contract"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.bankContractOption = '[data-testid="contract-type-bank"]';
    this.brokerageHouseContractOption = '[data-testid="contract-type-brokerage"]';
    this.contractLoadedIndicator = '[data-testid="contract-info-loaded"]';
    
    // Value and composition locators
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemBase = '[data-testid="breakdown-item"]';
    this.cashInTransitItem = '[data-testid="breakdown-item-cash-in-transit"]';
    this.closePopupButton = '[data-testid="close-breakdown-popup"]';
    this.popupOverlay = '[data-testid="popup-overlay"]';
    
    // Financial items locators
    this.effectivoMxnBanco = '[data-testid="efectivo-mxn-banco"]';
    this.effectivoMxnCasaBolsa = '[data-testid="efectivo-mxn-casa-bolsa"]';
    this.effectivoUsd = '[data-testid="efectivo-usd"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isUserLoggedIn() {
    return await this.page.isVisible(this.userProfileIndicator);
  }

  async openContractSearch() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async selectBankContract() {
    await this.page.click(this.bankContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async selectBrokerageHouseContract() {
    await this.page.click(this.brokerageHouseContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractLoaded() {
    return await this.page.isVisible(this.contractLoadedIndicator);
  }

  async clickValueCompositionComponent() {
    await this.page.click(this.valueCompositionComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isBreakdownItemVisible(itemName) {
    const normalizedItem = itemName.toLowerCase().replace(/\s+/g, '-');
    const selector = `[data-testid="breakdown-item-${normalizedItem}"]`;
    return await this.page.isVisible(selector);
  }

  async getBreakdownItemValue(itemName) {
    const normalizedItem = itemName.toLowerCase().replace(/\s+/g, '-');
    const selector = `[data-testid="breakdown-item-${normalizedItem}"] [data-testid="item-value"]`;
    const valueText = await this.page.textContent(selector);
    return valueText.trim();
  }

  async getSapPrenotesValue() {
    const response = await this.page.request.get(`${this.baseUrl}/api/sap/prenotes`);
    const data = await response.json();
    return data.cashInTransit;
  }

  async closeBreakdownPopup() {
    const closeButtonVisible = await this.page.isVisible(this.closePopupButton);
    if (closeButtonVisible) {
      await this.page.click(this.closePopupButton);
    } else {
      await this.page.click(this.popupOverlay, { position: { x: 10, y: 10 } });
    }
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ActicenterPage;