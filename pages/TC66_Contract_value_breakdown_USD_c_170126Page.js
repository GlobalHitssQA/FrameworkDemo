class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.authenticatedIndicator = '[data-testid="user-authenticated-indicator"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.usdContractOption = '[data-testid="contract-usd-currency"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.usdCashItem = '[data-testid="breakdown-item-efectivo-usd"]';
    this.usdCashItemText = '[data-testid="breakdown-item-efectivo-usd-text"]';
    this.breakdownCloseButton = '[data-testid="breakdown-popup-close-button"]';
    
    this.expectedUsdCashTextColor = '#1A1A1A';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.authenticatedIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyUsdContractIsAvailable() {
    const usdContract = this.page.locator(this.usdContractOption);
    await usdContract.waitFor({ state: 'attached', timeout: 10000 });
  }

  async selectUsdContract() {
    await this.page.click(this.usdContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueComponentVisible() {
    const component = this.page.locator(this.totalContractValueComponent);
    return await component.isVisible();
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    const popup = this.page.locator(this.breakdownPopup);
    return await popup.isVisible();
  }

  async isUsdCashItemVisible() {
    const usdCashElement = this.page.locator(this.usdCashItem);
    return await usdCashElement.isVisible();
  }

  async getUsdCashTextColor() {
    const usdCashTextElement = this.page.locator(this.usdCashItemText);
    await usdCashTextElement.waitFor({ state: 'visible' });
    const color = await usdCashTextElement.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element);
      const rgbColor = computedStyle.color;
      const rgbMatch = rgbColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
        const g = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
        const b = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`.toUpperCase();
      }
      return rgbColor;
    });
    return color;
  }

  getExpectedUsdCashTextColor() {
    return this.expectedUsdCashTextColor;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractBreakdownPage;