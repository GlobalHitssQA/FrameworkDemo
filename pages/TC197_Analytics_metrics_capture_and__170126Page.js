class MetricsDashboardPage {
  constructor(page) {
    this.page = page;
    
    // Analytics Dashboard Locators
    this.analyticsConfigIndicator = '[data-testid="analytics-config-status"]';
    this.dashboardAccessButton = '[data-testid="metrics-dashboard-access"]';
    this.metricsDashboardContainer = '[data-testid="metrics-dashboard-container"]';
    this.metricsLastUpdated = '[data-testid="metrics-last-updated"]';
    this.metricsDataTable = '[data-testid="metrics-data-table"]';
    
    // Interaction Metrics Locators
    this.queryCountMetric = '[data-testid="metric-query-count"]';
    this.activeUsersMetric = '[data-testid="metric-active-users"]';
    this.interactionCountMetric = '[data-testid="metric-interaction-count"]';
    
    // Component Under Test Locators
    this.searchIcon = '[data-testid="search-icon"]';
    this.searchInput = '[data-testid="search-input"]';
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    
    // Performance Metrics Locators
    this.performanceMetricsTab = '[data-testid="performance-metrics-tab"]';
    this.loadTimeMetric = '[data-testid="metric-load-time"]';
    this.responseTimeMetric = '[data-testid="metric-response-time"]';
    this.averageLoadTimeValue = '[data-testid="avg-load-time-value"]';
    this.averageResponseTimeValue = '[data-testid="avg-response-time-value"]';
    
    // Reports Locators
    this.reportsTab = '[data-testid="reports-tab"]';
    this.periodSelector = '[data-testid="period-selector"]';
    this.generateReportButton = '[data-testid="generate-report-button"]';
    this.reportContainer = '[data-testid="report-container"]';
    this.reportQueryMetrics = '[data-testid="report-query-metrics"]';
    this.reportUserMetrics = '[data-testid="report-user-metrics"]';
    this.reportPerformanceMetrics = '[data-testid="report-performance-metrics"]';
  }

  async verifyAnalyticsSystemConfigured() {
    await this.page.waitForSelector(this.analyticsConfigIndicator, { timeout: 10000 });
    const status = await this.page.textContent(this.analyticsConfigIndicator);
    return status.toLowerCase().includes('configured') || status.toLowerCase().includes('active');
  }

  async verifyDashboardAccess() {
    const accessButton = await this.page.locator(this.dashboardAccessButton);
    return await accessButton.isVisible();
  }

  async navigateToDashboard() {
    await this.page.click(this.dashboardAccessButton);
    await this.page.waitForSelector(this.metricsDashboardContainer, { timeout: 15000 });
  }

  async isDashboardVisible() {
    return await this.page.locator(this.metricsDashboardContainer).isVisible();
  }

  async hasUpdatedMetricsData() {
    const lastUpdated = await this.page.textContent(this.metricsLastUpdated);
    return lastUpdated && lastUpdated.length > 0;
  }

  async captureCurrentMetrics() {
    const queryCount = await this.page.textContent(this.queryCountMetric);
    const activeUsers = await this.page.textContent(this.activeUsersMetric);
    const interactionCount = await this.page.textContent(this.interactionCountMetric);
    return {
      queryCount: parseInt(queryCount) || 0,
      activeUsers: parseInt(activeUsers) || 0,
      interactionCount: parseInt(interactionCount) || 0
    };
  }

  async navigateToComponentUnderTest() {
    await this.page.goBack();
    await this.page.waitForSelector(this.contractValueComponent, { timeout: 10000 });
  }

  async clickSearchIcon() {
    await this.page.click(this.searchIcon);
  }

  async performContractSearch(searchTerm) {
    await this.page.fill(this.searchInput, searchTerm);
    await this.page.press(this.searchInput, 'Enter');
    await this.page.waitForTimeout(1000);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async waitForBreakdownPopup() {
    await this.page.waitForSelector(this.breakdownPopup, { timeout: 5000 });
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }

  async waitForMetricsUpdate() {
    await this.page.waitForTimeout(3000);
    await this.page.reload();
    await this.page.waitForSelector(this.metricsDashboardContainer, { timeout: 10000 });
  }

  async verifyInteractionsRegistered() {
    const interactionMetric = await this.page.locator(this.interactionCountMetric);
    return await interactionMetric.isVisible();
  }

  async calculateInteractionDelta(initialMetrics, currentMetrics) {
    return currentMetrics.interactionCount - initialMetrics.interactionCount;
  }

  async navigateToPerformanceMetrics() {
    await this.page.click(this.performanceMetricsTab);
    await this.page.waitForSelector(this.loadTimeMetric, { timeout: 5000 });
  }

  async hasLoadTimeMetrics() {
    return await this.page.locator(this.loadTimeMetric).isVisible();
  }

  async hasResponseTimeMetrics() {
    return await this.page.locator(this.responseTimeMetric).isVisible();
  }

  async getAverageLoadTime() {
    const loadTimeText = await this.page.textContent(this.averageLoadTimeValue);
    return parseFloat(loadTimeText) || 0;
  }

  async getAverageResponseTime() {
    const responseTimeText = await this.page.textContent(this.averageResponseTimeValue);
    return parseFloat(responseTimeText) || 0;
  }

  async navigateToReportsSection() {
    await this.page.click(this.reportsTab);
    await this.page.waitForSelector(this.periodSelector, { timeout: 5000 });
  }

  async selectReportPeriod(period) {
    await this.page.selectOption(this.periodSelector, period);
  }

  async generateReport() {
    await this.page.click(this.generateReportButton);
    await this.page.waitForSelector(this.reportContainer, { timeout: 30000 });
  }

  async isReportGenerated() {
    return await this.page.locator(this.reportContainer).isVisible();
  }

  async reportContainsQueryMetrics() {
    return await this.page.locator(this.reportQueryMetrics).isVisible();
  }

  async reportContainsActiveUserMetrics() {
    return await this.page.locator(this.reportUserMetrics).isVisible();
  }

  async reportContainsPerformanceMetrics() {
    return await this.page.locator(this.reportPerformanceMetrics).isVisible();
  }
}

module.exports = MetricsDashboardPage;