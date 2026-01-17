class ValueCompositionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://ota-acticenter.example.com';
    
    this.valueComponentContainer = '[data-testid="value-composition-container"]';
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownTrigger = '[data-testid="breakdown-trigger"]';
    this.popupCloseArea = '[data-testid="popup-overlay"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.fundsList = '[data-testid="funds-list"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.moneyMarketSection = '[data-testid="money-market-section"]';
    this.capitalMarketSection = '[data-testid="capital-market-section"]';
    this.mainContent = '[data-testid="main-content"]';
    
    this.mobilePortraitWidth = 375;
    this.mobilePortraitHeight = 667;
    this.mobileLandscapeWidth = 667;
    this.mobileLandscapeHeight = 375;
  }

  async navigateToComponent() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForSelector(this.valueComponentContainer);
  }

  async setViewportToMobilePortrait() {
    await this.page.setViewportSize({
      width: this.mobilePortraitWidth,
      height: this.mobilePortraitHeight
    });
  }

  async setViewportToMobileLandscape() {
    await this.page.setViewportSize({
      width: this.mobileLandscapeWidth,
      height: this.mobileLandscapeHeight
    });
  }

  async isValueComponentVisible() {
    return await this.page.isVisible(this.valueComponentContainer);
  }

  async verifyNoHorizontalScroll() {
    const scrollWidth = await this.page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await this.page.evaluate(() => document.documentElement.clientWidth);
    return scrollWidth <= clientWidth;
  }

  async verifyElementsOptimizedForMobile() {
    const container = await this.page.locator(this.valueComponentContainer);
    const boundingBox = await container.boundingBox();
    const viewportSize = this.page.viewportSize();
    return boundingBox && boundingBox.width <= viewportSize.width;
  }

  async isComponentAdaptedToLandscape() {
    const isVisible = await this.page.isVisible(this.valueComponentContainer);
    const container = await this.page.locator(this.valueComponentContainer);
    const boundingBox = await container.boundingBox();
    const viewportSize = this.page.viewportSize();
    return isVisible && boundingBox && boundingBox.width <= viewportSize.width;
  }

  async openBreakdownPopup() {
    await this.page.click(this.breakdownTrigger);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async closeBreakdownPopup() {
    const isVisible = await this.page.isVisible(this.breakdownPopup);
    if (isVisible) {
      await this.tapOutsidePopup();
    }
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isBreakdownPopupClosed() {
    return !(await this.page.isVisible(this.breakdownPopup));
  }

  async isPopupWithinScreenBounds() {
    const popup = await this.page.locator(this.breakdownPopup);
    const boundingBox = await popup.boundingBox();
    const viewportSize = this.page.viewportSize();
    if (!boundingBox) return false;
    return (
      boundingBox.x >= 0 &&
      boundingBox.y >= 0 &&
      boundingBox.x + boundingBox.width <= viewportSize.width &&
      boundingBox.y + boundingBox.height <= viewportSize.height
    );
  }

  async isPopupAdjustedForLandscape() {
    return await this.isPopupWithinScreenBounds();
  }

  async tapValueComponent() {
    await this.page.click(this.breakdownTrigger);
  }

  async tapOutsidePopup() {
    await this.page.click(this.popupCloseArea);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 3000 }).catch(() => {});
  }

  async getContractTotalValue() {
    return await this.page.textContent(this.totalValueComponent);
  }

  async getPurchasingPowerMXN() {
    return await this.page.textContent(this.purchasingPowerMXN);
  }

  async getCashMXN() {
    return await this.page.textContent(this.cashMXN);
  }

  async getCashUSD() {
    return await this.page.textContent(this.cashUSD);
  }
}

module.exports = ValueCompositionPage;