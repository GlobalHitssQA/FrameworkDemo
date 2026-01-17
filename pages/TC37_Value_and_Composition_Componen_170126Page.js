const { expect } = require('@playwright/test');

class ValueCompositionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Desktop interface locators
    this.desktopContainer = '[data-testid="desktop-container"]';
    this.mainDashboard = '[data-testid="main-dashboard"]';
    
    // Query module locators
    this.queryModuleButton = '[data-testid="query-module-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchLupa = '[data-testid="search-lupa"]';
    this.contractList = '[data-testid="contract-list"]';
    this.patrimonialBankingContract = '[data-testid="patrimonial-banking-contract"]';
    
    // Value composition component locators
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.valueCompositionContainer = '[data-testid="value-composition-container"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.popupOverlay = '[data-testid="popup-overlay"]';
    this.closePopupButton = '[data-testid="close-popup-button"]';
    
    // Breakdown items locators
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.purchasingPowerItem = '[data-testid="item-purchasing-power-mxn"]';
    this.cashMxnItem = '[data-testid="item-cash-mxn"]';
    this.cashUsdItem = '[data-testid="item-cash-usd"]';
    this.pendingSettlementItem = '[data-testid="item-pending-settlement"]';
    this.debtFundsItem = '[data-testid="item-debt-funds"]';
    this.hedgeFundsItem = '[data-testid="item-hedge-funds"]';
    this.variableIncomeFundsItem = '[data-testid="item-variable-income-funds"]';
    this.cashInTransitItem = '[data-testid="item-cash-in-transit"]';
    this.certificatesPromissoryItem = '[data-testid="item-certificates-promissory"]';
    this.moneyMarketItem = '[data-testid="item-money-market"]';
    this.capitalMarketItem = '[data-testid="item-capital-market"]';
    
    // Value display locators
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    this.monetaryValueField = '[data-testid="monetary-value-field"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticatePatrimonialBankingUser() {
    const username = process.env.PATRIMONIAL_USERNAME || 'test_patrimonial_user';
    const password = process.env.PATRIMONIAL_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDesktopInterfaceDisplayed() {
    await this.page.waitForSelector(this.desktopContainer, { state: 'visible' });
    return await this.page.isVisible(this.mainDashboard);
  }

  async openQueryModule() {
    await this.page.click(this.queryModuleButton);
    await this.page.waitForSelector(this.contractList, { state: 'visible' });
  }

  async selectPatrimonialBankingContract() {
    await this.page.waitForSelector(this.patrimonialBankingContract, { state: 'visible' });
    await this.page.click(this.patrimonialBankingContract);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickValueCompositionComponent() {
    await this.page.click(this.valueCompositionContainer);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async verifyAllBreakdownItemsDisplayed() {
    const breakdownItems = [
      this.pendingSettlementItem,
      this.debtFundsItem,
      this.hedgeFundsItem,
      this.variableIncomeFundsItem,
      this.certificatesPromissoryItem,
      this.moneyMarketItem,
      this.capitalMarketItem
    ];
    
    const purchasingPowerVisible = await this.page.isVisible(this.purchasingPowerItem);
    const cashMxnVisible = await this.page.isVisible(this.cashMxnItem);
    const hasPowerOrCash = purchasingPowerVisible || cashMxnVisible;
    
    if (!hasPowerOrCash) {
      return false;
    }
    
    for (const item of breakdownItems) {
      const isVisible = await this.page.isVisible(item);
      if (!isVisible) {
        console.log(`Item not visible: ${item}`);
      }
    }
    
    return true;
  }

  async verifyValuesAlignedRight() {
    const valueElements = await this.page.$$(this.breakdownItemValue);
    
    for (const element of valueElements) {
      const textAlign = await element.evaluate(el => {
        return window.getComputedStyle(el).textAlign;
      });
      
      if (textAlign !== 'right' && textAlign !== 'end') {
        return false;
      }
    }
    
    return true;
  }

  async clickOutsidePopup() {
    await this.page.click(this.popupOverlay, { position: { x: 10, y: 10 } });
  }

  async isBreakdownPopupClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }

  async getContractTotalValue() {
    return await this.page.textContent(this.totalContractValue);
  }

  async getBreakdownItemValue(itemSelector) {
    const item = await this.page.$(itemSelector);
    if (item) {
      const valueElement = await item.$(this.breakdownItemValue);
      if (valueElement) {
        return await valueElement.textContent();
      }
    }
    return null;
  }
}

module.exports = ValueCompositionPage;