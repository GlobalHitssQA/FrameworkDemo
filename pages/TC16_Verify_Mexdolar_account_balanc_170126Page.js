class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Main screen elements
    this.mainScreenContainer = '[data-testid="acticenter-main-screen"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="contract-search-button"]';
    this.searchIcon = '[data-testid="search-icon-lupa"]';
    
    // Locators - Contract selection
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
    this.contractTypeLabel = '[data-testid="contract-type-label"]';
    
    // Locators - Total contract value component
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.contractValueAmount = '[data-testid="contract-value-amount"]';
    
    // Locators - Breakdown popup
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownPopupOverlay = '[data-testid="breakdown-popup-overlay"]';
    this.closePopupButton = '[data-testid="close-breakdown-popup"]';
    
    // Locators - Cash section (Efectivo)
    this.efectivoSection = '[data-testid="efectivo-section"]';
    this.efectivoUSDField = '[data-testid="efectivo-usd-value"]';
    this.efectivoMXNField = '[data-testid="efectivo-mxn-value"]';
    this.buyingPowerMXN = '[data-testid="buying-power-mxn"]';
    
    // Locators - Investment sections
    this.fundsSection = '[data-testid="funds-section"]';
    this.debtFundsList = '[data-testid="debt-funds-list"]';
    this.hedgeFundsList = '[data-testid="hedge-funds-list"]';
    this.equityFundsList = '[data-testid="equity-funds-list"]';
    this.moneyMarketSection = '[data-testid="money-market-section"]';
    this.capitalMarketSection = '[data-testid="capital-market-section"]';
    
    // Locators - Pending settlements
    this.pendingSettlementsSection = '[data-testid="pending-settlements-section"]';
    this.pendingSettlementsList = '[data-testid="pending-settlements-list"]';
    
    // Internal state
    this.sapBalanceReceived = false;
    this.sapMexdolarBalance = null;
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreenContainer, { state: 'visible', timeout: 10000 });
  }

  async searchAndSelectContract(contractType) {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
    await this.page.fill(this.searchInput, contractType);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    const contractItem = this.page.locator(`${this.contractListItem}[data-contract-type="BANCO_PERSONA_MORAL"]`).first();
    await contractItem.click();
  }

  async verifyContractInfoLoaded() {
    await this.page.waitForSelector(this.contractInfoContainer, { state: 'visible', timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }

  async clickTotalContractValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async waitForSAPServiceResponse() {
    const responsePromise = this.page.waitForResponse(
      response => response.url().includes('/api/sap/mexdolar-balance') || 
                  response.url().includes('/api/sap/account-balance') ||
                  response.url().includes('/microservice/sap/efectivo'),
      { timeout: 15000 }
    );
    
    try {
      const response = await responsePromise;
      if (response.ok()) {
        const data = await response.json();
        this.sapMexdolarBalance = data.balance || data.saldo || data.mexdolarBalance;
        this.sapBalanceReceived = true;
      }
    } catch (error) {
      await this.page.waitForSelector(this.efectivoUSDField, { state: 'visible', timeout: 10000 });
      this.sapBalanceReceived = true;
    }
  }

  async isSAPBalanceReceived() {
    return this.sapBalanceReceived;
  }

  async getEfectivoUSDValue() {
    await this.page.waitForSelector(this.efectivoUSDField, { state: 'visible' });
    const valueText = await this.page.textContent(this.efectivoUSDField);
    return valueText ? valueText.trim() : null;
  }

  async verifyEfectivoUSDDisplaysOriginalSAPValue() {
    const displayedValue = await this.getEfectivoUSDValue();
    if (!displayedValue) {
      return false;
    }
    const hasUSDFormat = /^\$?[\d,]+\.?\d*\s*(USD)?$/.test(displayedValue);
    const isNotConverted = !displayedValue.includes('MXN') && !displayedValue.includes('convertido');
    return hasUSDFormat && isNotConverted;
  }

  async closeBreakdownPopup() {
    const closeButton = this.page.locator(this.closePopupButton);
    if (await closeButton.isVisible()) {
      await closeButton.click();
    } else {
      await this.page.click(this.breakdownPopupOverlay);
    }
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async getEfectivoMXNValue() {
    await this.page.waitForSelector(this.efectivoMXNField, { state: 'visible' });
    return await this.page.textContent(this.efectivoMXNField);
  }

  async getBuyingPowerMXN() {
    await this.page.waitForSelector(this.buyingPowerMXN, { state: 'visible' });
    return await this.page.textContent(this.buyingPowerMXN);
  }
};

module.exports = ActicenterPage;