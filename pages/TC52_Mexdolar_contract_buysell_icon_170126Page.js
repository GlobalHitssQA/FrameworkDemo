class MexdolarContractPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Login locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Main screen locators
    this.mainScreen = '[data-testid="main-screen"]';
    this.searchIcon = '[data-testid="search-icon"]';
    this.searchLupa = '[data-testid="search-lupa-cliente-contrato"]';
    
    // Contract search locators
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractTypeFilter = '[data-testid="contract-type-filter"]';
    this.mexdolarOption = '[data-testid="contract-type-mexdolar"]';
    this.personaMoralFilter = '[data-testid="persona-moral-filter"]';
    this.bancoFilter = '[data-testid="banco-filter"]';
    this.searchButton = '[data-testid="search-contract-button"]';
    this.contractResultItem = '[data-testid="contract-result-item"]';
    
    // Contract info locators
    this.contractInfoPanel = '[data-testid="contract-info-panel"]';
    this.contractTypeLabel = '[data-testid="contract-type-label"]';
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    
    // Buy/Sell icon locators
    this.buySellIcon = '[data-testid="buy-sell-icon"]';
    this.buySellIconDisabled = '[data-testid="buy-sell-icon"][aria-disabled="true"]';
    this.buySellIconContainer = '[data-testid="buy-sell-icon-container"]';
    
    // Operation panel locators
    this.operationPanel = '[data-testid="operation-panel"]';
    this.buyButton = '[data-testid="buy-button"]';
    this.sellButton = '[data-testid="sell-button"]';
    this.buyOptions = '[data-testid="buy-options"]';
    this.sellOptions = '[data-testid="sell-options"]';
    
    // View mode locators
    this.viewOnlyIndicator = '[data-testid="view-only-indicator"]';
    this.consultaModeLabel = '[data-testid="consulta-mode-label"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async openContractSearch() {
    const searchElement = await this.page.$(this.searchLupa) || await this.page.$(this.searchIcon);
    if (searchElement) {
      await searchElement.click();
    } else {
      await this.page.click(this.searchIcon);
    }
    await this.page.waitForSelector(this.contractSearchInput, { state: 'visible' });
  }

  async searchMexdolarContract() {
    await this.page.click(this.bancoFilter);
    await this.page.click(this.personaMoralFilter);
    
    const contractTypeFilterExists = await this.page.$(this.contractTypeFilter);
    if (contractTypeFilterExists) {
      await this.page.click(this.contractTypeFilter);
      await this.page.click(this.mexdolarOption);
    }
    
    await this.page.fill(this.contractSearchInput, 'Mexdolar');
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.contractResultItem, { state: 'visible' });
  }

  async selectMexdolarContract() {
    await this.page.click(this.contractResultItem);
    await this.page.waitForSelector(this.contractInfoPanel, { state: 'visible' });
  }

  async isContractInfoDisplayed() {
    return await this.page.isVisible(this.contractInfoPanel);
  }

  async getContractType() {
    return await this.page.textContent(this.contractTypeLabel);
  }

  async isBuySellIconDisabled() {
    const disabledIcon = await this.page.$(this.buySellIconDisabled);
    if (disabledIcon) {
      return true;
    }
    
    const icon = await this.page.$(this.buySellIcon);
    if (icon) {
      const isDisabled = await icon.getAttribute('aria-disabled');
      const isDisabledClass = await icon.getAttribute('class');
      const pointerEvents = await icon.evaluate(el => window.getComputedStyle(el).pointerEvents);
      
      return isDisabled === 'true' || 
             isDisabledClass?.includes('disabled') || 
             isDisabledClass?.includes('inactive') ||
             pointerEvents === 'none';
    }
    
    return true;
  }

  async attemptClickBuySellIcon() {
    const icon = await this.page.$(this.buySellIcon);
    if (icon) {
      try {
        await icon.click({ force: true, timeout: 2000 });
      } catch (error) {
        // Expected behavior - click may fail on disabled element
      }
    }
    await this.page.waitForTimeout(500);
  }

  async isOperationPanelVisible() {
    return await this.page.isVisible(this.operationPanel);
  }

  async isContractInViewOnlyMode() {
    const viewOnlyIndicator = await this.page.isVisible(this.viewOnlyIndicator);
    const consultaLabel = await this.page.isVisible(this.consultaModeLabel);
    const buyButtonHidden = !(await this.page.isVisible(this.buyButton));
    const sellButtonHidden = !(await this.page.isVisible(this.sellButton));
    
    return viewOnlyIndicator || consultaLabel || (buyButtonHidden && sellButtonHidden);
  }

  async areBuyOptionsAvailable() {
    const buyButton = await this.page.$(this.buyButton);
    const buyOptions = await this.page.$(this.buyOptions);
    
    if (!buyButton && !buyOptions) {
      return false;
    }
    
    if (buyButton) {
      const isDisabled = await buyButton.getAttribute('disabled');
      const ariaDisabled = await buyButton.getAttribute('aria-disabled');
      if (isDisabled !== null || ariaDisabled === 'true') {
        return false;
      }
    }
    
    return await this.page.isVisible(this.buyButton) || await this.page.isVisible(this.buyOptions);
  }

  async areSellOptionsAvailable() {
    const sellButton = await this.page.$(this.sellButton);
    const sellOptions = await this.page.$(this.sellOptions);
    
    if (!sellButton && !sellOptions) {
      return false;
    }
    
    if (sellButton) {
      const isDisabled = await sellButton.getAttribute('disabled');
      const ariaDisabled = await sellButton.getAttribute('aria-disabled');
      if (isDisabled !== null || ariaDisabled === 'true') {
        return false;
      }
    }
    
    return await this.page.isVisible(this.sellButton) || await this.page.isVisible(this.sellOptions);
  }
}

module.exports = MexdolarContractPage;