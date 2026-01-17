class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.mainScreenContainer = '[data-testid="acticenter-main-screen"]';
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    this.searchButton = '[data-testid="search-contract-button"]';
    this.searchInput = '[data-testid="search-contract-input"]';
    this.contractResultItem = '[data-testid="contract-result-item"]';
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractTotalValue = '[data-testid="contract-total-value"]';
    this.breakdownList = '[data-testid="contract-breakdown-list"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreenContainer, { state: 'visible', timeout: 10000 });
  }

  async clickSearchButton() {
    await this.page.click(this.searchButton);
  }

  async searchContract(contractId = '') {
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
    if (contractId) {
      await this.page.fill(this.searchInput, contractId);
      await this.page.keyboard.press('Enter');
    }
  }

  async selectFirstContractResult() {
    await this.page.waitForSelector(this.contractResultItem, { state: 'visible' });
    await this.page.click(this.contractResultItem);
  }

  async isContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractValueComponent);
  }

  async getComponentAlignmentProperties() {
    const component = await this.page.locator(this.contractValueComponent);
    const boundingBox = await component.boundingBox();
    const styles = await component.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        marginTop: computed.marginTop,
        marginRight: computed.marginRight,
        marginBottom: computed.marginBottom,
        marginLeft: computed.marginLeft,
        paddingTop: computed.paddingTop,
        paddingRight: computed.paddingRight,
        paddingBottom: computed.paddingBottom,
        paddingLeft: computed.paddingLeft,
        position: computed.position,
        display: computed.display,
        alignItems: computed.alignItems,
        justifyContent: computed.justifyContent
      };
    });
    return {
      position: boundingBox,
      margins: {
        top: styles.marginTop,
        right: styles.marginRight,
        bottom: styles.marginBottom,
        left: styles.marginLeft
      },
      padding: {
        top: styles.paddingTop,
        right: styles.paddingRight,
        bottom: styles.paddingBottom,
        left: styles.paddingLeft
      },
      layout: {
        display: styles.display,
        alignItems: styles.alignItems,
        justifyContent: styles.justifyContent
      }
    };
  }

  async verifyBreakdownListVerticalAlignment() {
    const totalValueComponent = await this.page.locator(this.contractTotalValue);
    const breakdownList = await this.page.locator(this.breakdownList);
    const totalValueBox = await totalValueComponent.boundingBox();
    const breakdownBox = await breakdownList.boundingBox();
    if (!totalValueBox || !breakdownBox) {
      return false;
    }
    const tolerance = 5;
    const isLeftAligned = Math.abs(totalValueBox.x - breakdownBox.x) <= tolerance;
    return isLeftAligned;
  }

  async openBreakdownPopup() {
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async getContractTotalValue() {
    return await this.page.textContent(this.contractTotalValue);
  }
}

module.exports = ContractValuePage;