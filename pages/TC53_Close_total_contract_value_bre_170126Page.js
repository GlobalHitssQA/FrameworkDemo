class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.desktopContainer = '[data-testid="desktop-view-container"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="value-breakdown-popup"]';
    this.breakdownItems = '[data-testid="breakdown-item"]';
    this.mainContentArea = '[data-testid="main-content-area"]';
    this.overlay = '[data-testid="overlay-backdrop"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDesktopViewIsActive() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.page.waitForSelector(this.desktopContainer, { state: 'visible' });
  }

  async selectValidContract() {
    const contractItem = this.page.locator(this.contractListItem).first();
    await contractItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickTotalContractValueComponent() {
    await this.page.locator(this.totalContractValueComponent).click();
  }

  async isBreakdownPopupVisible() {
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async breakdownHasItems() {
    const itemCount = await this.page.locator(this.breakdownItems).count();
    return itemCount > 0;
  }

  async clickOutsideBreakdownComponent() {
    const overlay = this.page.locator(this.overlay);
    const overlayExists = await overlay.count() > 0;
    
    if (overlayExists) {
      await overlay.click();
    } else {
      await this.page.locator(this.mainContentArea).click({ position: { x: 10, y: 10 } });
    }
  }

  async isBreakdownPopupHidden() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.locator(this.breakdownPopup).isVisible());
  }

  async isTotalContractValueComponentVisible() {
    return await this.page.locator(this.totalContractValueComponent).isVisible();
  }
}

module.exports = ContractValuePage;