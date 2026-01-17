class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.authenticatedUserIndicator = '[data-testid="user-authenticated-indicator"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractWithoutCedesPagares = '[data-testid="contract-without-cedes-pagares"]';
    this.contractLoadedIndicator = '[data-testid="contract-loaded-indicator"]';
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownSectionsList = '[data-testid="breakdown-sections-list"]';
    this.breakdownSectionItem = '[data-testid="breakdown-section-item"]';
    this.cedesAndPagaresSection = '[data-testid="cedes-pagares-section"]';
    this.cedesAndPagaresValue = '[data-testid="cedes-pagares-value"]';
    this.breakdownContainer = '[data-testid="breakdown-container"]';
  }

  async navigateToApplication() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.authenticatedUserIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyContractWithoutCedesAndPagaresIsAvailable() {
    const contractExists = await this.page.locator(this.contractWithoutCedesPagares).count();
    return contractExists > 0;
  }

  async selectContractWithoutCedesAndPagares() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(this.contractWithoutCedesPagares);
  }

  async verifyContractIsLoaded() {
    await this.page.waitForSelector(this.contractLoadedIndicator, { state: 'visible', timeout: 15000 });
    return await this.page.isVisible(this.contractLoadedIndicator);
  }

  async clickTotalValueComponent() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
    await this.page.click(this.totalValueComponent);
  }

  async verifyBreakdownPopupIsVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async verifyBreakdownHasSections() {
    const sectionsCount = await this.page.locator(this.breakdownSectionItem).count();
    return sectionsCount > 0;
  }

  async locateCedesAndPagaresSection() {
    await this.page.waitForSelector(this.cedesAndPagaresSection, { state: 'visible' });
  }

  async getCedesAndPagaresValue() {
    await this.page.waitForSelector(this.cedesAndPagaresValue, { state: 'visible' });
    const valueText = await this.page.textContent(this.cedesAndPagaresValue);
    return valueText.trim();
  }

  async verifyBreakdownVerticalAlignment() {
    const totalValueBox = await this.page.locator(this.totalValueComponent).boundingBox();
    const breakdownBox = await this.page.locator(this.breakdownContainer).boundingBox();
    
    if (!totalValueBox || !breakdownBox) {
      return false;
    }
    
    const tolerance = 10;
    const isLeftAligned = Math.abs(totalValueBox.x - breakdownBox.x) <= tolerance;
    const isRightAligned = Math.abs((totalValueBox.x + totalValueBox.width) - (breakdownBox.x + breakdownBox.width)) <= tolerance;
    const isCenterAligned = Math.abs((totalValueBox.x + totalValueBox.width / 2) - (breakdownBox.x + breakdownBox.width / 2)) <= tolerance;
    
    return isLeftAligned || isRightAligned || isCenterAligned;
  }
}

module.exports = ContractBreakdownPage;