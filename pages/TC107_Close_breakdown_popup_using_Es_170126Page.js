class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.closePopupButton = '[data-testid="breakdown-popup-close"]';
    this.activeContractSelector = '[data-testid="active-contract"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.click(this.activeContractSelector);
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async hasBreakdownItems() {
    const items = await this.page.$$(this.breakdownItem);
    return items.length > 0;
  }

  async pressEscapeKey() {
    await this.page.keyboard.press('Escape');
  }

  async isBreakdownPopupHidden() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }

  async isFocusOnContractValueComponent() {
    const focusedElement = await this.page.evaluate(() => {
      const activeElement = document.activeElement;
      return activeElement ? activeElement.getAttribute('data-testid') : null;
    });
    return focusedElement === 'contract-value-component';
  }
}

module.exports = ContractBreakdownPage;