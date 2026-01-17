class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.monetaryValue = '[data-testid="monetary-value"]';
    this.closePopupButton = '[data-testid="close-breakdown-popup"]';
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.activeContractOption = '[data-testid="active-contract-option"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
  }

  async authenticateUser() {
    await this.page.fill(this.usernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.TEST_PASSWORD || 'testpassword');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.click(this.contractSelector);
    await this.page.click(this.activeContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueComponentVisible() {
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async hasBreakdownItems() {
    const items = await this.page.$$(this.breakdownItem);
    return items.length > 0;
  }

  async areMonetaryValuesAlignedRight() {
    const values = await this.page.$$(this.monetaryValue);
    for (const value of values) {
      const alignment = await value.evaluate(el => window.getComputedStyle(el).textAlign);
      if (alignment !== 'right') {
        return false;
      }
    }
    return true;
  }

  async isPopupAlignedWithComponent() {
    const componentBox = await this.page.locator(this.totalContractValueComponent).boundingBox();
    const popupBox = await this.page.locator(this.breakdownPopup).boundingBox();
    
    if (!componentBox || !popupBox) {
      return false;
    }
    
    const tolerance = 10;
    const isVerticallyAligned = Math.abs(componentBox.x - popupBox.x) <= tolerance || 
                                 Math.abs((componentBox.x + componentBox.width) - (popupBox.x + popupBox.width)) <= tolerance;
    
    return isVerticallyAligned;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closePopupButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;