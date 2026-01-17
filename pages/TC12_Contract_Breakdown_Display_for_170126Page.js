class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.bankIndividualContractOption = '[data-testid="contract-option-bank-individual"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.cashMXNItem = '[data-testid="breakdown-item-cash-mxn"]';
    this.cashMXNValue = '[data-testid="breakdown-item-cash-mxn"] [data-testid="monetary-value"]';
    this.purchasingPowerMXNItem = '[data-testid="breakdown-item-purchasing-power-mxn"]';
    this.closeBreakdownButton = '[data-testid="breakdown-popup-close"]';
    this.searchIcon = '[data-testid="search-client-contract"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async openContractSelector() {
    await this.page.click(this.contractSelector);
    await this.page.waitForTimeout(500);
  }

  async selectBankIndividualContract() {
    await this.page.click(this.bankIndividualContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueVisible() {
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickTotalContractValue() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForTimeout(300);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isCashMXNItemVisible() {
    return await this.page.isVisible(this.cashMXNItem);
  }

  async cashMXNHasMonetaryValue() {
    const valueElement = await this.page.locator(this.cashMXNValue);
    const text = await valueElement.textContent();
    const monetaryPattern = /\$[\d,]+(\.\d{2})?/;
    return monetaryPattern.test(text);
  }

  async isPurchasingPowerMXNVisible() {
    return await this.page.isVisible(this.purchasingPowerMXNItem);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForTimeout(300);
  }

  async getCashMXNValue() {
    return await this.page.textContent(this.cashMXNValue);
  }

  async getBreakdownItems() {
    return await this.page.locator(`${this.breakdownList} [data-testid^="breakdown-item-"]`).allTextContents();
  }
};

module.exports = ContractBreakdownPage;