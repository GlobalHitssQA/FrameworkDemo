const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.mainComponentSelector = '[data-testid="contract-value-component"]';
    this.breakdownTriggerSelector = '[data-testid="contract-breakdown-trigger"]';
    this.breakdownPopupSelector = '[data-testid="contract-breakdown-popup"]';
    this.breakdownListItemSelector = '[data-testid="breakdown-list-item"]';
    this.closeBreakdownButtonSelector = '[data-testid="breakdown-close-button"]';
    this.contractSearchSelector = '[data-testid="contract-search-input"]';
    this.contractListSelector = '[data-testid="contract-list"]';
    this.contractItemSelector = '[data-testid="contract-item"]';
    this.neutralAreaSelector = 'body';
    
    this.breakdownCategories = [
      '[data-testid="breakdown-poder-compra-mxn"]',
      '[data-testid="breakdown-efectivo-mxn"]',
      '[data-testid="breakdown-efectivo-usd"]',
      '[data-testid="breakdown-pendientes-liquidar"]',
      '[data-testid="breakdown-fondos"]',
      '[data-testid="breakdown-cedes-pagares"]',
      '[data-testid="breakdown-mercado-dinero"]',
      '[data-testid="breakdown-mercado-capitales"]'
    ];
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async authenticate() {
    const username = process.env.ACTICENTER_USER || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpass';
    
    const usernameInput = this.page.locator('[data-testid="login-username"]');
    const passwordInput = this.page.locator('[data-testid="login-password"]');
    const loginButton = this.page.locator('[data-testid="login-submit"]');
    
    if (await usernameInput.isVisible()) {
      await usernameInput.fill(username);
      await passwordInput.fill(password);
      await loginButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async selectActiveContract() {
    const contractItem = this.page.locator(this.contractItemSelector).first();
    if (await contractItem.isVisible()) {
      await contractItem.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async isContractValueComponentVisible() {
    const component = this.page.locator(this.mainComponentSelector);
    return await component.isVisible();
  }

  async hoverOverMainComponent() {
    const mainComponent = this.page.locator(this.mainComponentSelector);
    await mainComponent.hover();
    await this.page.waitForTimeout(300);
  }

  async verifyMainComponentHoverState() {
    const mainComponent = this.page.locator(this.mainComponentSelector);
    const computedStyle = await mainComponent.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        boxShadow: styles.boxShadow,
        opacity: styles.opacity,
        cursor: styles.cursor
      };
    });
    
    const hasHoverIndicator = 
      computedStyle.cursor === 'pointer' ||
      computedStyle.boxShadow !== 'none' ||
      computedStyle.opacity !== '1';
    
    return hasHoverIndicator;
  }

  async expandBreakdownSection() {
    const trigger = this.page.locator(this.breakdownTriggerSelector);
    if (await trigger.isVisible()) {
      await trigger.click();
    } else {
      const mainComponent = this.page.locator(this.mainComponentSelector);
      await mainComponent.click();
    }
    await this.page.waitForSelector(this.breakdownPopupSelector, { state: 'visible' });
  }

  async hoverOverAllBreakdownItems() {
    const listItems = this.page.locator(this.breakdownListItemSelector);
    const count = await listItems.count();
    
    for (let i = 0; i < count; i++) {
      const item = listItems.nth(i);
      await item.hover();
      await this.page.waitForTimeout(200);
    }
  }

  async verifyAllBreakdownItemsHoverState() {
    const listItems = this.page.locator(this.breakdownListItemSelector);
    const count = await listItems.count();
    let allHaveHoverState = true;
    
    for (let i = 0; i < count; i++) {
      const item = listItems.nth(i);
      await item.hover();
      await this.page.waitForTimeout(200);
      
      const hasHover = await item.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.cursor === 'pointer' || 
               styles.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
               el.classList.contains('hover') ||
               el.matches(':hover');
      });
      
      if (!hasHover) {
        allHaveHoverState = false;
      }
    }
    
    return allHaveHoverState;
  }

  async moveCursorAway() {
    await this.page.mouse.move(0, 0);
    await this.page.waitForTimeout(300);
  }

  async verifyElementsReturnToNormalState() {
    const mainComponent = this.page.locator(this.mainComponentSelector);
    
    const isNormal = await mainComponent.evaluate((el) => {
      return !el.matches(':hover');
    });
    
    return isNormal;
  }

  async closeBreakdownPopup() {
    const closeButton = this.page.locator(this.closeBreakdownButtonSelector);
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  }
}

module.exports = ContractValuePage;