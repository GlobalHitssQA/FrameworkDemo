class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.totalValueComponent = '[data-testid="contract-total-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    this.searchClientInput = '[data-testid="search-client-contract"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractOption = '[data-testid="contract-option-single-active"]';
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
  }

  async authenticate() {
    await this.page.fill(this.usernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.TEST_PASSWORD || 'testpassword');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectContractWithSingleActiveItem() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractSelector);
    await this.page.click(this.contractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForContractInfoToLoad() {
    await this.page.waitForSelector(this.contractInfoContainer, { state: 'visible' });
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getBreakdownItemsCount() {
    const items = await this.page.$$(this.breakdownItem);
    return items.length;
  }

  async getActiveItemValue() {
    const items = await this.page.$$(this.breakdownItem);
    for (const item of items) {
      const valueElement = await item.$(this.breakdownItemValue.replace('[data-testid="breakdown-item"]', ''));
      if (valueElement) {
        const value = await valueElement.textContent();
        const cleanValue = value.trim();
        if (!cleanValue.match(/\$0\.00/)) {
          return cleanValue;
        }
      }
    }
    return null;
  }

  async getZeroValueItems() {
    const zeroValues = [];
    const items = await this.page.$$(this.breakdownItem);
    for (const item of items) {
      const valueElement = await item.$('[data-testid="breakdown-item-value"]');
      if (valueElement) {
        const value = await valueElement.textContent();
        const cleanValue = value.trim();
        if (cleanValue.match(/\$0\.00/)) {
          zeroValues.push(cleanValue);
        }
      }
    }
    return zeroValues;
  }

  async getTotalValueFromComponent() {
    const totalElement = await this.page.$(this.totalValueComponent);
    const totalText = await totalElement.textContent();
    return totalText.trim();
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = ContractBreakdownPage;