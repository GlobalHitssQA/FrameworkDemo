const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Authentication
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    
    // Locators - Header and Search
    this.headerContainer = '[data-testid="acticenter-header"]';
    this.searchFunction = '[data-testid="search-client-contract"]';
    this.searchIcon = '[data-testid="search-icon-lupa"]';
    this.searchInput = '[data-testid="search-input"]';
    
    // Locators - Contract Value Component
    this.valueComponent = '[data-testid="contract-value-component"]';
    this.totalValueDisplay = '[data-testid="total-contract-value"]';
    this.compositionComponent = '[data-testid="contract-composition"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.breakdownItems = '[data-testid="breakdown-item"]';
    
    // Locators - Financial Elements
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.fundsList = '[data-testid="funds-list"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    
    // Locators - Contract Selection
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractList = '[data-testid="contract-list"]';
    this.activeContract = '[data-testid="active-contract"]';
    
    // Desktop viewport dimensions
    this.desktopWidth = 1920;
    this.desktopHeight = 1080;
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async performLogin() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async setDesktopViewport() {
    await this.page.setViewportSize({
      width: this.desktopWidth,
      height: this.desktopHeight
    });
  }

  async waitForSystemLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector(this.headerContainer, { state: 'visible', timeout: 10000 });
  }

  async isSystemLoaded() {
    return await this.page.isVisible(this.headerContainer);
  }

  async selectActiveContract() {
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.contractList, { state: 'visible' });
    await this.page.click(this.activeContract);
    await this.page.waitForSelector(this.valueComponent, { state: 'visible' });
  }

  async isValueComponentVisible() {
    return await this.page.isVisible(this.valueComponent);
  }

  async isSearchFunctionVisible() {
    const isSearchVisible = await this.page.isVisible(this.searchFunction);
    const isIconVisible = await this.page.isVisible(this.searchIcon);
    return isSearchVisible || isIconVisible;
  }

  async clickValueComponent() {
    await this.page.click(this.valueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async verifyVerticalAlignment() {
    const valueComponentBox = await this.page.locator(this.valueComponent).boundingBox();
    const breakdownListBox = await this.page.locator(this.breakdownList).boundingBox();
    
    if (!valueComponentBox || !breakdownListBox) {
      return false;
    }
    
    const alignmentTolerance = 10;
    const isLeftAligned = Math.abs(valueComponentBox.x - breakdownListBox.x) <= alignmentTolerance;
    
    return isLeftAligned;
  }

  async verifyElementsReadability() {
    const breakdownItems = await this.page.locator(this.breakdownItems).all();
    
    for (const item of breakdownItems) {
      const isVisible = await item.isVisible();
      const boundingBox = await item.boundingBox();
      
      if (!isVisible || !boundingBox) {
        return false;
      }
      
      const minReadableHeight = 16;
      if (boundingBox.height < minReadableHeight) {
        return false;
      }
    }
    
    return true;
  }

  async verifyElementsSpacing() {
    const breakdownItems = await this.page.locator(this.breakdownItems).all();
    
    if (breakdownItems.length < 2) {
      return true;
    }
    
    const minSpacing = 4;
    
    for (let i = 0; i < breakdownItems.length - 1; i++) {
      const currentBox = await breakdownItems[i].boundingBox();
      const nextBox = await breakdownItems[i + 1].boundingBox();
      
      if (!currentBox || !nextBox) {
        return false;
      }
      
      const spacing = nextBox.y - (currentBox.y + currentBox.height);
      
      if (spacing < minSpacing) {
        return false;
      }
    }
    
    return true;
  }

  async closeBreakdownPopup() {
    await this.page.click('body', { position: { x: 0, y: 0 } });
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 3000 });
  }
}

module.exports = ContractValuePage;