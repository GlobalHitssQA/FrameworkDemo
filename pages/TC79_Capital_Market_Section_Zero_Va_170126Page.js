class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.searchClientInput = '[data-testid="search-client-contract"]';
    this.searchButton = '[data-testid="search-button-lupa"]';
    this.contractList = '[data-testid="contract-list"]';
    this.contractItem = '[data-testid="contract-item"]';
    this.contractWithoutCapitalMarket = '[data-testid="contract-item-no-capital-market"]';
    this.totalValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.capitalMarketSection = '[data-testid="section-capital-market"]';
    this.capitalMarketValue = '[data-testid="section-capital-market-value"]';
    this.sectionItems = '[data-testid="breakdown-section-item"]';
    this.sectionValue = '[data-testid="section-value"]';
    this.contractDisplay = '[data-testid="contract-display"]';
    this.authenticationIndicator = '[data-testid="user-authenticated"]';
  }

  async navigateToApplication() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.authenticationIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyContractListIsAvailable() {
    await this.page.waitForSelector(this.contractList, { state: 'visible' });
  }

  async selectContractWithoutCapitalMarket() {
    const contractSelector = this.contractWithoutCapitalMarket;
    const fallbackSelector = `${this.contractItem}:first-child`;
    
    const specificContract = await this.page.$(contractSelector);
    if (specificContract) {
      await specificContract.click();
    } else {
      await this.page.click(fallbackSelector);
    }
    await this.page.waitForLoadState('networkidle');
  }

  async isContractDisplayed() {
    await this.page.waitForSelector(this.contractDisplay, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.contractDisplay);
  }

  async clickTotalValueComponent() {
    await this.page.waitForSelector(this.totalValueComponent, { state: 'visible' });
    await this.page.click(this.totalValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async scrollToCapitalMarketSection() {
    const section = await this.page.$(this.capitalMarketSection);
    if (section) {
      await section.scrollIntoViewIfNeeded();
    }
  }

  async getCapitalMarketValue() {
    await this.page.waitForSelector(this.capitalMarketValue, { state: 'visible' });
    const valueText = await this.page.textContent(this.capitalMarketValue);
    return valueText.trim();
  }

  async getAllZeroBalanceSections() {
    const sections = await this.page.$$(this.sectionItems);
    const zeroBalanceSections = [];
    
    for (const section of sections) {
      const valueElement = await section.$(this.sectionValue);
      if (valueElement) {
        const value = await valueElement.textContent();
        const trimmedValue = value.trim();
        if (trimmedValue === '$0.00') {
          const nameElement = await section.$('[data-testid="section-name"]');
          const name = nameElement ? await nameElement.textContent() : 'Unknown';
          zeroBalanceSections.push({ name: name.trim(), value: trimmedValue });
        }
      }
    }
    
    return zeroBalanceSections;
  }
}

module.exports = ContractBreakdownPage;