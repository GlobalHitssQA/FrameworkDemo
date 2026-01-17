class BreakdownPopupPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownPopupOverlay = '[data-testid="breakdown-popup-overlay"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.closeButton = '[data-testid="breakdown-popup-close-button"]';
    this.mainPageContainer = '[data-testid="acticenter-main-container"]';
    this.activeContractIndicator = '[data-testid="active-contract-indicator"]';
    this.lastAnimationDuration = 0;
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async performAuthentication() {
    const usernameInput = this.page.locator('[data-testid="username-input"]');
    const passwordInput = this.page.locator('[data-testid="password-input"]');
    const loginButton = this.page.locator('[data-testid="login-button"]');
    if (await usernameInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await usernameInput.fill(process.env.TEST_USERNAME || 'testuser');
      await passwordInput.fill(process.env.TEST_PASSWORD || 'testpass');
      await loginButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async verifyActiveContractAvailable() {
    const indicator = this.page.locator(this.activeContractIndicator);
    await indicator.waitFor({ state: 'visible', timeout: 10000 });
  }

  async verifyOnMainPage() {
    const mainContainer = this.page.locator(this.mainPageContainer);
    await mainContainer.waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickTotalContractValueComponent() {
    const component = this.page.locator(this.totalContractValueComponent);
    await component.waitFor({ state: 'visible' });
    await component.click();
  }

  async isBreakdownPopupVisible() {
    const popup = this.page.locator(this.breakdownPopup);
    return await popup.isVisible();
  }

  async isBreakdownPopupClosed() {
    const popup = this.page.locator(this.breakdownPopup);
    return await popup.isHidden();
  }

  async hasBreakdownItems() {
    const items = this.page.locator(this.breakdownItem);
    const count = await items.count();
    return count > 0;
  }

  async clickOutsidePopup() {
    const startTime = Date.now();
    const overlay = this.page.locator(this.breakdownPopupOverlay);
    if (await overlay.isVisible().catch(() => false)) {
      await overlay.click({ position: { x: 10, y: 10 } });
    } else {
      await this.page.mouse.click(10, 10);
    }
    await this.measureAnimationDuration(startTime);
  }

  async pressEscapeKey() {
    const startTime = Date.now();
    await this.page.keyboard.press('Escape');
    await this.measureAnimationDuration(startTime);
  }

  async clickCloseButton() {
    const startTime = Date.now();
    const closeBtn = this.page.locator(this.closeButton);
    await closeBtn.click();
    await this.measureAnimationDuration(startTime);
  }

  async measureAnimationDuration(startTime) {
    const popup = this.page.locator(this.breakdownPopup);
    await popup.waitFor({ state: 'hidden', timeout: 5000 });
    this.lastAnimationDuration = Date.now() - startTime;
  }

  async waitForPopupOpenAnimation() {
    const popup = this.page.locator(this.breakdownPopup);
    await popup.waitFor({ state: 'visible', timeout: 5000 });
    await this.page.waitForTimeout(300);
  }

  async waitForPopupCloseAnimation() {
    const popup = this.page.locator(this.breakdownPopup);
    await popup.waitFor({ state: 'hidden', timeout: 5000 });
  }

  async getLastAnimationDuration() {
    return this.lastAnimationDuration;
  }
}

module.exports = BreakdownPopupPage;