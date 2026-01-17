const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators - Search functionality
    this.searchMagnifierButton = '[data-testid="search-magnifier-button"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.searchResultsList = '[data-testid="search-results-list"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    
    // Locators - Contract value component
    this.contractValueComponent = '[data-testid="contract-total-value-component"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    
    // Locators - Breakdown popup
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownSectionsList = '[data-testid="breakdown-sections-list"]';
    this.breakdownSectionItem = '[data-testid="breakdown-section-item"]';
    
    // Locators - Individual sections
    this.sectionPoderCompra = '[data-testid="section-poder-compra-mxn"]';
    this.sectionEfectivoMXN = '[data-testid="section-efectivo-mxn"]';
    this.sectionEfectivoUSD = '[data-testid="section-efectivo-usd"]';
    this.sectionPendientesLiquidar = '[data-testid="section-pendientes-liquidar"]';
    this.sectionFondos = '[data-testid="section-fondos"]';
    this.sectionCedesPagares = '[data-testid="section-cedes-pagares"]';
    this.sectionMercadoDinero = '[data-testid="section-mercado-dinero"]';
    this.sectionMercadoCapitales = '[data-testid="section-mercado-capitales"]';
    
    // Locators - Authentication
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    
    // Section name to locator mapping
    this.sectionLocators = {
      'Poder de compra MXN': this.sectionPoderCompra,
      'Efectivo MXN': this.sectionEfectivoMXN,
      'Efectivo USD': this.sectionEfectivoUSD,
      'Pendientes por liquidar': this.sectionPendientesLiquidar,
      'Fondos': this.sectionFondos,
      'Cedes y pagarés': this.sectionCedesPagares,
      'Mercado de dinero': this.sectionMercadoDinero,
      'Mercado de capitales': this.sectionMercadoCapitales
    };
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible', timeout: 10000 });
  }

  async getZeroBalanceContractNumber() {
    return process.env.ZERO_BALANCE_CONTRACT_NUMBER || 'TEST-CONTRACT-ZERO';
  }

  async clickSearchMagnifier() {
    await this.page.click(this.searchMagnifierButton);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async enterContractNumber(contractNumber) {
    await this.page.fill(this.searchInput, contractNumber);
    await this.page.waitForSelector(this.searchResultsList, { state: 'visible' });
  }

  async selectContractFromResults(contractNumber) {
    const resultItem = this.page.locator(this.searchResultItem).filter({ hasText: contractNumber });
    await resultItem.click();
  }

  async waitForContractToLoad() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }

  async getTotalContractValue() {
    const valueElement = this.page.locator(this.totalValueDisplay);
    await valueElement.waitFor({ state: 'visible' });
    const text = await valueElement.textContent();
    return text.trim();
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async verifyAllSectionsDisplayValue(expectedValue) {
    const sections = this.page.locator(this.breakdownSectionItem);
    const count = await sections.count();
    
    for (let i = 0; i < count; i++) {
      const sectionValue = await sections.nth(i).locator('[data-testid="section-value"]').textContent();
      if (sectionValue.trim() !== expectedValue) {
        return false;
      }
    }
    return true;
  }

  async getSectionValue(sectionName) {
    const sectionLocator = this.sectionLocators[sectionName];
    if (!sectionLocator) {
      throw new Error(`Unknown section: ${sectionName}`);
    }
    
    const section = this.page.locator(sectionLocator);
    await section.waitFor({ state: 'visible' });
    const valueElement = section.locator('[data-testid="section-value"]');
    const text = await valueElement.textContent();
    return text.trim();
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = ContractValuePage;