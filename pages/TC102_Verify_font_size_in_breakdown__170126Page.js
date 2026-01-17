class BreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemTitle = '[data-testid="breakdown-item-title"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.closeBreakdownButton = '[data-testid="breakdown-close-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.authenticationIndicator = '[data-testid="user-authenticated"]';
    this.contractWithItemsIndicator = '[data-testid="contract-with-items"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.authenticationIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyContractWithMultipleItemsExists() {
    await this.page.waitForSelector(this.contractWithItemsIndicator, { state: 'visible', timeout: 10000 });
  }

  async navigateToContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async waitForBreakdownPopup() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 10000 });
  }

  async getBreakdownItemTitles() {
    const titles = await this.page.$$eval(this.breakdownItemTitle, elements =>
      elements.map(el => el.textContent.trim())
    );
    return titles;
  }

  async getBreakdownItemTitleFontSizes() {
    const fontSizes = await this.page.$$eval(this.breakdownItemTitle, elements =>
      elements.map(el => window.getComputedStyle(el).fontSize)
    );
    return fontSizes;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }
};

module.exports = BreakdownPage;