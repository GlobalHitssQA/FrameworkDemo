const AxeBuilder = require('@axe-core/playwright').default;

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    // Locators - Contract Value Component
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.compositionBreakdownButton = '[data-testid="composition-breakdown-button"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    
    // Locators - Breakdown Items
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.fundsValue = '[data-testid="funds-value"]';
    this.cedesAndPromissory = '[data-testid="cedes-promissory"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    
    // Locators - Search
    this.searchMagnifier = '[data-testid="search-client-contract"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    // Locators - Authentication
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.dashboardContainer = '[data-testid="dashboard-container"]';
    
    // Interactive elements for keyboard testing
    this.interactiveElements = [
      this.compositionBreakdownButton,
      this.closeBreakdownButton,
      this.searchMagnifier
    ];
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
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.dashboardContainer, { state: 'visible', timeout: 30000 });
  }

  async navigateToContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async runColorContrastAudit() {
    const accessibilityScanResults = await new AxeBuilder({ page: this.page })
      .include(this.contractValueComponent)
      .withTags(['wcag2aa'])
      .withRules(['color-contrast'])
      .analyze();
    return accessibilityScanResults;
  }

  async verifyKeyboardAccessibility() {
    let allAccessible = true;
    
    for (const selector of this.interactiveElements) {
      const element = this.page.locator(selector);
      const isPresent = await element.count() > 0;
      
      if (isPresent) {
        await this.page.keyboard.press('Tab');
        const focusedElement = await this.page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
        
        const canReceiveFocus = await element.evaluate(el => {
          return el.tabIndex >= 0 || ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName);
        });
        
        if (!canReceiveFocus) {
          allAccessible = false;
        }
        
        await element.focus();
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Escape');
      }
    }
    
    return allAccessible;
  }

  async verifyLogicalTabOrder() {
    const tabSequence = [];
    const componentElement = this.page.locator(this.contractValueComponent);
    
    await componentElement.focus();
    
    for (let i = 0; i < 10; i++) {
      await this.page.keyboard.press('Tab');
      const focusedInfo = await this.page.evaluate(() => {
        const el = document.activeElement;
        return {
          tagName: el?.tagName,
          testId: el?.getAttribute('data-testid'),
          rect: el?.getBoundingClientRect()
        };
      });
      
      if (focusedInfo.testId) {
        tabSequence.push(focusedInfo);
      }
    }
    
    let isLogicalOrder = true;
    for (let i = 1; i < tabSequence.length; i++) {
      const prev = tabSequence[i - 1];
      const curr = tabSequence[i];
      
      if (prev.rect && curr.rect) {
        const isTopToBottom = curr.rect.top >= prev.rect.top - 5;
        const isLeftToRight = curr.rect.top > prev.rect.top || curr.rect.left >= prev.rect.left - 5;
        
        if (!isTopToBottom && !isLeftToRight) {
          isLogicalOrder = false;
        }
      }
    }
    
    return isLogicalOrder;
  }

  async runFullAccessibilityAudit() {
    const accessibilityScanResults = await new AxeBuilder({ page: this.page })
      .include(this.contractValueComponent)
      .withTags(['wcag2aa', 'wcag21aa'])
      .analyze();
    return accessibilityScanResults;
  }

  async clickCompositionBreakdown() {
    await this.page.click(this.compositionBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async getTotalContractValue() {
    return await this.page.textContent(this.totalValueDisplay);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }
}

module.exports = ContractValuePage;