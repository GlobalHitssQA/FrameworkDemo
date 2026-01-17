class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.searchInput = '[data-testid="search-client-contract"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractList = '[data-testid="contract-list"]';
    this.bancoPersonaMoralContractWithoutMexdolar = '[data-testid="contract-banco-persona-moral-no-mexdolar"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownRubrosList = '[data-testid="breakdown-rubros-list"]';
    this.rubroItem = '[data-testid="rubro-item"]';
    this.efectivoUSDRubro = '[data-testid="rubro-efectivo-usd"]';
    this.efectivoMXNRubro = '[data-testid="rubro-efectivo-mxn"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectBancoPersonaMoralContractWithoutMexdolar() {
    await this.page.waitForSelector(this.contractList, { state: 'visible' });
    await this.page.click(this.bancoPersonaMoralContractWithoutMexdolar);
  }

  async verifyContractValueComponentDisplayed() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickOnTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 }).catch(() => null);
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isEfectivoUSDRubroVisible() {
    return await this.page.isVisible(this.efectivoUSDRubro);
  }

  async isEfectivoMXNRubroVisible() {
    return await this.page.isVisible(this.efectivoMXNRubro);
  }

  async getVisibleRubros() {
    await this.page.waitForSelector(this.breakdownRubrosList, { state: 'visible' });
    const rubros = await this.page.$$eval(this.rubroItem, elements => 
      elements.map(el => el.textContent.trim())
    );
    return rubros;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = ContractBreakdownPage;