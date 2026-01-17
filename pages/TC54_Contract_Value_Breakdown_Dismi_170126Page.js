class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.valueBreakdownPopup = '[data-testid="value-breakdown-popup"]';
    this.breakdownOverlay = '[data-testid="breakdown-overlay"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.mainContentArea = '[data-testid="main-content-area"]';
    this.pageContainer = '[data-testid="page-container"]';
  }

  async setResponsiveLandscapeViewport() {
    await this.page.setViewportSize({ width: 1024, height: 768 });
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async selectContract() {
    const contractItem = this.page.locator(this.contractListItem).first();
    if (await contractItem.isVisible()) {
      await contractItem.click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async clickTotalContractValue() {
    await this.page.locator(this.totalContractValueComponent).click();
    await this.page.waitForSelector(this.valueBreakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownVisible() {
    return await this.page.locator(this.valueBreakdownPopup).isVisible();
  }

  async clickOutsideBreakdown() {
    const overlay = this.page.locator(this.breakdownOverlay);
    if (await overlay.isVisible()) {
      await overlay.click({ position: { x: 10, y: 10 } });
    } else {
      await this.page.locator(this.mainContentArea).click({ position: { x: 10, y: 10 } });
    }
  }

  async isBreakdownHidden() {
    return await this.page.locator(this.valueBreakdownPopup).isHidden();
  }

  async isTotalValueComponentVisible() {
    return await this.page.locator(this.totalContractValueComponent).isVisible();
  }
}

module.exports = ContractValuePage;