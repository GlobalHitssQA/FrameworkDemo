class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.searchInput = page.locator('[data-testid="contract-search-input"]');
    this.searchButton = page.locator('[data-testid="contract-search-button"]');
    this.contractListItem = page.locator('[data-testid="contract-list-item"]');
    this.totalValueComponent = page.locator('[data-testid="total-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownAmounts = page.locator('[data-testid="breakdown-amount"]');
    this.userAuthIndicator = page.locator('[data-testid="user-authenticated-indicator"]');
    this.contractLoadedIndicator = page.locator('[data-testid="contract-loaded-indicator"]');
    this.purchasingPowerMXN = page.locator('[data-testid="purchasing-power-mxn"]');
    this.cashMXN = page.locator('[data-testid="cash-mxn"]');
    this.cashUSD = page.locator('[data-testid="cash-usd"]');
    this.fundsList = page.locator('[data-testid="funds-list-item"]');
    this.pendingSettlements = page.locator('[data-testid="pending-settlements"]');
    
    this.decimalFormatRegex = /^\$[0-9]{1,3}(,[0-9]{3})*\.[0-9]{2}$/;
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.userAuthIndicator.waitFor({ state: 'visible', timeout: 10000 });
    return await this.userAuthIndicator.isVisible();
  }

  async verifyContractWithDecimalsExists() {
    await this.contractListItem.first().waitFor({ state: 'visible', timeout: 10000 });
    const contracts = await this.contractListItem.count();
    return contracts > 0;
  }

  async selectContractWithDecimals() {
    await this.contractListItem.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractIsLoaded() {
    await this.contractLoadedIndicator.waitFor({ state: 'visible', timeout: 10000 });
    return await this.contractLoadedIndicator.isVisible();
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.waitFor({ state: 'visible', timeout: 5000 });
    await this.totalValueComponent.click();
  }

  async verifyBreakdownPopupIsVisible() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
    return await this.breakdownPopup.isVisible();
  }

  async verifyAllAmountsHaveCorrectDecimalFormat() {
    const amounts = await this.breakdownAmounts.all();
    
    for (const amount of amounts) {
      const text = await amount.textContent();
      const cleanedText = text.trim();
      
      if (!this.decimalFormatRegex.test(cleanedText)) {
        console.error(`Invalid format found: ${cleanedText}`);
        return false;
      }
    }
    
    return true;
  }

  async verifyDisplayedValuesMatchSystemValues() {
    const displayedAmounts = await this.breakdownAmounts.all();
    const displayedValues = [];
    
    for (const amount of displayedAmounts) {
      const text = await amount.textContent();
      const numericValue = this.parseFormattedAmount(text.trim());
      displayedValues.push(numericValue);
    }
    
    const systemValues = await this.getSystemValues();
    
    for (let i = 0; i < displayedValues.length; i++) {
      const displayed = displayedValues[i];
      const system = systemValues[i];
      const roundedSystem = Math.round(system * 100) / 100;
      
      if (Math.abs(displayed - roundedSystem) > 0.001) {
        console.error(`Mismatch: displayed ${displayed} vs system ${roundedSystem}`);
        return false;
      }
    }
    
    return true;
  }

  parseFormattedAmount(formattedAmount) {
    const cleaned = formattedAmount.replace(/[$,]/g, '');
    return parseFloat(cleaned);
  }

  async getSystemValues() {
    const response = await this.page.evaluate(async () => {
      const res = await fetch('/api/contract/breakdown-values');
      return res.json();
    });
    return response.values || [];
  }
}

module.exports = ContractBreakdownPage;