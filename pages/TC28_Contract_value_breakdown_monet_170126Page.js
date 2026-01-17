class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.totalValueComponent = '[data-testid="contract-total-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.monetaryAmountItems = '[data-testid="monetary-amount"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.userAuthenticatedIndicator = '[data-testid="user-authenticated"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userAuthenticatedIndicator, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithMultipleItems() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTotalValueComponentIsVisible() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getAllMonetaryAmounts() {
    const amounts = [];
    const elements = await this.page.$$(this.monetaryAmountItems);
    
    for (const element of elements) {
      const text = await element.textContent();
      if (text) {
        amounts.push(text.trim());
      }
    }
    
    const additionalSelectors = [
      this.purchasingPowerMXN,
      this.cashMXN,
      this.cashUSD,
      this.debtFunds,
      this.hedgeFunds,
      this.equityFunds,
      this.moneyMarket,
      this.capitalMarket,
      this.pendingSettlement
    ];
    
    for (const selector of additionalSelectors) {
      const element = await this.page.$(selector);
      if (element) {
        const text = await element.textContent();
        if (text) {
          amounts.push(text.trim());
        }
      }
    }
    
    return amounts;
  }

  validateThousandSeparator(amount) {
    const pattern = /^\$[\d,]+\.\d{2}$/;
    return pattern.test(amount);
  }

  validateTwoDecimalPlaces(amount) {
    const pattern = /\.\d{2}$/;
    return pattern.test(amount);
  }

  extractNumericValue(amount) {
    const cleanedAmount = amount.replace(/[\$,]/g, '');
    return parseFloat(cleanedAmount);
  }

  validateThousandSeparatorForLargeAmounts(amount) {
    const numericPart = amount.replace('$', '').split('.')[0];
    const digits = numericPart.replace(/,/g, '');
    
    if (digits.length <= 3) {
      return true;
    }
    
    const expectedCommas = Math.floor((digits.length - 1) / 3);
    const actualCommas = (numericPart.match(/,/g) || []).length;
    
    return expectedCommas === actualCommas;
  }

  validatePesoSymbol(amount) {
    return amount.startsWith('$');
  }

  async closeBreakdownPopup() {
    await this.page.click('body', { position: { x: 0, y: 0 } });
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 3000 });
  }
}

module.exports = ContractBreakdownPage;