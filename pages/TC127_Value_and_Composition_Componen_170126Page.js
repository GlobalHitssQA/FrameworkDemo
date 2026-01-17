const { expect } = require('@playwright/test');

class ValueCompositionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Login
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    
    // Locators - Main Navigation
    this.mainScreen = '[data-testid="main-screen"]';
    this.searchClientIcon = '[data-testid="search-client-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    
    // Locators - Contract Selection
    this.personaMoralContractOption = '[data-testid="contract-persona-moral"]';
    this.mexdolarAccountBadge = '[data-testid="mexdolar-account-badge"]';
    
    // Locators - Value and Composition Component
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.purchasePowerMxn = '[data-testid="purchase-power-mxn"]';
    this.cashMxnItem = '[data-testid="cash-mxn-item"]';
    this.cashUsdItem = '[data-testid="cash-usd-item"]';
    this.cashUsdValue = '[data-testid="cash-usd-value"]';
    
    // Locators - Investment Items
    this.debtFundsList = '[data-testid="debt-funds-list"]';
    this.hedgeFundsList = '[data-testid="hedge-funds-list"]';
    this.equityFundsList = '[data-testid="equity-funds-list"]';
    this.moneyMarketSection = '[data-testid="money-market-section"]';
    this.capitalMarketSection = '[data-testid="capital-market-section"]';
    this.pendingSettlementSection = '[data-testid="pending-settlement-section"]';
    
    // Locators - Overlay
    this.popupOverlay = '[data-testid="popup-overlay"]';
    this.outsideClickArea = '[data-testid="outside-click-area"]';
  }

  async verifyBrowserReady() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.mainScreen, { state: 'visible' });
  }

  async selectPersonaMoralContract() {
    await this.page.click(this.searchClientIcon);
    await this.page.waitForSelector(this.personaMoralContractOption, { state: 'visible' });
    await this.page.click(this.personaMoralContractOption);
    await this.page.waitForSelector(this.mexdolarAccountBadge, { state: 'visible' });
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

  async isUsdCashItemVisible() {
    return await this.page.isVisible(this.cashUsdItem);
  }

  async getUsdCashValue() {
    await this.page.waitForSelector(this.cashUsdValue, { state: 'visible' });
    return await this.page.textContent(this.cashUsdValue);
  }

  async validateVisualStyles() {
    const component = await this.page.locator(this.valueCompositionComponent);
    const popup = await this.page.locator(this.breakdownPopup);
    
    const componentBox = await component.boundingBox();
    const popupBox = await popup.boundingBox();
    
    if (!componentBox || !popupBox) {
      return false;
    }
    
    const componentStyles = await component.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        visibility: styles.visibility,
        opacity: styles.opacity
      };
    });
    
    const popupStyles = await popup.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        visibility: styles.visibility,
        opacity: styles.opacity
      };
    });
    
    const isComponentVisible = componentStyles.display !== 'none' && 
                                componentStyles.visibility !== 'hidden' && 
                                parseFloat(componentStyles.opacity) > 0;
    
    const isPopupVisible = popupStyles.display !== 'none' && 
                           popupStyles.visibility !== 'hidden' && 
                           parseFloat(popupStyles.opacity) > 0;
    
    return isComponentVisible && isPopupVisible && componentBox.width > 0 && popupBox.width > 0;
  }

  async clickOutsidePopup() {
    const outsideArea = await this.page.locator(this.outsideClickArea);
    if (await outsideArea.isVisible()) {
      await outsideArea.click();
    } else {
      await this.page.click('body', { position: { x: 10, y: 10 } });
    }
  }

  async isBreakdownPopupClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }
}

module.exports = ValueCompositionPage;