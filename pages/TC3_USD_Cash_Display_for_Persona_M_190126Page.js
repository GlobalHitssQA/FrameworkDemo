const { expect } = require('@playwright/test');

class ContractPage {
  constructor(page) {
    this.page = page;
    
    this.searchInput = page.locator('[data-testid="contract-search-input"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    this.totalValueComponent = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.usdCashItem = page.locator('[data-testid="breakdown-item-usd-cash"]');
    this.usdCashValue = page.locator('[data-testid="breakdown-item-usd-cash-value"]');
    this.closePopupButton = page.locator('[data-testid="breakdown-popup-close"]');
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.contractList = page.locator('[data-testid="contract-list"]');
    this.contractItem = page.locator('[data-testid="contract-item"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getContractWithMexdolar() {
    return process.env.CONTRACT_WITH_MEXDOLAR || 'PM-BANCO-MEXDOLAR-001';
  }

  async getContractWithoutMexdolar() {
    return process.env.CONTRACT_WITHOUT_MEXDOLAR || 'PM-BANCO-NO-MEXDOLAR-001';
  }

  async searchAndSelectContract(contractId) {
    await this.searchInput.fill(contractId);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
    
    const contractSelector = this.page.locator(`[data-testid="contract-item-${contractId}"]`);
    await contractSelector.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.totalValueComponent.isVisible();
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.click();
    await this.page.waitForSelector('[data-testid="breakdown-popup"]', { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async isUsdCashItemVisible() {
    return await this.usdCashItem.isVisible({ timeout: 3000 }).catch(() => false);
  }

  async getUsdCashValue() {
    if (await this.isUsdCashItemVisible()) {
      return await this.usdCashValue.textContent();
    }
    return null;
  }

  async getUsdCashDisplayFormat() {
    const valueElement = this.usdCashValue;
    const text = await valueElement.textContent();
    const currencyLabel = await this.page.locator('[data-testid="breakdown-item-usd-cash-currency"]').textContent().catch(() => '');
    return `${currencyLabel} ${text}`.trim();
  }

  async closeBreakdownPopup() {
    const isVisible = await this.breakdownPopup.isVisible();
    if (isVisible) {
      await this.closePopupButton.click().catch(async () => {
        await this.page.keyboard.press('Escape');
      });
      await this.page.waitForSelector('[data-testid="breakdown-popup"]', { state: 'hidden' });
    }
  }
};

module.exports = ContractPage;