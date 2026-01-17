class ValueCompositionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Login
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Locators - Contract Search
    this.contractSearchIcon = '[data-testid="contract-search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.activeContractItem = '[data-testid="contract-item-active"]';
    
    // Locators - Value Component
    this.valueComponent = '[data-testid="value-composition-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Locators - Breakdown Items
    this.breakdownItemPoderCompra = '[data-testid="breakdown-item-poder-compra-mxn"]';
    this.breakdownItemEfectivoMxn = '[data-testid="breakdown-item-efectivo-mxn"]';
    this.breakdownItemEfectivoUsd = '[data-testid="breakdown-item-efectivo-usd"]';
    this.breakdownItemPendientes = '[data-testid="breakdown-item-pendientes-liquidar"]';
    this.breakdownItemFondos = '[data-testid="breakdown-item-fondos"]';
    this.breakdownItemCedes = '[data-testid="breakdown-item-cedes-pagares"]';
    this.breakdownItemMercadoDinero = '[data-testid="breakdown-item-mercado-dinero"]';
    this.breakdownItemMercadoCapitales = '[data-testid="breakdown-item-mercado-capitales"]';
    
    // Locators - Overlay
    this.overlayBackground = '[data-testid="overlay-background"]';
    this.mainContainer = '[data-testid="main-container"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsPatrimonialBankingUser() {
    const username = process.env.PATRIMONIAL_USER || 'patrimonial_user';
    const password = process.env.PATRIMONIAL_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async setResponsivePortraitMode() {
    await this.page.setViewportSize({ width: 414, height: 896 });
  }

  async selectActiveContract() {
    await this.page.click(this.contractSearchIcon);
    await this.page.waitForSelector(this.activeContractItem);
    await this.page.click(this.activeContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isValueComponentVisible() {
    await this.page.waitForSelector(this.valueComponent, { state: 'visible' });
    return await this.page.isVisible(this.valueComponent);
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.totalContractValue);
    return await this.page.textContent(this.totalContractValue);
  }

  async clickValueComponent() {
    await this.page.click(this.valueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async verifyBreakdownVerticalAlignment() {
    const componentBox = await this.page.locator(this.valueComponent).boundingBox();
    const breakdownBox = await this.page.locator(this.breakdownPopup).boundingBox();
    
    if (!componentBox || !breakdownBox) {
      return false;
    }
    
    const tolerance = 50;
    const componentCenterX = componentBox.x + componentBox.width / 2;
    const breakdownCenterX = breakdownBox.x + breakdownBox.width / 2;
    
    return Math.abs(componentCenterX - breakdownCenterX) <= tolerance;
  }

  async clickOutsideComponent() {
    await this.page.click(this.mainContainer, { position: { x: 10, y: 10 } });
  }

  async isBreakdownPopupHidden() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 }).catch(() => {});
    return !(await this.page.isVisible(this.breakdownPopup));
  }
}

module.exports = ValueCompositionPage;