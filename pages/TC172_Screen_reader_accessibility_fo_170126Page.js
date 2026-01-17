class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://acticenter.example.com';
    
    // Main contract value component locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownPopupContent = '[data-testid="breakdown-popup-content"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    
    // Breakdown items locators
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.breakdownItemLabel = '[data-testid="breakdown-item-label"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    
    // Specific breakdown category locators
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.fundsItem = '[data-testid="funds-item"]';
    this.cedesAndNotes = '[data-testid="cedes-and-notes"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    
    // Accessibility-specific locators
    this.ariaLiveRegion = '[aria-live="polite"]';
    this.skipLink = '[data-testid="skip-to-content"]';
    this.mainContentArea = '#main-content';
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.contractValueComponent, { timeout: 10000 });
  }

  async verifyPageAccessibilityStructure() {
    const htmlLang = await this.page.getAttribute('html', 'lang');
    return htmlLang !== null && htmlLang.length > 0;
  }

  async navigateToContractValueComponent() {
    await this.page.focus(this.contractValueComponent);
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async verifyComponentHasAccessibleLabel() {
    const component = await this.page.locator(this.contractValueComponent);
    const ariaLabel = await component.getAttribute('aria-label');
    const ariaLabelledBy = await component.getAttribute('aria-labelledby');
    const role = await component.getAttribute('role');
    return (ariaLabel !== null || ariaLabelledBy !== null) && role !== null;
  }

  async verifyComponentHasAriaDescription() {
    const component = await this.page.locator(this.contractValueComponent);
    const ariaDescribedBy = await component.getAttribute('aria-describedby');
    const title = await component.getAttribute('title');
    return ariaDescribedBy !== null || title !== null;
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async verifyBreakdownPopupIsVisible() {
    const popup = await this.page.locator(this.breakdownPopup);
    return await popup.isVisible();
  }

  async verifyPopupHasAriaLiveRegion() {
    const popup = await this.page.locator(this.breakdownPopup);
    const ariaLive = await popup.getAttribute('aria-live');
    const role = await popup.getAttribute('role');
    return ariaLive !== null || role === 'dialog' || role === 'alertdialog';
  }

  async verifyPopupHasProperHeadingStructure() {
    const headings = await this.page.locator(`${this.breakdownPopup} h1, ${this.breakdownPopup} h2, ${this.breakdownPopup} h3`).count();
    return headings > 0;
  }

  async navigateThroughBreakdownItems() {
    const items = await this.page.locator(this.breakdownItem).all();
    for (const item of items) {
      await item.focus();
      await this.page.waitForTimeout(100);
    }
  }

  async verifyAllItemsHaveAccessibleLabels() {
    const items = await this.page.locator(this.breakdownItem).all();
    for (const item of items) {
      const ariaLabel = await item.getAttribute('aria-label');
      const textContent = await item.textContent();
      if (!ariaLabel && (!textContent || textContent.trim() === '')) {
        return false;
      }
    }
    return true;
  }

  async verifyMonetaryValuesHaveAriaLabels() {
    const values = await this.page.locator(this.breakdownItemValue).all();
    for (const value of values) {
      const ariaLabel = await value.getAttribute('aria-label');
      const textContent = await value.textContent();
      if (!ariaLabel && (!textContent || textContent.trim() === '')) {
        return false;
      }
    }
    return true;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async verifyBreakdownPopupIsClosed() {
    const popup = await this.page.locator(this.breakdownPopup);
    return !(await popup.isVisible());
  }

  async verifyFocusReturnedToMainElement() {
    const focusedElement = await this.page.evaluate(() => {
      const activeElement = document.activeElement;
      return activeElement ? activeElement.getAttribute('data-testid') : null;
    });
    return focusedElement === 'contract-value-component';
  }
}

module.exports = ContractValuePage;