class ContractValuationPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.bankContractOption = '[data-testid="bank-contract-option"]';
    this.brokerageContractOption = '[data-testid="brokerage-contract-option"]';
    this.valuationErrorMessage = '[data-testid="valuation-error-message"]';
    this.errorAlertContainer = '[data-testid="error-alert-container"]';
    this.navigationMenu = '[data-testid="navigation-menu"]';
    this.moduleMenuItem = '[data-testid="module-menu-item"]';
    this.dashboardModule = '[data-testid="dashboard-module"]';
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    this.mainContentArea = '[data-testid="main-content-area"]';
    this.contractValueDisplay = '[data-testid="contract-value-display"]';
    this.loadingSpinner = '[data-testid="loading-spinner"]';
  }

  async mockValuationServiceUnavailable() {
    await this.page.route('**/api/valuation/**', (route) => {
      route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Service Unavailable',
          message: 'El servicio de valuación no está disponible'
        })
      });
    });
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible', timeout: 10000 });
  }

  async selectContract() {
    const bankContract = this.page.locator(this.bankContractOption).first();
    const brokerageContract = this.page.locator(this.brokerageContractOption).first();
    
    if (await bankContract.isVisible()) {
      await bankContract.click();
    } else if (await brokerageContract.isVisible()) {
      await brokerageContract.click();
    } else {
      await this.page.locator(this.contractListItem).first().click();
    }
    
    await this.page.waitForTimeout(1000);
  }

  async getValuationErrorMessage() {
    await this.page.waitForSelector(this.valuationErrorMessage, { state: 'visible', timeout: 15000 });
    return await this.page.locator(this.valuationErrorMessage).textContent();
  }

  async verifyErrorMessageIsAppropriate(errorMessage) {
    const expectedPhrases = [
      'no se pudo obtener',
      'valuación',
      'error',
      'no disponible',
      'intente más tarde'
    ];
    
    const messageContainsExpectedPhrase = expectedPhrases.some(
      phrase => errorMessage.toLowerCase().includes(phrase.toLowerCase())
    );
    
    if (!messageContainsExpectedPhrase) {
      throw new Error(`Error message does not contain expected content: ${errorMessage}`);
    }
  }

  async verifyOtherModulesAreAccessible() {
    await this.page.waitForSelector(this.navigationMenu, { state: 'visible' });
    const menuItems = this.page.locator(this.moduleMenuItem);
    const count = await menuItems.count();
    
    if (count === 0) {
      throw new Error('Navigation menu items are not accessible');
    }
  }

  async navigateToAnotherModule() {
    const dashboardLink = this.page.locator(this.dashboardModule);
    
    if (await dashboardLink.isVisible()) {
      await dashboardLink.click();
    } else {
      await this.page.locator(this.moduleMenuItem).first().click();
    }
  }

  async verifyModuleLoadsSuccessfully() {
    await this.page.waitForSelector(this.mainContentArea, { state: 'visible', timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
    
    const hasContent = await this.page.locator(this.mainContentArea).isVisible();
    if (!hasContent) {
      throw new Error('Module content did not load successfully');
    }
  }
};

module.exports = ContractValuationPage;