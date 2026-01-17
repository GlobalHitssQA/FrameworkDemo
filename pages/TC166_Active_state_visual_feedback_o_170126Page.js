class ContractComponentPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.locators = {
      usernameInput: '[data-testid="login-username"]',
      passwordInput: '[data-testid="login-password"]',
      loginButton: '[data-testid="login-submit-button"]',
      contractSearchInput: '[data-testid="contract-search-input"]',
      searchButton: '[data-testid="search-button"]',
      contractListItem: '[data-testid="contract-list-item"]',
      contractValueComponent: '[data-testid="contract-value-component"]',
      mainContractComponent: '[data-testid="contract-composition-main"]',
      breakdownPopup: '[data-testid="contract-breakdown-popup"]',
      breakdownCloseButton: '[data-testid="breakdown-close-button"]',
      totalValueDisplay: '[data-testid="total-contract-value"]',
      breakdownItemsList: '[data-testid="breakdown-items-list"]'
    };
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async performAuthentication() {
    const username = process.env.TEST_USERNAME || 'test_user';
    const password = process.env.TEST_PASSWORD || 'test_password';
    
    await this.page.fill(this.locators.usernameInput, username);
    await this.page.fill(this.locators.passwordInput, password);
    await this.page.click(this.locators.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.waitForSelector(this.locators.contractListItem);
    await this.page.click(this.locators.contractListItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractComponentVisible() {
    await this.page.waitForSelector(this.locators.contractValueComponent, { timeout: 10000 });
    return await this.page.isVisible(this.locators.contractValueComponent);
  }

  async pressAndHoldMainComponent() {
    const element = await this.page.locator(this.locators.mainContractComponent);
    const boundingBox = await element.boundingBox();
    
    if (boundingBox) {
      const x = boundingBox.x + boundingBox.width / 2;
      const y = boundingBox.y + boundingBox.height / 2;
      await this.page.mouse.move(x, y);
      await this.page.mouse.down();
    }
  }

  async hasActiveStateStyles() {
    const element = await this.page.locator(this.locators.mainContractComponent);
    const styles = await element.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        boxShadow: computed.boxShadow,
        transform: computed.transform,
        outline: computed.outline
      };
    });
    
    const hasStyleChanges = styles.boxShadow !== 'none' || 
                            styles.transform !== 'none' || 
                            styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
    return hasStyleChanges;
  }

  async captureActiveStateStyles() {
    const element = await this.page.locator(this.locators.mainContractComponent);
    return await element.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        boxShadow: computed.boxShadow,
        transform: computed.transform,
        outline: computed.outline,
        border: computed.border,
        opacity: computed.opacity
      };
    });
  }

  async isActiveStateDistinct(activeStyles) {
    const element = await this.page.locator(this.locators.mainContractComponent);
    
    await this.page.mouse.up();
    await this.page.waitForTimeout(100);
    
    const normalStyles = await element.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        boxShadow: computed.boxShadow,
        transform: computed.transform
      };
    });
    
    await this.pressAndHoldMainComponent();
    
    const isDifferent = activeStyles.backgroundColor !== normalStyles.backgroundColor ||
                        activeStyles.boxShadow !== normalStyles.boxShadow ||
                        activeStyles.transform !== normalStyles.transform;
    
    return isDifferent;
  }

  async releaseClick() {
    await this.page.mouse.up();
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.locators.breakdownPopup, { timeout: 5000 });
    return await this.page.isVisible(this.locators.breakdownPopup);
  }

  async hasNormalOrHoverState() {
    const element = await this.page.locator(this.locators.mainContractComponent);
    const styles = await element.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        transform: computed.transform
      };
    });
    
    return styles.transform === 'none' || styles.transform === 'matrix(1, 0, 0, 1, 0, 0)';
  }

  async closeBreakdownPopup() {
    if (await this.page.isVisible(this.locators.breakdownCloseButton)) {
      await this.page.click(this.locators.breakdownCloseButton);
    }
  }
}

module.exports = ContractComponentPage;