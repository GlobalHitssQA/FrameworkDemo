const { expect } = require('@playwright/test');

class ConcurrentContractPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Contract search locators
    this.searchClientContractIcon = '[data-testid="search-client-contract-icon"]';
    this.searchInput = '[data-testid="search-input"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    
    // Contract value component locators
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.contractValueAmount = '[data-testid="contract-value-amount"]';
    this.compositionBreakdownTrigger = '[data-testid="composition-breakdown-trigger"]';
    this.compositionPopup = '[data-testid="composition-popup"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    
    // Composition breakdown locators
    this.poderCompraMxnValue = '[data-testid="poder-compra-mxn-value"]';
    this.efectivoMxnValue = '[data-testid="efectivo-mxn-value"]';
    this.efectivoUsdValue = '[data-testid="efectivo-usd-value"]';
    this.pendientesLiquidarValue = '[data-testid="pendientes-liquidar-value"]';
    this.fondosValue = '[data-testid="fondos-value"]';
    this.cedesPagaresValue = '[data-testid="cedes-pagares-value"]';
    this.mercadoDineroValue = '[data-testid="mercado-dinero-value"]';
    this.mercadoCapitalesValue = '[data-testid="mercado-capitales-value"]';
    
    // Fund operations locators
    this.fundsPurchaseButton = '[data-testid="funds-purchase-button"]';
    this.fundsPurchaseDialog = '[data-testid="funds-purchase-dialog"]';
    this.fundSelector = '[data-testid="fund-selector"]';
    this.purchaseAmountInput = '[data-testid="purchase-amount-input"]';
    this.confirmPurchaseButton = '[data-testid="confirm-purchase-button"]';
    
    // Operation status locators
    this.operationStatusIndicator = '[data-testid="operation-status"]';
    this.operationSuccessMessage = '[data-testid="operation-success"]';
    this.operationErrorMessage = '[data-testid="operation-error"]';
    
    // Refresh locators
    this.refreshComponentButton = '[data-testid="refresh-component-button"]';
    
    // Distribution tooltip
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
  }

  async navigateToContract() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithCredentials(credentials) {
    await this.page.fill(this.usernameInput, credentials.username);
    await this.page.fill(this.passwordInput, credentials.password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectContract(contractId) {
    await this.page.click(this.searchClientContractIcon);
    await this.page.fill(this.searchInput, contractId);
    await this.page.waitForSelector(this.searchResultItem);
    await this.page.click(`${this.searchResultItem}[data-contract-id="${contractId}"]`);
    await this.page.waitForSelector(this.totalContractValueComponent);
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.contractValueAmount);
    const valueText = await this.page.textContent(this.contractValueAmount);
    return this.parseMonetaryValue(valueText);
  }

  async getContractComposition() {
    await this.page.click(this.compositionBreakdownTrigger);
    await this.page.waitForSelector(this.compositionPopup);
    
    const composition = {
      poderCompraMxn: this.parseMonetaryValue(await this.page.textContent(this.poderCompraMxnValue)),
      efectivoMxn: this.parseMonetaryValue(await this.page.textContent(this.efectivoMxnValue)),
      efectivoUsd: this.parseMonetaryValue(await this.page.textContent(this.efectivoUsdValue)),
      pendientesLiquidar: this.parseMonetaryValue(await this.page.textContent(this.pendientesLiquidarValue)),
      fondos: this.parseMonetaryValue(await this.page.textContent(this.fondosValue)),
      cedesPagares: this.parseMonetaryValue(await this.page.textContent(this.cedesPagaresValue)),
      mercadoDinero: this.parseMonetaryValue(await this.page.textContent(this.mercadoDineroValue)),
      mercadoCapitales: this.parseMonetaryValue(await this.page.textContent(this.mercadoCapitalesValue))
    };
    
    await this.page.click(this.closeBreakdownButton);
    return composition;
  }

  async openFundsPurchaseDialog() {
    await this.page.click(this.fundsPurchaseButton);
    await this.page.waitForSelector(this.fundsPurchaseDialog);
  }

  async selectFundForPurchase(fundId) {
    await this.page.click(this.fundSelector);
    await this.page.click(`[data-testid="fund-option-${fundId}"]`);
  }

  async enterPurchaseAmount(amount) {
    await this.page.fill(this.purchaseAmountInput, amount.toString());
  }

  async confirmFundPurchase() {
    await this.page.click(this.confirmPurchaseButton);
    await this.page.waitForSelector(this.operationStatusIndicator);
  }

  async getOperationStatus() {
    const successVisible = await this.page.isVisible(this.operationSuccessMessage);
    if (successVisible) {
      return 'success';
    }
    const errorVisible = await this.page.isVisible(this.operationErrorMessage);
    if (errorVisible) {
      return 'error';
    }
    return 'pending';
  }

  async refreshContractComponent() {
    await this.page.click(this.refreshComponentButton);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(this.totalContractValueComponent);
  }

  async executeCategoryOperation(category, amount) {
    const categoryButtonSelector = `[data-testid="operation-${category}-button"]`;
    const categoryAmountSelector = `[data-testid="operation-${category}-amount"]`;
    const categoryConfirmSelector = `[data-testid="operation-${category}-confirm"]`;
    
    await this.page.click(categoryButtonSelector);
    await this.page.fill(categoryAmountSelector, amount.toString());
    await this.page.click(categoryConfirmSelector);
    await this.page.waitForSelector(this.operationStatusIndicator);
  }

  async queryBackendContractData(contractId) {
    const response = await this.page.request.get(
      `${this.baseUrl}/api/contracts/${contractId}/summary`
    );
    const data = await response.json();
    return {
      totalValue: data.totalValue,
      composition: {
        poderCompraMxn: data.composition.poderCompraMxn,
        efectivoMxn: data.composition.efectivoMxn,
        efectivoUsd: data.composition.efectivoUsd,
        pendientesLiquidar: data.composition.pendientesLiquidar,
        fondos: data.composition.fondos,
        cedesPagares: data.composition.cedesPagares,
        mercadoDinero: data.composition.mercadoDinero,
        mercadoCapitales: data.composition.mercadoCapitales
      }
    };
  }

  parseMonetaryValue(valueText) {
    if (!valueText) return 0;
    const cleanedValue = valueText.replace(/[^0-9.-]/g, '');
    return parseFloat(cleanedValue) || 0;
  }

  async isCompositionPopupVisible() {
    return await this.page.isVisible(this.compositionPopup);
  }

  async getDistributionTooltipContent() {
    await this.page.hover(this.totalContractValueComponent);
    await this.page.waitForSelector(this.distributionTooltip);
    return await this.page.textContent(this.distributionTooltip);
  }
}

module.exports = ConcurrentContractPage;