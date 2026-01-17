class ContractPopupPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.popupCloseButton = '[data-testid="popup-close-button"]';
    this.popupContent = '[data-testid="breakdown-popup-content"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
  }

  async navigateToContract() {
    await this.page.goto(`${this.baseUrl}/contracts`);
    await this.page.waitForLoadState('networkidle');
  }

  async setViewportSize(width, height) {
    await this.page.setViewportSize({ width, height });
    await this.page.waitForTimeout(500);
  }

  async clickTotalValueComponent() {
    await this.page.locator(this.totalValueComponent).click();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isPopupVisible() {
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async closePopup() {
    const closeButton = this.page.locator(this.popupCloseButton);
    if (await closeButton.isVisible()) {
      await closeButton.click();
      await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
    }
  }

  async isPopupAlignedWithComponent() {
    const componentBox = await this.page.locator(this.totalValueComponent).boundingBox();
    const popupBox = await this.page.locator(this.breakdownPopup).boundingBox();
    
    if (!componentBox || !popupBox) return false;
    
    const horizontalTolerance = 50;
    const isHorizontallyAligned = Math.abs(popupBox.x - componentBox.x) <= horizontalTolerance ||
      (popupBox.x >= componentBox.x && popupBox.x <= componentBox.x + componentBox.width);
    
    return isHorizontallyAligned;
  }

  async isPopupWithinViewport() {
    const viewportSize = this.page.viewportSize();
    const popupBox = await this.page.locator(this.breakdownPopup).boundingBox();
    
    if (!popupBox || !viewportSize) return false;
    
    const isWithinWidth = popupBox.x >= 0 && (popupBox.x + popupBox.width) <= viewportSize.width;
    const isWithinHeight = popupBox.y >= 0 && (popupBox.y + popupBox.height) <= viewportSize.height;
    
    return isWithinWidth && isWithinHeight;
  }

  async isPopupContentLegible() {
    const popupContent = this.page.locator(this.popupContent);
    const isVisible = await popupContent.isVisible();
    const box = await popupContent.boundingBox();
    
    if (!box) return false;
    
    const hasMinimumSize = box.width >= 200 && box.height >= 100;
    return isVisible && hasMinimumSize;
  }

  async isPopupResponsive() {
    const viewportSize = this.page.viewportSize();
    const popupBox = await this.page.locator(this.breakdownPopup).boundingBox();
    
    if (!popupBox || !viewportSize) return false;
    
    const maxWidthRatio = 0.95;
    const isResponsive = popupBox.width <= viewportSize.width * maxWidthRatio;
    
    return isResponsive && await this.isPopupWithinViewport();
  }

  async isPopupVerticallyAligned() {
    const componentBox = await this.page.locator(this.totalValueComponent).boundingBox();
    const popupBox = await this.page.locator(this.breakdownPopup).boundingBox();
    
    if (!componentBox || !popupBox) return false;
    
    const componentCenterX = componentBox.x + (componentBox.width / 2);
    const popupCenterX = popupBox.x + (popupBox.width / 2);
    const tolerance = 100;
    
    return Math.abs(componentCenterX - popupCenterX) <= tolerance;
  }
};

module.exports = ContractPopupPage;