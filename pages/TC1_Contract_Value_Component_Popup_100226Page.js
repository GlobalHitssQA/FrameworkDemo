class ContractValuePage {
  constructor(page) {
    this.page = page;
    this._contractValueComponent = '[data-testid="contract-value-component"]';
    this._breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this._financialItemsList = '[data-testid="financial-items-list"]';
    this._financialItem = '[data-testid="financial-item"]';
    this._popupCloseButton = '[data-testid="popup-close-button"]';
    this._contractTotalValue = '[data-testid="contract-total-value"]';
    this._contractSelector = '[data-testid="contract-selector"]';
    this._activeContractOption = '[data-testid="active-contract-option"]';
    this._operationScreenContainer = '[data-testid="operation-screen-container"]';
    this._overlayBackdrop = '[data-testid="overlay-backdrop"]';
  }

  async navigateToOperationScreen() {
    await this.page.waitForSelector(this._operationScreenContainer, { state: 'visible' });
  }

  async selectActiveContract() {
    await this.page.click(this._contractSelector);
    await this.page.click(this._activeContractOption);
    await this.page.waitForSelector(this._contractValueComponent, { state: 'visible' });
  }

  async waitForContractValueComponent() {
    await this.page.waitForSelector(this._contractValueComponent, { state: 'visible' });
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this._contractValueComponent);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this._breakdownPopup);
  }

  async isBreakdownPopupClosed() {
    return !(await this.page.isVisible(this._breakdownPopup));
  }

  async clickContractValueComponent() {
    await this.page.click(this._contractValueComponent);
    await this.page.waitForSelector(this._breakdownPopup, { state: 'visible' });
  }

  async hasFinancialItemsInBreakdown() {
    await this.page.waitForSelector(this._financialItemsList, { state: 'visible' });
    const items = await this.page.$$(this._financialItem);
    return items.length > 0;
  }

  async clickOutsidePopup() {
    const backdrop = await this.page.$(this._overlayBackdrop);
    if (backdrop) {
      await backdrop.click();
    } else {
      await this.page.click(this._operationScreenContainer, { position: { x: 10, y: 10 } });
    }
    await this.page.waitForSelector(this._breakdownPopup, { state: 'hidden' });
  }

  async getContractTotalValue() {
    return await this.page.textContent(this._contractTotalValue);
  }

  async closePopupWithButton() {
    await this.page.click(this._popupCloseButton);
    await this.page.waitForSelector(this._breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;