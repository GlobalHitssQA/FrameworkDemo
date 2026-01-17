const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownTrigger = '[data-testid="breakdown-trigger"]';
    this.searchButton = '[data-testid="search-client-contract"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.bankContractOption = '[data-testid="bank-contract-option"]';
    
    this.cashInTransitField = '[data-testid="cash-in-transit"]';
    this.cashInTransitValue = '[data-testid="cash-in-transit-value"]';
    this.cashInTransitError = '[data-testid="cash-in-transit-error"]';
    
    this.cashMXNField = '[data-testid="cash-mxn"]';
    this.cashMXNValue = '[data-testid="cash-mxn-value"]';
    this.cashUSDField = '[data-testid="cash-usd"]';
    this.cashUSDValue = '[data-testid="cash-usd-value"]';
    this.fundsField = '[data-testid="funds-section"]';
    this.pendingSettlementField = '[data-testid="pending-settlement"]';
    this.purchasingPowerField = '[data-testid="purchasing-power-mxn"]';
    
    this.userAvatar = '[data-testid="user-avatar"]';
    this.authIndicator = '[data-testid="auth-indicator"]';
    
    this.errorIndicator = '[data-testid="error-indicator"]';
    this.partialErrorBanner = '[data-testid="partial-error-banner"]';
  }

  async simulateSAPPrenotesServiceFailure() {
    await this.page.route('**/api/sap/prenotes/**', (route) => {
      route.abort('failed');
    });
    await this.page.route('**/api/cash-in-transit/**', (route) => {
      route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Service Unavailable', message: 'SAP prenotes service is not responding' })
      });
    });
  }

  async navigateToActicenter() {
    await this.page.goto('/acticenter');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    const isAuthenticated = await this.page.locator(this.userAvatar).isVisible() ||
                           await this.page.locator(this.authIndicator).isVisible();
    return isAuthenticated;
  }

  async openContractSearch() {
    await this.page.locator(this.searchButton).click();
    await this.page.locator(this.contractSearchInput).waitFor({ state: 'visible' });
  }

  async selectBankContractWithCashInTransit() {
    await this.page.locator(this.contractSearchInput).fill('BANCO');
    await this.page.locator(this.bankContractOption).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.page.locator(this.contractValueComponent).isVisible();
  }

  async hasCashInTransitErrorIndicator() {
    const hasErrorIndicator = await this.page.locator(this.errorIndicator).isVisible();
    const hasPartialError = await this.page.locator(this.partialErrorBanner).isVisible();
    const cashInTransitHasError = await this.page.locator(this.cashInTransitError).isVisible();
    return hasErrorIndicator || hasPartialError || cashInTransitHasError;
  }

  async openBreakdownPopup() {
    await this.page.locator(this.breakdownTrigger).click();
    await this.page.locator(this.breakdownPopup).waitFor({ state: 'visible' });
  }

  async getCashInTransitValue() {
    const errorVisible = await this.page.locator(this.cashInTransitError).isVisible();
    if (errorVisible) {
      return await this.page.locator(this.cashInTransitError).textContent();
    }
    return await this.page.locator(this.cashInTransitValue).textContent();
  }

  async isCashMXNFieldVisible() {
    return await this.page.locator(this.cashMXNField).isVisible();
  }

  async isCashUSDFieldVisible() {
    return await this.page.locator(this.cashUSDField).isVisible();
  }

  async isFundsFieldVisible() {
    return await this.page.locator(this.fundsField).isVisible();
  }

  async isPendingSettlementFieldVisible() {
    return await this.page.locator(this.pendingSettlementField).isVisible();
  }

  async isPurchasingPowerFieldVisible() {
    return await this.page.locator(this.purchasingPowerField).isVisible();
  }

  async getCashMXNValue() {
    return await this.page.locator(this.cashMXNValue).textContent();
  }

  async getCashUSDValue() {
    return await this.page.locator(this.cashUSDValue).textContent();
  }
}

module.exports = ContractValuePage;