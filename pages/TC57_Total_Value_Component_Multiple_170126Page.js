const { expect } = require('@playwright/test');

class TotalValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.closePopupButton = '[data-testid="breakdown-popup-close"]';
    this.popupOverlay = '[data-testid="popup-overlay"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractResultItem = '[data-testid="contract-result-item"]';
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainContainer = '[data-testid="main-container"]';
    
    this.consoleErrors = [];
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticate() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpass';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.mainContainer, { state: 'visible' });
  }

  async selectContractWithBreakdown() {
    const contractNumber = process.env.TEST_CONTRACT || '123456';
    await this.page.fill(this.contractSearchInput, contractNumber);
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractResultItem, { state: 'visible' });
    await this.page.click(this.contractResultItem);
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForTimeout(300);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isBreakdownPopupHidden() {
    return await this.page.isHidden(this.breakdownPopup);
  }

  async hasBreakdownItems() {
    const items = await this.page.$$(this.breakdownItem);
    return items.length > 0;
  }

  async clickOutsidePopup() {
    await this.page.click(this.popupOverlay, { force: true, position: { x: 10, y: 10 } });
    await this.page.waitForTimeout(300);
  }

  async closeBreakdownPopup() {
    const closeButton = await this.page.$(this.closePopupButton);
    if (closeButton) {
      await closeButton.click();
    } else {
      await this.clickOutsidePopup();
    }
    await this.page.waitForTimeout(300);
  }

  async openAndClosePopupMultipleTimes(times) {
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        this.consoleErrors.push(msg.text());
      }
    });

    for (let i = 0; i < times; i++) {
      await this.clickTotalValueComponent();
      const isOpen = await this.isBreakdownPopupVisible();
      if (!isOpen) {
        throw new Error(`Popup failed to open on iteration ${i + 1}`);
      }
      
      await this.closeBreakdownPopup();
      const isClosed = await this.isBreakdownPopupHidden();
      if (!isClosed) {
        throw new Error(`Popup failed to close on iteration ${i + 1}`);
      }
    }
  }

  async verifyNoConsoleErrors() {
    return this.consoleErrors.length === 0;
  }

  async verifyComponentResponsive() {
    await this.clickTotalValueComponent();
    const isVisible = await this.isBreakdownPopupVisible();
    await this.closeBreakdownPopup();
    return isVisible;
  }

  async getBreakdownItems() {
    const items = await this.page.$$(this.breakdownItem);
    const itemTexts = [];
    for (const item of items) {
      const text = await item.textContent();
      itemTexts.push(text);
    }
    return itemTexts;
  }

  async getTotalValueText() {
    return await this.page.textContent(this.totalValueComponent);
  }
};

module.exports = TotalValuePage;