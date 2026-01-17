class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.mainContainerSelector = '[data-testid="contract-value-container"]';
    this.mainContainerByRole = '[role="region"]';
    this.breakdownListSelector = '[data-testid="breakdown-list"]';
    this.breakdownListByRole = '[role="list"]';
    this.breakdownItemSelector = '[data-testid="breakdown-item"]';
    this.breakdownItemByRole = '[role="listitem"]';
    this.monetaryValueSelector = '[data-testid="monetary-value"]';
    this.totalValueSelector = '[data-testid="total-contract-value"]';
  }

  async navigateToContractView() {
    await this.page.goto('/acticenter/contrato');
  }

  async waitForComponentToLoad() {
    await this.page.waitForSelector(this.mainContainerSelector, { state: 'visible', timeout: 10000 });
  }

  async isMainComponentVisible() {
    const element = this.page.locator(this.mainContainerSelector);
    return await element.isVisible();
  }

  async hasRegionRoleOnMainContainer() {
    const container = this.page.locator(this.mainContainerSelector);
    const role = await container.getAttribute('role');
    return role === 'region';
  }

  async getMainContainerAriaLabel() {
    const container = this.page.locator(this.mainContainerSelector);
    return await container.getAttribute('aria-label');
  }

  async hasListRoleOnBreakdownContainer() {
    const list = this.page.locator(this.breakdownListSelector);
    const role = await list.getAttribute('role');
    if (role === 'list') return true;
    
    const tagName = await list.evaluate(el => el.tagName.toLowerCase());
    return tagName === 'ul' || tagName === 'ol';
  }

  async allBreakdownItemsHaveListitemRole() {
    const items = this.page.locator(this.breakdownItemSelector);
    const count = await items.count();
    
    if (count === 0) return false;
    
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const role = await item.getAttribute('role');
      const tagName = await item.evaluate(el => el.tagName.toLowerCase());
      
      if (role !== 'listitem' && tagName !== 'li') {
        return false;
      }
    }
    return true;
  }

  async areMonetaryValuesAccessible() {
    const monetaryElements = this.page.locator(this.monetaryValueSelector);
    const count = await monetaryElements.count();
    
    if (count === 0) {
      const totalValue = this.page.locator(this.totalValueSelector);
      return await totalValue.isVisible();
    }
    
    for (let i = 0; i < count; i++) {
      const element = monetaryElements.nth(i);
      const role = await element.getAttribute('role');
      const tagName = await element.evaluate(el => el.tagName.toLowerCase());
      const ariaLabel = await element.getAttribute('aria-label');
      
      const hasValidRole = role === 'text' || role === null;
      const hasSemanticTag = ['span', 'p', 'div', 'dd', 'td'].includes(tagName);
      const hasAriaLabel = ariaLabel !== null;
      
      if (!hasValidRole && !hasSemanticTag && !hasAriaLabel) {
        return false;
      }
    }
    return true;
  }

  async hasRedundantOrConflictingAriaRoles() {
    const redundantSelectors = [
      'button[role="button"]',
      'a[role="link"]',
      'img[role="img"]',
      'nav[role="navigation"]',
      'main[role="main"]',
      'header[role="banner"]',
      'footer[role="contentinfo"]',
      'ul[role="list"]',
      'li[role="listitem"]'
    ];
    
    for (const selector of redundantSelectors) {
      const elements = this.page.locator(`${this.mainContainerSelector} ${selector}`);
      const count = await elements.count();
      if (count > 0) {
        return true;
      }
    }
    
    const conflictingSelectors = [
      'button[role="link"]',
      'a[role="button"]',
      'input[role="button"]',
      'div[role="button"]:not([tabindex])',
      'span[role="button"]:not([tabindex])'
    ];
    
    for (const selector of conflictingSelectors) {
      const elements = this.page.locator(`${this.mainContainerSelector} ${selector}`);
      const count = await elements.count();
      if (count > 0) {
        return true;
      }
    }
    
    return false;
  }
}

module.exports = ContractValuePage;