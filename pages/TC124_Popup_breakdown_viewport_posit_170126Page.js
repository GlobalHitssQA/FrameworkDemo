const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://acticenter.example.com';
    
    // Locators
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownPopupContent = '[data-testid="breakdown-popup-content"]';
    this.popupCloseButton = '[data-testid="popup-close-button"]';
    this.contractContainer = '[data-testid="contract-container"]';
    this.overlayBackdrop = '[data-testid="popup-overlay"]';
  }

  async navigateToContract() {
    await this.page.goto(`${this.baseUrl}/contracts`);
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
  }

  async positionComponentNearRightEdge() {
    const viewportSize = await this.page.viewportSize();
    await this.page.setViewportSize({ width: 800, height: viewportSize.height });
    await this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ inline: 'end', block: 'center' });
      }
    }, this.totalValueComponent);
  }

  async positionComponentNearBottomEdge() {
    const viewportSize = await this.page.viewportSize();
    await this.page.setViewportSize({ width: viewportSize.width, height: 600 });
    await this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ inline: 'center', block: 'end' });
      }
    }, this.totalValueComponent);
  }

  async isTotalValueComponentVisible() {
    const element = this.page.locator(this.totalValueComponent);
    return await element.isVisible();
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isPopupWithinViewport() {
    const viewportSize = await this.page.viewportSize();
    const popupBounds = await this.page.locator(this.breakdownPopup).boundingBox();
    
    if (!popupBounds) return false;
    
    const isWithinHorizontal = popupBounds.x >= 0 && (popupBounds.x + popupBounds.width) <= viewportSize.width;
    const isWithinVertical = popupBounds.y >= 0 && (popupBounds.y + popupBounds.height) <= viewportSize.height;
    
    return isWithinHorizontal && isWithinVertical;
  }

  async isPopupContentFullyVisible() {
    const popup = this.page.locator(this.breakdownPopup);
    const hasHorizontalScroll = await popup.evaluate((el) => {
      return el.scrollWidth > el.clientWidth;
    });
    return !hasHorizontalScroll;
  }

  async isPopupVerticallyWithinViewport() {
    const viewportSize = await this.page.viewportSize();
    const popupBounds = await this.page.locator(this.breakdownPopup).boundingBox();
    
    if (!popupBounds) return false;
    
    return popupBounds.y >= 0 && (popupBounds.y + popupBounds.height) <= viewportSize.height;
  }

  async closePopupIfOpen() {
    const isVisible = await this.page.locator(this.breakdownPopup).isVisible();
    if (isVisible) {
      await this.clickOutsidePopup();
    }
  }

  async clickOutsidePopup() {
    const overlay = this.page.locator(this.overlayBackdrop);
    const overlayExists = await overlay.isVisible().catch(() => false);
    
    if (overlayExists) {
      await overlay.click({ position: { x: 10, y: 10 } });
    } else {
      await this.page.click('body', { position: { x: 10, y: 10 } });
    }
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 }).catch(() => {});
  }

  async isPopupClosed() {
    const popup = this.page.locator(this.breakdownPopup);
    return !(await popup.isVisible());
  }
}

module.exports = ContractValuePage;