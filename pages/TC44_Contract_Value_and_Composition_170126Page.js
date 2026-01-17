const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainInterface = '[data-testid="main-interface"]';
    
    // Contract search locators
    this.contractSearchIcon = '[data-testid="contract-search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Value and composition component locators
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemList = '[data-testid="breakdown-item-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    this.popupOverlay = '[data-testid="popup-overlay"]';
    
    // Breakdown item categories
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.funds = '[data-testid="funds"]';
    this.cedesAndPromissory = '[data-testid="cedes-promissory"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    
    // Portrait mode dimensions
    this.portraitWidth = 414;
    this.portraitHeight = 896;
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsPrivateBankingUser() {
    const username = process.env.PRIVATE_BANKING_USER || 'private_banking_user';
    const password = process.env.PRIVATE_BANKING_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainInterfaceVisible() {
    return await this.page.isVisible(this.mainInterface);
  }

  async setResponsivePortraitMode() {
    await this.page.setViewportSize({
      width: this.portraitWidth,
      height: this.portraitHeight
    });
    await this.page.waitForTimeout(500);
  }

  async isInterfaceAdaptedToPortrait() {
    const viewport = this.page.viewportSize();
    return viewport.width === this.portraitWidth && viewport.height === this.portraitHeight;
  }

  async selectContract() {
    await this.page.click(this.contractSearchIcon);
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isValueCompositionComponentVisible() {
    await this.page.waitForSelector(this.valueCompositionComponent, { state: 'visible' });
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async getTotalValueText() {
    await this.page.waitForSelector(this.totalValueDisplay);
    return await this.page.textContent(this.totalValueDisplay);
  }

  async isValidMonetaryFormat(value) {
    const monetaryRegex = /^\$[\d,]+\.\d{2}$/;
    return monetaryRegex.test(value.trim());
  }

  async clickValueComponent() {
    await this.page.click(this.valueCompositionComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async verifyAllItemsHaveMonetaryValues() {
    const items = await this.page.$$(this.breakdownItem);
    const monetaryRegex = /^\$[\d,]+\.\d{2}$/;
    
    for (const item of items) {
      const valueElement = await item.$(this.breakdownItemValue.replace('[data-testid="breakdown-item"]', ''));
      if (valueElement) {
        const valueText = await valueElement.textContent();
        if (!monetaryRegex.test(valueText.trim())) {
          return false;
        }
      }
    }
    return true;
  }

  async clickOutsideBreakdownPopup() {
    const overlay = await this.page.$(this.popupOverlay);
    if (overlay) {
      await overlay.click({ position: { x: 10, y: 10 } });
    } else {
      await this.page.click('body', { position: { x: 0, y: 0 } });
    }
    await this.page.waitForTimeout(300);
  }

  async isBreakdownPopupClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }
}

module.exports = ContractValuePage;