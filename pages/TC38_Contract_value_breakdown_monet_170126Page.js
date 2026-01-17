const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    // Search and contract locators
    this.searchIcon = page.locator('[data-testid="search-icon"]');
    this.searchInput = page.locator('[data-testid="search-contract-input"]');
    this.contractSearchResult = page.locator('[data-testid="contract-search-result"]').first();
    this.contractInformation = page.locator('[data-testid="contract-information"]');
    
    // Contract value component locators
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    
    // Breakdown items locators
    this.breakdownItemLabels = page.locator('[data-testid="breakdown-item-label"]');
    this.breakdownItemValues = page.locator('[data-testid="breakdown-item-value"]');
    this.monetaryValues = page.locator('[data-testid="monetary-value"]');
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
  }

  async login() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpassword';
    
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchAndSelectContract() {
    await this.searchIcon.click();
    await this.searchInput.fill(process.env.TEST_CONTRACT || 'CONTRACT123');
    await this.page.keyboard.press('Enter');
    await this.contractSearchResult.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractInformationDisplayed() {
    return await this.contractInformation.isVisible();
  }

  async clickTotalContractValue() {
    await this.totalContractValueComponent.click();
    await this.breakdownPopup.waitFor({ state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async areMonetaryValuesRightAligned() {
    const values = await this.breakdownItemValues.all();
    
    for (const value of values) {
      const textAlign = await value.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.textAlign;
      });
      
      if (textAlign !== 'right' && textAlign !== 'end') {
        return false;
      }
    }
    
    return values.length > 0;
  }

  async areItemLabelsLeftAligned() {
    const labels = await this.breakdownItemLabels.all();
    
    for (const label of labels) {
      const textAlign = await label.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.textAlign;
      });
      
      if (textAlign !== 'left' && textAlign !== 'start') {
        return false;
      }
    }
    
    return labels.length > 0;
  }
}

module.exports = ContractBreakdownPage;