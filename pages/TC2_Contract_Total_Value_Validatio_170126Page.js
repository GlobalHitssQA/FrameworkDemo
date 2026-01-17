class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.totalValueComponent = '[data-testid="contract-total-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.contractContainer = '[data-testid="contract-container"]';
    this.searchClientInput = '[data-testid="search-client-input"]';
    this.purchasePowerMXN = '[data-testid="purchase-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.fundsList = '[data-testid="funds-list"]';
    this.pendingSettlements = '[data-testid="pending-settlements"]';
  }

  async navigateToContract() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForContractToLoad() {
    await this.page.waitForSelector(this.contractContainer, { state: 'visible', timeout: 10000 });
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async hasBreakdownItems() {
    const items = await this.page.$$(this.breakdownItem);
    return items.length > 0;
  }

  async getTotalValueDisplayed() {
    const totalText = await this.page.textContent(this.totalValueDisplay);
    return this.parseMonetaryValue(totalText);
  }

  async calculateSumOfBreakdownItems() {
    const itemValues = await this.page.$$eval(this.breakdownItemValue, (elements) => {
      return elements.map((el) => el.textContent);
    });
    
    let sum = 0;
    for (const value of itemValues) {
      sum += this.parseMonetaryValue(value);
    }
    return sum;
  }

  parseMonetaryValue(text) {
    if (!text) return 0;
    const cleanedText = text.replace(/[^0-9.-]/g, '');
    const value = parseFloat(cleanedText);
    return isNaN(value) ? 0 : value;
  }

  async closeBreakdownPopup() {
    await this.page.click('body', { position: { x: 0, y: 0 } });
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 3000 });
  }
}

module.exports = ContractValuePage;