const { expect } = require('@playwright/test');

class PRResponsivePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://app.acticenter.com';
    
    // Locators - Contract Value Component
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    
    // Locators - Search Header
    this.searchHeader = '[data-testid="search-header"]';
    this.searchIcon = '[data-testid="search-icon"]';
    this.searchInput = '[data-testid="client-contract-search"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.closePopupButton = '[data-testid="close-breakdown-button"]';
    this.popupOverlay = '[data-testid="popup-overlay"]';
    
    // Locators - Breakdown Items
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.purchasingPowerMXN = '[data-testid="item-purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="item-cash-mxn"]';
    this.cashUSD = '[data-testid="item-cash-usd"]';
    this.pendingSettlement = '[data-testid="item-pending-settlement"]';
    this.fundsItem = '[data-testid="item-funds"]';
    this.cedesAndPromissory = '[data-testid="item-cedes-promissory"]';
    this.moneyMarket = '[data-testid="item-money-market"]';
    this.capitalMarket = '[data-testid="item-capital-market"]';
    
    // Locators - Distribution Tooltip
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    // Viewport configurations for mobile devices
    this.portraitViewport = { width: 390, height: 844 };
    this.landscapeViewport = { width: 844, height: 390 };
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async setPortraitOrientation() {
    await this.page.setViewportSize(this.portraitViewport);
    await this.page.waitForTimeout(500);
  }

  async setLandscapeOrientation() {
    await this.page.setViewportSize(this.landscapeViewport);
    await this.page.waitForTimeout(500);
  }

  async isComponentAdaptedToLandscape() {
    const component = this.page.locator(this.contractValueComponent);
    const isVisible = await component.isVisible();
    if (!isVisible) return false;
    
    const boundingBox = await component.boundingBox();
    return boundingBox && boundingBox.width > 0;
  }

  async isComponentAdaptedToPortrait() {
    const component = this.page.locator(this.contractValueComponent);
    const isVisible = await component.isVisible();
    if (!isVisible) return false;
    
    const boundingBox = await component.boundingBox();
    return boundingBox && boundingBox.width > 0;
  }

  async isSearchHeaderVisible() {
    const header = this.page.locator(this.searchHeader);
    return await header.isVisible();
  }

  async isSearchIconVisible() {
    const icon = this.page.locator(this.searchIcon);
    return await icon.isVisible();
  }

  async clickContractValueComponent() {
    const component = this.page.locator(this.contractValueComponent);
    await component.click();
  }

  async waitForBreakdownPopup() {
    const popup = this.page.locator(this.breakdownPopup);
    await popup.waitFor({ state: 'visible', timeout: 5000 });
  }

  async tapOutsidePopup() {
    const overlay = this.page.locator(this.popupOverlay);
    const isOverlayVisible = await overlay.isVisible();
    
    if (isOverlayVisible) {
      await overlay.click({ position: { x: 10, y: 10 } });
    } else {
      await this.page.mouse.click(10, 10);
    }
    await this.page.waitForTimeout(300);
  }

  async isBreakdownPopupClosed() {
    const popup = this.page.locator(this.breakdownPopup);
    return await popup.isHidden();
  }

  async areBreakdownItemsVisible() {
    const itemsList = this.page.locator(this.breakdownItemsList);
    const isListVisible = await itemsList.isVisible();
    
    if (!isListVisible) return false;
    
    const items = this.page.locator(this.breakdownItem);
    const itemCount = await items.count();
    
    if (itemCount === 0) return false;
    
    for (let i = 0; i < itemCount; i++) {
      const item = items.nth(i);
      const isVisible = await item.isVisible();
      if (!isVisible) return false;
      
      const text = await item.textContent();
      if (!text || text.trim().length === 0) return false;
    }
    
    return true;
  }

  async getBreakdownItemsText() {
    const items = this.page.locator(this.breakdownItem);
    const texts = [];
    const count = await items.count();
    
    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).textContent();
      texts.push(text);
    }
    
    return texts;
  }

  async closeBreakdownPopup() {
    const closeButton = this.page.locator(this.closePopupButton);
    const isVisible = await closeButton.isVisible();
    
    if (isVisible) {
      await closeButton.click();
    } else {
      await this.tapOutsidePopup();
    }
  }

  async searchClientOrContract(searchTerm) {
    const searchIcon = this.page.locator(this.searchIcon);
    await searchIcon.click();
    
    const searchInput = this.page.locator(this.searchInput);
    await searchInput.fill(searchTerm);
    await searchInput.press('Enter');
  }

  async getTotalContractValue() {
    const valueDisplay = this.page.locator(this.totalValueDisplay);
    return await valueDisplay.textContent();
  }

  async isDistributionTooltipVisible() {
    const tooltip = this.page.locator(this.distributionTooltip);
    return await tooltip.isVisible();
  }
}

module.exports = PRResponsivePage;