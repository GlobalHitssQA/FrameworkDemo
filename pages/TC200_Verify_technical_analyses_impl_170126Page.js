class TechnicalAnalysesPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://ota-acticenter.example.com';
    
    // Locators
    this.userStorySearchInput = '[data-testid="user-story-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.userStoryLink = '[data-testid="user-story-link"]';
    this.technicalAnalysesList = '[data-testid="technical-analyses-list"]';
    this.analysisItem = '[data-testid="analysis-item"]';
    this.analysisCheckbox = '[data-testid="analysis-checkbox"]';
    this.categoryFilter = '[data-testid="category-filter"]';
    this.categoryOption = '[data-testid="category-option"]';
    this.statusColumn = '[data-testid="status-column"]';
    this.implementedStatus = '[data-testid="status-implemented"]';
    this.pendingStatus = '[data-testid="status-pending"]';
    this.validateButton = '[data-testid="validate-implementation-button"]';
    this.acceptanceCriteriaPanel = '[data-testid="acceptance-criteria-panel"]';
    this.criteriaCheckmark = '[data-testid="criteria-checkmark"]';
    this.specificationMatch = '[data-testid="specification-match-indicator"]';
    this.integrationPanel = '[data-testid="integration-panel"]';
    this.conflictIndicator = '[data-testid="conflict-indicator"]';
    this.defectsTab = '[data-testid="defects-tab"]';
    this.openDefectItem = '[data-testid="open-defect-item"]';
    this.analysesRangeStart = '[data-testid="analyses-range-start"]';
    this.analysesRangeEnd = '[data-testid="analyses-range-end"]';
    this.retrieveButton = '[data-testid="retrieve-analyses-button"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.clientSearchIcon = '[data-testid="client-search-icon"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
  }

  async navigateToSystem() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToUserStory(userStoryId) {
    await this.page.fill(this.userStorySearchInput, userStoryId);
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.userStoryLink);
    await this.page.click(`${this.userStoryLink}:has-text("${userStoryId}")`);
    await this.page.waitForLoadState('networkidle');
  }

  async retrieveLinkedAnalyses(startId, endId) {
    await this.page.fill(this.analysesRangeStart, startId);
    await this.page.fill(this.analysesRangeEnd, endId);
    await this.page.click(this.retrieveButton);
    await this.page.waitForSelector(this.technicalAnalysesList);
  }

  async isAnalysesListDisplayed() {
    return await this.page.isVisible(this.technicalAnalysesList);
  }

  async getAnalysesCount() {
    const items = await this.page.$$(this.analysisItem);
    return items.length;
  }

  async selectRepresentativeSample(categories, minCount) {
    let selectedCount = 0;
    for (const category of categories) {
      await this.page.click(this.categoryFilter);
      await this.page.click(`${this.categoryOption}:has-text("${category}")`);
      await this.page.waitForTimeout(500);
      const items = await this.page.$$(this.analysisItem);
      const toSelect = Math.ceil(minCount / categories.length);
      for (let i = 0; i < Math.min(toSelect, items.length); i++) {
        await items[i].click();
        selectedCount++;
      }
    }
    this.selectedCount = selectedCount;
  }

  async getSelectedAnalysesCategories() {
    const selectedItems = await this.page.$$(`${this.analysisItem}.selected`);
    const categories = [];
    for (const item of selectedItems) {
      const category = await item.getAttribute('data-category');
      if (category && !categories.includes(category)) {
        categories.push(category);
      }
    }
    return categories;
  }

  async validateSelectedAnalysesImplementation() {
    await this.page.click(this.validateButton);
    await this.page.waitForSelector(this.acceptanceCriteriaPanel);
  }

  async allAnalysesMeetAcceptanceCriteria() {
    const checkmarks = await this.page.$$(this.criteriaCheckmark);
    for (const checkmark of checkmarks) {
      const isChecked = await checkmark.getAttribute('data-checked');
      if (isChecked !== 'true') {
        return false;
      }
    }
    return true;
  }

  async functionalitiesMatchSpecifications() {
    const indicators = await this.page.$$(this.specificationMatch);
    for (const indicator of indicators) {
      const matches = await indicator.getAttribute('data-matches');
      if (matches !== 'true') {
        return false;
      }
    }
    return true;
  }

  async reviewImplementationStatus() {
    await this.page.click(`${this.categoryFilter}:has-text("All")`);
    await this.page.waitForSelector(this.statusColumn);
  }

  async allAnalysesImplemented() {
    const items = await this.page.$$(this.analysisItem);
    for (const item of items) {
      const status = await item.$eval(this.statusColumn, el => el.textContent);
      if (status !== 'Implemented' && status !== 'Implementada') {
        return false;
      }
    }
    return true;
  }

  async getPendingAnalysesCount() {
    const pendingItems = await this.page.$$(this.pendingStatus);
    return pendingItems.length;
  }

  async validateIntegration() {
    await this.page.click(this.integrationPanel);
    await this.page.waitForLoadState('networkidle');
  }

  async hasIntegrationConflicts() {
    const conflicts = await this.page.$$(this.conflictIndicator);
    return conflicts.length > 0;
  }

  async getOpenDefectsCount() {
    await this.page.click(this.defectsTab);
    await this.page.waitForTimeout(500);
    const openDefects = await this.page.$$(this.openDefectItem);
    return openDefects.length;
  }
}

module.exports = TechnicalAnalysesPage;