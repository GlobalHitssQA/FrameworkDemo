class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.consoleErrors = [];
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.popupOverlay = '[data-testid="popup-overlay"]';
    this.monetaryItems = '[data-testid="monetary-item"]';
    this.searchClientButton = '[data-testid="search-client-button"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.activeContractOption = '[data-testid="active-contract-option"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.fundsList = '[data-testid="funds-list"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.errorMessage = '[data-testid="error-message"]';
    this.loginForm = '[data-testid="login-form"]';
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.submitButton = '[data-testid="submit-button"]';
    this.outsideClickArea = 'body';
    
    this.setupConsoleListener();
  }

  setupConsoleListener() {
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        this.consoleErrors.push(msg.text());
      }
    });
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.TEST_PASSWORD || 'testpassword');
    await this.page.click(this.submitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.click(this.searchClientButton);
    await this.page.waitForSelector(this.contractSelector);
    await this.page.click(this.activeContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async hasMonetaryItems() {
    const items = await this.page.$$(this.monetaryItems);
    return items.length > 0;
  }

  async clickOutsidePopup() {
    const popup = await this.page.$(this.breakdownPopup);
    if (popup) {
      const box = await popup.boundingBox();
      if (box) {
        await this.page.mouse.click(box.x - 50, box.y - 50);
      }
    }
    await this.page.waitForTimeout(300);
  }

  async openAndClosePopupMultipleTimes(times) {
    const metrics = [];
    
    for (let i = 0; i < times; i++) {
      const openStart = Date.now();
      await this.page.click(this.contractValueComponent);
      await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
      const openEnd = Date.now();
      
      const closeStart = Date.now();
      await this.clickOutsidePopup();
      await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
      const closeEnd = Date.now();
      
      metrics.push({
        iteration: i + 1,
        openTime: openEnd - openStart,
        closeTime: closeEnd - closeStart
      });
    }
    
    return metrics;
  }

  validatePerformanceMetrics(metrics) {
    const maxAcceptableTime = 2000;
    const degradationThreshold = 1.5;
    
    if (metrics.length === 0) return false;
    
    const firstOpenTime = metrics[0].openTime;
    const firstCloseTime = metrics[0].closeTime;
    
    for (const metric of metrics) {
      if (metric.openTime > maxAcceptableTime || metric.closeTime > maxAcceptableTime) {
        return false;
      }
      
      if (metric.openTime > firstOpenTime * degradationThreshold) {
        return false;
      }
      
      if (metric.closeTime > firstCloseTime * degradationThreshold) {
        return false;
      }
    }
    
    return true;
  }

  async getConsoleErrors() {
    return this.consoleErrors;
  }

  async hasErrorMessagesOnScreen() {
    return await this.page.isVisible(this.errorMessage);
  }

  async getContractTotalValue() {
    return await this.page.textContent(this.contractValueComponent);
  }

  async getPurchasingPowerMXN() {
    return await this.page.textContent(this.purchasingPowerMXN);
  }

  async getCashMXN() {
    return await this.page.textContent(this.cashMXN);
  }

  async getCashUSD() {
    return await this.page.textContent(this.cashUSD);
  }
};

module.exports = ContractValuePage;