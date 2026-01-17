class ContractComponentPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Authentication
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Locators - Contract Search
    this.contractSearchIcon = '[data-testid="contract-search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Locators - Contract Component
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractComponentCollapsed = '[data-testid="contract-component-collapsed"]';
    this.contractComponentExpanded = '[data-testid="contract-component-expanded"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Locators - Breakdown Items
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.itemPoderCompraMXN = '[data-testid="item-poder-compra-mxn"]';
    this.itemEfectivoMXN = '[data-testid="item-efectivo-mxn"]';
    this.itemEfectivoUSD = '[data-testid="item-efectivo-usd"]';
    this.itemPendientesLiquidar = '[data-testid="item-pendientes-liquidar"]';
    this.itemFondos = '[data-testid="item-fondos"]';
    this.itemCedesPagares = '[data-testid="item-cedes-pagares"]';
    this.itemMercadoDinero = '[data-testid="item-mercado-dinero"]';
    this.itemMercadoCapitales = '[data-testid="item-mercado-capitales"]';
    this.itemValue = '[data-testid="item-value"]';
    
    // Locators - Navigation
    this.navigationMenu = '[data-testid="navigation-menu"]';
    this.sectionLink = '[data-testid="section-link"]';
    this.alternateSection = '[data-testid="alternate-section"]';
    this.contractSection = '[data-testid="contract-section"]';
    this.currentSectionIndicator = '[data-testid="current-section-indicator"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpassword';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.click(this.contractSearchIcon);
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(this.contractListItem);
    await this.page.waitForSelector(this.contractValueComponent);
  }

  async isComponentCollapsed() {
    const collapsed = await this.page.locator(this.contractComponentCollapsed).isVisible();
    const expanded = await this.page.locator(this.breakdownPopup).isVisible();
    return collapsed && !expanded;
  }

  async clickComponentToExpand() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownExpanded() {
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async breakdownHasItems() {
    const items = await this.page.locator(this.breakdownItem).count();
    return items > 0;
  }

  async getBreakdownValues() {
    const values = {};
    const itemSelectors = [
      { key: 'poderCompraMXN', selector: this.itemPoderCompraMXN },
      { key: 'efectivoMXN', selector: this.itemEfectivoMXN },
      { key: 'efectivoUSD', selector: this.itemEfectivoUSD },
      { key: 'pendientesLiquidar', selector: this.itemPendientesLiquidar },
      { key: 'fondos', selector: this.itemFondos },
      { key: 'cedesPagares', selector: this.itemCedesPagares },
      { key: 'mercadoDinero', selector: this.itemMercadoDinero },
      { key: 'mercadoCapitales', selector: this.itemMercadoCapitales }
    ];
    
    for (const item of itemSelectors) {
      const element = this.page.locator(item.selector);
      if (await element.isVisible()) {
        const valueElement = element.locator(this.itemValue);
        values[item.key] = await valueElement.textContent();
      }
    }
    return values;
  }

  async navigateToAnotherSection() {
    await this.page.click(this.navigationMenu);
    await this.page.click(this.alternateSection);
    await this.page.waitForLoadState('networkidle');
  }

  async isOnDifferentSection() {
    const currentSection = await this.page.locator(this.currentSectionIndicator).textContent();
    return !currentSection.includes('Contrato');
  }

  async returnToContractSection() {
    await this.page.click(this.navigationMenu);
    await this.page.click(this.contractSection);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(this.contractValueComponent);
  }

  async validateBreakdownValues() {
    const items = await this.page.locator(this.breakdownItem).all();
    for (const item of items) {
      const valueText = await item.locator(this.itemValue).textContent();
      if (!valueText || valueText.trim() === '') {
        return false;
      }
      const numericPattern = /^[$]?[\d,]+\.?\d*\s*(MXN|USD)?$/;
      if (!numericPattern.test(valueText.trim())) {
        return false;
      }
    }
    return true;
  }

  async closeBreakdown() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractComponentPage;