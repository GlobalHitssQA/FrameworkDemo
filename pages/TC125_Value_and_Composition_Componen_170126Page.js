class ValueCompositionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainScreen = '[data-testid="main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.casaDeBolsaContractOption = '[data-testid="casa-bolsa-contract-option"]';
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItems = '[data-testid="breakdown-item"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.overlayBackdrop = '[data-testid="overlay-backdrop"]';
    this.monetaryValuePattern = /^\$\s?[\d,]+\.\d{2}$/;
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenVisible() {
    return await this.page.isVisible(this.mainScreen);
  }

  async selectCasaDeBolsaContract() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.casaDeBolsaContractOption);
    await this.page.click(this.casaDeBolsaContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isValueCompositionComponentVisible() {
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async clickValueCompositionComponent() {
    await this.page.click(this.valueCompositionComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async areBreakdownItemsFormattedCorrectly() {
    const items = await this.page.$$(this.breakdownItems);
    return items.length > 0;
  }

  async isBreakdownVerticallyAligned() {
    const componentBox = await this.page.locator(this.valueCompositionComponent).boundingBox();
    const popupBox = await this.page.locator(this.breakdownPopup).boundingBox();
    
    if (!componentBox || !popupBox) return false;
    
    const componentCenterX = componentBox.x + (componentBox.width / 2);
    const popupCenterX = popupBox.x + (popupBox.width / 2);
    const tolerance = 50;
    
    return Math.abs(componentCenterX - popupCenterX) <= tolerance;
  }

  async clickOutsideComponent() {
    await this.page.click('body', { position: { x: 10, y: 10 } });
    await this.page.waitForTimeout(500);
  }

  async isBreakdownPopupHidden() {
    return await this.page.isHidden(this.breakdownPopup);
  }

  async areMonetaryValuesFormattedCorrectly() {
    const monetarySelectors = [
      this.totalValueDisplay,
      this.purchasingPowerMXN,
      this.cashMXN,
      this.cashUSD
    ];
    
    for (const selector of monetarySelectors) {
      const isVisible = await this.page.isVisible(selector);
      if (isVisible) {
        const text = await this.page.textContent(selector);
        const cleanText = text.trim();
        if (!this.monetaryValuePattern.test(cleanText) && !cleanText.includes('$')) {
          return false;
        }
      }
    }
    return true;
  }
}

module.exports = ValueCompositionPage;