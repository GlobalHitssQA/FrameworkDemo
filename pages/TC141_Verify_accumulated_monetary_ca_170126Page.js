class ContractValueBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    // Main screen locators
    this.mainScreen = page.locator('[data-testid="acticenter-main-screen"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.searchLupaButton = page.locator('[data-testid="search-lupa-button"]');
    
    // Contract selection locators
    this.contractList = page.locator('[data-testid="contract-list"]');
    this.contractItemWithVariableFunds = page.locator('[data-testid="contract-item-variable-funds"]');
    
    // Total value component locators
    this.totalValueComponent = page.locator('[data-testid="total-contract-value-component"]');
    this.totalValueAmount = page.locator('[data-testid="total-value-amount"]');
    
    // Breakdown popup locators
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.breakdownCloseButton = page.locator('[data-testid="breakdown-close-button"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
    
    // Variable Income Funds specific locators
    this.variableIncomeFundsSection = page.locator('[data-testid="breakdown-item-fondos-renta-variable"]');
    this.variableIncomeFundsLabel = page.locator('[data-testid="fondos-renta-variable-label"]');
    this.variableIncomeFundsValue = page.locator('[data-testid="fondos-renta-variable-value"]');
    
    // Alternative locators using semantic selectors
    this.variableIncomeFundsSectionAlt = page.locator('.breakdown-item:has-text("Fondos de renta variable")');
    this.variableIncomeFundsValueAlt = page.locator('.breakdown-item:has-text("Fondos de renta variable") .breakdown-value');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await this.mainScreen.waitFor({ state: 'visible', timeout: 10000 });
  }

  async selectContractWithVariableIncomeFunds() {
    const contractNumber = process.env.TEST_CONTRACT_VARIABLE_FUNDS || '';
    
    if (contractNumber) {
      await this.contractSearchInput.fill(contractNumber);
      await this.searchLupaButton.click();
    }
    
    await this.contractItemWithVariableFunds.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractLoaded() {
    await this.totalValueComponent.waitFor({ state: 'visible', timeout: 10000 });
  }

  async verifyTotalValueComponentVisible() {
    return await this.totalValueComponent.isVisible();
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.click();
  }

  async verifyBreakdownPopupDisplayed() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
  }

  async isVariableIncomeFundsSectionVisible() {
    try {
      const isVisible = await this.variableIncomeFundsSection.isVisible();
      if (!isVisible) {
        return await this.variableIncomeFundsSectionAlt.isVisible();
      }
      return isVisible;
    } catch {
      return await this.variableIncomeFundsSectionAlt.isVisible();
    }
  }

  async getVariableIncomeFundsValue() {
    try {
      const value = await this.variableIncomeFundsValue.textContent();
      if (value) return value.trim();
      return await this.variableIncomeFundsValueAlt.textContent();
    } catch {
      return await this.variableIncomeFundsValueAlt.textContent();
    }
  }

  async isVariableIncomeFundsValueAlignedRight() {
    let element;
    try {
      element = this.variableIncomeFundsValue;
      if (!(await element.isVisible())) {
        element = this.variableIncomeFundsValueAlt;
      }
    } catch {
      element = this.variableIncomeFundsValueAlt;
    }
    
    const textAlign = await element.evaluate(el => {
      return window.getComputedStyle(el).textAlign;
    });
    
    return textAlign === 'right' || textAlign === 'end';
  }

  async closeBreakdownPopup() {
    await this.breakdownCloseButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }
};

module.exports = ContractValueBreakdownPage;