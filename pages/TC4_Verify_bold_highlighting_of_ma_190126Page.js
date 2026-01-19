const { expect } = require('@playwright/test');

class ProspectSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://actinver.atlassian.net';
    
    // Locators
    this.dashboardContainer = '[data-testid="dashboard-container"]';
    this.prospectSearchField = '[data-testid="prospect-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.searchResultsList = '[data-testid="search-results-list"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    this.prospectNameElement = '[data-testid="prospect-name"]';
    this.boldHighlightElement = '[data-testid="prospect-name"] strong, [data-testid="prospect-name"] b, [data-testid="prospect-name"] .highlight-bold';
    this.loginUsernameField = '[data-testid="login-username"]';
    this.loginPasswordField = '[data-testid="login-password"]';
    this.loginSubmitButton = '[data-testid="login-submit"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateAsAdvisor() {
    await this.page.fill(this.loginUsernameField, process.env.ADVISOR_USERNAME || 'test_advisor');
    await this.page.fill(this.loginPasswordField, process.env.ADVISOR_PASSWORD || 'test_password');
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isDashboardVisible() {
    await this.page.waitForSelector(this.dashboardContainer, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.dashboardContainer);
  }

  async locateSearchField() {
    await this.page.waitForSelector(this.prospectSearchField, { state: 'visible', timeout: 10000 });
  }

  async isSearchFieldEnabled() {
    const isVisible = await this.page.isVisible(this.prospectSearchField);
    const isEnabled = await this.page.isEnabled(this.prospectSearchField);
    return isVisible && isEnabled;
  }

  async enterSearchText(text) {
    await this.page.fill(this.prospectSearchField, text);
  }

  async getSearchFieldValue() {
    return await this.page.inputValue(this.prospectSearchField);
  }

  async clickSearchButton() {
    const searchButtonVisible = await this.page.isVisible(this.searchButton);
    if (searchButtonVisible) {
      await this.page.click(this.searchButton);
    } else {
      await this.page.press(this.prospectSearchField, 'Enter');
    }
    await this.page.waitForLoadState('networkidle');
  }

  async areSearchResultsVisible() {
    await this.page.waitForSelector(this.searchResultsList, { state: 'visible', timeout: 15000 });
    return await this.page.isVisible(this.searchResultsList);
  }

  async verifyBoldHighlightInResults(searchText) {
    await this.page.waitForSelector(this.searchResultItem, { state: 'visible', timeout: 10000 });
    
    const boldElements = await this.page.$$(this.boldHighlightElement);
    
    if (boldElements.length === 0) {
      return false;
    }
    
    for (const element of boldElements) {
      const textContent = await element.textContent();
      if (textContent && textContent.toLowerCase().includes(searchText.toLowerCase())) {
        const computedStyle = await element.evaluate((el) => {
          const style = window.getComputedStyle(el);
          return {
            fontWeight: style.fontWeight,
            tagName: el.tagName.toLowerCase()
          };
        });
        
        const isBold = computedStyle.tagName === 'strong' || 
                       computedStyle.tagName === 'b' || 
                       parseInt(computedStyle.fontWeight) >= 700;
        
        if (isBold) {
          return true;
        }
      }
    }
    
    return false;
  }
}

module.exports = ProspectSearchPage;