const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - using semantic data-testid attributes
    this.totalValueComponent = '[data-testid="contract-total-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownPopupOverlay = '[data-testid="breakdown-popup-overlay"]';
    this.outsideClickArea = '[data-testid="main-content-area"]';
    this.contractValueAmount = '[data-testid="contract-value-amount"]';
    this.authIndicator = '[data-testid="user-authenticated"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.authIndicator, { state: 'visible', timeout: 10000 });
  }

  async isTotalValueComponentVisible() {
    const element = this.page.locator(this.totalValueComponent);
    return await element.isVisible();
  }

  async tapOnTotalValueComponent() {
    const element = this.page.locator(this.totalValueComponent);
    await element.tap();
  }

  async isBreakdownPopupVisible() {
    const popup = this.page.locator(this.breakdownPopup);
    await popup.waitFor({ state: 'visible', timeout: 5000 });
    return await popup.isVisible();
  }

  async tapOutsideBreakdownPopup() {
    const overlay = this.page.locator(this.breakdownPopupOverlay);
    const isOverlayPresent = await overlay.isVisible().catch(() => false);
    
    if (isOverlayPresent) {
      await overlay.tap();
    } else {
      const outsideArea = this.page.locator(this.outsideClickArea);
      const isOutsideAreaPresent = await outsideArea.isVisible().catch(() => false);
      
      if (isOutsideAreaPresent) {
        await outsideArea.tap();
      } else {
        const popup = this.page.locator(this.breakdownPopup);
        const popupBox = await popup.boundingBox();
        if (popupBox) {
          const tapX = popupBox.x - 50;
          const tapY = popupBox.y + popupBox.height / 2;
          await this.page.touchscreen.tap(Math.max(tapX, 10), tapY);
        }
      }
    }
  }

  async isBreakdownPopupHidden() {
    const popup = this.page.locator(this.breakdownPopup);
    await popup.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    return await popup.isHidden();
  }

  async verifyTotalValueComponentIntegrity() {
    const component = this.page.locator(this.totalValueComponent);
    const isVisible = await component.isVisible();
    const valueAmount = this.page.locator(this.contractValueAmount);
    const hasValue = await valueAmount.isVisible().catch(() => true);
    return isVisible && hasValue;
  }
}

module.exports = ContractValuePage;