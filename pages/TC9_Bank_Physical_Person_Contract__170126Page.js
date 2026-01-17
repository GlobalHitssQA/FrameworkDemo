class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - inferidos basados en mejores prácticas
    this.searchContractInput = '[data-testid="search-contract-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.bankPhysicalPersonContract = '[data-testid="contract-type-bank-physical-person"]';
    this.operationScreen = '[data-testid="operation-screen"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.cashMXNSection = '[data-testid="cash-mxn-section"]';
    this.cashMXNValue = '[data-testid="cash-mxn-value"]';
    this.contractHeader = '[data-testid="contract-header"]';
    this.closePopupButton = '[data-testid="close-popup-button"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.searchContractInput, { state: 'visible', timeout: 30000 });
  }

  async selectBankPhysicalPersonContract() {
    const contractSelector = this.bankPhysicalPersonContract;
    await this.page.waitForSelector(contractSelector, { state: 'visible' });
    await this.page.click(contractSelector);
    await this.page.waitForLoadState('networkidle');
  }

  async isOperationScreenDisplayed() {
    await this.page.waitForSelector(this.operationScreen, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.operationScreen);
  }

  async clickTotalContractValueComponent() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible' });
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isCashMXNSectionVisible() {
    await this.page.waitForSelector(this.cashMXNSection, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.cashMXNSection);
  }

  async getCashMXNValue() {
    await this.page.waitForSelector(this.cashMXNValue, { state: 'visible' });
    return await this.page.textContent(this.cashMXNValue);
  }

  async getExpectedCheckingAccountBalance() {
    // Este método simula la obtención del saldo esperado desde el backend
    // En implementación real, se conectaría al servicio de consulta de saldos
    return process.env.EXPECTED_CHECKING_BALANCE || '0.00';
  }

  async closeBreakdownPopup() {
    const closeButton = this.page.locator(this.closePopupButton);
    if (await closeButton.isVisible()) {
      await closeButton.click();
    } else {
      await this.page.click('body', { position: { x: 10, y: 10 } });
    }
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = ContractBreakdownPage;