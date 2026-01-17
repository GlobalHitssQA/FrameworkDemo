class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractWithNegativeValues = '[data-testid="contract-item-negative-values"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemAmount = '[data-testid="breakdown-item-amount"]';
    this.negativeAmountItem = '[data-testid="negative-amount-item"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.currencyAmountText = '[data-testid="currency-amount"]';
    this.closePopupButton = '[data-testid="close-popup-button"]';
    this.debtFundsSection = '[data-testid="debt-funds-section"]';
    this.equitySection = '[data-testid="equity-section"]';
    this.cashMxnDisplay = '[data-testid="cash-mxn-display"]';
    this.cashUsdDisplay = '[data-testid="cash-usd-display"]';
    this.pendingSettlementSection = '[data-testid="pending-settlement"]';
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyContractWithNegativeValuesExists() {
    await this.page.waitForSelector(this.contractListItem, { state: 'visible', timeout: 10000 });
    const contractExists = await this.page.locator(this.contractWithNegativeValues).count() > 0;
    if (!contractExists) {
      throw new Error('No contract with negative values found');
    }
  }

  async selectContractWithNegativeValues() {
    await this.page.click(this.contractWithNegativeValues);
    await this.page.waitForLoadState('networkidle');
  }

  async clickTotalContractValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async verifyNegativeAmountsFormat() {
    const negativeAmounts = await this.page.locator(this.negativeAmountItem).allTextContents();
    const negativeFormatRegex = /^-\$[\d,]+\.\d{2}$/;
    
    if (negativeAmounts.length === 0) {
      return false;
    }
    
    for (const amount of negativeAmounts) {
      const cleanAmount = amount.trim();
      if (!negativeFormatRegex.test(cleanAmount)) {
        return false;
      }
    }
    return true;
  }

  async verifyTotalContractValueCalculation() {
    const breakdownAmounts = await this.page.locator(this.breakdownItemAmount).allTextContents();
    const totalDisplayed = await this.page.textContent(this.totalValueDisplay);
    
    let calculatedSum = 0;
    for (const amount of breakdownAmounts) {
      const numericValue = parseFloat(amount.replace(/[$,]/g, ''));
      if (!isNaN(numericValue)) {
        calculatedSum += numericValue;
      }
    }
    
    const displayedTotal = parseFloat(totalDisplayed.replace(/[$,]/g, ''));
    const tolerance = 0.01;
    
    return Math.abs(calculatedSum - displayedTotal) <= tolerance;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closePopupButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = ContractBreakdownPage;