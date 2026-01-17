class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchLupa = '[data-testid="search-lupa-icon"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.overlayBackdrop = '[data-testid="overlay-backdrop"]';
    this.breakdownCategories = {
      poderCompraMXN: '[data-testid="categoria-poder-compra-mxn"]',
      efectivoMXN: '[data-testid="categoria-efectivo-mxn"]',
      efectivoUSD: '[data-testid="categoria-efectivo-usd"]',
      pendientesLiquidar: '[data-testid="categoria-pendientes-liquidar"]',
      fondos: '[data-testid="categoria-fondos"]',
      cedesPagares: '[data-testid="categoria-cedes-pagares"]',
      mercadoDinero: '[data-testid="categoria-mercado-dinero"]',
      mercadoCapitales: '[data-testid="categoria-mercado-capitales"]'
    };
    this.userAuthIndicator = '[data-testid="user-authenticated-indicator"]';
    this.contractList = '[data-testid="contract-list"]';
    this.contractItemWithMultipleCategories = '[data-testid="contract-item"][data-has-multiple-categories="true"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserAuthenticated() {
    await this.page.waitForSelector(this.userAuthIndicator, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithMultipleCategories() {
    await this.page.waitForSelector(this.contractList, { state: 'visible' });
    const contractItem = this.page.locator(this.contractItemWithMultipleCategories).first();
    await contractItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractComponentDisplayed() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async waitForBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async closeBreakdownByClickingOutside() {
    const overlay = this.page.locator(this.overlayBackdrop);
    if (await overlay.isVisible()) {
      await overlay.click({ position: { x: 10, y: 10 } });
    } else {
      await this.page.click('body', { position: { x: 0, y: 0 } });
    }
  }

  async isBreakdownPopupClosed() {
    return !(await this.page.isVisible(this.breakdownPopup));
  }

  async waitForBreakdownPopupClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }

  async clickCloseButton() {
    await this.page.click(this.breakdownCloseButton);
  }

  async getTotalContractValue() {
    return await this.page.textContent(this.totalContractValue);
  }

  async getBreakdownItems() {
    return await this.page.locator(this.breakdownItemsList).locator('li').allTextContents();
  }

  async searchContract(contractNumber) {
    await this.page.fill(this.contractSearchInput, contractNumber);
    await this.page.click(this.searchLupa);
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = ContractBreakdownPage;