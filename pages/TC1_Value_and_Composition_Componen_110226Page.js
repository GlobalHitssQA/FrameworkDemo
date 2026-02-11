const { expect } = require('@playwright/test');

class ValueCompositionPage {
  constructor(page) {
    this.page = page;
    
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.compositionPopup = '[data-testid="composition-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.closePopupButton = '[data-testid="close-popup-button"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.fundAmountField = '[data-testid="fund-amount-field"]';
    this.assetAmountField = '[data-testid="asset-amount-field"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchLupa = '[data-testid="search-lupa-icon"]';
    this.outsideClickArea = '[data-testid="main-content-area"]';
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = '[data-testid="login-button"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.activeContractOption = '[data-testid="active-contract-option"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpassword';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.click(this.contractSelector);
    await this.page.click(this.activeContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isValueCompositionComponentVisible() {
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async isPopupClosed() {
    return !(await this.page.isVisible(this.compositionPopup));
  }

  async clickValueCompositionComponent() {
    await this.page.click(this.valueCompositionComponent);
    await this.page.waitForTimeout(300);
  }

  async isCompositionPopupVisible() {
    return await this.page.isVisible(this.compositionPopup);
  }

  async hasBreakdownItems() {
    const items = await this.page.$$(this.breakdownItem);
    return items.length > 0;
  }

  async interactWithPopupContent() {
    await this.page.hover(this.breakdownItemsList);
    const firstItem = await this.page.$(this.breakdownItem);
    if (firstItem) {
      await firstItem.hover();
    }
  }

  async areAllBreakdownItemsVisible() {
    const items = await this.page.$$(this.breakdownItem);
    for (const item of items) {
      const isVisible = await item.isVisible();
      if (!isVisible) {
        return false;
      }
    }
    return items.length > 0;
  }

  async clickOutsideComponent() {
    await this.page.click(this.outsideClickArea, { position: { x: 10, y: 10 } });
    await this.page.waitForTimeout(300);
  }

  async getTotalContractValue() {
    return await this.page.textContent(this.totalContractValue);
  }

  async getBreakdownItemsCount() {
    const items = await this.page.$$(this.breakdownItem);
    return items.length;
  }
};

module.exports = ValueCompositionPage;