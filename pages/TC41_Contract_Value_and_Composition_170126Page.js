class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Authentication
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainInterface = '[data-testid="main-interface"]';
    
    // Locators - Contract Search
    this.contractSearchIcon = '[data-testid="contract-search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.individualPersonContractOption = '[data-testid="contract-option-individual"]';
    
    // Locators - Value and Composition Component
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    this.overlay = '[data-testid="popup-overlay"]';
    
    // Locators - Breakdown Categories
    this.categoryEfectivoMXN = '[data-testid="category-efectivo-mxn"]';
    this.categoryPendientesLiquidar = '[data-testid="category-pendientes-liquidar"]';
    this.categoryFondosDeuda = '[data-testid="category-fondos-deuda"]';
    this.categoryFondosCobertura = '[data-testid="category-fondos-cobertura"]';
    this.categoryFondosRentaVariable = '[data-testid="category-fondos-renta-variable"]';
    this.categoryEfectivoTransito = '[data-testid="category-efectivo-transito"]';
    this.categoryCedesPagares = '[data-testid="category-cedes-pagares"]';
    this.categoryMercadoDinero = '[data-testid="category-mercado-dinero"]';
    this.categoryMercadoCapitales = '[data-testid="category-mercado-capitales"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsPrivateBankingUser() {
    const username = process.env.PRIVATE_BANKING_USER || 'test_user';
    const password = process.env.PRIVATE_BANKING_PASSWORD || 'test_password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainInterfaceDisplayed() {
    return await this.page.isVisible(this.mainInterface);
  }

  async selectIndividualPersonContract() {
    await this.page.click(this.contractSearchIcon);
    await this.page.waitForSelector(this.contractSearchInput);
    await this.page.click(this.individualPersonContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isValueCompositionComponentVisible() {
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async getTotalContractValue() {
    return await this.page.textContent(this.totalContractValue);
  }

  async hasValidMonetaryFormat(value) {
    const monetaryRegex = /^\$[\d,]+(\.\d{2})?( MXN| USD)?$/;
    return monetaryRegex.test(value.trim());
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalContractValue);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getBreakdownCategories() {
    const categories = [];
    const categoryMap = {
      'Efectivo MXN': this.categoryEfectivoMXN,
      'Pendientes por liquidar': this.categoryPendientesLiquidar,
      'Fondos de deuda': this.categoryFondosDeuda,
      'Fondos de cobertura': this.categoryFondosCobertura,
      'Fondos de renta variable': this.categoryFondosRentaVariable,
      'Efectivo en tránsito': this.categoryEfectivoTransito,
      'Cedes y pagarés': this.categoryCedesPagares,
      'Mercado de dinero': this.categoryMercadoDinero,
      'Mercado de capitales': this.categoryMercadoCapitales
    };
    
    for (const [name, selector] of Object.entries(categoryMap)) {
      if (await this.page.isVisible(selector)) {
        categories.push(name);
      }
    }
    return categories;
  }

  async isBreakdownVerticallyAligned() {
    const componentBox = await this.page.locator(this.valueCompositionComponent).boundingBox();
    const popupBox = await this.page.locator(this.breakdownPopup).boundingBox();
    
    if (!componentBox || !popupBox) {
      return false;
    }
    
    const tolerance = 10;
    const componentCenterX = componentBox.x + (componentBox.width / 2);
    const popupCenterX = popupBox.x + (popupBox.width / 2);
    
    return Math.abs(componentCenterX - popupCenterX) <= tolerance;
  }

  async clickOutsidePopup() {
    const overlay = await this.page.locator(this.overlay);
    if (await overlay.isVisible()) {
      await overlay.click();
    } else {
      await this.page.click('body', { position: { x: 10, y: 10 } });
    }
  }

  async isBreakdownPopupHidden() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }
}

module.exports = ContractValuePage;