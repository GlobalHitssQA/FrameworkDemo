class ContractCompositionPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.searchClientInput = page.locator('[data-testid="search-client-contract"]');
    this.searchButton = page.locator('[data-testid="search-button-lupa"]');
    this.contractSelector = page.locator('[data-testid="contract-selector"]');
    this.contractWithoutHedgeFunds = page.locator('[data-testid="contract-item-no-hedge-funds"]');
    this.selectedContractDisplay = page.locator('[data-testid="selected-contract-display"]');
    this.totalContractValue = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.hedgeFundsSection = page.locator('[data-testid="hedge-funds-section"]');
    this.hedgeFundsValue = page.locator('[data-testid="hedge-funds-value"]');
    this.hedgeFundsLabel = page.locator('[data-testid="hedge-funds-label"]');
    this.breakdownSections = page.locator('[data-testid="breakdown-section"]');
  }

  async navigateToConsultationModule() {
    await this.page.goto('/consultation/contract-value');
    await this.page.waitForLoadState('networkidle');
  }

  async selectContractWithoutHedgeFunds() {
    await this.contractSelector.click();
    await this.contractWithoutHedgeFunds.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractDisplayed() {
    return await this.selectedContractDisplay.isVisible();
  }

  async clickTotalContractValue() {
    await this.totalContractValue.click();
    await this.breakdownPopup.waitFor({ state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async locateHedgeFundsSection() {
    await this.hedgeFundsSection.scrollIntoViewIfNeeded();
    await this.hedgeFundsSection.waitFor({ state: 'visible' });
  }

  async getHedgeFundsValue() {
    const valueText = await this.hedgeFundsValue.textContent();
    return valueText.trim();
  }

  async isHedgeFundsSectionFormatConsistent() {
    const hedgeFundsStyles = await this.hedgeFundsSection.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        fontSize: computed.fontSize,
        fontFamily: computed.fontFamily,
        padding: computed.padding,
        display: computed.display
      };
    });

    const firstOtherSection = this.breakdownSections.first();
    const otherSectionStyles = await firstOtherSection.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        fontSize: computed.fontSize,
        fontFamily: computed.fontFamily,
        padding: computed.padding,
        display: computed.display
      };
    });

    return (
      hedgeFundsStyles.fontSize === otherSectionStyles.fontSize &&
      hedgeFundsStyles.fontFamily === otherSectionStyles.fontFamily
    );
  }
}

module.exports = ContractCompositionPage;