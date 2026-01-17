const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.contractTotalValueComponent = page.locator('[data-testid="contract-total-value"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownItems = page.locator('[data-testid="breakdown-popup"] [data-testid="breakdown-item"]');
    this.breakdownItemValue = page.locator('[data-testid="breakdown-item-value"]');
    this.selectedContractIndicator = page.locator('[data-testid="selected-contract"]');
  }

  async navigateToMainScreen() {
    await this.page.waitForLoadState('networkidle');
  }

  async ensureContractIsSelected() {
    await expect(this.selectedContractIndicator).toBeVisible({ timeout: 10000 });
  }

  async isContractTotalValueComponentVisible() {
    return await this.contractTotalValueComponent.isVisible();
  }

  async clickContractTotalValueComponent() {
    await this.contractTotalValueComponent.click();
    await this.page.waitForSelector('[data-testid="breakdown-popup"]', { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async hasBreakdownItems() {
    const count = await this.breakdownItems.count();
    return count > 0;
  }

  async allItemsHaveMonetaryValues() {
    const items = await this.breakdownItems.all();
    
    for (const item of items) {
      const valueElement = item.locator('[data-testid="breakdown-item-value"]');
      const isVisible = await valueElement.isVisible();
      
      if (!isVisible) {
        return false;
      }
      
      const valueText = await valueElement.textContent();
      const hasMonetaryFormat = /\$|\d+[,.]\d+/.test(valueText);
      
      if (!hasMonetaryFormat) {
        return false;
      }
    }
    
    return true;
  }

  async getBreakdownItemsCount() {
    return await this.breakdownItems.count();
  }

  async getItemValueByIndex(index) {
    const item = this.breakdownItems.nth(index);
    const valueElement = item.locator('[data-testid="breakdown-item-value"]');
    return await valueElement.textContent();
  }
}

module.exports = ContractValuePage;