class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.mainScreenContainer = '[data-testid="acticenter-main-screen"]';
    this.activeContractIndicator = '[data-testid="active-contract-indicator"]';
    this.overlayBackdrop = '[data-testid="popup-overlay"]';
    this.pageBody = 'body';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenWithActiveContract() {
    await this.page.waitForSelector(this.mainScreenContainer, { state: 'visible' });
    await this.page.waitForSelector(this.activeContractIndicator, { state: 'visible' });
  }

  async clickTotalValueComponent() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
    await this.page.click(this.totalValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async clickOutsideBreakdownPopup() {
    const overlay = await this.page.$(this.overlayBackdrop);
    if (overlay) {
      await this.page.click(this.overlayBackdrop);
    } else {
      const popup = await this.page.$(this.breakdownPopup);
      if (popup) {
        const box = await popup.boundingBox();
        const clickX = box.x - 50;
        const clickY = box.y + box.height / 2;
        await this.page.mouse.click(Math.max(clickX, 10), clickY);
      } else {
        await this.page.click(this.pageBody, { position: { x: 10, y: 10 } });
      }
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

  async isTotalValueComponentInInitialState() {
    const isComponentVisible = await this.page.isVisible(this.totalValueComponent);
    const isPopupHidden = !(await this.page.isVisible(this.breakdownPopup));
    return isComponentVisible && isPopupHidden;
  }
}

module.exports = ContractValuePage;