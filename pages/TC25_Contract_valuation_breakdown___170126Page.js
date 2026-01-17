class ContractValuationPage {
  constructor(page) {
    this.page = page;
    
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractWithEquityFunds = '[data-testid="contract-item-equity-funds"]';
    this.contractValueComponent = '[data-testid="contract-total-value-component"]';
    this.breakdownPopup = '[data-testid="valuation-breakdown-popup"]';
    this.equityFundsSection = '[data-testid="equity-funds-section"]';
    this.equityFundsLabel = '[data-testid="equity-funds-label"]';
    this.equityFundsValue = '[data-testid="equity-funds-monetary-value"]';
    this.fundsList = '[data-testid="funds-list"]';
    this.equityFundsRow = '[data-testid="funds-row-renta-variable"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithEquityFunds() {
    const contractItem = this.page.locator(this.contractWithEquityFunds).first();
    if (await contractItem.isVisible()) {
      await contractItem.click();
    } else {
      const contractList = this.page.locator('[data-testid="contract-list"] [data-testid="contract-item"]').first();
      await contractList.click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractValueComponentIsDisplayed() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isEquityFundsSectionVisible() {
    const sectionVisible = await this.page.isVisible(this.equityFundsSection);
    if (sectionVisible) return true;
    
    const rowVisible = await this.page.isVisible(this.equityFundsRow);
    if (rowVisible) return true;
    
    const labelVisible = await this.page.isVisible(this.equityFundsLabel);
    return labelVisible;
  }

  async getEquityFundsMonetaryValue() {
    let valueElement = this.page.locator(this.equityFundsValue);
    if (await valueElement.isVisible()) {
      return await valueElement.textContent();
    }
    
    valueElement = this.page.locator(this.equityFundsRow).locator('[data-testid="monetary-value"]');
    if (await valueElement.isVisible()) {
      return await valueElement.textContent();
    }
    
    valueElement = this.page.locator(this.equityFundsSection).locator('.monetary-value, .value, .amount').first();
    if (await valueElement.isVisible()) {
      return await valueElement.textContent();
    }
    
    return '';
  }
}

module.exports = ContractValuationPage;