class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.contractValueComponent = page.locator('[data-testid="contract-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownCloseButton = page.locator('[data-testid="breakdown-close-button"]');
    this.monetaryValueItems = page.locator('[data-testid="monetary-value-item"]');
    this.totalContractValue = page.locator('[data-testid="total-contract-value"]');
    this.breakdownItemValue = page.locator('[data-testid="breakdown-item-value"]');
    this.purchasingPowerMXN = page.locator('[data-testid="purchasing-power-mxn"]');
    this.cashMXN = page.locator('[data-testid="cash-mxn"]');
    this.cashUSD = page.locator('[data-testid="cash-usd"]');
    this.pendingSettlement = page.locator('[data-testid="pending-settlement"]');
    this.fundsValue = page.locator('[data-testid="funds-value"]');
    this.cedesAndPromissory = page.locator('[data-testid="cedes-promissory"]');
    this.moneyMarket = page.locator('[data-testid="money-market"]');
    this.capitalMarket = page.locator('[data-testid="capital-market"]');
    this.searchIcon = page.locator('[data-testid="search-client-contract"]');
  }

  async navigateToContract() {
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.contractValueComponent.isVisible();
  }

  async clickContractValueComponent() {
    await this.contractValueComponent.click();
  }

  async waitForBreakdownPopup() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 10000 });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async closeBreakdownPopup() {
    await this.breakdownCloseButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }

  async getAllMonetaryValues() {
    const values = [];
    
    const totalValue = await this.totalContractValue.textContent();
    if (totalValue) values.push(totalValue.trim());
    
    const breakdownItems = await this.breakdownItemValue.all();
    for (const item of breakdownItems) {
      const text = await item.textContent();
      if (text) values.push(text.trim());
    }
    
    const specificLocators = [
      this.purchasingPowerMXN,
      this.cashMXN,
      this.cashUSD,
      this.pendingSettlement,
      this.fundsValue,
      this.cedesAndPromissory,
      this.moneyMarket,
      this.capitalMarket
    ];
    
    for (const locator of specificLocators) {
      const isVisible = await locator.isVisible().catch(() => false);
      if (isVisible) {
        const text = await locator.textContent();
        if (text) values.push(text.trim());
      }
    }
    
    return values;
  }

  async getTotalContractValue() {
    return await this.totalContractValue.textContent();
  }

  async getBreakdownItemsCount() {
    return await this.breakdownItemValue.count();
  }
}

module.exports = ContractValuePage;