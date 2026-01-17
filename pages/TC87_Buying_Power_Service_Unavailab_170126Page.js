class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractValueLoader = '[data-testid="contract-value-loader"]';
    this.buyingPowerDisplay = '[data-testid="buying-power-display"]';
    this.buyingPowerError = '[data-testid="buying-power-error"]';
    this.buyingPowerValue = '[data-testid="buying-power-value"]';
    this.breakdownPopupTrigger = '[data-testid="breakdown-popup-trigger"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.buyingPowerMXNRow = '[data-testid="buying-power-mxn-row"]';
    this.buyingPowerMXNValue = '[data-testid="buying-power-mxn-value"]';
    this.buyingPowerMXNError = '[data-testid="buying-power-mxn-error"]';
    this.cashMXNRow = '[data-testid="cash-mxn-row"]';
    this.cashUSDRow = '[data-testid="cash-usd-row"]';
    this.fundsListDebt = '[data-testid="funds-list-debt"]';
    this.fundsListEquity = '[data-testid="funds-list-equity"]';
    this.moneyMarketRow = '[data-testid="money-market-row"]';
    this.capitalMarketRow = '[data-testid="capital-market-row"]';
    this.pendingSettlementRow = '[data-testid="pending-settlement-row"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.casaDeBolsaContractOption = '[data-testid="casa-bolsa-contract-option"]';
    this.errorMessage = '[data-testid="error-message"]';
    this.errorIndicator = '[data-testid="error-indicator"]';
    
    this.consoleErrors = [];
  }

  async mockBuyingPowerServiceFailure() {
    await this.page.route('**/api/currentcash**', async (route) => {
      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Service Unavailable',
          message: 'Buying Power service is currently unavailable'
        })
      });
    });
    
    await this.page.route('**/api/buying-power**', async (route) => {
      await route.abort('failed');
    });
    
    return true;
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl, { waitUntil: 'networkidle' });
    
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        this.consoleErrors.push(msg.text());
      }
    });
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible', timeout: 10000 });
  }

  async selectCasaDeBolsaContract() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.casaDeBolsaContractOption, { state: 'visible' });
    await this.page.click(this.casaDeBolsaContractOption);
  }

  async isContractValueComponentLoading() {
    try {
      const loaderVisible = await this.page.isVisible(this.contractValueLoader);
      const componentVisible = await this.page.isVisible(this.contractValueComponent);
      return loaderVisible || componentVisible;
    } catch (error) {
      return false;
    }
  }

  async hasBuyingPowerErrorState() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 15000 });
    
    const hasErrorMessage = await this.page.isVisible(this.buyingPowerError);
    const hasErrorIndicator = await this.page.isVisible(this.errorIndicator);
    
    if (hasErrorMessage || hasErrorIndicator) {
      return true;
    }
    
    const buyingPowerText = await this.page.textContent(this.buyingPowerValue).catch(() => '');
    const showsZeroWithError = buyingPowerText.includes('$0.00') || buyingPowerText.includes('--') || buyingPowerText.includes('N/A');
    
    return showsZeroWithError;
  }

  async openBreakdownPopup() {
    await this.page.click(this.breakdownPopupTrigger);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async getBuyingPowerMXNState() {
    const rowVisible = await this.page.isVisible(this.buyingPowerMXNRow);
    
    if (!rowVisible) {
      return { hasError: true, isIndeterminate: false, value: null };
    }
    
    const hasError = await this.page.isVisible(this.buyingPowerMXNError);
    const valueText = await this.page.textContent(this.buyingPowerMXNValue).catch(() => '');
    const isIndeterminate = valueText.includes('--') || valueText.includes('N/A') || valueText.includes('Error') || valueText.trim() === '';
    
    return {
      hasError,
      isIndeterminate,
      value: valueText
    };
  }

  async areOtherBreakdownItemsDisplayedCorrectly() {
    const itemsToCheck = [
      { selector: this.cashMXNRow, name: 'Cash MXN' },
      { selector: this.cashUSDRow, name: 'Cash USD' },
      { selector: this.fundsListDebt, name: 'Debt Funds' },
      { selector: this.fundsListEquity, name: 'Equity Funds' },
      { selector: this.moneyMarketRow, name: 'Money Market' },
      { selector: this.capitalMarketRow, name: 'Capital Market' },
      { selector: this.pendingSettlementRow, name: 'Pending Settlement' }
    ];
    
    let visibleItemsCount = 0;
    
    for (const item of itemsToCheck) {
      const isVisible = await this.page.isVisible(item.selector).catch(() => false);
      if (isVisible) {
        const hasValidContent = await this.page.textContent(item.selector).catch(() => '');
        if (hasValidContent && !hasValidContent.includes('Error')) {
          visibleItemsCount++;
        }
      }
    }
    
    return visibleItemsCount >= 3;
  }

  async isApplicationFunctional() {
    const searchInputFunctional = await this.page.isEnabled(this.contractSearchInput).catch(() => false);
    const popupStillOpen = await this.page.isVisible(this.breakdownPopup).catch(() => false);
    
    if (popupStillOpen) {
      await this.page.click('body', { position: { x: 10, y: 10 } });
      await this.page.waitForTimeout(500);
    }
    
    const canInteract = await this.page.isEnabled(this.contractSearchButton).catch(() => false);
    
    return searchInputFunctional || canInteract;
  }

  async verifyNoConsoleErrors() {
    const criticalErrors = this.consoleErrors.filter(error => 
      !error.includes('currentcash') && 
      !error.includes('buying-power') &&
      !error.includes('503')
    );
    
    return criticalErrors.length === 0;
  }
}

module.exports = ContractValuePage;