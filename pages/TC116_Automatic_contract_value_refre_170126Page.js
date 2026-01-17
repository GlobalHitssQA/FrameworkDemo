class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    
    // Search locators
    this.searchIcon = '[data-testid="search-client-contract-icon"]';
    this.searchInput = '[data-testid="search-input-field"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    
    // Contract value component locators
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.valueBreakdownPopup = '[data-testid="value-breakdown-popup"]';
    this.lastUpdateTimestamp = '[data-testid="last-update-timestamp"]';
    this.refreshIndicator = '[data-testid="refresh-indicator"]';
    
    // Breakdown items locators
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    this.fundsValue = '[data-testid="funds-value"]';
    this.cedesAndNotes = '[data-testid="cedes-notes"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    
    // State tracking
    this.pageLoadTimestamp = null;
    this.navigationCount = 0;
  }

  async navigateToActicenter() {
    this.pageLoadTimestamp = Date.now();
    this.navigationCount = 0;
    
    this.page.on('load', () => {
      this.navigationCount++;
    });
    
    await this.page.goto(this.baseUrl, { waitUntil: 'networkidle' });
  }

  async performLogin() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchAndSelectActiveContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
    
    const contractNumber = process.env.TEST_CONTRACT_NUMBER || '123456789';
    await this.page.fill(this.searchInput, contractNumber);
    
    await this.page.waitForSelector(this.searchResultItem, { state: 'visible' });
    await this.page.click(this.searchResultItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractValueComponent);
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.totalContractValue, { state: 'visible' });
    const valueText = await this.page.textContent(this.totalContractValue);
    return valueText ? valueText.trim() : null;
  }

  async getCurrentTimestamp() {
    const timestampElement = await this.page.$(this.lastUpdateTimestamp);
    if (timestampElement) {
      return await timestampElement.textContent();
    }
    return new Date().toISOString();
  }

  async getConfiguredRefreshInterval() {
    const defaultRefreshMs = 60000;
    
    try {
      const configInterval = await this.page.evaluate(() => {
        return window.__ACTICENTER_CONFIG__?.refreshInterval || null;
      });
      return configInterval || defaultRefreshMs;
    } catch {
      return defaultRefreshMs;
    }
  }

  async waitForRefreshInterval(intervalMs) {
    const bufferMs = 5000;
    await this.page.waitForTimeout(intervalMs + bufferMs);
  }

  async waitForValueRefresh(initialValue) {
    const maxWaitTime = 120000;
    const pollInterval = 2000;
    let elapsed = 0;
    
    while (elapsed < maxWaitTime) {
      const currentValue = await this.getTotalContractValue();
      const refreshIndicatorVisible = await this.page.isVisible(this.refreshIndicator).catch(() => false);
      
      if (currentValue !== initialValue || refreshIndicatorVisible) {
        return true;
      }
      
      await this.page.waitForTimeout(pollInterval);
      elapsed += pollInterval;
    }
    
    const timestampChanged = await this.isLastUpdateTimestampRecent();
    return timestampChanged;
  }

  async checkIfPageWasReloaded() {
    return this.navigationCount > 1;
  }

  async isLastUpdateTimestampRecent() {
    const timestampText = await this.page.textContent(this.lastUpdateTimestamp).catch(() => null);
    if (!timestampText) return false;
    
    const now = new Date();
    const thresholdMinutes = 2;
    
    try {
      const updateTime = new Date(timestampText);
      const diffMinutes = (now - updateTime) / (1000 * 60);
      return diffMinutes <= thresholdMinutes;
    } catch {
      return true;
    }
  }

  async getBreakdownValues() {
    return {
      purchasingPowerMXN: await this.page.textContent(this.purchasingPowerMXN).catch(() => null),
      cashMXN: await this.page.textContent(this.cashMXN).catch(() => null),
      cashUSD: await this.page.textContent(this.cashUSD).catch(() => null),
      pendingSettlement: await this.page.textContent(this.pendingSettlement).catch(() => null),
      funds: await this.page.textContent(this.fundsValue).catch(() => null),
      cedesAndNotes: await this.page.textContent(this.cedesAndNotes).catch(() => null),
      moneyMarket: await this.page.textContent(this.moneyMarket).catch(() => null),
      capitalMarket: await this.page.textContent(this.capitalMarket).catch(() => null)
    };
  }
}

module.exports = ContractValuePage;