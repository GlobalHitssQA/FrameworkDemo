const { expect } = require('@playwright/test');

class FundsOperationPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.fundsOperationModuleLink = '[data-testid="funds-operation-module"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractOptionItem = '[data-testid="contract-option-item"]';
    this.contractInformationContainer = '[data-testid="contract-information-container"]';
    this.contractValueComponent = '[data-testid="contract-value-composition"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.overlay = '[data-testid="popup-overlay"]';
    this.pageBody = 'body';
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.ACTICENTER_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.ACTICENTER_PASSWORD || 'testpassword');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToFundsOperationModule() {
    await this.page.click(this.fundsOperationModuleLink);
    await this.page.waitForLoadState('networkidle');
  }

  async selectAvailableContract() {
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.contractOptionItem);
    await this.page.click(this.contractOptionItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractInformationLoaded() {
    await this.page.waitForSelector(this.contractInformationContainer);
    return await this.page.isVisible(this.contractInformationContainer);
  }

  async clickContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent);
    await this.page.click(this.contractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 }).catch(() => null);
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isBreakdownPopupHidden() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 }).catch(() => null);
    return await this.page.isHidden(this.breakdownPopup);
  }

  async isPopupVerticallyAligned() {
    const componentBox = await this.page.locator(this.contractValueComponent).boundingBox();
    const popupBox = await this.page.locator(this.breakdownPopup).boundingBox();
    
    if (!componentBox || !popupBox) {
      return false;
    }
    
    const componentCenterX = componentBox.x + componentBox.width / 2;
    const popupCenterX = popupBox.x + popupBox.width / 2;
    const tolerance = 50;
    
    return Math.abs(componentCenterX - popupCenterX) <= tolerance;
  }

  async clickOutsidePopup() {
    const overlayExists = await this.page.isVisible(this.overlay);
    
    if (overlayExists) {
      await this.page.click(this.overlay);
    } else {
      const popupBox = await this.page.locator(this.breakdownPopup).boundingBox();
      const componentBox = await this.page.locator(this.contractValueComponent).boundingBox();
      
      if (popupBox && componentBox) {
        const clickX = 10;
        const clickY = popupBox.y + popupBox.height + 100;
        await this.page.mouse.click(clickX, clickY);
      } else {
        await this.page.click(this.pageBody, { position: { x: 10, y: 10 } });
      }
    }
  }

  async hasBreakdownItems() {
    await this.page.waitForSelector(this.breakdownItemsList, { timeout: 5000 }).catch(() => null);
    const items = await this.page.locator(this.breakdownItem).count();
    return items > 0;
  }
}

module.exports = FundsOperationPage;