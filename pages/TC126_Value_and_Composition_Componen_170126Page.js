class ValueCompositionPage {
  constructor(page) {
    this.page = page;
    this.consoleErrors = [];
    
    // Locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.mainScreen = '[data-testid="main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.bankIndividualContractOption = '[data-testid="contract-option-bank-individual"]';
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.efectivoMxnItem = '[data-testid="efectivo-mxn-item"]';
    this.efectivoUsdItem = '[data-testid="efectivo-usd-mexdolar-item"]';
    this.pageOverlay = '[data-testid="page-overlay"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.purchasingPowerMxn = '[data-testid="purchasing-power-mxn"]';
  }

  async verifyBrowserIsOpen() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.mainScreen, { state: 'visible' });
  }

  async selectBankIndividualContract() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.bankIndividualContractOption, { state: 'visible' });
    await this.page.click(this.bankIndividualContractOption);
    await this.page.waitForSelector(this.valueCompositionComponent, { state: 'visible' });
  }

  async isValueCompositionComponentVisible() {
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async clickValueCompositionComponent() {
    await this.page.click(this.valueCompositionComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isEfectivoMxnVisible() {
    return await this.page.isVisible(this.efectivoMxnItem);
  }

  async isEfectivoUsdVisible() {
    return await this.page.isVisible(this.efectivoUsdItem);
  }

  async clickOutsidePopup() {
    await this.page.click(this.pageOverlay, { force: true });
  }

  async isBreakdownPopupHidden() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }

  async setupConsoleErrorListener() {
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        this.consoleErrors.push(msg.text());
      }
    });
  }

  async getConsoleErrors() {
    return this.consoleErrors.filter(error => 
      error.includes('JavaScript') || 
      error.includes('CSS') || 
      error.includes('TypeError') ||
      error.includes('ReferenceError')
    );
  }
}

module.exports = ValueCompositionPage;