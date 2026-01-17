const { expect } = require('@playwright/test');

class FundsOperationPage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.userProfileIndicator = page.locator('[data-testid="user-profile-indicator"]');
    
    // Navigation locators
    this.fundsOperationMenuItem = page.locator('[data-testid="funds-operation-menu-item"]');
    this.fundsOperationScreen = page.locator('[data-testid="funds-operation-screen"]');
    
    // Client and contract search locators
    this.clientSearchInput = page.locator('[data-testid="client-search-input"]');
    this.clientSearchButton = page.locator('[data-testid="client-search-button"]');
    this.clientResultItem = page.locator('[data-testid="client-result-item"]').first();
    this.contractSelector = page.locator('[data-testid="contract-selector"]');
    this.contractOption = page.locator('[data-testid="contract-option"]').first();
    this.contractLoadedIndicator = page.locator('[data-testid="contract-loaded-indicator"]');
    
    // Contract value and composition component locators
    this.contractValueComponent = page.locator('[data-testid="contract-value-composition-component"]');
    this.contractValueTotal = page.locator('[data-testid="contract-value-total"]');
    this.contractCompositionBreakdown = page.locator('[data-testid="contract-composition-breakdown"]');
    
    // Flow elements for position verification
    this.contractSelectionSection = page.locator('[data-testid="contract-selection-section"]');
    this.buySellWidget = page.locator('[data-testid="buy-sell-widget"]');
    this.flowContainer = page.locator('[data-testid="funds-operation-flow-container"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsAdvisor() {
    await this.usernameInput.fill(process.env.ADVISOR_USERNAME || 'advisor_user');
    await this.passwordInput.fill(process.env.ADVISOR_PASSWORD || 'advisor_password');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isUserLoggedIn() {
    return await this.userProfileIndicator.isVisible({ timeout: 10000 });
  }

  async startFundsOperationFlow() {
    await this.fundsOperationMenuItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isFundsOperationScreenVisible() {
    return await this.fundsOperationScreen.isVisible({ timeout: 10000 });
  }

  async searchAndSelectClient() {
    await this.clientSearchInput.fill('test_client');
    await this.clientSearchButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.clientResultItem.click();
  }

  async selectContract() {
    await this.contractSelector.click();
    await this.contractOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractLoaded() {
    return await this.contractLoadedIndicator.isVisible({ timeout: 10000 });
  }

  async isContractValueComponentVisible() {
    return await this.contractValueComponent.isVisible({ timeout: 10000 });
  }

  async isContractValueComponentInCorrectPosition() {
    const contractSelectionBox = await this.contractSelectionSection.boundingBox();
    const contractValueBox = await this.contractValueComponent.boundingBox();
    const buySellBox = await this.buySellWidget.boundingBox();
    
    if (!contractSelectionBox || !contractValueBox || !buySellBox) {
      return false;
    }
    
    const isAfterContractSelection = contractValueBox.y > contractSelectionBox.y + contractSelectionBox.height;
    const isBeforeBuySellWidget = contractValueBox.y + contractValueBox.height < buySellBox.y;
    
    return isAfterContractSelection && isBeforeBuySellWidget;
  }

  async isContractValueComponentVerticallyAligned() {
    const flowContainerBox = await this.flowContainer.boundingBox();
    const contractValueBox = await this.contractValueComponent.boundingBox();
    
    if (!flowContainerBox || !contractValueBox) {
      return false;
    }
    
    const flowCenterX = flowContainerBox.x + (flowContainerBox.width / 2);
    const componentCenterX = contractValueBox.x + (contractValueBox.width / 2);
    const tolerance = 50;
    
    return Math.abs(flowCenterX - componentCenterX) <= tolerance;
  }
}

module.exports = FundsOperationPage;