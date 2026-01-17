class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.applicationContainer = '[data-testid="acticenter-app-container"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.searchMagnifyingGlass = '[data-testid="search-magnifying-glass"]';
    this.clientSearchScreen = '[data-testid="client-search-screen"]';
    this.closeSearchButton = '[data-testid="close-search-button"]';
    this.popupOverlay = '[data-testid="popup-overlay"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
  }

  async openApplication() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async isApplicationLoaded() {
    await this.page.waitForSelector(this.applicationContainer, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.applicationContainer);
  }

  async selectContract() {
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.locator(this.contractListItem).first().tap();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
    return await this.page.isVisible(this.contractValueComponent);
  }

  async tapContractValueComponent() {
    await this.page.locator(this.contractValueComponent).tap();
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async hasBreakdownItems() {
    await this.page.waitForSelector(this.breakdownItem, { state: 'visible' });
    const items = await this.page.locator(this.breakdownItem).count();
    return items > 0;
  }

  async tapSearchMagnifyingGlass() {
    await this.page.locator(this.searchMagnifyingGlass).tap();
  }

  async isClientSearchScreenVisible() {
    await this.page.waitForSelector(this.clientSearchScreen, { state: 'visible' });
    return await this.page.isVisible(this.clientSearchScreen);
  }

  async closeClientSearchScreen() {
    const closeButton = this.page.locator(this.closeSearchButton);
    if (await closeButton.isVisible()) {
      await closeButton.tap();
    }
  }

  async tapOutsidePopup() {
    const overlay = this.page.locator(this.popupOverlay);
    if (await overlay.isVisible()) {
      await overlay.tap();
    } else {
      await this.page.locator('body').tap({ position: { x: 10, y: 10 } });
    }
  }

  async isBreakdownPopupClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }
}

module.exports = ContractValuePage;