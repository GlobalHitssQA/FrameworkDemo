const { expect } = require('@playwright/test');

class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    // Locators - inferidos usando buenas prácticas
    this.loginUsernameInput = '[data-testid="login-username"]';
    this.loginPasswordInput = '[data-testid="login-password"]';
    this.loginSubmitButton = '[data-testid="login-submit-btn"]';
    this.acticenterModuleLink = '[data-testid="acticenter-module-link"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-btn"]';
    this.activeContractItem = '[data-testid="active-contract-item"]';
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.totalValueDisplay = '[data-testid="total-contract-value"]';
    this.breakdownPopupTrigger = '[data-testid="breakdown-popup-trigger"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownPopupCloseArea = '[data-testid="popup-overlay"]';
    this.purchasePowerMXN = '[data-testid="purchase-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.fundsList = '[data-testid="funds-list"]';
    this.pendingSettlements = '[data-testid="pending-settlements"]';
  }

  async enableMemoryMonitoring() {
    await this.page.evaluate(() => {
      if (window.performance && window.performance.memory) {
        console.log('Memory monitoring enabled');
      }
    });
  }

  async navigateToLogin() {
    await this.page.goto(`${this.baseUrl}/login`);
    await this.page.waitForLoadState('networkidle');
  }

  async performLogin() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpassword';
    
    await this.page.fill(this.loginUsernameInput, username);
    await this.page.fill(this.loginPasswordInput, password);
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToActicenterModule() {
    await this.page.click(this.acticenterModuleLink);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.waitForSelector(this.activeContractItem);
    await this.page.click(this.activeContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isValueCompositionComponentVisible() {
    await this.page.waitForSelector(this.valueCompositionComponent, { timeout: 10000 });
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async getMemoryUsage() {
    const memory = await this.page.evaluate(() => {
      if (window.performance && window.performance.memory) {
        return window.performance.memory.usedJSHeapSize / (1024 * 1024);
      }
      return 0;
    });
    return memory;
  }

  async openBreakdownPopup() {
    await this.page.click(this.breakdownPopupTrigger);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownPopupCloseArea, { position: { x: 10, y: 10 } });
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }

  async openAndClosePopupMultipleTimes(times) {
    for (let i = 0; i < times; i++) {
      await this.openBreakdownPopup();
      await this.page.waitForTimeout(100);
      await this.closeBreakdownPopup();
      await this.page.waitForTimeout(100);
      
      if ((i + 1) % 10 === 0) {
        console.log(`Completed ${i + 1} iterations of open/close cycle`);
      }
    }
  }

  async isBreakdownPopupClosed() {
    return await this.page.isHidden(this.breakdownPopup);
  }

  async forceGarbageCollection() {
    await this.page.evaluate(() => {
      if (window.gc) {
        window.gc();
      }
    });
  }

  async waitForMemoryCleanup() {
    await this.page.waitForTimeout(2000);
  }

  async getTotalContractValue() {
    return await this.page.textContent(this.totalValueDisplay);
  }

  async getPurchasePowerMXN() {
    return await this.page.textContent(this.purchasePowerMXN);
  }

  async getCashMXN() {
    return await this.page.textContent(this.cashMXN);
  }

  async getCashUSD() {
    return await this.page.textContent(this.cashUSD);
  }

  async getPendingSettlements() {
    return await this.page.textContent(this.pendingSettlements);
  }
}

module.exports = ActicenterPage;