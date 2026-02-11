class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://example.com';
    this.contractValueComponent = '[data-testid="contract-total-value"]';
    this.contractValueAmount = '[data-testid="contract-value-amount"]';
    this.dashboardContainer = '[data-testid="dashboard-container"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async isContractValueVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async getContractValueText() {
    return await this.page.textContent(this.contractValueAmount);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }
}

module.exports = ContractValuePage;