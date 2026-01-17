class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    this.mainScreenContainer = '[data-testid="acticenter-main-screen"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.bankContractOption = '[data-testid="contract-type-bank"]';
    this.brokerageContractOption = '[data-testid="contract-type-brokerage"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractWithPendingOperations = '[data-testid="contract-item-pending"]';
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.pendingToSettleSection = '[data-testid="pending-to-settle-section"]';
    this.pendingToSettleLabel = '[data-testid="pending-to-settle-label"]';
    this.pendingToSettleValue = '[data-testid="pending-to-settle-value"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
    this.overlay = '[data-testid="breakdown-overlay"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || '/acticenter');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreenContainer, { state: 'visible', timeout: 10000 });
  }

  async selectBankContractWithPendingOperations() {
    await this.page.click(this.bankContractOption);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    const contractWithPending = this.page.locator(`${this.contractListItem}${this.contractWithPendingOperations}`).first();
    await contractWithPending.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectBrokerageContractWithPendingOperations() {
    await this.page.click(this.brokerageContractOption);
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    const contractWithPending = this.page.locator(`${this.contractListItem}${this.contractWithPendingOperations}`).first();
    await contractWithPending.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractInfoLoaded() {
    await this.page.waitForSelector(this.contractInfoContainer, { state: 'visible', timeout: 10000 });
  }

  async verifyTotalValueComponentDisplayed() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickTotalValueComponent() {
    await this.page.click(this.totalValueComponent);
    await this.page.waitForTimeout(500);
  }

  async verifyBreakdownPopupDisplayed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async verifyPendingToSettleSectionDisplayed() {
    await this.page.waitForSelector(this.pendingToSettleSection, { state: 'visible', timeout: 5000 });
  }

  async getPendingToSettleSectionText() {
    const labelText = await this.page.textContent(this.pendingToSettleLabel);
    const valueText = await this.page.textContent(this.pendingToSettleValue);
    return { label: labelText, value: valueText };
  }

  async getPendingToSettleSectionStyle() {
    const section = this.page.locator(this.pendingToSettleSection);
    const styles = await section.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        visibility: computed.visibility,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        color: computed.color
      };
    });
    return styles;
  }

  async closeBreakdownPopup() {
    const closeButton = this.page.locator(this.closeBreakdownButton);
    if (await closeButton.isVisible()) {
      await closeButton.click();
    } else {
      await this.page.click(this.overlay);
    }
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }

  async verifyPendingToSettleSectionConsistency() {
    const isVisible = await this.page.isVisible(this.pendingToSettleSection);
    if (!isVisible) {
      throw new Error('Pending to settle section is not consistently displayed');
    }
  }
}

module.exports = ActicenterPage;