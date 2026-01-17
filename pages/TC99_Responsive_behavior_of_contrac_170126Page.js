class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItems = '[data-testid="breakdown-item"]';
    
    this.monetaryValueElements = '[data-testid="monetary-value"]';
    this.searchLupa = '[data-testid="search-client-contract"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    this.desktopLayout = '[data-testid="layout-desktop"]';
    this.tabletLayout = '[data-testid="layout-tablet"]';
    this.mobileLayout = '[data-testid="layout-mobile"]';
    
    this.breakdownPoderCompraMXN = '[data-testid="breakdown-poder-compra-mxn"]';
    this.breakdownEfectivoMXN = '[data-testid="breakdown-efectivo-mxn"]';
    this.breakdownEfectivoUSD = '[data-testid="breakdown-efectivo-usd"]';
    this.breakdownPendientesLiquidar = '[data-testid="breakdown-pendientes-liquidar"]';
    this.breakdownFondos = '[data-testid="breakdown-fondos"]';
    this.breakdownCedesPagares = '[data-testid="breakdown-cedes-pagares"]';
    this.breakdownMercadoDinero = '[data-testid="breakdown-mercado-dinero"]';
    this.breakdownMercadoCapitales = '[data-testid="breakdown-mercado-capitales"]';
    
    this.monetaryFormatRegex = /^\$[\d,]+(\.\d{2})?\s?(MXN|USD)?$/;
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
  }

  async waitForDashboardToLoad() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 30000 });
  }

  async setViewportSize(width, height) {
    await this.page.setViewportSize({ width, height });
  }

  async refreshPage() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  async isDesktopLayoutVisible() {
    const component = await this.page.locator(this.contractValueComponent);
    const isVisible = await component.isVisible();
    const viewport = this.page.viewportSize();
    return isVisible && viewport.width >= 1920;
  }

  async isTabletLayoutVisible() {
    const component = await this.page.locator(this.contractValueComponent);
    const isVisible = await component.isVisible();
    const viewport = this.page.viewportSize();
    return isVisible && viewport.width >= 768 && viewport.width < 1920;
  }

  async isMobileLayoutVisible() {
    const component = await this.page.locator(this.contractValueComponent);
    const isVisible = await component.isVisible();
    const viewport = this.page.viewportSize();
    return isVisible && viewport.width < 768;
  }

  async isContractValueComponentVisible() {
    return await this.page.locator(this.contractValueComponent).isVisible();
  }

  async areAllComponentElementsVisible() {
    const totalValue = await this.page.locator(this.totalContractValue).isVisible();
    const component = await this.page.locator(this.contractValueComponent).isVisible();
    return totalValue && component;
  }

  async isComponentResponsiveForMobile() {
    const component = await this.page.locator(this.contractValueComponent);
    const boundingBox = await component.boundingBox();
    const viewport = this.page.viewportSize();
    return boundingBox && boundingBox.width <= viewport.width;
  }

  async clickOnContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async waitForBreakdownPopupToAppear() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 10000 });
  }

  async isBreakdownListVisible() {
    return await this.page.locator(this.breakdownList).isVisible();
  }

  async isBreakdownScrollFunctional() {
    const breakdownList = await this.page.locator(this.breakdownList);
    const scrollHeight = await breakdownList.evaluate(el => el.scrollHeight);
    const clientHeight = await breakdownList.evaluate(el => el.clientHeight);
    if (scrollHeight > clientHeight) {
      await breakdownList.evaluate(el => el.scrollTop = 100);
      const scrollTop = await breakdownList.evaluate(el => el.scrollTop);
      return scrollTop > 0;
    }
    return true;
  }

  async areBreakdownItemsLegible() {
    const items = await this.page.locator(this.breakdownItems).all();
    for (const item of items) {
      const fontSize = await item.evaluate(el => window.getComputedStyle(el).fontSize);
      const fontSizeValue = parseFloat(fontSize);
      if (fontSizeValue < 10) {
        return false;
      }
    }
    return true;
  }

  async closeBreakdownPopup() {
    const closeButton = await this.page.locator(this.breakdownCloseButton);
    if (await closeButton.isVisible()) {
      await closeButton.click();
      await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    }
  }

  async areMonetaryValuesCorrectlyFormatted() {
    const monetaryElements = await this.page.locator(this.monetaryValueElements).all();
    if (monetaryElements.length === 0) {
      const totalValue = await this.page.locator(this.totalContractValue).textContent();
      return this.monetaryFormatRegex.test(totalValue.trim());
    }
    for (const element of monetaryElements) {
      const text = await element.textContent();
      const cleanText = text.trim();
      if (cleanText && !this.monetaryFormatRegex.test(cleanText)) {
        const hasThousandsSeparator = /[\d,]+/.test(cleanText);
        const hasCurrencySymbol = /\$|MXN|USD/.test(cleanText);
        if (!hasThousandsSeparator && !hasCurrencySymbol) {
          return false;
        }
      }
    }
    return true;
  }
}

module.exports = ContractValuePage;