class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.searchButton = '[data-testid="contract-search-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractWithPendingOps = '[data-testid="contract-with-pending-operations"]';
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.pendingToSettleSection = '[data-testid="pending-to-settle-section"]';
    this.pendingToSettleValue = '[data-testid="pending-to-settle-value"]';
    this.pendingOperationsList = '[data-testid="pending-operations-list"]';
    this.pendingOperationItem = '[data-testid="pending-operation-item"]';
    this.pendingOperationAmount = '[data-testid="pending-operation-amount"]';
    this.closePopupButton = '[data-testid="close-breakdown-popup"]';
  }

  async navigateToActicenter() {
    await this.page.goto('/acticenter');
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenVisible() {
    return await this.page.locator(this.mainScreen).isVisible();
  }

  async openContractSearch() {
    await this.page.locator(this.searchButton).click();
    await this.page.locator(this.contractSearchInput).waitFor({ state: 'visible' });
  }

  async selectContractWithPendingOperations() {
    await this.page.locator(this.contractWithPendingOps).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractInfoLoaded() {
    return await this.page.locator(this.contractInfoContainer).isVisible();
  }

  async getPendingSettlementOperations() {
    const operations = [];
    const operationElements = await this.page.locator(this.pendingOperationItem).all();
    for (const element of operationElements) {
      const amountText = await element.locator(this.pendingOperationAmount).textContent();
      const amount = this.parseMonetaryValue(amountText);
      operations.push({ amount });
    }
    return operations;
  }

  async clickTotalContractValue() {
    await this.page.locator(this.totalContractValueComponent).click();
    await this.page.locator(this.breakdownPopup).waitFor({ state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async isPendingToSettleSectionVisible() {
    return await this.page.locator(this.pendingToSettleSection).isVisible();
  }

  async getPendingToSettleDisplayedValue() {
    const valueText = await this.page.locator(this.pendingToSettleValue).textContent();
    return this.parseMonetaryValue(valueText);
  }

  async calculatePendingOperationsTotal(operations) {
    return operations.reduce((total, op) => total + op.amount, 0);
  }

  async getPendingOperationsCount() {
    return await this.page.locator(this.pendingOperationItem).count();
  }

  async verifyAllOperationsIncluded(expectedOperations) {
    const currentOperations = await this.getPendingSettlementOperations();
    if (currentOperations.length !== expectedOperations.length) {
      return false;
    }
    const expectedTotal = await this.calculatePendingOperationsTotal(expectedOperations);
    const currentTotal = await this.calculatePendingOperationsTotal(currentOperations);
    return Math.abs(expectedTotal - currentTotal) < 0.01;
  }

  parseMonetaryValue(text) {
    if (!text) return 0;
    const cleanedText = text.replace(/[^0-9.-]/g, '');
    return parseFloat(cleanedText) || 0;
  }

  async closeBreakdownPopup() {
    await this.page.locator(this.closePopupButton).click();
  }

  async clickOutsidePopup() {
    await this.page.locator(this.mainScreen).click({ position: { x: 10, y: 10 } });
  }
}

module.exports = ActicenterPage;