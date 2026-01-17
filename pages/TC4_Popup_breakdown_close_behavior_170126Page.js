class BreakdownPopupPage {
  constructor(page) {
    this.page = page;
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownPopupOverlay = page.locator('[data-testid="breakdown-popup-overlay"]');
    this.mainContentArea = page.locator('[data-testid="main-content-area"]');
    this.userAuthenticatedIndicator = page.locator('[data-testid="user-authenticated-indicator"]');
    this.selectedContractIndicator = page.locator('[data-testid="selected-contract-indicator"]');
    this.pageBackdrop = page.locator('[data-testid="page-backdrop"]');
  }

  async navigateToContractView() {
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.userAuthenticatedIndicator.waitFor({ state: 'visible', timeout: 10000 });
  }

  async verifyContractIsSelected() {
    await this.selectedContractIndicator.waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickTotalContractValueComponent() {
    await this.totalContractValueComponent.waitFor({ state: 'visible' });
    await this.totalContractValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
    return await this.breakdownPopup.isVisible();
  }

  async clickOutsidePopup() {
    const overlay = this.breakdownPopupOverlay;
    const isOverlayVisible = await overlay.isVisible().catch(() => false);
    
    if (isOverlayVisible) {
      await overlay.click({ position: { x: 10, y: 10 } });
    } else {
      await this.page.mouse.click(10, 10);
    }
  }

  async isBreakdownPopupHidden() {
    await this.breakdownPopup.waitFor({ state: 'hidden', timeout: 5000 });
    return !(await this.breakdownPopup.isVisible());
  }

  async isTotalContractValueComponentVisible() {
    return await this.totalContractValueComponent.isVisible();
  }
}

module.exports = BreakdownPopupPage;