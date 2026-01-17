class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="value-breakdown-popup"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractOption = '[data-testid="contract-option"]';
    this.searchIcon = '[data-testid="search-client-contract"]';
    this.mainContainer = '[data-testid="main-container"]';
    this.overlay = '[data-testid="popup-overlay"]';
    this.authIndicator = '[data-testid="user-authenticated"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.authIndicator, { state: 'visible', timeout: 10000 });
  }

  async setResponsivePortraitViewport() {
    await this.page.setViewportSize({ width: 414, height: 896 });
  }

  async selectValidContract() {
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.contractOption, { state: 'visible' });
    await this.page.click(this.contractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async clickTotalValueComponent() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
    await this.page.click(this.totalValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async clickOutsidePopup() {
    const overlay = await this.page.$(this.overlay);
    if (overlay) {
      await overlay.click({ position: { x: 10, y: 10 } });
    } else {
      await this.page.click(this.mainContainer, { position: { x: 10, y: 10 } });
    }
  }

  async isBreakdownPopupHidden() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    const isVisible = await this.page.isVisible(this.breakdownPopup);
    return !isVisible;
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }
}

module.exports = ContractValuePage;