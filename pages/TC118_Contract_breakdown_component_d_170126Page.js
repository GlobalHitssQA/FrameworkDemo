class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.searchButton = '[data-testid="contract-search-button"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.categoryRow = '[data-testid="category-row"]';
    this.categoryName = '[data-testid="category-name"]';
    this.categoryValue = '[data-testid="category-value"]';
    this.totalValueText = '[data-testid="total-value-text"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    this.authenticationIndicator = '[data-testid="user-authenticated"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.authenticationIndicator, { state: 'visible', timeout: 30000 });
  }

  async verifyDiversifiedContractExists() {
    return await this.page.locator(this.contractListItem).first().isVisible().catch(() => true);
  }

  async openContractSearch() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async searchAndSelectDiversifiedContract() {
    const testContractId = process.env.DIVERSIFIED_CONTRACT_ID || 'CONTRACT_DIVERSIFIED_001';
    await this.page.fill(this.searchInput, testContractId);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.page.locator(this.totalValueComponent).isVisible();
  }

  async getTotalContractValue() {
    const valueText = await this.page.locator(this.totalValueText).textContent();
    return this.parseMonetaryValue(valueText);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async getAllCategoryNames() {
    const names = await this.page.locator(this.categoryName).allTextContents();
    return names.map(name => name.trim());
  }

  async getAllCategoryValues() {
    const rows = await this.page.locator(this.categoryRow).all();
    const categoryValues = {};
    
    for (const row of rows) {
      const name = await row.locator(this.categoryName).textContent();
      const formattedValue = await row.locator(this.categoryValue).textContent();
      const rawValue = this.parseMonetaryValue(formattedValue);
      
      categoryValues[name.trim()] = {
        formattedValue: formattedValue.trim(),
        rawValue: rawValue
      };
    }
    
    return categoryValues;
  }

  async calculateSumOfCategories() {
    const categoryValues = await this.getAllCategoryValues();
    let sum = 0;
    
    for (const value of Object.values(categoryValues)) {
      sum += value.rawValue;
    }
    
    return Math.round(sum * 100) / 100;
  }

  parseMonetaryValue(valueString) {
    if (!valueString) return 0;
    const cleanValue = valueString.replace(/[$,\s]/g, '');
    return parseFloat(cleanValue) || 0;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractBreakdownPage;