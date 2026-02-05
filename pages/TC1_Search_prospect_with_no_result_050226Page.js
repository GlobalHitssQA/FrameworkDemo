const { expect } = require('@playwright/test');

class ProspectSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://actinver.atlassian.net';
    
    // Locators - inferidos con buenas prácticas POM
    this.dashboardContainer = '[data-testid="acticenter-dashboard"]';
    this.prospectSearchOption = '[data-testid="prospect-search-option"]';
    this.searchField = '[data-testid="prospect-search-field"]';
    this.searchButton = '[data-testid="prospect-search-button"]';
    this.searchResultsList = '[data-testid="search-results-list"]';
    this.noResultsMessage = '[data-testid="no-results-message"]';
    this.loadingIndicator = '[data-testid="search-loading-indicator"]';
    
    // Locators alternativos
    this.dashboardContainerAlt = '#acticenter-dashboard';
    this.searchFieldAlt = '#prospect-search-input';
    this.searchButtonAlt = 'button[aria-label="Buscar prospecto"]';
    this.noResultsMessageAlt = '.no-results-container';
  }

  async navigateToDashboard() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async isDashboardVisible() {
    try {
      const dashboard = this.page.locator(this.dashboardContainer);
      const altDashboard = this.page.locator(this.dashboardContainerAlt);
      return await dashboard.isVisible() || await altDashboard.isVisible();
    } catch (error) {
      return false;
    }
  }

  async selectProspectSearchOption() {
    const searchOption = this.page.locator(this.prospectSearchOption);
    await searchOption.waitFor({ state: 'visible', timeout: 10000 });
    await searchOption.click();
  }

  async isSearchFieldVisible() {
    try {
      const searchField = this.page.locator(this.searchField);
      const altSearchField = this.page.locator(this.searchFieldAlt);
      return await searchField.isVisible() || await altSearchField.isVisible();
    } catch (error) {
      return false;
    }
  }

  async enterSearchTerm(term) {
    const searchField = this.page.locator(this.searchField);
    await searchField.waitFor({ state: 'visible', timeout: 10000 });
    await searchField.clear();
    await searchField.fill(term);
  }

  async clickSearchButton() {
    const searchButton = this.page.locator(this.searchButton);
    await searchButton.waitFor({ state: 'visible', timeout: 10000 });
    await searchButton.click();
  }

  async waitForSearchResults() {
    try {
      const loadingIndicator = this.page.locator(this.loadingIndicator);
      await loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 });
    } catch (error) {
      // Loading indicator may not exist, continue
    }
    await this.page.waitForLoadState('networkidle');
  }

  async getNoResultsMessage() {
    try {
      const noResults = this.page.locator(this.noResultsMessage);
      await noResults.waitFor({ state: 'visible', timeout: 10000 });
      return await noResults.textContent();
    } catch (error) {
      const altNoResults = this.page.locator(this.noResultsMessageAlt);
      await altNoResults.waitFor({ state: 'visible', timeout: 10000 });
      return await altNoResults.textContent();
    }
  }

  async isSearchFieldEnabled() {
    const searchField = this.page.locator(this.searchField);
    return await searchField.isEnabled();
  }
}

module.exports = ProspectSearchPage;