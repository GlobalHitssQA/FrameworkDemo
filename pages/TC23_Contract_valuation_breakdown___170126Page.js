class ContractValuationPage {
  constructor(page) {
    this.page = page;
    
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.searchClientInput = '[data-testid="search-client-contract"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractWithHedgeFunds = '[data-testid="contract-hedge-funds"]';
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="valuation-breakdown-popup"]';
    this.hedgeFundsSection = '[data-testid="hedge-funds-section"]';
    this.hedgeFundsValue = '[data-testid="hedge-funds-monetary-value"]';
    this.fundsList = '[data-testid="funds-list"]';
    this.closePopupButton = '[data-testid="close-breakdown-popup"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithHedgeFunds() {
    const contractSelector = this.contractWithHedgeFunds;
    const contractExists = await this.page.locator(contractSelector).count();
    
    if (contractExists > 0) {
      await this.page.click(contractSelector);
    } else {
      await this.page.click(this.contractListItem + ':first-child');
    }
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTotalValueComponentDisplayed() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isHedgeFundsSectionVisible() {
    return await this.page.isVisible(this.hedgeFundsSection);
  }

  async getHedgeFundsMonetaryValue() {
    const valueElement = this.page.locator(this.hedgeFundsValue);
    if (await valueElement.isVisible()) {
      return await valueElement.textContent();
    }
    return null;
  }

  async closeBreakdownPopup() {
    const closeButton = this.page.locator(this.closePopupButton);
    if (await closeButton.isVisible()) {
      await closeButton.click();
    } else {
      await this.page.click('body');
    }
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }
}

module.exports = ContractValuationPage;