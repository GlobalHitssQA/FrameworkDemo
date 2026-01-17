class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.popupOverlay = '[data-testid="popup-overlay"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.outsideClickArea = '[data-testid="main-content-area"]';
  }

  async navigateToContractView() {
    await this.page.goto('/contract/view');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyComponentDisplayedOnMobile() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
    const isVisible = await this.page.isVisible(this.contractValueComponent);
    return isVisible;
  }

  async tapContractValueComponent() {
    const element = this.page.locator(this.contractValueComponent);
    await element.tap();
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async tapOutsidePopup() {
    const overlay = this.page.locator(this.outsideClickArea);
    const box = await overlay.boundingBox();
    if (box) {
      await this.page.tap(this.outsideClickArea, { position: { x: 10, y: 10 } });
    } else {
      await this.page.mouse.click(10, 10);
    }
  }

  async isBreakdownPopupHidden() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    const isHidden = !(await this.page.isVisible(this.breakdownPopup));
    return isHidden;
  }

  async verifySingleTapResponse() {
    const startTime = Date.now();
    await this.tapContractValueComponent();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 3000 });
    const responseTime = Date.now() - startTime;
    await this.tapOutsidePopup();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 3000 });
    return responseTime < 1000;
  }

  async getTouchTargetSize() {
    const element = this.page.locator(this.contractValueComponent);
    const box = await element.boundingBox();
    return {
      width: box ? box.width : 0,
      height: box ? box.height : 0
    };
  }
}

module.exports = ContractValuePage;