class SearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.magnifyingGlassIcon = '[data-testid="search-magnifying-glass"]';
    this.mainInterface = '[data-testid="acticenter-main-interface"]';
    this.customerGeneralScreen = '[data-testid="customer-general-screen"]';
    this.customerDataSection = '[data-testid="customer-data-section"]';
    this.contractsListSection = '[data-testid="contracts-list-section"]';
    this.customerInfoNavigation = '[data-testid="customer-info-navigation"]';
    this.navigationSections = '[data-testid="navigation-section-item"]';
    this.businessPartnerHeader = '[data-testid="bp-header"]';
    this.customerNameField = '[data-testid="customer-name"]';
    this.contractCard = '[data-testid="contract-card"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainInterfaceIsDisplayed() {
    await this.page.waitForSelector(this.mainInterface, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.mainInterface);
  }

  async clickMagnifyingGlassIcon() {
    await this.page.waitForSelector(this.magnifyingGlassIcon, { state: 'visible' });
    await this.page.click(this.magnifyingGlassIcon);
    await this.page.waitForLoadState('networkidle');
  }

  async isCustomerGeneralScreenDisplayed() {
    await this.page.waitForSelector(this.customerGeneralScreen, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.customerGeneralScreen);
  }

  async verifyAdvisorModuleStructure() {
    const hasHeader = await this.page.isVisible(this.businessPartnerHeader);
    const hasCustomerData = await this.page.isVisible(this.customerDataSection);
    const hasNavigation = await this.page.isVisible(this.customerInfoNavigation);
    return hasHeader && hasCustomerData && hasNavigation;
  }

  async isCustomerDataVisible() {
    await this.page.waitForSelector(this.customerDataSection, { state: 'visible' });
    const hasCustomerName = await this.page.isVisible(this.customerNameField);
    return hasCustomerName;
  }

  async areContractsVisible() {
    const contractCards = await this.page.$$(this.contractCard);
    return contractCards.length > 0;
  }

  async verifyNavigationThroughSections() {
    const sections = await this.page.$$(this.navigationSections);
    if (sections.length === 0) {
      return false;
    }
    for (const section of sections) {
      const isClickable = await section.isEnabled();
      if (!isClickable) {
        return false;
      }
    }
    await sections[0].click();
    await this.page.waitForLoadState('networkidle');
    return true;
  }
}

module.exports = SearchPage;