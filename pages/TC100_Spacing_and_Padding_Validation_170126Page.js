class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.closeBreakdownButton = '[data-testid="breakdown-close-button"]';
    this.searchClientInput = '[data-testid="search-client-input"]';
    this.searchContractInput = '[data-testid="search-contract-input"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.activeContractOption = '[data-testid="active-contract-option"]';
    this.userAuthenticatedIndicator = '[data-testid="user-authenticated"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userAuthenticatedIndicator, { state: 'visible', timeout: 10000 });
  }

  async selectActiveContract() {
    await this.page.click(this.contractSelector);
    await this.page.click(this.activeContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async waitForBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async getComponentExternalMargins() {
    const component = await this.page.locator(this.contractValueComponent);
    const boundingBox = await component.boundingBox();
    const styles = await component.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        marginTop: parseFloat(computed.marginTop),
        marginBottom: parseFloat(computed.marginBottom),
        marginLeft: parseFloat(computed.marginLeft),
        marginRight: parseFloat(computed.marginRight)
      };
    });
    return {
      top: styles.marginTop,
      bottom: styles.marginBottom,
      left: styles.marginLeft,
      right: styles.marginRight
    };
  }

  async getBreakdownItemsPadding() {
    const items = await this.page.locator(this.breakdownItem).all();
    const paddings = [];
    for (const item of items) {
      const padding = await item.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          top: parseFloat(computed.paddingTop),
          bottom: parseFloat(computed.paddingBottom),
          left: parseFloat(computed.paddingLeft),
          right: parseFloat(computed.paddingRight)
        };
      });
      paddings.push(padding);
    }
    return paddings;
  }

  async getBreakdownItemsSeparation() {
    const items = await this.page.locator(this.breakdownItem).all();
    const separations = [];
    for (let i = 0; i < items.length - 1; i++) {
      const currentBox = await items[i].boundingBox();
      const nextBox = await items[i + 1].boundingBox();
      const separation = nextBox.y - (currentBox.y + currentBox.height);
      separations.push(separation);
    }
    return separations;
  }

  async verifyBreakdownVerticalAlignment() {
    const componentBox = await this.page.locator(this.contractValueComponent).boundingBox();
    const popupBox = await this.page.locator(this.breakdownPopup).boundingBox();
    const componentCenterX = componentBox.x + componentBox.width / 2;
    const popupCenterX = popupBox.x + popupBox.width / 2;
    const tolerance = 10;
    return Math.abs(componentCenterX - popupCenterX) <= tolerance;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async getContractTotalValue() {
    return await this.page.locator(this.totalValueDisplay).textContent();
  }
}

module.exports = ContractValuePage;