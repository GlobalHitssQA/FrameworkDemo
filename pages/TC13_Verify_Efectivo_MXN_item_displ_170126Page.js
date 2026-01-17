class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.bancoPersonaMoralOption = '[data-testid="contract-option-banco-persona-moral"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.efectivoMXNItem = '[data-testid="breakdown-item-efectivo-mxn"]';
    this.efectivoMXNValue = '[data-testid="breakdown-item-efectivo-mxn"] [data-testid="monetary-value"]';
    this.poderCompraMXNItem = '[data-testid="breakdown-item-poder-compra-mxn"]';
    this.closeBreakdownButton = '[data-testid="breakdown-popup-close"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async openContractSelector() {
    await this.page.click(this.contractSelector);
    await this.page.waitForTimeout(500);
  }

  async selectBancoPersonaMoralContract() {
    await this.page.click(this.bancoPersonaMoralOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueComponentVisible() {
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isEfectivoMXNItemVisible() {
    return await this.page.isVisible(this.efectivoMXNItem);
  }

  async efectivoMXNHasMonetaryValue() {
    const valueText = await this.page.textContent(this.efectivoMXNValue);
    const monetaryPattern = /\$[\d,]+(\.\d{2})?/;
    return monetaryPattern.test(valueText);
  }

  async isPoderCompraMXNItemVisible() {
    return await this.page.isVisible(this.poderCompraMXNItem);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 3000 });
  }
}

module.exports = ContractBreakdownPage;