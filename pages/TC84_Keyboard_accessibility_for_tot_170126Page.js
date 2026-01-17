const { expect } = require('@playwright/test');

class TotalValuePage {
  constructor(page) {
    this.page = page;
    
    this.totalValueComponent = page.locator('[data-testid="total-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownItems = page.locator('[data-testid="breakdown-item"]');
    this.breakdownItemPowerOfPurchase = page.locator('[data-testid="breakdown-item-poder-compra-mxn"]');
    this.breakdownItemCashMXN = page.locator('[data-testid="breakdown-item-efectivo-mxn"]');
    this.breakdownItemCashUSD = page.locator('[data-testid="breakdown-item-efectivo-usd"]');
    this.breakdownItemDebtFunds = page.locator('[data-testid="breakdown-item-fondos-deuda"]');
    this.breakdownItemHedgeFunds = page.locator('[data-testid="breakdown-item-fondos-cobertura"]');
    this.breakdownItemEquityFunds = page.locator('[data-testid="breakdown-item-fondos-renta-variable"]');
    this.breakdownItemMoneyMarket = page.locator('[data-testid="breakdown-item-mercado-dinero"]');
    this.breakdownItemCapitals = page.locator('[data-testid="breakdown-item-capitales"]');
    this.breakdownItemPendingSettlement = page.locator('[data-testid="breakdown-item-pendientes-liquidar"]');
    this.closeButton = page.locator('[data-testid="breakdown-popup-close"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
  }

  async waitForContractLoaded() {
    await this.totalValueComponent.waitFor({ state: 'visible', timeout: 10000 });
  }

  async tabToTotalValueComponent() {
    await this.page.keyboard.press('Tab');
    let maxTabs = 20;
    while (maxTabs > 0) {
      const focusedElement = await this.page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
      if (focusedElement === 'total-value-component') {
        break;
      }
      await this.page.keyboard.press('Tab');
      maxTabs--;
    }
  }

  async isTotalValueComponentFocused() {
    const focusedTestId = await this.page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
    return focusedTestId === 'total-value-component';
  }

  async pressEnterOnFocusedElement() {
    await this.page.keyboard.press('Enter');
  }

  async pressSpaceOnFocusedElement() {
    await this.page.keyboard.press('Space');
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async isBreakdownPopupHidden() {
    return !(await this.breakdownPopup.isVisible());
  }

  async navigateThroughBreakdownItems() {
    const itemCount = await this.breakdownItems.count();
    for (let i = 0; i < itemCount; i++) {
      await this.page.keyboard.press('Tab');
    }
    for (let i = 0; i < itemCount; i++) {
      await this.page.keyboard.press('Shift+Tab');
    }
  }

  async verifyBreakdownItemsFocusOrder() {
    const itemCount = await this.breakdownItems.count();
    const focusOrder = [];
    for (let i = 0; i < itemCount; i++) {
      await this.page.keyboard.press('Tab');
      const focusedTestId = await this.page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
      focusOrder.push(focusedTestId);
    }
    const allItemsFocused = focusOrder.every(id => id && id.startsWith('breakdown-item'));
    return allItemsFocused && focusOrder.length === itemCount;
  }

  async pressEscapeKey() {
    await this.page.keyboard.press('Escape');
  }

  async verifyFocusIndicatorsVisible() {
    await this.tabToTotalValueComponent();
    const totalValueHasFocusStyle = await this.page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return false;
      const styles = window.getComputedStyle(el);
      const hasOutline = styles.outline !== 'none' && styles.outlineWidth !== '0px';
      const hasBoxShadow = styles.boxShadow !== 'none';
      const hasBorderChange = styles.borderColor !== 'rgb(0, 0, 0)';
      return hasOutline || hasBoxShadow || hasBorderChange;
    });
    return totalValueHasFocusStyle;
  }

  async getTotalValueText() {
    return await this.totalValueComponent.textContent();
  }

  async getBreakdownItemsCount() {
    return await this.breakdownItems.count();
  }
}

module.exports = TotalValuePage;