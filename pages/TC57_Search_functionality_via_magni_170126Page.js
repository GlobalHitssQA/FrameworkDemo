class SearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - inferidos usando buenas prácticas
    this.searchIcon = '[data-testid="search-icon-lupa"]';
    this.searchIconAlt = '#btn-search-client';
    this.customerGeneralScreen = '[data-testid="customer-general-screen"]';
    this.contractsList = '[data-testid="contracts-list"]';
    this.contractItem = '[data-testid="contract-item"]';
    this.contractValueComponent = '[data-testid="contract-total-value"]';
    this.responsiveContainer = '[data-testid="responsive-container"]';
    this.bpList = '[data-testid="bp-list"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async setResponsiveViewport() {
    await this.page.setViewportSize({ width: 768, height: 1024 });
  }

  async isSearchIconVisible() {
    const icon = this.page.locator(this.searchIcon);
    const altIcon = this.page.locator(this.searchIconAlt);
    const isVisible = await icon.isVisible().catch(() => false);
    if (isVisible) return true;
    return await altIcon.isVisible().catch(() => false);
  }

  async clickSearchIcon() {
    const icon = this.page.locator(this.searchIcon);
    const isVisible = await icon.isVisible().catch(() => false);
    if (isVisible) {
      await icon.click();
    } else {
      await this.page.locator(this.searchIconAlt).click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async isCustomerGeneralScreenVisible() {
    const screen = this.page.locator(this.customerGeneralScreen);
    return await screen.isVisible({ timeout: 5000 }).catch(() => false);
  }

  async hasContractsDisplayed() {
    const contracts = this.page.locator(this.contractItem);
    const bp = this.page.locator(this.bpList);
    const contractCount = await contracts.count().catch(() => 0);
    const bpVisible = await bp.isVisible().catch(() => false);
    return contractCount > 0 || bpVisible;
  }

  async selectFirstContract() {
    const firstContract = this.page.locator(this.contractItem).first();
    await firstContract.waitFor({ state: 'visible', timeout: 5000 });
    await firstContract.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    const component = this.page.locator(this.contractValueComponent);
    return await component.isVisible({ timeout: 5000 }).catch(() => false);
  }
}

module.exports = SearchPage;