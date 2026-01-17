class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainInterface = '[data-testid="main-interface"]';
    
    // Search locators
    this.searchLupa = '[data-testid="search-client-contract"]';
    this.searchInput = '[data-testid="search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.activeContractItem = '[data-testid="contract-item-active"]';
    
    // Value and composition component locators
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.totalValueClickable = '[data-testid="total-value-clickable"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemRow = '[data-testid="breakdown-item-row"]';
    this.breakdownItemLabel = '[data-testid="breakdown-item-label"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    
    // Specific breakdown items
    this.poderCompraMxn = '[data-testid="item-poder-compra-mxn"]';
    this.efectivoMxn = '[data-testid="item-efectivo-mxn"]';
    this.efectivoUsd = '[data-testid="item-efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="item-pendientes-liquidar"]';
    this.fondos = '[data-testid="item-fondos"]';
    this.cedesPagares = '[data-testid="item-cedes-pagares"]';
    this.mercadoDinero = '[data-testid="item-mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="item-mercado-capitales"]';
    
    // Overlay for clicking outside
    this.popupOverlay = '[data-testid="popup-overlay"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsWealthManagementUser() {
    const username = process.env.WM_USERNAME || 'wm_test_user';
    const password = process.env.WM_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainInterfaceVisible() {
    return await this.page.isVisible(this.mainInterface);
  }

  async searchAndSelectActiveContract() {
    await this.page.click(this.searchLupa);
    await this.page.waitForSelector(this.searchInput);
    await this.page.click(this.activeContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async setResponsiveLandscapeView() {
    await this.page.setViewportSize({ width: 1024, height: 768 });
  }

  async isValueCompositionComponentVisible() {
    await this.page.waitForSelector(this.valueCompositionComponent, { timeout: 10000 });
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.totalContractValue);
    return await this.page.textContent(this.totalContractValue);
  }

  validateMonetaryFormat(value) {
    const monetaryRegex = /^\$[\d,]+(\.\d{2})?$|^-?\$[\d,]+(\.\d{2})?$/;
    return monetaryRegex.test(value.trim());
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueClickable);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getAllBreakdownItemsWithValues() {
    const items = await this.page.locator(this.breakdownItemRow).all();
    const itemsWithValues = [];
    
    for (const item of items) {
      const label = await item.locator(this.breakdownItemLabel.replace('[data-testid="breakdown-item-row"] ', '')).textContent();
      const valueElement = item.locator('[data-testid="breakdown-item-value"]');
      const value = await valueElement.textContent();
      const boundingBox = await valueElement.boundingBox();
      const parentBox = await item.boundingBox();
      
      itemsWithValues.push({
        label: label,
        value: value,
        hasValueOnRight: boundingBox && parentBox ? boundingBox.x > (parentBox.x + parentBox.width / 2) : true
      });
    }
    
    return itemsWithValues;
  }

  async getZeroBalanceItems() {
    const items = await this.page.locator(this.breakdownItemRow).all();
    const zeroItems = [];
    
    for (const item of items) {
      const value = await item.locator('[data-testid="breakdown-item-value"]').textContent();
      if (value && value.includes('$0.00')) {
        zeroItems.push({ value: value.trim() });
      }
    }
    
    return zeroItems;
  }

  async clickOutsidePopup() {
    const overlay = await this.page.locator(this.popupOverlay);
    if (await overlay.isVisible()) {
      await overlay.click();
    } else {
      await this.page.click('body', { position: { x: 10, y: 10 } });
    }
  }

  async isBreakdownPopupClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }

  async clickCloseButton() {
    await this.page.click(this.breakdownCloseButton);
  }
}

module.exports = ContractValuePage;