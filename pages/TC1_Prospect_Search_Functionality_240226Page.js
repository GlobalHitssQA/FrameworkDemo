class ProspectSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://actinver.atlassian.net';
    
    // Locators
    this.dashboardContainer = '[data-testid="advisor-dashboard"]';
    this.searchField = '[data-testid="prospect-search-field"]';
    this.searchButton = '[data-testid="search-button"]';
    this.recentSearchesList = '[data-testid="recent-searches-list"]';
    this.recentSearchItem = '[data-testid="recent-search-item"]';
    this.searchResultsList = '[data-testid="search-results-list"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    this.prospectName = '[data-testid="prospect-name"]';
    this.prospectEmail = '[data-testid="prospect-email"]';
    this.highlightedText = '[data-testid="highlighted-match"]';
    this.noResultsMessage = '[data-testid="no-results-message"]';
  }

  async navigateToDashboard() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDashboardIsDisplayed() {
    await this.page.waitForSelector(this.dashboardContainer, { state: 'visible', timeout: 10000 });
  }

  async verifySearchFieldIsAvailable() {
    const isVisible = await this.page.isVisible(this.searchField);
    if (!isVisible) {
      throw new Error('Search field is not available on the dashboard');
    }
  }

  async clickSearchField() {
    await this.page.click(this.searchField);
    await this.page.waitForTimeout(500);
  }

  async getRecentSearchesCount() {
    await this.page.waitForSelector(this.recentSearchItem, { state: 'visible', timeout: 5000 }).catch(() => null);
    const items = await this.page.$$(this.recentSearchItem);
    return items.length;
  }

  async verifyRecentSearchesHaveNameAndEmail() {
    const items = await this.page.$$(this.recentSearchItem);
    for (const item of items) {
      const name = await item.$(this.prospectName);
      const email = await item.$(this.prospectEmail);
      if (!name || !email) {
        throw new Error('Recent search items must have name and email');
      }
    }
  }

  async enterSearchText(text) {
    await this.page.fill(this.searchField, '');
    await this.page.fill(this.searchField, text);
    await this.page.waitForTimeout(1000);
  }

  async areSearchResultsVisible() {
    const resultsVisible = await this.page.isVisible(this.searchResultsList);
    const hasItems = await this.page.$$(this.searchResultItem);
    return resultsVisible && hasItems.length > 0;
  }

  async waitForSearchResults() {
    await this.page.waitForSelector(this.searchResultsList, { state: 'visible', timeout: 10000 });
    await this.page.waitForSelector(this.searchResultItem, { state: 'visible', timeout: 5000 });
  }

  async getSearchResultsCount() {
    const items = await this.page.$$(this.searchResultItem);
    return items.length;
  }

  async verifyResultsHaveHighlightedMatches() {
    const items = await this.page.$$(this.searchResultItem);
    for (const item of items) {
      const highlighted = await item.$(this.highlightedText);
      if (!highlighted) {
        throw new Error('Search results must have highlighted matching characters');
      }
    }
  }

  async verifyResultsDisplayNameAndEmail() {
    const items = await this.page.$$(this.searchResultItem);
    for (const item of items) {
      const name = await item.$(this.prospectName);
      const email = await item.$(this.prospectEmail);
      if (!name || !email) {
        throw new Error('Search results must display prospect name and email');
      }
      const nameText = await name.textContent();
      const emailText = await email.textContent();
      if (!nameText || !emailText) {
        throw new Error('Name and email must have content');
      }
    }
  }
}

module.exports = ProspectSearchPage;