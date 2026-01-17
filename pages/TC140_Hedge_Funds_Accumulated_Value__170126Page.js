class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators for contract search
    this.searchLensButton = '[data-testid="contract-search-lens"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchResults = '[data-testid="contract-search-results"]';
    this.contractWithHedgeFunds = '[data-testid="contract-item-hedge-funds"]';
    
    // Locators for contract value component
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    
    // Locators for breakdown popup
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    
    // Locators for Hedge Funds section
    this.hedgeFundsSection = '[data-testid="breakdown-item-hedge-funds"]';
    this.hedgeFundsAccumulatedValue = '[data-testid="hedge-funds-accumulated-value"]';
    this.hedgeFundsDetailList = '[data-testid="hedge-funds-detail-list"]';
    this.hedgeFundInvestmentItem = '[data-testid="hedge-fund-investment-item"]';
    this.hedgeFundInvestmentValue = '[data-testid="hedge-fund-investment-value"]';
    
    // Authentication indicator
    this.authenticatedUserIndicator = '[data-testid="authenticated-user"]';
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.authenticatedUserIndicator, { state: 'visible', timeout: 30000 });
  }

  async openContractSearch() {
    await this.page.click(this.searchLensButton);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async searchAndSelectContractWithHedgeFunds() {
    await this.page.fill(this.contractSearchInput, 'hedge funds contract');
    await this.page.waitForSelector(this.contractSearchResults, { state: 'visible' });
    await this.page.click(this.contractWithHedgeFunds);
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async getIndividualHedgeFundInvestmentValues() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
    await this.page.click(this.hedgeFundsSection);
    await this.page.waitForSelector(this.hedgeFundsDetailList, { state: 'visible' });
    
    const investmentElements = await this.page.$$(this.hedgeFundInvestmentValue);
    const values = [];
    
    for (const element of investmentElements) {
      const textContent = await element.textContent();
      const numericValue = this.parseMonetaryValue(textContent);
      values.push(numericValue);
    }
    
    await this.page.click(this.breakdownCloseButton);
    return values;
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isHedgeFundsSectionVisible() {
    return await this.page.isVisible(this.hedgeFundsSection);
  }

  async getHedgeFundsAccumulatedValue() {
    const valueText = await this.page.textContent(this.hedgeFundsAccumulatedValue);
    return this.parseMonetaryValue(valueText);
  }

  parseMonetaryValue(text) {
    if (!text) return 0;
    const cleanedText = text.replace(/[^0-9.,\-]/g, '');
    const normalizedText = cleanedText.replace(/,/g, '');
    return parseFloat(normalizedText) || 0;
  }
}

module.exports = ContractValuePage;