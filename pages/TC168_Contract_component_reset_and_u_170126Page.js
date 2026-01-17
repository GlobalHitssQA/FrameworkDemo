class ContractComponentPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.contractComponent = '[data-testid="contract-total-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.searchMagnifyingGlass = '[data-testid="search-client-contract-button"]';
    this.searchPanel = '[data-testid="search-panel"]';
    this.searchInput = '[data-testid="search-input"]';
    this.searchResultsList = '[data-testid="search-results-list"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    this.breakdownItemRow = '[data-testid="breakdown-item-row"]';
    this.breakdownItemLabel = '[data-testid="breakdown-item-label"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    this.poderCompraMXN = '[data-testid="rubro-poder-compra-mxn"]';
    this.efectivoMXN = '[data-testid="rubro-efectivo-mxn"]';
    this.efectivoUSD = '[data-testid="rubro-efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="rubro-pendientes-liquidar"]';
    this.fondos = '[data-testid="rubro-fondos"]';
    this.cedesPagares = '[data-testid="rubro-cedes-pagares"]';
    this.mercadoDinero = '[data-testid="rubro-mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="rubro-mercado-capitales"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForContractComponentToLoad() {
    await this.page.waitForSelector(this.contractComponent, { state: 'visible', timeout: 10000 });
  }

  async isContractComponentVisible() {
    return await this.page.isVisible(this.contractComponent);
  }

  async clickContractComponent() {
    await this.page.click(this.contractComponent);
    await this.page.waitForTimeout(500);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async closeBreakdownPopup() {
    if (await this.isBreakdownPopupVisible()) {
      await this.page.click(this.breakdownCloseButton);
      await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    }
  }

  async clickSearchMagnifyingGlass() {
    await this.page.click(this.searchMagnifyingGlass);
    await this.page.waitForTimeout(500);
  }

  async isSearchPanelVisible() {
    return await this.page.isVisible(this.searchPanel);
  }

  async searchForContract(searchTerm) {
    await this.page.fill(this.searchInput, searchTerm);
    await this.page.waitForSelector(this.searchResultsList, { state: 'visible', timeout: 5000 });
  }

  async selectContractFromResults(index) {
    const results = await this.page.$$(this.searchResultItem);
    if (results.length > index) {
      await results[index].click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async getContractTotalValue() {
    return await this.page.textContent(this.contractTotalValue);
  }

  async getBreakdownValues() {
    const values = [];
    const rows = await this.page.$$(this.breakdownItemRow);
    for (const row of rows) {
      const label = await row.$eval(this.breakdownItemLabel.replace('[data-testid="', '[data-testid="'), el => el.textContent).catch(() => '');
      const value = await row.$eval(this.breakdownItemValue.replace('[data-testid="', '[data-testid="'), el => el.textContent).catch(() => '');
      if (label || value) {
        values.push({ label: label.trim(), value: value.trim() });
      }
    }
    return values;
  }

  async getSpecificRubroValue(rubroSelector) {
    return await this.page.textContent(rubroSelector);
  }

  async hoverDistributionTooltip() {
    await this.page.hover(this.contractTotalValue);
    await this.page.waitForSelector(this.distributionTooltip, { state: 'visible', timeout: 3000 });
  }

  async getDistributionTooltipContent() {
    return await this.page.textContent(this.distributionTooltip);
  }
}

module.exports = ContractComponentPage;