class BreakdownPopupPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.popupOverlay = '[data-testid="popup-overlay"]';
    this.popupCloseButton = '[data-testid="breakdown-popup-close"]';
    this.contractInterface = '[data-testid="contract-interface"]';
    this.backgroundComponent = '[data-testid="background-component"]';
    this.searchLupa = '[data-testid="search-client-contract"]';
    this.monetaryFields = '[data-testid="monetary-value-field"]';
  }

  async navigateToContract() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async isContractInterfaceLoaded() {
    await this.page.waitForSelector(this.contractInterface, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractInterface);
  }

  async clickTotalValueComponent() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
    await this.page.click(this.totalValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async verifyPopupHasHighestZIndex() {
    const popupZIndex = await this.page.evaluate((selector) => {
      const popup = document.querySelector(selector);
      if (!popup) return 0;
      const computedStyle = window.getComputedStyle(popup);
      return parseInt(computedStyle.zIndex) || 0;
    }, this.breakdownPopup);

    const otherElementsMaxZIndex = await this.page.evaluate((popupSelector) => {
      const allElements = document.querySelectorAll('*');
      let maxZIndex = 0;
      const popup = document.querySelector(popupSelector);
      
      allElements.forEach(el => {
        if (el !== popup && !popup?.contains(el)) {
          const zIndex = parseInt(window.getComputedStyle(el).zIndex) || 0;
          if (zIndex > maxZIndex) maxZIndex = zIndex;
        }
      });
      return maxZIndex;
    }, this.breakdownPopup);

    return popupZIndex > otherElementsMaxZIndex;
  }

  async verifyBackgroundElementsAreBlocked() {
    const isOverlayPresent = await this.page.isVisible(this.popupOverlay);
    
    if (isOverlayPresent) {
      const pointerEventsBlocked = await this.page.evaluate((overlaySelector, bgSelector) => {
        const overlay = document.querySelector(overlaySelector);
        const bgElement = document.querySelector(bgSelector);
        
        if (!overlay || !bgElement) return true;
        
        const overlayRect = overlay.getBoundingClientRect();
        const bgRect = bgElement.getBoundingClientRect();
        
        const overlayCoversBackground = 
          overlayRect.left <= bgRect.left &&
          overlayRect.right >= bgRect.right &&
          overlayRect.top <= bgRect.top &&
          overlayRect.bottom >= bgRect.bottom;
        
        return overlayCoversBackground;
      }, this.popupOverlay, this.backgroundComponent);
      
      return pointerEventsBlocked;
    }
    
    return true;
  }

  async clickOutsidePopup() {
    const overlayVisible = await this.page.isVisible(this.popupOverlay);
    
    if (overlayVisible) {
      await this.page.click(this.popupOverlay, { position: { x: 10, y: 10 } });
    } else {
      await this.page.click('body', { position: { x: 10, y: 10 } });
    }
  }

  async isBreakdownPopupClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    const isHidden = await this.page.isHidden(this.breakdownPopup);
    return isHidden;
  }

  async verifyBackgroundElementsAreInteractive() {
    const isSearchVisible = await this.page.isVisible(this.searchLupa);
    
    if (isSearchVisible) {
      const isEnabled = await this.page.isEnabled(this.searchLupa);
      return isEnabled;
    }
    
    const isTotalValueClickable = await this.page.isEnabled(this.totalValueComponent);
    return isTotalValueClickable;
  }
}

module.exports = BreakdownPopupPage;