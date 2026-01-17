const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.loginUsernameInput = '[data-testid="login-username-input"]';
    this.loginPasswordInput = '[data-testid="login-password-input"]';
    this.loginSubmitButton = '[data-testid="login-submit-button"]';
    
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractWithoutMXNCash = '[data-testid="contract-item-no-mxn-cash"]';
    
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    
    this.mxnCashItem = '[data-testid="breakdown-item-efectivo-mxn"]';
    this.mxnCashValueLabel = '[data-testid="efectivo-mxn-value"]';
    
    this.usdCashItem = '[data-testid="breakdown-item-efectivo-usd"]';
    this.purchasePowerItem = '[data-testid="breakdown-item-poder-compra"]';
    this.debtFundsItem = '[data-testid="breakdown-item-fondos-deuda"]';
    this.hedgeFundsItem = '[data-testid="breakdown-item-fondos-cobertura"]';
    this.equityFundsItem = '[data-testid="breakdown-item-renta-variable"]';
    this.moneyMarketItem = '[data-testid="breakdown-item-mercado-dinero"]';
    this.capitalMarketItem = '[data-testid="breakdown-item-capitales"]';
    this.pendingSettlementItem = '[data-testid="breakdown-item-pendientes-liquidar"]';
    
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    this.contractLoadedIndicator = '[data-testid="contract-loaded-indicator"]';
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://ota-acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async performAuthentication() {
    await this.page.fill(this.loginUsernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(this.loginPasswordInput, process.env.TEST_PASSWORD || 'testpassword');
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractWithoutMXNCashExists() {
    await this.page.waitForSelector(this.contractListItem, { timeout: 10000 });
    const contractExists = await this.page.isVisible(this.contractWithoutMXNCash);
    return contractExists;
  }

  async selectContractWithoutMXNCash() {
    await this.page.click(this.contractWithoutMXNCash);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractLoaded() {
    await this.page.waitForSelector(this.contractLoadedIndicator, { timeout: 10000 });
    return await this.page.isVisible(this.contractLoadedIndicator);
  }

  async clickTotalContractValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent, { timeout: 10000 });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async locateMXNCashItem() {
    await this.page.waitForSelector(this.mxnCashItem, { timeout: 5000 });
  }

  async getMXNCashValue() {
    const valueElement = this.page.locator(this.mxnCashItem).locator(this.breakdownItemValue);
    return await valueElement.textContent();
  }

  async getItemsWithBalance() {
    const items = [];
    const breakdownItems = [
      { selector: this.usdCashItem, name: 'Efectivo USD' },
      { selector: this.purchasePowerItem, name: 'Poder de Compra' },
      { selector: this.debtFundsItem, name: 'Fondos Deuda' },
      { selector: this.hedgeFundsItem, name: 'Fondos Cobertura' },
      { selector: this.equityFundsItem, name: 'Renta Variable' },
      { selector: this.moneyMarketItem, name: 'Mercado Dinero' },
      { selector: this.capitalMarketItem, name: 'Capitales' },
      { selector: this.pendingSettlementItem, name: 'Pendientes Liquidar' }
    ];

    for (const item of breakdownItems) {
      const isVisible = await this.page.isVisible(item.selector);
      if (isVisible) {
        const valueElement = this.page.locator(item.selector).locator(this.breakdownItemValue);
        const value = await valueElement.textContent();
        if (value && value !== '$0.00') {
          items.push({ name: item.name, value: value.trim() });
        }
      }
    }
    return items;
  }

  async getItemsWithoutBalance() {
    const items = [];
    const breakdownItems = [
      { selector: this.mxnCashItem, name: 'Efectivo MXN' },
      { selector: this.usdCashItem, name: 'Efectivo USD' },
      { selector: this.purchasePowerItem, name: 'Poder de Compra' },
      { selector: this.debtFundsItem, name: 'Fondos Deuda' },
      { selector: this.hedgeFundsItem, name: 'Fondos Cobertura' },
      { selector: this.equityFundsItem, name: 'Renta Variable' },
      { selector: this.moneyMarketItem, name: 'Mercado Dinero' },
      { selector: this.capitalMarketItem, name: 'Capitales' },
      { selector: this.pendingSettlementItem, name: 'Pendientes Liquidar' }
    ];

    for (const item of breakdownItems) {
      const isVisible = await this.page.isVisible(item.selector);
      if (isVisible) {
        const valueElement = this.page.locator(item.selector).locator(this.breakdownItemValue);
        const value = await valueElement.textContent();
        if (value && value === '$0.00') {
          items.push({ name: item.name, value: value.trim() });
        }
      }
    }
    return items;
  }
}

module.exports = ContractBreakdownPage;