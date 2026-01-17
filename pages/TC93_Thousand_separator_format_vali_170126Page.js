class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.contractValueComponent = '[data-testid="contract-total-value"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.categoryValueItems = '[data-testid="category-value-item"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.monetaryValuePattern = /^\$[\d,]+\.\d{2}$/;
    this.thousandSeparatorPattern = /^\$\d{1,3}(,\d{3})*\.\d{2}$/;
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible', timeout: 30000 });
  }

  async selectContractWithHighValues() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.totalValueDisplay, { state: 'visible' });
    return await this.page.textContent(this.totalValueDisplay);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getAllCategoryValues() {
    await this.page.waitForSelector(this.categoryValueItems, { state: 'visible' });
    const items = await this.page.$$(this.categoryValueItems);
    const values = [];
    for (const item of items) {
      const valueElement = await item.$('[data-testid="category-monetary-value"]');
      if (valueElement) {
        const text = await valueElement.textContent();
        values.push(text.trim());
      }
    }
    return values;
  }

  validateThousandSeparatorFormat(value) {
    const trimmedValue = value.trim();
    return this.thousandSeparatorPattern.test(trimmedValue);
  }

  extractNumericValue(formattedValue) {
    const cleanValue = formattedValue.replace(/[$,]/g, '');
    return parseFloat(cleanValue);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;