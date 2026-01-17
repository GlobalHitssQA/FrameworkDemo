class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.searchIcon = page.locator('[data-testid="contract-search-icon"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.bankContractOption = page.locator('[data-testid="bank-contract-option"]');
    this.casaDeBolsaContractOption = page.locator('[data-testid="casa-bolsa-contract-option"]');
    this.contractValueComponent = page.locator('[data-testid="contract-total-value"]');
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.cashInTransitField = page.locator('[data-testid="cash-in-transit-field"]');
    this.cashInTransitValue = page.locator('[data-testid="cash-in-transit-value"]');
    this.closeBreakdownButton = page.locator('[data-testid="breakdown-close-button"]');
    this.contractLoadedIndicator = page.locator('[data-testid="contract-loaded-indicator"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector('[data-testid="authenticated-user"]', { timeout: 10000 });
  }

  async openContractSearch() {
    await this.searchIcon.click();
    await this.contractSearchInput.waitFor({ state: 'visible' });
  }

  async selectBankContractWithCashInTransit() {
    await this.contractSearchInput.fill('BANCO');
    await this.bankContractOption.first().click();
  }

  async selectCasaDeBolsaContract() {
    await this.contractSearchInput.fill('CASA DE BOLSA');
    await this.casaDeBolsaContractOption.first().click();
  }

  async isContractLoaded() {
    return await this.contractLoadedIndicator.isVisible();
  }

  async clickContractValueComponent() {
    await this.contractValueComponent.click();
  }

  async waitForBreakdownPopup() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async isCashInTransitFieldVisible() {
    return await this.cashInTransitField.isVisible();
  }

  async getCashInTransitValue() {
    if (await this.cashInTransitValue.isVisible()) {
      return await this.cashInTransitValue.textContent();
    }
    return null;
  }

  async closeBreakdownPopup() {
    await this.closeBreakdownButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }
};

module.exports = ContractBreakdownPage;