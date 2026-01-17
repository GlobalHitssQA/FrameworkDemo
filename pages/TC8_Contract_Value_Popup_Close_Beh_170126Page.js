const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.contractValueComponent = page.locator('[data-testid="contract-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.popupCloseButton = page.locator('[data-testid="breakdown-popup-close"]');
    this.overlayBackground = page.locator('[data-testid="overlay-background"]');
    this.mainContainer = page.locator('[data-testid="main-container"]');
    this.contractSelector = page.locator('[data-testid="contract-selector"]');
    this.activeContractOption = page.locator('[data-testid="active-contract-option"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    await this.usernameInput.fill(process.env.TEST_USERNAME || 'testuser');
    await this.passwordInput.fill(process.env.TEST_PASSWORD || 'testpassword');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.contractSelector.click();
    await this.activeContractOption.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.contractValueComponent.isVisible();
  }

  async clickContractValueComponent() {
    await this.contractValueComponent.click();
    await this.page.waitForTimeout(300);
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async clickOutsidePopup() {
    const popupBox = await this.breakdownPopup.boundingBox();
    const componentBox = await this.contractValueComponent.boundingBox();
    
    if (popupBox && componentBox) {
      const clickX = 10;
      const clickY = popupBox.y + popupBox.height + 50;
      await this.page.mouse.click(clickX, clickY);
    } else {
      await this.mainContainer.click({ position: { x: 10, y: 10 } });
    }
    await this.page.waitForTimeout(300);
  }

  async isContractValueComponentClickable() {
    try {
      await this.contractValueComponent.click({ trial: true });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getContractTotalValue() {
    return await this.contractValueComponent.textContent();
  }

  async closeBreakdownPopup() {
    if (await this.breakdownPopup.isVisible()) {
      await this.popupCloseButton.click();
      await this.page.waitForTimeout(300);
    }
  }
}

module.exports = ContractValuePage;