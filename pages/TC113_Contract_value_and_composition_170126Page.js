class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.searchMagnifyingGlass = page.locator('[data-testid="search-magnifying-glass"]');
    this.searchInput = page.locator('[data-testid="contract-search-input"]');
    this.contractSearchResults = page.locator('[data-testid="contract-search-results"]');
    this.contractResultItem = page.locator('[data-testid="contract-result-item"]');
    this.totalValueComponent = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="value-breakdown-popup"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
    this.mainScreen = page.locator('[data-testid="acticenter-main-screen"]');
    this.contractInfo = page.locator('[data-testid="contract-general-info"]');
    this.closeBreakdownButton = page.locator('[data-testid="close-breakdown-button"]');
    
    // Breakdown value items
    this.poderCompraMXN = page.locator('[data-testid="breakdown-poder-compra-mxn"]');
    this.efectivoMXN = page.locator('[data-testid="breakdown-efectivo-mxn"]');
    this.efectivoUSD = page.locator('[data-testid="breakdown-efectivo-usd"]');
    this.pendientesLiquidar = page.locator('[data-testid="breakdown-pendientes-liquidar"]');
    this.fondos = page.locator('[data-testid="breakdown-fondos"]');
    this.cedesPagares = page.locator('[data-testid="breakdown-cedes-pagares"]');
    this.mercadoDinero = page.locator('[data-testid="breakdown-mercado-dinero"]');
    this.mercadoCapitales = page.locator('[data-testid="breakdown-mercado-capitales"]');
    this.loadingSpinner = page.locator('[data-testid="breakdown-loading-spinner"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || '/acticenter');
  }

  async verifyMainScreenIsDisplayed() {
    await this.mainScreen.waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickSearchMagnifyingGlass() {
    await this.searchMagnifyingGlass.click();
    await this.searchInput.waitFor({ state: 'visible' });
  }

  async searchAndSelectContract() {
    const testContractNumber = process.env.TEST_CONTRACT_NUMBER || '123456';
    await this.searchInput.fill(testContractNumber);
    await this.contractSearchResults.waitFor({ state: 'visible' });
    await this.contractResultItem.first().click();
  }

  async verifyContractInformationIsDisplayed() {
    await this.contractInfo.waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.click();
  }

  async waitForBreakdownToLoad() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
    const spinnerVisible = await this.loadingSpinner.isVisible();
    if (spinnerVisible) {
      await this.loadingSpinner.waitFor({ state: 'hidden', timeout: 5000 });
    }
    await this.breakdownItemsList.waitFor({ state: 'visible' });
  }

  async verifyAllBreakdownValuesAreLoaded() {
    const breakdownItems = [
      this.poderCompraMXN,
      this.efectivoMXN,
      this.efectivoUSD,
      this.pendientesLiquidar,
      this.fondos,
      this.cedesPagares,
      this.mercadoDinero,
      this.mercadoCapitales
    ];
    
    for (const item of breakdownItems) {
      const isVisible = await item.isVisible();
      if (isVisible) {
        const text = await item.textContent();
        if (!text || text.trim() === '') {
          throw new Error('Breakdown item is visible but has no value');
        }
      }
    }
  }

  async closeBreakdownPopup() {
    await this.closeBreakdownButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }
}

module.exports = ActicenterPage;