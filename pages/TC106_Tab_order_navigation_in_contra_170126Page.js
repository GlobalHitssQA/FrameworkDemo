class BreakdownPopupPage {
  constructor(page) {
    this.page = page;
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownPopupCloseButton = '[data-testid="breakdown-popup-close"]';
    this.searchClientInput = '[data-testid="search-client-contract"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractWithMultipleItems = '[data-testid="contract-item-multiple"]';
    this.userAuthenticatedIndicator = '[data-testid="user-authenticated"]';
    
    this.expectedTabOrder = [
      '[data-testid="item-poder-compra-mxn"]',
      '[data-testid="item-efectivo-mxn"]',
      '[data-testid="item-efectivo-usd"]',
      '[data-testid="item-pendientes-liquidar"]',
      '[data-testid="item-fondos-deuda"]',
      '[data-testid="item-fondos-cobertura"]',
      '[data-testid="item-fondos-renta-variable"]',
      '[data-testid="item-efectivo-transito"]',
      '[data-testid="item-cedes-pagares"]',
      '[data-testid="item-mercado-dinero"]',
      '[data-testid="item-mercado-capitales"]'
    ];
    
    this.breakdownItems = '[data-testid^="item-"]';
    this.focusedElementsOrder = [];
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userAuthenticatedIndicator, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithMultipleItems() {
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.contractWithMultipleItems, { state: 'visible' });
    await this.page.click(this.contractWithMultipleItems);
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async popupHasMultipleItems() {
    const items = await this.page.$$(this.breakdownItems);
    return items.length > 1;
  }

  async navigateWithTabKey() {
    this.focusedElementsOrder = [];
    const items = await this.page.$$(this.breakdownItems);
    const totalTabs = items.length + 2;
    
    for (let i = 0; i < totalTabs; i++) {
      await this.page.keyboard.press('Tab');
      const focusedElement = await this.page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.getAttribute('data-testid') : null;
      });
      if (focusedElement && focusedElement.startsWith('item-')) {
        this.focusedElementsOrder.push(`[data-testid="${focusedElement}"]`);
      }
    }
  }

  async verifyTabOrderSequence() {
    const visibleItems = [];
    for (const selector of this.expectedTabOrder) {
      const isVisible = await this.page.isVisible(selector);
      if (isVisible) {
        visibleItems.push(selector);
      }
    }
    
    if (this.focusedElementsOrder.length !== visibleItems.length) {
      return false;
    }
    
    for (let i = 0; i < visibleItems.length; i++) {
      if (this.focusedElementsOrder[i] !== visibleItems[i]) {
        return false;
      }
    }
    return true;
  }

  async verifyTabOrderConsistencyOnMultipleOpens() {
    const tabOrders = [];
    
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) {
        await this.closeBreakdownPopup();
        await this.page.waitForTimeout(500);
        await this.clickContractValueComponent();
      }
      
      await this.navigateWithTabKey();
      tabOrders.push([...this.focusedElementsOrder]);
    }
    
    for (let i = 1; i < tabOrders.length; i++) {
      if (tabOrders[i].length !== tabOrders[0].length) {
        return false;
      }
      for (let j = 0; j < tabOrders[0].length; j++) {
        if (tabOrders[i][j] !== tabOrders[0][j]) {
          return false;
        }
      }
    }
    return true;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownPopupCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = BreakdownPopupPage;