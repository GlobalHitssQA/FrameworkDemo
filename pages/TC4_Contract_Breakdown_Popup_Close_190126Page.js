const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.totalValueComponent = page.locator('[data-testid="contract-total-value"]');
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.popupOverlay = page.locator('[data-testid="popup-overlay"]');
    this.outsideArea = page.locator('[data-testid="main-content-area"]');
    this.popupContent = page.locator('[data-testid="breakdown-popup-content"]');
    this.contractSelector = page.locator('[data-testid="contract-selector"]');
    this.activeContractItem = page.locator('[data-testid="contract-item-active"]').first();
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.searchIcon = page.locator('[data-testid="search-icon"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
  }

  async authenticate() {
    await this.usernameInput.fill(process.env.TEST_USERNAME || 'testuser');
    await this.passwordInput.fill(process.env.TEST_PASSWORD || 'testpassword');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.contractSelector.click();
    await this.activeContractItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.totalValueComponent.isVisible();
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.click();
    await this.page.waitForTimeout(300);
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async isBreakdownPopupHidden() {
    return !(await this.breakdownPopup.isVisible());
  }

  async clickOutsidePopup() {
    const popupBox = await this.breakdownPopup.boundingBox();
    const componentBox = await this.totalValueComponent.boundingBox();
    
    if (popupBox && componentBox) {
      const clickX = 10;
      const clickY = popupBox.y + popupBox.height + 50;
      await this.page.mouse.click(clickX, clickY);
    } else {
      await this.outsideArea.click({ position: { x: 10, y: 10 } });
    }
    await this.page.waitForTimeout(300);
  }

  async clickInsidePopup() {
    await this.popupContent.click({ position: { x: 50, y: 50 } });
    await this.page.waitForTimeout(300);
  }
}

module.exports = ContractBreakdownPage;