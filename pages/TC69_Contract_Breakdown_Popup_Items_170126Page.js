class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.authenticatedUserIndicator = '[data-testid="user-authenticated-indicator"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.activeContractItem = '[data-testid="active-contract-item"]';
    this.contractScreen = '[data-testid="contract-screen"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemRow = '[data-testid="breakdown-item-row"]';
    this.breakdownItemLabel = '[data-testid="breakdown-item-label"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.authenticatedUserIndicator, { state: 'visible', timeout: 10000 });
  }

  async selectActiveContract() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.activeContractItem, { state: 'visible' });
    await this.page.click(this.activeContractItem);
  }

  async isContractScreenVisible() {
    return await this.page.isVisible(this.contractScreen);
  }

  async clickTotalContractValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getFirstBreakdownItem() {
    const firstItem = await this.page.locator(this.breakdownItemRow).first();
    const labelElement = firstItem.locator(this.breakdownItemLabel);
    return await labelElement.textContent();
  }

  async getAllBreakdownItemLabels() {
    const items = await this.page.locator(this.breakdownItemLabel).allTextContents();
    return items;
  }

  async verifyMiddleItemsOrder(expectedOrder) {
    const allLabels = await this.getAllBreakdownItemLabels();
    let lastFoundIndex = 0;
    
    for (const expectedItem of expectedOrder) {
      const foundIndex = allLabels.findIndex((label, index) => 
        index >= lastFoundIndex && label.includes(expectedItem)
      );
      
      if (foundIndex === -1 || foundIndex < lastFoundIndex) {
        return false;
      }
      lastFoundIndex = foundIndex;
    }
    return true;
  }

  async verifyFinalItemsOrder(expectedFinalItems) {
    const allLabels = await this.getAllBreakdownItemLabels();
    const totalItems = allLabels.length;
    const lastThreeItems = allLabels.slice(totalItems - 3);
    
    for (let i = 0; i < expectedFinalItems.length; i++) {
      if (!lastThreeItems[i] || !lastThreeItems[i].includes(expectedFinalItems[i])) {
        return false;
      }
    }
    return true;
  }

  async verifyAllItemsHaveMonetaryValues() {
    const itemRows = await this.page.locator(this.breakdownItemRow).all();
    
    for (const row of itemRows) {
      const valueElement = row.locator(this.breakdownItemValue);
      const isValueVisible = await valueElement.isVisible();
      
      if (!isValueVisible) {
        return false;
      }
      
      const valueText = await valueElement.textContent();
      const hasMonetaryFormat = /\$|\d+([,.]\d+)*/.test(valueText);
      
      if (!hasMonetaryFormat) {
        return false;
      }
      
      const valueStyles = await valueElement.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          textAlign: computed.textAlign,
          marginLeft: computed.marginLeft
        };
      });
      
      const isAlignedRight = valueStyles.textAlign === 'right' || valueStyles.marginLeft === 'auto';
      
      if (!isAlignedRight) {
        const parentStyles = await row.evaluate(el => window.getComputedStyle(el).justifyContent);
        if (parentStyles !== 'space-between' && parentStyles !== 'flex-end') {
          return false;
        }
      }
    }
    return true;
  }
}

module.exports = ContractBreakdownPage;