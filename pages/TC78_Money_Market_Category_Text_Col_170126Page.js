const { expect } = require('@playwright/test');

class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractList = '[data-testid="contract-list"]';
    this.contractWithMoneyMarket = '[data-testid="contract-item-money-market"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.moneyMarketCategory = '[data-testid="category-mercado-dinero"]';
    this.moneyMarketText = '[data-testid="category-mercado-dinero-text"]';
    this.closeBreakdownButton = '[data-testid="breakdown-close-button"]';
    
    // Expected color values from Look & Feel specifications
    this.expectedMoneyMarketColors = [
      'rgb(0, 0, 0)',
      'rgb(51, 51, 51)',
      'rgb(33, 37, 41)',
      '#000000',
      '#333333',
      '#212529'
    ];
  }

  async navigateToActicenter() {
    await this.page.goto('/acticenter');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithMoneyMarketInvestments() {
    await this.page.waitForSelector(this.contractList, { state: 'visible' });
    await this.page.click(this.contractWithMoneyMarket);
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

  async getMoneyMarketTextColor() {
    await this.page.waitForSelector(this.moneyMarketText, { state: 'visible' });
    const color = await this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        return computedStyle.color;
      }
      return null;
    }, this.moneyMarketText);
    return color;
  }

  async validateMoneyMarketTextColorCompliance(actualColor) {
    if (!actualColor) {
      return false;
    }
    const normalizedActualColor = actualColor.toLowerCase().trim();
    return this.expectedMoneyMarketColors.some(expectedColor => 
      normalizedActualColor === expectedColor.toLowerCase()
    );
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ActicenterPage;