class ValueCompositionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainScreen = '[data-testid="main-screen"]';
    
    // Contract selector locators
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.individualContractOption = '[data-testid="contract-option-individual"]';
    this.privateBankingContractItem = '[data-testid="contract-item-private-banking"]';
    
    // Value component locators
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.valueBreakdownPopup = '[data-testid="value-breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    
    // Private Banking specific items
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    
    // Overlay for closing popup
    this.popupOverlay = '[data-testid="popup-overlay"]';
    this.mainContainer = '[data-testid="main-container"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithPrivateBankingProfile() {
    const username = process.env.PRIVATE_BANKING_USER || 'test_private_banking_user';
    const password = process.env.PRIVATE_BANKING_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.mainScreen, { state: 'visible' });
  }

  async verifyIndividualContractAvailable() {
    await this.page.click(this.contractSelector);
    const isAvailable = await this.page.isVisible(this.individualContractOption);
    await this.page.keyboard.press('Escape');
    return isAvailable;
  }

  async openContractSelector() {
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async selectPrivateBankingIndividualContract() {
    await this.page.click(this.individualContractOption);
    await this.page.click(this.privateBankingContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractLoaded() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
    return await this.page.isVisible(this.totalValueComponent);
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.valueBreakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.valueBreakdownPopup);
  }

  async verifyPrivateBankingIndividualItemsDisplayed() {
    const expectedItems = [
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
    
    for (const item of expectedItems) {
      const isVisible = await this.page.isVisible(item);
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async verifyMonetaryValuesAlignedRight() {
    const items = await this.page.$$(this.breakdownItem);
    
    for (const item of items) {
      const valueElement = await item.$(this.breakdownItemValue);
      if (valueElement) {
        const textAlign = await valueElement.evaluate(el => {
          return window.getComputedStyle(el).textAlign;
        });
        if (textAlign !== 'right' && textAlign !== 'end') {
          return false;
        }
      }
    }
    return true;
  }

  async verifyZeroValuesFormatted() {
    const valueElements = await this.page.$$(this.breakdownItemValue);
    const zeroPattern = /\$0(\.00)?|\$0,00|0\.00|0,00/;
    
    for (const element of valueElements) {
      const text = await element.textContent();
      const numericValue = parseFloat(text.replace(/[^0-9.-]/g, ''));
      
      if (numericValue === 0) {
        if (!zeroPattern.test(text) && !text.includes('$')) {
          return false;
        }
      }
    }
    return true;
  }

  async clickOutsidePopup() {
    const overlay = await this.page.$(this.popupOverlay);
    if (overlay) {
      await overlay.click({ position: { x: 10, y: 10 } });
    } else {
      await this.page.click(this.mainContainer, { position: { x: 10, y: 10 } });
    }
  }

  async isBreakdownPopupClosed() {
    await this.page.waitForSelector(this.valueBreakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.valueBreakdownPopup));
  }
}

module.exports = ValueCompositionPage;