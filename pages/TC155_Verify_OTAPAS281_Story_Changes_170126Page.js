class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Main component locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.searchInput = '[data-testid="search-client-contract"]';
    this.searchButton = '[data-testid="search-button"]';
    
    // Contract breakdown locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    
    // Financial values locators
    this.buyingPowerMXN = '[data-testid="buying-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.mexdolarUSD = '[data-testid="mexdolar-usd"]';
    this.transitCash = '[data-testid="transit-cash"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.funds = '[data-testid="funds"]';
    this.cedesAndPromissory = '[data-testid="cedes-promissory"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    
    // Contract type selectors
    this.contractList = '[data-testid="contract-list"]';
    this.casaDeBolsaContract = '[data-testid="contract-casa-bolsa"]';
    this.bancoContract = '[data-testid="contract-banco"]';
    this.bancoPMMexdolar = '[data-testid="contract-banco-pm-mexdolar"]';
    this.mexdolarPMContract = '[data-testid="contract-mexdolar-pm"]';
    this.bancoWithPrenotes = '[data-testid="contract-banco-prenotes"]';
    
    // Action elements
    this.buySellIcon = '[data-testid="buy-sell-icon"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    // Breakdown items
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
  }

  async navigateToComponent() {
    await this.page.goto('/');
  }

  async waitForComponentToLoad() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async selectCasaDeBolsaContract() {
    await this.page.click(this.casaDeBolsaContract);
    await this.page.waitForLoadState('networkidle');
  }

  async selectBancoContract() {
    await this.page.click(this.bancoContract);
    await this.page.waitForLoadState('networkidle');
  }

  async selectBancoPMMexdolarContract() {
    await this.page.click(this.bancoPMMexdolar);
    await this.page.waitForLoadState('networkidle');
  }

  async selectMexdolarPMContract() {
    await this.page.click(this.mexdolarPMContract);
    await this.page.waitForLoadState('networkidle');
  }

  async selectBancoContractWithPrenotes() {
    await this.page.click(this.bancoWithPrenotes);
    await this.page.waitForLoadState('networkidle');
  }

  async openContractBreakdown() {
    await this.page.click(this.totalContractValue);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async closeBreakdownPopup() {
    const isVisible = await this.page.isVisible(this.breakdownPopup);
    if (isVisible) {
      await this.page.click(this.closeBreakdownButton);
      await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
    }
  }

  async getBuyingPowerMXNValue() {
    return await this.page.textContent(this.buyingPowerMXN);
  }

  async verifyBuyingPowerMXNIsVisible() {
    return await this.page.isVisible(this.buyingPowerMXN);
  }

  async getCashMXNValue() {
    return await this.page.textContent(this.cashMXN);
  }

  async verifyCashMXNIsVisible() {
    return await this.page.isVisible(this.cashMXN);
  }

  async getCashUSDValue() {
    return await this.page.textContent(this.cashUSD);
  }

  async verifyCashUSDIsVisible() {
    return await this.page.isVisible(this.cashUSD);
  }

  async getMexdolarUSDValue() {
    return await this.page.textContent(this.mexdolarUSD);
  }

  async verifyMexdolarValueHasNoConversion() {
    const element = await this.page.locator(this.mexdolarUSD);
    const hasConversionIndicator = await element.getAttribute('data-converted');
    return hasConversionIndicator !== 'true';
  }

  async isTransitCashVisible() {
    return await this.page.isVisible(this.transitCash);
  }

  async verifyTransitCashShowsPrenotesData() {
    const element = await this.page.locator(this.transitCash);
    const dataSource = await element.getAttribute('data-source');
    return dataSource === 'sap-prenotes';
  }

  async isBuySellIconDisabled() {
    const element = await this.page.locator(this.buySellIcon);
    const isDisabled = await element.isDisabled();
    const hasDisabledClass = await element.getAttribute('class');
    return isDisabled || hasDisabledClass.includes('disabled');
  }

  async verifyContractIsReadOnly() {
    const buySellIcon = await this.page.locator(this.buySellIcon);
    return await buySellIcon.isDisabled();
  }

  async searchContract(contractNumber) {
    await this.page.fill(this.searchInput, contractNumber);
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getTotalContractValue() {
    return await this.page.textContent(this.totalContractValue);
  }

  async getBreakdownItems() {
    return await this.page.locator(this.breakdownItem).allTextContents();
  }

  async hoverDistributionTooltip() {
    await this.page.hover(this.distributionTooltip);
  }
};

module.exports = ContractValuePage;