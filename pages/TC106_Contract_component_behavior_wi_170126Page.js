class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.authenticatedUserIndicator = '[data-testid="user-authenticated-indicator"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.largeValueContract = '[data-testid="contract-item-large-values"]';
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItems = '[data-testid="breakdown-item"]';
    this.monetaryValueDisplay = '[data-testid="monetary-value"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.popupContainer = '[data-testid="popup-container"]';
    this.contractLoadedIndicator = '[data-testid="contract-loaded"]';
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.authenticatedUserIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyLargeValueContractIsAvailable() {
    await this.page.waitForSelector(this.largeValueContract, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithLargeValues() {
    await this.page.click(this.largeValueContract);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractLoaded() {
    return await this.page.isVisible(this.contractLoadedIndicator);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async verifyValuesNotTruncated() {
    const items = await this.page.$$(this.monetaryValueDisplay);
    for (const item of items) {
      const text = await item.textContent();
      const scrollWidth = await item.evaluate(el => el.scrollWidth);
      const clientWidth = await item.evaluate(el => el.clientWidth);
      if (scrollWidth > clientWidth) {
        return false;
      }
    }
    return true;
  }

  async verifyMonetaryFormat() {
    const monetaryFormatRegex = /^\$[0-9]{1,3}(,[0-9]{3})*\.[0-9]{2}$/;
    const items = await this.page.$$(this.monetaryValueDisplay);
    for (const item of items) {
      const text = await item.textContent();
      const cleanText = text.trim();
      if (!monetaryFormatRegex.test(cleanText)) {
        return false;
      }
    }
    return true;
  }

  async verifyPopupHasNoOverflow() {
    const popup = await this.page.$(this.popupContainer);
    if (!popup) return false;
    
    const hasOverflow = await popup.evaluate(el => {
      return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
    });
    
    const computedStyle = await popup.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        overflowX: style.overflowX,
        overflowY: style.overflowY
      };
    });
    
    const isOverflowHidden = computedStyle.overflowX === 'hidden' || computedStyle.overflowY === 'hidden';
    
    return !hasOverflow || isOverflowHidden;
  }

  async verifyTotalValueCalculation() {
    const items = await this.page.$$(this.monetaryValueDisplay);
    let calculatedSum = 0;
    
    for (const item of items) {
      const text = await item.textContent();
      const numericValue = parseFloat(text.replace(/[$,]/g, ''));
      if (!isNaN(numericValue)) {
        calculatedSum += numericValue;
      }
    }
    
    const totalElement = await this.page.$(this.totalContractValue);
    const totalText = await totalElement.textContent();
    const displayedTotal = parseFloat(totalText.replace(/[$,]/g, ''));
    
    return Math.abs(calculatedSum - displayedTotal) < 0.01;
  }
}

module.exports = ContractValuePage;