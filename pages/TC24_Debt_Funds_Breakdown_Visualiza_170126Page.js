const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.breakdownList = page.locator('[data-testid="breakdown-list"]');
    this.debtFundsItem = page.locator('[data-testid="breakdown-item-debt-funds"]');
    this.debtFundsValue = page.locator('[data-testid="breakdown-item-debt-funds"] [data-testid="item-value"]');
    this.closeBreakdownButton = page.locator('[data-testid="close-breakdown-popup"]');
    this.searchClientInput = page.locator('[data-testid="search-client-contract"]');
    this.contractSelector = page.locator('[data-testid="contract-selector"]');
    this.loginUsernameInput = page.locator('[data-testid="username-input"]');
    this.loginPasswordInput = page.locator('[data-testid="password-input"]');
    this.loginSubmitButton = page.locator('[data-testid="login-submit"]');
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpassword';
    
    await this.loginUsernameInput.fill(username);
    await this.loginPasswordInput.fill(password);
    await this.loginSubmitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectContractWithDebtFunds() {
    await this.contractSelector.click();
    const contractWithDebtFunds = this.page.locator('[data-testid="contract-option"]').filter({ hasText: 'Fondos de deuda' }).first();
    await contractWithDebtFunds.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.totalContractValueComponent.isVisible();
  }

  async clickOnTotalContractValue() {
    await this.totalContractValueComponent.click();
    await this.breakdownPopup.waitFor({ state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async isDebtFundsItemVisible() {
    return await this.debtFundsItem.isVisible();
  }

  async getDebtFundsAccumulatedValue() {
    const valueText = await this.debtFundsValue.textContent();
    return valueText ? valueText.trim() : null;
  }

  async closeBreakdownPopup() {
    await this.closeBreakdownButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }
}

module.exports = ContractValuePage;