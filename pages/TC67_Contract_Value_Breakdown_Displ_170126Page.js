class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.pendingSettlementSection = '[data-testid="breakdown-item-pending-settlement"]';
    this.pendingSettlementLabel = '[data-testid="breakdown-item-pending-settlement"] [data-testid="item-label"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.closeBreakdownButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.userAuthenticatedIndicator = '[data-testid="user-authenticated"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userAuthenticatedIndicator, { state: 'visible', timeout: 10000 });
  }

  async selectContract() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(`${this.contractListItem}:first-child`);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueComponentVisible() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isPendingSettlementSectionVisible() {
    await this.page.waitForSelector(this.pendingSettlementSection, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.pendingSettlementSection);
  }

  async getPendingSettlementSectionName() {
    await this.page.waitForSelector(this.pendingSettlementLabel, { state: 'visible' });
    const text = await this.page.textContent(this.pendingSettlementLabel);
    return text.trim();
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;