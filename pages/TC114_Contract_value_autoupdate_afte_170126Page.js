const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Contract Value Component
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.breakdownPopupTrigger = '[data-testid="breakdown-popup-trigger"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    
    // Locators - Search
    this.searchIcon = '[data-testid="search-client-contract"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractWithPurchasingPower = '[data-testid="contract-item-with-power"]';
    
    // Locators - Breakdown Items
    this.purchasingPowerMXN = '[data-testid="breakdown-purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="breakdown-cash-mxn"]';
    this.cashUSD = '[data-testid="breakdown-cash-usd"]';
    this.pendingSettlement = '[data-testid="breakdown-pending-settlement"]';
    this.debtFunds = '[data-testid="breakdown-debt-funds"]';
    this.cedesAndNotes = '[data-testid="breakdown-cedes-notes"]';
    this.moneyMarket = '[data-testid="breakdown-money-market"]';
    this.capitalMarket = '[data-testid="breakdown-capital-market"]';
    
    // Locators - Fund Purchase
    this.fundPurchaseMenu = '[data-testid="fund-purchase-menu"]';
    this.debtFundOption = '[data-testid="debt-fund-option"]';
    this.purchaseAmountInput = '[data-testid="purchase-amount-input"]';
    this.confirmPurchaseButton = '[data-testid="confirm-purchase-button"]';
    this.operationSuccessMessage = '[data-testid="operation-success-message"]';
    
    // Locators - Distribution Tooltip
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async openContractSearch() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async selectContractWithPurchasingPower() {
    await this.page.click(this.contractWithPurchasingPower);
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async getTotalContractValue() {
    const valueText = await this.page.textContent(this.totalContractValue);
    return this.parseMonetaryValue(valueText);
  }

  async openBreakdownPopup() {
    await this.page.click(this.breakdownPopupTrigger);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async getAllBreakdownValues() {
    return {
      purchasingPowerMXN: await this.getBreakdownItemValue(this.purchasingPowerMXN),
      cashMXN: await this.getBreakdownItemValue(this.cashMXN),
      cashUSD: await this.getBreakdownItemValue(this.cashUSD),
      pendingSettlement: await this.getBreakdownItemValue(this.pendingSettlement),
      debtFunds: await this.getBreakdownItemValue(this.debtFunds),
      cedesAndNotes: await this.getBreakdownItemValue(this.cedesAndNotes),
      moneyMarket: await this.getBreakdownItemValue(this.moneyMarket),
      capitalMarket: await this.getBreakdownItemValue(this.capitalMarket)
    };
  }

  async getBreakdownItemValue(selector) {
    const valueText = await this.page.textContent(selector);
    return this.parseMonetaryValue(valueText);
  }

  async getDebtFundsValue() {
    return await this.getBreakdownItemValue(this.debtFunds);
  }

  async navigateToFundPurchase() {
    await this.page.click(this.fundPurchaseMenu);
    await this.page.waitForSelector(this.debtFundOption, { state: 'visible' });
  }

  async selectDebtFund() {
    await this.page.click(this.debtFundOption);
  }

  async enterPurchaseAmount(amount) {
    await this.page.fill(this.purchaseAmountInput, amount.toString());
  }

  async confirmPurchaseOperation() {
    await this.page.click(this.confirmPurchaseButton);
  }

  async waitForOperationSuccess() {
    try {
      await this.page.waitForSelector(this.operationSuccessMessage, { state: 'visible', timeout: 30000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async waitForAutoRefresh() {
    const refreshInterval = parseInt(process.env.REFRESH_INTERVAL_MS) || 30000;
    await this.page.waitForTimeout(refreshInterval);
  }

  async verifyComponentUpdatedWithoutReload() {
    const initialUrl = this.page.url();
    await this.page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        return element && element.getAttribute('data-updated') === 'true';
      },
      this.contractValueComponent,
      { timeout: 60000 }
    ).catch(() => {});
    const currentUrl = this.page.url();
    return initialUrl === currentUrl;
  }

  parseMonetaryValue(text) {
    if (!text) return 0;
    const cleanedText = text.replace(/[^0-9.-]/g, '');
    return parseFloat(cleanedText) || 0;
  }
}

module.exports = ContractValuePage;