class ProspectSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://actinver.atlassian.net';
    
    // Locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.dashboard = '[data-testid="main-dashboard"]';
    this.prospectSearchField = '[data-testid="prospect-search-field"]';
    this.searchButton = '[data-testid="search-button"]';
    this.searchResultsContainer = '[data-testid="search-results-container"]';
    this.prospectItem = '[data-testid="prospect-item"]';
    this.prospectName = '[data-testid="prospect-name"]';
    this.prospectEmail = '[data-testid="prospect-email"]';
    this.resultsScrollArea = '[data-testid="results-scroll-area"]';
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
  }

  async loginAsAdvisor() {
    await this.page.fill(this.usernameInput, process.env.ADVISOR_USERNAME || 'advisor@test.com');
    await this.page.fill(this.passwordInput, process.env.ADVISOR_PASSWORD || 'testpassword');
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.dashboard, { state: 'visible' });
  }

  async isDashboardVisible() {
    return await this.page.isVisible(this.dashboard);
  }

  async locateSearchField() {
    await this.page.waitForSelector(this.prospectSearchField, { state: 'visible' });
  }

  async isSearchFieldEnabled() {
    return await this.page.isEnabled(this.prospectSearchField);
  }

  async enterSearchCriteria(criteria) {
    await this.page.fill(this.prospectSearchField, criteria);
  }

  async getSearchFieldValue() {
    return await this.page.inputValue(this.prospectSearchField);
  }

  async clickSearchButton() {
    await this.page.click(this.searchButton);
  }

  async waitForSearchResults() {
    await this.page.waitForSelector(this.searchResultsContainer, { state: 'visible' });
    await this.page.waitForSelector(this.prospectItem, { state: 'visible' });
  }

  async getVisibleProspectCount() {
    const prospects = await this.page.$$(this.prospectItem);
    return prospects.length;
  }

  async verifyProspectsHaveNameAndEmail() {
    const prospects = await this.page.$$(this.prospectItem);
    for (const prospect of prospects) {
      const name = await prospect.$(this.prospectName.replace('[data-testid="', '[data-testid="'));
      const email = await prospect.$(this.prospectEmail.replace('[data-testid="', '[data-testid="'));
      if (!name || !email) {
        return false;
      }
      const nameText = await name.textContent();
      const emailText = await email.textContent();
      if (!nameText || !emailText) {
        return false;
      }
    }
    return true;
  }

  async isScrollBarVisible() {
    const scrollArea = await this.page.$(this.resultsScrollArea);
    if (!scrollArea) {
      return false;
    }
    const scrollHeight = await this.page.evaluate(el => el.scrollHeight, scrollArea);
    const clientHeight = await this.page.evaluate(el => el.clientHeight, scrollArea);
    return scrollHeight > clientHeight;
  }

  async scrollDownResults() {
    const scrollArea = await this.page.$(this.resultsScrollArea);
    if (scrollArea) {
      await this.page.evaluate(el => {
        el.scrollTop = el.scrollHeight;
      }, scrollArea);
    }
  }

  async areAdditionalProspectsVisible() {
    const prospects = await this.page.$$(this.prospectItem);
    return prospects.length > 5;
  }
}

module.exports = ProspectSearchPage;