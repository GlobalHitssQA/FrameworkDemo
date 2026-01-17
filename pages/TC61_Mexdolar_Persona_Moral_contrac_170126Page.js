class MexdolarContractPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Main screen locators
    this.mainScreenContainer = '[data-testid="acticenter-main-screen"]';
    this.searchButton = '[data-testid="contract-search-button"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    
    // Contract list and selection locators
    this.contractTypeFilter = '[data-testid="contract-type-filter"]';
    this.mexdolarPersonaMoralOption = '[data-testid="filter-mexdolar-persona-moral"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.mexdolarContractItem = '[data-testid="mexdolar-contract-item"]';
    
    // Contract information locators
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
    this.contractValueComponent = '[data-testid="contract-total-value"]';
    this.contractTypeLabel = '[data-testid="contract-type-label"]';
    
    // View-only mode indicators
    this.viewOnlyBadge = '[data-testid="view-only-badge"]';
    this.viewOnlyMessage = '[data-testid="view-only-message"]';
    
    // Operation buttons locators
    this.buyButton = '[data-testid="buy-operation-button"]';
    this.sellButton = '[data-testid="sell-operation-button"]';
    this.operationsPanel = '[data-testid="operations-panel"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenDisplayed() {
    try {
      await this.page.waitForSelector(this.mainScreenContainer, { timeout: 10000 });
      return await this.page.isVisible(this.mainScreenContainer);
    } catch (error) {
      return false;
    }
  }

  async openContractSearch() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async searchMexdolarPersonaMoralContract() {
    await this.page.click(this.contractTypeFilter);
    await this.page.click(this.mexdolarPersonaMoralOption);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
  }

  async selectMexdolarContract() {
    await this.page.click(this.mexdolarContractItem);
    await this.page.waitForSelector(this.contractInfoContainer, { state: 'visible' });
  }

  async isContractInformationDisplayed() {
    const isContainerVisible = await this.page.isVisible(this.contractInfoContainer);
    const isValueVisible = await this.page.isVisible(this.contractValueComponent);
    return isContainerVisible && isValueVisible;
  }

  async isContractInViewOnlyMode() {
    const hasBadge = await this.page.isVisible(this.viewOnlyBadge);
    const hasMessage = await this.page.isVisible(this.viewOnlyMessage);
    return hasBadge || hasMessage;
  }

  async areOperationButtonsHidden() {
    const isBuyHidden = !(await this.page.isVisible(this.buyButton));
    const isSellHidden = !(await this.page.isVisible(this.sellButton));
    const isPanelHidden = !(await this.page.isVisible(this.operationsPanel));
    return isBuyHidden && isSellHidden || isPanelHidden;
  }

  async isBuyOperationDisabled() {
    const isHidden = !(await this.page.isVisible(this.buyButton));
    if (isHidden) return true;
    const isDisabled = await this.page.getAttribute(this.buyButton, 'disabled');
    const ariaDisabled = await this.page.getAttribute(this.buyButton, 'aria-disabled');
    return isDisabled !== null || ariaDisabled === 'true';
  }

  async isSellOperationDisabled() {
    const isHidden = !(await this.page.isVisible(this.sellButton));
    if (isHidden) return true;
    const isDisabled = await this.page.getAttribute(this.sellButton, 'disabled');
    const ariaDisabled = await this.page.getAttribute(this.sellButton, 'aria-disabled');
    return isDisabled !== null || ariaDisabled === 'true';
  }
}

module.exports = MexdolarContractPage;