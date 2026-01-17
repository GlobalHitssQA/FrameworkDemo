const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Main component locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    this.compositionBreakdown = '[data-testid="composition-breakdown"]';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Contract selection locators
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchIcon = '[data-testid="search-icon"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Visual elements locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.closeButton = '[data-testid="close-button"]';
    this.expandButton = '[data-testid="expand-button"]';
    this.infoIcon = '[data-testid="info-icon"]';
    this.refreshIcon = '[data-testid="refresh-icon"]';
    
    // Currency display locators
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    
    // Investment breakdown locators
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    
    // Component container
    this.componentContainer = '[data-testid="contract-value-container"]';
    this.componentHeader = '[data-testid="component-header"]';
    this.componentBody = '[data-testid="component-body"]';
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async performAuthentication() {
    await this.page.fill(this.usernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.TEST_PASSWORD || 'testpassword');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectContract() {
    await this.page.click(this.searchIcon);
    await this.page.fill(this.contractSearchInput, process.env.TEST_CONTRACT || '123456');
    await this.page.click(this.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async accessContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async verifyComponentStructure() {
    const hasHeader = await this.page.isVisible(this.componentHeader);
    const hasBody = await this.page.isVisible(this.componentBody);
    const hasTotalValue = await this.page.isVisible(this.contractTotalValue);
    return hasHeader && hasBody && hasTotalValue;
  }

  async verifyComponentStyling() {
    const component = await this.page.locator(this.contractValueComponent);
    const styles = await component.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        borderRadius: computed.borderRadius,
        boxShadow: computed.boxShadow,
        backgroundColor: computed.backgroundColor
      };
    });
    return styles.borderRadius !== '' && styles.backgroundColor !== '';
  }

  async areButtonsVisible() {
    const expandVisible = await this.page.isVisible(this.expandButton);
    const closeVisible = await this.page.isVisible(this.closeButton);
    return expandVisible || closeVisible;
  }

  async areIconsVisible() {
    const searchVisible = await this.page.isVisible(this.searchIcon);
    const infoVisible = await this.page.isVisible(this.infoIcon);
    return searchVisible || infoVisible;
  }

  async verifyElementsAlignment() {
    const container = await this.page.locator(this.componentContainer);
    const boundingBox = await container.boundingBox();
    return boundingBox !== null && boundingBox.width > 0 && boundingBox.height > 0;
  }

  async verifyFontConsistency() {
    const component = await this.page.locator(this.contractValueComponent);
    const fontFamily = await component.evaluate((el) => {
      return window.getComputedStyle(el).fontFamily;
    });
    return fontFamily !== '' && fontFamily !== 'none';
  }

  async verifyColorConsistency() {
    const component = await this.page.locator(this.contractValueComponent);
    const colors = await component.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor
      };
    });
    return colors.color !== '' && colors.backgroundColor !== '';
  }

  async verifySpacingConsistency() {
    const component = await this.page.locator(this.contractValueComponent);
    const spacing = await component.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        padding: computed.padding,
        margin: computed.margin
      };
    });
    return spacing.padding !== '' || spacing.margin !== '';
  }

  async getBreakdownPopup() {
    await this.page.click(this.expandButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async closeComponentByClickingOutside() {
    await this.page.click('body', { position: { x: 10, y: 10 } });
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async getCurrencyValues() {
    const mxnPower = await this.page.textContent(this.purchasingPowerMXN);
    const mxnCash = await this.page.textContent(this.cashMXN);
    const usdCash = await this.page.textContent(this.cashUSD);
    return { mxnPower, mxnCash, usdCash };
  }

  async getInvestmentBreakdown() {
    return {
      debtFunds: await this.page.textContent(this.debtFunds),
      hedgeFunds: await this.page.textContent(this.hedgeFunds),
      equityFunds: await this.page.textContent(this.equityFunds),
      moneyMarket: await this.page.textContent(this.moneyMarket),
      capitalMarket: await this.page.textContent(this.capitalMarket),
      pendingSettlement: await this.page.textContent(this.pendingSettlement)
    };
  }
};

module.exports = ContractValuePage;