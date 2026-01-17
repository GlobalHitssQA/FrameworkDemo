class ContractCompositionPage {
  constructor(page) {
    this.page = page;
    
    this.contractValueComponent = page.locator('[data-testid="contract-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
    this.efectivoUSDItem = page.locator('[data-testid="breakdown-item-efectivo-usd"]');
    this.efectivoMXNItem = page.locator('[data-testid="breakdown-item-efectivo-mxn"]');
    this.efectivoUSDLabel = page.locator('[data-testid="breakdown-item-efectivo-usd"] [data-testid="item-label"]');
    this.efectivoUSDValue = page.locator('[data-testid="breakdown-item-efectivo-usd"] [data-testid="item-value"]');
    this.efectivoMXNLabel = page.locator('[data-testid="breakdown-item-efectivo-mxn"] [data-testid="item-label"]');
    this.closeBreakdownButton = page.locator('[data-testid="breakdown-close-button"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.contractSearchButton = page.locator('[data-testid="contract-search-button"]');
    this.contractListItem = page.locator('[data-testid="contract-list-item"]');
    this.contractWithUSD = page.locator('[data-testid="contract-item-usd-balance"]');
  }

  async navigateToActicenter() {
    await this.page.goto('/');
  }

  async waitForAuthentication() {
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractWithUSDAvailable() {
    await this.page.waitForSelector('[data-testid="contract-list-item"]', { timeout: 10000 });
    const usdContract = await this.contractWithUSD.first();
    return await usdContract.isVisible().catch(() => false);
  }

  async selectContractWithUSDBalance() {
    await this.contractWithUSD.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.contractValueComponent.isVisible();
  }

  async clickContractValueComponent() {
    await this.contractValueComponent.click();
    await this.breakdownPopup.waitFor({ state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async isEfectivoUSDItemVisible() {
    return await this.efectivoUSDItem.isVisible();
  }

  async getEfectivoUSDValue() {
    return await this.efectivoUSDValue.textContent();
  }

  async getEfectivoUSDLabel() {
    return await this.efectivoUSDLabel.textContent();
  }

  async getEfectivoMXNLabel() {
    return await this.efectivoMXNLabel.textContent();
  }

  async closeBreakdownPopup() {
    await this.closeBreakdownButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }

  async searchContract(contractNumber) {
    await this.contractSearchInput.fill(contractNumber);
    await this.contractSearchButton.click();
    await this.page.waitForLoadState('networkidle');
  }
};

module.exports = ContractCompositionPage;