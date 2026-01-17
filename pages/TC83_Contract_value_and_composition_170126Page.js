class ContractValueAccessibilityPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractValueButton = '[data-testid="contract-value-button"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.popupCloseButton = '[data-testid="popup-close-button"]';
    this.purchasingPowerItem = '[data-testid="purchasing-power-mxn"]';
    this.cashMxnItem = '[data-testid="cash-mxn"]';
    this.cashUsdItem = '[data-testid="cash-usd"]';
    this.pendingSettlementsItem = '[data-testid="pending-settlements"]';
    this.fundsListItem = '[data-testid="funds-list"]';
    this.debtFundsItem = '[data-testid="debt-funds"]';
    this.hedgeFundsItem = '[data-testid="hedge-funds"]';
    this.equityFundsItem = '[data-testid="equity-funds"]';
    this.moneyMarketItem = '[data-testid="money-market"]';
    this.capitalMarketItem = '[data-testid="capital-market"]';
    this.breakdownItems = '[data-testid="breakdown-item"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyUserIsAuthenticated() {
    const isAuthenticated = await this.page.locator('[data-testid="user-session-indicator"]').isVisible();
    return isAuthenticated;
  }

  async verifyPageIsAccessible() {
    const htmlLang = await this.page.getAttribute('html', 'lang');
    const hasMainLandmark = await this.page.locator('main, [role="main"]').count() > 0;
    return htmlLang !== null && hasMainLandmark;
  }

  async navigateToContractValueComponent() {
    await this.page.keyboard.press('Tab');
    let maxTabs = 50;
    while (maxTabs > 0) {
      const focusedElement = await this.page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.getAttribute('data-testid') : null;
      });
      if (focusedElement === 'contract-value-component' || focusedElement === 'contract-value-button') {
        break;
      }
      await this.page.keyboard.press('Tab');
      maxTabs--;
    }
  }

  async verifyComponentHasAccessibleLabel() {
    const component = this.page.locator(this.contractValueComponent);
    const ariaLabel = await component.getAttribute('aria-label');
    const ariaLabelledBy = await component.getAttribute('aria-labelledby');
    const role = await component.getAttribute('role');
    return (ariaLabel !== null || ariaLabelledBy !== null) && role !== null;
  }

  async openBreakdownPopupWithKeyboard() {
    await this.page.keyboard.press('Enter');
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async verifyPopupIsAccessible() {
    const popup = this.page.locator(this.breakdownPopup);
    const role = await popup.getAttribute('role');
    const ariaModal = await popup.getAttribute('aria-modal');
    const ariaLabel = await popup.getAttribute('aria-label');
    const ariaLabelledBy = await popup.getAttribute('aria-labelledby');
    const hasDialogRole = role === 'dialog' || role === 'alertdialog';
    const hasLabel = ariaLabel !== null || ariaLabelledBy !== null;
    return hasDialogRole && ariaModal === 'true' && hasLabel;
  }

  async navigateThroughBreakdownItems() {
    const items = await this.page.locator(this.breakdownItems).count();
    for (let i = 0; i < items; i++) {
      await this.page.keyboard.press('Tab');
    }
  }

  async verifyAllBreakdownItemsAreAccessible() {
    const itemsToCheck = [
      this.purchasingPowerItem,
      this.cashMxnItem,
      this.cashUsdItem,
      this.pendingSettlementsItem,
      this.fundsListItem
    ];
    for (const itemSelector of itemsToCheck) {
      const item = this.page.locator(itemSelector);
      const isVisible = await item.isVisible().catch(() => false);
      if (isVisible) {
        const ariaLabel = await item.getAttribute('aria-label');
        const textContent = await item.textContent();
        if (!ariaLabel && !textContent) {
          return false;
        }
      }
    }
    return true;
  }

  async closePopupWithKeyboard() {
    await this.page.keyboard.press('Escape');
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async verifyFocusReturnedToMainComponent() {
    const focusedTestId = await this.page.evaluate(() => {
      const el = document.activeElement;
      return el ? el.getAttribute('data-testid') : null;
    });
    return focusedTestId === 'contract-value-component' || focusedTestId === 'contract-value-button';
  }
}

module.exports = ContractValueAccessibilityPage;