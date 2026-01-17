class ActicenterSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Header elements
    this.header = '[data-testid="acticenter-header"]';
    this.searchIcon = '[data-testid="search-icon-magnifying-glass"]';
    
    // Client general screen elements
    this.clientGeneralScreen = '[data-testid="client-general-screen"]';
    this.contractsList = '[data-testid="contracts-list"]';
    this.contractItem = '[data-testid="contract-item"]';
    this.bpItem = '[data-testid="bp-item"]';
    
    // Contract value component
    this.contractValueComponent = '[data-testid="contract-total-value"]';
    this.contractValueAmount = '[data-testid="contract-value-amount"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async isHeaderVisible() {
    return await this.page.locator(this.header).isVisible();
  }

  async clickSearchIcon() {
    await this.page.locator(this.searchIcon).click();
    await this.page.waitForLoadState('networkidle');
  }

  async isClientGeneralScreenVisible() {
    await this.page.waitForSelector(this.clientGeneralScreen, { state: 'visible', timeout: 10000 });
    return await this.page.locator(this.clientGeneralScreen).isVisible();
  }

  async hasAvailableContracts() {
    const contractsCount = await this.page.locator(this.contractItem).count();
    const bpCount = await this.page.locator(this.bpItem).count();
    return contractsCount > 0 || bpCount > 0;
  }

  async selectFirstAvailableContract() {
    const contractLocator = this.page.locator(this.contractItem).first();
    const isContractVisible = await contractLocator.isVisible();
    
    if (isContractVisible) {
      await contractLocator.click();
    } else {
      await this.page.locator(this.bpItem).first().click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.locator(this.contractValueComponent).isVisible();
  }

  async getContractValueText() {
    return await this.page.locator(this.contractValueAmount).textContent();
  }
}

module.exports = ActicenterSearchPage;