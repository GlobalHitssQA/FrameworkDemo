class ContractCompositionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    // Portrait viewport dimensions
    this.portraitWidth = 375;
    this.portraitHeight = 812;
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Dashboard locators
    this.dashboardContainer = '[data-testid="dashboard-container"]';
    this.contractList = '[data-testid="contract-list"]';
    this.contractItem = '[data-testid="contract-item"]';
    
    // Contract value component locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.searchIcon = '[data-testid="search-icon"]';
    this.searchInput = '[data-testid="search-input"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    
    // Scroll container
    this.scrollContainer = '[data-testid="breakdown-scroll-container"]';
  }

  async navigateToLogin() {
    await this.page.goto(`${this.baseUrl}/login`);
  }

  async performLogin() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async setPortraitViewport() {
    await this.page.setViewportSize({
      width: this.portraitWidth,
      height: this.portraitHeight
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

  async isComponentAdaptedToPortrait() {
    const component = await this.page.locator(this.contractValueComponent);
    const boundingBox = await component.boundingBox();
    if (!boundingBox) return false;
    return boundingBox.width <= this.portraitWidth;
  }

  async isSearchIconVisible() {
    return await this.page.isVisible(this.searchIcon);
  }

  async isSearchFunctional() {
    await this.page.click(this.searchIcon);
    const isInputVisible = await this.page.isVisible(this.searchInput);
    if (isInputVisible) {
      await this.page.fill(this.searchInput, 'test');
      const inputValue = await this.page.inputValue(this.searchInput);
      await this.page.fill(this.searchInput, '');
      await this.page.keyboard.press('Escape');
      return inputValue === 'test';
    }
    return isInputVisible;
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isPopupAdaptedToPortrait() {
    const popup = await this.page.locator(this.breakdownPopup);
    const boundingBox = await popup.boundingBox();
    if (!boundingBox) return false;
    return boundingBox.width <= this.portraitWidth;
  }

  async areAllBreakdownItemsAccessible() {
    const breakdownItems = [
      this.purchasingPowerMXN,
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
      const locator = this.page.locator(item);
      const count = await locator.count();
      if (count > 0) {
        await locator.scrollIntoViewIfNeeded();
        const isVisible = await locator.isVisible();
        if (!isVisible) return false;
      }
    }
    return true;
  }

  async isBreakdownListVerticallyAligned() {
    const totalValueComponent = await this.page.locator(this.totalValueDisplay);
    const breakdownList = await this.page.locator(this.breakdownList);
    
    const totalValueBox = await totalValueComponent.boundingBox();
    const breakdownBox = await breakdownList.boundingBox();
    
    if (!totalValueBox || !breakdownBox) return false;
    
    const alignmentThreshold = 10;
    const leftAligned = Math.abs(totalValueBox.x - breakdownBox.x) <= alignmentThreshold;
    const centerAligned = Math.abs(
      (totalValueBox.x + totalValueBox.width / 2) - (breakdownBox.x + breakdownBox.width / 2)
    ) <= alignmentThreshold;
    
    return leftAligned || centerAligned;
  }
}

module.exports = ContractCompositionPage;