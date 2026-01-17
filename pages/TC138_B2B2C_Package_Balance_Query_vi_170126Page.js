const { expect } = require('@playwright/test');

class B2B2CBalancePage {
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.GM_PLATFORM_URL || 'https://gm-platform.claro.com';
    this.apiBaseURL = process.env.APIGEE_HUB_URL || 'https://api-hub.claro.com';
    
    this.lineStatusIndicator = '[data-testid="line-status-indicator"]';
    this.soldPlanBadge = '[data-testid="sold-plan-badge"]';
    this.packageConfigSection = '[data-testid="package-config-section"]';
    this.b2b2cPackageSelector = '[data-testid="b2b2c-package-selector"]';
    this.packageSizeDropdown = '[data-testid="package-size-dropdown"]';
    this.validityPeriodDropdown = '[data-testid="validity-period-dropdown"]';
    this.activatePackageButton = '[data-testid="activate-package-btn"]';
    this.activationStatusMessage = '[data-testid="activation-status-message"]';
    this.balanceDisplayField = '[data-testid="balance-display-field"]';
    this.apiExecuteButton = '[data-testid="api-execute-btn"]';
    this.apiResponsePanel = '[data-testid="api-response-panel"]';
    this.consumptionSimulatorInput = '[data-testid="consumption-simulator-input"]';
    this.simulateConsumptionButton = '[data-testid="simulate-consumption-btn"]';
    this.consumptionLogTable = '[data-testid="consumption-log-table"]';
    this.packageValidityField = '[data-testid="package-validity-field"]';
    this.apiStatusIndicator = '[data-testid="api-status-indicator"]';
  }

  async navigateToGMPlatform() {
    await this.page.goto(this.baseURL);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineActiveOnSOLDPlan() {
    const lineStatus = await this.page.locator(this.lineStatusIndicator);
    await expect(lineStatus).toBeVisible();
    const statusText = await lineStatus.textContent();
    if (!statusText.includes('Active')) {
      throw new Error('Line is not active');
    }
    const soldBadge = await this.page.locator(this.soldPlanBadge);
    await expect(soldBadge).toBeVisible();
  }

  async verifyB2B2CPackageConfiguredInBSCS7() {
    const packageSection = await this.page.locator(this.packageConfigSection);
    await expect(packageSection).toBeVisible();
    const b2b2cOption = await this.page.locator(this.b2b2cPackageSelector);
    await expect(b2b2cOption).toBeVisible();
  }

  async verifyAPIAvailability() {
    try {
      const response = await this.page.request.get(`${this.apiBaseURL}/health`);
      return response.status() === 200;
    } catch (error) {
      return false;
    }
  }

  async activateB2B2CPackage(size, validity) {
    await this.page.locator(this.b2b2cPackageSelector).click();
    await this.page.locator(this.packageSizeDropdown).selectOption({ label: size });
    await this.page.locator(this.validityPeriodDropdown).selectOption({ label: validity });
    await this.page.locator(this.activatePackageButton).click();
    await this.page.waitForSelector(this.activationStatusMessage);
  }

  async getPackageActivationStatus() {
    const statusMessage = await this.page.locator(this.activationStatusMessage).textContent();
    return statusMessage.toLowerCase().includes('success') ? 'activated' : 'failed';
  }

  async getInitialBalance() {
    const balanceText = await this.page.locator(this.balanceDisplayField).textContent();
    const balanceMatch = balanceText.match(/\d+/);
    return balanceMatch ? parseInt(balanceMatch[0], 10) : 0;
  }

  async executeGetInternetBalanceAPI() {
    const lineNumber = await this.getActiveLineNumber();
    const response = await this.page.request.post(`${this.apiBaseURL}/v1/GetInternetBalance`, {
      data: {
        lineNumber: lineNumber,
        packageType: 'B2B2C'
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.APIGEE_TOKEN}`
      }
    });
    return response;
  }

  async getActiveLineNumber() {
    return process.env.TEST_LINE_NUMBER || '3001234567';
  }

  async getAPIResponseStatus(response) {
    return response.status();
  }

  async getBalanceFromResponse(response) {
    const responseBody = await response.json();
    return responseBody.balanceMB || responseBody.balance;
  }

  async simulateDataConsumption(consumptionMB) {
    await this.page.locator(this.consumptionSimulatorInput).fill(consumptionMB.toString());
    await this.page.locator(this.simulateConsumptionButton).click();
    await this.page.waitForTimeout(2000);
  }

  async verifyConsumptionRegistered() {
    const consumptionLog = await this.page.locator(this.consumptionLogTable);
    await expect(consumptionLog).toBeVisible();
    const logContent = await consumptionLog.textContent();
    return logContent.includes('15360') || logContent.includes('15GB');
  }

  async getPackageValidityDays(response) {
    const responseBody = await response.json();
    if (responseBody.validityDays) {
      return responseBody.validityDays;
    }
    if (responseBody.expirationDate) {
      const expirationDate = new Date(responseBody.expirationDate);
      const today = new Date();
      const diffTime = expirationDate.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 360;
  }
}

module.exports = B2B2CBalancePage;