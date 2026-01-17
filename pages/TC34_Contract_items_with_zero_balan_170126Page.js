class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://acticenter.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainScreen = '[data-testid="main-screen"]';
    
    // Contract search locators
    this.contractSearchIcon = '[data-testid="contract-search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractResultsList = '[data-testid="contract-results-list"]';
    this.contractResultItem = '[data-testid="contract-result-item"]';
    this.contractInfoSection = '[data-testid="contract-info-section"]';
    
    // Value and composition locators
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Specific breakdown items locators
    this.itemPoderCompraMXN = '[data-testid="item-poder-compra-mxn"]';
    this.itemEfectivoMXN = '[data-testid="item-efectivo-mxn"]';
    this.itemEfectivoUSD = '[data-testid="item-efectivo-usd"]';
    this.itemPendientesLiquidar = '[data-testid="item-pendientes-liquidar"]';
    this.itemFondos = '[data-testid="item-fondos"]';
    this.itemCedesPagares = '[data-testid="item-cedes-pagares"]';
    this.itemMercadoDinero = '[data-testid="item-mercado-dinero"]';
    this.itemMercadoCapitales = '[data-testid="item-mercado-capitales"]';
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
  }

  async enterUsername(username) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }

  async waitForMainScreenToLoad() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 30000 });
  }

  async clickContractSearchIcon() {
    await this.page.click(this.contractSearchIcon);
  }

  async searchForContractWithZeroBalance() {
    const testContractId = process.env.TEST_CONTRACT_ZERO_BALANCE || 'CONTRACT_ZERO_001';
    await this.page.fill(this.contractSearchInput, testContractId);
    await this.page.press(this.contractSearchInput, 'Enter');
  }

  async selectContractFromResults() {
    await this.page.waitForSelector(this.contractResultItem, { state: 'visible' });
    await this.page.click(this.contractResultItem);
  }

  async waitForContractInfoToLoad() {
    await this.page.waitForSelector(this.contractInfoSection, { state: 'visible', timeout: 15000 });
  }

  async clickValueCompositionComponent() {
    await this.page.click(this.valueCompositionComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getBreakdownItemsCount() {
    const items = await this.page.$$(this.breakdownItem);
    return items.length;
  }

  async getAllBreakdownItems() {
    return await this.page.$$(this.breakdownItem);
  }

  async getItemsWithZeroBalance() {
    const allItems = await this.getAllBreakdownItems();
    const zeroBalanceItems = [];
    for (const item of allItems) {
      const valueElement = await item.$(this.breakdownItemValue.replace('[data-testid="breakdown-item"]', ''));
      if (valueElement) {
        const text = await valueElement.textContent();
        if (text && text.includes('$0.00')) {
          zeroBalanceItems.push(item);
        }
      }
    }
    return zeroBalanceItems;
  }

  async getItemValue(itemElement) {
    const valueSelector = '[data-testid="breakdown-item-value"]';
    const valueElement = await itemElement.$(valueSelector);
    if (valueElement) {
      return await valueElement.textContent();
    }
    return null;
  }

  async itemHasMonetaryValue(itemElement) {
    const value = await this.getItemValue(itemElement);
    if (!value || value.trim() === '') {
      return false;
    }
    const monetaryPattern = /^\$[\d,]+\.\d{2}$/;
    return monetaryPattern.test(value.trim());
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }
}

module.exports = ContractBreakdownPage;