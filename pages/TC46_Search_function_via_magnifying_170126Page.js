class SearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.magnifyingGlassIcon = '[data-testid="search-magnifying-glass"]';
    this.magnifyingGlassIconAlt = '#btn-search-client';
    this.magnifyingGlassIconFallback = '.search-icon-lupa';
    
    this.searchInput = '[data-testid="search-input-client-contract"]';
    this.searchInputAlt = '#input-search-client';
    this.searchInputFallback = '.search-input-field';
    
    this.searchContainer = '[data-testid="search-container"]';
    this.searchContainerAlt = '#search-panel';
    this.searchContainerFallback = '.search-panel-container';
    
    this.mainInterface = '[data-testid="main-interface"]';
    this.mainInterfaceAlt = '#main-dashboard';
    this.mainInterfaceFallback = '.acticenter-main';
    
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
  }

  async login() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpassword';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async waitForMainInterface() {
    const mainSelector = await this.getAvailableSelector([
      this.mainInterface,
      this.mainInterfaceAlt,
      this.mainInterfaceFallback
    ]);
    await this.page.waitForSelector(mainSelector, { state: 'visible', timeout: 30000 });
  }

  async setDesktopViewport() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  async setLandscapeViewport() {
    await this.page.setViewportSize({ width: 1024, height: 768 });
  }

  async setPortraitViewport() {
    await this.page.setViewportSize({ width: 375, height: 812 });
  }

  async getAvailableSelector(selectors) {
    for (const selector of selectors) {
      const element = await this.page.$(selector);
      if (element) {
        return selector;
      }
    }
    return selectors[0];
  }

  async getMagnifyingGlassSelector() {
    return await this.getAvailableSelector([
      this.magnifyingGlassIcon,
      this.magnifyingGlassIconAlt,
      this.magnifyingGlassIconFallback
    ]);
  }

  async isMagnifyingGlassVisible() {
    const selector = await this.getMagnifyingGlassSelector();
    const element = await this.page.$(selector);
    if (!element) return false;
    return await element.isVisible();
  }

  async clickMagnifyingGlass() {
    const selector = await this.getMagnifyingGlassSelector();
    await this.page.click(selector);
  }

  async isSearchFunctionActive() {
    const containerSelector = await this.getAvailableSelector([
      this.searchContainer,
      this.searchContainerAlt,
      this.searchContainerFallback
    ]);
    await this.page.waitForSelector(containerSelector, { state: 'visible', timeout: 5000 });
    const element = await this.page.$(containerSelector);
    return element !== null;
  }

  async isSearchInputEnabled() {
    const inputSelector = await this.getAvailableSelector([
      this.searchInput,
      this.searchInputAlt,
      this.searchInputFallback
    ]);
    const element = await this.page.$(inputSelector);
    if (!element) return false;
    return await element.isEnabled();
  }

  async enterSearchCriteria(criteria) {
    const inputSelector = await this.getAvailableSelector([
      this.searchInput,
      this.searchInputAlt,
      this.searchInputFallback
    ]);
    await this.page.fill(inputSelector, criteria);
  }

  async getSearchInputValue() {
    const inputSelector = await this.getAvailableSelector([
      this.searchInput,
      this.searchInputAlt,
      this.searchInputFallback
    ]);
    return await this.page.inputValue(inputSelector);
  }
}

module.exports = SearchPage;