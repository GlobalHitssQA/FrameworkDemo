class ActicenterContractPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - inferidos basados en buenas prácticas
    this.mainScreenIndicator = '[data-testid="acticenter-main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.bancoContractOption = '[data-testid="banco-contract-option"]';
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.efectivoMXNRow = '[data-testid="breakdown-efectivo-mxn"]';
    this.efectivoMXNValue = '[data-testid="efectivo-mxn-value"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    this.contractTypeSelector = '[data-testid="contract-type-selector"]';
    this.personaFisicaOption = '[data-testid="persona-fisica-option"]';
    this.personaMoralOption = '[data-testid="persona-moral-option"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreenIndicator, { state: 'visible', timeout: 10000 });
  }

  async selectBancoContract() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.bancoContractOption, { state: 'visible' });
    await this.page.click(this.bancoContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getEfectivoMXNValue() {
    await this.page.waitForSelector(this.efectivoMXNValue, { state: 'visible' });
    return await this.page.textContent(this.efectivoMXNValue);
  }

  async getAccountBalanceFromSourceSystem() {
    // Este método simula la consulta al sistema fuente (SAP u otro)
    // En implementación real, se conectaría a una API o base de datos
    const sourceSystemUrl = process.env.SOURCE_SYSTEM_API || 'https://api.source-system.example.com';
    const contractId = await this.getCurrentContractId();
    
    const response = await this.page.request.get(`${sourceSystemUrl}/accounts/${contractId}/balance`);
    const data = await response.json();
    return data.balance;
  }

  async getCurrentContractId() {
    const contractElement = await this.page.locator('[data-testid="current-contract-id"]');
    return await contractElement.textContent();
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  normalizeMonetaryValue(value) {
    if (!value) return null;
    // Elimina símbolos de moneda, comas y espacios, conserva decimales
    return parseFloat(value.replace(/[^0-9.-]/g, ''));
  }
}

module.exports = ActicenterContractPage;