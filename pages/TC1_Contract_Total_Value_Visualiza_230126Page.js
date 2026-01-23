class ContractPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://ota-acticenter.example.com';
    
    // Locators
    this.totalValueComponent = '[data-testid="contract-total-value"]';
    this.contractSection = '[data-testid="contract-section"]';
    this.contractValueAmount = '[data-testid="contract-value-amount"]';
    this.searchButton = '[data-testid="search-button"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.closePopupButton = '[data-testid="close-popup-button"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
  }

  async navigateToMainPage() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToContractSection() {
    await this.page.click(this.contractSection);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.contractValueAmount);
    return await this.page.textContent(this.contractValueAmount);
  }

  async clickSearchButton() {
    await this.page.click(this.searchButton);
  }

  async openBreakdownPopup() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup);
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closePopupButton);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getBreakdownItems() {
    return await this.page.$$eval(`${this.breakdownList} li`, items => 
      items.map(item => item.textContent)
    );
  }
}

module.exports = ContractPage;