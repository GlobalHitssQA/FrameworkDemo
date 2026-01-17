const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const MetricsDashboardPage = require('../pages/MetricsDashboardPage');

let metricsDashboardPage;
let initialMetrics;
let interactionCount = 0;

Given('the analytics system is configured and the component is deployed in production', async function () {
  metricsDashboardPage = new MetricsDashboardPage(this.page);
  await metricsDashboardPage.verifyAnalyticsSystemConfigured();
});

Given('I have access to the metrics dashboard', async function () {
  await metricsDashboardPage.verifyDashboardAccess();
});

When('I access the metrics dashboard for the component', async function () {
  await metricsDashboardPage.navigateToDashboard();
  initialMetrics = await metricsDashboardPage.captureCurrentMetrics();
});

Then('the metrics dashboard should be available and display updated information', async function () {
  const isDashboardVisible = await metricsDashboardPage.isDashboardVisible();
  expect(isDashboardVisible).toBeTruthy();
  const hasUpdatedData = await metricsDashboardPage.hasUpdatedMetricsData();
  expect(hasUpdatedData).toBeTruthy();
});

When('I perform multiple interactions with the component', async function () {
  await metricsDashboardPage.navigateToComponentUnderTest();
});

When('I query contracts through the search functionality', async function () {
  await metricsDashboardPage.clickSearchIcon();
  await metricsDashboardPage.performContractSearch('123456');
  interactionCount++;
});

When('I expand the contract breakdown popup', async function () {
  await metricsDashboardPage.clickContractValueComponent();
  await metricsDashboardPage.waitForBreakdownPopup();
  interactionCount++;
});

When('I close the breakdown component', async function () {
  await metricsDashboardPage.closeBreakdownPopup();
  interactionCount++;
});

Then('each interaction should be correctly registered in the metrics system', async function () {
  await metricsDashboardPage.navigateToDashboard();
  await metricsDashboardPage.waitForMetricsUpdate();
  const interactionsRegistered = await metricsDashboardPage.verifyInteractionsRegistered();
  expect(interactionsRegistered).toBeTruthy();
});

Then('the metrics should reflect the correct number of interactions performed', async function () {
  const currentMetrics = await metricsDashboardPage.captureCurrentMetrics();
  const interactionDelta = await metricsDashboardPage.calculateInteractionDelta(initialMetrics, currentMetrics);
  expect(interactionDelta).toBeGreaterThanOrEqual(interactionCount);
});

When('I verify the performance metrics section', async function () {
  await metricsDashboardPage.navigateToPerformanceMetrics();
});

Then('load times and service response times should be captured', async function () {
  const hasLoadTimeMetrics = await metricsDashboardPage.hasLoadTimeMetrics();
  const hasResponseTimeMetrics = await metricsDashboardPage.hasResponseTimeMetrics();
  expect(hasLoadTimeMetrics).toBeTruthy();
  expect(hasResponseTimeMetrics).toBeTruthy();
});

Then('the performance metrics should display realistic values', async function () {
  const loadTime = await metricsDashboardPage.getAverageLoadTime();
  const responseTime = await metricsDashboardPage.getAverageResponseTime();
  expect(loadTime).toBeGreaterThan(0);
  expect(loadTime).toBeLessThan(30000);
  expect(responseTime).toBeGreaterThan(0);
  expect(responseTime).toBeLessThan(10000);
});

When('I generate a usage metrics report for a specific period', async function () {
  await metricsDashboardPage.navigateToReportsSection();
  await metricsDashboardPage.selectReportPeriod('last_30_days');
  await metricsDashboardPage.generateReport();
});

Then('the system should generate a consolidated report with all usage metrics for the selected period', async function () {
  const reportGenerated = await metricsDashboardPage.isReportGenerated();
  expect(reportGenerated).toBeTruthy();
  const hasQueryMetrics = await metricsDashboardPage.reportContainsQueryMetrics();
  const hasUserMetrics = await metricsDashboardPage.reportContainsActiveUserMetrics();
  const hasPerformanceMetrics = await metricsDashboardPage.reportContainsPerformanceMetrics();
  expect(hasQueryMetrics).toBeTruthy();
  expect(hasUserMetrics).toBeTruthy();
  expect(hasPerformanceMetrics).toBeTruthy();
});