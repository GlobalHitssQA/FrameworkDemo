const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Main component locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    
    // Specific breakdown items
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.fundsItem = '[data-testid="funds-item"]';
    this.cedesAndNotes = '[data-testid="cedes-notes"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    
    // Search and navigation
    this.searchIcon = '[data-testid="search-client-contract"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    
    // Authentication
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Distribution tooltip
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithValidCredentials() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpassword';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.click(this.contractSelector);
    await this.page.click(`${this.contractSelector} >> text=Contrato Activo`);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async pressTabToFocusMainComponent() {
    await this.page.keyboard.press('Tab');
    const focusedElement = await this.page.evaluate(() => document.activeElement);
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      const isFocusedOnComponent = await this.page.evaluate((selector) => {
        const component = document.querySelector(selector);
        return document.activeElement === component || component?.contains(document.activeElement);
      }, this.contractValueComponent);
      
      if (isFocusedOnComponent) break;
      
      await this.page.keyboard.press('Tab');
      attempts++;
    }
  }

  async verifyMainComponentHasFocusIndicator() {
    const focusStyles = await this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      
      const computedStyle = window.getComputedStyle(element);
      const focusedElement = element.contains(document.activeElement) ? document.activeElement : element;
      const focusedStyle = window.getComputedStyle(focusedElement);
      
      return {
        outline: focusedStyle.outline,
        outlineWidth: focusedStyle.outlineWidth,
        outlineColor: focusedStyle.outlineColor,
        boxShadow: focusedStyle.boxShadow,
        border: focusedStyle.border
      };
    }, this.contractValueComponent);
    
    if (!focusStyles) return false;
    
    const hasOutline = focusStyles.outlineWidth !== '0px' && focusStyles.outline !== 'none';
    const hasBoxShadow = focusStyles.boxShadow !== 'none';
    const hasBorderChange = focusStyles.border && !focusStyles.border.includes('0px');
    
    return hasOutline || hasBoxShadow || hasBorderChange;
  }

  async pressEnterToOpenBreakdown() {
    await this.page.keyboard.press('Enter');
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async navigateBreakdownElementsWithTab() {
    const breakdownItems = await this.page.$$(this.breakdownItem);
    const itemCount = breakdownItems.length;
    
    for (let i = 0; i < itemCount; i++) {
      await this.page.keyboard.press('Tab');
      await this.page.waitForTimeout(100);
    }
  }

  async verifyAllBreakdownElementsHaveFocusState() {
    const breakdownItems = await this.page.$$(this.breakdownItem);
    
    for (const item of breakdownItems) {
      await item.focus();
      
      const hasFocusIndicator = await this.page.evaluate((el) => {
        const style = window.getComputedStyle(el);
        const hasOutline = style.outlineWidth !== '0px' && style.outline !== 'none';
        const hasBoxShadow = style.boxShadow !== 'none';
        return hasOutline || hasBoxShadow;
      }, item);
      
      if (!hasFocusIndicator) return false;
    }
    
    return true;
  }

  async verifyFocusStatesWCAGCompliance() {
    const wcagResults = await this.page.evaluate(() => {
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const results = [];
      
      focusableElements.forEach((element) => {
        element.focus();
        const style = window.getComputedStyle(element);
        
        const outlineColor = style.outlineColor;
        const backgroundColor = style.backgroundColor;
        
        const hasVisibleFocus = (
          style.outlineWidth !== '0px' ||
          style.boxShadow !== 'none' ||
          style.borderWidth !== '0px'
        );
        
        results.push({
          tagName: element.tagName,
          hasVisibleFocus,
          outlineWidth: style.outlineWidth
        });
      });
      
      return results;
    });
    
    const allCompliant = wcagResults.every(result => result.hasVisibleFocus);
    return allCompliant;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;