const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.activeContractItem = '[data-testid="active-contract-item"]';
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.totalValueAmount = '[data-testid="total-value-amount"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    this.breakdownItemRow = '[data-testid="breakdown-item-row"]';
    this.cashMxnValue = '[data-testid="cash-mxn-value"]';
    this.cashUsdValue = '[data-testid="cash-usd-value"]';
    this.purchasePowerMxn = '[data-testid="purchase-power-mxn"]';
    this.debtFundsValue = '[data-testid="debt-funds-value"]';
    this.hedgeFundsValue = '[data-testid="hedge-funds-value"]';
    this.equityFundsValue = '[data-testid="equity-funds-value"]';
    this.moneyMarketValue = '[data-testid="money-market-value"]';
    this.capitalMarketValue = '[data-testid="capital-market-value"]';
    this.pendingSettlementValue = '[data-testid="pending-settlement-value"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpass';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.activeContractItem);
    await this.page.click(this.activeContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.totalValueAmount);
    const valueText = await this.page.textContent(this.totalValueAmount);
    return this.parseMonetaryValue(valueText);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async calculateBreakdownItemsSum() {
    const breakdownSelectors = [
      this.cashMxnValue,
      this.cashUsdValue,
      this.purchasePowerMxn,
      this.debtFundsValue,
      this.hedgeFundsValue,
      this.equityFundsValue,
      this.moneyMarketValue,
      this.capitalMarketValue,
      this.pendingSettlementValue
    ];

    let totalSum = 0;

    for (const selector of breakdownSelectors) {
      const isPresent = await this.page.isVisible(selector);
      if (isPresent) {
        const valueText = await this.page.textContent(selector);
        const numericValue = this.parseMonetaryValue(valueText);
        totalSum += numericValue;
      }
    }

    const additionalItems = await this.page.$$(this.breakdownItemValue);
    for (const item of additionalItems) {
      const valueText = await item.textContent();
      const numericValue = this.parseMonetaryValue(valueText);
      totalSum += numericValue;
    }

    return totalSum;
  }

  async verifyZeroValueItemsDisplay() {
    const breakdownItems = await this.page.$$(this.breakdownItemRow);
    
    for (const item of breakdownItems) {
      const valueElement = await item.$(this.breakdownItemValue.replace('[data-testid="', '[data-testid^="'));
      if (valueElement) {
        const valueText = await valueElement.textContent();
        const numericValue = this.parseMonetaryValue(valueText);
        
        if (numericValue === 0) {
          const hasZeroFormat = valueText.includes('0.00') || 
                               valueText.includes('0,00') || 
                               valueText.includes('$0');
          if (!hasZeroFormat) {
            return false;
          }
        }
      }
    }
    return true;
  }

  parseMonetaryValue(valueText) {
    if (!valueText) return 0;
    const cleanedValue = valueText
      .replace(/[$,MXN,USD,\s]/g, '')
      .replace(/,/g, '')
      .trim();
    const numericValue = parseFloat(cleanedValue);
    return isNaN(numericValue) ? 0 : numericValue;
  }

  async closeBreakdownPopup() {
    await this.page.click('body', { position: { x: 0, y: 0 } });
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;