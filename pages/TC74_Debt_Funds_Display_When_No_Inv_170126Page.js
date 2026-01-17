class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    this.searchClientInput = '[data-testid="search-client-contract"]';
    this.searchButton = '[data-testid="search-button-lupa"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractWithoutDebtFundsOption = '[data-testid="contract-no-debt-funds"]';
    this.contractDisplayContainer = '[data-testid="contract-display-container"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.debtFundsSection = '[data-testid="debt-funds-section"]';
    this.debtFundsValue = '[data-testid="debt-funds-value"]';
    this.popupOverlay = '[data-testid="popup-overlay"]';
    this.mainContent = '[data-testid="main-content"]';
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.searchClientInput, { state: 'visible', timeout: 10000 });
  }

  async verifyContractWithoutDebtFundsExists() {
    await this.page.waitForSelector(this.contractSelector, { state: 'visible' });
  }

  async selectContractWithoutDebtFunds() {
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.contractWithoutDebtFundsOption, { state: 'visible' });
    await this.page.click(this.contractWithoutDebtFundsOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractDisplayed() {
    await this.page.waitForSelector(this.contractDisplayContainer, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.contractDisplayContainer);
  }

  async clickTotalContractValue() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getDebtFundsValue() {
    await this.page.waitForSelector(this.debtFundsSection, { state: 'visible' });
    const valueElement = await this.page.waitForSelector(this.debtFundsValue, { state: 'visible' });
    const text = await valueElement.textContent();
    return text.trim();
  }

  async clickOutsideBreakdownPopup() {
    const overlay = await this.page.$(this.popupOverlay);
    if (overlay) {
      await overlay.click({ position: { x: 10, y: 10 } });
    } else {
      await this.page.click(this.mainContent, { force: true });
    }
  }

  async isBreakdownPopupClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    const isHidden = await this.page.isHidden(this.breakdownPopup);
    return isHidden;
  }
}

module.exports = ContractBreakdownPage;