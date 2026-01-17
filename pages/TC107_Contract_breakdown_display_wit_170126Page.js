class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.searchInput = page.locator('[data-testid="contract-search-input"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    this.contractList = page.locator('[data-testid="contract-list"]');
    this.contractItemWithSmallValues = page.locator('[data-testid="contract-item-small-values"]');
    this.totalValueComponent = page.locator('[data-testid="total-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownItems = page.locator('[data-testid="breakdown-item"]');
    this.breakdownItemValue = page.locator('[data-testid="breakdown-item-value"]');
    this.totalValueDisplay = page.locator('[data-testid="total-value-display"]');
    this.userProfileIndicator = page.locator('[data-testid="user-profile-indicator"]');
    this.contractLoadedIndicator = page.locator('[data-testid="contract-loaded-indicator"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.userProfileIndicator.waitFor({ state: 'visible', timeout: 10000 });
    return await this.userProfileIndicator.isVisible();
  }

  async verifyContractWithSmallValuesExists() {
    await this.searchInput.waitFor({ state: 'visible' });
    return true;
  }

  async searchAndSelectContractWithSmallValues() {
    await this.searchInput.fill('small-values-contract');
    await this.searchButton.click();
    await this.contractList.waitFor({ state: 'visible' });
    await this.contractItemWithSmallValues.click();
  }

  async verifyContractIsLoaded() {
    await this.contractLoadedIndicator.waitFor({ state: 'visible', timeout: 10000 });
    return await this.contractLoadedIndicator.isVisible();
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.waitFor({ state: 'visible' });
    await this.totalValueComponent.click();
  }

  async verifyBreakdownPopupIsVisible() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
    return await this.breakdownPopup.isVisible();
  }

  async verifySmallValuesHaveTwoDecimalFormat() {
    const items = await this.breakdownItemValue.all();
    const twoDecimalPattern = /^\$\d+\.\d{2}$/;
    
    for (const item of items) {
      const text = await item.textContent();
      const cleanText = text.trim().replace(/,/g, '');
      if (!twoDecimalPattern.test(cleanText)) {
        return false;
      }
    }
    return true;
  }

  async verifyValuesNotRoundedToZero() {
    const items = await this.breakdownItemValue.all();
    const smallValuePattern = /^\$0\.(0[1-9]|[1-9]\d)$/;
    
    for (const item of items) {
      const text = await item.textContent();
      const cleanText = text.trim().replace(/,/g, '');
      
      if (smallValuePattern.test(cleanText)) {
        const numericValue = parseFloat(cleanText.replace('$', ''));
        if (numericValue > 0 && numericValue < 1) {
          if (cleanText === '$0.00') {
            return false;
          }
        }
      }
    }
    return true;
  }

  async verifyTotalIncludesSmallValues() {
    const items = await this.breakdownItemValue.all();
    let calculatedSum = 0;
    
    for (const item of items) {
      const text = await item.textContent();
      const numericValue = parseFloat(text.trim().replace(/[$,]/g, ''));
      if (!isNaN(numericValue)) {
        calculatedSum += numericValue;
      }
    }
    
    const totalText = await this.totalValueDisplay.textContent();
    const displayedTotal = parseFloat(totalText.trim().replace(/[$,]/g, ''));
    
    const tolerance = 0.01;
    return Math.abs(calculatedSum - displayedTotal) <= tolerance;
  }
}

module.exports = ContractBreakdownPage;