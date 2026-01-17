class ContractSearchPage {
  constructor(page) {
    this.page = page;
    
    // Header and search locators
    this.magnifyingGlassIcon = page.locator('[data-testid="search-icon-magnifying-glass"]');
    this.headerContainer = page.locator('[data-testid="acticenter-header"]');
    
    // Contract list locators
    this.contractListContainer = page.locator('[data-testid="contract-list-container"]');
    this.contractListItems = page.locator('[data-testid="contract-list-item"]');
    this.bpListContainer = page.locator('[data-testid="bp-list-container"]');
    
    // Operation screen locators
    this.operationScreen = page.locator('[data-testid="operation-screen"]');
    this.contractLoadedIndicator = page.locator('[data-testid="contract-loaded-indicator"]');
    
    // Total contract value component locators
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value-component"]');
    this.contractValueDisplay = page.locator('[data-testid="contract-value-display"]');
    
    // Breakdown popup locators
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownMonetaryItems = page.locator('[data-testid="breakdown-monetary-item"]');
    this.purchasingPowerMXN = page.locator('[data-testid="purchasing-power-mxn"]');
    this.cashMXN = page.locator('[data-testid="cash-mxn"]');
    this.cashUSD = page.locator('[data-testid="cash-usd"]');
    this.debtFunds = page.locator('[data-testid="debt-funds"]');
    this.hedgeFunds = page.locator('[data-testid="hedge-funds"]');
    this.equityFunds = page.locator('[data-testid="equity-funds"]');
    this.moneyMarket = page.locator('[data-testid="money-market"]');
    this.capitalMarket = page.locator('[data-testid="capital-market"]');
    this.pendingSettlement = page.locator('[data-testid="pending-settlement"]');
  }

  async verifyUserIsAuthenticated() {
    await this.headerContainer.waitFor({ state: 'visible', timeout: 10000 });
  }

  async verifyMagnifyingGlassIconIsVisible() {
    await this.magnifyingGlassIcon.waitFor({ state: 'visible', timeout: 5000 });
  }

  async clickMagnifyingGlassIcon() {
    await this.magnifyingGlassIcon.click();
  }

  async isContractListVisible() {
    try {
      await this.contractListContainer.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async selectFirstAvailableContract() {
    await this.contractListItems.first().waitFor({ state: 'visible', timeout: 5000 });
    await this.contractListItems.first().click();
  }

  async isOperationScreenLoaded() {
    try {
      await this.operationScreen.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async isTotalContractValueComponentVisible() {
    try {
      await this.totalContractValueComponent.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async contractValueIsDisplayed() {
    const valueText = await this.contractValueDisplay.textContent();
    return valueText !== null && valueText.trim().length > 0;
  }

  async clickTotalContractValueComponent() {
    await this.totalContractValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    try {
      await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async breakdownContainsMonetaryItems() {
    const itemCount = await this.breakdownMonetaryItems.count();
    return itemCount > 0;
  }

  async getContractValue() {
    return await this.contractValueDisplay.textContent();
  }

  async getPurchasingPowerMXN() {
    return await this.purchasingPowerMXN.textContent();
  }

  async getCashMXN() {
    return await this.cashMXN.textContent();
  }

  async getCashUSD() {
    return await this.cashUSD.textContent();
  }

  async closeBreakdownByClickingOutside() {
    await this.page.click('body', { position: { x: 0, y: 0 } });
  }
}

module.exports = ContractSearchPage;