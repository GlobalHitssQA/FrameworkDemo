const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators - using semantic data-testid attributes
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.monetaryItemsList = '[data-testid="monetary-items-list"]';
    this.monetaryItem = '[data-testid="monetary-item"]';
    this.monetaryItemValue = '[data-testid="monetary-item-value"]';
    this.componentOverlay = '[data-testid="component-overlay"]';
    this.searchContractButton = '[data-testid="search-contract-button"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.activeContractOption = '[data-testid="active-contract-option"]';
    this.pageBackdrop = '[data-testid="page-backdrop"]';
    
    // Alternative selectors using IDs
    this.contractComponentById = '#contract-value-component';
    this.breakdownPopupById = '#breakdown-popup';
    
    // CSS fallback selectors
    this.contractComponentCss = '.contract-value-component';
    this.breakdownPopupCss = '.breakdown-popup';
    this.monetaryItemsCss = '.monetary-items-list .monetary-item';
  }

  async navigateToActicenter() {
    // URL should be configured in environment or test configuration
    const baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    await this.page.goto(baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.click(this.searchContractButton);
    await this.page.waitForSelector(this.contractSelector, { state: 'visible' });
    await this.page.click(this.activeContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForContractComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async isComponentInClosedState() {
    const component = this.page.locator(this.contractValueComponent);
    const hasExpandedClass = await component.evaluate(el => el.classList.contains('expanded'));
    const popupVisible = await this.page.locator(this.breakdownPopup).isVisible().catch(() => false);
    return !hasExpandedClass && !popupVisible;
  }

  async isTotalValueVisible() {
    return await this.page.locator(this.totalValueDisplay).isVisible();
  }

  async clickContractComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForTimeout(300);
  }

  async isBreakdownPopupVisible() {
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async isBreakdownPopupHidden() {
    return await this.page.locator(this.breakdownPopup).isHidden();
  }

  async hasMonetaryItems() {
    const items = this.page.locator(this.monetaryItem);
    const count = await items.count();
    return count > 0;
  }

  async allItemsDisplayMonetaryValues() {
    const items = this.page.locator(this.monetaryItem);
    const count = await items.count();
    
    if (count === 0) return false;
    
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const valueElement = item.locator(this.monetaryItemValue);
      const isVisible = await valueElement.isVisible();
      const text = await valueElement.textContent();
      
      if (!isVisible || !text || text.trim() === '') {
        return false;
      }
    }
    return true;
  }

  async clickOutsideComponent() {
    const backdrop = this.page.locator(this.pageBackdrop);
    const backdropExists = await backdrop.isVisible().catch(() => false);
    
    if (backdropExists) {
      await backdrop.click();
    } else {
      await this.page.click('body', { position: { x: 10, y: 10 } });
    }
    await this.page.waitForTimeout(300);
  }

  async getBreakdownItems() {
    const items = this.page.locator(this.monetaryItem);
    const count = await items.count();
    const result = [];
    
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const label = await item.locator('[data-testid="monetary-item-label"]').textContent();
      const value = await item.locator(this.monetaryItemValue).textContent();
      result.push({ label, value });
    }
    return result;
  }
}

module.exports = ContractValuePage;