class ProspectSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://actinver.atlassian.net';
    
    this.searchField = '[data-testid="prospect-search-input"]';
    this.searchButton = '[data-testid="prospect-search-button"]';
    this.searchResultsList = '[data-testid="prospect-results-list"]';
    this.searchResultItem = '[data-testid="prospect-result-item"]';
    this.prospectName = '[data-testid="prospect-name"]';
    this.prospectEmail = '[data-testid="prospect-email"]';
    this.selectedProspectContainer = '[data-testid="selected-prospect-container"]';
    this.advisorDashboard = '[data-testid="advisor-dashboard"]';
    this.scrollContainer = '[data-testid="prospect-results-scroll-container"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.advisorDashboard, { state: 'visible', timeout: 10000 });
  }

  async verifySearchFieldIsVisible() {
    await this.page.waitForSelector(this.searchField, { state: 'visible' });
  }

  async enterSearchQuery(query) {
    await this.page.fill(this.searchField, query);
  }

  async clickSearchButton() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchResultsList, { state: 'visible' });
  }

  async areSearchResultsVisible() {
    return await this.page.isVisible(this.searchResultsList);
  }

  async getVisibleResultsCount() {
    await this.page.waitForSelector(this.searchResultItem);
    const results = await this.page.$$(this.searchResultItem);
    return results.length;
  }

  async hasScrollableResults() {
    const scrollContainer = await this.page.$(this.scrollContainer);
    if (!scrollContainer) {
      return false;
    }
    const scrollHeight = await scrollContainer.evaluate(el => el.scrollHeight);
    const clientHeight = await scrollContainer.evaluate(el => el.clientHeight);
    return scrollHeight > clientHeight;
  }

  async selectFirstProspect() {
    await this.page.click(`${this.searchResultItem}:first-child`);
  }

  async isProspectSelected() {
    return await this.page.isVisible(this.selectedProspectContainer);
  }

  async getSelectedProspectName() {
    return await this.page.textContent(this.prospectName);
  }

  async getSelectedProspectEmail() {
    return await this.page.textContent(this.prospectEmail);
  }
}

module.exports = ProspectSearchPage;