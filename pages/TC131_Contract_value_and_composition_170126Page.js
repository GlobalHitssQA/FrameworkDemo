class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.closeBreakdownButton = '[data-testid="breakdown-close-button"]';
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    
    this.breakdownItems = {
      'purchasing-power-mxn': '[data-testid="breakdown-item-purchasing-power-mxn"]',
      'cash-mxn': '[data-testid="breakdown-item-cash-mxn"]',
      'cash-usd': '[data-testid="breakdown-item-cash-usd"]',
      'pending-settlement': '[data-testid="breakdown-item-pending-settlement"]',
      'funds': '[data-testid="breakdown-item-funds"]',
      'cedes-promissory-notes': '[data-testid="breakdown-item-cedes-promissory-notes"]',
      'money-market': '[data-testid="breakdown-item-money-market"]',
      'capital-market': '[data-testid="breakdown-item-capital-market"]'
    };
    
    this.monetaryValueElements = '[data-testid="breakdown-popup"] [data-testid*="monetary-value"]';
    this.breakdownListContainer = '[data-testid="breakdown-list-container"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible', timeout: 10000 });
  }

  async selectContract() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(`${this.contractListItem}:first-child`);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isBreakdownItemVisible(itemKey) {
    const selector = this.breakdownItems[itemKey];
    if (!selector) {
      throw new Error(`Unknown breakdown item: ${itemKey}`);
    }
    return await this.page.isVisible(selector);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async checkForVisualDistortions() {
    const popup = await this.page.locator(this.breakdownPopup);
    const boundingBox = await popup.boundingBox();
    
    if (!boundingBox) {
      return true;
    }
    
    const hasValidDimensions = boundingBox.width > 0 && boundingBox.height > 0;
    const isWithinViewport = boundingBox.x >= 0 && boundingBox.y >= 0;
    
    return !(hasValidDimensions && isWithinViewport);
  }

  async areMonetaryValuesRightAligned() {
    const monetaryElements = await this.page.locator(this.monetaryValueElements).all();
    
    if (monetaryElements.length === 0) {
      return false;
    }
    
    for (const element of monetaryElements) {
      const textAlign = await element.evaluate(el => {
        return window.getComputedStyle(el).textAlign;
      });
      
      if (textAlign !== 'right' && textAlign !== 'end') {
        return false;
      }
    }
    
    return true;
  }

  async areListItemsVerticallyAligned() {
    const listContainer = await this.page.locator(this.breakdownListContainer);
    const items = await listContainer.locator('[data-testid*="breakdown-item"]').all();
    
    if (items.length < 2) {
      return true;
    }
    
    let previousLeft = null;
    
    for (const item of items) {
      const boundingBox = await item.boundingBox();
      
      if (!boundingBox) {
        return false;
      }
      
      if (previousLeft !== null && Math.abs(boundingBox.x - previousLeft) > 2) {
        return false;
      }
      
      previousLeft = boundingBox.x;
    }
    
    return true;
  }

  async getContractTotalValue() {
    const valueElement = await this.page.locator(`${this.contractValueComponent} [data-testid="total-value"]`);
    return await valueElement.textContent();
  }
}

module.exports = ContractValuePage;