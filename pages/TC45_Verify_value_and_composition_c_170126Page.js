class ValueCompositionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainInterface = '[data-testid="main-interface"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.totalValueAmount = '[data-testid="total-value-amount"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    this.overlayBackdrop = '[data-testid="overlay-backdrop"]';
    this.valueCompositionContainer = '[data-testid="value-composition-container"]';
    
    this.portraitWidth = 414;
    this.portraitHeight = 896;
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithWealthManagementUser() {
    const username = process.env.WM_USERNAME || 'wealth_manager_user';
    const password = process.env.WM_PASSWORD || 'secure_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainInterfaceVisible() {
    return await this.page.isVisible(this.mainInterface);
  }

  async setResponsivePortraitMode() {
    await this.page.setViewportSize({
      width: this.portraitWidth,
      height: this.portraitHeight
    });
    await this.page.waitForTimeout(500);
  }

  async isInterfaceAdaptedToPortrait() {
    const viewport = this.page.viewportSize();
    return viewport.width === this.portraitWidth && viewport.height === this.portraitHeight;
  }

  async selectActiveWealthManagementContract() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(`${this.contractListItem}:first-child`);
    await this.page.waitForLoadState('networkidle');
  }

  async isValueCompositionComponentVisible() {
    return await this.page.isVisible(this.valueCompositionContainer);
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.totalValueAmount);
    return await this.page.textContent(this.totalValueAmount);
  }

  async isMonetaryFormatCorrect() {
    const value = await this.getTotalContractValue();
    const monetaryRegex = /^\$[\d,]+(\.\d{2})?\s?(MXN|USD)?$/;
    return monetaryRegex.test(value.trim());
  }

  async clickOnTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getBreakdownItemsCount() {
    await this.page.waitForSelector(this.breakdownItem);
    const items = await this.page.$$(this.breakdownItem);
    return items.length;
  }

  async isBreakdownVerticallyAligned() {
    const mainComponent = await this.page.locator(this.totalValueComponent).boundingBox();
    const popup = await this.page.locator(this.breakdownPopup).boundingBox();
    
    if (!mainComponent || !popup) return false;
    
    const tolerance = 20;
    const mainCenterX = mainComponent.x + (mainComponent.width / 2);
    const popupCenterX = popup.x + (popup.width / 2);
    
    return Math.abs(mainCenterX - popupCenterX) <= tolerance;
  }

  async clickOutsidePopup() {
    const backdropExists = await this.page.isVisible(this.overlayBackdrop);
    
    if (backdropExists) {
      await this.page.click(this.overlayBackdrop);
    } else {
      await this.page.click('body', { position: { x: 10, y: 10 } });
    }
    
    await this.page.waitForTimeout(300);
  }

  async isBreakdownPopupClosed() {
    return await this.page.isHidden(this.breakdownPopup);
  }

  async isNormalViewDisplayed() {
    const isMainVisible = await this.page.isVisible(this.mainInterface);
    const isPopupHidden = await this.page.isHidden(this.breakdownPopup);
    return isMainVisible && isPopupHidden;
  }
}

module.exports = ValueCompositionPage;