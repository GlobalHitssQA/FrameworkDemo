const { expect } = require('@playwright/test');

class BalanceQueryPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.GM_PLATFORM_URL || 'https://gm-platform.example.com';
    this.apiBaseUrl = process.env.APIGEE_HUB_URL || 'https://api-hub.example.com';
    
    // Locators for GM Platform UI
    this.loginUsernameInput = '[data-testid="login-username"]';
    this.loginPasswordInput = '[data-testid="login-password"]';
    this.loginSubmitButton = '[data-testid="login-submit"]';
    this.packageManagementMenu = '[data-testid="menu-package-management"]';
    this.activatePackageButton = '[data-testid="btn-activate-package"]';
    this.packageTypeSelector = '[data-testid="select-package-type"]';
    this.trial6GBOption = '[data-testid="option-trial-6gb"]';
    this.lineNumberInput = '[data-testid="input-line-number"]';
    this.confirmActivationButton = '[data-testid="btn-confirm-activation"]';
    this.activationStatusLabel = '[data-testid="label-activation-status"]';
    this.balanceQuerySection = '[data-testid="section-balance-query"]';
    this.executeAPIButton = '[data-testid="btn-execute-api"]';
    this.balanceResultDisplay = '[data-testid="display-balance-result"]';
    this.balanceValueText = '[data-testid="text-balance-value"]';
    this.balanceUnitText = '[data-testid="text-balance-unit"]';
    this.packageValidityText = '[data-testid="text-package-validity"]';
    this.expirationDateText = '[data-testid="text-expiration-date"]';
    this.consumptionSimulatorSection = '[data-testid="section-consumption-simulator"]';
    this.consumptionAmountInput = '[data-testid="input-consumption-amount"]';
    this.executeConsumptionButton = '[data-testid="btn-execute-consumption"]';
    this.consumptionStatusLabel = '[data-testid="label-consumption-status"]';
  }

  async navigateToGMPlatform() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.loginUsernameInput, username);
    await this.page.fill(this.loginPasswordInput, password);
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async activateTrial6GBPackage() {
    await this.page.click(this.packageManagementMenu);
    await this.page.waitForSelector(this.activatePackageButton);
    await this.page.click(this.activatePackageButton);
    await this.page.click(this.packageTypeSelector);
    await this.page.click(this.trial6GBOption);
    await this.page.click(this.confirmActivationButton);
    await this.page.waitForSelector(this.activationStatusLabel);
  }

  async getPackageActivationStatus() {
    const statusElement = await this.page.waitForSelector(this.activationStatusLabel);
    const statusText = await statusElement.textContent();
    return statusText.toLowerCase().includes('active') ? 'active' : 'inactive';
  }

  async executeGetInternetBalanceAPI() {
    await this.page.click(this.balanceQuerySection);
    await this.page.click(this.executeAPIButton);
    await this.page.waitForSelector(this.balanceResultDisplay);
    
    const balanceValue = await this.page.textContent(this.balanceValueText);
    const balanceUnit = await this.page.textContent(this.balanceUnitText);
    
    return {
      value: parseFloat(balanceValue),
      unit: balanceUnit.trim()
    };
  }

  convertBalanceToMB(balance) {
    if (balance.unit.toUpperCase() === 'GB') {
      return balance.value * 1024;
    }
    return balance.value;
  }

  async simulateDataConsumption(amountInMB) {
    await this.page.click(this.consumptionSimulatorSection);
    await this.page.fill(this.consumptionAmountInput, amountInMB.toString());
    await this.page.click(this.executeConsumptionButton);
  }

  async waitForConsumptionRegistration() {
    await this.page.waitForSelector(this.consumptionStatusLabel);
    await this.page.waitForFunction(
      (selector) => {
        const element = document.querySelector(selector);
        return element && element.textContent.toLowerCase().includes('registered');
      },
      this.consumptionStatusLabel,
      { timeout: 30000 }
    );
  }

  async getPackageValidity() {
    const validityText = await this.page.textContent(this.packageValidityText);
    const expirationText = await this.page.textContent(this.expirationDateText);
    
    const daysMatch = validityText.match(/(\d+)/);
    const days = daysMatch ? parseInt(daysMatch[1]) : null;
    
    return {
      days: days,
      expirationDate: expirationText.trim()
    };
  }

  async isBalanceDisplayVisible() {
    return await this.page.isVisible(this.balanceResultDisplay);
  }
};

module.exports = BalanceQueryPage;