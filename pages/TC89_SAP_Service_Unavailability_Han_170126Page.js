class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators - inferidos usando buenas prácticas
    this.searchButton = '[data-testid="contract-search-button"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.contractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownTrigger = '[data-testid="breakdown-trigger"]';
    this.usdCashSection = '[data-testid="usd-cash-section"]';
    this.mxnCashSection = '[data-testid="mxn-cash-section"]';
    this.fundsSection = '[data-testid="funds-section"]';
    this.pendingSettlementSection = '[data-testid="pending-settlement-section"]';
    this.cedesSection = '[data-testid="cedes-section"]';
    this.moneyMarketSection = '[data-testid="money-market-section"]';
    this.capitalMarketSection = '[data-testid="capital-market-section"]';
    this.errorMessage = '[data-testid="error-message"]';
    this.unavailableIndicator = '[data-testid="unavailable-indicator"]';
    this.serviceFailureIndicator = '[data-testid="service-failure-indicator"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.bancoPersonaMoralContract = '[data-testid="banco-persona-moral-contract"]';
    this.userAuthenticatedIndicator = '[data-testid="user-authenticated"]';
    this.loadingSpinner = '[data-testid="loading-spinner"]';
  }

  async mockSAPServiceUnavailable() {
    await this.page.route('**/api/sap/mexdolar/**', route => {
      route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Service Unavailable', message: 'SAP service is not responding' })
      });
    });
    
    await this.page.route('**/api/sap/balance/usd/**', route => {
      route.abort('failed');
    });
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    const isAuthenticated = await this.page.locator(this.userAuthenticatedIndicator).isVisible({ timeout: 10000 }).catch(() => false);
    if (!isAuthenticated) {
      throw new Error('User is not authenticated in Acticenter');
    }
  }

  async searchForContract() {
    await this.page.locator(this.searchButton).click();
    await this.page.locator(this.searchInput).waitFor({ state: 'visible' });
  }

  async selectBancoPersonaMoralContractWithMexdolar() {
    const contractSelector = `${this.bancoPersonaMoralContract}[data-has-mexdolar="true"]`;
    const contractExists = await this.page.locator(contractSelector).first().isVisible({ timeout: 5000 }).catch(() => false);
    
    if (contractExists) {
      await this.page.locator(contractSelector).first().click();
    } else {
      await this.page.locator(this.contractListItem).filter({ hasText: 'Persona Moral' }).first().click();
    }
    
    await this.page.waitForLoadState('networkidle');
  }

  async waitForContractValueComponentLoad() {
    await this.page.locator(this.loadingSpinner).waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
    await this.page.locator(this.contractValueComponent).waitFor({ state: 'visible', timeout: 15000 });
  }

  async verifyUSDCashErrorOrIndeterminate() {
    const errorVisible = await this.page.locator(this.errorMessage).isVisible().catch(() => false);
    const unavailableVisible = await this.page.locator(this.unavailableIndicator).isVisible().catch(() => false);
    const usdSection = this.page.locator(this.usdCashSection);
    const usdText = await usdSection.textContent().catch(() => '');
    
    const hasIndeterminateValue = usdText.includes('--') || usdText.includes('N/A') || usdText.includes('No disponible');
    
    return errorVisible || unavailableVisible || hasIndeterminateValue;
  }

  async openBreakdownPopup() {
    await this.page.locator(this.breakdownTrigger).click();
    await this.page.locator(this.breakdownPopup).waitFor({ state: 'visible', timeout: 10000 });
  }

  async getUSDCashSectionStatus() {
    const usdSection = this.page.locator(`${this.breakdownPopup} ${this.usdCashSection}`);
    await usdSection.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    
    const sectionText = await usdSection.textContent().catch(() => '');
    const hasErrorIndicator = await usdSection.locator(this.errorMessage).isVisible().catch(() => false);
    const hasServiceFailure = await usdSection.locator(this.serviceFailureIndicator).isVisible().catch(() => false);
    
    return {
      hasError: hasErrorIndicator || sectionText.toLowerCase().includes('error'),
      isUnavailable: sectionText.includes('No disponible') || sectionText.includes('N/A') || sectionText.includes('--'),
      isZeroWithIndication: (sectionText.includes('$0.00') || sectionText.includes('0.00')) && hasServiceFailure
    };
  }

  async verifyIndependentSectionsDisplayCorrectly() {
    const sections = [
      { locator: this.fundsSection, name: 'Fondos' },
      { locator: this.pendingSettlementSection, name: 'Pendientes por liquidar' },
      { locator: this.cedesSection, name: 'Cedes' },
      { locator: this.mxnCashSection, name: 'Efectivo MXN' },
      { locator: this.moneyMarketSection, name: 'Mercado de dinero' },
      { locator: this.capitalMarketSection, name: 'Capitales' }
    ];
    
    for (const section of sections) {
      const sectionElement = this.page.locator(`${this.breakdownPopup} ${section.locator}`);
      const isVisible = await sectionElement.isVisible().catch(() => false);
      
      if (isVisible) {
        const text = await sectionElement.textContent().catch(() => '');
        const hasValidValue = /\$[\d,]+\.\d{2}/.test(text) || /[\d,]+\.\d{2}/.test(text);
        const hasError = text.toLowerCase().includes('error') || text.includes('--') || text.includes('N/A');
        
        if (hasError && !hasValidValue) {
          console.warn(`Section ${section.name} shows unexpected error state`);
          return false;
        }
      }
    }
    
    return true;
  }
}

module.exports = ContractValuePage;