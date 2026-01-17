class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - inferidos usando buenas prácticas
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.mexdolarContractItem = '[data-testid="mexdolar-contract-item"]';
    this.contractScreen = '[data-testid="contract-screen"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.effectiveUSDItem = '[data-testid="effective-usd-item"]';
    this.effectiveUSDValue = '[data-testid="effective-usd-value"]';
    this.contractList = '[data-testid="contract-list"]';
    this.personaMoralFilter = '[data-testid="persona-moral-filter"]';
    this.authenticationIndicator = '[data-testid="user-authenticated"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.authenticationIndicator, { state: 'visible', timeout: 30000 });
  }

  async verifyMexdolarContractAccess() {
    await this.page.waitForSelector(this.contractList, { state: 'visible' });
    const mexdolarContracts = await this.page.locator(this.mexdolarContractItem).count();
    return mexdolarContracts > 0;
  }

  async selectMexdolarPersonaMoralContract() {
    await this.page.click(this.personaMoralFilter);
    await this.page.waitForSelector(this.mexdolarContractItem, { state: 'visible' });
    await this.page.click(this.mexdolarContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractScreenDisplayed() {
    await this.page.waitForSelector(this.contractScreen, { state: 'visible' });
    return await this.page.isVisible(this.contractScreen);
  }

  async clickTotalContractValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async locateEffectiveUSDItem() {
    await this.page.waitForSelector(this.effectiveUSDItem, { state: 'visible' });
  }

  async isEffectiveUSDItemVisible() {
    return await this.page.isVisible(this.effectiveUSDItem);
  }

  async getEffectiveUSDValue() {
    const valueText = await this.page.textContent(this.effectiveUSDValue);
    return this.parseMonetaryValue(valueText);
  }

  async getSAPEffectiveUSDValue() {
    // Este método debe integrarse con el servicio SAP para obtener el valor esperado
    // En un escenario real, esto se conectaría a SAP o leería de un fixture/mock
    const sapResponse = await this.page.evaluate(async () => {
      const response = await fetch('/api/sap/effective-usd-value');
      return response.json();
    });
    return this.parseMonetaryValue(sapResponse.effectiveUSD);
  }

  parseMonetaryValue(value) {
    if (typeof value === 'string') {
      return parseFloat(value.replace(/[^0-9.-]/g, ''));
    }
    return value;
  }
}

module.exports = ContractBreakdownPage;