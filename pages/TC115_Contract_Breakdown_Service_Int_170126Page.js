const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Search locators
    this.searchIcon = '[data-testid="search-client-icon"]';
    this.searchInput = '[data-testid="search-contract-input"]';
    this.contractResultItem = '[data-testid="contract-result-item"]';
    this.individualPersonContractOption = '[data-testid="individual-person-contract"]';
    
    // Contract value component locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    
    // Breakdown popup locators
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.purchasingPowerItem = '[data-testid="breakdown-purchasing-power"]';
    this.cashMXNItem = '[data-testid="breakdown-cash-mxn"]';
    this.cashUSDItem = '[data-testid="breakdown-cash-usd"]';
    this.pendingSettlementItem = '[data-testid="breakdown-pending-settlement"]';
    this.fundsItem = '[data-testid="breakdown-funds"]';
    this.cedesItem = '[data-testid="breakdown-cedes"]';
    this.moneyMarketItem = '[data-testid="breakdown-money-market"]';
    this.capitalMarketItem = '[data-testid="breakdown-capital-market"]';
    
    // Generic breakdown item locators
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    this.breakdownItems = '[data-testid^="breakdown-"]';
  }

  async navigateToLogin() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.ACTICENTER_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.ACTICENTER_PASSWORD || 'testpassword');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchAndSelectIndividualPersonContract() {
    await this.page.click(this.searchIcon);
    await this.page.fill(this.searchInput, process.env.TEST_CONTRACT_ID || 'PF-TEST-001');
    await this.page.waitForSelector(this.contractResultItem);
    await this.page.click(this.individualPersonContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async clickContractValueComponentAndCaptureResponse() {
    let capturedResponse = null;
    
    const responsePromise = this.page.waitForResponse(
      response => response.url().includes('AGAS21437'),
      { timeout: 30000 }
    );
    
    await this.page.click(this.contractValueComponent);
    
    try {
      const response = await responsePromise;
      capturedResponse = {
        url: response.url(),
        status: response.status(),
        body: await response.json()
      };
    } catch (error) {
      console.error('Failed to capture AGAS21437 response:', error);
    }
    
    return capturedResponse;
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isPurchasingPowerItemVisible() {
    return await this.page.isVisible(this.purchasingPowerItem);
  }

  async isCashMXNItemVisible() {
    return await this.page.isVisible(this.cashMXNItem);
  }

  async isCashUSDItemVisible() {
    return await this.page.isVisible(this.cashUSDItem);
  }

  async isPendingSettlementItemVisible() {
    return await this.page.isVisible(this.pendingSettlementItem);
  }

  async isFundsItemVisible() {
    return await this.page.isVisible(this.fundsItem);
  }

  async isCedesItemVisible() {
    return await this.page.isVisible(this.cedesItem);
  }

  async isMoneyMarketItemVisible() {
    return await this.page.isVisible(this.moneyMarketItem);
  }

  async isCapitalMarketItemVisible() {
    return await this.page.isVisible(this.capitalMarketItem);
  }

  async getItemsWithZeroValue() {
    const items = [];
    const breakdownSelectors = [
      { name: 'purchasingPower', selector: this.purchasingPowerItem },
      { name: 'cashMXN', selector: this.cashMXNItem },
      { name: 'cashUSD', selector: this.cashUSDItem },
      { name: 'pendingSettlement', selector: this.pendingSettlementItem },
      { name: 'funds', selector: this.fundsItem },
      { name: 'cedes', selector: this.cedesItem },
      { name: 'moneyMarket', selector: this.moneyMarketItem },
      { name: 'capitalMarket', selector: this.capitalMarketItem }
    ];
    
    for (const item of breakdownSelectors) {
      const valueElement = await this.page.$(`${item.selector} ${this.breakdownItemValue}`);
      if (valueElement) {
        const value = await valueElement.textContent();
        if (value && value.trim() === '$0.00') {
          items.push({ name: item.name, value: value.trim() });
        }
      }
    }
    
    return items;
  }

  async closeBreakdownPopup() {
    await this.page.click('body', { position: { x: 0, y: 0 } });
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async getContractTotalValue() {
    return await this.page.textContent(this.contractTotalValue);
  }
}

module.exports = ContractBreakdownPage;