class MexdolarContractPage {
  constructor(page) {
    this.page = page;
    this.consoleErrors = [];
    this.luminaCalls = [];
    
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.searchButton = '[data-testid="search-contract-button"]';
    this.searchInput = '[data-testid="search-input"]';
    this.contractTypeFilter = '[data-testid="contract-type-filter"]';
    this.mexdolarOption = '[data-testid="mexdolar-option"]';
    this.personaMoralFilter = '[data-testid="persona-moral-filter"]';
    this.bancoFilter = '[data-testid="banco-filter"]';
    this.searchResultsContainer = '[data-testid="search-results-container"]';
    this.mexdolarContractItem = '[data-testid="contract-item-mexdolar"]';
    this.contractDetailContainer = '[data-testid="contract-detail-container"]';
    this.viewOnlyModeIndicator = '[data-testid="view-only-mode-indicator"]';
    this.buyButton = '[data-testid="buy-operation-button"]';
    this.sellButton = '[data-testid="sell-operation-button"]';
    this.transferButton = '[data-testid="transfer-operation-button"]';
    this.operationButtonsContainer = '[data-testid="operation-buttons-container"]';
    this.errorMessage = '[data-testid="error-message"]';
    this.contractInfoPanel = '[data-testid="contract-info-panel"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.TEST_USERNAME || 'test_user');
    await this.page.fill(this.passwordInput, process.env.TEST_PASSWORD || 'test_password');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.mainScreen);
  }

  async clickSearchButton() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async searchMexdolarContract() {
    await this.page.click(this.bancoFilter);
    await this.page.click(this.personaMoralFilter);
    await this.page.click(this.contractTypeFilter);
    await this.page.click(this.mexdolarOption);
    await this.page.fill(this.searchInput, 'Mexdolar');
    await this.page.press(this.searchInput, 'Enter');
    await this.page.waitForSelector(this.searchResultsContainer, { state: 'visible' });
  }

  async selectMexdolarContract() {
    await this.page.waitForSelector(this.mexdolarContractItem, { state: 'visible' });
    await this.page.click(this.mexdolarContractItem);
    await this.page.waitForSelector(this.contractDetailContainer, { state: 'visible' });
  }

  async isContractInViewOnlyMode() {
    const viewOnlyIndicator = await this.page.isVisible(this.viewOnlyModeIndicator);
    const contractInfoVisible = await this.page.isVisible(this.contractInfoPanel);
    return viewOnlyIndicator && contractInfoVisible;
  }

  async isBuyButtonDisabled() {
    const buyButton = await this.page.locator(this.buyButton);
    const isDisabled = await buyButton.isDisabled();
    const hasDisabledClass = await buyButton.evaluate(el => el.classList.contains('disabled') || el.hasAttribute('disabled'));
    return isDisabled || hasDisabledClass;
  }

  async isSellButtonDisabled() {
    const sellButton = await this.page.locator(this.sellButton);
    const isDisabled = await sellButton.isDisabled();
    const hasDisabledClass = await sellButton.evaluate(el => el.classList.contains('disabled') || el.hasAttribute('disabled'));
    return isDisabled || hasDisabledClass;
  }

  async isTransferButtonDisabled() {
    const transferButton = await this.page.locator(this.transferButton);
    const isDisabled = await transferButton.isDisabled();
    const hasDisabledClass = await transferButton.evaluate(el => el.classList.contains('disabled') || el.hasAttribute('disabled'));
    return isDisabled || hasDisabledClass;
  }

  async attemptToClickOperationButtons() {
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        this.consoleErrors.push(msg.text());
      }
    });

    this.page.on('request', request => {
      if (request.url().includes('lumina')) {
        this.luminaCalls.push(request.url());
      }
    });

    try {
      await this.page.click(this.buyButton, { force: true, timeout: 2000 });
    } catch (e) {
      // Expected to fail or be blocked
    }

    try {
      await this.page.click(this.sellButton, { force: true, timeout: 2000 });
    } catch (e) {
      // Expected to fail or be blocked
    }

    try {
      await this.page.click(this.transferButton, { force: true, timeout: 2000 });
    } catch (e) {
      // Expected to fail or be blocked
    }
  }

  async verifyNoLuminaErrorsGenerated() {
    const luminaErrorCalls = this.luminaCalls.filter(url => url.includes('operation') || url.includes('transaction'));
    return luminaErrorCalls.length === 0;
  }

  async verifyNoConsoleErrors() {
    const relevantErrors = this.consoleErrors.filter(error => 
      error.toLowerCase().includes('lumina') || 
      error.toLowerCase().includes('operation') ||
      error.toLowerCase().includes('mexdolar')
    );
    return relevantErrors.length === 0;
  }
}

module.exports = MexdolarContractPage;