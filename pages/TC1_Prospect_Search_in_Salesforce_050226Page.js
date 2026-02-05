const { expect } = require('@playwright/test');

class ProspectSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://actinver.atlassian.net';
    
    // Locators
    this.searchField = '[data-testid="prospect-search-input"]';
    this.searchButton = '[data-testid="prospect-search-button"]';
    this.prospectList = '[data-testid="prospect-results-list"]';
    this.prospectItem = '[data-testid="prospect-item"]';
    this.prospectName = '[data-testid="prospect-name"]';
    this.prospectEmail = '[data-testid="prospect-email"]';
    this.dashboardContainer = '[data-testid="advisor-dashboard"]';
    this.matchesScrollContainer = '[data-testid="matches-scroll-container"]';
  }

  async navigateToDashboard() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async enterProspectName(name) {
    await this.page.fill(this.searchField, name);
  }

  async clickSearchButton() {
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isProspectListVisible() {
    return await this.page.isVisible(this.prospectList);
  }

  async scrollThroughMatches() {
    const scrollContainer = this.page.locator(this.matchesScrollContainer);
    await scrollContainer.evaluate(el => el.scrollTop = el.scrollHeight);
  }

  async hasProspectMatches() {
    const items = await this.page.locator(this.prospectItem).count();
    return items > 0;
  }

  async getProspectName(index) {
    return await this.page.locator(this.prospectName).nth(index).textContent();
  }

  async getProspectEmail(index) {
    return await this.page.locator(this.prospectEmail).nth(index).textContent();
  }

  async selectProspect(index) {
    await this.page.locator(this.prospectItem).nth(index).click();
  }
};

module.exports = ProspectSearchPage;