class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    this.moduloAsesorUrl = process.env.MODULO_ASESOR_URL || 'https://moduloasesor.example.com';
    
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.casaDeBolsaContractItem = '[data-testid="casa-bolsa-contract-item"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.poderDeCompraMXNRow = '[data-testid="breakdown-row-poder-compra-mxn"]';
    this.poderDeCompraMXNValue = '[data-testid="breakdown-value-poder-compra-mxn"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.currentCashField = '[data-testid="currentcash-value"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectCasaDeBolsaContract() {
    await this.page.waitForSelector(this.casaDeBolsaContractItem, { state: 'visible' });
    await this.page.click(this.casaDeBolsaContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueVisible() {
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isPoderDeCompraMXNVisible() {
    return await this.page.isVisible(this.poderDeCompraMXNRow);
  }

  async getPoderDeCompraMXNValue() {
    await this.page.waitForSelector(this.poderDeCompraMXNValue, { state: 'visible' });
    return await this.page.textContent(this.poderDeCompraMXNValue);
  }

  async getCurrentCashFromModuloAsesor() {
    const newPage = await this.page.context().newPage();
    await newPage.goto(this.moduloAsesorUrl);
    await newPage.waitForLoadState('networkidle');
    await newPage.waitForSelector(this.currentCashField, { state: 'visible' });
    const value = await newPage.textContent(this.currentCashField);
    await newPage.close();
    return value;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  normalizeMonetaryValue(value) {
    if (!value) return null;
    return value.replace(/[^0-9.-]/g, '');
  }
};

module.exports = ActicenterPage;