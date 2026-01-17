class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    
    // Contract search locators
    this.searchIcon = '[data-testid="contract-search-icon"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.personaFisicaFilter = '[data-testid="filter-persona-fisica"]';
    this.personaMoralFilter = '[data-testid="filter-persona-moral"]';
    this.casaBolsaFilter = '[data-testid="filter-casa-bolsa"]';
    this.bancoFilter = '[data-testid="filter-banco"]';
    
    // Value and Composition component locators
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.totalValueElement = '[data-testid="total-contract-value"]';
    this.purchasePowerMXN = '[data-testid="purchase-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.fundsDebt = '[data-testid="funds-debt"]';
    this.fundsCoverage = '[data-testid="funds-coverage"]';
    this.fundsEquity = '[data-testid="funds-equity"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenVisible() {
    return await this.page.isVisible(this.mainScreen);
  }

  async openContractSearch() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async selectContractByType(personaType, institutionType, index) {
    if (personaType === 'persona-fisica') {
      await this.page.click(this.personaFisicaFilter);
    } else if (personaType === 'persona-moral') {
      await this.page.click(this.personaMoralFilter);
    }
    
    if (institutionType === 'casa-bolsa') {
      await this.page.click(this.casaBolsaFilter);
    } else if (institutionType === 'banco') {
      await this.page.click(this.bancoFilter);
    }
    
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    const contracts = await this.page.locator(this.contractListItem).all();
    if (contracts.length > index) {
      await contracts[index].click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async isValueCompositionComponentVisible() {
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async getComponentValues() {
    await this.page.waitForSelector(this.valueCompositionComponent, { state: 'visible' });
    
    const totalValue = await this.page.textContent(this.totalValueElement);
    const purchasePower = await this.page.textContent(this.purchasePowerMXN);
    const pendingSettlement = await this.page.textContent(this.pendingSettlement);
    
    let funds = {};
    if (await this.page.isVisible(this.fundsDebt)) {
      funds.debt = await this.page.textContent(this.fundsDebt);
    }
    if (await this.page.isVisible(this.fundsCoverage)) {
      funds.coverage = await this.page.textContent(this.fundsCoverage);
    }
    if (await this.page.isVisible(this.fundsEquity)) {
      funds.equity = await this.page.textContent(this.fundsEquity);
    }
    
    let cashMXN = null;
    let cashUSD = null;
    if (await this.page.isVisible(this.cashMXN)) {
      cashMXN = await this.page.textContent(this.cashMXN);
    }
    if (await this.page.isVisible(this.cashUSD)) {
      cashUSD = await this.page.textContent(this.cashUSD);
    }
    
    return {
      totalValue: totalValue ? totalValue.trim() : null,
      purchasePower: purchasePower ? purchasePower.trim() : null,
      pendingSettlement: pendingSettlement ? pendingSettlement.trim() : null,
      funds,
      cashMXN: cashMXN ? cashMXN.trim() : null,
      cashUSD: cashUSD ? cashUSD.trim() : null
    };
  }

  async clickOutsideComponent() {
    await this.page.click('body', { position: { x: 0, y: 0 } });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }
};

module.exports = ActicenterPage;