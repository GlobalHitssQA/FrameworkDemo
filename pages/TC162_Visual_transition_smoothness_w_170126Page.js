class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    this.contractComponentSelector = '[data-testid="contract-value-component"]';
    this.breakdownContainerSelector = '[data-testid="breakdown-container"]';
    this.itemizedListSelector = '[data-testid="itemized-breakdown-list"]';
    this.searchLupaSelector = '[data-testid="search-client-contract"]';
    this.closeButtonSelector = '[data-testid="breakdown-close-button"]';
    this.contractItemSelector = '[data-testid="contract-item"]';
    this.expandedStateClass = 'expanded';
    this.collapsedStateClass = 'collapsed';
    this.usernameInputSelector = '#username';
    this.passwordInputSelector = '#password';
    this.loginButtonSelector = '[data-testid="login-button"]';
    this.breakdownItemsSelector = '[data-testid="breakdown-item"]';
    this.monetaryValueSelector = '[data-testid="monetary-value"]';
    this.tooltipDistributionSelector = '[data-testid="distribution-tooltip"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async performAuthentication() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpass';
    await this.page.fill(this.usernameInputSelector, username);
    await this.page.fill(this.passwordInputSelector, password);
    await this.page.click(this.loginButtonSelector);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.waitForSelector(this.contractItemSelector);
    await this.page.click(`${this.contractItemSelector}:first-child`);
    await this.page.waitForLoadState('networkidle');
  }

  async selectContractByIndex(index) {
    await this.page.waitForSelector(this.contractItemSelector);
    const contracts = await this.page.$$(this.contractItemSelector);
    if (contracts[index]) {
      await contracts[index].click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async isContractComponentVisible() {
    await this.page.waitForSelector(this.contractComponentSelector, { timeout: 10000 });
    return await this.page.isVisible(this.contractComponentSelector);
  }

  async isComponentCollapsed() {
    const component = await this.page.$(this.contractComponentSelector);
    if (!component) return false;
    const classList = await component.evaluate(el => el.className);
    return classList.includes(this.collapsedStateClass) || !classList.includes(this.expandedStateClass);
  }

  async clickToExpandBreakdown() {
    await this.page.click(this.contractComponentSelector);
    await this.page.waitForSelector(this.breakdownContainerSelector, { state: 'visible' });
  }

  async isBreakdownExpanded() {
    const component = await this.page.$(this.contractComponentSelector);
    if (!component) return false;
    const classList = await component.evaluate(el => el.className);
    const isContainerVisible = await this.page.isVisible(this.breakdownContainerSelector);
    return isContainerVisible || classList.includes(this.expandedStateClass);
  }

  async isItemizedListVisible() {
    return await this.page.isVisible(this.itemizedListSelector);
  }

  async hasTransitionCSSProperty() {
    const component = await this.page.$(this.contractComponentSelector);
    if (!component) return false;
    const transitionProperty = await component.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.transition || styles.transitionProperty;
    });
    return transitionProperty && transitionProperty !== 'none' && transitionProperty !== 'all 0s ease 0s';
  }

  async verifyTransitionSmoothness() {
    const breakdownContainer = await this.page.$(this.breakdownContainerSelector);
    if (!breakdownContainer) return false;
    const animationCheck = await breakdownContainer.evaluate(el => {
      const styles = window.getComputedStyle(el);
      const hasTransition = styles.transition && styles.transition !== 'none';
      const hasAnimation = styles.animation && styles.animation !== 'none';
      const hasTransform = styles.transform && styles.transform !== 'none';
      const transitionDuration = parseFloat(styles.transitionDuration) || 0;
      return {
        hasTransition,
        hasAnimation,
        hasTransform,
        transitionDuration,
        isSmooth: (hasTransition || hasAnimation) && transitionDuration > 0
      };
    });
    return animationCheck.isSmooth || animationCheck.hasTransition || animationCheck.hasAnimation;
  }

  async collapseBreakdown() {
    const isExpanded = await this.isBreakdownExpanded();
    if (isExpanded) {
      const closeButton = await this.page.$(this.closeButtonSelector);
      if (closeButton) {
        await closeButton.click();
      } else {
        await this.page.click(this.contractComponentSelector);
      }
      await this.page.waitForSelector(this.breakdownContainerSelector, { state: 'hidden', timeout: 5000 }).catch(() => {});
    }
  }

  async getBreakdownItems() {
    await this.page.waitForSelector(this.breakdownItemsSelector);
    return await this.page.$$(this.breakdownItemsSelector);
  }

  async getMonetaryValues() {
    const values = await this.page.$$(this.monetaryValueSelector);
    const textValues = [];
    for (const value of values) {
      textValues.push(await value.textContent());
    }
    return textValues;
  }

  async searchClientOrContract(searchTerm) {
    await this.page.click(this.searchLupaSelector);
    await this.page.fill(`${this.searchLupaSelector} input`, searchTerm);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = ContractBreakdownPage;