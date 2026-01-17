class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractWithVariableFunds = '[data-testid="contract-variable-income-funds"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.breakdownItemVariableFunds = '[data-testid="breakdown-item-fondos-renta-variable"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithVariableIncomeFunds() {
    await this.page.click(this.contractSelector);
    await this.page.click(this.contractWithVariableFunds);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTotalContractValueComponentIsDisplayed() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isBreakdownItemVisible(itemName) {
    const selector = this.getBreakdownItemSelector(itemName);
    return await this.page.isVisible(selector);
  }

  async getBreakdownItemText(itemName) {
    const selector = this.getBreakdownItemSelector(itemName);
    await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
    return await this.page.textContent(selector);
  }

  async verifyBreakdownItemLookAndFeel(itemName) {
    const selector = this.getBreakdownItemSelector(itemName);
    const element = this.page.locator(selector);
    
    const isVisible = await element.isVisible();
    if (!isVisible) return false;
    
    const text = await element.textContent();
    const containsExpectedText = text.includes(itemName);
    
    return containsExpectedText;
  }

  getBreakdownItemSelector(itemName) {
    if (itemName === 'Fondos de renta variable') {
      return this.breakdownItemVariableFunds;
    }
    return `[data-testid="breakdown-item-${itemName.toLowerCase().replace(/\s+/g, '-')}"]`;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }
};

module.exports = ActicenterPage;