class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractValueComponent = '[data-testid="contract-value-composition-component"]';
    this.searchMagnifyingGlass = '[data-testid="search-client-contract-button"]';
    this.searchInput = '[data-testid="search-input-field"]';
    this.searchSubmitButton = '[data-testid="search-submit-button"]';
    this.clientSearchResults = '[data-testid="client-search-results"]';
    this.clientResultItem = '[data-testid="client-result-item"]';
    this.clientBPScreen = '[data-testid="client-bp-screen"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractLoadedIndicator = '[data-testid="contract-loaded-indicator"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.breakdownButton = '[data-testid="contract-breakdown-button"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenVisible() {
    return await this.page.locator(this.mainScreen).isVisible();
  }

  async isContractValueComponentVisible() {
    return await this.page.locator(this.contractValueComponent).isVisible();
  }

  async clickSearchMagnifyingGlass() {
    await this.page.locator(this.searchMagnifyingGlass).click();
  }

  async enterClientSearchTerm(searchTerm) {
    await this.page.locator(this.searchInput).fill(searchTerm);
  }

  async submitSearch() {
    await this.page.locator(this.searchSubmitButton).click();
    await this.page.waitForSelector(this.clientSearchResults);
  }

  async selectFirstClientFromResults() {
    await this.page.locator(this.clientResultItem).first().click();
  }

  async isClientBPScreenVisible() {
    return await this.page.locator(this.clientBPScreen).isVisible();
  }

  async selectFirstAvailableContract() {
    await this.page.locator(this.contractListItem).first().click();
  }

  async isContractLoaded() {
    return await this.page.locator(this.contractLoadedIndicator).isVisible();
  }

  async hasTotalContractValue() {
    return await this.page.locator(this.totalContractValue).isVisible();
  }

  async hasBreakdownOption() {
    return await this.page.locator(this.breakdownButton).isVisible();
  }
};

module.exports = ActicenterPage;