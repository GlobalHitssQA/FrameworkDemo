class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownPopupClose = '[data-testid="breakdown-popup-close"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.searchClientInput = '[data-testid="search-client-input"]';
    this.searchClientButton = '[data-testid="search-client-button"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForContractComponentToLoad() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async navigateToComponentUsingTab() {
    await this.page.keyboard.press('Tab');
    let maxAttempts = 20;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const focusedElement = await this.page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.getAttribute('data-testid') : null;
      });
      
      if (focusedElement === 'contract-value-component') {
        break;
      }
      
      await this.page.keyboard.press('Tab');
      attempts++;
    }
  }

  async isContractComponentFocused() {
    const focusedTestId = await this.page.evaluate(() => {
      const el = document.activeElement;
      return el ? el.getAttribute('data-testid') : null;
    });
    return focusedTestId === 'contract-value-component';
  }

  async pressEnterOnFocusedComponent() {
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(500);
  }

  async isBreakdownPopupVisible() {
    try {
      await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async hasBreakdownItems() {
    const items = await this.page.$$(this.breakdownItem);
    return items.length > 0;
  }

  async pressEscapeToClosePopup() {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
  }

  async getBreakdownItemsCount() {
    const items = await this.page.$$(this.breakdownItem);
    return items.length;
  }

  async getTotalContractValueText() {
    return await this.page.textContent(this.totalContractValue);
  }

  async clickClosePopupButton() {
    await this.page.click(this.breakdownPopupClose);
    await this.page.waitForTimeout(300);
  }
}

module.exports = ContractBreakdownPage;