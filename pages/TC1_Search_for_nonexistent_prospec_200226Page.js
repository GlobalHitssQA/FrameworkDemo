const { expect } = require('@playwright/test');

class ActicenterDashboardPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://actinver.atlassian.net';
    
    // Locators - inferidos basados en buenas prácticas
    this.dashboardContainer = '[data-testid="acticenter-dashboard"]';
    this.prospectSearchField = '[data-testid="prospect-search-input"]';
    this.searchButton = '[data-testid="prospect-search-button"]';
    this.searchResultsList = '[data-testid="prospect-search-results"]';
    this.noResultsMessage = '[data-testid="no-results-message"]';
    this.newProspectButton = '[data-testid="new-prospect-button"]';
    this.loadingIndicator = '[data-testid="search-loading-indicator"]';
    this.prospectResultItem = '[data-testid="prospect-result-item"]';
  }

  async navigateToDashboard() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDashboardIsDisplayed() {
    await this.page.waitForSelector(this.dashboardContainer, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.dashboardContainer);
  }

  async isProspectSearchFieldVisible() {
    return await this.page.isVisible(this.prospectSearchField);
  }

  async isProspectSearchFieldEnabled() {
    return await this.page.isEnabled(this.prospectSearchField);
  }

  async enterProspectSearchText(searchText) {
    await this.page.waitForSelector(this.prospectSearchField, { state: 'visible' });
    await this.page.fill(this.prospectSearchField, searchText);
  }

  async waitForSearchExecution() {
    try {
      await this.page.waitForSelector(this.loadingIndicator, { state: 'visible', timeout: 3000 });
      await this.page.waitForSelector(this.loadingIndicator, { state: 'hidden', timeout: 10000 });
    } catch (error) {
      await this.page.waitForTimeout(2000);
    }
  }

  async getNoResultsMessage() {
    try {
      await this.page.waitForSelector(this.noResultsMessage, { state: 'visible', timeout: 5000 });
      return await this.page.textContent(this.noResultsMessage);
    } catch (error) {
      return null;
    }
  }

  async isNewProspectButtonVisible() {
    return await this.page.isVisible(this.newProspectButton);
  }

  async clickNewProspectButton() {
    await this.page.click(this.newProspectButton);
  }

  async getSearchResultsCount() {
    const results = await this.page.$$(this.prospectResultItem);
    return results.length;
  }

  async clearSearchField() {
    await this.page.fill(this.prospectSearchField, '');
  }
}

module.exports = ActicenterDashboardPage;