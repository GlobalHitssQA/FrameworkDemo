const { expect } = require('@playwright/test');

class ActicenterSearchPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Header elements
    this.headerContainer = '[data-testid="acticenter-header"]';
    this.headerSearchIcon = '[data-testid="header-search-icon"]';
    this.headerSearchInput = '[data-testid="header-search-input"]';
    this.headerSearchButton = '[data-testid="header-search-button"]';
    
    // Search results elements
    this.searchResultsContainer = '[data-testid="search-results-container"]';
    this.searchResultItem = '[data-testid="search-result-item"]';
    this.searchResultFirstItem = '[data-testid="search-result-item"]:first-child';
    
    // Client/Contract information elements
    this.clientContractInfoPanel = '[data-testid="client-contract-info-panel"]';
    this.clientNameField = '[data-testid="client-name-field"]';
    this.contractNumberField = '[data-testid="contract-number-field"]';
    
    // Desktop interface elements
    this.desktopLayout = '[data-testid="desktop-layout"]';
    this.mainContentArea = '[data-testid="main-content-area"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDesktopInterfaceIsVisible() {
    await this.page.waitForSelector(this.headerContainer, { state: 'visible' });
    const isDesktopLayout = await this.page.isVisible(this.desktopLayout);
    return isDesktopLayout;
  }

  async isHeaderSearchVisible() {
    await this.page.waitForSelector(this.headerContainer, { state: 'visible' });
    const isSearchIconVisible = await this.page.isVisible(this.headerSearchIcon);
    const isSearchInputVisible = await this.page.isVisible(this.headerSearchInput);
    return isSearchIconVisible || isSearchInputVisible;
  }

  async clickSearchIcon() {
    await this.page.click(this.headerSearchIcon);
    await this.page.waitForSelector(this.headerSearchInput, { state: 'visible' });
  }

  async enterSearchCriteria(searchText) {
    const isInputVisible = await this.page.isVisible(this.headerSearchInput);
    if (!isInputVisible) {
      await this.clickSearchIcon();
    }
    await this.page.fill(this.headerSearchInput, searchText);
  }

  async executeSearch() {
    const isButtonVisible = await this.page.isVisible(this.headerSearchButton);
    if (isButtonVisible) {
      await this.page.click(this.headerSearchButton);
    } else {
      await this.page.press(this.headerSearchInput, 'Enter');
    }
    await this.page.waitForSelector(this.searchResultsContainer, { state: 'visible', timeout: 10000 });
  }

  async selectFirstSearchResult() {
    await this.page.waitForSelector(this.searchResultFirstItem, { state: 'visible' });
    await this.page.click(this.searchResultFirstItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isClientContractInfoVisible() {
    await this.page.waitForSelector(this.clientContractInfoPanel, { state: 'visible', timeout: 10000 });
    const isPanelVisible = await this.page.isVisible(this.clientContractInfoPanel);
    return isPanelVisible;
  }

  async getClientName() {
    return await this.page.textContent(this.clientNameField);
  }

  async getContractNumber() {
    return await this.page.textContent(this.contractNumberField);
  }

  async verifySearchConsistency() {
    const isHeaderVisible = await this.page.isVisible(this.headerContainer);
    const isSearchFunctionAvailable = await this.isHeaderSearchVisible();
    return isHeaderVisible && isSearchFunctionAvailable;
  }

  async clearSearchInput() {
    await this.page.fill(this.headerSearchInput, '');
  }

  async getSearchResultsCount() {
    const results = await this.page.$$(this.searchResultItem);
    return results.length;
  }
}

module.exports = ActicenterSearchPage;