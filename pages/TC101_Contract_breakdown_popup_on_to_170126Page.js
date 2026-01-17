const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.applicationContainer = '[data-testid="acticenter-app"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.fundsDebt = '[data-testid="funds-debt"]';
    this.fundsEquity = '[data-testid="funds-equity"]';
    this.fundsCoverage = '[data-testid="funds-coverage"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
  }

  async verifyApplicationLoaded() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(this.applicationContainer, { state: 'visible', timeout: 10000 });
  }

  async selectActiveContract() {
    await this.page.waitForSelector(this.contractSelector, { state: 'visible' });
    await this.page.click(this.contractSelector);
    const firstContract = `${this.contractSelector} [data-testid="contract-option"]:first-child`;
    await this.page.waitForSelector(firstContract, { state: 'visible' });
    await this.page.click(firstContract);
  }

  async verifyContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractValueComponent);
  }

  async tapOnContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
    await this.page.tap(this.contractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async hasBreakdownItems() {
    await this.page.waitForSelector(this.breakdownItemsList, { state: 'visible' });
    const items = await this.page.locator(this.breakdownItem).count();
    return items > 0;
  }

  async verifyItemsVerticalAlignment() {
    const items = await this.page.locator(this.breakdownItem).all();
    if (items.length < 2) return true;
    
    const boundingBoxes = [];
    for (const item of items) {
      const box = await item.boundingBox();
      if (box) boundingBoxes.push(box);
    }
    
    const tolerance = 5;
    const referenceX = boundingBoxes[0].x;
    
    for (const box of boundingBoxes) {
      if (Math.abs(box.x - referenceX) > tolerance) {
        return false;
      }
    }
    return true;
  }

  async getContractTotalValue() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
    return await this.page.textContent(this.contractValueComponent);
  }

  async closePopupByClickingOutside() {
    await this.page.click('body', { position: { x: 10, y: 10 } });
  }
};

module.exports = ContractBreakdownPage;