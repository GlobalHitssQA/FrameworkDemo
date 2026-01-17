class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.userProfileIndicator = page.locator('[data-testid="user-profile"]');
    this.selectedContractIndicator = page.locator('[data-testid="selected-contract"]');
    this.mainScreen = page.locator('[data-testid="main-screen"]');
    this.totalContractValuePosition = null;
  }

  async navigateToMainScreen() {
    await this.mainScreen.waitFor({ state: 'visible', timeout: 10000 });
  }

  async verifyUserIsAuthenticated() {
    await this.userProfileIndicator.waitFor({ state: 'visible', timeout: 5000 });
  }

  async verifyContractIsSelected() {
    await this.selectedContractIndicator.waitFor({ state: 'visible', timeout: 5000 });
  }

  async identifyTotalContractValuePosition() {
    await this.totalContractValueComponent.waitFor({ state: 'visible', timeout: 5000 });
    this.totalContractValuePosition = await this.totalContractValueComponent.boundingBox();
    return this.totalContractValuePosition;
  }

  async isTotalContractValueVisible() {
    return await this.totalContractValueComponent.isVisible();
  }

  async clickTotalContractValue() {
    await this.totalContractValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
    return await this.breakdownPopup.isVisible();
  }

  async verifyPopupVerticalAlignment() {
    const componentBox = await this.totalContractValueComponent.boundingBox();
    const popupBox = await this.breakdownPopup.boundingBox();
    
    if (!componentBox || !popupBox) {
      return false;
    }
    
    const componentCenterX = componentBox.x + (componentBox.width / 2);
    const popupCenterX = popupBox.x + (popupBox.width / 2);
    const alignmentTolerance = 50;
    
    const isVerticallyAligned = Math.abs(componentCenterX - popupCenterX) <= alignmentTolerance;
    
    return isVerticallyAligned;
  }
}

module.exports = ContractValuePage;