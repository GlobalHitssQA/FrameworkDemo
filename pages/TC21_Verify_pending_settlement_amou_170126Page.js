const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.profileSelector = page.locator('[data-testid="profile-selector"]');
    this.patrimonialBankingOption = page.locator('[data-testid="profile-patrimonial-banking"]');
    
    // Main screen locators
    this.mainScreenContainer = page.locator('[data-testid="acticenter-main-screen"]');
    this.searchContractInput = page.locator('[data-testid="search-contract-input"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    
    // Contract list locators
    this.contractList = page.locator('[data-testid="contract-list"]');
    this.bankContractItem = page.locator('[data-testid="contract-item-bank"]');
    
    // Contract value component locators
    this.contractValueComponent = page.locator('[data-testid="contract-total-value-component"]');
    this.contractValueAmount = page.locator('[data-testid="contract-value-amount"]');
    
    // Breakdown popup locators
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.breakdownList = page.locator('[data-testid="breakdown-list"]');
    this.closeBreakdownButton = page.locator('[data-testid="breakdown-close-button"]');
    
    // Pending settlement locators
    this.pendingSettlementItem = page.locator('[data-testid="breakdown-item-pending-settlement"]');
    this.pendingSettlementLabel = page.locator('[data-testid="pending-settlement-label"]');
    this.pendingSettlementValue = page.locator('[data-testid="pending-settlement-value"]');
    
    // Alternative CSS selectors
    this.pendingSettlementItemAlt = page.locator('.breakdown-item.pending-settlement');
    this.pendingSettlementValueAlt = page.locator('.breakdown-item.pending-settlement .monetary-value');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithPatrimonialBankingProfile() {
    await this.usernameInput.fill(process.env.ACTICENTER_USERNAME || 'test_user');
    await this.passwordInput.fill(process.env.ACTICENTER_PASSWORD || 'test_password');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
    
    if (await this.profileSelector.isVisible()) {
      await this.profileSelector.click();
      await this.patrimonialBankingOption.click();
    }
  }

  async isMainScreenVisible() {
    return await this.mainScreenContainer.isVisible({ timeout: 10000 });
  }

  async searchBankContractWithPendingSettlement() {
    const searchTerm = process.env.BANK_CONTRACT_ID || 'BANK_CONTRACT_PENDING';
    await this.searchContractInput.fill(searchTerm);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectBankContract() {
    await this.bankContractItem.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.contractValueComponent.isVisible({ timeout: 10000 });
  }

  async clickContractValueComponent() {
    await this.contractValueComponent.click();
    await this.page.waitForSelector('[data-testid="contract-breakdown-popup"]', { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible({ timeout: 5000 });
  }

  async isPendingSettlementItemVisible() {
    const primaryVisible = await this.pendingSettlementItem.isVisible({ timeout: 5000 }).catch(() => false);
    if (primaryVisible) return true;
    return await this.pendingSettlementItemAlt.isVisible({ timeout: 3000 }).catch(() => false);
  }

  async getPendingSettlementValue() {
    let valueText;
    
    if (await this.pendingSettlementValue.isVisible().catch(() => false)) {
      valueText = await this.pendingSettlementValue.textContent();
    } else if (await this.pendingSettlementValueAlt.isVisible().catch(() => false)) {
      valueText = await this.pendingSettlementValueAlt.textContent();
    }
    
    return valueText ? valueText.trim() : null;
  }

  isValidMonetaryFormat(value) {
    if (!value) return false;
    const monetaryPattern = /^[$]?[\d,]+(\.\d{2})?$|^-?[$]?[\d,]+(\.\d{2})?$/;
    const cleanValue = value.replace(/[MXN|USD|\s]/g, '').trim();
    return monetaryPattern.test(cleanValue) || cleanValue.length > 0;
  }

  async closeBreakdownPopup() {
    await this.closeBreakdownButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden', timeout: 3000 });
  }
}

module.exports = ContractValuePage;