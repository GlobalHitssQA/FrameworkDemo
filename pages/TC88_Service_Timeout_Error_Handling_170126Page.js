const { expect } = require('@playwright/test');

class ValuationPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://acticenter.example.com';
    
    // Locators
    this.userAvatarIndicator = '[data-testid="user-avatar"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.activeContractItem = '[data-testid="active-contract-item"]';
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.totalValueDisplay = '[data-testid="total-contract-value"]';
    this.compositionBreakdownPopup = '[data-testid="composition-breakdown-popup"]';
    this.errorMessageContainer = '[data-testid="error-message-container"]';
    this.timeoutErrorMessage = '[data-testid="timeout-error-message"]';
    this.retryButton = '[data-testid="retry-button"]';
    this.loadingSpinner = '[data-testid="loading-spinner"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userAvatarIndicator, { state: 'visible', timeout: 10000 });
  }

  async selectActiveContract() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.activeContractItem, { state: 'visible' });
    await this.page.click(this.activeContractItem);
  }

  async configureServiceTimeout() {
    await this.page.route('**/api/valuation/**', async (route) => {
      await this.page.waitForTimeout(35000);
      route.abort('timedout');
    });
  }

  async accessValueAndCompositionComponent() {
    await this.page.click(this.valueCompositionComponent);
  }

  async waitForServiceInvocation() {
    await this.page.waitForSelector(this.loadingSpinner, { state: 'visible', timeout: 5000 }).catch(() => {});
  }

  async waitForTimeoutToOccur() {
    await this.page.waitForSelector(this.errorMessageContainer, { state: 'visible', timeout: 40000 });
  }

  async getTimeoutErrorMessage() {
    await this.page.waitForSelector(this.timeoutErrorMessage, { state: 'visible' });
    return await this.page.textContent(this.timeoutErrorMessage);
  }

  async isRetryButtonVisible() {
    return await this.page.isVisible(this.retryButton);
  }

  async clickRetryButton() {
    await this.page.click(this.retryButton);
    await this.page.waitForSelector(this.loadingSpinner, { state: 'visible', timeout: 5000 }).catch(() => {});
  }
}

module.exports = ValuationPage;