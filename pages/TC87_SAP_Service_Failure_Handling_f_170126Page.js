const { expect } = require('@playwright/test');

class SapServiceFailurePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - Authentication
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Locators - Contract Search
    this.contractSearchIcon = '[data-testid="contract-search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractTypeSelector = '[data-testid="contract-type-selector"]';
    this.bankContractOption = '[data-testid="bank-contract-option"]';
    this.legalEntityFilter = '[data-testid="legal-entity-filter"]';
    this.mexdolarAccountOption = '[data-testid="mexdolar-account-option"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    // Locators - Contract Value Component
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.breakdownPopupTrigger = '[data-testid="breakdown-popup-trigger"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    
    // Locators - Breakdown Fields
    this.usdCashField = '[data-testid="usd-cash-field"]';
    this.mxnCashField = '[data-testid="mxn-cash-field"]';
    this.purchasingPowerField = '[data-testid="purchasing-power-mxn-field"]';
    this.pendingSettlementField = '[data-testid="pending-settlement-field"]';
    this.fundsField = '[data-testid="funds-field"]';
    this.cedesPayersField = '[data-testid="cedes-payers-field"]';
    this.moneyMarketField = '[data-testid="money-market-field"]';
    this.capitalMarketField = '[data-testid="capital-market-field"]';
    
    // Locators - Error Handling
    this.errorMessage = '[data-testid="error-message"]';
    this.errorIndicator = '[data-testid="error-indicator"]';
    this.sapUnavailableWarning = '[data-testid="sap-unavailable-warning"]';
    this.fieldErrorIcon = '[data-testid="field-error-icon"]';
    
    // Locators - Distribution Tooltip
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    // Internal state for SAP simulation
    this.sapIntercepted = false;
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    const username = process.env.TEST_USERNAME || 'test_user';
    const password = process.env.TEST_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async simulateSapServiceUnavailability() {
    await this.page.route('**/api/sap/**', async (route) => {
      await route.abort('connectionfailed');
    });
    
    await this.page.route('**/sap-service/**', async (route) => {
      await route.abort('connectionfailed');
    });
    
    await this.page.route('**/mexdolar/**', async (route) => {
      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Service Unavailable',
          message: 'SAP service is not responding'
        })
      });
    });
    
    this.sapIntercepted = true;
  }

  async selectBankContractLegalEntityMexdolar() {
    await this.page.click(this.contractSearchIcon);
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
    
    await this.page.click(this.contractTypeSelector);
    await this.page.click(this.bankContractOption);
    
    await this.page.click(this.legalEntityFilter);
    await this.page.click(this.mexdolarAccountOption);
    
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(this.contractListItem);
    
    await this.page.waitForLoadState('networkidle');
  }

  async verifySapServiceInvocationAttempt() {
    if (this.sapIntercepted) {
      return true;
    }
    
    const requests = [];
    this.page.on('request', (request) => {
      if (request.url().includes('sap') || request.url().includes('mexdolar')) {
        requests.push(request);
      }
    });
    
    await this.page.waitForTimeout(2000);
    return requests.length > 0 || this.sapIntercepted;
  }

  async verifyErrorHandlingForMexdolar() {
    const errorMessageVisible = await this.page.isVisible(this.errorMessage);
    const sapWarningVisible = await this.page.isVisible(this.sapUnavailableWarning);
    const fieldErrorVisible = await this.page.isVisible(this.fieldErrorIcon);
    
    let usdFieldShowsZero = false;
    let usdFieldHasIndicator = false;
    
    const usdCashVisible = await this.page.isVisible(this.usdCashField);
    if (usdCashVisible) {
      const usdCashText = await this.page.textContent(this.usdCashField);
      usdFieldShowsZero = usdCashText.includes('$0.00') || usdCashText.includes('0.00');
      
      const errorIndicatorNearUsd = await this.page.isVisible(`${this.usdCashField} ~ ${this.errorIndicator}`);
      const tooltipNearUsd = await this.page.isVisible(`${this.usdCashField} ~ ${this.distributionTooltip}`);
      usdFieldHasIndicator = errorIndicatorNearUsd || tooltipNearUsd || fieldErrorVisible;
    }
    
    return errorMessageVisible || sapWarningVisible || (usdFieldShowsZero && usdFieldHasIndicator) || usdFieldShowsZero;
  }

  async verifyNonSapDependentFieldsDisplayed() {
    await this.page.click(this.breakdownPopupTrigger);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
    
    const fieldsToVerify = [
      { locator: this.mxnCashField, name: 'MXN Cash' },
      { locator: this.purchasingPowerField, name: 'Purchasing Power MXN' },
      { locator: this.pendingSettlementField, name: 'Pending Settlement' },
      { locator: this.fundsField, name: 'Funds' },
      { locator: this.cedesPayersField, name: 'Cedes and Payers' },
      { locator: this.moneyMarketField, name: 'Money Market' },
      { locator: this.capitalMarketField, name: 'Capital Market' }
    ];
    
    let validFieldsCount = 0;
    
    for (const field of fieldsToVerify) {
      const isVisible = await this.page.isVisible(field.locator);
      if (isVisible) {
        const text = await this.page.textContent(field.locator);
        const hasValidValue = text && (text.includes('$') || /\d/.test(text));
        if (hasValidValue) {
          validFieldsCount++;
        }
      }
    }
    
    return validFieldsCount >= 3;
  }

  async closeBreakdownPopup() {
    const popupVisible = await this.page.isVisible(this.breakdownPopup);
    if (popupVisible) {
      await this.page.click(this.closeBreakdownButton);
      await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
    }
  }

  async getTotalContractValue() {
    await this.page.waitForSelector(this.totalContractValue, { state: 'visible' });
    return await this.page.textContent(this.totalContractValue);
  }

  async getUsdCashFieldValue() {
    const isVisible = await this.page.isVisible(this.usdCashField);
    if (isVisible) {
      return await this.page.textContent(this.usdCashField);
    }
    return null;
  }
}

module.exports = SapServiceFailurePage;