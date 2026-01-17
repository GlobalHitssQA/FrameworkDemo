class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Contract Value Component
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.compositionSection = '[data-testid="composition-section"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Locators - Breakdown Items
    this.purchasingPowerMxn = '[data-testid="item-purchasing-power-mxn"]';
    this.cashMxn = '[data-testid="item-cash-mxn"]';
    this.cashUsd = '[data-testid="item-cash-usd"]';
    this.pendingSettlement = '[data-testid="item-pending-settlement"]';
    this.funds = '[data-testid="item-funds"]';
    this.cedesAndNotes = '[data-testid="item-cedes-notes"]';
    this.moneyMarket = '[data-testid="item-money-market"]';
    this.capitalMarket = '[data-testid="item-capital-market"]';
    
    // Locators - Navigation and Search
    this.searchButton = '[data-testid="search-client-contract"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.activeContractOption = '[data-testid="active-contract-option"]';
    
    // Viewport dimensions
    this.portraitViewport = { width: 375, height: 812 };
    this.landscapeViewport = { width: 812, height: 375 };
  }

  async setViewportToPortrait() {
    await this.page.setViewportSize(this.portraitViewport);
  }

  async setViewportToLandscape() {
    await this.page.setViewportSize(this.landscapeViewport);
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async selectActiveContract() {
    const contractSelector = this.page.locator(this.contractSelector);
    if (await contractSelector.isVisible()) {
      await contractSelector.click();
      await this.page.locator(this.activeContractOption).first().click();
    }
  }

  async waitForContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async isContractValueComponentVisible() {
    return await this.page.locator(this.contractValueComponent).isVisible();
  }

  async clickContractValueComponent() {
    await this.page.locator(this.contractValueComponent).click();
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async closeBreakdownPopup() {
    await this.page.locator(this.breakdownCloseButton).click();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async isComponentInPortraitLayout() {
    const component = this.page.locator(this.contractValueComponent);
    const boundingBox = await component.boundingBox();
    if (!boundingBox) return false;
    return boundingBox.height > boundingBox.width * 0.5;
  }

  async isComponentInLandscapeLayout() {
    const component = this.page.locator(this.contractValueComponent);
    const boundingBox = await component.boundingBox();
    if (!boundingBox) return false;
    return boundingBox.width > boundingBox.height;
  }

  async isPopupInPortraitLayout() {
    const popup = this.page.locator(this.breakdownPopup);
    const boundingBox = await popup.boundingBox();
    if (!boundingBox) return false;
    const viewportSize = this.page.viewportSize();
    return viewportSize.height > viewportSize.width;
  }

  async isPopupInLandscapeLayout() {
    const popup = this.page.locator(this.breakdownPopup);
    const boundingBox = await popup.boundingBox();
    if (!boundingBox) return false;
    const viewportSize = this.page.viewportSize();
    return viewportSize.width > viewportSize.height;
  }

  async isBreakdownAlignedWithComponent() {
    const component = this.page.locator(this.contractValueComponent);
    const popup = this.page.locator(this.breakdownPopup);
    
    const componentBox = await component.boundingBox();
    const popupBox = await popup.boundingBox();
    
    if (!componentBox || !popupBox) return false;
    
    const horizontalAlignmentThreshold = 50;
    const isHorizontallyAligned = Math.abs(componentBox.x - popupBox.x) < horizontalAlignmentThreshold ||
      (popupBox.x >= componentBox.x && popupBox.x <= componentBox.x + componentBox.width);
    
    return isHorizontallyAligned;
  }

  async getBreakdownItems() {
    const items = await this.page.locator(this.breakdownItemsList).locator('[data-testid^="item-"]').all();
    return items;
  }

  async getTotalValueText() {
    return await this.page.locator(this.totalValueDisplay).textContent();
  }
};

module.exports = ContractValuePage;