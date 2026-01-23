const { expect } = require('@playwright/test');

class ValueCompositionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.totalValueComponent = page.locator('[data-testid="total-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
    this.closePopupButton = page.locator('[data-testid="close-breakdown-button"]');
    this.mainContainer = page.locator('[data-testid="acticenter-main-container"]');
    this.activeContractIndicator = page.locator('[data-testid="active-contract-indicator"]');
    this.overlay = page.locator('[data-testid="popup-overlay"]');
    this.pageBody = page.locator('body');
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenWithActiveContract() {
    await expect(this.mainContainer).toBeVisible({ timeout: 10000 });
    await expect(this.activeContractIndicator).toBeVisible({ timeout: 5000 });
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.waitFor({ state: 'visible' });
    await this.totalValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
    return await this.breakdownPopup.isVisible();
  }

  async isBreakdownPopupHidden() {
    await this.breakdownPopup.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    return !(await this.breakdownPopup.isVisible());
  }

  async clickOutsideBreakdownComponent() {
    const overlayVisible = await this.overlay.isVisible().catch(() => false);
    if (overlayVisible) {
      await this.overlay.click({ position: { x: 10, y: 10 } });
    } else {
      await this.pageBody.click({ position: { x: 0, y: 0 } });
    }
  }

  async isTotalValueComponentVisible() {
    return await this.totalValueComponent.isVisible();
  }

  async getBreakdownItemsCount() {
    const items = this.breakdownPopup.locator('[data-testid="breakdown-item"]');
    return await items.count();
  }

  async getTotalValueText() {
    return await this.totalValueComponent.textContent();
  }
};

module.exports = ValueCompositionPage;