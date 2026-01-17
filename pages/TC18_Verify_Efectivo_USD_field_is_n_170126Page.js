const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators - Main Navigation
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.searchContractInput = '[data-testid="search-contract-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.searchIcon = '[data-testid="search-icon-lupa"]';
    
    // Locators - Contract Selection
    this.contractList = '[data-testid="contract-list"]';
    this.bancoPersonaFisicaContract = '[data-testid="contract-banco-persona-fisica"]';
    this.contractWithoutMexdolar = '[data-testid="contract-without-mexdolar"]';
    
    // Locators - Contract Value Component
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.contractValueAmount = '[data-testid="contract-value-amount"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    
    // Locators - Specific Breakdown Fields
    this.efectivoUSDField = '[data-testid="breakdown-efectivo-usd"]';
    this.efectivoMXNField = '[data-testid="breakdown-efectivo-mxn"]';
    this.poderCompraMXNField = '[data-testid="breakdown-poder-compra-mxn"]';
    this.pendientesPorLiquidarField = '[data-testid="breakdown-pendientes-liquidar"]';
    this.fondosField = '[data-testid="breakdown-fondos"]';
    this.cedesYPagaresField = '[data-testid="breakdown-cedes-pagares"]';
    this.mercadoDineroField = '[data-testid="breakdown-mercado-dinero"]';
    this.mercadoCapitalesField = '[data-testid="breakdown-mercado-capitales"]';
    
    // Locators - Distribution Tooltip
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
  }

  async navigateToActicenter() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async searchContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchContractInput, { state: 'visible' });
  }

  async selectBancoPersonaFisicaContractWithoutMexdolar() {
    await this.page.click(this.contractWithoutMexdolar);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractValueComponentIsDisplayed() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickOnTotalContractValue() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isEfectivoUSDVisible() {
    return await this.page.isVisible(this.efectivoUSDField);
  }

  async isEfectivoMXNVisible() {
    return await this.page.isVisible(this.efectivoMXNField);
  }

  async getBreakdownItemsList() {
    const items = await this.page.locator(this.breakdownItem).allTextContents();
    return items;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async getContractValueAmount() {
    return await this.page.textContent(this.contractValueAmount);
  }

  async verifyApplicableFieldsDisplayed() {
    const efectivoMXN = await this.page.isVisible(this.efectivoMXNField);
    const poderCompra = await this.page.isVisible(this.poderCompraMXNField);
    return efectivoMXN || poderCompra;
  }
};

module.exports = ContractBreakdownPage;