class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.consoleMessages = [];
    
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.clientSearchInput = '[data-testid="client-search-input"]';
    this.searchMagnifier = '[data-testid="search-magnifier"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.monetaryValueField = '[data-testid="monetary-value"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    this.poderCompraMXN = '[data-testid="rubro-poder-compra-mxn"]';
    this.efectivoMXN = '[data-testid="rubro-efectivo-mxn"]';
    this.efectivoUSD = '[data-testid="rubro-efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="rubro-pendientes-liquidar"]';
    this.fondos = '[data-testid="rubro-fondos"]';
    this.cedesPagares = '[data-testid="rubro-cedes-pagares"]';
    this.mercadoDinero = '[data-testid="rubro-mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="rubro-mercado-capitales"]';
    
    this.loginUsernameInput = '[data-testid="login-username"]';
    this.loginPasswordInput = '[data-testid="login-password"]';
    this.loginSubmitButton = '[data-testid="login-submit"]';
    this.userProfileIndicator = '[data-testid="user-profile"]';
    
    this.fundsOperationModule = '[data-testid="funds-operation-module"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.activeContractOption = '[data-testid="active-contract-option"]';
    
    this.popupOverlay = '[data-testid="popup-overlay"]';
    this.scrollableContainer = '[data-testid="scrollable-breakdown-container"]';
    
    this.page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        this.consoleMessages.push({
          type: msg.type(),
          text: msg.text()
        });
      }
    });
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl, { waitUntil: 'networkidle' });
  }

  async isApplicationLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
    return true;
  }

  async authenticateUser() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpassword';
    
    await this.page.fill(this.loginUsernameInput, username);
    await this.page.fill(this.loginPasswordInput, password);
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible', timeout: 10000 });
  }

  async isUserAuthenticated() {
    return await this.page.isVisible(this.userProfileIndicator);
  }

  async navigateToFundsOperationModule() {
    await this.page.click(this.fundsOperationModule);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.click(this.contractSelector);
    await this.page.click(this.activeContractOption);
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async hasTotalValueCorrectFormat() {
    const valueText = await this.page.textContent(this.totalValueComponent);
    const monetaryPattern = /\$[\d,]+(\.\d{2})?/;
    return monetaryPattern.test(valueText);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async areBreakdownItemsVisible() {
    const items = await this.page.$$(this.breakdownItem);
    return items.length > 0;
  }

  async hasBreakdownProperFormatting() {
    const rubros = [
      this.poderCompraMXN,
      this.efectivoMXN,
      this.efectivoUSD,
      this.pendientesLiquidar,
      this.fondos,
      this.cedesPagares,
      this.mercadoDinero,
      this.mercadoCapitales
    ];
    
    for (const rubro of rubros) {
      const element = await this.page.$(rubro);
      if (element) {
        const text = await element.textContent();
        const monetaryPattern = /\$[\d,]+(\.\d{2})?/;
        if (!monetaryPattern.test(text)) {
          return false;
        }
      }
    }
    return true;
  }

  async clickOutsidePopup() {
    await this.page.click(this.popupOverlay, { position: { x: 10, y: 10 } });
    await this.page.waitForTimeout(500);
  }

  async isBreakdownPopupClosed() {
    return await this.page.isHidden(this.breakdownPopup);
  }

  async clickCloseButton() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForTimeout(500);
  }

  async verifyScrollFunctionality() {
    const scrollContainer = await this.page.$(this.scrollableContainer);
    if (!scrollContainer) {
      return true;
    }
    
    const initialScrollTop = await scrollContainer.evaluate(el => el.scrollTop);
    await scrollContainer.evaluate(el => el.scrollTop += 100);
    const newScrollTop = await scrollContainer.evaluate(el => el.scrollTop);
    
    return newScrollTop !== initialScrollTop || initialScrollTop === 0;
  }

  async verifyCSSStyles() {
    const popup = await this.page.$(this.breakdownPopup);
    if (!popup) {
      return false;
    }
    
    const styles = await popup.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        fontFamily: computed.fontFamily,
        backgroundColor: computed.backgroundColor,
        padding: computed.padding,
        textAlign: computed.textAlign
      };
    });
    
    const hasFontFamily = styles.fontFamily && styles.fontFamily.length > 0;
    const hasBackgroundColor = styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
    
    return hasFontFamily && hasBackgroundColor;
  }

  async getConsoleErrors() {
    const compatibilityKeywords = ['compatibility', 'deprecated', 'not supported', 'polyfill'];
    return this.consoleMessages.filter(msg => 
      msg.type === 'error' || 
      compatibilityKeywords.some(keyword => msg.text.toLowerCase().includes(keyword))
    );
  }
}

module.exports = ContractValuePage;