class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.contractTotalValueComponent = '[data-testid="contract-total-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.searchContractInput = '[data-testid="search-contract-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.breakdownToggleButton = '[data-testid="breakdown-toggle"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown"]';
    this.amountFields = '[data-testid="amount-field"]';
    this.breakdownItemAmount = '[data-testid="breakdown-item-amount"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.fundsAmount = '[data-testid="funds-amount"]';
    this.cedesAndNotes = '[data-testid="cedes-notes"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    this.regionalConfigIndicator = '[data-testid="regional-config-indicator"]';
    
    // Mexican number format regex: comma for thousands, period for decimals
    this.mexicanFormatRegex = /^\$?-?[\d]{1,3}(,[\d]{3})*\.[\d]{2}$/;
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMexicanRegionalConfigLoaded() {
    await this.page.waitForSelector(this.regionalConfigIndicator, { state: 'visible', timeout: 10000 });
    const configText = await this.page.locator(this.regionalConfigIndicator).textContent();
    return configText.includes('MX') || configText.includes('Mexico');
  }

  async selectContract() {
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.locator(this.contractListItem).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async expandValueBreakdown() {
    await this.page.waitForSelector(this.contractTotalValueComponent, { state: 'visible' });
    await this.page.locator(this.contractTotalValueComponent).click();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async getAllDisplayedAmounts() {
    const amounts = [];
    const amountElements = await this.page.locator(this.amountFields).all();
    for (const element of amountElements) {
      const text = await element.textContent();
      if (text) {
        amounts.push(text.trim());
      }
    }
    return amounts;
  }

  async getBreakdownItemAmounts() {
    const items = [];
    const selectors = [
      this.purchasingPowerMXN,
      this.cashMXN,
      this.cashUSD,
      this.pendingSettlement,
      this.fundsAmount,
      this.cedesAndNotes,
      this.moneyMarket,
      this.capitalMarket
    ];
    
    for (const selector of selectors) {
      const element = this.page.locator(selector);
      if (await element.isVisible()) {
        const text = await element.textContent();
        if (text) {
          items.push(text.trim());
        }
      }
    }
    return items;
  }

  validateMexicanNumberFormat(amount) {
    const cleanAmount = amount.replace(/[\s]/g, '');
    return this.mexicanFormatRegex.test(cleanAmount);
  }

  hasPointAsDecimalSeparator(amount) {
    const cleanAmount = amount.replace(/[\s$]/g, '');
    const parts = cleanAmount.split('.');
    return parts.length === 2 && parts[1].length === 2;
  }

  hasCommaAsThousandSeparator(amount) {
    const cleanAmount = amount.replace(/[\s$]/g, '');
    const integerPart = cleanAmount.split('.')[0];
    if (integerPart.length > 3) {
      const commaPattern = /^-?[\d]{1,3}(,[\d]{3})*$/;
      return commaPattern.test(integerPart);
    }
    return true;
  }

  hasTwoDecimalPlaces(amount) {
    const cleanAmount = amount.replace(/[\s$]/g, '');
    const decimalMatch = cleanAmount.match(/\.([\d]+)$/);
    return decimalMatch && decimalMatch[1].length === 2;
  }

  validateRegionalCompliance(amounts) {
    const results = {
      isCompliant: true,
      failedAmounts: []
    };
    
    for (const amount of amounts) {
      const isValid = this.validateMexicanNumberFormat(amount) &&
                      this.hasPointAsDecimalSeparator(amount) &&
                      this.hasTwoDecimalPlaces(amount);
      
      if (!isValid) {
        results.isCompliant = false;
        results.failedAmounts.push(amount);
      }
    }
    
    return results;
  }

  async closeBreakdown() {
    await this.page.locator(this.closeBreakdownButton).click();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async searchContract(contractId) {
    await this.page.locator(this.searchContractInput).fill(contractId);
    await this.page.locator(this.searchButton).click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = ContractBreakdownPage;