class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.mainInterface = '[data-testid="main-interface"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.categoryRowSelector = '[data-testid="category-row"]';
    this.monetaryValueSelector = '[data-testid="monetary-value"]';
    
    this.categorySelectors = {
      'poder-de-compra': '[data-testid="category-poder-de-compra"] [data-testid="monetary-value"]',
      'efectivo-mxn': '[data-testid="category-efectivo-mxn"] [data-testid="monetary-value"]',
      'efectivo-usd': '[data-testid="category-efectivo-usd"] [data-testid="monetary-value"]',
      'pendientes-liquidar': '[data-testid="category-pendientes-liquidar"] [data-testid="monetary-value"]',
      'fondos': '[data-testid="category-fondos"] [data-testid="monetary-value"]',
      'cedes-pagares': '[data-testid="category-cedes-pagares"] [data-testid="monetary-value"]',
      'mercado-dinero': '[data-testid="category-mercado-dinero"] [data-testid="monetary-value"]',
      'mercado-capitales': '[data-testid="category-mercado-capitales"] [data-testid="monetary-value"]'
    };
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.mainInterface);
  }

  async verifyMainInterfaceDisplayed() {
    return await this.page.isVisible(this.mainInterface);
  }

  async selectContractWithMultipleCategories() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(`${this.contractListItem}:first-child`);
  }

  async verifyContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent);
    return await this.page.isVisible(this.contractValueComponent);
  }

  async clickValueCompositionComponent() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup);
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async verifyAllMonetaryValuesRightAligned() {
    const monetaryValues = await this.page.locator(`${this.breakdownPopup} ${this.monetaryValueSelector}`).all();
    
    for (const valueElement of monetaryValues) {
      const textAlign = await valueElement.evaluate(el => {
        return window.getComputedStyle(el).textAlign;
      });
      
      const justifyContent = await valueElement.evaluate(el => {
        return window.getComputedStyle(el).justifyContent;
      });
      
      const isRightAligned = textAlign === 'right' || textAlign === 'end' || 
                             justifyContent === 'flex-end' || justifyContent === 'end';
      
      if (!isRightAligned) {
        return false;
      }
    }
    return true;
  }

  async verifyCategoryValueAlignment(categoryKey) {
    const selector = this.categorySelectors[categoryKey];
    if (!selector) {
      throw new Error(`Unknown category: ${categoryKey}`);
    }
    
    const element = await this.page.locator(selector);
    const isVisible = await element.isVisible();
    
    if (!isVisible) {
      return true;
    }
    
    const textAlign = await element.evaluate(el => {
      return window.getComputedStyle(el).textAlign;
    });
    
    const justifyContent = await element.evaluate(el => {
      return window.getComputedStyle(el).justifyContent;
    });
    
    return textAlign === 'right' || textAlign === 'end' || 
           justifyContent === 'flex-end' || justifyContent === 'end';
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractBreakdownPage;