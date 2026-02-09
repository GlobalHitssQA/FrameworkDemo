class FundsOperationPage {
  constructor(page) {
    this.page = page;
    this.totalValueComponent = page.locator('[data-testid="total-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-item"]');
    this.totalValueAmount = page.locator('[data-testid="total-value-amount"]');
    this.overlayBackdrop = page.locator('[data-testid="overlay-backdrop"]');
    this.mainContentArea = page.locator('[data-testid="main-content-area"]');
  }

  async navigateToFundsOperation() {
    await this.page.goto('/funds-operation');
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.totalValueComponent.isVisible();
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.click();
    await this.page.waitForTimeout(300);
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async clickOutsidePopup() {
    const overlay = await this.overlayBackdrop.isVisible();
    if (overlay) {
      await this.overlayBackdrop.click();
    } else {
      await this.page.mouse.click(10, 10);
    }
    await this.page.waitForTimeout(300);
  }

  async getTotalValueText() {
    return await this.totalValueAmount.textContent();
  }

  async getBreakdownItemsCount() {
    return await this.breakdownItemsList.count();
  }
}

module.exports = FundsOperationPage;