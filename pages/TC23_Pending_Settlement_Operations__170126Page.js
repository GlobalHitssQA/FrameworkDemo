const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.dashboardContainer = '[data-testid="dashboard-container"]';
    
    // Contract search locators
    this.searchLupaButton = '[data-testid="search-client-contract-button"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.searchResultsList = '[data-testid="search-results-list"]';
    this.firstSearchResult = '[data-testid="search-result-item"]:first-child';
    
    // Contract value component locators
    this.contractValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="breakdown-close-button"]';
    
    // Breakdown items locators
    this.pendingSettlementRow = '[data-testid="breakdown-item-pending-settlement"]';
    this.pendingSettlementAmount = '[data-testid="pending-settlement-amount"]';
    
    // Alternative CSS selectors as fallback
    this.pendingSettlementRowAlt = '.breakdown-list .breakdown-item[data-category="pendientes-por-liquidar"]';
    this.monetaryValueSelector = '.monetary-value';
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async waitForDashboard() {
    await this.page.waitForSelector(this.dashboardContainer, { state: 'visible', timeout: 30000 });
  }

  async openContractSearch() {
    await this.page.click(this.searchLupaButton);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async searchContract(contractId) {
    await this.page.fill(this.searchInput, contractId);
    await this.page.press(this.searchInput, 'Enter');
    await this.page.waitForSelector(this.searchResultsList, { state: 'visible' });
  }

  async selectFirstContractResult() {
    await this.page.click(this.firstSearchResult);
  }

  async waitForContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 15000 });
  }

  async fetchPendingSettlementOperationsFromBackend() {
    const response = await this.page.request.get(
      `${process.env.API_BASE_URL}/api/contracts/${process.env.TEST_CONTRACT_ID}/pending-settlements`
    );
    const data = await response.json();
    return data.operations || [];
  }

  calculateTotalFromOperations(operations) {
    return operations.reduce((total, operation) => {
      return total + parseFloat(operation.amount || 0);
    }, 0);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async waitForBreakdownPopup() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 10000 });
  }

  async getPendingSettlementAmount() {
    const amountElement = await this.page.waitForSelector(this.pendingSettlementAmount, { state: 'visible' });
    return await amountElement.textContent();
  }

  parseMonetaryValue(valueString) {
    if (!valueString) return 0;
    const cleanedValue = valueString
      .replace(/[^0-9.,-]/g, '')
      .replace(/,/g, '');
    return parseFloat(cleanedValue) || 0;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getContractTotalValue() {
    const element = await this.page.waitForSelector(this.contractValueComponent);
    return await element.textContent();
  }
}

module.exports = ContractValuePage;