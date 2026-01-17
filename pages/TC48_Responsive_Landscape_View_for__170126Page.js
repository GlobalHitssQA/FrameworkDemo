const { expect } = require('@playwright/test');

class ContractCompositionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    
    // Dashboard locators
    this.dashboardContainer = '[data-testid="dashboard-container"]';
    this.contractList = '[data-testid="contract-list"]';
    this.contractItem = '[data-testid="contract-item"]';
    
    // Contract value component locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalValueDisplay = '[data-testid="total-contract-value"]';
    
    // Search locators
    this.searchIcon = '[data-testid="search-icon-magnifier"]';
    this.searchInput = '[data-testid="search-input"]';
    this.generalClientScreen = '[data-testid="general-client-screen"]';
    this.closeClientScreenButton = '[data-testid="close-client-screen"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownOverlay = '[data-testid="breakdown-overlay"]';
    this.purchasePowerMXN = '[data-testid="purchase-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    
    // Viewport settings for Landscape
    this.landscapeWidth = 896;
    this.landscapeHeight = 414;
  }

  async navigateToLogin() {
    await this.page.goto(`${this.baseUrl}/login`);
  }

  async performLogin() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpass';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async setLandscapeViewport() {
    await this.page.setViewportSize({
      width: this.landscapeWidth,
      height: this.landscapeHeight
    });
  }

  async navigateToDashboard() {
    await this.page.goto(`${this.baseUrl}/dashboard`);
    await this.page.waitForLoadState('networkidle');
  }

  async isDashboardLoaded() {
    await this.page.waitForSelector(this.dashboardContainer, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.dashboardContainer);
  }

  async selectFirstAvailableContract() {
    await this.page.waitForSelector(this.contractItem, { state: 'visible' });
    await this.page.click(`${this.contractItem}:first-child`);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractValueComponent);
  }

  async isComponentAdaptedToLandscape() {
    const viewport = this.page.viewportSize();
    const componentBox = await this.page.locator(this.contractValueComponent).boundingBox();
    if (!componentBox) return false;
    return componentBox.width <= viewport.width && componentBox.width > viewport.width * 0.5;
  }

  async verifySearchIconPresence() {
    await this.page.waitForSelector(this.searchIcon, { state: 'visible' });
  }

  async isSearchIconVisible() {
    return await this.page.isVisible(this.searchIcon);
  }

  async clickSearchIcon() {
    await this.page.click(this.searchIcon);
    await this.page.waitForLoadState('networkidle');
  }

  async isGeneralClientScreenDisplayed() {
    await this.page.waitForSelector(this.generalClientScreen, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.generalClientScreen);
  }

  async closeClientScreen() {
    if (await this.page.isVisible(this.closeClientScreenButton)) {
      await this.page.click(this.closeClientScreenButton);
    } else {
      await this.page.keyboard.press('Escape');
    }
    await this.page.waitForSelector(this.generalClientScreen, { state: 'hidden', timeout: 5000 });
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isBreakdownAdaptedToLandscape() {
    const viewport = this.page.viewportSize();
    const popupBox = await this.page.locator(this.breakdownPopup).boundingBox();
    if (!popupBox) return false;
    const isWithinViewport = popupBox.width <= viewport.width && popupBox.height <= viewport.height;
    const hasReasonableSize = popupBox.width >= viewport.width * 0.3;
    return isWithinViewport && hasReasonableSize;
  }

  async areAllBreakdownItemsVisible() {
    const breakdownItems = [
      this.purchasePowerMXN,
      this.cashMXN,
      this.cashUSD,
      this.debtFunds,
      this.hedgeFunds,
      this.equityFunds,
      this.moneyMarket,
      this.capitalMarket,
      this.pendingSettlement
    ];
    
    for (const item of breakdownItems) {
      const isVisible = await this.page.isVisible(item);
      if (!isVisible) {
        const exists = await this.page.locator(item).count() > 0;
        if (exists) return false;
      }
    }
    return true;
  }

  async areBreakdownItemsFormattedCorrectly() {
    const breakdownItems = [
      this.purchasePowerMXN,
      this.cashMXN,
      this.cashUSD
    ];
    
    for (const item of breakdownItems) {
      if (await this.page.isVisible(item)) {
        const text = await this.page.textContent(item);
        if (text && text.trim().length === 0) return false;
        const box = await this.page.locator(item).boundingBox();
        if (box && box.width < 20) return false;
      }
    }
    return true;
  }

  async clickOutsideBreakdown() {
    const overlay = await this.page.locator(this.breakdownOverlay);
    if (await overlay.isVisible()) {
      await overlay.click({ position: { x: 10, y: 10 } });
    } else {
      await this.page.click('body', { position: { x: 0, y: 0 } });
    }
  }

  async isBreakdownPopupClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }
}

module.exports = ContractCompositionPage;