class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.authenticatedUserIndicator = '[data-testid="user-authenticated-indicator"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.itemLabel = '[data-testid="item-label"]';
    this.itemValue = '[data-testid="item-value"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.mxnValuePattern = /^\$[\d,]+\.\d{2}$/;
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.authenticatedUserIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyContractWithMXNValuesExists() {
    const contractExists = await this.page.locator(this.contractListItem).first().isVisible();
    return contractExists;
  }

  async selectContractWithMXNValues() {
    await this.page.locator(this.contractSearchInput).fill('MXN');
    await this.page.locator(this.contractSearchButton).click();
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.locator(this.contractListItem).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.page.locator(this.totalValueComponent).isVisible();
  }

  async clickTotalValueComponent() {
    await this.page.locator(this.totalValueComponent).click();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async hasBreakdownItems() {
    const itemCount = await this.page.locator(this.breakdownItem).count();
    return itemCount > 0;
  }

  async verifyMXNValuesHavePesoSymbol() {
    const items = await this.page.locator(this.breakdownItem).all();
    
    for (const item of items) {
      const label = await item.locator(this.itemLabel).textContent();
      
      if (label && label.includes('MXN')) {
        const value = await item.locator(this.itemValue).textContent();
        
        if (value && !value.trim().startsWith('$')) {
          return false;
        }
      }
    }
    return true;
  }

  async verifyCurrencySymbolConsistency(pesoItemNames) {
    const items = await this.page.locator(this.breakdownItem).all();
    
    for (const item of items) {
      const label = await item.locator(this.itemLabel).textContent();
      const trimmedLabel = label ? label.trim() : '';
      
      const isPesoItem = pesoItemNames.some(name => 
        trimmedLabel.toLowerCase().includes(name.toLowerCase())
      );
      
      if (isPesoItem) {
        const value = await item.locator(this.itemValue).textContent();
        const trimmedValue = value ? value.trim() : '';
        
        if (!trimmedValue.startsWith('$')) {
          return false;
        }
        
        if (!this.mxnValuePattern.test(trimmedValue)) {
          console.warn(`Value format mismatch for ${trimmedLabel}: ${trimmedValue}`);
        }
      }
    }
    return true;
  }

  async closeBreakdownPopup() {
    await this.page.locator(this.breakdownCloseButton).click();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractBreakdownPage;