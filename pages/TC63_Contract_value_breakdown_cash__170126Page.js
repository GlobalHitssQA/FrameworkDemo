class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.efectivoMXNItem = '[data-testid="breakdown-item-efectivo-mxn"]';
    this.efectivoMXNItemName = '[data-testid="breakdown-item-efectivo-mxn"] [data-testid="item-name"]';
    this.bankContractSelector = '[data-testid="bank-contract-selector"]';
    this.bankContractOption = '[data-testid="bank-contract-option"]';
    this.searchLupa = '[data-testid="search-client-contract"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 30000 });
  }

  async selectBankContract() {
    await this.page.click(this.bankContractSelector);
    await this.page.waitForSelector(this.bankContractOption, { state: 'visible' });
    await this.page.click(this.bankContractOption);
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

  async locateEfectivoMXNItem() {
    await this.page.waitForSelector(this.efectivoMXNItem, { state: 'visible' });
  }

  async getEfectivoMXNItemName() {
    const element = await this.page.locator(this.efectivoMXNItemName);
    return await element.textContent();
  }

  async verifyEfectivoMXNItemStyles() {
    const element = await this.page.locator(this.efectivoMXNItemName);
    const isVisible = await element.isVisible();
    
    if (!isVisible) {
      return false;
    }
    
    const styles = await element.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        color: computed.color
      };
    });
    
    const hasValidFontSize = parseInt(styles.fontSize) > 0;
    const hasValidFontFamily = styles.fontFamily && styles.fontFamily.length > 0;
    
    return hasValidFontSize && hasValidFontFamily;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.breakdownCloseButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;